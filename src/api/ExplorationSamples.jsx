import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = {
    get: (data) => Axios.get(baseUrl+'LabIntelligenceExample', { params: data }).then(res => res),
    create: (data) => Axios.post(baseUrl+'LabIntelligenceExample', data).then(res => res),
    update: (data) => Axios.put(baseUrl+'LabIntelligenceExample', data).then(res => res),
    delete: (params) => Axios.delete(baseUrl+'LabIntelligenceExample', {params}).then(res => res),
    getFilterbaleColumnsData: () => Axios.get(baseUrl+'LabIntelligenceExample/GetFilterbaleColumnsData').then(res => res),
    getDropdownList: () => Axios.get(baseUrl+'LabIntelligenceExample/GetDropdownList').then(res => res),
    getSingleUpdate: (data) => Axios.get(baseUrl+'LabIntelligenceExample/GetForUpdateById', { params: data }).then(res => res),
    changeStatus: (params) =>
        Axios.patch(
            `${baseUrl}/LabIntelligenceExample/UpdateStatus/${params.id_hash}/${params.status}`
        ).then((res) => res),
}

export default Index;

