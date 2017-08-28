package structure.base.menu;

import java.util.List;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;

/**
 * @ClassName: SysMenuController.java
 * @Description:
 * @author: LiYu
 * @date: 2017年8月20日上午10:18:13
 * @version: 1.0 版本初成
 */
public class SysMenuController extends Controller {
    
    /** 
    * @Title: index 
    * @Description: 系统菜单页面
    * @author liyu
    */
    public void index() {
        render("list.html");
    }
    
    /** 
    * @Title: list 
    * @Description: 菜单列表数据
    * @author liyu
    */
    public void list() {
        List<Record> list = SysMenuService.list();
        renderJson(list);
    }
    
    /** 
    * @Title: save 
    * @Description: 新增菜单页面
    * @author liyu
    */
    public void add() {
        render("add.html");
    }
    
    /** 
    * @Title: tree 
    * @Description: 菜单树页面
    * @author liyu
    */
    public void tree() {
        render("tree.html");
    }
    
    /** 
    * @Title: select 
    * @Description: 菜单树数据
    * @author liyu
    */
    public void select() {
        List<Record> list = SysMenuService.listNotButton();
        renderJson(list);
    }
    
    /** 
    * @Title: save 
    * @Description: 保存
    * @author liyu
    */
    public void save() {
        renderJson(true);
    }
    
}
