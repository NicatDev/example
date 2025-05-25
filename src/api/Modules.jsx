import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = {
    getSingleModule: (data) => Axios.get('modules/getSingleModule', { params: data }).then(res => res),
}

export default Index;

