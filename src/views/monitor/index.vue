<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6">
        原密码：
        <el-input  v-model="origin_password" placeholder="原密码" show-password clearable maxlength="2000"/>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6">
        新密码：
        <el-input v-model="new_password" placeholder="新密码" show-password  clearable maxlength="2000"/>
      </el-col>
    </el-row>
        <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6">
        请再次输入：
        <el-input v-model="new_password_verify" placeholder="请再次输入" show-password  clearable maxlength="2000"/>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6">
        <el-button @click="uploadNewPass" style="">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { changePassword } from '@/api/monitor'

export default {
  data() {
    return {
      origin_password: '',
      new_password: '',
      new_password_verify:'',
      data:[],
    }
  },

  created() {
  },

  methods: {
    uploadNewPass(){
      var user_id = this.$store.getters.id;
      if(this.new_password_verify != this.new_password){
          this.$message({
				  type: 'warning',
				  message: "新密码验证失败!" 
			  });
        return
      }
      changePassword({ "id":user_id, "password":this.origin_password, "new_password":this.new_password }).then(response => {
        this.data = response;
        this.$message({
				  type: 'warning',
				  message: "密码修改成功!" 
			  });
      })
    },
  },
}

</script>
