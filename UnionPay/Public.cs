using System.Web.Configuration;
using System.Configuration;
using TradeMark.Public;

namespace UnionPay.Public
{
    /// <summary>
    /// 公共变量
    /// </summary>
    public class Var
    {
        private static Configuration config = WebConfigurationManager.OpenWebConfiguration("~");
        /// <summary>
        /// 商户号
        /// </summary>
        public static string merId = Security.DecryptDES(config.AppSettings.Settings["merId"].Value, Security.theKey);
        /// <summary>
        /// 返回验证key
        /// </summary>
        public static string key = Security.DecryptDES(config.AppSettings.Settings["unionPayKey"].Value, Security.theKey);
    }
    /// <summary>
    /// 公共方法
    /// </summary>
    public class func
    {
        /// <summary>
        /// 获取签名
        /// </summary>
        /// <param name="orderId">订单ID</param>
        /// <param name="rand">随机字符串</param>
        /// <returns></returns>
        public static string GetSign(int orderId, string rand)
        {
            return StaticMethod.MD5("orderId=" + orderId.ToString() + "&rand=" + rand.ToString() + "&key=" + Var.key);
        }
    }
}