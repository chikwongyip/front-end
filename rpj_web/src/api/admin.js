import axios from 'axios'
let base = "http://localhost:8000/api";
// TODO:handle brandList select insert update delete
export const getBrandList = params => { return axios.get(`${base}/admin/brandList`, { params: params })}

//TODO:handle categoryList select insert update delete
export const getCategoryList = params => { return axios.get(`${base}/admin/categoryList`,{params:params})}
//TODO:handle productList select insert update delete
export const getProductList = params => { return axios.get(`${base}/admin/productList`,{params:params})}
//TODO:handle company select insert update delete
export const getCompany= params => { return axios.get(`${base}/admin/company`,{params:params})}


