import React, { use } from "react";
import API from "@/api";
import { DynamicTable } from "@mtte/dynmic";
import { useTranslation } from "react-i18next";

export default function index() {
  const { t } = useTranslation();
  return (
    <DynamicTable
      API={API.DynamicCommon}
      TableIdHash="Wdq1yEo8rUM0TOL$hScNBg=="
      title={t("modulePages.ExperimentType")}
    />
  );
}
