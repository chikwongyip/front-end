<template>
  <section>
<!-- brand list-->
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.brand_name" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="brandList" highlight-current-row v-loading="brandListLoading" @selection-change="handleSelectionChange">
      <el-table-column prop="brand_id" label="品牌ID" width="140"></el-table-column>
      <el-table-column prop="brand_image" label="品牌Logo" width="120"></el-table-column>
      <el-table-column prop="brand_name" label="品牌名称"></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$brand_id, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$brand_id, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--编辑界面-->
    <el-dialog title="编辑" v-model="brandEdit" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="品牌id" prop="brand_id">
          <el-input v-model="editForm.brand_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brand_name">
          <el-input v-model="editForm.brand_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="brandEdit = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
<!-- 新增界面   -->
    <el-dialog title="新增" v-model="brandAdd" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="品牌名称" prop="brand_name">
          <el-input v-model="addForm.brand_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addForm = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
//TODO:规范化变量名
import { getBrandList,deleteBrand,updateBrand,addBrand } from "@/api/admin";

export default {
  name:"BrandList",
  data(){
    return{
      //list
      brandList:[],
      brandListLoading:false,
      selectID: null,
      sels:[],
      //edit
      brandEdit:false,
      editLoading:false,
      editFormRules:{
        brand_name:[
          { requrie:true,message:"请输入品牌名称", trigger:'blur' }
        ]
      },
      editForm:{
        brand_id:"",
        brand_name:""
      },
    //  add
      brandAdd:false,
      addLoading:false,
      addForm:{
        brand_name:""
      },
      addFormRules:{
        brand_name:[
          { requrie:true,message:"请输入品牌名称", trigger:'blur' }
        ]
      }
    }
  },
  methods:{
    getData(){
      //初始化数据 显示list table
      let para = {
        brand_name:this.filter.brand_name
      }
      this.brandListLoading = true
      getBrandList(para).then((res) => {
        if(res.data.errno === 0){
          this.brandList = res.data.data
        }else{
          console.log("加载失败")
        }
      })
    },
    handleSelectionChange(sels){
      this.sels = sels

    },
    handleDel(){
      if (this.selectID){
        this.$confirm('确认删除该记录吗？','提示',{type:"warning"}
        ).then(() => {
          deleteBrand(this.selectID).then(result =>{
            if(result.errno === 0){
              console.log("delete success")
            }
            console.log("delete fail")
          })
        })
      }
      this.selectID = null
    },
    handleEdit(brand_id,row){
      this.brandEdit = true
      this.editForm = Object.assign({},row)
    },
    handleAdd(){
      this.brandAdd = true
      this.addForm = {
        brand_name: ""
      }
    },
    editSubmit(){
      this.$refs.editForm.validate((isValid) =>{
            if (isValid){
              this.$confirm("确认提交吗？","提示",{}).then(
                  () => {
                    this.brandEdit = true
                    let para = Object.assign({},this.editForm)
                    updateBrand(para).then((response) =>{
                      this.brandEdit = false
                      this.$message({
                        message:"提交成功",
                        type:"success"
                      })
                      this.$refs["editForm"].resetFields()
                      this.brandEdit = false
                      this.getData()
                    })

                  }
              )
            }
          }
      )
    },
    addSubmit(){
      this.$refs.addForm.validate((isValid) => {
        if(isValid){
          this.$confirm("确认提交？","提示",{}).then(() => {
            this.addLoading = true;
            let para = Object.assign({},this.addForm)
            addBrand(para).then((response) => {
              if (response.data.errno === 0){
                this.addLoading = false
                this.$message({
                  message:"提交成功",
                  type:"success"
                })
                this.$refs['addForm'].resetFields()
                this.addForm = false
                this.getData()
              }
            })
          })
        }
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>

</style>