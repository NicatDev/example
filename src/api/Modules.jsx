import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_ACCOUNT_URL;

const Index = {
  list: () => Axios.get(baseUrl + "/Module"),
  listUsers: () => Axios.get(baseUrl + "/Module/GetUserModules"),
  getSingleModule: (moduleIdHash) => Axios.get(baseUrl + `/ModulePage/GetByModuleId/${moduleIdHash}`),
  getSingleModuleForUsers: (moduleIdHash) => Axios.get(baseUrl + `/ModulePage/GetForUserByModuleId/${moduleIdHash}`),
};

export default Index;
