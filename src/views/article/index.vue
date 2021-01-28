<template>
  <div class="app-container">
    <!-- <el-row :gutter="5">
      <el-col :span="16" :offset=4> -->
        <el-container style="height:500px; border:1px solid #eee">
          <!-- 边-显示来源（menu） -->
          <el-aside width="200px" style=" border:1px">
            <el-button  v-for="(item, index) in dataGet" :key="index" @click="showIndexData(item,index)" style="margin-left:10px border:1px">
                {{item.id}}. {{item.title}}
                <br>
            </el-button>
          </el-aside>
          <!-- 显示打开的文献栏位和正文 -->
          <el-container>
            <!-- 文献栏位--可用el-动态编辑标签 -->
            <el-header style="text-align:left; font-size: 12px; border: 1px solid">
                <el-tag
                  v-for="tag in tags"
                  :key="tag.name"
                  closable
                  :index="tag.tagIndex"
                  @click="handleTagClick(tag.tagIndex)"
                  @close="handleTagClose(tag)" style=" margin-left: 3px;">
                  {{tag.name}}
                  
                </el-tag>
             </el-header>
             <!-- 正文显示-- -->
            <el-main>
              <el-container v-if="dataGet">
                <el-header class="header" :gutter="20" style="text-align:left; font-size: 12px; margin-bottom: 10px; border: 1px solid">Title:{{dataGet[global_index].title}}  Time: {{dataGet[0].time}}</el-header>
                <el-footer class="url" :gutter="20" style="text-align:left; font-size: 12px; margin-bottom: 10px; border: 1px solid">URL: {{dataGet[global_index].url}}</el-footer>
                <el-main class="text" style="text-align:left; font-size: 12px; margin-bottom: 10px; border: 1px solid">{{dataGet[global_index].text}}</el-main>
              </el-container>
           </el-main>
          </el-container>
        </el-container>
      <!-- </el-col>
    </el-row> -->
  </div>
</template>


<script>
import { fetchTarget } from '@/api/article'

export default {
  data(){
    return{
    dataGet:[],
    global_index: 0,
    tags: [],
    }
  },
  
  created() {
    this.getTarget();
  },

  methods:{
    getTarget() {
      fetchTarget().then(response => {
        this.dataGet = response.data
        console.log(this.dataGet)
      })
    },
      
      this.global_index = index;
      var tagIn = {name:item.title, tagIndex:index};
      var indexRepeat = this.tags.map(value=>value.tagIndex);

      if(indexRepeat.indexOf(index) == -1){
        this.tags.push(tagIn);
      }
    },
    handleTagClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
    handleTagClick(index) {
      this.global_index = index;
    },
  },
}
</script>

<style>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    margin-bottom: 0px;
    line-height: 50px;
  }
</style>