$(document).ready(function(){
//	var TaskID = getCookie("taskId");
//	$.post(url+'Handler/getSearchResultByTaskID.ashx',{platformType:1,isWeb:1,TaskID:TaskID,SortType:"",BeginRow:1,EndRow:10},function(data){
//		var dataObj = eval("("+data+")");
//		console.log(dataObj);
//		for(item in dataObj.data.Result){
//			$(".searchResult table").append('<tr><td><input type="checkbox" class="tabCheckbox" /><input type="hidden" value="'+dataObj.data.Result[item].MarkNo+'" /></td><td>'+dataObj.data.Result[item].MarkClass+'</td><td>'+dataObj.data.Result[item].MarkNo+'</td><td><img src="'+dataObj.data.Result[item].MarkImagePath+'" height="32" width="96" /></td><td>'+dataObj.data.Result[item].HolderNameCn+'</td><td>'+dataObj.data.Result[item].ApplicationDate+'</td><td>'+dataObj.data.Result[item].PreliminaryPublishDate+'</td><td>'+dataObj.data.Result[item].RegisterDate+'</td><td>'+dataObj.data.Result[item].MarkState+'</td></tr>');
//		}
//		// 创建分页元素
//		$("#Pagination").pagination(dataObj.count, {
//			num_edge_entries: 2,
//			num_display_entries: 5,
//			items_per_page: 10,
//			prev_text: "上一页",
//			next_text: "下一页",
//			callback: pageselectCallback
//		});
//	})
//	$.ajax({
//		type:"post",
//		url:"Handler/getSearchResultByTaskID.ashx",
//		data:{platformType:1,isWeb:1,TaskID:TaskID,SortType:"",BeginRow:1,EndRow:10},
//		async:true,
//		success:function(data){
//			var dataObj = eval("("+data+")");
//			for(item in dataObj.data.Result){
//				$(".searchResult table").append('<tr><td><input type="checkbox" class="tabCheckbox" /><input type="hidden" value="'+dataObj.data.Result[item].MarkNo+'" /></td><td>'+dataObj.data.Result[item].MarkClass+'</td><td>'+dataObj.data.Result[item].MarkNo+'</td><td><img src="'+dataObj.data.Result[item].MarkImagePath+'" height="32" width="96" /></td><td>'+dataObj.data.Result[item].HolderNameCn+'</td><td>'+dataObj.data.Result[item].ApplicationDate+'</td><td>'+dataObj.data.Result[item].PreliminaryPublishDate+'</td><td>'+dataObj.data.Result[item].RegisterDate+'</td><td>'+dataObj.data.Result[item].MarkState+'</td></tr>');
//			}
//			// 创建分页元素
//			$("#Pagination").pagination(dataObj.data.iCount, {
//				num_edge_entries: 2,
//				num_display_entries: 5,
//				items_per_page: 10,
//				prev_text: "上一页",
//				next_text: "下一页",
//				callback: pageselectCallback
//			});
//		}
//	});
	var isValid;
	for(var i=0; i<dataResult.Result.length; i++){
		if(dataResult.Result[i].IsValid == 0){
			isValid = "无效";
		}else{
			isValid = "有效";
		}
		$(".searchResult table").append('<tr><td><input type="checkbox" class="tabCheckbox" /><input type="hidden" value="'+dataResult.Result[i].MarkNo+'" /></td><td>'+dataResult.Result[i].MarkClass+'</td><td>'+dataResult.Result[i].MarkNo+'</td><td><img src="'+dataResult.Result[i].MarkImagePath+'" height="32" width="96" /></td><td>'+dataResult.Result[i].HolderNameCn+'</td><td>'+dataResult.Result[i].ApplicationDate+'</td><td>'+dataResult.Result[i].PreliminaryPublishDate+'</td><td>'+dataResult.Result[i].RegisterPublishDate+'</td><td>'+isValid+'</td></tr>');
	}
	// 创建分页元素
	$("#searchPagination").pagination(dataResult.iCount, {
		num_edge_entries: 2,
		num_display_entries: 5,
		items_per_page: 16,
		prev_text: "上一页",
		next_text: "下一页",
		callback: pageselectCallback
	});
})

	

function pageselectCallback(page_id){
	if(getCookie("MarkKeyStr")){
		var MarkKeyStr = getCookie("MarkKeyStr").split(";");
	}else{
		var MarkKeyStr = []
	}
	$(".searchResult table input[type=checkbox]").each(function(){
		if($(this).is(":checked")){
			MarkKeyStr.push($(this).parent().next().html()+"_"+$(this).siblings().val());
		}
	})
	MarkKeyStr = removeDuplicateArrS(MarkKeyStr);
	document.cookie = "MarkKeyStr="+MarkKeyStr.join(",");
	
	var TaskID = getCookie("TaskID");
	var html = $(".searchResult table tbody tr").first().html();
	var SortType = getCookie("SortType");
	var BeginRow = page_id*16+1;
	var EndRow = page_id*16+16;
	$(".searchResult table").html("");
	$(".searchResult table").append('<tr>'+html+'</tr>');
	$.ajax({
		type:"post",
		url:"Handler/getSearchResultByTaskID.ashx",
		data:{platformType:1,isWeb:1,TaskID:TaskID,SortType:SortType,BeginRow:BeginRow,EndRow:EndRow},
		async:true,
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				for(item in dataObj.data.Result){
					if(dataObj.data.Result[item].IsValid == 0){
						isValid = "无效";
					}else{
						isValid = "有效";
					}
					$(".searchResult table").append('<tr><td><input type="checkbox" class="tabCheckbox" /><input type="hidden" value="'+dataObj.data.Result[item].MarkNo+'" /></td><td>'+dataObj.data.Result[item].MarkClass+'</td><td>'+dataObj.data.Result[item].MarkNo+'</td><td><img src="'+dataObj.data.Result[item].MarkImagePath+'" height="32" width="96" /></td><td>'+dataObj.data.Result[item].HolderNameCn+'</td><td>'+dataObj.data.Result[item].ApplicationDate+'</td><td>'+dataObj.data.Result[item].PreliminaryPublishDate+'</td><td>'+dataObj.data.Result[item].RegisterPublishDate+'</td><td>'+isValid+'</td></tr>');
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
}