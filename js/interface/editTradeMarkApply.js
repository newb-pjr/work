$(document).ready(function(){
	$("#saveApply").click(function(){
		var storeID = getCookie("shopId");
		var applyChinese = $("#chineseName").val();
		if(applyChinese == ""){
			alert("申请人中文名称不能为空！");
			return false;
		}
		var applyEnglish = $("#englishName").val();
		var applyArea = $("#applyArea").val();
		if(applyArea == ""){
			alert("申请人国籍不能为空！");
			return false;
		}
		var addressChinese = $("#chineseAddress").val();
		if(addressChinese == ""){
			alert("申请人中文地址不能为空！");
			return false;
		}
		var addressEnglish = $("#englishAddress").val();
		var zipcode = $("#zipcode").val();
		var contact = $("#contact").val();
		var foreignContact = $("#foreignContact").val();
		var foreignAddress = $("#foreignAddress").val();
		var foreignZipcode = $("#foreignZipcode").val();
		if($("#team").is(":checked")){
			var group = 1;
		}else{
			var group = 0;
		}
		if($("#prove").is(":checked")){
			var proof = 1;
		}else{
			var proof = 0;
		}
		if($("#threeD").is(":checked")){
			var threeD = 1;
		}else{
			var threeD = 0;
		}
		if($("#color").is(":checked")){
			var color = 1;
		}else{
			var color = 0;
		}
		if($("#sound").is(":checked")){
			var sound = 1;
		}else{
			var sound = 0;
		}
		if($("#common").is(":checked")){
			var twoAndAbove = 1;
		}else{
			var twoAndAbove = 0;
		}
		if($("#first").is(":checked")){
			var first = 1;
		}else{
			var first = 0;
		}
		if($("#exhibition").is(":checked")){
			var exiintion = 1;
		}else{
			var exiintion = 0;
		}
		if($("#waiting").is(":checked")){
			var after = 1;
		}else{
			var after = 0;
		}
		var area = $("#area").val();
		var applyDate = $("#applyDate").val();
		var applyCode =$("#applyCode").val();
		var tradeMarkPicture = $("#applyImg").attr("src");
		var describe = $("#describe").val();
		var tradeMarkType = getCookie("type");
		var tradeMarkService = getCookie("serviceID");
		if(!tradeMarkType || !tradeMarkService){
			alert("请选择商品服务在进行操作！");
			return false;
		}
		var tradeMarkWords = $(".includeChinese").val();
		var feedback = $("#feedback").val();
		if(document.cookie.indexOf("addApplicant=") == -1){
			var addtional = "";
		}else{
			var addtional = getCookie("addApplicant");
		}
		var applyType = getCookie("applyType");
		var translate =getCookie("translate");
		var translatePayType = getCookie("translatePayType");
		var translatePrice = getCookie("translatePrice");
		var geography = getCookie("geography");
		var memberList = getCookie("memberList");
		var memberRule = getCookie("memberRule");
		var memberFile = getCookie("memberFile");
		var priorityFile = getCookie("priorityFile");
		$.post('Handler/editTradeMarkApply.ashx',{action:"add",storeID:storeID,code:"",applyChinese:applyChinese,applyEnglish:applyEnglish,applyArea:applyArea,addressChinese:addressChinese,addressEnglish:addressEnglish,zipcode:zipcode,contact:contact,foreignContact:foreignContact,foreignAddress:foreignAddress,foreignZipcode:foreignZipcode,group:group,proof:proof,threeD:threeD,color:color,sound:sound,twoAndAbove:twoAndAbove,first:first,exiintion:exiintion,after:after,area:area,applyDate:applyDate,applyCode:applyCode,tradeMarkPicture:tradeMarkPicture,describe:describe,tradeMarkType:tradeMarkType,tradeMarkService:tradeMarkService,tradeMarkWords:tradeMarkWords,feedback:feedback,addtional:addtional,applyType:applyType,translate:translate,translatePayType:translatePayType,translatePrice:translatePrice,geography:geography,memberList:memberList,memberRule:memberRule,memberFile:memberFile,priorityFile:priorityFile,platformType:1,isWeb:1},function(data){
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
					case -6:
						alert("非机构用户");
						break;
				}
			}else{
//				document.cookie = "applyId="+dataObj.id;
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
				parent.layer.close(index);
			}
		})
	})
})
