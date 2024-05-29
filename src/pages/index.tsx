import Header from "@components/Header";
import colors from "@constants/colors";
import flags from "@constants/flags";
import { css } from "@emotion/react";
import useNav from "@hooks/useNav";
import useRates from "@libs/swr/use-rates";
import { IRate } from "@libs/types";
import { Fragment, ReactNode, memo, useCallback } from "react";
import CtxLoading from "@components/CtxLoading";

export default function StartPage() {
  return (
    <>
      <Header />
      <Controller>
        {({ rates, onNavigate }) => (
          <Fragment>
            {rates.map((rate) => {
              if (rate.cur_unit === "KRW") return null;
              return (
                <RateView
                  rate={rate}
                  key={rate.cur_unit}
                  onNavigate={() => onNavigate(rate.cur_unit)}
                />
              );
            })}
          </Fragment>
        )}
      </Controller>
    </>
  );
}

interface ControllerProps {
  children: (args: {
    rates: IRate[];
    onNavigate: (id: IRate["cur_unit"]) => void;
  }) => ReactNode;
}

function Controller({ children }: ControllerProps) {
  const { rates, isLoading } = useRates();
  const { push } = useNav();
  const handleNavigate = useCallback(
    (id: IRate["cur_unit"]) => {
      push(`/unit/${id}`);
    },
    [push],
  );

  if (isLoading || !rates) {
    return <CtxLoading />;
  }

  return children({ rates, onNavigate: handleNavigate });
}

interface RateViewProps {
  rate: IRate;
  onNavigate: (id: IRate["cur_unit"]) => void;
}

const RateView = memo(function RateView({ rate, onNavigate }: RateViewProps) {
  return (
    <div
      css={css`
        cursor: pointer;
        margin-bottom: 16px;
        box-shadow: 0 0 6px 2px ${colors.grey100};
        border: 0 solid transparent;
        border-radius: 8px;
        padding: 8px 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
      onClick={() => onNavigate(rate.cur_unit)}
      data-testid="rate_container"
    >
      <h3
        css={css`
          display: flex;
          align-items: center;
          gap: 4px;
        `}
      >
        <span
          css={css`
            font-size: 16px;
            font-weight: 600;
            color: ${colors.grey600};
          `}
          data-testid="rate_heading"
        >
          {flags[rate.cur_unit]} {rate.cur_nm.split(" ")[0]}
        </span>
        <span
          css={css`
            font-size: 12px;
            font-weight: 400;
            color: ${colors.grey500};
          `}
          data-testid="rate_unit"
        >
          {rate.cur_unit}
        </span>
      </h3>
      <p
        css={css`
          font-weight: 800;
          color: ${colors.grey700};
        `}
        data-testid="rate_deal"
      >
        {rate.deal_bas_r}
      </p>
    </div>
  );
});
