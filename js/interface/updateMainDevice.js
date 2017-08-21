$(document).ready(function(){
	$.ajax({
		type:"post",
		url:"Handler/userInfo.ashx",
		async:false,
		data:{platformType:1,isWeb:1},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				$("#currentDeviceCode").html(dataObj.userInfo.deviceRemark);
			}else{
				dataStatus(dataObj);
			}
		}
	});
	
	$.ajax({
		type:"post",
		url:"Handler/deviceList.ashx",
		async:false,
		data:{platformType:1,isWeb:1},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				if(dataObj.count==0){
					$("#deviceNum option").first().html("你没有授权的设备");
					$("#subMainDevice").hide();
				}
				for(var i=0; i<dataObj.data.length; i++){
					if(dataObj.data[i].remark==""){
						var remark = "设备"+dataObj.data[i].id;
					}else{
						var remark = dataObj.data[i].remark;
					}
					$("#deviceNum").append('<option value="'+dataObj.data[i].id+'">'+remark+'</option>');
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
	
	$("#subMainDevice").click(function(){
		if($("#deviceNum").val()==-1){
			alert("请选择要替换的设备！");
			return false;
		}
		var deviceID = $("#deviceNum").val();
		var validCode = $("#codeInput").val();
		$.ajax({
			type:"post",
			url:"Handler/updateMainDevice.ashx",
			async:true,
			data:{platformType:1,isWeb:1,deviceID:deviceID,validCode:validCode},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					alert("替换主设备成功！");
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})
