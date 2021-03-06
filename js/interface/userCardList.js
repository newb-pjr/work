$(document).ready(function(){
	var noActive = [];
	var noActiveObj = {};
	$.ajax({
		type:"post",
		url:"Handler/userCardList.ashx",
		async:false,
		data:{platformType:1,isWeb:1,activeState:2,pageSize:0,page:0},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				if(dataObj.data!=""){
					for(var i=0; i<dataObj.data.length; i++){
						noActiveObj.cardNum = dataObj.data[i].cardNum;
						noActiveObj.name = dataObj.data[i].name;
						noActiveObj.endTime = dataObj.data[i].endTime.split(" ")[0];
						noActiveObj.cardID = dataObj.data[i].id;
						noActiveObj.cardType = dataObj.data[i].cardType;
						noActive.push(noActiveObj);
					}
					for(var i=0; i<noActive.length; i++){
						$("#selectActiveDate").append('<option value="'+noActive[i].cardID+'">'+noActive[i].cardNum+'</option>');
					}
					if(noActive[0].cardType==1){
						$("#cardType").html("次卡-"+noActive[0].name);
					}
					if(noActive[0].cardType==2){
						$("#cardType").html("时卡-"+noActive[0].name);
					}
					
					$("#validDate").html(noActive[0].endTime);
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
	
	$("#selectActiveDate").change(function(){
		for(var i=0; i<noActive.length; i++){
			if($(this).val() == noActive[i].cardID){
				if(noActive[i].cardType==1){
					$("#cardType").html("次卡-"+noActive[i].name);
				}
				if(dataObj.data[0].cardType==2){
					$("#cardType").html("时卡-"+noActive[i].name);
				}
				$("#validDate").html(noActive[i].endTime);
			}
		}
	})
	
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
						if(dataObj.data[i].cardNum==""){
							var cardNum = "试用卡 - 无卡号";
						}else{
							var cardNum = dataObj.data[i].cardNum
						}
						$("#cardRecord").append('<tr><td>'+cardNum+'</td><td>已激活</td><td>'+dataObj.data[i].activeTime+'</td><td>'+dataObj.data[i].endTime+'</td><td>'+remain+'</td></tr>');
					}
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
})
