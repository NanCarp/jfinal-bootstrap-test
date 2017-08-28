package structure.test.bootstrapfileinput;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;

public class BootstrapFileInputService {

    public static Page<Record> getDataPages(Integer pageindex, Integer pagelimit) {
        String select = " SELECT * ";
        String sql = " FROM t_contract ";
        
        return Db.paginate(pageindex, pagelimit, select, sql);
    }

    /** 
    * @Title: saveFile 
    * @Description: 保存文件
    * @param file
    * @return Map<String,Object>
    * @throws 
    */
    public static Map<String, Object> saveFile(UploadFile file) {
        String originalName = file.getFileName();
        // 当前时间
        LocalDateTime now = LocalDateTime.now();
        // 文件路径
        String newName = originalName;
        String path = PropKit.get("uploadPath")+"temp/" + newName;
        file.getFile().renameTo(new File(path));

        Map<String, Object> responseMsg = new HashMap<>();
        responseMsg.put("fileName", newName);

        return responseMsg;
    }

}
