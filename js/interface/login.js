$(document).ready(function(){
			
			$("#login").click(function(){
				var name = $("#loginName").val();
				var password = $("#password").val();
				if(name=="" || password==""){
					alert("用户名或密码不能为空")
				}else{
					var loading = layer.load(1, {
					  shade: [0.5,'#000']
					});
					var md5Pwd = $.md5(password);
					$.post("Handler/login.ashx",{platformType:1,isWeb:1,userName:name,password:md5Pwd},function(data){
						var dataObj = eval("("+data+")");
						layer.close(loading);
						if(!dataObj.status){
							alert(dataObj.err);
						}else{
							switch(dataObj.status){
								case 1:
									document.cookie = "username="+dataObj.userInfo.userName;
									var x = screen.availWidth-10;  
									var y = screen.availHeight-60;
									window.open("main.html","_blank",'fullscreen=yes,channelmode=yes,titlebar=no,toolbar=no,scrollbars=auto,resizable=no,status=no,copyhistory=no,location=no,menubar=no,width='+x+',height='+y);  
//									window.close();
//									location.href = "main.html";
									break;
								case 0:
									alert("登录失败");
									break;
								case -1:
									alert("账号或密码错误");
									break;
								case -2:
									alert("需要验证");
									layer.prompt({
									  formType: 0,
									  value: '',
									  title: '请输入手机或邮箱验证码'
//									  cancel: function(index, layero){
//									    layer.close(loading);
//									  },
//									  btn2: function(index, layero){
//									    layer.close(loading);
//									  }
									}, function(value, index, elem){
									  $.ajax({
									  	type:"post",
									  	url:"Handler/loginCheck.ashx",
									  	async:false,
									  	data:{platformType:1,isWeb:1,userName:$("#loginName").val(),validCode:value},
									  	success:function(data){
											var dataObj = eval("("+data+")");
									  		if(dataObj.status==1){
									  			document.cookie = "username="+dataObj.userInfo.userName;
												var x = screen.availWidth-10;  
												var y = screen.availHeight-60;
												window.open("main.html","_blank",'fullscreen=yes,channelmode=yes,titlebar=no,toolbar=no,scrollbars=auto,resizable=no,status=no,copyhistory=no,location=no,menubar=no,width='+x+',height='+y);
//												document.cookie = "username="+dataObj.userInfo.userName;
//												location.href = "main.html";
									  		}else{
									  			switch (dataObj.status){
									  				case 0:
									  					alert(dataObj.err);
									  					break;
									  				case -1:
									  					alert("账号错误");
									  					break;
									  				case -2:
									  					alert("手机号码或电子邮箱接收到的验证码不匹配");
									  					break;
									  				case -3:
									  					alert("验证码不匹配");
									  					break;
									  				case -4:
									  					alert("用户登录信息不存在");
									  					break;
									  				default:
									  					break;
									  			}
									  		}
									  	}
									  });
									});
									break;
								case -3:
									alert("验证码不正确");
									break;
								case -4:
									alert("设备授权已达上限 ");
									break;
								case -5:
									alert("已有其他用户绑定了该设备并授权 ");
									break;
								case -6:
									alert("同一设备一分钟内验证超过 1 次 ");
									break;
								case -7:
									alert("需要先授权设备 ");
									break;
							}
						}
					});
//				
				 }
			})
		})
function check(){
	if(event.keyCode==13){
		$("#login").click();
	}
}