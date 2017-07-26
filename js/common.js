function handleTab(href,title,closeTitle){
	window.parent.addTab(href,title,closeTitle);
}
function handleLayer(title,url,width,height){
	window.parent.mainLayer(title,url,width,height);
}
function closeTab(title){
	window.parent.$('#tt').tabs('close',title);
}
function countDown(Selector){
	time = 60;
	setTime(Selector);
}
function setTime(Selector){
	if(time == 0){
		$(Selector).removeAttr("disabled").val("获取验证码");
	}else{
		$(Selector).attr("disabled","disabled").val(time+"(s)");
		time--;
		setTimeout(function(){
			setTime(Selector);
		},1000)
	}
}
function dateSelect(dateString){
	dateArr = dateString.split("to");
	return dateArr;
}
function validateChinese(obj){
	var filterChinese = '^[\u4e00-\u9fa5]*$';
	if(obj.value=="" || !obj.value.match(filterChinese)){
		alert("只能输入中文字符");
		obj.value = "";
	}
}
function validateEnglish(obj){
	var filterEnglish = '^[A-Za-z ]*$';
	if(obj.value=="" || !obj.value.match(filterEnglish)){
		alert("只能输入西文字符");
		obj.value = "";
	}
}
function validatePhone(value){
	var pattern = /^1[3|4|5|8][0-9]\d{4,8}$/;
 	return pattern.test(value);
}
function validateMail(value){
	var pattern = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
 	return pattern.test(value);
}
function validateNum(value){
	var pattern = /^[0-9]*$/;
 	return pattern.test(value);
}
function validatePassword(value){
	var pattern = /^(\w){6,16}$/;
	return pattern.test(value);
}
function getQueryString(name) { //用于解析网址url参数
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
function searchResult(url,name){
	if($(".searchResult table input[type=checkbox]").is(":checked")){
		if($(".searchResult table input[type=checkbox]:checked").length>1){
			alert("只能勾选一项商标进行信息查看！");
		}else{
			$(".searchResult table input[type=checkbox]").each(function(){
				if($(this).is(":checked")){
					var num =  $(this).next().val();
					var markClass = $(this).parent().next().html();
					document.cookie="MarkNo="+num;
					document.cookie="MarkClass="+markClass;
				}
			})
			closeTab(name);
			handleTab(url,name);
		}
	}else{
		alert("请勾选其中一项商标进行信息查看！");
	}
}
function searchResultImg(url,name){
	if($(".searchResultImg table input[type=checkbox]").is(":checked")){
		if($(".searchResultImg table input[type=checkbox]:checked").length>1){
			alert("只能勾选一项商标进行信息查看！");
		}else{
			$(".searchResultImg table input[type=checkbox]").each(function(){
				if($(this).is(":checked")){
					var num =  $(this).prev().find('span').last().html();
					var markClass = $(this).prev().find('span').first().html();
					console.log(num)
					document.cookie="MarkNo="+num;
					document.cookie="MarkClass="+markClass;
				}
			})
			closeTab(name);
			handleTab(url,name);
		}
	}else{
		alert("请勾选其中一项商标进行信息查看！");
	}
}
function addBtn(obj){
	var value = obj.previousSibling.value;
	if(value>=100){
		obj.previousSibling.setAttribute("disabled","disabled");
		obj.previousSibling.value = 100;
	}else{
		obj.previousSibling.removeAttribute("disabled");
		value++;
		obj.previousSibling.value = value;
	}
}
function minusBtn(obj){
	var value = obj.previousSibling.previousSibling.value;
	if(value<=02){
		obj.previousSibling.previousSibling.setAttribute("disabled","disabled");
		obj.previousSibling.previousSibling.value = 2;
	}else{
		obj.previousSibling.previousSibling.removeAttribute("disabled");
		value--;
		obj.previousSibling.previousSibling.value = value;
	}
}

function removeDuplicate(string){
	var result = new Array();
	var strArr = string.split(',');
	strArr.sort();
	var tempStr = "";
	for(var i=0; i<strArr.length; i++){
		if(strArr[i] != tempStr){
			result.push(strArr[i]);
			tempStr = strArr[i];
		}else{
			continue;
		}
	}
	string = result.join(',')+",";
	string = string.substring(0,string.length-1);
	return string;
}
function sortNumber(a, b){
	return a - b;
}
function removeDuplicateArr(arr){
	var result = new Array();
	var strArr = arr;
	strArr.sort(sortNumber);
	var tempStr = "";
	for(var i=0; i<strArr.length; i++){
		if(strArr[i] != tempStr){
			result.push(strArr[i]);
			tempStr = strArr[i];
		}else{
			continue;
		}
	}
	return result;
}

function removeDuplicateArrS(arr){
	var result = new Array();
	var strArr = arr;
	strArr.sort();
	var tempStr = "";
	for(var i=0; i<strArr.length; i++){
		if(strArr[i] != tempStr){
			result.push(strArr[i]);
			tempStr = strArr[i];
		}else{
			continue;
		}
	}
	return result;
}

function algorithmCheckbox(id){
	if($("#"+id).is(":checked")){
		$(".identifyTable input").removeAttr("checked");
	}
}

function quickSet(){
	$(".identifyTable input").each(function(){
		if($(".identifyTable input").is(":checked")){
			$("#back").attr("checked","checked");
			$("#like").removeAttr("checked");
			$("#save").removeAttr("checked");
		}else{
			$("#back").removeAttr("checked");
			$("#like").removeAttr("checked");
			$("#save").attr("checked","checked");
		}
	})
}

function recordChoose(algorithmVal){
	$(".identifyTable tr").each(function(){
		for(var i=0; i<algorithmVal.length; i++){
			if($(this).find('input').val() == algorithmVal[i]){
				$(this).find('input').attr("checked","checked");
			}
		}
	})
//	$(".quickSet li").each(function(){
//		if($(this).find('input').val() == jueryModeVal){
//			$(this).find('input').attr("checked","checked");
//			$(this).siblings().find('input').removeAttr("checked");
//		}
//	})
}

function sResult(data){
	return data;
}
(function(global) {
	var data = window.data || "";
	var result = sResult(data);
    global.dataResult = result;

}) (this);

function imgCutInit(){
	if($("#uploadImg").val() == ""){
		alert("请选择图片后再进行裁剪！");
		return false;
	}
	
	var cutImg = $('img#imghead').imgAreaSelect({instance:true});
	var cutWidth = $('img#imghead').width()/2;
	var cutHeight = $('img#imghead').height()/2;
	$('#id_left').val(cutWidth-25);
	$('#id_top').val(cutHeight-25);
	$('#id_right').val(cutWidth+25);
	$('#id_bottom').val(cutHeight+25);
	cutImg.setSelection(cutWidth-25, cutHeight-25, cutWidth+25, cutHeight+25, true);
	cutImg.setOptions({ 
		show: true,
		enable:true,
		onSelectEnd:function(img, selection) {
						$('#id_top').val(selection.y1);
						$('#id_left').val(selection.x1);
						$('#id_right').val(selection.x2);
						$('#id_bottom').val(selection.y2);
				}
	});
	cutImg.update(true);
//	$("#uploadImg").val("");
}

function removeCut(){
	var cutImg = $('img#imghead').imgAreaSelect({instance:true});
	$('#id_left').val("");
	$('#id_top').val("");
	$('#id_right').val("");
	$('#id_bottom').val("");
	cutImg.setOptions({
		hide:true,
		disable:true
	});
	cutImg.update(true);
}

function dataStatus(data){
	switch(data.status){
		case 0:
			alert(data.err);
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
			alert("同一设备一分钟内验证次数超过 1 次");
			break;
		case -7:
			alert("手机号码或电子邮箱验证次数超过当天限制");
			break;
	}
}

function cardList(cardArr,seletor){
	var html = "";
	var dateCardlength = Math.floor(cardArr.length/4);
	var sum = 0;
	for(var j=0; j<dateCardlength; j++){
		html += '<tr>';
		for(var i=0; i<4; i++){
			html += '<td><label><div class="card"><p class="cardName">国方卡</p><p class="cardType">（'+cardArr[sum].name+'）</p><p class="cardPrice">￥'+cardArr[sum].price+'</p></div><input type="checkbox" name="qika" class="tabCheckbox rechargeCardChoose" value="'+cardArr[sum].id+'" /></label></td>'
			sum++;
		}
		html += '</tr>';
	}
	if(cardArr.length%4>0){
		html += '<tr>';
		for(var i=0; i<cardArr.length%4; i++){
			html += '<td><label><div class="card"><p class="cardName">国方卡</p><p class="cardType">（'+cardArr[sum].name+'）</p><p class="cardPrice">￥'+cardArr[sum].price+'</p></div><input type="checkbox" name="qika" class="tabCheckbox rechargeCardChoose" value="'+cardArr[sum].id+'" /></label></td>'
			sum++;
		}
		switch (cardArr.length%4){
			case 1:
				html += '<td></td><td></td><td></td>';
				break;
			case 2:
				html += '<td></td><td></td>';
				break;
			case 3:
				html += '<td></td>';
				break;
			default:
				break;
		}
		html += '</tr>';
	}
	$("#"+seletor).append(html);
}

function orderList(){
	var currency;
	var payStatus;
	var sign;
	var fromDate = $("#startTime").val();
	var to = $("#endTime").val();
	if($(".isPaid li").first().hasClass("selected")){
		var orderPayStatus = 0;
	}
	if($(".isPaid li").last().hasClass("selected")){
		var orderPayStatus = 1;
	}
	$("#orderList").html("");
	$.ajax({
		type:"post",
		url:"Handler/orderList.ashx",
		async:false,
		data:{from:fromDate,to:to,payStatus:orderPayStatus,orderType:-1,pageSize:10,page:1,platformType:1,isWeb:1},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				if(dataObj.data.length==0){
					$("#orderList").append('<tr><td colspan="6" align="center">没有订单</td></tr>');
				}
				for(var i=0; i<dataObj.data.length; i++){
					if(dataObj.data[i].currency==1){
						currency = "人民币";
						sign = "￥";
					}
					if(dataObj.data[i].currency==2){
						currency = "美元";
						sign = "$";
					}
					if(dataObj.data[i].payStatus){
						payStatus = "已支付";
					}else{
						payStatus = "未支付";
					}
					$("#orderList").append('<tr onclick=getOrderId('+dataObj.data[i].id+')><td width="40%" class="payCardNameTd" align="center"><span class="payCardName">订单号：'+dataObj.data[i].orderCode+'</span></td><td width="20%" align="center">'+dataObj.data[i].orderTime+'</td><td width="10%" align="center">'+currency+'</td><td width="20%" align="center" style="color: #f00;">'+sign+''+dataObj.data[i].sumPrice+'</td><td width="10%" align="center">'+payStatus+'</td></tr>')
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
}

function taskIDAjax(validMethod,searchloading){
	var TaskID = getCookie("TaskID");
	$.ajax({
		type:"post",
		url:"Handler/getSearchResultByTaskID.ashx",
		data:{platformType:1,isWeb:1,TaskID:TaskID,SortType:"",BeginRow:1,EndRow:16},
		async:false,
		complete:function(){
			isBreak = true;
		},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				window.data = dataObj.data;
				validMethodFunc(validMethod,searchloading)
			}else{
				dataStatus(dataObj);
				layer.close(searchloading);
			}
		}
	});
}

function validMethodFunc(validMethod,searchloading){
	var TaskID = getCookie("TaskID");
	if(validMethod==0){
		layer.prompt({
		  formType: 1,
		  title: '输入您的验证密码',
		  cancel:function(){
				layer.close(searchloading);
		  },
		  btn2:function(){
				layer.close(searchloading);
		  }
		}, function(value, index, elem){
			$.ajax({
				type:"post",
				url:"Handler/taskPay.ashx",
				async:false,
				data:{platformType:1,isWeb:1,taskID:TaskID,validCode:$.md5(value)},
				success:function(data){
					var dataTaskPay = eval("("+data+")");
					if(dataTaskPay.status==1){
						layer.close(searchloading);
						layer.close(index);
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
						layer.close(searchloading);
					}
				}
			});
		});
	}
	if(validMethod==1){
		layer.close(searchloading);
		handleLayer('请输入支付验证码','sbsb-yzmzf.html','500px','380px');
	}
	if(validMethod==2){
		$.ajax({
			type:"post",
			url:"Handler/taskPay.ashx",
			async:false,
			data:{platformType:1,isWeb:1,taskID:TaskID,validCode:""},
			success:function(data){
				var dataTaskPay = eval("("+data+")");
				if(dataTaskPay.status==1){
					layer.close(searchloading);
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
					layer.close(searchloading);
				}
			}
		});
	}
}
//if (!window.console || !console.firebug){
//  var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
//
//  window.console = {};
//  for (var i = 0; i < names.length; ++i)
//      window.console[names[i]] = function() {}
//}