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
    <el-table :data="brandList" highlight-current-row v-loading="listLoading" @selection-change="handleSelectionChange">
      <el-table-column prop="brand_id" label="品牌ID" width="140"></el-table-column>
      <el-table-column prop="brand_image" label="品牌Logo" width="120"></el-table-column>
      <el-table-column prop="brand_name" label="品牌名称"></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :layout="'total, sizes, prev, pager, next, jumper'"
        :total="data.length"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    >
    </el-pagination>
<!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" >
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="id">
          <el-input v-model="editForm.brand_id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="editForm.brand_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit('editForm')" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
<!-- 新增界面   -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="品牌名称" prop="brand_name">
          <el-input v-model="addForm.brand_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
              class="upload-demo"
              name="file"
              action=""
              :before-upload="beforeUpload"
              :show-file-list="false"
              :http-request="uploadFile"
              ref="file">
            <img v-if="previewUrl" :src="previewUrl" style="max-width: 100%">
            <el-button v-else>选取文件</el-button>
            <div slot="tip" class="el-upload__tip">JPG/PNG/BMP 图片格式，不超过 5MB</div>
          </el-upload>
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
      previewUrl:'',
      formData:{},
      filters:{
        brand_name:''
      },
      dialogHeight:'auto',
      data:[],             //列表内容
      currentPage:1,
      pageSize:10,
      listLoading:false,        //加载动画
      selectID: "",
      selectedList:[],
      //edit
      editFormVisible:false, //编辑界面显示控制
      editLoading:false,     //编辑加载画面
      //编辑校验
      editFormRules:{
        brand_name:[
          { requrie:true,message:"请输入品牌名称", trigger:'blur' }
        ]
      },
      // 编辑后返回内容
      editForm:{
        brand_id:'',   //不可编辑
        brand_name:''
      },
    //  add
      addFormVisible:false, //添加界面显示控制
      addLoading:false,     //添加加载画面
      //添加内容
      addForm:{
        brand_name:"",
        image:{}
      },
      //校验规则
      addFormRules:{
        brand_name:[
          { requrie:true,message:"请输入品牌名称", trigger:'blur' },
        ],
        imageUrl:[
          { requrie:true,message:"请上传图片", trigger:'blur' },
        ]
      }
    }
  },
  methods:{
    getData(){
      //初始化数据 显示list table
      let para = {
        brand_name:this.filters.brand_name
      }
      this.listLoading= true
      getBrandList(para).then((res) => {
        if(res.data.errno === 0){
          this.data = res.data.data
          this.listLoading = false
        }else{
          console.log("加载失败")
        }
      })
    },
    handleSelectionChange(selected){
      this.selectedList = selected
    },
    handleDel(index,row){
      let id = Object.assign({},row).brand_id
      if (id){
        this.$confirm('确认删除该记录吗？','提示',{type:"warning"}
        ).then(() => {
          let param = {
            brand_id:id
          }
          deleteBrand(param).then(result =>{
            if(result.data.errno === 0){
              console.log("delete success " + index + row)
              this.brandList.splice(index,1)
            }
            console.log("delete fail")
          })

        })
      }
      this.selectID = null
    },
    handleEdit(index,row){
      this.editForm.brand_id = Object.assign({},row).brand_id
      this.editForm.brand_name = Object.assign({},row).brand_name
      this.editFormVisible = true
    },
    handleAdd(){

      this.addFormVisible = true
      this.addForm = {
        brand_name: ""
      }
    },
    editSubmit(formName){
      this.$refs[formName].validate((valid) =>{
            if (valid){
              this.$confirm("确认提交吗？","提示",{}).then(
                  () => {
                    this.editLoading = true
                    let param = JSON.stringify(this.editForm)
                    // let param = this.editForm
                    updateBrand(param).then((response) =>{
                      this.editLoading = false
                      if(response.data.errno === 0){
                        this.$message({
                          message:"提交成功",
                          type:"success"
                        })
                        this.$refs[formName].resetFields()
                        this.editFormVisible = false
                        this.getData()
                      }
                    })
                  }
              )
            }
          }
      )
    },
    uploadFile(file){
      this.formData = new FormData
      this.formData.append("brand_name",this.addForm.brand_name)
      this.formData.append("file",file.file)
    },
    addSubmit(){
      this.$refs.addForm.validate((isValid) => {
        if(isValid){
          this.$confirm("确认提交？","提示",{}).then(() => {
            this.addLoading = true;
            addBrand(this.formData).then((response) => {
            if (response.data.errno === 0){
              this.addLoading = false
              this.$message({
                message:"提交成功",
                type:"success"
              })
              this.$refs['addForm'].resetFields()
              this.addLoading= false
              this.getData()
              }
            })
          })
        }
      })
    },
    // 上传文件之前 将图片转换为16进制格式
    beforeUpload(file){
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error('仅支持JPG和PNG格式图片！');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2MB！');
        return false;
      }
      this.addForm.image = file.file
      return true;
    },
    handleCurrentChange(value){
      this.currentPage = value;
    },
    handleSizeChange(value){
      this.pageSize = value
    }
  },
  mounted() {
    this.getData()
  },
  computed:{
    brandList(){

      const start = (this.currentPage-1) * this.pageSize
      const end = start + this.pageSize
      return this.data.slice(start,end)
    }
  }
}
</script>

<style scoped>

</style>