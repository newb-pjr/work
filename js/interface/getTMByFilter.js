$(document).ready(function(){
	$("#filterBtn").click(function(){
		var TaskID = getCookie("TaskID");
		var State;
		var MarkKeyStr = getCookie("MarkKeyStr").replace(/,/g,';');
		var MarkGroup;
		$(".filterCont input[name='product']").each(function(){
			if($(this).is(":checked")){
				if($(this).val()==0){
					MarkGroup = "";
				}
				if($(this).val()==1){
					MarkGroup = $("#markGroupInput").val();
				}
			}
		})
		$(".filterCont input[name='status']").each(function(){
			if($(this).is(":checked")){
				State = $(this).val();
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
						if(dataObj.data.Result[item].IsValid == 0){
							isValid = "无效";
						}else{
							isValid = "有效";
						}
						parent.$(".searchResult table").append('<tr><td><input type="checkbox" class="tabCheckbox" /><input type="hidden" value="'+dataObj.data.Result[item].MarkNo+'" /></td><td>'+dataObj.data.Result[item].MarkClass+'</td><td>'+dataObj.data.Result[item].MarkNo+'</td><td><img src="'+dataObj.data.Result[item].MarkImagePath+'" height="32" width="96" /></td><td>'+dataObj.data.Result[item].HolderNameCn+'</td><td>'+dataObj.data.Result[item].ApplicationDate+'</td><td>'+dataObj.data.Result[item].PreliminaryPublishDate+'</td><td>'+dataObj.data.Result[item].RegisterPublishDate+'</td><td>'+isValid+'</td></tr>');
					}
					parent.$(".closeDet").height(parent.$(".searchResult table").height());
					parent.$("#searchPagination").remove();
					window.parent.mainGoBack();
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})