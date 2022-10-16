import Home from "@/components/component-pages/Home";
import Layout from "@/components/layouts/Layout";
import { Image, useMediaQuery } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isMaxWidth767, isMinToMAX] = useMediaQuery([
    "(max-width: 767px)",
    "(min-width: 767px) and (max-width: 1279px)",
  ]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading && (isMaxWidth767 || isMinToMAX) ? (
        <div className="w-screen h-screen  z-50 bg-[#D52D2C] top-0 left-0 bottom-0 right-0 fixed sticky-0 overflow-y-hidden">
          <Image
            src="images/logo.webp"
            display="block"
            mt="300px"
            mx="auto"
            width="50%"
            alt="logo"
          />
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};

// Page.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export default Page;
