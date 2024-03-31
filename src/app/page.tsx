import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MetamaskConnect from "@/components/MetamaskConnect";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="col-span-12 mb-3 flex justify-between rounded-md border border-stroke bg-white px-3 py-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
          <div>
            <h5 className="text-xl font-semibold text-black dark:text-white">
              Welcome to Dashboard{" "}
            </h5>
          </div>
          <MetamaskConnect />{" "}
        </div>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
