<%@ Page Language="C#" AutoEventWireup="true" CodeFile="checkCode.aspx.cs" Inherits="checkCode" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <table border="1">
        <tr>
            <th>验证码</th>
            <th>类型</th>
            <th>过期时间</th>
        </tr>
        <asp:Repeater ID="rpData" runat="server">
            <ItemTemplate>
                <tr>
                    <td><%#Eval("checkCode") %></td>
                    <td><%#Eval("checkMethod") %></td>
                    <td><%#((DateTime)Eval("endTime")).ToString("yyyy-MM-dd HH:mm:ss") %></td>
                </tr>
            </ItemTemplate>
        </asp:Repeater>
    </table>
</body>
</html>
