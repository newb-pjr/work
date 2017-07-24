using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TradeMark.Public;
using TradeMark.Models;
using TradeMark.BLL;

public partial class checkCode : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string equipmentCode = WebCommon.GetStrPara(Context, "equipmentCode");

        if (equipmentCode == null)
            equipmentCode = "";

        List<tb_userCheck> luc = new tb_userCheckHandle().GetList("select * from tb_userCheck where equipmentCode='" + equipmentCode.Replace("'", "''") + "' order by id desc", 0, 0);

        rpData.DataSource = luc;
        rpData.DataBind();
    }
}