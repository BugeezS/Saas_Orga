"use client";
import dynamic from "next/dynamic";
import React from "react";
import TableOne from "../Tables/TableOne";
import DefaultLayout from "../Layouts/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import TableThree from "../Tables/TableThree";
import TableTwo from "../Tables/TableTwo";

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const Dépenses: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Dépenses;
