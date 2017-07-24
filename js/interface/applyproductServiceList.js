$(document).ready(function(){
	$("#applyClassSelect").change(function(){
		$(".tablesorter tbody").html("");
		if($(this).val() == 0){
			$("#applyGroupSelect").html('<option value="0">未选择</option>');
			return false;
		}else{
			var typeCode = $(this).val();
			$.post('Handler/productGroupList.ashx',{platformType:1,isWeb:1,typeCode:typeCode,groupCode:"",pageSize:0,page:0},function(data){
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
					$("#applyGroupSelect").html('<option value="">全部</option>');
					for(var i=0; i<dataObj.data.length; i++){
						$("#applyGroupSelect").append('<option value="'+dataObj.data[i].groupCode+'">'+dataObj.data[i].groupCode+'</option>');
					}
				}
			})
			
			$.ajax({
				type:"post",
				url:"Handler/productServiceList.ashx",
				data:{platformType:1,isWeb:1,typeCode:typeCode,groupCode:"",productName:"",pageSize:0,page:0},
				async:false,
				success:function(data){
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
						for(var j=0; j<dataObj.data.length; j++){
							$(".tablesorter tbody").append('<tr><td><input type="checkbox" class="tabCheckbox" id="'+dataObj.data[j].serviceID+'" /></td><td>'+dataObj.data[j].typeCode+'</td><td>'+dataObj.data[j].groupCode+'</td><td>'+dataObj.data[j].productCode+'</td><td>'+dataObj.data[j].ChineseName+'</td><td>'+dataObj.data[j].EnglishName+'</td><td></td></tr>');
						}
						$(".tablesorter").trigger("update");
					}
				}
			});
//			$.post('Handler/productServiceList.ashx',{platformType:1,isWeb:1,typeCode:typeCode,groupCode:"",productName:"",pageSize:0,page:0},function(data){
//				var dataObj = eval("("+data+")");
//				if(dataObj.status !=1){
//					switch(dataObj.status){
//						case 0:
//							alert(dataObj.err);
//							break;
//						case -1:
//							alert("用户不存在");
//							break;
//						case -2:
//							alert("登录信息不存在");
//							break;
//						case -3:
//							alert("用户 ID 与登录信息不匹配");
//							break;
//						case -4:
//							alert("登录已过期 ");
//							break;
//						case -5:
//							alert("验证码不正确");
//							break;
//					}
//				}else{
//					for(var j=0; j<dataObj.data.length; j++){
//						$(".tablesorter tbody").append('<tr><td><input type="checkbox" class="tabCheckbox"/></td><td>'+dataObj.data[j].typeCode+'</td><td>'+dataObj.data[j].groupCode+'</td><td>'+dataObj.data[j].productCode+'</td><td>'+dataObj.data[j].ChineseName+'</td><td>'+dataObj.data[j].EnglishName+'</td><td></td></tr>');
//					}
//				}
//			})
		}
		
		if(document.cookie.indexOf("serviceID=") != -1){
			var serviceID = getCookie("serviceID");
			var arrServiceID = serviceID.split(",");
			for(var i=0; i<$(".tablesorter tbody input[type='checkbox']").length; i++){
				for(var j=0; j<arrServiceID.length; j++){
					if($(".tablesorter tbody tr").eq(i).children('td').eq(0).find('input').attr("id") == arrServiceID[j]){
						$(".tablesorter tbody input[type='checkbox']").eq(i).attr('checked',true);
					}
				}
	//			if($(".tablesorter tbody input[type='checkbox']").eq(i).is(":checked")){
	//				type += $(".tablesorter tbody inp;ut[type='checkbox']").eq(i).parents('tr').children('td').eq(1).text()+",";
	//				serviceCode += $(".tablesorter tbody input[type='checkbox']").eq(i).parents('tr').children('td').eq(3).text()+",";
	//			}
			}
		}
	})
	
	$("#applyGroupSelect").change(function(){
		$(".tablesorter tbody").html("");
		var typeCode = $("#applyClassSelect").val();
		var groupCode = $(this).val();
		$.ajax({
			type:"post",
			url:"Handler/productServiceList.ashx",
			data:{platformType:1,isWeb:1,typeCode:typeCode,groupCode:groupCode,productName:"",pageSize:0,page:0},
			async:false,
			success:function(data){
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
						$(".tablesorter tbody").append('<tr><td><input type="checkbox" class="tabCheckbox"/></td><td>'+dataObj.data[i].typeCode+'</td><td>'+dataObj.data[i].groupCode+'</td><td>'+dataObj.data[i].productCode+'</td><td>'+dataObj.data[i].ChineseName+'</td><td>'+dataObj.data[i].EnglishName+'</td><td></td></tr>');
					}
					$(".tablesorter").trigger("update"); 
				}
			}
		});
//		$.post('Handler/productServiceList.ashx',{platformType:1,isWeb:1,typeCode:typeCode,groupCode:groupCode,productName:"",pageSize:0,page:0},function(data){
//			var dataObj = eval("("+data+")");
//			if(dataObj.status !=1){
//				switch(dataObj.status){
//					case 0:
//						alert(dataObj.err);
//						break;
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
//				for(var i=0; i<dataObj.data.length; i++){
//					$(".tablesorter tbody").append('<tr><td><input type="checkbox" class="tabCheckbox"/></td><td>'+dataObj.data[i].typeCode+'</td><td>'+dataObj.data[i].groupCode+'</td><td>'+dataObj.data[i].productCode+'</td><td>'+dataObj.data[i].ChineseName+'</td><td>'+dataObj.data[i].EnglishName+'</td><td></td></tr>');
//				}
//			}
//		})
		if(document.cookie.indexOf("serviceID=") != -1){
			var serviceID = getCookie("serviceID");
			var arrServiceID = serviceID.split(",");
			for(var i=0; i<$(".tablesorter tbody input[type='checkbox']").length; i++){
				for(var j=0; j<arrServiceID.length; j++){
					if($(".tablesorter tbody tr").eq(i).children('td').eq(0).find('input').attr("id") == arrServiceID[j]){
						$(".tablesorter tbody input[type='checkbox']").eq(i).attr('checked',true);
					}
				}
			}
		}
	})
	
	$(".tablesorter tbody input[type='checkbox']").live('click',function(){
		if(document.cookie.indexOf("type=") != -1 && document.cookie.indexOf("serviceID=") != -1){
			var type = getCookie("type")+",";
			var serviceID = getCookie("serviceID")+",";
		}else{
			var type = "";
			var serviceID = "";
		}
		var arrServiceID = serviceID.split(",");
		for(var i=0; i<arrServiceID.length; i++) {
		    if(arrServiceID[i].length == 0) arrServiceID.splice(i,1);
		}
		if(!$(this).is(":checked")){
			for(var i=0; i<arrServiceID.length; i++){
				if($(this).parents('tr').children('td').eq(0).find('input').attr("id") == arrServiceID[i]){
					arrServiceID.splice($.inArray(arrServiceID[i],arrServiceID),1);
					i = i-1;
				}
			}
			serviceID = arrServiceID.join(",");
		}else{
			type += $(this).parent('td').next().html();
			serviceID += $(this).parents('tr').children('td').eq(0).find('input').attr("id");
		}
		type = removeDuplicate(type);
		serviceID = removeDuplicate(serviceID);
		document.cookie = "type="+type;
		document.cookie = "serviceID="+serviceID;
	})
	
	$("#searchService").click(function(){
		$(".tablesorter tbody").html("");
		var typeCode = $("#applyClassSelect").val();
		var groupCode = $("#applyGroupSelect").val();
		var productName = $(".classText").val();
		$.post('Handler/productServiceList.ashx',{platformType:1,isWeb:1,typeCode:typeCode,groupCode:groupCode,productName:productName,pageSize:0,page:0},function(data){
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
					$(".tablesorter tbody").append('<tr><td><input type="checkbox" class="tabCheckbox"/></td><td>'+dataObj.data[i].typeCode+'</td><td>'+dataObj.data[i].groupCode+'</td><td>'+dataObj.data[i].productCode+'</td><td>'+dataObj.data[i].ChineseName+'</td><td>'+dataObj.data[i].EnglishName+'</td><td></td></tr>');
				}
				$(".tablesorter").trigger("update"); 
			}
		})
	})
})
