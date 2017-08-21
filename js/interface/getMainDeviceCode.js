$(document).ready(function(){
	$("#getMainCode").click(function(){
		if($("#deviceNum").val()==-1){
			alert("请选择有效的设备");
			return false;
		}
		$.ajax({
			type:"post",
			url:"Handler/getMainDeviceCode.ashx",
			async:true,
			data:{platformType:1,isWeb:1},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					alert("获取验证码成功！");
					countDown("#getMainCode");
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})
