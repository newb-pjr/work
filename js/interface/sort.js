$(document).ready(function(){
				$("#sortBtn").click(function(){
					var TaskID = getCookie("TaskID");
					var SortType;
					$("#sort input").each(function(){
						if($(this).is(":checked")){
							SortType = $(this).val();
							document.cookie = "SortType="+SortType;
						}
					})
					$.ajax({
						type:"post",
						url:"Handler/getSearchResultByTaskID.ashx",
						async:true,
						data:{platformType:1,isWeb:1,TaskID:TaskID,SortType:SortType,BeginRow:1,EndRow:16},
						success:function(data){
							var dataObj = JSON.parse(data)
							if(dataObj.status==1){
								window.parent.data = dataObj.data;
								window.parent.mainGoBack();
								closeTab('查询结果');
								handleTab('sbsb-cxjg.html','查询结果');
							}else{
								dataStatus(dataObj);
							}
						}
					});
				})
			})