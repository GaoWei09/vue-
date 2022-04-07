<template>
  <div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column fixed prop="username" :label="$t('lang.username')"> </el-table-column>
 
      <el-table-column fixed prop="type" :label="$t('lang.type')"> 
         
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
import userModel from "../../model/user/index";
export default {
  data() {
    return {
      userList: [], //人员列表
    };
  },

  async created() {
    let { data } = await userModel.manage({});
    // console.log(data);
    if (data.code) {
      this.userList = data.data;
    }
  },
};
</script>

<style>
</style>