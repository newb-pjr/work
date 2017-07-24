$(document).ready(function(){
	$("#shopListCity").change(function(){
		$(".serviceResult ul").html("");
		var areaCode = $(this).val();
		$.post('Handler/listStore.ashx',{areaCode:areaCode,platformType:1,isWeb:1,pageSize:0,page:0},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status == 1){
				for(var i=0; i<dataObj.data.length; i++){
					$(".serviceResult ul").append('<li><a href="javascript:void(0)" onclick=shopRedirection('+dataObj.data[i].id+',"'+dataObj.data[i].name+'")><img src="'+dataObj.data[i].picture+'" height="35" width="35" />'+dataObj.data[i].name+'</a></li>');
				}
			}
		})
	})
})

function shopRedirection(shopId,shopName){
	document.cookie = "shopId="+shopId;
	handleTab('wsfw-fwfs.html',shopName+'-服务方式');
}
