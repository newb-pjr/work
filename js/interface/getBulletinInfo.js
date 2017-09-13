$(document).ready(function(){
	var MarkNo = getCookie("MarkNo");
	var MarkClass = getCookie("MarkClass");
	$.post('Handler/getBulletinInfo.ashx',{platformType:1,isWeb:1,MarkNo:MarkNo,MarkClass:MarkClass},function(data){
		var dataObj = eval("("+data+")");
		if(dataObj.status==1){
			for(item in dataObj.data.BulletinInfo){
				$(".fileContLeft table").append('<tr><td>'+dataObj.data.BulletinInfo[item].PublishDate+'</td><td>'+dataObj.data.BulletinInfo[item].IssueNo+'</td><td>'+dataObj.data.BulletinInfo[item].PublishName+'</td></tr>');
			}
			//$(".fileContLeft table").append('<tr><td colspan="3">注：点击相应的公告条目查看相应的公告图</td></tr>');
			$(".fileContLeft table tr").click(function(){
				var index = $(this).index();
				$(".noticeImg").attr("src",dataObj.data.BulletinInfo[index-1].BulletinImage);
				$(".zoom").attr("href",dataObj.data.BulletinInfo[index-1].BulletinImage);
			})
		}else{
			dataStatus(dataObj);
		}
	})
})
