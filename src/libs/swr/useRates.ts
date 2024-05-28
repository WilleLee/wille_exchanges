import { fetcher } from "@libs/fetcher";
import { IRate } from "@libs/types";
import dayjs from "dayjs";
import useSWR from "swr";

export default function useRates() {
  const { data, isLoading } = useSWR(
    `/api?authkey=${import.meta.env.VITE_EXCHANGE_AUTH_KEY}&data=AP01&searchdate=${dayjs().format("YYYYMMDD")}`,
    fetcher<IRate[]>,
  );

  return {
    rates: data,
    isLoading,
  };
}
