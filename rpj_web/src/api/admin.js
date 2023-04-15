import axios from 'axios'
let base = "http://localhost:8000/api";
export const getBrandList = params => { return axios.get(`${base}/admin/brandList`, { params: params }); };
