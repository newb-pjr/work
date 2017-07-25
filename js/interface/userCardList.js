$(document).ready(function(){
	$.ajax({
		type:"post",
		url:"Handler/userCardList.ashx",
		async:false,
		data:{platformType:1,isWeb:1,activeState:2,pageSize:0,page:0},
		success:function(data){
			var dataObj = eval("("+data+")");
			var noActive = [];
			if(dataObj.status==1){
				for(var i=0; i<dataObj.data.length; i++){
					var noActiveObj = {};
					noActiveObj.cardNum = dataObj.data[i].cardNum;
					noActiveObj.name = dataObj.data[i].name;
					noActiveObj.endTime = dataObj.data[i].endTime.split(" ")[0];
					noActiveObj.cardID = dataObj.data[i].id;
					noActive.push(noActiveObj);
				}
				for(var i=0; i<noActive.length; i++){
					$("#selectActiveDate").append('<option value="'+noActive[i].cardID+'">'+noActive[i].cardNum+'</option>');
				}
				$("#cardType").html(noActive[0].name);
				$("#validDate").html(noActive[0].endTime);
			}else{
				dataStatus(dataObj);
			}
		}
	});
	
	$.ajax({
		type:"post",
		url:"Handler/userCardList.ashx",
		async:false,
		data:{platformType:1,isWeb:1,activeState:1,pageSize:0,page:0},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				if(dataObj.data != ""){
					$("#activeCardId").val(dataObj.data[0].id);
					for(var i=0; i<dataObj.data.length; i++){
						if(dataObj.data[i].cardType==1){
							var remain = dataObj.data[i].remainCount+'次';
						}
						if(dataObj.data[i].cardType==2){
							var nowDate = new Date().getTime()/1000;
							var endDate = new Date(dataObj.data[i].endTime).getTime()/1000;
							var remain = parseInt((endDate-nowDate)/(60*60*24))+'天';
						}
						$("#cardRecord").append('<tr><td>'+dataObj.data[i].cardNum+'</td><td>已激活</td><td>'+dataObj.data[i].activeTime+'</td><td>'+dataObj.data[i].endTime+'</td><td>'+remain+'</td></tr>');
					}
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
})
