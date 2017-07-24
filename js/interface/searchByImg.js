$(document).ready(function(){
	$(".sureBtn").click(function(){
		var TaskID = Date.parse(new Date())/1000;
		var FrontCount = 16;
		var QueryMode = $(".qureySelect").val();
		var SrcImgID = getCookie("SrcImgID");
		var mainImg = getCookie("cutImgUrl").substring(getCookie("cutImgUrl").lastIndexOf('/')+1);
		var chooseImg = getCookie("chooseImg").split(",");
		var finishImg = getCookie("finishImg").split(",");
		var chooseImgFileName = [];
		var finishImgFileName = [];
		for(var i=0; i<chooseImg.length; i++){
			chooseImgFileName.push(chooseImg[i].substring(chooseImg[i].lastIndexOf('/')+1));
		}
		chooseImg = chooseImgFileName.join();
		for(var i=0; i<finishImg.length; i++){
			finishImgFileName.push(finishImg[i].substring(finishImg[i].lastIndexOf('/')+1));
		}
		finishImg = finishImgFileName.join();
		if($("#assemble").html() == ""){
			var ImgIDs = mainImg+","+chooseImg;
		}else{
			var ImgIDs = mainImg+","+finishImg+","+chooseImg;
		}
		ImgIDs = ImgIDs.split(",").join(";");
		var CnContent = $("#searchAllChinese").val();
		var EnContent = $("#searchAllEnglish").val();
		var ImageCode = $("#searchAllContText").val();
		var MarkClass = $("#serviceClass").val();
		if($("#groupNameText").val() != ""){
			var MarkGroup = $("#groupNameText").val();
		}else{
			var MarkGroup = $("#proNameText").val();
		}
		var ImageQueryMode = $("#imageQueryMode").val();
		var ImageAlgorithm = $("#imageAlgorithm").val();
		var CnQueryMode = $("#cnQueryMode").val();
		var CnAlgorithm = $("#cnAlgorithm").val();
		var EnQueryMode = $("#enQueryMode").val();
		var EnAlgorithm = $("#enAlgorithm").val();
		var CodeQueryMode = $("#codeQueryMode").val();
		var CodeAlgorithm = $("#codeAlgorithm").val();
		var State = $(".tabSearch tr td input[name='status']").val();
		var DateType = $("#selectDateType").val();
		if(DateType == 0){
			var BeginDate = "";
			var EndDate = "";
		}else{
			if($("#dateInput").val() == ""){
				alert("日期范围不能为空！");
				return false;
			}else{
				var BeginDate = dateSelect($("#dateInput").val())[0];
				var EndDate = dateSelect($("#dateInput").val())[1];
			}
		}
		$.ajax({
			type:"post",
			url:"Handler/searchByImg.ashx",
			data:{
					platformType:1,
					isWeb:1,
					TaskID:TaskID,
					FrontCount:FrontCount,
					QueryMode:QueryMode,
					SrcImgID:SrcImgID,
					ImgIDs:ImgIDs,
					CnContent:CnContent,
					EnContent:EnContent,
					ImageCode:ImageCode,
					MarkClass:MarkClass,
					MarkGroup:MarkGroup,
					ImageQueryMode:ImageQueryMode,
					ImageAlgorithm:ImageAlgorithm,
					CnQueryMode:CnQueryMode,
					CnAlgorithm:CnAlgorithm,
					EnQueryMode:EnQueryMode,
					EnAlgorithm:EnAlgorithm,
					CodeQueryMode:CodeQueryMode,
					CodeAlgorithm:CodeAlgorithm,
					State:State,
					DateType:DateType,
					BeginDate:BeginDate,
					EndDate:EndDate
			},
			async:true,
			success:function(data){
				if(data.status == 1){
					console.log(data.data.TaskID);
					document.cookie = "taskId="+data.data.TaskID;
					handleTab('sbsb-cxjg.html','查询结果');
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
				}
			}
		});
	})
})
