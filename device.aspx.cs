using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TradeMark.Public;

public partial class device : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Session["device"] = WebCommon.GetStrPara(Context, "device");
        Response.Write("设置成功");
    }
}