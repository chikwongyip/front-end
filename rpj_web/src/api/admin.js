import axios from 'axios'
let base = "http://localhost:8000/api";
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
};
// TODO:handle brandList select insert update delete
export const getBrandList = params => { return axios.get(`${base}/admin/brandList`, { params: params })}
export const deleteBrand = params => { return axios.post(`${base}/admin/brandDelete`,params ) }
export const addBrand = params => { return axios.post(`${base}/admin/brandAdd`,params) }
//TODO:handle categoryList select insert update delete
export const getCategoryList = params => { return axios.get(`${base}/admin/categoryList`,{params:params})}
//TODO:handle productList select insert update delete
export const getProductList = params => { return axios.get(`${base}/admin/productList`,{params:params})}
//TODO:handle company select insert update delete
export const getCompany= params => { return axios.get(`${base}/admin/company`,{params:params})}


export const updateBrand =
    (params) => {
        //console.log(params)
        return axios.post(`${base}/admin/brandUpdate`,params,{headers} )
    }