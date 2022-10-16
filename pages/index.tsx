import Home from "@/components/component-pages/Home";
import Layout from "@/components/layouts/Layout";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Home />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
