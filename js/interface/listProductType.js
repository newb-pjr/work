$(document).ready(function(){
	$.post('Handler/listProductType.ashx',{pageSize:0,page:0},function(data){
		var dataObj = eval("("+data+")");
		if(dataObj.status == 1){
			for(var i=0; i<dataObj.data.length; i++){
				$("#classSelect").append('<option value="'+dataObj.data[i].code+'">'+dataObj.data[i].code+'</option>');
			}
		}else{
			alert(dataObj.err);
		}
	})
})
