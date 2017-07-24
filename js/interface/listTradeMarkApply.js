$(document).ready(function(){
	$.post('Handler/listTradeMarkApply.ashx',{isWeb:1,platformType:1,pageSize:0,page:0},function(data){
		var dataObj = eval("("+data+")");
		if(dataObj.status == 1){
			var sort = 1;
			for(var i=0; i<dataObj.data.length; i++){
				
				switch (dataObj.data[i].applyStatus){
					case 1:
						var applyStatus = '填写中';
						break;
					case 2:
						var applyStatus = '待付款';
						break;
					case 3:
						var applyStatus = '付款待审核';
						break;
					case 4:
						var applyStatus = '已付款';
						break;
					default:
						break;
				}
				sort += i;
				$(".orderTable").append('<tr><td>'+sort+'</td><td>'+dataObj.data[i].code+'</td><td>'+dataObj.data[i].addTime+'</td><td>'+dataObj.data[i].applyChinese+'</td><td>'+applyStatus+'</td><td><ul><li><img src="img/write.png" /><a href="javascript:void(0)" onclick="modifyApply('+dataObj.data[i].id+')">继续填写</a></li><li><img src="img/up.png" /><a href="javascript:void(0)" onclick="submitApply('+dataObj.data[i].id+')">提交</a></li><li><img src="img/close.png" /><a href="javascript:void(0)" onclick="deleteTradeMarkApply('+dataObj.data[i].id+',this)">删除</a></li><div class="cls"></div></ul></td></tr>');				
			}
		}
	})
})
