package structure.system.role;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.kit.JsonKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

import structure.interceptor.ManageInterceptor;
import structure.model.ResponseObject;

/**
 * @ClassName: RoleController.java
 * @Description: 系统管理_角色管理
 * @author: LiYu
 * @date: 2017年8月19日上午9:19:37
 * @version: 1.0 版本初成
 */
@Before(ManageInterceptor.class)
public class RoleController extends Controller {
    // 响应信息
    private ResponseObject responseObject;

    public void index() {
        render("role.html");
    }
    
    // 数据列表
    public void getJson(){
        // 角色名
        String rolename = getPara("rolename");
        
        Integer pageindex = 0; // 页码
        Integer pagelimit = getParaToInt("limit")==null? 12 :getParaToInt("limit"); // 每页数据条数
        Integer offset = getParaToInt("offset")==null?0:getParaToInt("offset");
        if(offset!=0){
            pageindex = offset/pagelimit;
        }
        pageindex += 1;
        
        Page<Record> page = RoleService.getDataPages(pageindex, pagelimit, rolename);
        
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("rows", page.getList());
        map.put("total", page.getTotalRow());
        
        renderJson(map);
    }

	/**
	 * @desc:角色列表
	 */
	public void getRole(){
        // 角色 id
        Integer id = getParaToInt("id");

        if (id != null) {//编辑
            Record role  = Db.findById("t_role", id);
            setAttr("role", JsonKit.toJson(role));
        }

		render("role_detail.html");
	}

    /** 
    * @Title: save 
    * @Description: 保存角色
    * @author liyu
    */
    public void save() {
     // 角色 id
        Integer id = getParaToInt("id");
        // 角色名称
        String role_type = getPara("role_type").trim();
        // 备注
        String remark = getPara("remark", "");
        // 保存结果
        boolean result = false;
        // 重复检测
        if (id == null && RoleService.isDuplicate(role_type)) {
            responseObject = new ResponseObject();
            responseObject.setCode(ResponseObject.FAILED);
            responseObject.setMsg("角色重复！");
            renderJson(responseObject);
            return;
        }
        
        Record record = new Record();
        record.set("role_type", role_type);
        record.set("remark", remark);
        if (id != null) {// 编辑
            record.set("id", id);
            result = Db.update("t_role", record);
            responseObject = new ResponseObject();
            responseObject.setCode(result ? ResponseObject.OK : ResponseObject.FAILED);
            responseObject.setMsg(result ? "保存成功": "保存失败");
        } else {// 新增
            result = Db.save("t_role", record);
            responseObject = new ResponseObject();
            responseObject.setCode(result ? ResponseObject.OK : ResponseObject.FAILED);
            responseObject.setMsg(result ? "保存成功": "保存失败");
        }

        renderJson(responseObject);
    }
    
	/** 
	* @Title: delete 
	* @Description: 批量删除
	* @author liyu
	*/
	public void delete(){
	    // 角色 id
		String ids = getPara(0);
		boolean result = RoleService.delete(ids);
		
		responseObject = new ResponseObject();
        responseObject.setCode(result ? ResponseObject.OK : ResponseObject.FAILED);
        responseObject.setMsg(result ? "删除成功": "删除失败");
		
		renderJson(responseObject);
	}

    // 根据公司 id 获取角色列表
    public void getRoleByCompanyId() {
        // 公司 id
        Integer companyId = getParaToInt();
        // 角色列表
        List<Record> roleList = RoleService.getRoleByCompanyId(companyId);

        renderJson(roleList);
    }

    // 根据公司 id 获取角色列表，剔除已分配权限的角色，
    public void getRoleByCompanyIdNotAuthorized() {
        // 公司 id
        Integer companyId = getParaToInt();
        // 角色列表
        List<Record> roleList = RoleService.getRoleByCompanyIdNotAuthorized(companyId);

        renderJson(roleList);
    }
}
