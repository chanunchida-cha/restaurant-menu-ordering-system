import Layout from "@/components/layouts/Layout";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <p className="text-3xl font-bold underline">hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
