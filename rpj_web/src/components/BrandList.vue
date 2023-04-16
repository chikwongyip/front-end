<template>
  <el-table :data="brandList">
    <el-table-column prop="brand_id" label="品牌ID" width="140"></el-table-column>
    <el-table-column prop="brand_image" label="品牌Logo" width="120"></el-table-column>
    <el-table-column prop="brand_name" label="品牌名称"></el-table-column>
  </el-table>
</template>

<script>
import { getBrandList} from "@/api/admin";

export default {
  name:"BrandList",
  data(){
    return{
      brandList:[]
    }
  },
  methods:{
    getData(){
      return getBrandList()
    }
  },
  mounted() {
    this.getData()
        .then(response => {
         if (response.data.errno === 0){
           this.brandList = response.data.data
         }
         //TODO:加载失败
    })
        .catch(error => {
          console.log(error)
        })
  }
}
</script>

<style scoped>

</style>