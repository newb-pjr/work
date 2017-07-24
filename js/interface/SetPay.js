$(document).ready(function(){
	$("#pay").click(function(){
		var payWayCode = $("#payWayCode").val();
		var orderId = $("#orderId").val();
		var loading = layer.load(1, {
		  shade: [0.5,'#000']
		});
		if(payWayCode==1){
			layer.confirm('该操作代表你已汇款于国方。<br>选择确认后，将无法更改', {
			  btn: ['确定','取消'], //按钮
			  icon: 3,
			  title: '提示',
			  cancel:function(){
					layer.close(loading);
			  }
			}, function(){
			  	$.ajax({
					type:"post",
					url:"Handler/updateOfflinePayStatus.ashx",
					async:true,
					data:{id:orderId,platformType:1,isWeb:1},
					success:function(data){
						layer.close(loading);
						var dataObj = eval("("+data+")");
						layer.closeAll('dialog');
						if(dataObj.status==1){
							alert("订单支付成功！");
							$("#orderBtnGroup").html("<p>用户已汇款，请通知我司工作人员跟进订单</p>");
						}else{
							dataStatus(dataObj);
						}
					}
				});
			}, function(){
				layer.close(loading);
			});
			
		}
		if(payWayCode==2){
			layer.close(loading);
			window.open("UnionPay/SetPay.aspx?orderId="+orderId,"_blank");
		}
//		$.ajax({
//			type:"post",
//			url:"UnionPay/SetPay.aspx",
//			async:false,
//			data:{orderId:orderId}
//		});
	})
})