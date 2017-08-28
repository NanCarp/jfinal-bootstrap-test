var rolename="";

$(function () {	 
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
    //2.初始化Button的点击事件
     var oButtonInit = new ButtonInit();
    oButtonInit.Init(); 
});

function doQuery(){
	layui.use('layer',function(){
		var layer = layui.layer;
		rolename = $.trim($('#rolename').val());
		if(rolename != ''){
			var reg = /^[a-zA-Z0-9_\-\u0391-\uFFE5 ]{1,30}$/;
			if(!reg.test(rolename)){
				layer.tips('不允许有特殊字符，最多20个字符', '#rolename', {tips: [1, '#34495E']});return;
			}					
		}
		 $('#tb_departments').bootstrapTable('refresh');    //刷新表格
	})
}

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: '/system/role/getJson',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            showExport: true,                     //是否显示导出
            buttonsAlign:"right",  				//按钮位置  
            exportDataType: "basic",              //basic', 'all', 'selected'.
            exportTypes:['excel'],
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 12,                       //每页的记录行数（*）
            pageList: [3, 6, 12, 100],        //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,                //是否启用点击选中行
            showColumns: true,					//列选择按钮
            height: 640,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            cardView: false,                    //是否显示详细视图
            detailView: false,
            showRefresh:true,  
            locale: "zh-CN",					//中文支持,
            //是否显示父子表
            columns: [{
            	field:"checked",
            	checkbox: true,
            },{
            	field:"SerialNumber",
            	title:'序号',
            	formatter:function(value,row,index){
            		return index+1;
            	}
            },{
                field: 'role_type',
                title: '角色名称'
            },{
                field: 'remark',
                title: '备注'
            },{
            	field: 'opt',
            	title: '操作',
            	formatter: function(value,row,index){
            		return ['<button class="btn btn-xs btn-3"  onclick="_edit('+row.id+')">编辑</button>'];
            	},
            }]
        });
    };

	//得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            maxrows: params.limit,
            search: params.search,
            rolename: rolename,
        };
        return temp;
    };
    return oTableInit;  
};

var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};
    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };
    return oInit;
};

//全选按钮
function stateFormatter(value, row, index) {
  if (row.state == true){
  	return {
          disabled : true,//设置是否可用
          checked : true//设置选中
      };
  }        
  return value;
}

//获取被选中数据的id
function getIdSelections() {
  return $.map($("#tb_departments").bootstrapTable('getSelections'), function(row) {
      return row.id;
  });
}

function _add(){
	open_window('添加角色','/system/role/getRole',480, 300)
}
function _edit(id){
	open_window('编辑角色','/system/role/getRole?id=' + id,480, 300)
}
// 删除以及批量删除
function _delete(){
	// 获取选中记录 id
	var ids = getIdSelections();	
	// 如果没有选择，提示勾选至少一条数据
	if (ids.length == 0) {
        layer.msg('请至少选择一条记录', {time: 2000});return;
	}
	layer.confirm('<span style="color:red">警告：</span>与角色对应用户也将被同时删除！',
		{
			title: ['信息', 'font-weight:600;color:#fff;background-color: #3367D6;'],
			btn: ['确认','取消'] //按钮
		},
		function(){
			$.post("/system/role/delete/"+ids,function(result){
				if (result.code == 1) {
		            parent.layer.msg(result.msg, {time: 2000}, function(){
		                layer_close();
		                parent.parent.refresh_iframe();
		            });

		        } else {
		            parent.layer.msg(result.msg, {time: 2000});
		        }
			})
		},
		function(){
			//取消后操作
		})  
}
