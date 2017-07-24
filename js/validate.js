$(document).ready(function(){
			var email = $("#email");
			var code = $("#code");
			var password = $("#password");
			var secPassword = $("#surePassword");
			var emailFilter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var passwordFilter = /^[0-9A-Za-z]{6,}$/;
			var emailOK = false;
			var codeOK = false;
			var passwordOK = false;
			var secPasswordOK = false;
			function emailFunction(){
				if(email.val()=="" || !document.getElementById("email").value.match(emailFilter)){
					alert("邮箱格式不对");
					email.css({"border-color":"red","border-width":"1px","border-style":"solid"});
					emailOK = false;
					return emailOK;
				}else{
					emailOK = true;
					alert("success")
					email.css("border","0");
					return emailOK;
//					$.post("",{email:email.val()},function(data){
//						
//					})
				}
			}
			function codeFunction(){
				if(code.val()==""){
					alert("error")
					code.css({"border-color":"red","border-width":"1px","border-style":"solid"});
					codeOK = false;
					return codeOK;
				}else{
					codeOK = true;
					alert("successcode");
					code.css("border-color","#C6C4C4");
					return codeOK;
				}
			}
			function passwordFunction(){
				if(password.val()=="" || !document.getElementById("password").value.match(passwordFilter)){
					alert("密码长度至少6位");
					password.css({"border-color":"red","border-width":"1px","border-style":"solid"});
					passwordOK = false;
					return passwordOK;
				}else{
					password.css("border-color","#C6C4C4")
					passwordOK = true;
					return passwordOK;
				}
			}
			function secPasswordFunction(){
				if(secPassword.val()=="" || password.val()!=secPassword.val()){
					secPassword.css({"border-color":"red","border-width":"1px","border-style":"solid"});
					alert("输入的两次密码不一致");
					secPasswordOK = false;
					return secPasswordOK;
				}else{
					secPassword.css("border-color","#C6C4C4")
					secPasswordOK = true;
					return secPasswordOK;
				}
			}
			email.blur(function(){
				emailFunction();
			})
			code.blur(function(){
				codeFunction();
			})
			password.blur(function(){
				passwordFunction();
			})
			secPassword.blur(function(){
				secPasswordFunction();
			})
			
			$("#form").submit(function(){
				
				//return false
				if(!emailOK){
					emailFunction()
					return false;
				}
				if(!codeOK){
					codeFunction()
					return false;
				}
				if(!passwordOK){
					passwordFunction()
					return false;
				}
				if(!secPasswordOK){
					secPasswordFunction()
					return false;
				}
				return true;
			})
})