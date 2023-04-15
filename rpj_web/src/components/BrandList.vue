<template>
  <el-table :data="brandList">
    <el-table-column prop="date" label="日期" width="140">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
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
    this.brandList = this.getData()
    console.log(this.brandList)
  }
}
</script>

<style scoped>

</style>