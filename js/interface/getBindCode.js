$(document).ready(function(){
	$("#getBindCode").click(function(){
		var equipmentCode;
		var checkMethod;
		if(parent.$("#phone").is(":checked")){
			checkMethod = 0;
			equipmentCode = parent.$("#mobileNew").val();
		}
		if(parent.$("#mail").is(":checked")){
			checkMethod = 1;
			equipmentCode = parent.$("#emailNew").val();
		}
		$.post('Handler/getBindCode.ashx',{platformType:1,isWeb:1,checkMethod:checkMethod,equipmentCode:equipmentCode},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status != 1){
				dataStatus(dataObj);
			}else{
				countDown("#getBindCode");
				alert("获取验证码成功");	
			}
		})
	})
})
//function getBindCode(checkMethod){
//	var equipmentCode;
//	if(parent.$("#phone").is(":checked")){
//		equipmentCode = parent.$("#mobileNew").val();
//	}
//	if(parent.$("#mail").is(":checked")){
//		equipmentCode = parent.$("#emailWay").val();
//	}
//	$.post(url+'Handler/getBindCode.ashx',{platformType:1,isWeb:1,checkMethod:checkMethod,equipmentCode:equipmentCode},function(data){
//		var dataObj = eval("("+data+")");
//		if(dataObj.status != 1){
//			dataStatus(dataObj);
//		}else{
//			countDown("#getBindCode");
//			alert("获取验证码成功");	
//		}
//	})
//}