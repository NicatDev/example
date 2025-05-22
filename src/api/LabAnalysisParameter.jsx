import Axios from "@/config/Axios/index.jsx";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = {
  get: () =>
    Axios.get(baseUrl + "LabAnalysisParameter/GetDropDownList").then(
      (res) => res
    ),
};

export default Index;
