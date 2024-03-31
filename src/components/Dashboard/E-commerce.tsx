"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import { CurrencyData } from "@/types/currency";
import Loader from "../common/Loader";

const ECommerce: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currencyData, serCurrencyData] = useState<CurrencyData>();

  // getCurrencyData();
  useEffect(() => {
    const getCurrencyData = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json",
        );
        setLoading(false);
        serCurrencyData(response.data.bpi);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getCurrencyData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
            <ChartOne />
            <ChartThree currencyData={currencyData as CurrencyData} />
          </div>
          <div className="mt-4  grid  grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:mt-7.5 2xl:gap-7.5">
            {Object.values(currencyData as CurrencyData).map((item) => (
              <CardDataStats
                title={item.description}
                total={
                  <>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.symbol }}
                    ></span>{" "}
                    {item.rate_float}
                  </>
                }
                rate=""
                key={item.code}
              >
                <span dangerouslySetInnerHTML={{ __html: item.symbol }} />{" "}
              </CardDataStats>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ECommerce;
