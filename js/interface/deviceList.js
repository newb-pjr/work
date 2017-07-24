$(document).ready(function(){
	$.ajax({
		type:"post",
		url:"Handler/deviceList.ashx",
		async:false,
		data:{platformType:1,isWeb:1},
		success: function(data){
			var dataObj = eval("("+data+")");
			var isAuthorize;
			if(dataObj.status == 1){
				if(dataObj.data.length != 0){
					$(".deviceCont tr").last().hide();
					for(var i=0; i<dataObj.data.length; i++){
						if(dataObj.data[i].isAuthorize){
							isAuthorize = '已授权';
						}else{
							isAuthorize = '未授权';
						}
						$(".deviceCont").append('<tr><td><input type="checkbox" class="tabCheckbox" /><input type="hidden" value="'+dataObj.data[i].id+'" /></td><td>'+isAuthorize+'</td><td><input type="text" value="'+dataObj.data[i].remark+'" disabled /></td></tr>');
					}
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
})
