import useNav from "@hooks/useNav";
import { formatNumberInput, inputToNumber } from "@libs/inputs";
import { IRate } from "@libs/types";
import { useRatesStore } from "@libs/zustand/rates/use-rates-store";
import {
  ChangeEvent,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";

export default function UnitPage() {
  const { replace } = useNav();
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
    <div>
      <h3>{unitRate.cur_unit}</h3>
      <Controller
        unitRate={unitRate}
        isHundred={unitRate.cur_unit.includes("100")}
        deal={inputToNumber(unitRate.deal_bas_r)}
      >
        {({ krwInput, unitInput, onChangeKrw, onChangeUnit }) => (
          <Fragment>
            <label>
              KRW{" "}
              <input
                data-testid="input_KRW"
                value={krwInput}
                onChange={onChangeKrw}
              />
            </label>
            <label>
              {unitRate.cur_nm}{" "}
              <input
                data-testid={`input_${unitRate.cur_unit}`}
                value={unitInput}
                onChange={onChangeUnit}
              />
            </label>
          </Fragment>
        )}
      </Controller>
      <div>
        <h4>시세 정보</h4>
        <p>
          <span>송금 보낼 때</span>
          <span data-testid="ttb">{formatNumberInput(unitRate.ttb)}</span>
        </p>
        <p>
          <span>송금 받을 때</span>
          <span data-testid="tts">{formatNumberInput(unitRate.tts)}</span>
        </p>
      </div>
    </div>
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
