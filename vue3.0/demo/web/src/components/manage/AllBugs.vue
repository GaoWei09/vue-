<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true"
      >点击进行筛选</el-button
    >

    <el-dialog title="筛选" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="ruleForm">
        <el-form-item label="人员姓名">
          <el-input v-model="form.key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="bug状态">
          <el-select v-model="form.type" placeholder="请选择要查看bug状态">
            <el-option label="待修复" value="1"></el-option>
            <el-option label="待测试" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </div>
    </el-dialog>

    <el-table :data="allBugList" border style="width: 100%">
      <el-table-column fixed prop="username" label="开发名称">
      </el-table-column>
      <el-table-column fixed prop="bugreason" label="bug原因">
      </el-table-column>
      <el-table-column fixed prop="value" label="bug等级">
      </el-table-column>
      <el-table-column fixed prop="start" label="创建时间">
        <template slot-scope="scope">
          {{ dateFormate(scope.row.start, "yyyy年mm月dd日") }}
        </template>
      </el-table-column>
      <el-table-column fixed prop="extend" label="附件"> </el-table-column>
      <el-table-column fixed="right" label="状态">
        <template slot-scope="scope">
          <el-button type="danger" v-if="scope.row.type == 1">待修复</el-button>
          <el-button type="warning" v-if="scope.row.type == 2"
            >待测试</el-button
          >
          <el-button type="success" v-if="scope.row.type == 3"
            >已完成</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import bugModel from "../../model/user/bug";
export default {
  data() {
    return {
      dialogFormVisible: false, //表单的显示和隐藏

      allBugList: [],
      form: {
        key: "",
        type: "",
      },
      total: 50, //所有的bug数
      pagesize: 5, //每页显示的数据条数
      page: 1, //第几页
    };
  },
  watch: {
    key() {
      this.page=1;
      this.search();
    },
    type() {
      this.page=1;
      this.search();
    },
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.search();
          this.resetForm();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
    },
    changePage(page) {
      // console.log(111);
      this.page = page;
      this.search();
    },
    async search() {
      let { data } = await bugModel.allbug({
        key: this.form.key,
        type: this.form.type,
        page: this.page,
        shownum: this.pagesize,
      });
       this.allBugList = data.data;
       this.total=data.total;
    },
  },
  created() {
    this.search();
   
  },
};
</script>

<style>
</style>