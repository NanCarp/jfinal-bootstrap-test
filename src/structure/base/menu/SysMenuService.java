package structure.base.menu;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

/**
 * @ClassName: SysMenuService.java
 * @Description:
 * @author: LiYu
 * @date: 2017年8月20日上午11:59:03
 * @version: 1.0 版本初成
 */
public class SysMenuService {

    /** 
    * @Title: list 
    * @Description: 菜单列表
    * @return List<Record>
    * @author liyu
    */
    public static List<Record> list() {
        String sql = "SELECT m.menu_id,m.parent_id, "
                + " (SELECT p.name "
                + " FROM sys_menu p "
                + " WHERE p.menu_id = m.parent_id "
                + " ) AS parentName, "
                + " m.name,m.url,m.perms,m.type,m.icon,m.order_num "
                + " FROM sys_menu m "
                + " ORDER BY m.order_num ASC ";
        return Db.find(sql);
    }

    /** 
    * @Title: listNotButton 
    * @Description: 菜单列表不包含按钮
    * @return List<Record>
    * @author liyu
    */
    public static List<Record> listNotButton() {
        String sql = "SELECT menu_id,parent_id,`name`,type "
                + " FROM sys_menu "
                + " WHERE type != 2 "
                + " ORDER BY order_num ASC ";
        List<Record> list = Db.find(sql);
        
        Record root = new Record();
        root.set("menu_id", 0L);
        root.set("name", "一级菜单");
        root.set("parent_id", -1L);
        root.set("open", true);
        list.add(root);
        
        return Db.find(sql);
    }

}
