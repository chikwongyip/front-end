<template>
  <el-container class="header">
    <el-header >
       <MallHeader></MallHeader>
    </el-header>
    <el-main>
      <MallMain></MallMain>
    </el-main>
    <el-footer>
      <MallFooter></MallFooter>
    </el-footer>
  </el-container>
</template>

<script>
import MallHeader from "@/components/MallHeader";
import MallFooter from "@/components/MallFooter";
import MallMain from "@/components/MallMain";
export default {
  name: "IndexPage",
  components:{
    MallHeader,
    MallMain,
    MallFooter
  }
}
</script>

<style scoped>
  .header{
    margin-top: 10px;
  }
</style>