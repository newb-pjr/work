$(document).ready(function(){
	$.post(url+'Handler/payList.ashx',{platformType:1,isWeb:1,unit:0,pageSize:15,page:1},function(data){
		console.log(data);
		var dataObj = eval("("+data+")");
		if(dataObj.status != 1){
			switch(dataObj.status){
				case -1:
					alert("用户不存在");
					break;
				case -2:
					alert("登录信息不存在");
					break;
				case -3:
					alert("用户 ID 与登录信息不匹配");
					break;
				case -4:
					alert("登录已过期 ");
					break;
				case -5:
					alert("验证码不匹配 ");
					break;
			}
		}else{
			if(dataObj.count == 0){
				$(".tradeRecord").append('<tr><td colspan="4">没有记录</td></tr>');
			}else{
				$.each(dataObj.data, function(i,item) {
					$(".tradeRecord").append('<tr><td>'+item.payTime+'</td><td>'+item.payInfo+'</td><td>'+item.payMoney+'</td><td>'+item.remainMoney+'</td></tr>');
				});

			}
		}
	})
})


function payList(beginTime,endTime){
	$.post(url+'Handler/payList.ashx',{platformType:1,isWeb:1,beginTime:beginTime,endTime:endTime,unit:0,pageSize:15,page:1},function(data){
		console.log(data);
		var dataObj = eval("("+data+")");
		if(dataObj.status != 1){
			switch(dataObj.status){
				case -1:
					alert("用户不存在");
					break;
				case -2:
					alert("登录信息不存在");
					break;
				case -3:
					alert("用户 ID 与登录信息不匹配");
					break;
				case -4:
					alert("登录已过期 ");
					break;
				case -5:
					alert("验证码不匹配 ");
					break;
			}
		}else{
			if(dataObj.count == 0){
				$(".tradeRecord").append('<tr><td colspan="4">没有记录</td></tr>');
			}else{
				$.each(dataObj.data, function(i,item) {
					$(".tradeRecord").append('<tr><td>'+item.payTime+'</td><td>'+item.payInfo+'</td><td>'+item.payMoney+'</td><td>'+item.remainMoney+'</td></tr>');
				});

			}
		}
	})
}
