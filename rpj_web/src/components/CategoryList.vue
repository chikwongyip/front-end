<template>
  <section>
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
    <el-table :data="category_list" highlight-current-row v-loading="listLoading" @selection-change="handleSelectionChange">
      <el-table-column prop="category_id" label="产品类型id" width="140"></el-table-column>
      <el-table-column prop="category_name" label="产品类型名称" width="120"></el-table-column>
      <el-table-column prop="category_image" label="产品类型图片"></el-table-column>
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
        @size-change="handleSizeChange">
    </el-pagination>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" >
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="id">
          <el-input v-model="editForm.category_id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="editForm.category_name" autocomplete="off"></el-input>
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
        <el-button type="primary" @click.native="addSubmit('addForm')" :loading="addFormLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getCategoryList, updateCategory,addCategory,deleteCategory} from "@/api/admin";

export default {
  name:"CategoryList",
  data(){
    return{
      data:[],
      formData:{},
      filters:{
        category_name:""
      },
      currentPage:1,           //当前页
      pageSize:2,             //每页显示条数
      listLoading:false,
      selectedList:[],
      editLoading:false,
      editFormVisible:false,
      editForm:{
        category_id:"",
        category_name:"",
        file:{}
      },
      editFormRules:{
        category_name:[
          {
            requrie:true,message:"请输入品牌名称", trigger:'blur'
          }   //校验brand name 是否合法输入
        ]
      },
      addFormLoading:false,
      addFormVisible:false,
      addForm:{
        category_id:"",
        category_name:"",
        file:{}
      },
      addFormRules:{
        category_name:[
          {
            require:true,message:"请输入类别名称",trigger:"blur"
          }
        ]
      },
      previewUrl:"",

    }
  },
  methods:{
    getData(){
      let param = {}
      if(this.filters.category_name){
        param = {
          category_name:this.filters.category_name
        }
      }
      return getCategoryList(param)
    },
    handleCurrentChange(value){
      this.currentPage = value;
    },
    handleSizeChange(value){
      this.pageSize = value
    },
    handleSelectionChange(selected) {
      this.selectedList = selected
    },
    handleEdit(index, row) {
      this.editFormVisible = true
      this.editForm.category_id = Object.assign({},row).brand_id
      this.editForm.category_name = Object.assign({},row).brand_name
    },
    handleAdd() {
      this.addFormVisible=true
    },
    handleDel(index, row) {
      this.$confirm("确认删除吗","提示",{}).then( () =>
      {
        let category_id = Object.assign({},row).category_id
        let params = {
          category_id:category_id
        }
        deleteCategory(params).then((response) =>{
          if(response.data.errno === 1){
            this.$message({
              message:"删除成功",
              type:"success"
            })
          }
        })
            .catch((error) => {
              this.$message(
                  {
                    message:error+"删除失败",
                    type:"error"
                  }
              )
            })
      })
    },
    editSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.$confirm("确认提交吗？","提示",{}).then( () =>
              {
                let param = JSON.stringify(this.editForm)
                updateCategory(param).then((response) =>{
                  if(response.data.errno === 1){
                    this.$message({
                      message:"提交成功",
                      type:"success"
                    })
                    this.$refs[formName].resetFields()
                    this.editFormVisible = false
                    this.getData()
                  }
                })
                    .catch((error) =>{
                      this.$message({
                        message:error + "修改失败" ,
                        type:"error"
                      })
                      this.editLoading = false
                    })
              }
          )
        }
      })
    },
    beforeUpload(file) {
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
      return true;
    },
    uploadFile(file) {
      this.formData = {}
      this.formData = new FormData()
      this.formData.append("category_name",this.addForm.category_name)
      this.formData.append("file",file.file)
    },
    addSubmit(formName) {
      this.$refs(formName).validate((valid) => {
        if (valid){
          this.$confirm("确认提交吗？","提示",{}).then(() =>{
            this.addFormLoading = true
            addCategory(this.formData).then((response) => {
              if (response.data.errno === 0){
                this.data = response.data
                this.addFormLoading = true
              }
            })
                .catch((err) =>{
                  this.$message({
                    message:err + "添加失败",
                    type:"error"
                  })
                })
          })
        }
      })
    }
  },
  mounted() {
    this.getData()
        .then(response => {
          if (response.data.errno === 0){
            this.data= response.data.data
          }
          //TODO:加载失败
        })
        .catch(error => {
          console.log(error)
        })
  },
  computed:{
    category_list(){
      const start = (this.currentPage-1) * this.pageSize
      const end = start + this.pageSize
      return this.data.slice(start,end)
    }
  }
}
</script>

<style scoped>

</style>