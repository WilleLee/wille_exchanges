import Header from "@components/Header";
import ExchangeSvg from "@components/svgs/ExchangeSvg";
import colors from "@constants/colors";
import flags from "@constants/flags";
import { css } from "@emotion/react";
import useNav from "@hooks/useNav";
import { formatNumberInput, inputToNumber } from "@libs/inputs";
import { IRate } from "@libs/types";
import { useRatesStore } from "@libs/zustand/rates/use-rates-store";
import {
  ChangeEvent,
  Fragment,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
  memo,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";

const MAX_INPUT = 1000000000000;

export default function UnitPage() {
  const { replace, goBack } = useNav();
  const { code } = useParams();
  const { rates } = useRatesStore();
  const unitRate = useMemo(
    () => rates.find((r) => r.cur_unit === code),
    [rates, code],
  );

  if (!unitRate) {
    return (
      <button data-testid="button_wrong_approach" onClick={() => replace("/")}>
        잘못된 접근입니다.
      </button>
    );
  }

  return (
    <>
      <Header onGoBack={() => goBack()} />
      <h2
        css={css`
          font-size: 18px;
          font-weight: 800;
          color: ${colors.grey900};
          margin-bottom: 16px;
        `}
      >
        한국수출입은행 고시환율
      </h2>
      <Controller
        unitRate={unitRate}
        isHundred={unitRate.cur_unit.includes("100")}
        deal={inputToNumber(unitRate.deal_bas_r)}
      >
        {({ krwInput, unitInput, onChangeKrw, onChangeUnit }) => (
          <Fragment>
            <CurrencyInput
              label={`${flags.KRW} KRW`}
              data-testid="input_KRW"
              value={krwInput}
              onChange={onChangeKrw}
            />
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 8px 0;
                color: ${colors.grey600};
              `}
            >
              <ExchangeSvg />
            </div>
            <CurrencyInput
              label={`${flags[unitRate.cur_unit]} ${unitRate.cur_unit}`}
              data-testid={`input_${unitRate.cur_unit}`}
              value={unitInput}
              onChange={onChangeUnit}
            />
          </Fragment>
        )}
      </Controller>
      <InputInfoView />
      <PriceInfoView
        ttb={formatNumberInput(unitRate.ttb)}
        tts={formatNumberInput(unitRate.tts)}
      />
    </>
  );
}

interface ControllerChildrenArgs {
  krwInput: string;
  unitInput: string;
  onChangeKrw: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeUnit: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface ControllerProps {
  children: (args: ControllerChildrenArgs) => ReactNode;
  unitRate: IRate;
  isHundred: boolean;
  deal: number;
}

function Controller({ children, unitRate, isHundred, deal }: ControllerProps) {
  const [krwInput, setKrwInput] = useState(
    formatNumberInput(unitRate.deal_bas_r),
  );
  const [unitInput, setUnitInput] = useState(isHundred ? "100" : "1");

  const handleChangeKrw = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formatted = formatNumberInput(value);
      const inputToNum = inputToNumber(formatted);
      const nextUnit = isHundred
        ? formatNumberInput((inputToNum / deal) * 100 + "")
        : formatNumberInput(inputToNum / deal + "");
      if (inputToNum > MAX_INPUT || inputToNumber(nextUnit) > MAX_INPUT) return;
      setKrwInput(formatted);
      setUnitInput(nextUnit);
    },
    [deal, isHundred],
  );

  const handleChangeUnit = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formatted = formatNumberInput(value);
      const inputToNum = inputToNumber(formatted);
      const nextKrw = isHundred
        ? formatNumberInput((inputToNum * deal) / 100 + "")
        : formatNumberInput(inputToNum * deal + "");
      if (inputToNum > MAX_INPUT || inputToNumber(nextKrw) > MAX_INPUT) return;
      setUnitInput(formatted);
      setKrwInput(nextKrw);
    },
    [deal, isHundred],
  );

  if (!children || typeof children !== "function") return null;

  return children({
    krwInput,
    unitInput,
    onChangeKrw: handleChangeKrw,
    onChangeUnit: handleChangeUnit,
  });
}

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CurrencyInput = forwardRef(function CurrencyInput(
  props: CurrencyInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const id = useId();
  const { label, ...rest } = props;
  return (
    <label
      css={css`
        display: grid;
        grid-template-columns: 100px 1fr;
        grid-template-rows: 48px;
        align-items: center;
        overflow: hidden;
        border: 1px solid ${colors.grey100};
        border-radius: 8px;
        &:focus-within {
          border: 1px solid ${colors.blue100};
        }
      `}
      htmlFor={id}
    >
      <p
        css={css`
          width: 100%;
          height: 100%;
          padding-left: 12px;
          background: ${colors.grey50};
          color: ${colors.grey800};
          font-weight: 400;
          font-size: 14px;
          display: flex;
          align-items: center;
          border-right: 1px solid ${colors.grey100};
        `}
      >
        {label}
      </p>
      <div
        css={css`
          padding-right: 12px;
        `}
      >
        <input
          ref={ref}
          css={css`
            display: inline-flex;
            width: 100%;
            text-align: right;
            border: 0 solid transparent;

            &:focus {
              outline: none;
            }
          `}
          {...rest}
          id={id}
        />
      </div>
    </label>
  );
});

const InputInfoView = memo(function InputInfoView() {
  return (
    <div
      css={css`
        margin-top: 8px;
        padding: 2px 4px;
        font-size: 10px;
        font-weight: 400;
        color: ${colors.grey600};
      `}
    >
      <ul
        css={css`
          list-style: disc;
          padding-left: 16px;
        `}
      >
        <li>소수점 둘째 자리 수 아래는 버림</li>
        <li>{formatNumberInput(String(MAX_INPUT))}을 초과하여 입력 불가능</li>
      </ul>
    </div>
  );
});

const ttStyle = css({
  display: "grid",
  gridTemplateColumns: "100px 1fr",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: "400",

  ">span:first-of-type": {
    color: colors.grey600,
  },
  ">span:last-child": {
    color: colors.grey800,
  },
});

const PriceInfoView = memo(function PriceInfoView({
  ttb,
  tts,
}: {
  ttb: string;
  tts: string;
}) {
  return (
    <div
      css={css`
        margin-top: 16px;
        background: ${colors.grey50};
        padding: 16px;
        border-radius: 8px;
        border: 0 solid transparent;
      `}
    >
      <h4
        css={css`
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        `}
      >
        시세 정보
      </h4>
      <p css={ttStyle}>
        <span>송금 보낼 때</span>
        <span data-testid="ttb">{ttb}</span>
      </p>
      <p css={ttStyle}>
        <span>송금 받을 때</span>
        <span data-testid="tts">{tts}</span>
      </p>
    </div>
  );
});
