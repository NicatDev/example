import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_BASE_URL;

const Index = {
    get: (data) => Axios.get(baseUrl+'LabOtherICBASample', { params: data }).then(res => res),
    create: (data) => Axios.post(baseUrl+'LabOtherICBASample', data).then(res => res),
    update: (data) => Axios.put(baseUrl+'LabOtherICBASample', data).then(res => res),
    delete: (params) => Axios.delete(baseUrl+'LabOtherICBASample', {params}).then(res => res),
    getFilterbaleColumnsData: () => Axios.get(baseUrl+'LabOtherICBASample/GetFilterbaleColumnsData').then(res => res),
    getDropdownList: () => Axios.get(baseUrl+'LabOtherICBASample/GetDropdownList').then(res => res),
    getSingleUpdate: (data) => Axios.get(baseUrl+'LabOtherICBASample/GetForUpdateById', { params: data }).then(res => res),
    changeStatus: (params) =>
        Axios.patch(
            `${baseUrl}/LabOtherICBASample/UpdateStatus/${params.id_hash}/${params.status}`
        ).then((res) => res),
}

export default Index;

