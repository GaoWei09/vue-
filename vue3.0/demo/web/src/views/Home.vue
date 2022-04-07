<template>
  <div class="home">
    <img src="../../public/images/bg3.jpg" alt="">
    <div class="home-buttom">
      <h2 class="title">Bug管理<span class="el-icon-s-platform"></span> </h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="username"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userpwd">
          <el-input
            type="password"
            v-model="ruleForm.userpwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import userModel from "../model/user/index";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        userpwd: "",
      },
      rules: {
        username: [
          {
            pattern: /^[a-zA-Z][0-9a-zA-Z]{2,11}$/,
            message: "用户名3-11位，以字母开头，允许数字字母构成",
            trigger: "blur",
          },
        ],
        userpwd: [
          {
            pattern: /^[0-9a-zA-Z]{5,11}$/,
            message: "密码6-11位，由数字字母构成",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          let res = await userModel.login({
            username: this.ruleForm.username,
            userpwd: this.ruleForm.userpwd,
          });
          console.log(res);
          if (res.data.code) {                                                                                                                                         
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("userinfo",res.data.username);
            
            this.$message.success(res.data.msg);
            if (res.data.path == 1) {
              this.$router.push("/manager");
            }
            if (res.data.path == 2) {
              this.$router.push("/people");
            }
            if (res.data.path == 3) {
              this.$router.push("/test");
            }
          } else {
           
            this.$message.error(res.data.msg);
          }
        } else {
          
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.home {
  width: 100%;
  height: 100%;
  position: relative;
}
.home img{
  width: 100%;
  height: 100%;
}
.home .home-buttom{
  position: absolute;
  width: 400px;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.title{
  color:salmon;
  line-height: 100px;
  margin-left: 90px;
}
</style>