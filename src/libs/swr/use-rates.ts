import { fetcher } from "@libs/fetcher";
import { IRate } from "@libs/types";
import { useRatesStore } from "@libs/zustand/rates/use-rates-store";
import { useSearchdateStore } from "@libs/zustand/searchdate/use-searchdate-store";
import { useEffect } from "react";
import useSWR from "swr";

export default function useRates() {
  const { searchdate, adjust } = useSearchdateStore();
  const { rates, init } = useRatesStore();
  const { data, isLoading } = useSWR(
    `/api/exchangeJSON?authkey=${import.meta.env.VITE_EXCHANGE_AUTH_KEY}&data=AP01&searchdate=${searchdate}`,
    // `/api/exchangeJSON?data=AP01&searchdate=${searchdate}`,
    fetcher<IRate[]>,
    {
      dedupingInterval: 1000 * 60,
    },
  );

  useEffect(() => {
    let isValidEffect = true;
    if (isLoading) return;
    if (data === undefined) return;
    if (data.length > 0) return;
    if (isValidEffect) {
      setTimeout(() => {
        adjust();
      }, 100);
    }

    return () => {
      isValidEffect = false;
    };
  }, [isLoading, data, adjust]);

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
