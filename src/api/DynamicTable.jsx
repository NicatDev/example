import Axios from "@/config/Axios";

// Set the base URL for axios
const baseUrl = import.meta.env.VITE_DYNAMIC_TABLE_URL;

const Index = {
    getDynamicValue: (params) =>Axios.get(baseUrl + '/DynamicValue', { params }).then((res) => res),
};

export default Index;

