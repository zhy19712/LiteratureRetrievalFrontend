<template>
  <div class="app-container" style="height:670px; width:100%; min-width:1295px">
    <el-container  style="height:10%; background-color: #247CDA; width:100%;">
      <el-menu
      :default-active="activeIndex"
      class="center-menu"
      mode="horizontal"
      @select="centerSelect"
      background-color="#247CDA"
      text-color="#90E1FF"
      active-text-color="#fff">
        <el-menu-item v-for="(item, center_index) in centers" :key="'Center' + center_index" :index="item.id.toString()" >
          {{ item.center }}
        </el-menu-item>
      </el-menu>
    </el-container>

    <el-container style="height:90%; width:100%;">
      <!-- 边-显示来源（menu） -->
      <el-aside class="menu-aside" width="250px" height = "80%"  style="border:1px solid #eee">
        <el-container>
          <el-header style="padding:10px; border:1px solid #eee;">
            <el-input v-model="filter_text" placeholder="关键字过滤" clearable maxlength="2000" />
          </el-header>
          <el-main style="height:75%; border:1px solid #eee ">
            <el-tree 
            :data="menuData" 
            :props="defaultProps" 
            :filter-node-method="filterNode" 
            default-expand-all
            @node-click="handleNodeClick" 
            ref="tree" highlight-current>
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <!-- 显示相关的表格和正文 -->
      <el-container style="height:90%">
          <el-header :gutter="2"  style="padding:10px; border:1px solid #eee">
            <el-col :span="3">
              <el-input v-model="filter_table" placeholder="表格过滤" clearable maxlength="2000" style="" />
            </el-col>
            <el-col :span="15" offset="1" class='global_search_div' style=" min-width:600px;height:43px; border:2px solid #eee">
              <el-col :span="5">
                <p style="text-align:center; height:40px; margin:10px">全文章搜索</p>
              </el-col>
              <el-col  :span="12">
                <el-date-picker 
		             v-model="search_data"
                 placeholder="起始时间"
                 value-format="yyyy-MM-dd"
                 type="daterange"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期">
		            </el-date-picker>
              </el-col>
              <el-col :span="4">
                <el-input v-model="global_search" placeholder="搜索关键字" clearable maxlength="2000" style="" />
              </el-col>

              <el-col :span="1" :offset="1"> 
                <el-button icon="el-icon-search" circle @click="globalSearch(search_data,global_search)"></el-button>
              </el-col>
            </el-col>
            
            <el-col v-if="editableTabs.length > 0" :span="3" :offset="1"> 
              <el-button  icon="el-icon-sort" @click="switchMain" style="margin-left: 8px">{{message}}</el-button>
            </el-col>
          </el-header>
        <el-container style="height:99%;">
        <el-aside class="table-aside"  width="402px"  style="max-height=70%; border:1px">
          <el-table :data="tables" 
          highlight-current-row
          @current-change="handleCurrentChange"  
          @row-click="handleRowClick" 
          border 
          :header-cell-style="{background:'#247CDA', color:'#90E1FF'}"
          style="width:100%; max-height=70%"  >
            <el-table-column prop='title' label="标题" width="200px" height="40px" style="color">
              <template slot-scope="scope">
                 <span class="col-cont" v-html="showData(scope.row.title)"></span>
               </template>
           </el-table-column>
           <el-table-column prop='time' label="日期" width="100px" height="40px">
             <template slot-scope="scope">
                <span class="col-cont" v-html="showData(dateFormat(scope.row.time))"></span>
              </template>
            </el-table-column>
            <el-table-column prop='target' label="来源" width="100px" height="40px">
              <template slot-scope="scope">
               <span class="col-cont" v-html="showData(scope.row.target)"></span>
             </template>
            </el-table-column>
          </el-table>
        </el-aside>

        <el-container style="width:100%; height:90%; border:1px solid #eee">
        <!-- 文献栏位--可用el-动态编辑标签 -->
          <el-tabs class="header" v-model="editableTabsValue"  type="card" closable @tab-click="handleTabClick" @tab-remove="handleTabClose" 
          style="height:15%;width:100%;">
            <el-tab-pane
              :key="tab.name"
              v-for="tab in editableTabs"
              :label="tab.label"
              :name="tab.name"
            >
            </el-tab-pane>
              <!-- 正文显示-- -->
              <el-main v-if="editableTabs.length > 0" style="height:500px;padding:0">
                <iframe v-show="isHtml" :src="getArticle(editableTabs[global_index].id)" frameborder="0" width="100%" height="90%" padding="-10px" ></iframe> 
                <div v-show="isText" style="height:90%">
                  <el-header class="header" style="text-align:left; height:10%; font-size: 12px; margin-bottom: -15px;">{{editableTabs.length > 0 ? 'Title: ' + editableTabs[global_index].name : ''}}</el-header>
                  <el-main class="text" style="text-align:left; height:85%; font-size: 12px; margin-bottom: 10px;">{{editableTabs.length > 0 ? editableTabs[global_index].text : ''}}</el-main>
                </div>
              </el-main>
          </el-tabs>
        </el-container>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import { getCenters } from '@/api/article'
import { getKeywordTree } from '@/api/article'
import { getArticleTable } from '@/api/article'
import { getArticleHtml } from '@/api/article'
import { getGlobalSearch } from '@/api/article'


export default {
  data(){
    return{
    dataGet:[],
    centers:[],
    global_index: 0,
    activeIndex:'',
    editableTabs: [],
    menuData: [ ],
    tableData:[ ],
    defaultProps: {
        children: 'children',
        label: 'label'
      },
    search_data:'',
    editableTabsValue: '',
    articleHtml:'',
    filter_text:'',
    filter_table:'',
    global_search:'',
    _text:'',
    currentRow: null,
    isHtml:true,
    isText:false,
    dialogVisible: false,
    message: "切换纯文本",
    }
  },

  //监听-表格筛选条件
  computed:{
    tables: function(){
      var filtered_tables = this.tableData;
      const serch_key = this.filter_table;

    if(serch_key) {
        filtered_tables = this.tableData.filter(data => !serch_key || data.title.toLowerCase().includes(serch_key.toLowerCase())
        || data.time.toLowerCase().includes(serch_key.toLowerCase()) || data.target.toLowerCase().includes(serch_key.toLowerCase()))
     
    };
      return filtered_tables;
    },

  },

  //监听-搜索
  watch:{
    filter_text(val) {
        this.$refs.tree.filter(val);
      },

  },

  //created: 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  created() {
    //初始化界面时，获取对应当前中心并展示
    this.getTarget();
    this.activeIndex = (this.$store.getters.center_id).toString();
    getKeywordTree({"center_id": this.$store.getters.center_id}).then(response => {
      this.menuData = response.data;
      //获取当前目录的首个keyword_id，之后发出table的获取申请并显示
      var _keyword_id = (((this.menuData[0]).children)[0].keyword_id);
      getArticleTable({"page": 1, "size":1000, "keyword_id":_keyword_id}).then(response => {
        this.tableData = response.data;})
    });
  },

  methods:{
      handleCurrentChange(val) {
        this.currentRow = val;
      },

    //切换正文显示
    switchMain(){
      if (this.isHtml) {
          this.message = "切换网页";
        } else {
          this.message = "切换纯文本";}
      
      this.isHtml = ! this.isHtml;
      this.isText = ! this.isText;
    },

    //全局搜索
    globalSearch(search_data,key){
      //search_data[s_time,e_time]数组
      if(search_data.length == 0){
			    this.$message({
				  type: 'warning',
				  message: "请重新选择时间区间！" 
			  });
		  }
      else {
      getGlobalSearch({"start_date":search_data[0], "end_date":search_data[1], "keyword":key}).then(
        response =>{this.tableData = response.data;})
      };
    },

    //筛选变色
    showData(val){
       val = val + '';
       if (val.indexOf(this.filter_table) !== -1 && this.filter_table !== ''){
         return val.replace(this.filter_table, '<font color="#409EFF">' + this.filter_table + '</font>')
       }
       else{
         return val
       }

    },

    //获取中心数据
    async getTarget() {
      await getCenters().then(response => {
        this.centers = response.data;
      });
    },

    getArticle(id){
      getArticleHtml({"article_id":id, "type":"html"}).then(response => {
        this.articleHtml = response.data;
      });
      return this.articleHtml;
    },

    async getArticleText(id){ 
      await getArticleHtml({"article_id":id, "type":"text"}).then(response => {
      this.articleText = response.data;
      });
      return this.articleText;
    },

    centerSelect(centerId){
      getKeywordTree({"center_id":Number(centerId)}).then(response => {
        this.menuData = response.data;})
    }, 

        //侧边栏点击事件
    handleNodeClick(data) {
      if(!data.keyword_id){
        return;
      }
      var keywordID = data.keyword_id;

      //初始化显示第一页内容
      getArticleTable({"page": 1, "size":1000, "keyword_id":keywordID}).then(response => {
        this.tableData = response.data;
        })
    },

    async handleRowClick(row, column, cell, event){
      
      if(column.label == '链接'){
        return;
      }

      var _index= row.id-1;
      var tabLabel = row.title
      var _text;

      if(tabLabel.length > 10){
        tabLabel = tabLabel.slice(0, 10);
      };
      
       _text = await this.getArticleText(row.id);
      
      // console.log(_text);

      var tagIn = {name:row.title,label:tabLabel, tabIndex:_index, text: _text.text, id:row.id};
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
      var _tabIndexs = this.editableTabs.map(value=>value.name);
      var cur_tabIndex = _tabIndexs.indexOf(tab.name)
      this.global_index = cur_tabIndex;
    },
    dateFormat(cellValue){
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
  .el-tabs__nav-wrap {
    /* background-color: #D3DCE6;
    color: #333;
    text-align: left; */
    margin-bottom: 0px;
  };
  .el-tabs__header.is-top{
    margin-bottom: 0px;
  };
  
  .el-tabs__content{
    height: 100%;
  }
</style>
