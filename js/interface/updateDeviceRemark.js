$(document).ready(function(){
	var deviceID;
	var remark;
	$(".deviceCont input[type='checkbox']").click(function(){
		if($(this).is(":checked")){
			$(this).parents('tr').siblings().find("input[type='checkbox']").removeAttr("checked");
			$(this).parents('tr').find("input[type='text']").removeAttr("disabled");
			$(this).parents('tr').siblings().find("input[type='text']").attr("disabled","disabled");
		}else{
			$(this).parents('tr').find("input[type='text']").attr("disabled","disabled");
		}
	})
	$("#saveDeviceName").click(function(){
		$(".deviceCont input[type='checkbox']").each(function(){
			if($(this).is(":checked")){
				deviceID = $(this).next().val();
				remark = $(this).parent().siblings().find("input[type='text']").val();
			}
		})
		if(!$(".deviceCont input[type='checkbox']").is(":checked")){
			alert("请选择设备后再保存！");
			return false;
		}
		if(remark == ""){
			alert("设备备注不能为空！");
			return false;
		}
		$.ajax({
			type:"post",
			url:"Handler/updateDeviceRemark.ashx",
			async:false,
			data:{platformType:1,isWeb:1,deviceID:deviceID,remark:remark},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status == 1){
					alert("修改设备备注成功！");
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})
