$(document).ready(function(){
	$("#getCoupon").click(function(){
		$("#coupon").html("");
		if($("input[name='qika']").is(":checked")){
			var type = 1;
		}else{
			if($(".cardNum input").val()!="" && $(".cardNum input").val()!=0){
				var type = 2;
			}else{
				return false;
			}
		}
		var cardCount = $(".cardNum input").val();
		$.ajax({
			type:"post",
			url:"Handler/getCouponInfo.ashx",
			async:true,
			data:{platformType:1,isWeb:1,type:type,cardCount:cardCount},
			success:function(data){
				var dataObj = eval("("+data+")");
				if(dataObj.status==1){
					var cardArr = dataObj.data
					var html = "";
					var dateCardlength = Math.floor(cardArr.length/4);
					var sum = 0;
					for(var j=0; j<dateCardlength; j++){
						html += '<tr>';
						for(var i=0; i<4; i++){
							html += '<td><label><div class="cardCoupon"><p class="cardName">优惠卡</p><p class="cardType">（'+cardArr[sum].name+'）</p></div><input type="checkbox" checked name="couponCheck" value="'+cardArr[sum].id+'" class="tabCheckbox rechargeCardChoose" /></label><div class="cardDet"><span class="cardNum">折扣'+cardArr[sum].discountRate*100+'%</div></td>'
							sum++;
						}
						html += '</tr>';
					}
					if(cardArr.length%4>0){
						html += '<tr>';
						for(var i=0; i<cardArr.length%4; i++){
							html += '<td><label><div class="cardCoupon"><p class="cardName">优惠卡</p><p class="cardType">（'+cardArr[sum].name+'）</p></div><input type="checkbox" checked name="couponCheck" value="'+cardArr[sum].id+'" class="tabCheckbox rechargeCardChoose" /></label><div class="cardDet"><span class="cardNum">折扣'+cardArr[sum].discountRate*100+'%</div></td>'
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
					$("#coupon").append(html);
				}else{
					dataStatus(dataObj);
				}
			}
		});
	})
})
