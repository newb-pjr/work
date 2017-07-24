$(document).ready(function(){
	$("#stopAuthorizeBtn").click(function(){
		if(!$(".deviceCont input[type='checkbox']").is(":checked")){
			alert("请选择设备后再进行终止授权！");
			return false;
		}
		$(".deviceCont input[type='checkbox']").each(function(){
			if($(this).is(":checked")){
				deviceID = $(this).next().val();
			}
		})
		$.ajax({
			type:"post",
			url:"Handler/deleteDevice.ashx",
			async:true,
			data:{platformType:1,isWeb:1,deviceID:deviceID},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					alert("设备终止授权成功！");
					$(".deviceCont input[type='checkbox']").each(function(){
						if($(this).is(":checked")){
							$(this).parent().next().html("未授权");
						}
					})
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})