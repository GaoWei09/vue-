<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column fixed prop="username" label="员工名称"></el-table-column>
    <el-table-column fixed prop="bugreason" label="bug原因"></el-table-column>
    <el-table-column fixed prop="value" label="bug等级"></el-table-column>
    <el-table-column fixed prop="start" label="创建时间">
      <template slot-scope="scope">
        {{dateFormate(scope.row.start,"yyyy-mm-dd")}}
      </template>
    </el-table-column>
    <el-table-column prop="extend" label="附件">
      <template slot-scope="scope">
        <span v-if="scope.row.extend">
          <el-image 
    style="width: 70px; height: 70px"
    :src="scope.row.extend.split(' ')[0]" 
    :preview-src-list="scope.row.extend.split(' ')">
  </el-image>
        </span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <span v-if="type == 3">
          <span v-if="scope.row.type == 1">
            <el-button type="danger" @click="updateType(scope.row,2)">待修复</el-button>
          </span>
          <span v-if="scope.row.type == 2">
            <el-button type="danger" @click="updateType(scope.row,1)">Bug未解决</el-button>
            <el-button type="success" @click="updateType(scope.row,3)">关闭Bug</el-button>
          </span>
          <span v-if="scope.row.type == 3">
            <el-button type="success" >BUG已关闭</el-button>
          </span>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
   data() {
      return {
        url: '',
        srcList: []
      }
    },
  props: ["list", "type"],
  methods: {
    updateType(item, type) {
      //item是一个对象  type修改的状态
      this.$emit("updatetype", { item, type }); //传一个参数  对象 {item:item,type:type}
    }
  }
};
</script>

<style>
.cell{
  width: 600px;
}
</style>
