<template>
  <div>
    <el-button class="addbtn" type="primary" @click="showDialog">
      新增BUG
      <span class="el-icon-circle-plus-outline"></span>
    </el-button>

    <el-dialog title="bug详情" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="bug原因" prop="bugreason">
          <el-input v-model="ruleForm.bugreason"></el-input>
        </el-form-item>

        <div class="buglevel">
          请选择bug强度:
          <el-select v-model="options.value" placeholder="请选择Bug强度">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <el-form-item label="创建时间" prop="start">
          <el-date-picker v-model="ruleForm.start" type="date" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="指派人员" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="附件" prop="extend">
          <el-upload
            class="upload-demo"
            action="/api/uploads"
            name="filename"
            :on-preview="handlePreview"
            :on-remove="remove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
            ref="upload"
            :on-success="success"
            :on-change="change"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import bugLeaveModel from "../../model/bugleave/index";
export default {
  data() {
    return {
      fileList: [],
      selectFileList: [], //选择的图片
      successFileList: [], //上传成功的图片
      bugList: [],
      //   fileList: [], 文件列表
      // selectedList: [],
      // uploadList: [],
      dialogFormVisible: false, //默认对话框隐藏
      options: [
        {
          value: "弱",
          label: "弱"
        },
        {
          value: "中",
          label: "中"
        },
        {
          value: "强",
          label: "强"
        }
      ],
      value: "",
      ruleForm: {
        //表示的是表中的数据
        bugreason: "", //bug原因

        start: "", //开始时间
        username: "", //指派人员
        extend: ""
      },
      rules: {
        // 表示表单中数据验证的规则
        bugreason: [
          { required: true, message: "bug原因不能为空", trigger: "blur" },
          {
            pattern: /^.{2,20}$/i,
            message: "请用20字以内来描述原因",
            trigger: "blur"
          }
        ],
        start: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
        username: [
          { required: true, message: "请选择指派人员", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击新增请假按钮，弹出对话框
    ...mapActions("testbug", ["orderBugList"]),
    showDialog() {
      this.dialogFormVisible = true;
    },
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        //validate对整个表单进行校验的方法，参数为一个回调函数
        if (valid) {
          if (this.selectFileList.length) {
            this.$refs.upload.submit(); //手动上传图片
          } else {
            //这里只验证格式
            let start = new Date(this.ruleForm.start);
            // 正确 就把数据放入数据库
            await bugLeaveModel.add({
              username: this.ruleForm.username,
              value: this.options.value,
              start: start,
              bugreason: this.ruleForm.bugreason,
              extend: this.ruleForm.extend
            });
            this.$refs.ruleForm.resetFields();
            this.dialogFormVisible = false;
            this.search();
            
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    search(){
      this.orderBugList({
        page:this.page,
        type:this.type,
        key:this.key,
        shownum:this.pagesize
      }).then(res=>{
        if(res.code == 1){
          console.log("正确");
          this.total = res.total;
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
    },
    // 上传图片的四个方法
    change(file, fileList) {
      //每次改变触发
      //console.log(fileList);
      this.selectFileList = fileList;
    },
    success(res) {
      this.successFileList.push(res.url);
      if (this.successFileList.length == this.selectFileList.length) {
        bugLeaveModel.add({
          username: this.ruleForm.username,
          value: this.options.value,
          start: new Date(this.ruleForm.start),
          bugreason: this.ruleForm.bugreason,
          extend: this.successFileList.join(" ")
        });
        this.resetForm();
        this.search();
        
      }
    },
    remove(file, fileList) {
      this.selectFileList = fileList;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style scoped>
.addbtn {
  width: 160px;
  height: 80px;
  margin: 20px;
  margin-right: 180px;
  font-size: 15px;
  font-weight: 600;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-form-item {
  margin-top: 22px;
}
.el-date-editor {
  display: flex;
}
.buglevel {
  padding-left: 15px;
  display: flex;
  line-height: 40px;
}
</style>
