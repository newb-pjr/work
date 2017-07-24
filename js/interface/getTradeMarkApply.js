$(document).ready(function(){
		var id = getCookie("modifyApplyId");
		$.post('Handler/getTradeMarkApply.ashx',{isWeb:1,platformType:1,id:id},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status == 1){
				$("#chineseName").val(dataObj.data.applyChinese);
				$("#englishName").val(dataObj.data.applyEnglish);
				$("#applyArea").val(dataObj.data.applyArea);
				$("#chineseAddress").val(dataObj.data.addressChinese);
				$("#englishAddress").val(dataObj.data.addressEnglish);
				$("#zipcode").val(dataObj.data.zipcode);
				$("#contact").val(dataObj.data.contact);
				$("#foreignContact").val(dataObj.data.foreignContact);
				$("#foreignAddress").val(dataObj.data.foreignAddress);
				$("#foreignZipcode").val(dataObj.data.foreignZipcode);
				$("#storeName").val(dataObj.data.storeName);
				if(dataObj.data.group){
					$("#team").attr("checked","checked");
					$("#prove").removeAttr("checked");
				}else{
					$("#prove").attr("checked","checked");
					$("#team").removeAttr("checked");
				}
				if(dataObj.data.threeD){
					$("#threeD").attr("checked","checked");
				}else{
					$("#threeD").removeAttr("checked");
				}
				if(dataObj.data.color){
					$("#color").attr("checked","checked");
				}else{
					$("#color").removeAttr("checked");
				}
				if(dataObj.data.sound){
					$("#sound").attr("checked","checked");
				}else{
					$("#sound").removeAttr("checked");
				}
				if(dataObj.data.twoAndAbove){
					$("#common").attr("checked","checked");
				}else{
					$("#common").removeAttr("checked");
				}
				if(dataObj.data.first){
					$("#first").attr("checked","checked");
					$("#exhibition").removeAttr("checked");
				}else{
					$("#exhibition").attr("checked","checked");
					$("#first").removeAttr("checked");
				}
				if(dataObj.data.after){
					$("#waiting").attr("checked","checked");
				}else{
					$("#waiting").removeAttr("checked");
				}
				$("#area").val(dataObj.data.area);
				$("#applyDate").val(dataObj.data.applyDate);
				$("#applyCode").val(dataObj.data.applyCode);
				$("#applyImg").attr("src",dataObj.data.tradeMarkPicture);
				$("#describe").val(dataObj.data.describe);
				document.cookie = "type="+dataObj.data.tradeMarkType;
				document.cookie = "serviceCode="+dataObj.data.tradeMarkService;
				if(dataObj.data.applyType == 1){
					document.cookie = "applyType="+1;
				}else{	
					document.cookie = "applyType="+2;
				}
				if(dataObj.data.translate){
					document.cookie = "translate="+1;
				}else{
					document.cookie = "translate="+0;
				}
				if(dataObj.data.translatePayType == 1){
					document.cookie = "translatePayType="+1;
				}else{
					document.cookie = "translatePayType="+2;
				}
				document.cookie = "translatePrice="+dataObj.data.translatePrice;
				if(dataObj.data.geography){
					document.cookie = "geography="+1
				}else{
					document.cookie = "geography="+0
				}
				document.cookie = "memberList="+dataObj.data.memberList;
				document.cookie = "memberRule="+dataObj.data.memberRule;
				if(dataObj.data.memberFile != ""){
					document.cookie = "memberFile="+dataObj.data.memberFile;	
				}
				if(dataObj.data.priorityFile != ""){
					document.cookie = "priorityFile="+dataObj.data.priorityFile;
				}
				var content = "";
				for(var i=0; i<dataObj.data.addtional.length; i++){
					content += dataObj.data.addtional[i].addressChinese+"`"+dataObj.data.addtional[i].addressEnglish+"`"+dataObj.data.addtional[i].applyChinese+"`"+dataObj.data.addtional[i].applyEnglish+"`"+dataObj.data.addtional[i].area+"^";
				}
				document.cookie = "addApplicant="+content;
				console.log(dataObj.data.file)
			}
		})
	
})
