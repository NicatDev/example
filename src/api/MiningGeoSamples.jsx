import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = {
    get: (data) => Axios.get(baseUrl+'LabMiningGeologyRegistration', { params: data }).then(res => res),
    create: (data) => Axios.post(baseUrl+'LabMiningGeologyRegistration', data).then(res => res),
    update: (data) => Axios.put(baseUrl+'LabMiningGeologyRegistration', data).then(res => res),
    delete: (params) => Axios.delete(baseUrl+'LabMiningGeologyRegistration', {params}).then(res => res),
    getFilterbaleColumnsData: () => Axios.get(baseUrl+'LabMiningGeologyRegistration/GetFilterbaleColumnsData').then(res => res),
    getDropdownList: () => Axios.get(baseUrl+'LabMiningGeologyRegistration/GetDropdownList').then(res => res),
    getSingleUpdate: (data) => Axios.get(baseUrl+'LabMiningGeologyRegistration/GetForUpdateById', { params: data }).then(res => res),
    changeStatus: (params) =>
        Axios.patch(
            `${baseUrl}/LabMiningGeologyRegistration/UpdateStatus/${params.id_hash}/${params.status}`
        ).then((res) => res),
}

export default Index;

