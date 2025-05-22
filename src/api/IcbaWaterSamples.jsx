import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = {
    get: (data) => Axios.get(baseUrl+'LabWaterICBASample', { params: data }).then(res => res),
    create: (data) => Axios.post(baseUrl+'LabWaterICBASample', data).then(res => res),
    update: (data) => Axios.put(baseUrl+'LabWaterICBASample', data).then(res => res),
    delete: (params) => Axios.delete(baseUrl+'LabWaterICBASample', {params}).then(res => res),
    getFilterbaleColumnsData: () => Axios.get(baseUrl+'LabWaterICBASample/GetFilterbaleColumnsData').then(res => res),
    getDropdownList: () => Axios.get(baseUrl+'LabWaterICBASample/GetDropdownList').then(res => res),
    getSingleUpdate: (data) => Axios.get(baseUrl+'LabWaterICBASample/GetForUpdateById', { params: data }).then(res => res),
    changeStatus: (params) =>
        Axios.patch(
            `${baseUrl}/LabWaterICBASample/UpdateStatus/${params.id_hash}/${params.status}`
        ).then((res) => res),
}

export default Index;

