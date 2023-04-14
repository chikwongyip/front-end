<template>
  <el-container class="container">
    <el-header class="header">

    </el-header>
    <el-aside class="sideBar">
      <el-menu :default-openeds="['1','8']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-container>

</template>

<script>
export default {
  // TODO:LOGO
  name: "AdminIndex"
}
</script>

<style scoped>

  .container{
    position: absolute;
    top:80px;
    bottom: 0px;
    width: 100%;
    border: 1px solid red;
    line-height: 40px;
    .header{
      text-align:right;
      font-size:12px;
    }
    .sideBar{
      width: 200px;
      background-color: rgb(238, 241, 246);
    }
  }
</style>