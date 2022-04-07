<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('lang.username')" prop="username">
        <el-input type="text" v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item :label="$t('lang.type')">
        <el-select v-model="ruleForm.type" :placeholder="$t('lang.type')">
          <el-option label="开发者" value="2"></el-option>
          <el-option label="测试者" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">{{$t("lang.submit")}}</el-button>
        <el-button @click="resetForm()">{{$t("lang.reset")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userModel from "../../model/user/index"

export default {
  data() {
    return {
      labelPosition: "right",
      ruleForm: {
        username: "",
        type: "",
      },
       rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: /^[a-zA-Z][0-9a-zA-Z]{2,11}$/,
            message: "用户名3-12位,以字母开头,允许数字字母构成",
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
            
            let {data}=await userModel.register({
                username:this.ruleForm.username,
                type:this.ruleForm.type
            })
            console.log(data);
            if(data.code){
                this.$message.success(data.msg)

            }else{
                this.$message.error(data.msg)
            }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.ruleForm.username="";
      this.ruleForm.type="";
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
       this.ruleForm.username="";
      this.ruleForm.type="";
    },
  },
};
</script>

<style>
.el-form-item {
  width: 600px;
}
</style>