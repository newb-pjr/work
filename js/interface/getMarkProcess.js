$(document).ready(function(){
	var MarkNo = getCookie("MarkNo");
	var MarkClass = getCookie("MarkClass");
	$(".processTitle").html("第"+MarkClass+"类  第"+MarkNo+"号 商标审查流程：");
	$.post(url+'Handler/getMarkProcess.ashx',{platformType:1,isWeb:1,MarkNo:MarkNo,MarkClass:MarkClass},function(data){
		var dataObj = eval("("+data+")");
		console.log(dataObj);
		for(item in dataObj.data.MarkProcess){
			$(".processCont table").append('<tr><td>'+dataObj.data.MarkProcess[item].ProcessDate+'</td><td>'+dataObj.data.MarkProcess[item].ProcessNameCn+'</td></tr>');
		}
	})
})