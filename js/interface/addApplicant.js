$(document).ready(function(){
	$("#addApplicant").click(function(){
		$("#addApplicantMain").append('<div><table border="0" class="applyTable"><tr><td>申请人名称（中文）：</td><td><input class="applyText" type="text" /><strong style="color: red;">*</strong></td></tr><tr><td>申请人名称（英文）：</td><td><input class="applyText" type="text" /></td></tr><tr><td>申请人国籍/地区：</td><td><input class="applyText" type="text" /><strong style="color: red;">*</strong></td></tr><tr><td>申请人地址（中文）：</td><td><input class="applyText" type="text" /><strong style="color: red;">*</strong></td></tr><tr><td>申请人地址（英文）：</td><td><input class="applyText" type="text" /></td></tr></table><div class="tabBtn" style="margin-top: 30px;margin-bottom: 30px;width: 215px;"><a href="javascript:void(0)" class="delApplicant">删除</a></div><hr style="margin-bottom: 25px;" /></div>');
	})
	
	$(".delApplicant").live('click',function(){
		$(this).parent().parent().remove();
	})
	
	$("#sureApplicant").click(function(){
		var content = "";
		for(var i=0; i<$("#addApplicantMain table").length; i++){
			if($("#addApplicantMain table").eq(i).find('tr').eq(0).find('input').val() == ""){
				alert("申请人名称（中文）不能为空！");
				return false;
			}else{
				var values = $("#addApplicantMain table").eq(i).find('tr').eq(0).find('input').val();
				$("#addApplicantMain table").eq(i).find('tr').eq(0).find('input').val(values.replace(/`|\^/g,""));
			}
			var values = $("#addApplicantMain table").eq(i).find('tr').eq(1).find('input').val();
			$("#addApplicantMain table").eq(i).find('tr').eq(1).find('input').val(values.replace(/`|\^/g,""));
			if($("#addApplicantMain table").eq(i).find('tr').eq(2).find('input').val() == ""){
				alert("申请人国籍/地区不能为空！");
				return false;
			}else{
				var values = $("#addApplicantMain table").eq(i).find('tr').eq(2).find('input').val();
				$("#addApplicantMain table").eq(i).find('tr').eq(2).find('input').val(values.replace(/`|\^/g,""));
			}
			if($("#addApplicantMain table").eq(i).find('tr').eq(3).find('input').val() == ""){
				alert("申请人地址（中文）不能为空！");
				return false;
			}else{
				var values = $("#addApplicantMain table").eq(i).find('tr').eq(3).find('input').val();
				$("#addApplicantMain table").eq(i).find('tr').eq(3).find('input').val(values.replace(/`|\^/g,""));
			}
			var values = $("#addApplicantMain table").eq(i).find('tr').eq(4).find('input').val();
			$("#addApplicantMain table").eq(i).find('tr').eq(4).find('input').val(values.replace(/`|\^/g,""));
			var chineseName = $("#addApplicantMain table").eq(i).find('tr').eq(0).find('input').val();
			var englishName = $("#addApplicantMain table").eq(i).find('tr').eq(1).find('input').val();
			var applyArea = $("#addApplicantMain table").eq(i).find('tr').eq(2).find('input').val();
			var chineseAddress = $("#addApplicantMain table").eq(i).find('tr').eq(3).find('input').val();
			var englishAddress = $("#addApplicantMain table").eq(i).find('tr').eq(4).find('input').val();
			content += chineseName+"`"+englishName+"`"+applyArea+"`"+chineseAddress+"`"+englishAddress+"^";
		}
		console.log(content)
		document.cookie = "addApplicant="+content;
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
		parent.layer.close(index);
	})
	if(document.cookie.indexOf("addApplicant=") != -1){
		var getAdd = getCookie("addApplicant");
		getAdd = getAdd.substring(0,getAdd.length-1);
		var arrAddApplicants = getAdd.split("^");
		for(var i=1; i<arrAddApplicants.length; i++){
			$("#addApplicantMain").append('<div><table border="0" class="applyTable"><tr><td>申请人名称（中文）：</td><td><input class="applyText" type="text" /><strong style="color: red;">*</strong></td></tr><tr><td>申请人名称（英文）：</td><td><input class="applyText" type="text" /></td></tr><tr><td>申请人国籍/地区：</td><td><input class="applyText" type="text" /><strong style="color: red;">*</strong></td></tr><tr><td>申请人地址（中文）：</td><td><input class="applyText" type="text" /><strong style="color: red;">*</strong></td></tr><tr><td>申请人地址（英文）：</td><td><input class="applyText" type="text" /></td></tr></table><div class="tabBtn" style="margin-top: 30px;margin-bottom: 30px;width: 215px;"><a href="javascript:void(0)" class="delApplicant">删除</a></div><hr style="margin-bottom: 25px;" /></div>');
		}
		for(var j=0; j<arrAddApplicants.length; j++){
			var arrAddApplicant = arrAddApplicants[j].split("`");
			$("#addApplicantMain table").eq(j).find('tr').eq(0).find('input').val(arrAddApplicant[0]);
			$("#addApplicantMain table").eq(j).find('tr').eq(1).find('input').val(arrAddApplicant[1]);
			$("#addApplicantMain table").eq(j).find('tr').eq(2).find('input').val(arrAddApplicant[2]);
			$("#addApplicantMain table").eq(j).find('tr').eq(3).find('input').val(arrAddApplicant[3]);
			$("#addApplicantMain table").eq(j).find('tr').eq(4).find('input').val(arrAddApplicant[4]);
		}
	}
})