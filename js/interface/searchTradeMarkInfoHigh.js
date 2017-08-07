$(document).ready(function(){
	$(".addSearchContBtn").click(function(){
		var contentSelect = $("#contentSelect").val();
		var contSelectText = $("#contentSelect").find("option:selected").text();
		var selectValue = $(".selectValue").val();
		var searchType = $("#searchType").val();
		var isAlgorithm = false;
		if($("#searchContText").val() == ""){
			alert("添加的内容不能为空！");
			layer.close(searchloading);
			return false;
		}
		$(".showSearchCont").show();
		if(searchType == ""){
			$("#searchType").val(contentSelect);	
		}else{
			$("#searchType").val(searchType+"+"+selectValue+"_"+contentSelect);
		}
		var searchContText = $("#searchContText").val();
		var content = $("#content").val();
		if(content == ""){
			$("#content").val(contentSelect+"_"+searchContText);	
		}else{
			$("#content").val(content+"+"+contentSelect+"_"+searchContText);
		}
		if($("#algorithmTable tr:last-child td").length >= 10){
			$("#algorithmTable tr td:eq(0),#algorithmTable tr td:eq(1),#algorithmTable tr td:eq(2)").attr("rowspan","2");
			$("#algorithmTable").append('<tr></tr>');
		}
		$("#algorithmTable tr td").each(function(){
			if($(this).find('a').text() === contSelectText){
				return isAlgorithm = true;
			}
		})
		if(!isAlgorithm){
			switch (contentSelect){
				case "0":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-cn.html")>'+contSelectText+'</a><input type="hidden" id="zwAlgorithm" name="Algorithm" /><input type="hidden" id="zwJueryMode" name="jueryMode" /></td>')
					break;
				case "1":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-en.html")>'+contSelectText+'</a><input type="hidden" id="xwAlgorithm" name="Algorithm" /><input type="hidden" id="xwJueryMode" name="jueryMode" /></td>')
					break;
				case "2":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-txys.html")>'+contSelectText+'</a><input type="hidden" id="txysAlgorithm" name="Algorithm" /><input type="hidden" id="txysJueryMode" name="jueryMode" /></td>')
					break;
				case "3":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-zch.html")>'+contSelectText+'</a><input type="hidden" id="zchAlgorithm" name="Algorithm" /><input type="hidden" id="zchJueryMode" name="jueryMode" /></td>')
					break;
				case "4":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-zcr-cn.html")>'+contSelectText+'</a><input type="hidden" id="zcrzwAlgorithm" name="Algorithm" /><input type="hidden" id="zcrzwJueryMode" name="jueryMode" /></td>')
					break;
				case "5":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-zcr-en.html")>'+contSelectText+'</a><input type="hidden" id="zcrxwAlgorithm" name="Algorithm" /><input type="hidden" id="zcrxwJueryMode" name="jueryMode" /></td>')
					break;
				case "6":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-dz-cn.html")>'+contSelectText+'</a><input type="hidden" id="dzzwAlgorithm" name="Algorithm" /><input type="hidden" id="dzzwJueryMode" name="jueryMode" /></td>')
					break;
				case "7":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-dz-en.html")>'+contSelectText+'</a><input type="hidden" id="dzxwAlgorithm" name="Algorithm" /><input type="hidden" id="dzxwJueryMode" name="jueryMode" /></td>')
					break;
				case "8":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-dljg-cn.html")>'+contSelectText+'</a><input type="hidden" id="dljgzwAlgorithm" name="Algorithm" /><input type="hidden" id="dljgzwJueryMode" name="jueryMode" /></td>')
					break;
				case "9":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-dljg-en.html")>'+contSelectText+'</a><input type="hidden" id="dljgxwAlgorithm" name="Algorithm" /><input type="hidden" id="dljgxwJueryMode" name="jueryMode" /></td>')
					break;
				case "10":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-spfw-cn.html")>'+contSelectText+'</a><input type="hidden" id="spfwzwAlgorithm" name="Algorithm" /><input type="hidden" id="spfwzwJueryMode" name="jueryMode" /></td>')
					break;
				case "11":
					$("#algorithmTable tr:last-child").append('<td><a href="javascript:void(0)" class="searchContBtn" id="" style="margin-left: 0;border-left: 1px solid #C6C4C4;" onclick=handleLayer("查询算法设置","sbsb-sfsz-spfw-en.html")>'+contSelectText+'</a><input type="hidden" id="spfwxwAlgorithm" name="Algorithm" /><input type="hidden" id="spfwxwJueryMode" name="jueryMode" /></td>')
					break;
				default:
					break;
			}
		}
//		var jueryMode = $("#jueryMode").val();
//		var queryModeValue = $("#queryModeValue").val();
//		if(queryModeValue == ""){
//			$("#queryModeValue").val(contentSelect+"_"+jueryMode);	
//		}else{
//			$("#queryModeValue").val(queryModeValue+"+"+contentSelect+"_"+jueryMode);
//		}
//		if(jueryMode == 2){
//			var Algorithm = $("#Algorithm").val().replace(/,/g,";");
//			var algorithmValue = $("#algorithmValue").val();
//			if(algorithmValue == ""){
//				$("#algorithmValue").val(contentSelect+"_"+Algorithm);	
//			}else{
//				$("#algorithmValue").val(algorithmValue+"+"+contentSelect+"_"+Algorithm);
//			}
//		}
		if($(".selectValue").attr("style") === "display: inline-block;"){
			$(".showSearchCont").append('<div class="showSearchDet"><p>内容种类：'+$("#contentSelect").find("option:selected").text()+'</p><p>查询内容：'+$("#searchContText").val()+'</p><p>逻辑关系：'+$(".selectValue").find("option:selected").text()+'</p></div>');
			
		}else{
			$(".showSearchCont").append('<div class="showSearchDet"><p>内容种类：'+$("#contentSelect").find("option:selected").text()+'</p><p>查询内容：'+$("#searchContText").val()+'</p></div>');
		}
		$(".selectValue").show();
	})
	
	$("#search").click(function(){
		var breakGo = false;
		var isBreak = false;
		var validMethod;
		var searchloading = layer.load(1, {
		  shade: [0.5,'#000']
		});
		$.ajax({
			type:"post",
			url:"Handler/getTaskID.ashx",
			async:false,
			data:{platformType:1,isWeb:1},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					TaskID = dataObj.taskID;
					if(TaskID==""){
						alert("获取TaskID出错！")
						layer.close(searchloading);
						breakGo = true;
					}
				}else{
					dataStatus(dataObj);
					layer.close(searchloading);
					breakGo = true;
				}
			}
		});
		if(breakGo){
			return false;
		}
		document.cookie = "TaskID="+TaskID;
		$.ajax({
			type:"post",
			url:"Handler/userInfo.ashx",
			async:false,
			data:{platformType:1,isWeb:1},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					if(dataObj.userInfo.userCard==""){
						alert("当前国方卡已过期，请购卡或激活卡再进行操作！");
						layer.close(searchloading);
						breakGo = true;
					}else{
						validMethod = dataObj.userInfo.userCard.validMethod;
					}
				}else{
					dataStatus(dataObj);
				}
			}
		});
		if(breakGo){
			return false;
		}
		var FrontCount = 16;
		var SearchType = $("#searchType").val();
		var Content = $("#content").val();
		var MarkClass = $("#markClass").val().replace(/,/g,";");
		var MarkGroup = $("#markGroup").val().replace(/,/g,";");
		if(Content == ""){
			alert("内容不能为空！");
			layer.close(searchloading);
			return false;
		}
		var algorithmArr = [];
		var jueryModeArr = [];
		$("#algorithmTable tr td").each(function(){
			if(typeof($(this).find("input[name='Algorithm']").val()) != "undefined" && $(this).find("input[name='Algorithm']").val() != ""){
				algorithmArr.push($(this).find("input[name='Algorithm']").val());
//				jueryModeArr.push($(this).find("input[name='jueryMode']").val());
			}
//			else{
//				if(typeof($(this).find("input[name='jueryMode']").val()) != "undefined" && $(this).find("input[name='jueryMode']").val() == ""){
//					switch ($(this).find("a").text()){
//						case '商标名称中文':
//							$(this).find("input[name='jueryMode']").val('0_0');
//							break;
//						case '商标名称西文':
//							$(this).find("input[name='jueryMode']").val('1_0');
//							break;
//						case '商标图形要素':
//							$(this).find("input[name='jueryMode']").val('2_0');
//							break;
//						case '注册号':
//							$(this).find("input[name='jueryMode']").val('3_0');
//							break;
//						case '注册人名称中文':
//							$(this).find("input[name='jueryMode']").val('4_0');
//							break;
//						case '注册人名称英文':
//							$(this).find("input[name='jueryMode']").val('5_0');
//							break;
//						case '注册人地址中文':
//							$(this).find("input[name='jueryMode']").val('6_0');
//							break;
//						case '注册人地址英文':
//							$(this).find("input[name='jueryMode']").val('7_0');
//							break;
//						case '代理机构中文':
//							$(this).find("input[name='jueryMode']").val('8_0');
//							break;
//						case '代理机构英文':
//							$(this).find("input[name='jueryMode']").val('9_0');
//							break;
//						case '商品服务中文':
//							$(this).find("input[name='jueryMode']").val('10_0');
//							break;
//						case '商品服务英文':
//							$(this).find("input[name='jueryMode']").val('11_0');
//							break;
//						default:
//							break;
//					}
//					jueryModeArr.push($(this).find("input[name='jueryMode']").val());
//				}
//			}
		})
		var SearchMode = $("input[name='group1']:checked").val();
		var QueryMode = $("input[name='group2']:checked").val();
		if(QueryMode == ""){
			QueryMode = 0;
		}
		var State = $(".searchContTable input[name='group3']:checked").val();
		if(QueryMode!=2){
			var Algorithm = "";
		}else{
			if(algorithmArr==""){
				alert("算法不能为空！");
				layer.close(searchloading);
				return false;
			}
			var Algorithm = algorithmArr.join("+");
		}
		var DateType = $("#dateClassSelect").val();
		var dateSelectValue = $("#dateSelectHigh").val();
		if($("#dateClassSelect").val() == 0){
			$("#dateSelect").attr("disabled","disabled");
			BeginDate = "";
			EndDate = "";
		}else{
			if(dateSelectValue == ""){
				alert("日期范围不能为空！");
				layer.close(searchloading);
				return false;
			}else{
				var dateArr = dateSelect(dateSelectValue);
				BeginDate = $.trim(dateArr[0]);
				EndDate = $.trim(dateArr[1]);
			}
		}
		var firstTry = $.ajax({
			type:"post",
			url:"Handler/searchTradeMarkInfo.ashx",
			async:false,
			complete:function(){
				isBreak = true;
			},
			data:{platformType:1,isWeb:1,TaskID:TaskID,FrontCount:FrontCount,SearchMode:SearchMode,SearchType:SearchType,Content:Content,MarkClass:MarkClass,MarkGroup:MarkGroup,QueryMode:QueryMode,Algorithm:Algorithm,State:State,DateType:DateType,BeginDate:BeginDate,EndDate:EndDate},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.data.Result == ""){
					alert("没有查询结果！");
					layer.close(searchloading);
					return false;
				}
				if(dataObj.status == 1){
					window.data = dataObj.data;
					validMethodFunc(validMethod,searchloading);
				}else{
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
					layer.close(searchloading);
				}
			}
		});
		
		var n=0;
		var timer = setInterval(function(){
			if(n>30){
				firstTry.abort();
				var secondTry = taskIDAjax(validMethod,searchloading);
			}
			switch (n){
				case n>35:
					secondTry.abort();
					var thirdTry = taskIDAjax(validMethod,searchloading);
					break;
				case n>40:
					thirdTry.abort();
					var fourthTry = taskIDAjax(validMethod,searchloading);
					break;
				case n>45:
					fourthTry.abort();
					clearInterval(timer);
					alert("请求数据超时！");
					break;
				default:
					break;
			}
			if(isBreak){
				clearInterval(timer);
			}
			console.log(isBreak)
			n++;
		},1000)
	})
})
