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
	for(var i=0; i<dataResult.Result.length; i++){
		$(".searchResult table").append('<tr><td><input type="checkbox" class="tabCheckbox" value="'+dataResult.Result[i].MarkNoClass+'" /><input type="hidden" value="'+dataResult.Result[i].MarkNo+'" /></td><td>'+dataResult.Result[i].MarkClass+'</td><td><a href="javascript:void(0)" class="pointer">'+dataResult.Result[i].MarkNo+'</a></td><td><img src="'+dataResult.Result[i].MarkImagePath+'" height="32" width="96" /></td><td>'+dataResult.Result[i].HolderNameCn+'</td><td>'+dataResult.Result[i].ApplicationDate+'</td><td>'+dataResult.Result[i].RegisterPublishDate+'</td><td>'+dataResult.Result[i].IsValid+'</td></tr>');
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
		async:false,
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				for(item in dataObj.data.Result){
					$(".searchResult table").append('<tr><td><input type="checkbox" class="tabCheckbox" value="'+dataObj.data.Result[item].MarkNoClass+'" /><input type="hidden" value="'+dataObj.data.Result[item].MarkNo+'" /></td><td>'+dataObj.data.Result[item].MarkClass+'</td><td><a href="javascript:void(0)" class="pointer">'+dataObj.data.Result[item].MarkNo+'</a></td><td><img src="'+dataObj.data.Result[item].MarkImagePath+'" height="32" width="96" /></td><td>'+dataObj.data.Result[item].HolderNameCn+'</td><td>'+dataObj.data.Result[item].ApplicationDate+'</td><td>'+dataObj.data.Result[item].RegisterPublishDate+'</td><td>'+dataObj.data.Result[item].IsValid+'</td></tr>');
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
	
	$(".searchResult table input[type=checkbox]").each(function(){
		if(getCookie("MarkKeyStr")){
			var num = $(this).val();
			var MarkKeyStr = getCookie("MarkKeyStr").split(",");
			for(var i=0; i<MarkKeyStr.length; i++){
				if(num == MarkKeyStr[i]){
					$(this).attr("checked","checked");
				}
			}
		}
	})
}