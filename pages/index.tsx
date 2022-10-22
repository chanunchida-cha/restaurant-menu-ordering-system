import Home from "@/components/component-pages/Home";
import Layout from "@/components/layouts/Layout";
import { Grid, GridItem, Spinner, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";

import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isMaxWidth767, isMinToMAX, isDisplay] = useMediaQuery([
    "(max-width: 767px)",
    "(min-width: 767px) and (max-width: 1279px)",
    "(min-width: 1279px)",
  ]);

  function loadingCondition() {
    if (isMaxWidth767 || isMinToMAX) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
  }
  useEffect(() => {
    loadingCondition();
  }, []);

  return (
    <>
      {loading && (isMaxWidth767 || isMinToMAX) ? (
        <div className="w-screen h-screen  grid grid-cols-3  grid-rows-5 z-50 bg-[#D52D2C] top-0 left-0 bottom-0 right-0 fixed sticky-0 overflow-y-hidden">
          <div className="col-start-2 row-start-3  block mx-auto ">
            <Image
              src={"/images/logo.webp"}
              height={"200px"}
              width={"200px"}
              alt="logo"
            />
          </div>
        </div>
      ) : loading && isDisplay ? (
        <div className="w-screen h-screen bg-white grid grid-cols-3  grid-rows-5 z-50 bg-opacity-50 top-0 left-0 bottom-0 right-0 fixed sticky-0 overflow-y-hidden">
          <div className="col-start-2 row-start-3  block mx-auto ">
            {" "}
            <Spinner size="xl" color="red.500" />
          </div>
        </div>
      ) : null}
      <Home />
    </>
  );
};

// Page.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export default Page;
