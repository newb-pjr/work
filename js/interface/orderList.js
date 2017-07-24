$(document).ready(function(){
	var currency;
	var payStatus;
	var sign;
	var fromDate = $("#startTime").val();
	var to = $("#endTime").val();
	if($(".isPaid li").first().hasClass("selected")){
		var orderPayStatus = 0;
	}
	if($(".isPaid li").last().hasClass("selected")){
		var orderPayStatus = 1;
	}
	$.ajax({
		type:"post",
		url:"Handler/orderList.ashx",
		async:false,
		data:{from:fromDate,to:to,payStatus:orderPayStatus,orderType:-1,pageSize:10,page:1,platformType:1,isWeb:1},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				if(dataObj.data.length>0){
					$("#orderList tr").first().hide();
				}
				for(var i=0; i<dataObj.data.length; i++){
					if(dataObj.data[i].currency==1){
						currency = "人民币";
						sign = "￥";
					}
					if(dataObj.data[i].currency==2){
						currency = "美元";
						sign = "$";
					}
					if(dataObj.data[i].payStatus){
						payStatus = "已支付";
					}else{
						payStatus = "未支付";
					}
					$("#orderList").append('<tr onclick=getOrderId('+dataObj.data[i].id+')><td width="40%" class="payCardNameTd" align="center"><span class="payCardName">订单号：'+dataObj.data[i].orderCode+'</span></td><td width="20%" align="center">'+dataObj.data[i].orderTime+'</td><td width="10%" align="center">'+currency+'</td><td width="20%" align="center" style="color: #f00;">'+sign+''+dataObj.data[i].sumPrice+'</td><td width="10%" align="center">'+payStatus+'</td></tr>')
				}
				 //创建分页元素
				$("#Pagination-orderList").pagination(dataObj.count, {
					num_edge_entries: 2,
					num_display_entries: 5,
					items_per_page: 10,
					prev_text: "上一页",
					next_text: "下一页",
					callback: pageselectCallback
				});
			}else{
				dataStatus(dataObj);
			}
		}
	});
	
	$(".isPaid li").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		orderList();
	})
})
function pageselectCallback(page_id){
	var currency;
	var payStatus;
	var sign;
	var fromDate = $("#startTime").val();
	var to = $("#endTime").val();
	var page = page_id+1;
	if($(".isPaid li").first().hasClass("selected")){
		var orderPayStatus = 0;
	}
	if($(".isPaid li").last().hasClass("selected")){
		var orderPayStatus = 1;
	}
	$("#orderList").html("");
	$.ajax({
		type:"post",
		url:"Handler/orderList.ashx",
		async:false,
		data:{from:fromDate,to:to,payStatus:orderPayStatus,orderType:-1,pageSize:10,page:page,platformType:1,isWeb:1},
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status==1){
				for(var i=0; i<dataObj.data.length; i++){
					if(dataObj.data[i].currency==1){
						currency = "人民币";
						sign = "￥";
					}
					if(dataObj.data[i].currency==2){
						currency = "美元";
						sign = "$";
					}
					if(dataObj.data[i].payStatus){
						payStatus = "已支付";
					}else{
						payStatus = "未支付";
					}
					$("#orderList").append('<tr onclick=getOrderId('+dataObj.data[i].id+')><td width="40%" class="payCardNameTd" align="center"><span class="payCardName">订单号：'+dataObj.data[i].orderCode+'</span></td><td width="20%" align="center">'+dataObj.data[i].orderTime+'</td><td width="10%" align="center">'+currency+'</td><td width="20%" align="center" style="color: #f00;">'+sign+''+dataObj.data[i].sumPrice+'</td><td width="10%" align="center">'+payStatus+'</td></tr>')
				}
			}else{
				dataStatus(dataObj);
			}
		}
	});
}

function getOrderId(order_id){
	document.cookie = "orderID="+order_id;
	closeTab("订单详情");
	closeTab("确认并支付");
	handleTab("wdzh-ddxq.html","订单详情");
}
