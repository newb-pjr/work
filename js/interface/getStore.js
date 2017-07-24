$(document).ready(function(){
	var id = getCookie("shopId");
	$.post('Handler/getStore.ashx',{id:id,platformType:1,isWeb:1},function(data){
		var dataObj = eval("("+data+")");
		$("#shopPic").attr("src",dataObj.data.picture);
		$(".serviceWayTips").html(dataObj.data.tips);
	})
})
