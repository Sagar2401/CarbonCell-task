import { CurrencyData } from "@/types/currency";
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
const data = {
  USD: {
    code: "USD",
    symbol: "&#36;",
    rate: "70,399.896",
    description: "United States Dollar",
    rate_float: 70399.8963,
  },
  GBP: {
    code: "GBP",
    symbol: "&pound;",
    rate: "55,768.897",
    description: "British Pound Sterling",
    rate_float: 55768.897,
  },
  EUR: {
    code: "EUR",
    symbol: "&euro;",
    rate: "65,184.461",
    description: "Euro",
    rate_float: 65184.4607,
  },
};

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#6577F3", "#8FD0EF", "#0FADCF"],
  labels: Object.keys(data),
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC<{ currencyData: CurrencyData }> = ({
  currencyData,
}) => {
  const [state, setState] = useState<ChartThreeState>({
    series: Object.values(data).map((item) => item.rate_float),
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: Object.values(data).map((item) => item.rate_float),
    }));
  };
  handleReset;
  const totalRateFloat = Object.values(data).reduce((total, currency) => {
    return total + currency.rate_float;
  }, 0);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Currency Analytics
          </h5>
        </div>
        <div></div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-col flex-wrap items-center justify-center gap-y-3">
        {Object.values(data).map((item, i) => (
          <div className="w-full px-8 " key={item.code}>
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-[${options.colors && options?.colors[i]}] `}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {item.description} </span>
                <span>
                  {((item.rate_float * 100) / totalRateFloat).toFixed(1)}%{" "}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
