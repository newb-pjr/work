using System.Collections.Generic;
using System.Collections.Specialized;
using System.Web;
using com.unionpay.acp.sdk;
using UnionPay.Public;
using TradeMark.Public;
using TradeMark.Models;
using TradeMark.BLL;

namespace TradeMark.UnionPay.Handler
{
    /// <summary>
    /// BackRcvResponse 的摘要说明
    /// </summary>
    public class BackRcvResponse : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            if (context.Request.HttpMethod == "POST")
            {
                // 使用Dictionary保存参数
                Dictionary<string, string> resData = new Dictionary<string, string>();

                NameValueCollection coll = context.Request.Form;

                string[] requestItem = coll.AllKeys;

                for (int i = 0; i < requestItem.Length; i++)
                {
                    resData.Add(requestItem[i], context.Request.Form[requestItem[i]]);
                }

                // 返回报文中不包含UPOG,表示Server端正确接收交易请求,则需要验证Server端返回报文的签名
                if (AcpService.Validate(resData, System.Text.Encoding.UTF8))
                {
                    //Response.Write("商户端验证返回报文签名成功\n");

                    string respcode = resData["respCode"]; //00、A6为成功，其余为失败。其他字段也可按此方式获取。

                    if (respcode == "00" || respcode == "A6")
                    {
                        int orderId = WebCommon.GetIntPara(context, "orderId");//订单ID
                        string rand = WebCommon.GetStrPara(context, "rand");//随机字符串
                        string sign = WebCommon.GetStrPara(context, "sign");//签名

                        if (orderId > 0 && !string.IsNullOrEmpty(rand) && !string.IsNullOrEmpty(sign))
                        {
                            if (func.GetSign(orderId, rand).ToLower() == sign.ToLower())
                            {
                                tb_userOrder uo = new tb_userOrderHandle().GetInfo(orderId);

                                if (uo != null && !uo.payStatus)
                                {
                                    new payExtentions().UpdateOrderPayStats(uo);
                                }
                            }
                        }
                    }
                }
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}