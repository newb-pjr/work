<%@ Page Language="C#" %>
<%@ Import Namespace="TradeMark.Public"  %>
<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        Captcha.getCheckCode();
    }
</script>
