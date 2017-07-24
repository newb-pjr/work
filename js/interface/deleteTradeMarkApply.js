function deleteTradeMarkApply(id,obj){
	layer.confirm('你将刪除申请书', {
		btn: ['确定', '取消'] //按钮
	}, function() {
		$.post('Handler/editTradeMarkApply.ashx',{action:"delete",id:id,platformType:1,isWeb:1},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status !=1){
				switch(dataObj.status){
					case 0:
						alert(dataObj.err);
						break;
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
						alert("验证码不正确");
						break;
					case -6:
						alert("非机构用户");
						break;
				}
			}else{
//				obj.parentNode.parentNode.removeChild(obj);
				obj.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode.parentNode.parentNode);
				layer.msg('删除成功');
			}
		})
	}, function() {
		
	});
//	if(confirm("你确定删除吗？")) {
//      $.post('Handler/editTradeMarkApply.ashx',{action:"delete",id:id,platformType:1,isWeb:1},function(data){
//			var dataObj = eval("("+data+")");
//			if(dataObj.status !=1){
//				switch(dataObj.status){
//					case 0:
//						alert(dataObj.err);
//						break;
//					case -1:
//						alert("用户不存在");
//						break;
//					case -2:
//						alert("登录信息不存在");
//						break;
//					case -3:
//						alert("用户 ID 与登录信息不匹配");
//						break;
//					case -4:
//						alert("登录已过期 ");
//						break;
//					case -5:
//						alert("验证码不正确");
//						break;
//					case -6:
//						alert("非机构用户");
//						break;
//				}
//			}else{
//				alert("删除成功！");
//				obj.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode.parentNode.parentNode);
//			}
//		})
//  } 
	
}
