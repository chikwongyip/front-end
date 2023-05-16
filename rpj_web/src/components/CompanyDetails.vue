<template>
  <el-form ref="companyForm" :model="company" class="company_form">
    <el-form-item label="公司名称" class="item">
      <el-input v-model="company.name"  class="name"></el-input>
    </el-form-item>
    <el-form-item label="公司介绍" class="item">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" :model="company.description" class="description"></el-input>
    </el-form-item>
    <el-form-item label="ICP" class="item">
      <el-input v-model="company.icp"  class="name"></el-input>
    </el-form-item>
    <el-form-item label="tel" class="item">
      <el-input v-model="company.tel"  class="name"></el-input>
    </el-form-item>
    <el-form-item label="address" class="item">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" :model="company.address" class="description"></el-input>
    </el-form-item>
    <el-form-item label="email" class="item">
      <el-input v-model="company.email"  class="name"></el-input>
    </el-form-item>
    <el-form-item label = "logo" class="item">
      <el-upload
          class="upload-demo"
          name="logo"
          action=""
          :before-upload="beforeUpload"
          :show-file-list="false"
          :http-request="uploadFile"
          ref="logo">
        <img v-if="previewUrl" :src="previewUrl" style="max-width: 100%">
        <el-button v-else>选取文件</el-button>
        <div slot="tip" class="el-upload__tip">JPG/PNG/BMP 图片格式，不超过 5MB</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('companyForm')">修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getCompany,editCompany} from "@/api/admin";
export default {
  name: "CompanyDetails",
  data() {
    return {
      formData:{},
      logo:{},
      previewUrl:"",
      company: {
        name: '',
        description: '',
        icp: '',
        tel: '',
        address: "",
        email: '',
        logo: '',
        thumb_logo: ''
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((isValid) => {
        if (isValid){
          this.formData = new FormData()
          this.formData.append("name",this.company.name)
          this.formData.append("description",this.company.description)
          this.formData.append("icp",this.company.icp)
          this.formData.append("tel",this.company.tel)
          this.formData.append("address",this.company.address)
          this.formData.append("email",this.company.email)
          this.formData.append("logo",this.logo)
          editCompany(this.formData).then((response) => {
            if(response.data.errno === 1){
              this.$message({
                message:"更新成功",
                type:"success"
              })
            }
          })
              .catch((error) => {
                this.$message({
                  message:error+"更新失败",
                  type:"error"
                })
              })
        }
      })
    },
    getData(){
      getCompany({id:1}).then((response) => {
        if(response.data.errno === 1){
          this.company.name = response.data.data[0].name
          this.company.description = response.data.data[0].description
          this.company.icp = response.data.data[0].icp
          this.company.logo = response.data.data[0].logo
          this.company.tel = response.data.data[0].tel
          this.company.address = response.data.data[0].address
          this.company.email = response.data.data[0].email
        }
      })
          .then((error) => {
            this.$message(
                {
                  message:error+"获取失败",
                  type:"error"
                }
            )
          })
    },
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
      return true;
    },
    uploadFile(file){
      this.logo=file.file
    }
  },
  mounted() {
    this.getData()
  }
}

</script>

<style scoped>
  .company_form{
    label-width:80px;

    .item{
      width:100px;
      vertical-align: left;
      .name{
        width: 200px;
      }
      .description{
        width: 400px;
      }
    }
  }
</style>