$(document).ready(function(){
	var MarkNo = getCookie("MarkNo");
	var MarkClass = getCookie("MarkClass");
	$(".processTitle").html("第"+MarkClass+"类  第"+MarkNo+"号 商标审查流程：");
	$.post('Handler/getMarkProcess.ashx',{platformType:1,isWeb:1,MarkNo:MarkNo,MarkClass:MarkClass},function(data){
		var dataObj = eval("("+data+")");
		if(dataObj.status==1){
			for(item in dataObj.data.MarkProcess){
				$(".processCont table").append('<tr><td>'+dataObj.data.MarkProcess[item].MarkNO_Items+'</td><td>'+dataObj.data.MarkProcess[item].XiangMu+'</td><td>'+dataObj.data.MarkProcess[item].LiuchengDate+'</td><td>'+dataObj.data.MarkProcess[item].StepName+'</td><td>'+dataObj.data.MarkProcess[item].Inference+'</td></tr>');
			}
		}else{
			dataStatus(dataObj);
		}
	})
})
