<template>
  <el-form ref="form" :model="company" class="company_form">
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
    <el-form-item label = "upload_logo" class="item">
      <upload-file @upload-success="handleSuccess">

      </upload-file>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UploadFile from "@/components/UploadFile";
export default {
  name: "CompanyDetails",
  components: { UploadFile },
  data() {
    return {
      uploadFileName:'',
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
    onSubmit() {
      console.log('submit!');
    },
    handleSuccess(response) {
      this.uploadFileName = response.filename
    }
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