/**
 * 新增-菜单管理js
 */
var vm = new Vue({
	el:'#dpLTE',
	data: {
		menu: {
			parentName:null,
			parentId:0,
			type:1,
			orderNum:0,
			icon:null
		}
	},
	methods: {
		selectIcon: function () {
			dialogOpen({
				id: 'iconSelect',
				title: '选取图标',
				url: '/base/menu/icon',
				scroll: true,
				width: '1030px',
				height: '600px',
				btn: false
			})
		},
		menuTree: function () {
			dialogOpen({
				id: 'layerMenuTree',
				title: '选择菜单',
				url: '/base/menu/tree',
				scroll : true,
		        width: "300px",
		        height: "450px",
		        yes : function(iframeId) {
		        	//top.frames[iframeId].vm.acceptClick();
		        	var obj = $(top.layerMenuTree).find('iframe').eq(0);
		        	var iframeWin = obj[0].contentWindow;  //子页面窗口对象
		        	iframeWin.vm.acceptClick();
				}
			});
		},
		acceptClick: function () {
			if (!$('#form').Validform()) {
				return false;
			}
			/*$.SaveForm({
				url: '/base/menu/save',
				param: vm.menu,
				success: function (data) {
					$.currentIframe().vm.load();
				}
			});*/
			$.post('/base/menu/save', vm.menu, function (result) {
				console.log(result);
			});
		}
	}
});

