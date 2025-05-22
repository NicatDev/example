import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_ACCOUNT_URL;

const Index = {
    refreshToken: (data) => Axios.post(baseUrl + '/Account/RefreshToken', data).then(res => res),
    getFilterbaleColumnsData: () => Axios.get(baseUrl + "/AppUser/GetFilterbaleColumnsData").then(res => res),
    get: (data) => Axios.get(baseUrl + '/AppUser', { params: data }).then(res => res),
    changeStatus: (params) => Axios.patch(baseUrl + `/AppUser/UpdateStatus/${params.id_hash}/${params.status}`).then((res) => res),
}

export default Index;