<template>
  <div class="app-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="center" label="所属中心" width="180" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="actions" label="操作" />
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 1
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>
