$(document).ready(function(){
	$("#uploadFile").click(function(){
		var formData = new FormData($("#uploadForm")[0]);
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
					$(".openFile").attr("href",dataObj.url);
				}else{
					alert(dataObj.err);
				}
			}
		});
//		$.post('Handler/upfile.ashx',{platformType:1,isWeb:1,needCut:0},function(data){
//			var dataObj = data;
//			console.log(dataObj);
//			if(dataObj.status == 1){
//				alert("上传成功！");
//			}else{
//				alert(dataObj.err);
//			}
//		})
	})
})
