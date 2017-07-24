$(document).ready(function(){
	var Url = $(".imgframe img").attr("src");
	var Urls = "";
	for(var i=0;i<$("#assemble li").length;i++){
		Urls += $("#assemble li").eq(i).find("img").attr("src")+";";
	}
	if(var Urls == ""){
		alert("请分拆子图再进行识别操作！");
		return false;
	}
	var MarkLogUrls = getCookie("sameImg");
	if(!MarkLogUrls){
		alert("请选择近似图样再进行识别操作！");
	}
	var CnContent = $("#searchChineseInput").val();
	var EnContent = $("#searchEnglishInput").val();
	var ImageCode = $("#searchContText").val();
	if(CnContent == "" || EnContent == "" || ImageCode ==""){
		alert("请添加识别查询内容再进行识别操作！");
		return false;
	}
	var MarkClass = $("#serviceClass").val();
	if($("#groupNameText").val() == ""){
		var MarkGroup = $("#proNameText").val();
	}else{
		var MarkGroup = $("#groupNameText").val();
	}
	if(MarkClass == "" && MarkGroup == ""){
		alert("请选择查询的商品服务范围再进行识别操作！");
	}
	//if(CnContent)
	var dateSelectValue = $("#dateSelect").val();
		if($("#dateInput").val() == 0){
			BeginDate = "";
			EndDate = "";
		}else{
			if(dateSelectValue == ""){
				alert("日期范围不能为空！");
				return false;
			}else{
				dateSelect(dateSelectValue);
			}
		}
	$.post('Handler/searchTradeMark.ashx',{platformType:1,isWeb:1,Url:Url,Urls:Urls,MarkLogUrls:MarkLogUrls,CnContent:CnContent,EnContent:EnContent,ImageCode:ImageCode,MarkClass:MarkClass,MarkGroup:MarkGroup,CnQueryMode:CnQueryMode})
})
