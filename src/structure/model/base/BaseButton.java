package structure.model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings({"serial", "unchecked"})
public abstract class BaseButton<M extends BaseButton<M>> extends Model<M> implements IBean {

	public M setId(java.lang.Integer id) {
		set("id", id);
		return (M)this;
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public M setMenuId(java.lang.Integer menuId) {
		set("menu_id", menuId);
		return (M)this;
	}

	public java.lang.Integer getMenuId() {
		return get("menu_id");
	}

	public M setButtonId(java.lang.Integer buttonId) {
		set("button_id", buttonId);
		return (M)this;
	}

	public java.lang.Integer getButtonId() {
		return get("button_id");
	}

	public M setButtonName(java.lang.String buttonName) {
		set("button_name", buttonName);
		return (M)this;
	}

	public java.lang.String getButtonName() {
		return get("button_name");
	}

}
