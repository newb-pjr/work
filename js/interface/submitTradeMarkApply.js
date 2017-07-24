function submitApply(id) {
	layer.confirm('提交后将无法修改申请书', {
		btn: ['确定', '取消'] //按钮
	}, function() {
		$.ajax({
			type: "post",
			url: "Handler/editTradeMarkApply.ashx",
			data: {
				action: "changeStatus",
				id: id,
				status: 2,
				payPic: 0,
				url: "",
				platformType: 1,
				isWeb: 1
			},
			async: true,
			success: function(data) {
				
			}
		});
	}, function() {
		
	});

}