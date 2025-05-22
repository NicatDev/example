import Axios from "@/config/Axios/index.jsx"

const baseUrl = import.meta.env.VITE_DYNAMIC_TABLE_URL

const Index = {
    get: (data) => Axios.get(`${baseUrl}/DynamicTable/GetList`, { params: data }).then(res => res),
    getExcelTemplate: (uuid) => Axios.get(`${baseUrl}/DynamicTable/GeExcelTemplate/${uuid}`, { responseType: 'blob' }).then(res => res),
    addEmptyRow: (data) => Axios.post(`${baseUrl}/DynamicValue/AddEmpty`, data).then(res => res),
    updateCellValue: (data) => Axios.put(`${baseUrl}/DynamicValue`, data).then(res => res),
    exchangeOrder: (data) => Axios.patch(`${baseUrl}/DynamicValue/ExchangeDisplayOrder`, data).then(res => res),
    getInputTypes: () => Axios.get(`${baseUrl}/DynamicColumn/GetInputTypes`).then(res => res),
    addColumn: (data) => Axios.post(`${baseUrl}/DynamicColumn`, data).then(res => res),
    updateColumn: (data) => Axios.patch(`${baseUrl}/DynamicColumn`, data).then(res => res),
    getDynamicTableDropDownList: () => Axios.get(`${baseUrl}/DynamicTable/GetDropDownList`).then(res => res),
    getDynamicColumnsByTableId: (tableIdHash) => Axios.get(`${baseUrl}/DynamicColumn/GetList?TableIdHash=${tableIdHash}`).then(res => res),
    getDynamicValue: (params) => Axios.get(baseUrl + '/DynamicValue', { params }).then((res) => res),
    getImageBlob: (imgName) => Axios.get(baseUrl + `/FileManager/download/${imgName}`, { responseType: 'blob' }).then((res) => res),
    deleteFile: (imgName) => Axios.delete(baseUrl + `/FileManager?fileName=${imgName}`).then((res) => res),
    uploadFile: (data) => Axios.post(baseUrl + '/FileManager/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => res),
    importExcel: (uuid,data) => Axios.patch(baseUrl + `/DynamicTable/ImportExcel/${uuid}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => res),
}

export default Index;

