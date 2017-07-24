$(document).ready(function(){
	month = 90*24*60*60*1000;
	var fromDate = new Date(Date.parse(new Date())-month).toLocaleDateString().replace(/\//g,'-');
	var to = new Date().toLocaleDateString().replace(/\//g,'-'); 
	userLogList(fromDate,to);
	$("#searchLogList").click(function(){
		if($("#chooseLogDate").val()==""){
			alert("查询日期不能为空！");
			return false;
		}
		$("#log").html("");
		var date = $("#chooseLogDate").val().split("to");
		var fromDate = date[0];
		var to = date[1];
		userLogList(fromDate,to);
	})
})

function pageselectCallback(page_id){
	var pageSize = 15;
	var page = page_id+1;
	$("#log").html("");
	if($("#chooseLogDate").val()==""){
		var fromDate = new Date(Date.parse(new Date())-month).toLocaleDateString().replace(/\//g,'-');
		var to = new Date().toLocaleDateString().replace(/\//g,'-'); 
	}else{
		var date = $("#chooseLogDate").val().split("to");
		var fromDate = date[0];
		var to = date[1];
	}
	$.ajax({
		type:"post",
		url:"Handler/userLogList.ashx",
		data:{platformType:1,isWeb:1,from:fromDate,to:to,pageSize:pageSize,page:page},
		async:true,
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status != 1){
				switch(dataObj.status){
					case 0:
						alert(dataObj.err);
						break;
					case -1:
						alert("用户不存在");
						break;
					case -2:
						alert("登录信息不存在");
						break;
					case -3:
						alert("用户 ID 与登录信息不匹配");
						break;
					case -4:
						alert("登录已过期 ");
						break;
					case -5:
						alert("验证码不正确");
						break;
				}
			}else{
				for(var i=0,s=pageSize*page_id+1; i<dataObj.data.length,s<=pageSize*page_id+15; i++,s++){
//					s+=1;
					$("#log").append('<tr><td width="20%">'+s+'</td><td width="40%">'+dataObj.data[i].addTime+'</td><td width="20%">'+dataObj.data[i].equipmentCode+'</td><td width="20%">'+dataObj.data[i].describe+'</td></tr>')
				}
			}
		}
	});
}

function userLogList(fromDate,to){
	$.ajax({
		type:"post",
		url:"Handler/userLogList.ashx",
		data:{platformType:1,isWeb:1,from:fromDate,to:to,pageSize:15,page:1},
		async:true,
		success:function(data){
			var dataObj = eval("("+data+")");
			if(dataObj.status != 1){
				switch(dataObj.status){
					case 0:
						alert(dataObj.err);
						break;
					case -1:
						alert("用户不存在");
						break;
					case -2:
						alert("登录信息不存在");
						break;
					case -3:
						alert("用户 ID 与登录信息不匹配");
						break;
					case -4:
						alert("登录已过期 ");
						break;
					case -5:
						alert("验证码不正确");
						break;
				}
			}else{
//				var s=0;
				for(var i=0,s=1; i<dataObj.data.length,s<=dataObj.data.length; i++,s++){
//					s+=1;
					$("#log").append('<tr><td width="20%">'+s+'</td><td width="40%">'+dataObj.data[i].addTime+'</td><td width="20%">'+dataObj.data[i].equipmentCode+'</td><td width="20%">'+dataObj.data[i].describe+'</td></tr>')
				}
				// 创建分页元素
				$("#PaginationLog").pagination(dataObj.count, {
					num_edge_entries: 2,
					num_display_entries: 5,
					items_per_page: 15,
					prev_text: "上一页",
					next_text: "下一页",
					callback: pageselectCallback
				});
			}
		}
	});
}
