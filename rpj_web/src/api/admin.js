import axios from 'axios'
let base = "http://localhost:8000/api";
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
};



//TODO:handle productList select insert update delete
export const getProductList = (params) => {
    return axios.get(`${base}/admin/productList`,{params:params})
}
//TODO:handle company select insert update delete
export const getCompany = (params) => {
    return axios.get(`${base}/admin/company`,{params:params})
}
export const editCompany = (params) =>{
    return axios.post(`${base}/admin/companyUpdate`,params,{
        header:{"Content-Type":"multipart/form-data"}
    })
}
// brand
export const getBrandList = params => { return axios.get(`${base}/admin/brandList`, { params: params })}
export const updateBrand = (params) => {
    return axios.post(`${base}/admin/brandUpdate`,params,{headers} )
}
export const addBrand = ( params ) => {
    return axios.post(`${base}/admin/brandAdd`,params,{
        headers:{"Content-Type":"multipart/form-data"}
    })
}
export const deleteBrand = params => { return axios.post(`${base}/admin/brandDelete`,params ) }
//category list
export const getCategoryList = params => { return axios.get(`${base}/admin/categoryList`,{params:params})}
export const updateCategory = (params) => {
    return axios.post(`${base}/admin/categoryUpdate`,params,{
        headers
    })
}
export const addCategory = (params) => {
    return axios.post(`${base}/admin/categoryAdd`,params,{
        headers:{"Content-Type":"multipart/form-data"}
    })
}
export const deleteCategory = (params) =>{
    return axios.post((`${base}/admin/categoryDel`,params,{ headers:{headers}}))
}
