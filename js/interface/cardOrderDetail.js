$(document).ready(function(){
	var id = getCookie("orderID");
	$.ajax({
		type:"post",
		url:"Handler/cardOrderDetail.ashx",
		async:false,
		data:{id:id,platformType:1,isWeb:1},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.order.currency==1){
				var currency = "￥";
				var currencyName = "人民币";
			}
			if(dataObj.order.currency==2){
				var currency = "$";
				var currencyName = "美元";
			}
			if(dataObj.status==1){
				for(var i=0; i<dataObj.couponCard.length; i++){
					$("#orderDet").prepend('<tr><td width="20%"><div class="couponCardInfo"><p class="cardType">'+dataObj.couponCard[i].name+'</p></td><td width="20%"><span class="payCardName">折扣'+dataObj.couponCard[i].discountRate+'%</span></td><td width="20%" align="center"></td><td width="20%" align="center"></td><td width="20%" align="center" style="color: #f00;"></td></tr>');
				}
				for(var i=0; i<dataObj.attachedCard.length; i++){
					$("#orderDet").prepend('<tr><td width="20%"><div class="cardInfo"><p class="cardName">国方卡</p><p class="cardType">（'+dataObj.attachedCard[i].name+'）</p><p class="cardPrice">'+currency+''+dataObj.attachedCard[i].price+'</p></div></td><td width="20%"><span class="payCardName">'+dataObj.attachedCard[i].name+'</span></td><td width="20%" align="center">'+dataObj.attachedCard[i].count+'</td><td width="20%" align="center">'+currency+''+dataObj.attachedCard[i].price+'</td><td width="20%" align="center" style="color: #f00;">'+currency+''+dataObj.attachedCard[i].sumPrice+'</td></tr>');
				}
				if(dataObj.userCard!=""){
					$("#orderDet").prepend('<tr><td width="20%"><div class="cardInfo"><p class="cardName">国方卡</p><p class="cardType">（'+dataObj.userCard.name+'）</p><p class="cardPrice">'+currency+''+dataObj.userCard.price+'</p></div></td><td width="20%"><span class="payCardName">'+dataObj.userCard.name+'</span></td><td width="20%" align="center">1</td><td width="20%" align="center">'+currency+''+dataObj.userCard.price+'</td><td width="20%" align="center" style="color: #f00;">'+currency+''+dataObj.userCard.price+'</td></tr>');
				}
				$("#sumPrice").html(currency+dataObj.sumPrice);
				if(dataObj.couponCard==""){
					$("#discount").html("0");
				}else{
					$("#discount").html("-"+currency+dataObj.sumPrice*(100-dataObj.couponCard[0].discountRate)/100);
				}
				$("#realPrice").html("实付款："+currency+dataObj.order.sumPrice);
				$("#orderCode").html("订单编号："+dataObj.order.orderCode);
				$("#orderTime").html("生成时间："+dataObj.order.orderTime);
				$("#currency").html("币种类型："+currencyName);
				if(dataObj.order.payWay==1){
					$("#payWay").html("支付方式：线下支付");
					$("#offlinePay").html(dataObj.offlinePay.replace(/\n/g,"<br>"));
					$("#pay").html("汇款确认");
				}
				if(dataObj.order.payWay==2){
					$("#payWay").html('支付方式：<img src="img/unionPay.jpg" />');
					$("#offlinePay").remove();
					$("#pay").html("支付");
				}
				$("#payWayCode").val(dataObj.order.payWay);
				$("#orderId").val(dataObj.order.id);
				if(dataObj.order.offlinePayStatus){
					$("#orderBtnGroup").html("<p>用户已汇款，请通知我司工作人员跟进订单</p>");
				}
				if(dataObj.order.payStatus){
					$("#orderDet tr").last().remove();
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
})
