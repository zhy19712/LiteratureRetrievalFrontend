<template>
	
  <!--div class="app-container" /-->
  <div class="one-root">
	  <el-container>
	  <el-header> 
	  <div class="head">
		  <el-form :inline="true" :model="formInline_select_center" class="demo-form-inline">	 
		    <el-form-item label="您所在中心">			  
			  <el-select v-model="formInline_select_center.center" :placeholder="default_Center"  disabled @change="changeCenter()">
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
		        
				<br/>
				<el-row :gutter="30">
					<el-col :span="35" ><el-input  v-model="add_item.target" placeholder="请输入要添加的target"></el-input></el-col>
					<el-col :span="35" ><el-input  v-model="add_item.type" placeholder="请输入要添加的类型"></el-input></el-col>
					<!--el-col :span="10"><el-input  v-model="target_item.center_id" placeholder="请输入center_id"></el-input></el-col-->
					<el-button type="primary" @click="add_Item_Click" class="add-btn" plain>添加Target</el-button>
				</el-row>
	   </el-container>
	    <el-container>

				<el-table
									     ref="singleTable"
				 						 :data="Tabledata.filter(data => !search || data.target.toLowerCase().includes(search.toLowerCase()))"
										 highlight-current-row
										 
				 						 style="width: 100%" 
							
										 >

				 						 <!--el-table-column
										  上面的style="width: 100%" ，没感觉起到任何作用
				 												prop="id"
				 												label="id"
				 												 width="80"
				 												>
				 						 </el-table-column--> 										
				 						 <el-table-column
				 											   prop="target"
				 											   label="目标"
				 											    width="350"
				 											   >
				 						 </el-table-column>										 
				 						 <el-table-column
				 											   prop="type"
				 											   label="type"
				 											   width="100">
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
										
				 						 <el-table-column
											prop="remark"
											label="备注"
											 width="200"
											>
				 						 </el-table-column> 
																				  

										 
										 <!--el-table-column prop="remark" label="查询关键字按钮">
										     <template slot-scope="scope">
										         <el-button type="primary"  @click="fetch_keywords_by_targetid_click(scope.row,scope.$index)" circle></el-button>
										     </template>
										 </el-table-column-->
										 
										 <el-table-column prop="remark" label="操作">				 
										     <template slot-scope="scope">
										         <el-button type="primary" icon="el-icon-edit" @click="edit_Click(scope.row,scope.$index)" circle></el-button>
										         <el-button type="danger" icon="el-icon-delete" @click="del_Click(scope.$index)" circle></el-button>
										     </template>
										 </el-table-column>
										 <el-table-column
										   >
										   <template slot="header" slot-scope="scope">
										     <el-input
										       v-model="search"
										       size="mini"
										       placeholder="输入关键字搜索"/>
										   </template>
										 </el-table-column>
				 					   </el-table>
									   
			        <el-dialog title="配置修改" :visible.sync="dialogVisible_table" width="30%" :before-close="handleClose_target_table">
			            <div>
			                <el-form ref="form" :model="edit_item" label-width="80px">
								<!--edit_item需要初始化有target字段-->
			                    <el-form-item label="target名"><el-input v-model="edit_item.target"></el-input></el-form-item>
								<el-form-item label="类型"><el-input v-model="edit_item.type"></el-input></el-form-item>
								<el-form-item label="备注"><el-input v-model="edit_item.remark"></el-input></el-form-item>
			        
			                </el-form>
			            </div>
			            <span slot="footer" class="dialog-footer">
			                <el-button @click="dialogVisible_table = false">取 消</el-button>
			                <el-button type="primary" @click="edit_confirm_Click">确 定</el-button>
			            </span>
			        </el-dialog>
									 
									 
				    <el-dialog title="错误" :visible.sync="dialogVisible_check" width="30%" :before-close="handleClose_target_check">
				        <div>
				    		<p>配置项不可重复或含有空格，网站类型网址不合规范</p>
				        </div>
				    </el-dialog>    
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
		//inject:['reload'],
	  data() { //也可以按照页面位置梳理
	    
	    return {
		  //头部	
		  search: '',
		  centers:null,
		  default_Center:null,
		  
		  formInline_select_center: {
		            center: ''},
					

		 Tabledata:null,
		 
		  //此处必须有target等被修改的字段，<el-input v-model="edit_item.target">
		  
		  edit_item:{
			  "target":'',
		  },
		  
		  add_item:{
            "id": '',
            "center_id": '',
            "target": '',
            "type": '',
            "remark": '',
            "status":'',
		  			},	
		  dialogVisible_table:false,
          dialogVisible_check:false,
		  table_Index :0,

		  }//data return
		  },//data()
		  
		//提交API测试，删除API测试，修改API修改  
	  created() { 
	
		  this.get_center_id();
		  this.get_center_names();
		  //this.get_IT_center_first();
		  this.get_data_first()
		  
	  },
	  methods: { //方法函数的排列方式, 也按照页面的位置？
	  
	    //要不要加 https之类的
	    isURL(str_url) {// 验证url
			var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
			+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
			+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
			+ "|" // 允许IP和DOMAIN（域名）
			+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
			+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
			+ "[a-z]{2,6})" // first level domain- .com or .museum
			+ "(:[0-9]{1,4})?" // 端口- :80
			+ "((/?)|" // a slash isn't required if there is no file name
			+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
			var re = new RegExp(strRegex);
			return re.test(str_url);
	    },

		//-------------------------------------created 头-----------------------
		get_center_id(){
			console.log("获取centerid",this.$store.getters.center_id)
		},
		
		get_center_names(){
				this.listLoading = true
						  fetchCenter_API().then(response => {
							this.centers = response.data	
							this.default_Center = this.centers[this.$store.getters.center_id-1].center
							this.listLoading = false 
														
				})//then
		},
		get_IT_center_first(){
			this.listLoading = true
					  fetchTarget_by_center_API({"center_id":this.$store.getters.center_id}).then(response => {
						this.Tabledata = response.data
						this.listLoading = false})
			
		},
		get_data_first(){
			this.listLoading = true
					  fetchTarget_by_center_API({"center_id":this.$store.getters.center_id}).then(response => {
						this.Tabledata = response.data
						this.listLoading = false})
			
		},
		//-------------------------------------created 尾巴-----------------------
		
	  
/*------------------------最上面header的位置----------------------------------*/		
			  

			
		  
/*------------------------下面body的部分-----------------------------------*/			
		/*-------------左侧表格------------*/	
		/*表头添加*/
		add_Item_Click(){ //this指代的谁？？？？这个页面组件么
			//console.log("添加一个Target")
		    
			//这里和前面表格设置的一一对应
		    if(!this.add_item.target){
		        this.$message({
		            message: '请输入target', //这个warning只能从页面的中间弹出么？
		            type: 'warning'
		        });
		        return;
		    }
			if(!this.add_item.type){
			    this.$message({
			        message: '请输入类型', //这个warning只能从页面的中间弹出么？
			        type: 'warning'
			    });
			    return;
			}
			
			var add_flag = true
			//console.log("此时新添加的target",this.add_item.target)
			//this.add_item.center_id = this.formInline_select_center.center
		    if (this.add_item.target.indexOf(" ") != -1){
				add_flag = false
		    	this.dialogVisible_check = true
		    	//console.log("空的字符串")
		    	}
			
			if (this.add_item.type==1){
				console.log("检查网址是否合法")
				console.log(this.add_item.target)
				console.log(this.isURL(this.add_item.target))
				
				if (this.isURL(this.add_item.target)==false){
					this.dialogVisible_check = true
					add_flag = false
				}				
			}	
				
			this.add_item.center_id  = this.$store.getters.center_id
			this.add_item.status = 1
			//this.add_item.type = 1
			this.add_item.remark = null
			
			//console.log("this.Tabledata长度",this.Tabledata.length)
			// this.Tabledata.push(this.add_item)
			//Vue.set(this.Tabledata, 9, this.add_item);
			if (add_flag==true){
				postTarget_API(this.add_item).then(response => {
								    if (response.data[0]=="目标已存在"){
										//console.log("目标已存在")
										this.dialogVisible_check = true
									}
									else{
										this.get_data_first()
									}
				
				}) 
			}

			//postTarget_API({ "center_id" :this.formInline_select_center.center, "target":this.add_item.target,"type":"1","remark":null,"status":"1"})
			//改成当前页面所属中心
			
			this.add_item = {
				"id": '',
				"center_id": '',
				"target": '',
				"type": '',
				"remark": '',
				"status":'',
			}
			//this.reload()
			
		},//add_target
		

		
		del_Click(idx){ //与confirm配合
		  //var idx_table = idx+1
		  //console.log("进入删除程序")
			this.$confirm('确认删除此target信息？')
				.then(_ => {
					//console.log("删除代码")
					var del_id = {"id":this.Tabledata[idx]["id"]}
					//console.log("删除del_id",del_id)	
					this.Tabledata.splice(idx,1);
					deleteTarget_API(del_id)
		        })
				.catch(_ => {})   
		},
		
		edit_Click(row,idx){
		   this.table_Index = idx;
		   //console.log("center_id调试edit_target_Item,",row.center_id)
		   //让编辑框有默认显示
		   this.edit_item = row
		   
		   this.dialogVisible_table = true;
			//在此后编辑框会修改target_item的参数
		},
		
		edit_confirm_Click(){
			this.dialogVisible_table = false;
			console.log("进入编辑检查")
	
			//一系列检查前
			var edit_flag = true
			//console.log("此时新添加的target",this.add_item.target)
			//this.add_item.center_id = this.formInline_select_center.center
			//console.log(this.edit_item.target.indexOf(" "))
			
			if (this.edit_item.target == ""){
				console.log("判断有空的字符串")
				edit_flag = false
				this.dialogVisible_check = true
				}
			
			if (this.edit_item.target.indexOf(" ") != -1){
				console.log("判断有空的字符串")
				edit_flag = false
				this.dialogVisible_check = true
				}
			
			if (this.edit_item.type==1){
				console.log("检查网址是否合法")
				console.log(this.edit_item.target)
				console.log(this.isURL(this.edit_item.target))
				
				if (this.isURL(this.edit_item.target)==false){
					this.dialogVisible_check = true
					edit_flag = false
				}				
			}	
				
			//this.add_item.center_id  = this.$store.getters.center_id
			//this.add_item.status = 1
			//this.add_item.type = 1
			//this.add_item.remark = null
			
			//一系列检查后
			if (edit_flag==true){
				console.log("修改后台提交")
				editTarget_API(this.edit_item).then(response => {
									    if (response.data[0]=="目标已存在"){
											//console.log("目标已存在")
											this.dialogVisible_check = true
										}
										else{
											this.get_data_first()
										}
					
					}) 
				
			}
			
		    //Vue.set(this.Tabledata, this.table_Index, this.edit_item);
			//console.log("editconfirm的tableIndex",this.table_Index)
		},//confirm_target


		changeStatus(row) {
		  console.log("changeStatus函数")
		  console.log("row",row)
		  console.log("row.status",row.status)
		  
		  change_Target_Status_API(row).then(response => {
		    console.log(response)
		  }) 
		},//changeStatus
		
		changeCenter() {
		  this.listLoading = true
		  		  fetchTarget_by_center_API({"center_id":this.formInline_select_center.center}).then(response => {
		  			this.Tabledata = response.data
		  			this.listLoading = false
		  
		         console.log("targtes",this.Tabledata)
		  				  })
		},//change
		
        handleClose_target_table(){
             this.dialogVisible_table = false;
        },
		
		handleClose_target_check(){
		     this.dialogVisible_check = false;
			 this.get_data_first() //！！！！！！!必须加上，如果有错恢复原来的状态
		},
				
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