export interface Currency {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface CurrencyData {
  [key: string]: Currency;
}
