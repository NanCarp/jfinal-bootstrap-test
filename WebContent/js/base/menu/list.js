/**
 * 系统菜单js
 */
$(function () {
	initialPage();
	getGrid();
});

function initialPage() {
	$(window).resize(function () {
		TreeGrid.table.resetHeight({height: $(window).height()-100});
	});
}

function getGrid() {
	var columns = TreeGrid.initColumn();
	var table = new TreeTable(TreeGrid.id, '/base/menu/list', columns);//??
	table.setExpandColumn(2);
    table.setIdField("menu_id");
    table.setCodeField("menu_id");
    table.setParentCodeField("parent_id");
    table.setExpandAll(false);
    table.setHeight($(window).height()-100);
    table.init();
    TreeGrid.table = table;
}

var vm = new Vue({
	el: '#wrapper',
	methods: {
		load: function () {
			TreeGrid.table.refresh();
		},
		save: function () {
			dialogOpen({
				title: '新增菜单',
				url: '/base/menu/add',
				width: '600px',
				height: '420px',
				scroll : true,
				yes : function(iframeId) {
					var obj = $(top.layerForm).find('iframe').eq(0);
		        	var iframeWin = obj[0].contentWindow;  //子页面窗口对象
		        	iframeWin.vm.acceptClick();
				},
			});
		},
		edit: function() {
			var ck = TreeGrid.table.getSelectedRow();
			if (checkedRow(ck)){
				dialog({
					title: '编辑菜单',
					url: '/base/menu/edit',
					width: '600px',
					height: '420px',
					scroll : true,
					success: function(iframeId){
						top.frames[iframeId].vm.menu.menuId = ck[0].id;
						top.frames[iframeId].vm.setForm();
					},
					yes : function(iframeId) {
						top.frames[iframeId].vm.acceptClick();
					},
				});
			}
			
		},
		remove: function() {
			var ck = TreeGrid.table.getSelectedRow(), ids = [];
			if(checkedArray(ck)) {
				$.each(ck, function(idx, item) {
					ids[idx] = item.id;
				});
				$.RemoveForm({
					url: '/base/menu/remove',
					param: ids,
					success: function(data) {
						vm.load();
					}
				});
			}
		}
	}
});

var TreeGrid = {
	id: "dataGrid",
	table: null,
	layerIndex: -1
};

/**
 * 初始化表格的列
 */
TreeGrid.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '编号', field: 'menu_id', visible: false, align: 'center', valign: 'middle', width: '50px'},
        {title: '名称', field: 'name', align: 'center', valign: 'middle', width: '180px'},
        {title: '上级菜单', field: 'parentName', align: 'center', valign: 'middle', width: '100px'},
        {title: '图标', field: 'icon', align: 'center', valign: 'middle', width: '50px', formatter: function(item, index){
            return item.icon == null ? '' : '<i class="'+item.icon+' fa-lg"></i>';
        }},
        {title: '类型', field: 'type', align: 'center', valign: 'middle', width: '60px', formatter: function(item, index){
            if(item.type === 0){
                return '<span class="label label-primary">目录</span>';
            }
            if(item.type === 1){
                return '<span class="label label-success">菜单</span>';
            }
            if(item.type === 2){
                return '<span class="label label-warning">按钮</span>';
            }
        }},
        {title: '排序', field: 'order_num', align: 'center', valign: 'middle', width: '50px'},
        {title: '菜单URL', field: 'url', align: 'center', valign: 'middle', width: '200px'},
        {title: '授权标识', field: 'perms', align: 'center', valign: 'middle'}]
    return columns;
};












