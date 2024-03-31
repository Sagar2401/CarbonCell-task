import { ApexOptions } from "apexcharts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Loader from "../common/Loader";

function formatNumber({
  num,
  precision = 2,
}: {
  num: number;
  precision?: number;
}) {
  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted =
      (num / found.threshold).toFixed(precision) + " " + found.suffix;
    return formatted;
  }

  return num;
}

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Population",
        data: [],
      },
    ],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [populationData, setPopulationData] = useState<any>();
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    series: [
      {
        name: "Population",
        data: populationData?.map((item: any) => item.Population),
      },
    ],
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: populationData?.map((item: any) => item.Year),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    //@ts-ignore
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      // max: 100,
      labels: {
        formatter: (value) => {
          return formatNumber({ num: value });
        },
      },
    },
  };
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };

  handleReset;

  useEffect(() => {
    const getcountryData = async () => {
      try {
        const response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
        );
        setLoading(false);
        setPopulationData(response.data.data);
        setState({
          series: [
            {
              name: "Population",
              data: response.data.data.map((item: any) => item.Population),
            },
          ],
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getcountryData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div className="flex min-w-47.5">
              <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-primary">Current Population</p>
                <p className="text-sm font-medium">
                  on {populationData[0].Year} -{" "}
                  {formatNumber({ num: populationData[0].Population })}
                </p>
              </div>
            </div>
            <div className="flex min-w-47.5">
              <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-secondary">
                  {" "}
                  {populationData[0].Nation}
                </p>
                <p className="text-sm font-medium">
                  {populationData[0].Year} -{" "}
                  {populationData[populationData.length - 1].Year}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div id="chartOne" className="-ml-5">
              <ReactApexChart
                options={options}
                series={state.series}
                type="area"
                height={350}
                width={"100%"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartOne;
