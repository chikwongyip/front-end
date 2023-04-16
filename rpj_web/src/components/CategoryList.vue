<template>
  <el-table :data="categoryList">
    <el-table-column prop="category_id" label="产品类型" width="140"></el-table-column>
    <el-table-column prop="category_name" label="产品类型名称" width="120"></el-table-column>
    <el-table-column prop="category_image" label="产品类型图片"></el-table-column>
  </el-table>
</template>

<script>
import { getCategoryList} from "@/api/admin";

export default {
  name:"CategoryList",
  data(){
    return{
      categoryList:[]
    }
  },
  methods:{
    getData(){
      return getCategoryList()
    }
  },
  mounted() {
    this.getData()
        .then(response => {
          if (response.data.errno === 0){
            this.categoryList= response.data.data
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