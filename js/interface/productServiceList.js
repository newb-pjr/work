$(document).ready(function(){
	$("#proNameService").click(function(){
		var productName = $("#productName").val();
		$("#proNameResult").html('');
		$.post('Handler/productServiceList.ashx',{platformType:1,isWeb:1,productName:productName,pageSize:0,page:0},function(data){
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
					$("#proNameResult").append('<li><label><input type="checkbox" checked="checked" class="tabImgCheckbox" data-code="'+dataObj.data[i].groupCode+'" />'+dataObj.data[i].groupCode+'  '+dataObj.data[i].ChineseName+'</label></li>');
				}
			}
			
		})
	})
	
	var val = [];
	var same;
	var check;
	$("#proNameResult li input").live("click",function(){
		$("#markGroup").val("");
		check = true;
		same = true;
		val = removeDuplicateArr(val);
		$("#proNameResult li").each(function(){
			if($(this).find('input').is(":checked")){
				val.push($(this).find('input').attr("data-code"));
			}else{
				check = false;
				if($.inArray($(this).find('input').attr('data-code'), val) != -1){
					for(var i=0; i<$("#proNameResult li").length; i++){
						if($(this).find('input').attr('data-code') == $("#proNameResult li").eq(i).find('input').attr('data-code')){
							if($("#proNameResult li").eq(i).find('input').is(":checked")){
								same = false;
							}
						}
					}
					if(same){
						val.splice($.inArray($(this).find('input').attr('data-code'), val), 1);
					}
				}
			}
		})
//		if($(this).is(":checked")){
//			val.push($(this).attr("data-code"))
//		}else{
//			if($.inArray($(this).attr('data-code'), val) != -1){
//				for(var i=0; i<$("#proNameResult li").length; i++){
//					if($(this).attr('data-code') == $("#proNameResult li").eq(i).find('input').attr('data-code')){
//						if($("#proNameResult li").eq(i).find('input').is(":checked")){
//							check = false;
//						}
//					}
//				}
//				if(check){
//					val.splice($.inArray($(this).attr('data-code'), val), 1);
//				}
//			}
//		}
		$("#markGroup").val(removeDuplicateArr(val));		
		if(!check){
			$("#allClassC").removeAttr("checked");
		}else{
			$("#allClassC").attr("checked","checked");
			$("#markGroup").val("");
		}
//		for(var i=0;i<$("#proNameResult li").length;i++){
//			if($("#proNameResult li input").eq(i).is(":checked")){
//				var idValues = $("#proNameResult li input").eq(i).attr("data-code");
//				var currentValues = $("#proNameText").val();
//				$("#proNameText").val(currentValues+idValues+";");
//				var str = $("#proNameText").val();
//				var strArr = str.split(";");
//				var result = [];
//				var tempStr = ""
//				for(var j=0; j<strArr.length; j++){
//					if(strArr[j] != tempStr){
//						result.push(strArr[j]);
//						tempStr = strArr[j];
//					}else{
//						continue;
//					}
//				}
//				$("#proNameText").val(result.join());
//			}
//		}				
	})
})
