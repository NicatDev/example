import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = {
    get: (data) => Axios.get(baseUrl+'LabCrusherTest', { params: data }).then(res => res),
    create: (data) => Axios.post(baseUrl+'LabCrusherTest', data).then(res => res),
    update: (data) => Axios.put(baseUrl+'LabCrusherTest', data).then(res => res),
    delete: ({params}) => Axios.delete(baseUrl+'LabCrusherTest', {params}).then(res => res),
    getFilterbaleColumnsData: () => Axios.get(baseUrl+'LabCrusherTest/GetFilterbaleColumnsData').then(res => res),
    getDropdownList: () => Axios.get(baseUrl+'LabCrusherTest/GetDropdownList').then(res => res),
    getSingleUpdate: (data) => Axios.get(baseUrl+'LabCrusherTest/GetForUpdateById', { params: data }).then(res => res),
    changeStatus: (params) =>
        Axios.patch(
            `${baseUrl}/LabCrusherTest/UpdateStatus/${params.id_hash}/${params.status}`
        ).then((res) => res),
}

export default Index;

