$(document).ready(function(){
	$(".serviceUlIcon li").click(function(){
		var index = $(this).index();
		var parentID = index+1;
		$(".serviceContUl li ul").html("");
		$(this).addClass("currentService").siblings().removeClass("currentService");
		$(".serviceContUl>li").eq(index).show().siblings().hide();
		$.post('Handler/listServiceType.ashx',{parentID:parentID},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status == 1){
				for(var i=0; i<dataObj.data.length; i++){
					$(".serviceContUl li ul").append('<li><a href="javascript:void(0)" onclick=getServiceId('+dataObj.data[i].id+')><img src="img/icon_ulli.jpg" />'+dataObj.data[i].name+'</a></li>');
				}
				document.cookie = "itemId="+parentID;
			}
		})
	})
	
	$.post('Handler/listServiceType.ashx',{parentID:1},function(data){
		var dataObj = eval("("+data+")");
		if(dataObj.status == 1){
			for(var i=0; i<dataObj.data.length; i++){
				$(".serviceContUl li ul").append('<li><a href="javascript:void(0)" onclick=getServiceId('+dataObj.data[i].id+')><img src="img/icon_ulli.jpg" />'+dataObj.data[i].name+'</a></li>');
			}
			document.cookie = "itemId=1";
		}
	})
})

function getServiceId(serviceId){
	document.cookie = "serviceId="+serviceId;
	handleTab("wsfw-jgxz.html","代理机构选择");
}
