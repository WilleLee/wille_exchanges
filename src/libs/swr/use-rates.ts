import { fetcher } from "@libs/fetcher";
import { IRate } from "@libs/types";
import { useRatesStore } from "@libs/zustand/rates/use-rates-store";
import dayjs from "dayjs";
import { useEffect } from "react";
import useSWR from "swr";

const hour = dayjs().hour();
let searchdate = dayjs().format("YYYYMMDD");
if (hour < 11) {
  searchdate = dayjs().subtract(1, "day").format("YYYYMMDD");
}

export default function useRates() {
  const { rates, init } = useRatesStore();
  const { data, isLoading } = useSWR(
    `/api/exchangeJSON?authkey=${import.meta.env.VITE_EXCHANGE_AUTH_KEY}&data=AP01&searchdate=${searchdate}`,
    fetcher<IRate[]>,
    {
      dedupingInterval: 1000 * 60,
    },
  );

  useEffect(() => {
    if (data !== undefined) {
      init(data);
    }
  }, [data, init]);

  return {
    rates,
    isLoading,
  };
}
