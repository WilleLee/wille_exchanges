import { IRate } from "@libs/types";

export const ratesMock: IRate[] = [
  {
    cur_nm: "미국 달러",
    cur_unit: "USD",
    deal_bas_r: "1130.5",
    kftc_bkpr: "1130.5",
    kftc_deal_bas_r: "1130.5",
    result: 1,
    ten_dd_efee_r: "0.00",
    ttb: "1139.00", // 송금 받을 때
    tts: "1122.00", // 송금 보낼 때
    yy_efee_r: "0.00",
    bkpr: "1130.5",
  },
  {
    cur_nm: "일본 옌",
    cur_unit: "JPY(100)",
    deal_bas_r: "10.2000",
    kftc_bkpr: "10.2000",
    kftc_deal_bas_r: "10.2000",
    result: 1,
    ten_dd_efee_r: "0.00",
    ttb: "10.3800",
    tts: "9.9800",
    yy_efee_r: "0.00",
    bkpr: "10.2000",
  },
  {
    cur_nm: "한국 원",
    cur_unit: "KRW",
    deal_bas_r: "1",
    kftc_bkpr: "1",
    kftc_deal_bas_r: "1",
    result: 1,
    ten_dd_efee_r: "0.00",
    ttb: "1",
    tts: "1",
    yy_efee_r: "0.00",
    bkpr: "1",
  },
];
