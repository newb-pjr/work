$(document).ready(function(){
	$.post('Handler/userInfo.ashx',{platformType:1,isWeb:1},function(data){
		var dataObj = eval("("+data+")");
			if(dataObj.status != 1){
				dataStatus(dataObj);
			}else{
				$("#myUserName").html(dataObj.userInfo.userName);
				if(dataObj.userInfo.checkMethod == 1){
					$("#myValidWay").html(dataObj.userInfo.mobile);
				}
				if(dataObj.userInfo.checkMethod == 2){
					$("#myValidWay").html(dataObj.userInfo.email);
				}
				$("#name").val(dataObj.userInfo.name);
				$("#mobile").val(dataObj.userInfo.mobile);
				$("#email").val(dataObj.userInfo.email);
				$("#address").val(dataObj.userInfo.address);
				$("#country").val(dataObj.userInfo.country);
				$("#area").val(dataObj.userInfo.area);
				$("#contact").val(dataObj.userInfo.contact);
				$("#contactTel").val(dataObj.userInfo.contactTel);
				$("#contactMobile").val(dataObj.userInfo.contactMobile);
				$("#contactEmail").val(dataObj.userInfo.contactEmail);
				if($("#mobile").val() != ""){
					$(".bind").html("绑定手机：");
					$(".accountmodify p span:nth-child(2n)").html(dataObj.userInfo.mobile);
					$("#newEquipment").attr("placeholder","绑定新的手机");
					$("#getBindCode").attr("onclick","getBindCode(0)");
					$("#phoneSubBtn").attr("onclick","bindValidate(0)");
				}else{
					$(".bind").html("绑定邮箱：");
					$(".accountmodify p span:nth-child(2n)").html(dataObj.userInfo.email);
					$("#newEquipment").attr("placeholder","绑定新的邮箱");
					$("#getBindCode").attr("onclick","getBindCode(1)");
					$("#phoneSubBtn").attr("onclick","bindValidate(1)");
				}
			}
	})
	
	$("#modifyMainDeviceName").click(function(){
		var mainId;
		layer.prompt({
		  formType: 0,
		  title: '修改主设备别名',
		}, function(value, index, elem){
			$.ajax({
				type:"post",
				url:"Handler/deviceList.ashx",
				async:false,
				data:{mainDevice:1,platformType:1,isWeb:1},
				success:function(data){
					var dataObj = eval("("+data+")");
					if(dataObj.status==1){
						mainId = dataObj.data[0].id;
					}else{
						dataStatus(dataObj);
					}
				}
			});
			$.ajax({
				type:"post",
				url:"Handler/updateDeviceRemark.ashx",
				async:false,
				data:{platformType:1,isWeb:1,deviceID:mainId,remark:value},
				success:function(data){
					var dataObj = eval("("+data+")");
					if(dataObj.status==1){
						alert("修改主设备别名成功！");
						layer.close(index);
					}else{
						dataStatus(dataObj);
					}
				}
			});
		});
	})
})
