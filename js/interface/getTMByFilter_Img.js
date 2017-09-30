$(document).ready(function(){
	$("#imgFilterBtn").click(function(){
		var TaskID = getCookie("TaskID");
		var State;
		if($(".filterCont input[name='select']").val()==""){
			var MarkKeyStr = ""
		}else{
			var MarkKeyStr = getCookie("MarkKeyStr").replace(/,/g,';');
		}
		var MarkGroup = $("#markGroupInput").val();
		$(".filterCont input[name='status']").each(function(){
			if($(this).is(":checked")){
				State = $(this).val()+"";
			}
		})
		$.ajax({
			type:"post",
			url:"Handler/getTMByFilter.ashx",
			async:true,
			data:{platformType:1,isWeb:1,TaskID:TaskID,State:State,MarkKeyStr:MarkKeyStr,MarkGroup:MarkGroup},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					parent.$(".searchResultImg").html("");
					var s = Math.floor(dataObj.data.Result.length/6);
					str = '';
					str += '<table border="1" bordercolor="#C6C4C4" align="center" width="100%">';
					d = 0;
					for(var i=0;i<s;i++){
						str += '<tr>';
						for(var j=0;j<6;j++){
							std = '<td><label><img src="'+dataObj.data.Result[d].MarkImagePath+'" /><p><span>'+dataObj.data.Result[d].MarkClass+'</span>类 <span>'+dataObj.data.Result[d].MarkNo+'</span></p><input type="checkbox" /></lable></td>' 
							d++;
							str += std;
						}
						str += '</tr>';
					}
					if(dataObj.data.Result.length%6 > 0){
						str += '<tr>';
						for(var k=0;k<dataObj.data.Result.length%6;k++){
							std = '<td><label><img src="'+dataObj.data.Result[d].MarkImagePath+'" /><p><span>'+dataObj.data.Result[d].MarkClass+'</span>类 <span>'+dataObj.data.Result[d].MarkNo+'</span></p><input type="checkbox" /></lable></td>' 
							d++;
							str += std;
						}
						switch (dataObj.data.Result.length%6){
							case 1:
								str += '<td></td><td></td><td></td><td></td><td></td>';
								break;
							case 2:
								str += '<td></td><td></td><td></td><td></td>';
								break;
							case 3:
								str += '<td></td><td></td><td></td>';
								break;
							case 4:
								str += '<td></td><td></td>';
								break;
							case 5:
								str += '<td></td>';
								break;
							default:
								break;
						}
						str += '</tr>';
					}
					str += '</table>';
					parent.$(".searchResultImg").prepend(str);
					
					parent.$("#searchImgPagination").remove();
					window.parent.mainGoBack();
					document.cookie = "MarkKeyStr=";
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})