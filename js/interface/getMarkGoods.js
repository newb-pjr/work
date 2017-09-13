$(document).ready(function(){
	var MarkNo = getCookie("MarkNo");
	var MarkClass = getCookie("MarkClass");
	$(".serviceTitle").html("&nbsp;&nbsp;&nbsp;注册号:"+MarkNo);
	$.post('Handler/getMarkGoods.ashx',{platformType:1,isWeb:1,MarkNo:MarkNo,MarkClass:MarkClass},function(data){
		var dataObj = eval("("+data+")");
		if(dataObj.status==1){
			for(var i=0;i<dataObj.data.Goods.length;i++){
				if(i%2==0){
					$("#serviceContLeft table").append('<tr><td>'+dataObj.data.Goods[i].GoodsCn+'</td><td>'+dataObj.data.Goods[i].MarkGroupTmios+'</td></tr>');
				}else{
					$("#serviceContRight table").append('<tr><td>'+dataObj.data.Goods[i].GoodsCn+'</td><td>'+dataObj.data.Goods[i].MarkGroupTmios+'</td></tr>');
				}
			}
		}else{
			dataStatus(dataObj);
		}
	})
})
