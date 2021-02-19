<template>
  <div class="app-container">
    <!-- <el-row :gutter="5">
      <el-col :span="16" :offset=4> -->
        <!-- 显示各个中心 -->
    <el-row :gutter="20">
      <el-col el-col :span="20"  style="width:95% ;text-align:left">
        <el-button type="primary" v-for="(item, index) in centers" :key="'Center' + index"  size="small" @click="centerClick(item.id)">{{ item.center }}</el-button>
        <br><br>
      </el-col>
    </el-row>

  <el-container style="height:550px; width:95%; border:1px solid #eee">
      <!-- 边-显示来源（menu） -->
      <el-aside width="300px"  style=" border:1px">
        <el-container>
          <el-header style=" border:1px">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable maxlength="2000" />
          </el-header>
          <el-main>
            <el-tree :data="menuData" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" ref="tree"></el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <!-- 显示相关的表格和正文 -->
      <el-container>
          <el-header  style=" border:1px">
            <el-input v-model="filterTable" placeholder="输入关键字进行过滤" clearable maxlength="2000" style=" width: 500px" />
          </el-header>
        <el-container>
        <el-aside width="500px"  style=" border:1px">
          <el-table :data="tableData"  height="550px" @row-click="handleRowClick" border style="width:100%">
          <el-table-column prop='title' label="标题" width="200px"></el-table-column>
          <el-table-column prop='time' label="日期" width="100px" :formatter="dateFormat"></el-table-column>
          <el-table-column prop='target' label="来源" width="100px"></el-table-column>
          <el-table-column label="链接" width="100px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-share" @click="dialogVisible = true , getArticle(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-aside>

        <el-container>
        <!-- 文献栏位--可用el-动态编辑标签 -->
        <el-header :gutter="20" style="font-size: 12px; ">
          <el-tabs class="header" v-model="editableTabsValue" type="card" closable @tab-click="handleTabClick" @tab-remove="handleTabClose">
            <el-tab-pane
              :key="tab.name"
              v-for="tab in editableTabs"
              :label="tab.label"
              :name="tab.name"
            >
              <!-- :label="tab.name"
              :name="tab.tabIndex" -->
            </el-tab-pane>
          </el-tabs>
        </el-header>
          <!-- 正文显示-- -->
        <el-main>
          <el-container style="height:100%">
            <el-header class="header" :gutter="20" style="text-align:left; font-size: 12px; margin-bottom: -15px;">{{editableTabs.length > 0 ? 'Title: ' + editableTabs[global_index].name : ''}}</el-header>
            <!-- <el-footer class="url" :gutter="20" style="text-align:left; font-size: 12px; margin-bottom: 10px; border: 1px solid">URL: {{dataGet[global_index].url}}</el-footer> -->
            <el-main class="text" style="text-align:left; font-size: 12px; margin-bottom: 10px;">{{editableTabs.length > 0 ? editableTabs[global_index].text : ''}}</el-main>
          </el-container>
        </el-main>
        </el-container>
        </el-container>
      </el-container>
    </el-container>

    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      height="50%"
      :before-close="handleClose">
        <iframe :src="articleHtml" frameborder="0" width="100%" height="500px"></iframe>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>



<script>
import { getCenters } from '@/api/article'
import { getKeywordTree } from '@/api/article'
import { getArticleTable } from '@/api/article'
import { getArticleHtml } from '@/api/article'


export default {
  data(){
    return{
    dataGet:[],
    centers:[],
    global_index: 0,
    editableTabs: [],
    menuData: [ ],
    tableData:[ ],
    defaultProps: {
        children: 'children',
        label: 'label'
      },
    editableTabsValue: '',
    articleHtml:'',
    filterText:'',
    filterTable:'',

    dialogVisible: false,
    }
  },

  //搜索
  watch:{
    filterText(val) {
        this.$refs.tree.filter(val);
      }
  },

  created() {
    this.getTarget();
  },

  methods:{
    //获取中心数据
    async getTarget() {
      await getCenters().then(response => {
        this.centers = response.data;
        //console.log(this.centers);
      });
    },

    getArticle(id){
      getArticleHtml({"article_id":id, "type":"html"}).then(response => {
        this.articleHtml = response.data;
        //console.log(this.articleHtml)
      });
    },

    centerClick(centerId){
      //console.log(centerId)
      getKeywordTree({"center_id":centerId}).then(response => {
        this.menuData = response.data;
        console.log(this.menuData)})
    }, 

        //侧边栏点击事件
    handleNodeClick(data) {
      console.log(data);
      if(!data.keyword_id){
        return;
      }
      var keywordID = data.keyword_id;
      //初始化显示第一页内容
      getArticleTable({"page": 1, "size":10, "keyword_id":keywordID}).then(response => {
        this.tableData = response.data;
        console.log(this.tableData)})
      },

    handleRowClick(row, column, cell, event){
      console.log(row);
      if(column.label == '链接'){
        return;
      }
      var _index= row.id-1;
      var tabLabel = row.title

      if(tabLabel.length > 10){
        tabLabel = tabLabel.slice(0, 10);
      }

      var tagIn = {name:row.title,label:tabLabel, tabIndex:_index, text:row.text};
      var indexRepeat = this.editableTabs.map(value=>value.tabIndex);

      if(indexRepeat.indexOf(_index) == -1){
        this.editableTabs.push(tagIn);
        }
      
      let indexGlobal = this.editableTabs.map(value=>value.tabIndex);
      this.editableTabsValue = row.title;
      this.global_index = indexGlobal.indexOf(_index);
  },

    
    //分页tabs事件处理
    handleTabClose(targetName) {
      //console.log(targetName)
      var _tabIndexs = this.editableTabs.map(value=>value.name);
      var close_tabIndex = _tabIndexs.indexOf(targetName);

      let activeName = this.editableTabsValue;
      let nextTab = this.editableTabs[close_tabIndex + 1] || this.editableTabs[close_tabIndex - 1];
      
      //删除选中项后
      this.editableTabs.splice(close_tabIndex, 1);
      _tabIndexs = this.editableTabs.map(value=>value.name);
      var cur_tabIndex = _tabIndexs.indexOf(activeName)

      //判断是否在当前页面处理close
        if(activeName == targetName){
          if(nextTab){
            this.global_index = _tabIndexs.indexOf(nextTab.name);
            activeName = nextTab.name;
            this.editableTabsValue = activeName;
          }
        }
        else{
          this.global_index = cur_tabIndex;
        }
      },
      
    handleTabClick(tab) {
      //console.log(tab.dataIndex)
      var _tabIndexs = this.editableTabs.map(value=>value.name);
      var cur_tabIndex = _tabIndexs.indexOf(tab.name)
      this.global_index = cur_tabIndex;
    },
    dateFormat(row, column, cellValue){
      if (!cellValue) return ''
      if (cellValue.length > 10) {       //最长固定显示10个字符
        return cellValue.slice(0, 10);
      }
      return cellValue;
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
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