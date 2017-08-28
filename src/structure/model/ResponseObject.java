package structure.model;

/**
 * Created by nanca on 8/16/2017.
 */
public class ResponseObject {
    public static final int OK = 1, FAILED = 0, EMPTY = -1;
    public static final String OK_STR = "成功", FAILED_STR = "失败", EMPTY_STR = "数据为空";

    private int code;
    private String msg;
    private Object data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
