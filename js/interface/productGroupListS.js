function productGroupList(value){
	$("#groupNameResultS").html("");
	if(value == 0){
		$("#groupSelectS").html('<option value="0">未选择</option>');
		$("#classNumS").html("");
		return false;
	}else{
		$.post('Handler/productGroupList.ashx',{platformType:1,isWeb:1,typeCode:value,groupCode:"",pageSize:0,page:0},function(data){
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
				}
			}else{
				$("#groupSelectS").html('<option value="">全部</option>');
				$("#classNumS").html('第'+value+'类');
				for(var i=0; i<dataObj.data.length; i++){
					$("#groupSelectS").append('<option value="'+dataObj.data[i].groupCode+'">'+dataObj.data[i].groupCode+'</option>');
					$("#groupNameResultS").append('<li><input type="checkbox" checked="checked" class="tabImgCheckbox" id="'+dataObj.data[i].groupCode+'" /> <label for="'+dataObj.data[i].groupCode+'">'+dataObj.data[i].groupCode+' '+dataObj.data[i].name+'</label></li>');
				}
			}
		})
	}
}

function productGroupListSec(value){
	$("#groupNameResultS").html("");
	var typeCode = $("#classSelectS").val();
	$.post('Handler/productGroupList.ashx',{platformType:1,isWeb:1,typeCode:typeCode,groupCode:value,pageSize:0,page:0},function(data){
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
				}
			}else{
				for(var i=0; i<dataObj.data.length; i++){
					$("#groupNameResultS").append('<li><input type="checkbox" class="tabImgCheckbox" id="'+dataObj.data[i].groupCode+'" checked="checked" /> <label for="'+dataObj.data[i].groupCode+'">'+dataObj.data[i].groupCode+' '+dataObj.data[i].name+'</label></li>');
				}
			}
	})
}

$(document).ready(function(){
	var val = [];
	var check;
	$("#groupNameResultS li input").live("click",function(){
		$("#markGroupS").val("");
		check = true;
		$("#groupNameResultS li").each(function(){
			val = removeDuplicateArr(val);
			if($(this).find('input').is(":checked")){
				val.push($(this).find('input').attr('id'));
			}else{
				check = false;
				if($.inArray($(this).find('input').attr('id'), val) != -1){
					val.splice($.inArray($(this).find('input').attr('id'), val), 1);
				}
			}
		})
		$("#markGroupS").val(removeDuplicateArr(val));
		if(!check){
			$("#allClassBS").removeAttr("checked");
		}else{
			$("#allClassBS").attr("checked","checked");
			$("#markGroupS").val("");
		}
	})
})
