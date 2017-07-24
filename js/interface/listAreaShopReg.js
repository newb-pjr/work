$(document).ready(function(){
	$.post('Handler/listArea.ashx',{code:"",parentID:0},function(data){
		var dataObj = eval("("+data+")");
		if(dataObj.status == 1){
			for(var i=0; i<dataObj.data.length; i++){
				$("#chooseArea").append('<option value="'+dataObj.data[i].id+'">'+dataObj.data[i].name+'</option>');
			}
		}
	})
	
	$("#chooseArea").change(function(){
		var parentID = $(this).val();
		if(parentID == ""){
			$("#shopListCity").html("<option value=''>请选择</option>");
			return false;
		}
		$.post('Handler/listArea.ashx',{parentID:parentID},function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status == 1){
				for(var i=0; i<dataObj.data.length; i++){
					$("#chooseAreaCity").append('<option value="'+dataObj.data[i].code+'">'+dataObj.data[i].name+'</option>');
				}
			}
		})
	})
})
