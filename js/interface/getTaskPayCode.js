$(document).ready(function(){
	$("#getTaskPayCode").click(function(){
		$(this).attr("disabled","disabled");
		$.ajax({
			type:"post",
			url:"Handler/getTaskPayCode.ashx",
			async:true,
			data:{platformType:1,isWeb:1},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					alert("获取验证码成功！");
					countDown("#getTaskPayCode");
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
	
	$("#subPay").click(function(){
		var searchloading = layer.load(1, {
		  shade: [0.5,'#000']
		});
		if($("#payCodeInput").val()==""){
			alert("验证码不能为空！");
			return false;
		}
		var taskID = getCookie("TaskID");
		var validCode = $("#payCodeInput").val();
		$.ajax({
			type:"post",
			url:"Handler/taskPay.ashx",
			async:true,
			data:{platformType:1,isWeb:1,taskID:taskID,validCode:validCode},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					layer.close(searchloading);
					window.parent.mainGoBack();
					closeTab('查询结果');
					closeTab('查询结果-图像显示');
					handleTab('sbsb-cxjg.html','查询结果');
					document.cookie = "SortType=";
				}else{
					switch(dataTaskPay.status){
						case 0:
							alert(dataTaskPay.err);
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
							alert("输入的密码或手机、邮箱收到的验证码不匹配");
							break;
					}
				}
			}
		});
	})
})
