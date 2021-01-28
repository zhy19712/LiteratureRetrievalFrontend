<template>
  <div class="app-container">
    <el-input-number
      v-model="num"
      :min="1"
      :max="10"
      label="描述文字"
      @change="handleChange"
    />
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
