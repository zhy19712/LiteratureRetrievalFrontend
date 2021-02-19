<template>
  <div class="app-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="url" label="url" width="180" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          {{ scope.row.type == 1 ? '网站' : scope.row.type == 2 ?'公众号': '' }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
    </el-table>
  </div>
</template>

<script>
import { fetchTarget, changeStatus } from '@/api/monitor'
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
    },

    changeStatus(row) {
      console.log(row.status)

      changeStatus(row).then(response => {
        console.log(response)
      })
    }
  }
}

</script>
