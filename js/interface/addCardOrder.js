//$(document).ready(function(){
//	$("#subOrderBtn").click(function(){
//		$("input[name='qika']").each(function(){
//			if($(this).is(":checked")){
//				var cardID = $(this).val();
//			}else{
//				var cardID = 0;
//			}
//		})
//		if($("#attachedCardId").val()==""){
//			var attenedCardID = 0;
//			var attenedCardCount = 0;
//		}else{
//			var attenedCardID = $("#attachedCardId").val();
//			var attenedCardCount = $(".cardNum input").val();
//		}
//		if($("input[name='couponCheck']").is(":checked")){
//			var needCoupon = 1;
//			var couponCardID = $("#attachedCardId").val();
//		}else{
//			var needCoupon = 0;
//			var couponCardID = ""
//		}
//		$.ajax({
//			type:"post",
//			url:"Handler/addCardOrder.ashx",
//			async:true,
//			data:{platformType:1,isWeb:1,cardID:cardID,attenedCardID:attenedCardID,attenedCardCount:attenedCardCount,needCoupon:needCoupon,payWay:payWay,couponCardNum:"",couponCardID:couponCardID}
//		});
//	})
//})

function subOrder(payWay){
	var loading = layer.load(1, {
	  shade: [0.5,'#000']
	});
	var cardID = 0;
	var needCoupon = 0;
	var couponCardID = "";
	parent.$("input[name='qika']").each(function(){
		if($(this).is(":checked")){
			cardID = $(this).val();
		}
	})
	if(parent.$("#attachedCardId").val()==""){
		var attenedCardID = 0;
		var attenedCardCount = 0;
	}else{
		var attenedCardID = parent.$("#attachedCardId").val();
		var attenedCardCount = parent.$(".cardNum input").val();
	}
	parent.$("input[name='couponCheck']").each(function(){
		if($(this).is(":checked")){
			needCoupon = 1;
			couponCardID = $(this).val();
		}
	})
	$.ajax({
		type:"post",
		url:"Handler/addCardOrder.ashx",
		async:false,
		data:{platformType:1,isWeb:1,cardID:cardID,attenedCardID:attenedCardID,attenedCardCount:attenedCardCount,needCoupon:needCoupon,payWay:payWay,couponCardNum:"",couponCardID:couponCardID},
		success:function(data){
			var dataObj = eval("("+data+")");
			layer.close(loading);
			if(dataObj.status==1){
				window.parent.mainGoBack();
				document.cookie = "orderID="+dataObj.orderID;
				closeTab("订单详情");
				closeTab("确认并支付");
				handleTab('wdzh-zf.html','确认并支付');
			}else{
				dataStatus(dataObj);
			}
		}
	});
}
