$(document).ready(function(){
	$(".applyUpload").click(function(){
		var formData = new FormData($("#applyImgForm")[0]);
		formData.append("platformType",1);
		formData.append("isWeb",1);
		formData.append("needCut",0);
		$.ajax({
			type:"post",
			url:"Handler/upfile.ashx",
			data:formData,
			processData:false,
			contentType:false,
			success:function(data){
				var dataObj = data;
				if(dataObj.status == 1){
					alert("上传成功！");
					$("#applyImg").attr("src",dataObj.url);
				}else{
					alert(dataObj.err);
				}
			}
		})
	})
})