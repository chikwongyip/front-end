<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.product_name" placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="productList" highlight-current-row v-loading="listLoading" @selection-change="handleSelectionChange">
      <el-table-column prop="top" label="置顶标志" width="140"></el-table-column>
      <el-table-column prop="product_id" label="产品id" width="140"></el-table-column>
      <el-table-column prop="brand_id" label="品牌id" width="120"></el-table-column>
      <el-table-column prop="category_id" label="类型id"></el-table-column>
      <el-table-column prop="product_name" label="产品名称" width="140"></el-table-column>
      <el-table-column prop="brand_name" label="品牌名称" width="140"></el-table-column>
      <el-table-column prop="category_name" label="类型名称" width="140"></el-table-column>
      <el-table-column prop="product_desc" label="产品描述" width="140"></el-table-column>
      <el-table-column prop="product_standard" label="产品标准参数" width="140"></el-table-column>
      <el-table-column prop="product_model" label="产品型号" width="140"></el-table-column>
    </el-table>
    <el-pagination
        :layout="'total, sizes, prev, pager, next, jumper'"
        :total="data.length"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
    </el-pagination>
  </section>
</template>

<script>
import { getProductList} from "@/api/admin";

export default {
  name:"ProductList",
  data(){
    return{
      filters:{
        product_name:"",
      },
      currentPage:1,
      pageSize:10,
      listLoading:false,
      selectList:[],
      data:[]
    }
  },
  methods:{

    getData(){
      let params = {}
      if(this.filters.product_name){
        params = {
          product_name: this.filters.product_name
        }
      }
      return getProductList(params)
    },
    handleCurrentChange(value){
      this.currentPage = value
    },
    handleSizeChange(value){
      this.pageSize = value
    },
    handleSelectionChange(selected){
      this.selectList = selected
    }
  },
  mounted() {
    this.getData()
        .then(response => {
          if (response.data.errno === 0){
            this.data=response.data.data
          }
          //TODO:加载失败
        })
        .catch(error => {
          console.log(error)
        })
  },
  computed:{
    productList(){
      const start = (this.currentPage-1) * this.pageSize
      const end = start + this.pageSize
      return this.data.slice(start,end)
    }
  }
}
</script>

<style scoped>

</style>