<template>
  <el-container direction="vertical">
    <MallHeader> </MallHeader>
    <el-container direction="vertical">
      <MallMain> </MallMain>
      <MallFooter></MallFooter>
    </el-container>
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
  body > .el-container {
    margin-bottom: 40px;
  }
</style>