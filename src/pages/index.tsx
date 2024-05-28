import useNav from "@hooks/useNav";
import useRates from "@libs/swr/useRates";
import { IRate } from "@libs/types";
import { Fragment, ReactNode, useCallback } from "react";

export default function StartPage() {
  return (
    <Controller>
      {({ rates, onNavigate }) => (
        <Fragment>
          {rates.map((rate) => (
            <div
              onClick={() => onNavigate(rate.cur_unit)}
              data-testid="rate_container"
              key={rate.cur_unit}
            >
              <h3 data-testid="rate_unit">{rate.cur_unit}</h3>
              <p data-testid="rate_unitname">{rate.cur_nm}</p>
              <p data-testid="rate_deal">{rate.deal_bas_r}</p>
            </div>
          ))}
        </Fragment>
      )}
    </Controller>
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
    return <div data-testid="loading_indicator">loading...</div>;
  }

  return children({ rates, onNavigate: handleNavigate });
}
