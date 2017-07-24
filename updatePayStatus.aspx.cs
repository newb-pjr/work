using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TradeMark.Public;
using TradeMark.Models;
using TradeMark.BLL;

public partial class updatePayStatus : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int id = WebCommon.GetIntPara(Context, "id");
        tb_userOrder uo = new tb_userOrderHandle().GetInfo(id);
        new payExtentions().UpdateOrderPayStats(uo);

        Response.Write("支付状态更新成功");
    }
}