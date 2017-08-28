package structure.test.bootstrapfileinput;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;

public class BootstrapFileInputController extends Controller {
    public void contract() {
        render("contract.html");
    }
    
    public void getJson() {
        Integer pageindex = 0; // 页码
        Integer pagelimit = getParaToInt("limit")==null? 12 :getParaToInt("limit"); // 每页数据条数
        Integer offset = getParaToInt("offset")==null?0:getParaToInt("offset");
        if(offset!=0){
            pageindex = offset/pagelimit;
        }
        pageindex += 1;
        
        Page<Record> page = BootstrapFileInputService.getDataPages(pageindex, pagelimit);
        
        Map<String, Object> map = new HashMap<String,Object>();
        
        map.put("rows", page.getList());
        map.put("total", page.getTotalRow());
        
        renderJson(map);
    }
    
    /** 
    * @Title: getRecord 
    * @Description: TODO(这里用一句话描述这个方法的作用)  void
    * @author liyu
    */
    public void getRecord() {
        Long id = getParaToLong();
        if (id != null) { // 编辑
            
        }
        render("contract_detail.html");
    }
    
    /** 
    * @Title: uploadFile 
    * @Description: 上传文件
    * @author liyu
    */
    public void uploadFile() {
        UploadFile file = getFile();

        Map<String, Object> responseMsg = BootstrapFileInputService.saveFile(file);

        renderJson(responseMsg);
    }
}
