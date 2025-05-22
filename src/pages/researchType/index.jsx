import API from "@/api";
import { DynamicTable } from "@mtte/dynmic";
import { useTranslation } from "react-i18next";

export default function index() {
  const { t } = useTranslation();
  return (
    <DynamicTable
      API={API.DynamicCommon}
      TableIdHash="$WRgbp7fYUQCxdIW0HUWeg=="
      title={t("modulePages.ResearchType")}
    />
  );
}
