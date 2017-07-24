$(document).ready(function(){
	var parentID = getCookie("itemId");
	var serviceId = getCookie("serviceId");
	$.ajax({
		type:"post",
		url:"Handler/listServiceType.ashx",
		data:{parentID:parentID},
		async:false,
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status == 1){
				for(var i=0; i<dataObj.data.length; i++){
					$("#serviceChoose").append('<option value="'+dataObj.data[i].id+'">'+dataObj.data[i].name+'</option>');
				}
			}
		}
	});
//	$.post('Handler/listServiceType.ashx',{parentID:parentID},function(data){
//		var dataObj = eval("("+data+")");
//		if(dataObj.status == 1){
//			for(var i=0; i<dataObj.data.length; i++){
//				$("#serviceChoose").append('<option value="'+dataObj.data[i].id+'">'+dataObj.data[i].name+'</option>');
//			}
//		}
//	})
	for(var i=0; i<$("#serviceChoose option").length; i++){
		if($("#serviceChoose option").eq(i).val() == serviceId){
			$("#serviceChoose option").eq(i).attr("selected","selected");
		}
	}
	
	$("#itemSub").click(function(){
		var id = getCookie("shopId");
		var serviceID = $("#serviceChoose").val();
		var content = $("#itemCont").val();
		if(content == ""){
			alert("摘要不能为空！");
			return false;
		}
		var company = $("#itemCompanyName").val();
		var contact = $("#itemContact").val();
		if(contact == ""){
			alert("联系人不能为空！");
			return false;
		}
		var QQ = $("#itemQq").val();
		var telephone = $("#itemTelephone").val();
		var email = $("#itemEmail").val();
		if(email == ""){
			alert("电子邮箱不能为空！");
			return false;
		}
		$.post('Handler/addTradeMarkTrust.ashx',{id:id,serviceID:serviceID,content:content,company:company,contact:contact,QQ:QQ,telephone:telephone,email:email,platformType:1,isWeb:1},function(data){
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
				alert("提交成功！");
				$('#tt').tabs('close','在线委托');
			}
		})
	})
})
