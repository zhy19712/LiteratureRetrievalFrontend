<template>
  <div class="app-container">
    <!-- <el-row :gutter="5">
      <el-col :span="16" :offset=4> -->
        <el-container style="height:75%; width:95%; border:1px solid #eee">
          <!-- 边-显示来源（menu） -->
          <el-aside width="200px" style=" border:1px">
            <el-tree :data="menuData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-aside>
          <!-- 显示打开的文献栏位和正文 -->
          <el-container>
            <!-- 文献栏位--可用el-动态编辑标签 -->
            <el-header :gutter="20" style="font-size: 12px; ">
                <el-tabs class="header" v-model="editableTabsValue" type="card" closable @tab-click="handleTabClick" @tab-remove="handleTabClose">
                <el-tab-pane
                  :key="tab.name"
                  v-for="tab in editableTabs"
                  :label="tab.name"
                  :name="tab.tagIndex"
                >
                </el-tab-pane>
              </el-tabs>
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
    editableTabs: [],
    menuData: [ ],
    defaultProps: {
        children: 'children',
        label: 'label'
      },
    editableTabsValue: '',
    }
  },
  
  created() {
    this.getTarget();
  },

  methods:{
    //获取数据
    async getTarget() {
      await fetchTarget().then(response => {
        this.dataGet = response.data
        console.log(this.dataGet)
      });
      var srcMenu = this.dataGet.map(value=>value.source);  
    //console.log(srcMenu);
    
    //生成menuData的一级标题
    for (var src in srcMenu){
      var labelList = this.menuData.map(value=>value.label)
      if(labelList.indexOf(srcMenu[src]) == -1)
      {
        this.menuData.push({label:srcMenu[src], children:[]})
      }
    };
    console.log(this.menuData);

    var labelList =this.menuData.map(value=>value.label)
    //生成menuData的二级标题
    for(var i in this.dataGet){
      var menuIndex = labelList.indexOf(this.dataGet[i].source);
      this.menuData[menuIndex].children.push({label: this.dataGet[i].title, index: i})
    }
    },

    //侧边栏点击事件
    handleNodeClick(data) {
         if(data.index){
           this.global_index = data.index;
           var tagIn = {name:data.label, tagIndex:data.index};
           var indexRepeat = this.editableTabs.map(value=>value.tagIndex);

        if(indexRepeat.indexOf(data.index) == -1){
            this.editableTabs.push(tagIn);
          }
          this.editableTabsValue = data.index
         }
      },
    
    //分页tabs事件处理
    handleTabClose(targetName) {
      var _tagIndexs = this.editableTabs.map(value=>value.tagIndex);
      var cur_tabIndex = _tagIndexs.indexOf(targetName)
      let activeName = this.editableTabsValue;
      let nextTab = this.editableTabs[cur_tabIndex + 1] || this.editableTabs[cur_tabIndex - 1];
      //判断是否在当前页面处理close
        if(activeName == targetName){
          if(nextTab){
            this.global_index = nextTab.tagIndex;
            activeName = nextTab.tagIndex;
          }
        }
        this.editableTabsValue = activeName;
        this.editableTabs.splice(cur_tabIndex, 1);
      },
      
    handleTabClick(tab) {
      this.global_index = tab.name;
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