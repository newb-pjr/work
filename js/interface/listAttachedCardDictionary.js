$(document).ready(function(){
	var endTime;
	$.ajax({
		type:"post",
		url:"Handler/userInfo.ashx",
		async:true,
		data:{platformType:1,isWeb:1},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				endTime = new Date(dataObj.userInfo.userCard.endTime.replace(/\-/g, "\/"));
			}else{
				dataStatus(dataObj);
			}
		}
	});
	
	$("#getAttachedCard").click(function(){
		var parentID;
		$("#attachedCard").html("");
		if(!$("input[name='qika']").is(":checked")){
			var date = new Date();
			if(date<=endTime){
				$.ajax({
					type:"post",
					url:"Handler/listAttachedCardDictionary.ashx",
					async:true,
					data:{platformType:1,isWeb:1,parentID:0},
					success:function(data){
						var dataObj = eval("("+data+")");
						if(dataObj.status==1){
							$("#attachedCardId").val(dataObj.data[0].id);
							var cardArr = dataObj.data
							var html = "";
							var dateCardlength = Math.floor(cardArr.length/4);
							var sum = 0;
							for(var j=0; j<dateCardlength; j++){
								html += '<tr>';
								for(var i=0; i<4; i++){
									html += '<td><div class="card"><p class="cardName">国方卡</p><p class="cardType">（'+cardArr[sum].name+'）</p><p class="cardPrice">￥'+cardArr[sum].price+'</p></div><div class="cardDet"><span class="cardNum">共 <input type="text" onblur="validationVal(this.value)" /> 张</span></div></td>'
									sum++;
								}
								html += '</tr>';
							}
							if(cardArr.length%4>0){
								html += '<tr>';
								for(var i=0; i<cardArr.length%4; i++){
									html += '<td><div class="card"><p class="cardName">国方卡</p><p class="cardType">（'+cardArr[sum].name+'）</p><p class="cardPrice">￥'+cardArr[sum].price+'</p></div><div class="cardDet"><span class="cardNum">共 <input type="text" onblur="validationVal(this.value)" /> 张</span></div></td>'
									sum++;
								}
								switch (cardArr.length%4){
									case 1:
										html += '<td></td><td></td><td></td>';
										break;
									case 2:
										html += '<td></td><td></td>';
										break;
									case 3:
										html += '<td></td>';
										break;
									default:
										break;
								}
								html += '</tr>';
							}
							$("#attachedCard").append(html);
						}else{
							dataStatus(dataObj);
						}
					}
				});
			}else{
				return false;
			}
		}else{
			$("input[name='qika']").each(function(){
				if($(this).is(":checked")){
					parentID = $(this).val();
				}
			})
			$.ajax({
				type:"post",
				url:"Handler/listAttachedCardDictionary.ashx",
				async:true,
				data:{platformType:1,isWeb:1,parentID:parentID},
				success:function(data){
					var dataObj = eval("("+data+")");
//					var cardArr = dataObj.data;
					if(dataObj.status==1){
						$("#attachedCardId").val(dataObj.data[0].id);
						var cardArr = dataObj.data
						var html = "";
						var dateCardlength = Math.floor(cardArr.length/4);
						var sum = 0;
						for(var j=0; j<dateCardlength; j++){
							html += '<tr>';
							for(var i=0; i<4; i++){
								html += '<td><div class="card"><p class="cardName">国方卡</p><p class="cardType">（'+cardArr[sum].name+'）</p><p class="cardPrice">￥'+cardArr[sum].price+'</p></div><div class="cardDet"><span class="cardNum">共 <input type="text" onblur="validationVal(this.value)" /> 张</span></div></td>'
								sum++;
							}
							html += '</tr>';
						}
						if(cardArr.length%4>0){
							html += '<tr>';
							for(var i=0; i<cardArr.length%4; i++){
								html += '<td><div class="card"><p class="cardName">国方卡</p><p class="cardType">（'+cardArr[sum].name+'）</p><p class="cardPrice">￥'+cardArr[sum].price+'</p></div><div class="cardDet"><span class="cardNum">共 <input type="text" onblur="validationVal(this.value)" /> 张</span></div></td>'
								sum++;
							}
							switch (cardArr.length%4){
								case 1:
									html += '<td></td><td></td><td></td>';
									break;
								case 2:
									html += '<td></td><td></td>';
									break;
								case 3:
									html += '<td></td>';
									break;
								default:
									break;
							}
							html += '</tr>';
						}
						$("#attachedCard").append(html);
					}else{
						dataStatus(dataObj);
					}
				}
			});
		}
	})
})
