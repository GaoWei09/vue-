<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="bugreason" label="Bug详情"></el-table-column>
      <el-table-column fixed prop="value" label="Bug等级"></el-table-column>
      <el-table-column fixed label="开始时间">
        <template slot-scope="scope">
          {{ dateFormate(scope.row.start, "yyyy年mm月dd日") }}
      
        </template>
      </el-table-column>

      <el-table-column fixed label="附件">
        <template slot-scope="scope">
          <span v-if="scope.row.extend">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.extend.split(' ')[0]"
              :preview-src-list="scope.row.extend.split(' ')"
            ></el-image>
          </span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <span v-if="type == 2">
            <span v-if="scope.row.type == 1">
              <el-button type="danger" @click="updateType(scope.row, 2)">待修复</el-button>
            </span>
            <el-button type="success" v-if="scope.row.type == 2">修复完成,待测试</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["list", "type"],
  methods: {
    updateType(item, type) {
      this.$emit("updatetype", { item, type }); //传一个参数
    }
  }
};
</script>