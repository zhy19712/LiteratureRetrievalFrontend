<template>
	
  <!--div class="app-container" /-->
  <div class="one-root-keyword">
	  <el-container>
	  <el-header> 
	  <div class="head">
		  <el-form :inline="true" :model="formInline_select_center" class="demo-form-inline">	 
		    <el-form-item >			  
			  <el-select v-model="formInline_select_center.center" :placeholder="default_Center" :disabled="select_disable_or_not" @change="changeCenter()">
			      <el-option
			        v-for="item in centers"
			        :key="item.id"
			        :label="item.center"
			        :value="item.id">
			      </el-option>
			    </el-select>
		    </el-form-item>

		  </el-form>
	  </div> <!--head-->
	  </el-header>
	  
	  <el-container>
		        <!--el-aside width="350px" -->
				<br/>
	  <el-row :gutter="200" class="el-row-keyword">
		<el-col :span="10">
						<el-input  v-model="category_add_item.category" placeholder="请输入要添加的分类名称" class="left-input"></el-input>
					
					<el-button type="primary" @click="add_category_Item" class="add-btn" plain>添加分类</el-button>
				
				 
				 <el-table
									     ref="singleTable"
				 						 :data="Tabledata_categories_in_a_center==null?Tabledata_categories_in_a_center:Tabledata_categories_in_a_center.filter(data => !search_1 || data.category.toLowerCase().includes(search_1.toLowerCase()))"
										 border
										 highlight-current-row
										 @current-change="handleCurrentChange"
				 						 style="width: 100%"
										 max-height="450"
										 class="left_table"
										 >
				 						 <el-table-column
				 											   prop="category"
				 											   label="分类"
				 											    width="200"
				 											   >
				 						 </el-table-column>

										 <el-table-column prop="remark" >
											 <template slot="header" slot-scope="scope">
											   <el-input
											     v-model="search_1"
											     size="large"
											     placeholder="搜索"/>
											 </template>
										     <template slot-scope="scope">
										         <el-button type="primary" icon="el-icon-edit" @click="edit_category_Item(scope.row,scope.$index)" circle></el-button>
										         <el-button type="danger" icon="el-icon-delete" @click="del_category_Item(scope.$index)" circle></el-button>
										     </template>
										 </el-table-column>
				 					   </el-table>
									   
			        <el-dialog title="分类配置修改" :visible.sync="dialogVisible_category_table" width="30%" :before-close="handleClose_category_table">
			            <div>
			                <el-form ref="form" :model="category_item" label-width="80px">
			                    <el-form-item label="分类名"><el-input v-model="category_item.category"></el-input></el-form-item>
			        
			                </el-form>
			            </div>
			            <span slot="footer" class="dialog-footer">
			                <el-button @click="dialogVisible_category_table = false">取 消</el-button>
			                <el-button type="primary" @click="confirm_category">确 定</el-button>
			            </span>
			        </el-dialog>
									   
				<!--/el-aside-->
				
			 </el-col>
			   <!--el-main-->
			<el-col :span="14">
			   
					<el-input  v-model="keyword_add_item.keyword"  :disabled="left_table_clicked_or_not" placeholder="请输入关键字" class="right-input"></el-input>		
					<el-button type="primary" @click="add_keyword_Item" class="add-btn" plain >添加关键字</el-button>  <!--style="width: 90%"-->

			   <br/>
	           <el-table 
			        ref="singleTable"
					:data="Tabledata_keywords_by_categoryid==null?Tabledata_keywords_by_categoryid:Tabledata_keywords_by_categoryid.filter(data => !search_2 || data.keyword.toLowerCase().includes(search_2.toLowerCase()))"
					border 
					style="width: 100%"  
					max-height="550"
					class="right_table">
	               <el-table-column label="表格序号" width="100"><template slot-scope="scope"> {{scope.$index + 1 }} </template></el-table-column>

	     		  <el-table-column prop="keyword" label="关键字" width="200"></el-table-column>	           

					<el-table-column prop="status" label="状态" width="150">
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
								   
	               <el-table-column prop="remark" width="250">
					   <template slot="header" slot-scope="scope">
					     <el-input
					       v-model="search_2"
					       size="large"
					       placeholder="搜索"/>
					   </template>
	                   <template slot-scope="scope">
	                       <el-button type="primary" icon="el-icon-edit" @click="edit_keyword_Item(scope.row,scope.$index)" circle></el-button>
	                       <el-button type="danger" icon="el-icon-delete" @click="del_keyword_Item(scope.$index)" circle></el-button>
	                   </template>
	               </el-table-column>
	           </el-table>	
				   
			<el-dialog title="关键字配置修改" :visible.sync="dialogVisible_keyword_table" width="30%" :before-close="handleClose_keyword_table">
			    <div>
			        <el-form ref="form" :model="keyword_item" label-width="80px">
			            <el-form-item label="关键字名"><el-input v-model="keyword_item.keyword"></el-input></el-form-item>

			        </el-form>
			    </div>
			    <span slot="footer" class="dialog-footer">
			        <el-button @click="dialogVisible_keyword_table = false">取 消</el-button>
			        <el-button type="primary" @click="confirm_keyword">确 定</el-button>
			    </span>
			</el-dialog>
			   
		<!--/el-main-->				   
		</el-col>
		</el-row>
	  
	  </el-container>
	  
	</el-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	
	import { fetchCenter_API} from '@/api/monitor' 
	import { fetchCategory_by_center_API } from '@/api/monitor' 
	import { fetchKeyword_filter_API } from '@/api/monitor' 

	import { postCategory_API } from '@/api/monitor' 
	import { postKeyword_API } from '@/api/monitor' 
	
	import { delete_category_API } from '@/api/monitor'	
	import { deleteKeyword_API } from '@/api/monitor'	
	
	import { editKeyword_API} from '@/api/monitor'
	import { editCategory_API } from '@/api/monitor'
	
	import { change_Keyword_Status_API } from '@/api/monitor'
	
	
	export default {
	  data() { //也可以按照页面位置梳理
	    return {
		  //头部	
		  search_1: '',
		  search_2: '',
		  
		  centers:null,
		  default_Center:null,
		  //center_id :1,
		  select_disable_or_not:this.$store.getters.center_id!=0,
		  
		  
		  formInline_select_center: {
		            center: ''},
					
		
		  //左表
		  category_add_item:{
		  						category_id:'',
		  						center_id:'',
								category: '',
		  			},
		  category_item:{
						category_id:'',
						center_id:'',
		  			    category: '',
		  			},
		  Tabledata_categories_in_a_center:null,
		  
		  //category_clicked_in_left_table:1,
		  category_clicked_in_left_table:null,
		  
		  //left_table_clicked_or_not: this.category_clicked_in_left_table==null,
		  
		  
		  edit_category_Row:null ,
		  //Tabledata_keywords_by_categoryid:null,
		  dialogVisible_category_table:false,
		  category_table_Index :0,
		  
		  Row_clicked:null,
		  
		  //右表
		  keyword_add_item:{
		  						category_id:'',
		  				keyword:'',
		  			    type: '',
		  			},
		  keyword_item:{
						category_id:'',
		  				keyword:'',
		  			    type: '',
		  			},
		  
		  edit_keyword_Row:null ,
		  Tabledata_keywords_by_categoryid:null,
		  dialogVisible_keyword_table:false,
		  keyword_table_Index :0,
		  }//data return
		  },//data()
		  
		  
	  created() { 
		  //this.get_center_names();
		  this.select_form_init();
		  //this.get_data_first();
		  this.get_categories_first();

	  },
	  computed: {
	        left_table_clicked_or_not: function() {
				if(this.category_clicked_in_left_table==null){
					return true
				}
				else{
					return false
				}
	        },
	        
	    },
	  
	  methods: { //方法函数的排列方式, 也按照页面的位置？	
	  
	  select_form_init(){
	  		this.listLoading = true
	  				  fetchCenter_API().then(response => {
	  					this.centers = response.data	
	  					console.log("this.centers",this.centers)
	  					
	  					if(this.$store.getters.center_id==0){
	  						//console.log("这是管理员")
	  						this.default_Center = "信息技术中心"
	  					}
	  					else{
	  						console.log("获取普通用户的中心")
	  						this.default_Center = this.centers[this.$store.getters.center_id-1].center
	  					}
	  					
	  					//this.default_Center = this.centers[this.$store.getters.center_id-1].center
	  					this.listLoading = false 
	  												
	  		})//then
	  },
/*------------------------最上面header的位置----------------------------------*/		
			  
	  get_center_names(){
		this.listLoading = true
				  fetchCenter_API().then(response => {
					this.centers = response.data	
					this.default_Center = this.centers[this.$store.getters.center_id-1].center
					this.listLoading = false 
													console.log("this.centers",this.centers)
													//console.log("this.Tabledata_categories_in_a_center",this.Tabledata_categories_in_a_center)						  		  
		})//then
	  },
	  changeCenter() {
								  this.Row_clicked = null,
								  this.Tabledata_keywords_by_categoryid = null,
								  this.listLoading = true
								  		  fetchCategory_by_center_API({"center_id":this.formInline_select_center.center}).then(response => {
								  		    this.Tabledata_categories_in_a_center = response.data	
								  		    this.listLoading = false  })
	    				 
	  },//change
	 get_categories_first(){
		 this.Row_clicked = null
		 this.Tabledata_keywords_by_categoryid = null
		 
		 
		 //var center_id = 1 这个位置为什么不能写var????????????????????
		 var center_id = 1
		 if(this.$store.getters.center_id==0){
		 	//console.log("查看管理员默认情况下的中心选择",this.formInline_select_center.center)
		 	center_id = this.formInline_select_center.center
		 	//管理员没有选择任何中心时候，默认插入信息中心
		 	if(center_id==''){
		 		center_id=1
		 	}
		 }
		 else{
		 	center_id  = this.$store.getters.center_id
		 }
		 
		 this.listLoading = true
		 		  fetchCategory_by_center_API({"center_id":center_id}).then(response => {
		 		    this.Tabledata_categories_in_a_center = response.data	
		 		    this.listLoading = false })

	 },
		  
/*------------------------下面body的部分-----------------------------------*/			
		/*-------------左侧表格------------*/	
		/*表头添加*/
		add_category_Item(){ //this指代的谁？？？？这个页面组件么
			console.log("添加一个分类")
		    
		    if(!this.category_add_item.category){
		        this.$message({
		            message: '请输入分类的名字', //这个warning只能从页面的中间弹出么？
		            type: 'warning'
		        });
		        return;
		    }
			//this.category_add_item.center_id = this.formInline_select_center.center
			//this.Tabledata_categories_in_a_center.push(this.category_add_item);
			
			var center_id = 1
			if(this.$store.getters.center_id==0){
				//console.log("查看管理员默认情况下的中心选择",this.formInline_select_center.center)
				center_id = this.formInline_select_center.center
				//管理员没有选择任何中心时候，默认插入信息中心
				if(center_id==''){
					center_id=1
				}
			}
			else{
				center_id  = this.$store.getters.center_id
			}
			
			
			postCategory_API({"center_id" : center_id, "category":this.category_add_item.category}).then(response => {
						//this.get_categories_first()
						console.log("添加分类后更新数据")
						var center_id = 1
						if(this.$store.getters.center_id==0){
							//console.log("查看管理员默认情况下的中心选择",this.formInline_select_center.center)
							center_id = this.formInline_select_center.center
							//管理员没有选择任何中心时候，默认插入信息中心
							if(center_id==''){
								center_id=1
							}
						}
						else{
							center_id  = this.$store.getters.center_id
						}
						
						this.listLoading = true
								  fetchCategory_by_center_API({"center_id":center_id}).then(response => {
								    this.Tabledata_categories_in_a_center = response.data	
								    this.listLoading = false })
						
						})
			this.category_add_item = {
				center_id:'',
				category:'',
			}
		},//add_category
		
		/*表体* 这部分改为在handle current change中*/
		fetch_keywords_by_categoryid_click(row,idx){	
					  this.Row_clicked = idx
					  this.category_clicked_in_left_table = row.id
					  this.listLoading = true
					  fetchKeyword_filter_API({"category_id":row.id}).then(response => {
					    this.Tabledata_keywords_by_categoryid = response.data
					    this.listLoading = false})		  
		},
		
		del_category_Item(idx){ //与confirm配合
		  //var idx_table = idx+1
		  //console.log("进入删除程序")
			this.$confirm('确认删除此分类信息？此分类下的所有关键字也将被删除！')
				.then(_ => {
							  var del_id = {"id":this.Tabledata_categories_in_a_center[idx]["id"]}
							  console.log("分类删除del_id",del_id)					  
		            this.Tabledata_categories_in_a_center.splice(idx, 1); //此处是重点难点，分析vue源码有帮助与理解
					//在这里补充一个，右表中删除分类的函数
					//delete_category_in_keyword_table(del_id)
					delete_category_API(del_id)
					  //deleteKeyword_API(del_data)
					  
		        })
				.catch(_ => {})   
		},
		
		handleClose_category_table(){
		     this.dialogVisible_category_table = false;
		},
		
		edit_category_Item(row,idx){
		   this.edit_category_Row = row
		   this.category_table_Index = idx;
		   console.log("center_id调试edit_category_Item,",row.center_id)
		   this.category_item = {
						center_id:row.center_id,
						//category_id:item.category_id,  这些注释掉没影响吗
		  				category:row.category,
		  			    //type: item.type,
		  			},
			
			this.dialogVisible_category_table = true;
		},
		
		confirm_category(){
			this.dialogVisible_category_table = false;
			console.log("进入confirm category")
			console.log("edit_category_Row",this.edit_category_Row)
			
			
			var edit_data = {
				"id":this.edit_category_Row.id,
				"center_id":this.edit_category_Row.center_id,
				"category":this.category_item.category,
				//"status":this.edit_category_Row.status,
				//"type":this.edit_category_Row.type,
			}
			console.log("修改分类提交",edit_data)
			
			editCategory_API(edit_data).then(response => {
						//this.get_categories_first()
						console.log("修改分类后更新数据")
						var center_id = 1
						if(this.$store.getters.center_id==0){
							//console.log("查看管理员默认情况下的中心选择",this.formInline_select_center.center)
							center_id = this.formInline_select_center.center
							//管理员没有选择任何中心时候，默认插入信息中心
							if(center_id==''){
								center_id=1
							}
						}
						else{
							center_id  = this.$store.getters.center_id
						}
						
						this.listLoading = true
								  fetchCategory_by_center_API({"center_id":center_id}).then(response => {
								    this.Tabledata_categories_in_a_center = response.data	
								    this.listLoading = false })
						
						})
			
			//Vue.set(this.Tabledata_categories_in_a_center, this.category_table_Index, this.category_item);
		
			
		   
		},//confirm_category

		handleCurrentChange(val) {
		  console.log("handleCurrentChange(val)",val)
		  if (val) {
			  //this.currentRow = val;
			  
			  this.category_clicked_in_left_table = val.id
			  this.fetch_keywords_by_categoryid(val.id)
			  
		  }
 
		},
		
		fetch_keywords_by_categoryid(categoryid){
			this.listLoading = true
			fetchKeyword_filter_API({"category_id":categoryid}).then(response => {
			  this.Tabledata_keywords_by_categoryid = response.data
			  this.listLoading = false})	
			
		},
		
	
		/*-------------右侧表格------------*/	
		/*表头添加*/
		add_keyword_Item(){ //this指代的谁？？？？这个页面组件么
			console.log("添加一个关键字")
		    
		    if(!this.keyword_add_item.keyword){
		        this.$message({
		            message: '请输入关键字的名字', //这个warning只能从页面的中间弹出么？
		            type: 'warning'
		        });
		        return;
		    }
			/*
			if(!this.keyword_item.type){
			    this.$message({
			        message: '请输入关键字的类型', //这个warning只能从页面的中间弹出么？
			        type: 'warning'
			    });
			    return;
			}*/
			
			console.log("判断左侧是否点击了,this.category_clicked_in_left_table==null",this.category_clicked_in_left_table==null)
			//this.category_item.center_id = this.formInline_select_center.center
			this.keyword_add_item.category_id = this.category_clicked_in_left_table
			this.keyword_add_item.status = 1
			
			//this.Tabledata_keywords_by_categoryid.push(this.keyword_add_item);
			
			postKeyword_API({"category_id":this.keyword_add_item.category_id,"keyword":this.keyword_add_item.keyword,"type":"1","status":"1"}).then(response => {
		    console.log("重新获取右表")
			console.log("分类id",this.category_clicked_in_left_table) //this.keyword_add_item.category_id竟然为null??
			this.fetch_keywords_by_categoryid(this.category_clicked_in_left_table)
		  })  //this.category_clicked_in_left_table
			//postKeyword_API({"center_id" : this.category_item.center_id, "category":this.category_item.category})
			
			this.keyword_add_item = {
				//category_id:'',
				keyword:'',
				type:'',
			}
		},//add_keyword
		
		/*表体：删和改*/
		del_keyword_Item(idx){ //与confirm配合
		  //var idx_table = idx+1
		  //console.log("进入删除程序")
			this.$confirm('确认删除此关键字信息？')
				.then(_ => {
							  var del_data = {"id":this.Tabledata_keywords_by_categoryid[idx]["id"]}
							  console.log("关键字删除del_data",del_data)					  
		            this.Tabledata_keywords_by_categoryid.splice(idx, 1); //此处是重点难点，分析vue源码有帮助与理解
					deleteKeyword_API(del_data)
		        })
				.catch(_ => {})   
		},
		
		handleClose_keyword_table(){
		     this.dialogVisible_keyword_table = false;
		},
		
		edit_keyword_Item(row,idx){
		   this.edit_keyword_Row = row
		   this.keyword_table_Index = idx;
		   this.keyword_item = {
						//category_id:item.category_id,
		  				keyword:row.keyword,
		  			    //type: item.type,
		  			},
			
			this.dialogVisible_keyword_table = true;
		},
	
		confirm_keyword(){
			this.dialogVisible_keyword_table = false;
			
			
			var edit_data = {
				"id":this.edit_keyword_Row.id,
				"category_id":this.edit_keyword_Row.category_id,
				"keyword":this.keyword_item.keyword,
				"status":this.edit_keyword_Row.status,
				"type":this.edit_keyword_Row.type,
			}
			console.log("edit_data",edit_data)
			editKeyword_API(edit_data).then(response => {
						//this.get_categories_first()
						console.log("更改关键字后更新数据。。应该重新获取右表")
						//console.log("重新获取右表")
						console.log("分类id",this.category_clicked_in_left_table) //this.keyword_add_item.category_id竟然为null??
						this.fetch_keywords_by_categoryid(this.category_clicked_in_left_table)
						})  //this.category_clicked_in_left_table
						/*
						var center_id = 1
						if(this.$store.getters.center_id==0){
							//console.log("查看管理员默认情况下的中心选择",this.formInline_select_center.center)
							center_id = this.formInline_select_center.center
							//管理员没有选择任何中心时候，默认插入信息中心
							if(center_id==''){
								center_id=1
							}
						}
						else{
							center_id  = this.$store.getters.center_id
						}
						
						this.listLoading = true
								  fetchCategory_by_center_API({"center_id":center_id}).then(response => {
								    this.Tabledata_categories_in_a_center = response.data	
								    this.listLoading = false })
						
						})*/

			//Vue.set(this.Tabledata_keywords_by_categoryid, this.keyword_table_Index, edit_data);		 

		},//confirm_keyword
		
		changeStatus(row) {
		  //console.log(row)
		  //console.log(row.status)
		  
		  change_Keyword_Status_API(row).then(response => {
		    console.log(response)
		  }) 
		}//changeStatus
		
		},//methods
			
		  
		}//export default
						
</script>


<style>
		.one-root-keyword{
		    margin-top: 20px;
			margin-left: 30px;
		    width: 100%;}
			
		.add-btn{
			width:140px;
		}
			
		.left-input{
			width:290px;
			margin-right: 10px;
			
		}
		
		.right-input{
			width:530px;
			margin-right: 10px;
	
		}
		
		.el-row-keyword{
			left:21px
		}
			

		.left_table{
			margin-top: 10px;
		}
		.right_table{
			margin-top: 10px;
		}
		
		  .el-table .warning-row {
		    background: oldlace;
		  }
		
		  .el-table .success-row {
		    background: #f0f9eb;
		  }
		
</style>