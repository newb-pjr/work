$(document).ready(function(){
	$("#filterBtn").click(function(){
		var TaskID = getCookie("TaskID");
		var State = "";
		var MarkKeyStr;
		$(".filterCont input[name='select']").each(function(){
			if($(this).is(":checked")){
				if($(this).val()==""){
					MarkKeyStr = ""
				}else{
					MarkKeyStr = getCookie("MarkKeyStr").replace(/,/g,';');
				}
			}
		})
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
					var html = parent.$(".searchResult table tbody tr").first().html();
					parent.$(".searchResult table").html("");
					parent.$(".searchResult table").append('<tr>'+html+'</tr>');
					for(item in dataObj.data.Result){
						parent.$(".searchResult table").append('<tr><td><input type="checkbox" class="tabCheckbox" /><input type="hidden" value="'+dataObj.data.Result[item].MarkNo+'" /></td><td>'+dataObj.data.Result[item].MarkClass+'</td><td>'+dataObj.data.Result[item].MarkNo+'</td><td><img src="'+dataObj.data.Result[item].MarkImagePath+'" height="32" width="96" /></td><td>'+dataObj.data.Result[item].HolderNameCn+'</td><td>'+dataObj.data.Result[item].ApplicationDate+'</td><td>'+dataObj.data.Result[item].RegisterPublishDate+'</td><td>'+dataObj.data.Result[item].IsValid+'</td></tr>');
					}
					parent.$(".closeDet").height(parent.$(".searchResult table").height());
					parent.$("#searchPagination").remove();
					window.parent.mainGoBack();
					document.cookie = "MarkKeyStr=";
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})