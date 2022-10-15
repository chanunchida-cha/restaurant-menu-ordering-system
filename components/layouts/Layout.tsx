import React, { ReactElement } from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props): ReactElement {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
