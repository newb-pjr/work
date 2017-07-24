$(document).ready(function(){
	$.post("Handler/imageBasicList.ashx",{platformType:1,isWeb:1,parentCode:"",pageSize:0,page:0},function(data){
		var dataObj = eval("("+data+")");
		if(dataObj.status != 1){
			switch(dataObj.status){
				case 0:
					alert("获取数据失败");
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
			}
		}else{
			for(item in dataObj.data){
				$(".imageCont").append('<label onclick="imageBasicListSec(this,'+dataObj.data[item].imageCode+')">·<span>'+dataObj.data[item].imageCode+' '+dataObj.data[item].imageName+'</span></label><br/>')
			}
		}
	})
	$(".imageCont input").live('click',function(){
		//console.log(000)
		if($(".imageCont input[type='checkbox']:checked").length > 5){
			$(this).removeAttr("checked");
			alert("最多只能选择5项！");
		}
	})
})
function imageBasicListSec(obj,parentCode){
	if(obj.nextSibling.getAttribute("class") == "nextClass"){
		obj.parentNode.removeChild(obj.nextSibling);
	}else{
		$.post("Handler/imageBasicList.ashx",{platformType:1,isWeb:1,parentCode:parentCode,pageSize:0,page:0},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status != 1){
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
				}
			}else{
				str = obj.childNodes[1].innerText;
				strArr = str.split(" ");
				//console.log(strArr[0].split(".").length)
				var html = "";
				if(strArr[0].split(".").length == 2){
					for(item in dataObj.data){
						html += '<label><input type="checkbox" value="'+dataObj.data[item].imageCode+'" class="tabCheckbox" /><span>'+dataObj.data[item].imageCode+''+dataObj.data[item].imageName+'</span></label><br />'
						
						//obj.after('<div class="nextClass"><label class="labelBtn"><input type="checkbox" class="tabCheckbox" />'+dataObj.data[item].imageCode+''+dataObj.data[item].imageName+'</label></div>');
					}
					var newNode = document.createElement("div");
					newNode.className = "nextClass";
					//console.log(html)
					newNode.innerHTML = html;
					obj.parentNode.insertBefore(newNode,obj.nextSibling);
				}else{
					for(item in dataObj.data){
						html += '<label onclick="imageBasicListSec(this,'+dataObj.data[item].imageCode+')">·<span>'+dataObj.data[item].imageCode+' '+dataObj.data[item].imageName+'</span></label><br/>';
					}
					var newNode = document.createElement("div");
					newNode.className = "nextClass";
					//console.log(html)
					newNode.innerHTML = html;
					obj.parentNode.insertBefore(newNode,obj.nextSibling);
				}

				
			}
		})
	}
	
}
//function imageBasicList(obj,parentCode){
//	if(obj.checked == true){
//		$.post("Handler/imageBasicList.ashx",{platformType:1,isWeb:1,parentCode:parentCode,pageSize:0,page:0},function(data){
//			var dataObj = eval("("+data+")");
//			if(dataObj.status != 1){
//				switch(dataObj.status){
//					case -1:
//						alert("用户不存在");
//						break;
//					case -2:
//						alert("登录信息不存在");
//						break;
//					case -3:
//						alert("用户 ID 与登录信息不匹配");
//						break;
//					case -4:
//						alert("登录已过期 ");
//						break;
//					case -5:
//						alert("验证码不正确");
//						break;
//				}
//			}else{
//				var html = "";
//				for(item in dataObj.data){
//					html += '<label><input type="checkbox" value="'+dataObj.data[item].imageCode+'" class="tabCheckbox" onclick="imageBasicList(this,'+dataObj.data[item].imageCode+')" /><span>'+dataObj.data[item].imageCode+''+dataObj.data[item].imageName+'</span></label><br />'
//					
//					//obj.after('<div class="nextClass"><label class="labelBtn"><input type="checkbox" class="tabCheckbox" />'+dataObj.data[item].imageCode+''+dataObj.data[item].imageName+'</label></div>');
//				}
//				var newNode = document.createElement("div");
//				newNode.className = "nextClass";
//				//console.log(html)
//				newNode.innerHTML = html;
//				obj.parentNode.parentNode.insertBefore(newNode,obj.parentNode.nextSibling);
//			}
//		})
//	}else{
//		obj.parentNode.parentNode.removeChild(obj.parentNode.nextSibling);
//	}
//}

			
