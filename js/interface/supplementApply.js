$(document).ready(function(){
	if(getCookie("applyType") == 1){
		$(".applicantsType option").eq(0).attr("selected","selected").siblings().removeAttr("selected");
	}
	if(getCookie("applyType") == 2){
		$(".applicantsType option").eq(1).attr("selected","selected").siblings().removeAttr("selected");
	}
	if(getCookie("translate") == 1){
		$("input[name='choose']").eq(0).attr("checked","checked").siblings().removeAttr("checked");
	}
	if(getCookie("translate") == 0){
		$("input[name='choose']").eq(1).attr("checked","checked").siblings().removeAttr("checked");
	}
	if(getCookie("translatePayType") == 1){
		$(".currency option").eq(0).attr("selected","selected").siblings().removeAttr("selected");
	}
	if(getCookie("translatePayType") == 2){
		$(".currency option").eq(1).attr("selected","selected").siblings().removeAttr("selected");
	}
	$(".money").val(getCookie("translatePrice"));
	if(getCookie("geography") == 1){
		$("#geography").attr("checked","checked");
	}
	if(getCookie("geography") == 1){
		$("#geography").attr("checked","checked");
	}
	if(getCookie("geography") ==0){
		$("#geography").removeAttr("checked");
	}
	$("#memberList").val(getCookie("memberList"));
	$("#memberRule").val(getCookie("memberRule"));
	$("#memberFileText").val(getCookie("memberFile"));
	$("#priorityFileText").val(getCookie("priorityFile"));
	$("#saveSupplement").click(function(){
		document.cookie = "applyType="+$(".applicantsType").val();
		document.cookie = "translate="+$("input[name='choose']:checked").val();
		document.cookie = "translatePayType="+$(".currency").val();
		if($(".money").val() == ""){
			alert("金额不能为空！");
			return false;
		}else{
			document.cookie = "translatePrice="+$(".money").val();	
		}
		if($("#geography").is(":checked")){
			document.cookie = "geography="+1;
		}else{
			document.cookie = "geography="+0;
		}
		if($("#memberList").val() == ""){
			alert("集成员名单不能为空！")
			return false;
		}else{
			document.cookie = "memberList="+$("#memberList").val();
		}
		if($("#memberRule").val() == ""){
			alert("集体/证明商标使用管理规则不能为空！");
			return false;
		}else{
			document.cookie = "memberRule="+$("#memberRule").val();	
		}
		if(document.cookie.indexOf("memberFile=") == -1){
			alert("请上传集体/证明商标相关文件！");
			return false;
		}
		if(document.cookie.indexOf("priorityFile=") == -1){
			alert("优先权证明文件！");
			return false;
		}
		alert("附加页保存成功！")
	})
})
