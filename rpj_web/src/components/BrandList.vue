<template>
  <el-table :data="brandList">
    <el-table-column prop="brand_id" label="品牌ID" width="140"></el-table-column>
    <el-table-column prop="brand_image" label="品牌Logo" width="120"></el-table-column>
    <el-table-column prop="brand_name" label="品牌名称"></el-table-column>
    <el-table-column label="操作" width="150">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getBrandList,deleteBrand } from "@/api/admin";

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
    },
    handleDel(index){
      this.$confirm('确认删除该记录吗？','提示',{type:"warning"}
      ).then(() => {
        deleteBrand(index).then(result =>{
          if(result.errno === 0){
            console.log("delete success")
          }
          console.log("delete fail")
        })
      })
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