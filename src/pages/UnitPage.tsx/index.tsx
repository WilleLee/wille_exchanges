import useNav from "@hooks/useNav";
import { IRate } from "@libs/types";
import { useRatesStore } from "@libs/zustand/rates/use-rates-store";
import { ChangeEvent, ReactNode, useCallback, useMemo, useState } from "react";
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
      <Controller unitRate={unitRate}>
        {({ krwInput, unitInput, onChangeKrw }) => (
          <div>
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
                onChange={() => {}}
              />
            </label>
          </div>
        )}
      </Controller>
    </div>
  );
}

interface ControllerChildrenArgs {
  krwInput: string;
  unitInput: string;
  onChangeKrw: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface ControllerProps {
  children: (args: ControllerChildrenArgs) => ReactNode;
  unitRate: IRate;
}

function Controller({ children, unitRate }: ControllerProps) {
  const initialUnitInput = unitRate.deal_bas_r.replace(/,/g, "");
  const [krwInput, setKrwInput] = useState("1");
  const [unitInput, setUnitInput] = useState(initialUnitInput);
  const deal = useMemo(() => {
    const original = unitRate.deal_bas_r;
    const dotIndex = unitRate.deal_bas_r.indexOf(".");
    if (dotIndex === -1) {
      return Number(original.replace(/\D/g, ""));
    }
    const left = original.slice(0, dotIndex).replace(/\D/g, "");
    const right = original.slice(dotIndex + 1).replace(/\D/g, "");
    return Number(`${left}.${right}`);
  }, [unitRate]);

  const handleChangeKrw = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const dotIndex = e.target.value.indexOf(".");
      const value = e.target.value;

      if (dotIndex === -1) {
        const replaced = value.replace(/\D/g, "");
        if (Number(replaced) > 100000000) {
          return;
        }
        if (replaced === "") {
          setKrwInput("0");
          setUnitInput("0");
        } else {
          const trimmed = replaced.replace(/^0+/, "0");
          if (trimmed.length > 1) {
            setKrwInput(trimmed.replace(/^0+/, ""));
          } else {
            setKrwInput(trimmed);
          }
          const u = (Number(replaced) / deal).toFixed(2);
          setUnitInput(u);
        }
        return;
      }

      let left = value.slice(0, dotIndex).replace(/\D/g, "");
      if (left === "") {
        left = "0";
      }
      if (Number(left) > 100000000) {
        return;
      }
      const right = value
        .slice(dotIndex + 1)
        .replace(/\D/g, "")
        .slice(0, 2);

      const re = `${left}.${right}`;
      const trimmed = re.replace(/^0+/, "0");
      setKrwInput(trimmed);
      const u = (Number(re) / deal).toFixed(2);
      setUnitInput(u);
    },
    [deal],
  );

  if (!children || typeof children !== "function") return null;

  return children({
    krwInput,
    unitInput,
    onChangeKrw: handleChangeKrw,
  });
}
