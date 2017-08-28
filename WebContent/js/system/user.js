$(function(){
    //分页
    $('#dataTables-example').DataTable({
        searching: false,// 搜索
        ordering: false,// 排序
        lengthChange: false,
        "scrollX": true,
        "scrollY": true,
        "scrollCollapse": true,
        language: {
            zeroRecords: "没有匹配结果",
            info : "显示  _START_ ~ _END_ 条，共有数据   _TOTAL_ 条",
            infoEmpty: "显示第 0 ~ 0 项结果，共 0 项",
            paginate: {
                first:    '第一页',
                previous: '上一页',
                next:     '下一页',
                last:     '最后一页'
            },
        },

    });
  //全选、全不选
	$("#checkAll").click(function() {
	    $("input[name='sub']").prop("checked", this.checked);
	});
	$("input[name='sub']").click(function() {
	    var subs = $("input[name='sub']");
	    $("#checkAll").prop("checked" , subs.length == subs.filter(":checked").length ? true :false);
	});
});
function _search(){
	layui.use('layer',function(){
		var layer = layui.layer;
		var username = $.trim($('#username').val());
		if($.trim($('#username').val())!=''){
			var reg = /^[a-zA-Z0-9_\u0391-\uFFE5 ]{1,30}$/;
			if(!reg.test($('#username').val())){
				layer.tips('不允许有特殊字符，最多20个字符', '#username', {tips: [1, '#34495E']});return;
			}					
		}
        location.replace('/system/user?username=' + username);
	})
}
function _add(){
	open_window('添加用户','/system/user/getUser',480, 340);
}
function _edit(id){
	open_window('编辑用户','/system/user/getUser/' + id,480, 340);
    }
   
    // 删除以及批量删除
function _delete(){
   var ids = [];
   $("input[name='sub']:checked").each(function(k,v){
	   ids.push($(v).val());
   })
   if(ids.length==0){
	   layer.msg('请至少选择一条记录', {time: 2000});
   }else{
	   layer.confirm('确认删除吗？',{
		   title: ['信息', 'font-weight:600;color:#fff;background-color: #3367D6;'],
           btn: ['确认','取消'] //按钮
	   },function(){
		   $.post("/system/user/delete/"+ids,function(result){
			   if(result){
				   layer.msg('删除成功',{time:2000},function(){
					   parent.refresh_iframe();
				   });
			   }else{
				   layer.msg('删除失败',{time:2000},function(){
					  
				   });
			   }  
		   })
	   },function(){
		   //取消后操作
	   }  
	   )

   }
}

// 冻结/启用
function _freezeOrEnable(id, state){
    var info = "启用";
    if(!state){
        info = "冻结";
    }
    ///询问框
    layer.confirm('确认' + info + '吗？', {
        title: ['信息', 'font-weight:600;color:#fff;background-color: #3367D6;'],
        btn: ['确认','取消'] //按钮
    }, function(){
        $.post("/system/user/freezeOrEnable?id=" + id + "&state=" + state,function(result) {
            if (result) {
                layer.msg(info + '成功', {time: 2000}, function(){
                    parent.refresh_iframe();
                });
            }
        });
    }, function(){

    });
}
