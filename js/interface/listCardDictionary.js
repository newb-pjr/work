$(document).ready(function(){
	var currency = $(".currency select").val();
	$.ajax({
		type:"post",
		url:"Handler/listCardDictionary.ashx",
		async:false,
		data:{platformType:1,isWeb:1,currency:currency,pageSize:0,page:0},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				var typeOneCard = [];
				var typeTwoCard = [];
				for(var i=0; i<dataObj.data.length; i++){
					if(dataObj.data[i].cardType==1){
						typeOneCard.push(dataObj.data[i]);
					}
					if(dataObj.data[i].cardType==2){
						typeTwoCard.push(dataObj.data[i]);
					}
				}
				cardList(typeTwoCard,"dateCard");
				cardList(typeOneCard,"timeCard");
			}else{
				dataStatus(dataObj);
			}
		}
	});
	
	$("input[name='qika']").click(function(){
		$("#attachedCard").html("");
		$("#coupon").html("");
		$("#attachedCardId").val("");
		if($(this).is(":checked")){
			$(this).parents('td').siblings().find("input[name='qika']").removeAttr("checked");
			$(this).parents('tr').siblings().find("input[name='qika']").removeAttr("checked");
			$(this).parents('table').siblings().find("input[name='qika']").removeAttr("checked");
		}
	})
	
	$("#chooseCurrency").change(function(){
		var currency = $(this).val();
		$("#dateCard").html("");
		$("#timeCard").html("");
		$("#attachedCard").html("");
		$("#coupon").html("");
		$.ajax({
			type:"post",
			url:"Handler/listCardDictionary.ashx",
			async:false,
			data:{platformType:1,isWeb:1,currency:currency,pageSize:0,page:0},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					var typeOneCard = [];
					var typeTwoCard = [];
					for(var i=0; i<dataObj.data.length; i++){
						if(dataObj.data[i].cardType==1){
							typeOneCard.push(dataObj.data[i]);
						}
						if(dataObj.data[i].cardType==2){
							typeTwoCard.push(dataObj.data[i]);
						}
					}
					cardList(typeTwoCard,"dateCard");
					cardList(typeOneCard,"timeCard");
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})

