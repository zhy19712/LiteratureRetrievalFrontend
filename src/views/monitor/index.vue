<template>
  <div class="app-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="url" label="url" width="180" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="remark" label="备注" />
    </el-table>
  </div>
</template>

<script>
import { fetchTarget } from '@/api/monitor'
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getTarget()
  },
  methods: {
    getTarget() {
      this.listLoading = true
      fetchTarget().then(response => {
        this.tableData = response.data
      })
    }
  }
}
</script>
