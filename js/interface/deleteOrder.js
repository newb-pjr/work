$(document).ready(function(){
	$("#delOrder").click(function(){
		var id = $("#orderId").val()
		layer.confirm('删除订单后不可恢复，确定删除？', {
		  btn: ['删除','取消'], //按钮
		  icon: 3,
		  title: '提示'
		}, function(){
		  	$.ajax({
				type:"post",
				url:"Handler/deleteOrder.ashx",
				async:true,
				data:{id:id,platformType:1,isWeb:1},
				success:function(data){
					var dataObj = eval("("+data+")");
					layer.closeAll('dialog');
					if(dataObj.status==1){
						alert("订单删除成功！");
						closeTab("订单详情");
						closeTab("我的订单");
						handleTab("wdzh-wddd.html","我的订单");
					}else{
						dataStatus(dataObj);
					}
				}
			});
		}, function(){
		  
		});
	})
})
