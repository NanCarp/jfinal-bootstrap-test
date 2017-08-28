package structure.config;
import com.jfinal.config.Routes;

import structure.base.menu.SysMenuController;
import structure.login.HomeController;
import structure.login.LoginController;
import structure.system.authority.AuthorityController;
import structure.system.button.ButtonController;
import structure.system.menu.MenuController;
import structure.system.role.RoleController;
import structure.system.user.UserController;
import structure.test.bootstrapfileinput.BootstrapFileInputController;

/**
 * @ClassName: AdminRoutes.java
 * @Description: 配置后端路由（供管理系统）
 * @author: LiYu
 * @date: 2017年8月19日上午8:07:33
 * @version: 1.0 版本初成
 */
public class AdminRoutes extends Routes{
	/**
	 *@desc 配置后端路由
	 *@date 2017/05/12 
	 */
	@Override
	public void config() {
		// 设置页面base路径
		setBaseViewPath("/pages");
		// 其他 url 
		add("/",HomeController.class,"");
		
		// 登陆控制器
		add("/pages",LoginController.class,"");
		
		//系统管理-角色管理控制器
		add("/system/role",RoleController.class,"/system");
		//系统管理-用户管理控制器
		add("/system/user",UserController.class,"/system");
		//系统管理-菜单管理控制器
		add("/system/menu",MenuController.class,"/system");
		//系统管理-按钮管理控制器
		add("/system/button",ButtonController.class,"/system");
		//系统管理-权限管理控制器
		add("/system/authority",AuthorityController.class,"/system");
		
		// 系统管理菜单
		add("/base/menu",SysMenuController.class,"/base/menu");
		
		
		// 测试
		// bootstrap file input
	    add("/test/bootstrapfileinput",BootstrapFileInputController.class,"/test/bootstrapfileinput");

	}
}
