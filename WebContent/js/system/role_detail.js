
//绑定校验
function bindValidator(obj){
    // 表单校验
    var validator = $(obj).bootstrapValidator({
        //message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	role_type: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '角色不能为空'
                    },
                    stringLength: {
                        min: 0,
                        max: 20,
                        message: '最多20个字符'
                    }
                }
            },
            remark: {
                validators: {
                    stringLength: {
                        min: 0,
                        max: 200,
                        message: '最多200个字符'
                    }
                }
            },

        }
    });
    return validator;
}

var app = new Vue({
	el: '#defaultForm',
	data: function () {
		return {role: role1};
	},
	methods: {
		save: function () {
			//绑定校验
			var validator = bindValidator('form');
			validator.data('bootstrapValidator').validate();
			if (!validator.data('bootstrapValidator').isValid()) {
				return; // 校验不通过，禁止提交
			}
			// console.log(JSON.stringify(app.role));
			var url = '/system/role/save';
			$.post(url, app.role, function(result) {
		    	if (result.code == 1) {
		            parent.layer.msg(result.msg, {time: 2000}, function(){
		                layer_close();
		                parent.parent.refresh_iframe();
		            });

		        } else {
		            parent.layer.msg(result.msg, {time: 2000});
		        }
		    });
		}
	}
});




















