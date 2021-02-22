<template>
	
  <!--div class="app-container" /-->
  <div class="one-root">
	  <el-container>
	  <el-header> 
	  <div class="head">
		  <el-form :inline="true" :model="formInline_select_center" class="demo-form-inline">	 
		    <el-form-item label="中心选择">			  
			  <el-select v-model="formInline_select_center.center" placeholder="请选择中心" @change="changeCenter()">
			      <el-option
			        v-for="item in centers"
			        :key="item.id"
			        :label="item.center"
			        :value="item.id"
					>
			      </el-option>
			    </el-select>
				
		    </el-form-item>
		  </el-form>
	  </div> <!--head-->
	  </el-header>
	  
	  <el-container>
		        <el-aside width="900px">
				<br/>
				<el-row :gutter="20">
					<el-col :span="10"><el-input  v-model="target_item.target" placeholder="请输入要添加的target"></el-input></el-col>
					<!--el-col :span="10"><el-input  v-model="target_item.center_id" placeholder="请输入center_id"></el-input></el-col-->
					<el-button type="primary" @click="add_target_Item" class="add-btn" plain>添加Target</el-button>
				</el-row>

				 <el-table
									     ref="singleTable"
				 						 :data="Tabledata_targets"
										 highlight-current-row
										 @current-change="handleCurrentChange"
				 						 style="width: 100%"
										 :row-class-name="tableRowClassName"
										 max-height="500">

				 						 <el-table-column
				 												prop="id"
				 												label="id"
				 												 width="80"
				 												>
				 						 </el-table-column> 										
				 						 <el-table-column
				 											   prop="target"
				 											   label="目标"
				 											    width="110"
				 											   >
				 						 </el-table-column>										 
				 						 <el-table-column
				 											   prop="center_id"
				 											   label="中心id"
				 											   width="180">
				 						 </el-table-column>

										 
				 						 <el-table-column
				 												prop="remark"
				 												label="remark"
				 												 width="80"
				 												>
				 						 </el-table-column> 
										 
				 						 <el-table-column
				 												prop="status"
				 												label="status"
				 												 width="80"
				 												>
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
										 
										 
										 <!--el-table-column prop="remark" label="查询关键字按钮">
										     <template slot-scope="scope">
										         <el-button type="primary"  @click="fetch_keywords_by_targetid_click(scope.row,scope.$index)" circle></el-button>
										     </template>
										 </el-table-column-->
										 
										 <el-table-column prop="remark" label="操作">
										     <template slot-scope="scope">
										         <el-button type="primary" icon="el-icon-edit" @click="edit_target_Item(scope.row,scope.$index)" circle></el-button>
										         <el-button type="danger" icon="el-icon-delete" @click="del_target_Item(scope.$index)" circle></el-button>
										     </template>
										 </el-table-column>
				 					   </el-table>
									   
			        <el-dialog title="配置修改" :visible.sync="dialogVisible_target_table" width="30%" :before-close="handleClose_target_table">
			            <div>
			                <el-form ref="form" :model="target_item" label-width="80px">
			                    <el-form-item label="target名"><el-input v-model="target_item.target"></el-input></el-form-item>
			        
			                </el-form>
			            </div>
			            <span slot="footer" class="dialog-footer">
			                <el-button @click="dialogVisible_target_table = false">取 消</el-button>
			                <el-button type="primary" @click="confirm_target">确 定</el-button>
			            </span>
			        </el-dialog>
									   
				</el-aside>
				


	  
	  </el-container>
	  
	</el-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	
	import { fetchTarget_API} from '@/api/monitor'
	import { fetchTarget_by_center_API} from '@/api/monitor'
	
	import { fetchCenter_API} from '@/api/monitor' 

	import { postTarget_API } from '@/api/monitor' 

	import { deleteTarget_API } from '@/api/monitor'	
	
	import { editTarget_API } from '@/api/monitor'	

	import { change_Keyword_Status_API } from '@/api/monitor'
	import { change_Target_Status_API } from '@/api/monitor'
	
	
	export default {
	  data() { //也可以按照页面位置梳理
	    return {
		  //头部	
		  centers:null,
		  
		  formInline_select_center: {
		            center: ''},
					
		 //坐表更改为target
		 targets:null,
		 Tabledata_targets:null,
		 
		  //左表
		  target_item:{
						target_id:'',
						center_id:'',
		  			    target: '',
		  			},
		  target_item:{
            "id": '',
            "center_id": '',
            "target": '',
            "type": '',
            "remark": '',
            "status":'',
		  			},
		  Tabledata_categories_in_a_center:null,
		  
		  target_clicked_in_left_table:null,
		  
		  edit_target_Row:null ,
		  //Tabledata_keywords_by_targetid:null,
		  dialogVisible_target_table:false,
		  target_table_Index :0,
		  
		  Row_clicked:null,

		  }//data return
		  },//data()
		  
		//提交API测试，删除API测试，修改API修改  
	  created() { 
		  this.post_target_test();
		  this.get_center_names();
		  
		  

	  },
	  methods: { //方法函数的排列方式, 也按照页面的位置？	
		
		
		post_target_test(){
			console.log("post_target_test")
			//postTarget_API({ "center_id" :"1", "target":"没设置id测试","type":"1","remark":null,"status":"1"})
			
		},
	  
	  
	  
/*------------------------最上面header的位置----------------------------------*/		
			  
	  get_center_names(){
		this.listLoading = true
				  fetchCenter_API().then(response => {
					this.centers = response.data	
					this.listLoading = false 
													//console.log("this.centers",this.centers)
													//console.log("this.Tabledata_categories_in_a_center",this.Tabledata_categories_in_a_center)						  		  
		})//then
	  },
			
		  
/*------------------------下面body的部分-----------------------------------*/			
		/*-------------左侧表格------------*/	
		/*表头添加*/
		add_target_Item(){ //this指代的谁？？？？这个页面组件么
			console.log("添加一个Target")
		    
			//这里和前面表格设置的一一对应
		    if(!this.target_item.target){
		        this.$message({
		            message: '请输入关键字target', //这个warning只能从页面的中间弹出么？
		            type: 'warning'
		        });
		        return;
		    }
			/*
			if(!this.target_item.center_id){
			    this.$message({
			        message: '请输入center_id', //这个warning只能从页面的中间弹出么？
			        type: 'warning'
			    });
			    return;
			}*/
			
			this.target_item.center_id = this.formInline_select_center.center
		
			this.Tabledata_targets.push(this.target_item)
			postTarget_API({ "center_id" :this.formInline_select_center.center, "target":this.target_item.target,"type":"1","remark":null,"status":"1"})
			this.target_item = {
				"id": '',
				"center_id": '',
				"target": '',
				"type": '',
				"remark": '',
				"status":'',
			}
		},//add_target
		

		
		del_target_Item(idx){ //与confirm配合
		  //var idx_table = idx+1
		  //console.log("进入删除程序")
			this.$confirm('确认删除此target信息？')
				.then(_ => {
					console.log("删除代码")
					var del_id = {"id":this.Tabledata_targets[idx]["id"]}
					console.log("删除del_data",del_id)	
					this.Tabledata_targets.splice(idx,1);
					deleteTarget_API(del_id)
		        })
				.catch(_ => {})   
		},
		
		handleClose_target_table(){
		     this.dialogVisible_target_table = false;
		},
		
		edit_target_Item(row,idx){
		   this.edit_target_Row = row
		   this.target_table_Index = idx;
		   console.log("center_id调试edit_target_Item,",row.center_id)
		   this.target_item = {
						center_id:row.center_id,
						//target_id:item.target_id,  这些注释掉没影响吗
		  				target:row.target,
		  			    //type: item.type,
		  			},
			
			this.dialogVisible_target_table = true;
		},
		
		confirm_target(){
			this.dialogVisible_target_table = false;
			console.log("进入confirm target")
			console.log("edit_target_Row",this.edit_target_Row)
			
			
			var edit_data = {
				"id":this.edit_target_Row.id,
				"center_id":this.edit_target_Row.center_id,
				"target":this.target_item.target,
				"status":this.edit_target_Row.status,
				"type":this.edit_target_Row.type,
			}
			console.log("修改提交",edit_data)
			
		    editTarget_API(edit_data)
			
			Vue.set(this.Tabledata_targets, this.target_table_Index, this.target_item);
		
			
		   
		},//confirm_target
		
		tableRowClassName({row, rowIndex}) {
			  
			  //this.Row_clicked = 3
              if (rowIndex === this.Row_clicked) {
		          return 'success-row';
		        }
		        return '';
		      },
		
		handleCurrentChange(val) {
		  console.log("handleCurrentChange(val)",val)
		  if (val) {
			  this.currentRow = val;
			  /*
			  this.target_clicked_in_left_table = val.id
			  this.listLoading = true
			  fetchKeyword_filter_API({"target_id":val.id}).then(response => {
			    this.Tabledata_keywords_by_targetid = response.data
			    this.listLoading = false
				})		*/
			  
		  }
		},
		changeStatus(row) {
		  console.log("changeStatus函数")
		  console.log("row",row)
		  console.log("row.status",row.status)
		  
		  change_Target_Status_API(row).then(response => {
		    console.log(response)
		  }) 
		},//changeStatus
		
		changeCenter() {
		  //console.log("changeCenter函数传入的值",data)
		  
		  this.listLoading = true
		  		  fetchTarget_by_center_API({"center_id":this.formInline_select_center.center}).then(response => {
		  			this.Tabledata_targets = response.data
		  			this.listLoading = false
		  
		         console.log("targtes",this.Tabledata_targets)
		  				  })
		  
		   
		}//change
		
		},//methods
			
		  
		}//export default
				
				
				
				
</script>


<style>
		.one-root{
		    margin-top: 20px;
			margin-left: 30px;
		    width: 100%;}
			
		  .el-table .warning-row {
		    background: oldlace;
		  }
		
		  .el-table .success-row {
		    background: #f0f9eb;
		  }
		
</style>