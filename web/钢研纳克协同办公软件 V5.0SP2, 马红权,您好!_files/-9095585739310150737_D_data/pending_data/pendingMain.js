function showLeftList(dataName,chartId){
	dataNameTemp=dataName;
	selectChartId=chartId.htmlId;
	var headerStr;
	if(columnHeaderStr!=null){
		headerStr=columnHeaderStr.substring(1,columnHeaderStr.length-1);
	}
	$("#leftListDiv").css('display','none');
	$("#leftListIframe").css('display','');
	var _url=_ctxPath+"/collaboration/pending.do?method=showLeftList&pageSize="+pageSize+"&dataName="+dataName+"&columnHeaderStr="+headerStr+"&dueToRemind="+dueToRemind+"&currentPanel="+currentPanel+"&fragmentId="+fragmentId+"&ordinal="+ordinal+"&width="+width+"&sectionId="+sectionId;
    $("#leftList").attr("src",_url);
}
//ajax判断事项是否可用。
function isAffairValid(affairId){
  var cm = new colManager();
  var msg = cm.checkAffairValid(affairId);
  if($.trim(msg) !=''){
       return msg;
  }
  return "";
}

function cancelBold4Messge(param){
  if(typeof(param)!='undefined'){
    //param[0]:message.link.doc.open.only @link:openMessage.js
    for(var i=1;i<param.length;i++){
      if($("#row"+param[i]).length>0){
        $("#row"+param[i]).removeClass("font_bold");
      }
    }
  }
}
function checkAndOpen(affairId,link,title,openType,app,thisobj){
   //取消加粗
    cancelBold(thisobj);

	if($.trim(app) === '1' || $.trim(app) === '19' || $.trim(app) === '20' || $.trim(app) === '21'){
		var msg = isAffairValid(affairId);
		if(msg != "") {
			$.messageBox({
	   		 	'title' : $.i18n('system.prompt.js'), //系统提示
	            'type': 0,
	            'imgType':2,
	            'msg': msg,
	   	 	   ok_fn:function(){
	   	 		parent.sectionHandler.reload("pendingSection", true);
	   	 	   }
	         });
			return;  
		}
	}
	openDetail(link,escapeStringToHTML(title),openType);
}

//取消加粗
function cancelBold(thisobj){
  if(thisobj!=null && typeof(thisobj)!='undefined')  $(thisobj).removeClass("font_bold");
}
function openDetail(link,title,openType) {
	if(openType == '2') {
		openLink(link);
	} else {
		getCtpTop().main._collOpenDetail(link,title,openType,sectionId,selectChartId,dataNameTemp);
	}
}
function closeAndFresh(sectionId){
	if(dataNameTemp!=""){
		dialogDealColl.close();
		initChart(selectChartId);
		showLeftList(dataNameTemp,selectChartId);
	}else{
	    dialogDealColl.close();
	    parent.sectionHandler.reload("pendingSection",true);
	}
}
function openLink(link) {
	try{
		window.parent.location.href("/seeyon"+link);
	}catch(e){//非IE跳转
		window.parent.location.href="/seeyon"+link;
	}
}
//点击图表回调函数
function pieClick(e){
  showLeftList(e.data.ID);
}
//生成滚动效果
function initRollingChart(){
	/********************上下滚动显示**********************************/
    var FRF = $(".front_rolling_flash");//
    var FRF_ROOLING_BTN_LI = FRF.find(".rolling_btn_area ul li");//按钮区域li
    var front_rolling_flash_number = FRF.find(".rolling_box li").size();//获取当前显示条数
    FRF_ROOLING_BTN_LI.eq(0).find(".ico16").removeClass("rolling_uncurrent").addClass("rolling_current");
    FRF.find(".rolling_btn_area .rolling_btn_t").click(function () {
        var _n = FRF_ROOLING_BTN_LI.index(FRF_ROOLING_BTN_LI.find(".rolling_current").parent()) - 1;
        var _h = FRF.find(".rolling_box .rolling_item").height();
        if (_n >= 0) {
            FRF_ROOLING_BTN_LI.find(".ico16").removeClass("rolling_current").addClass("rolling_uncurrent");
            FRF_ROOLING_BTN_LI.eq(_n).find(".ico16").toggleClass("rolling_current rolling_uncurrent");
            FRF.find(".rolling_box").stop(true).animate({ top: _n * -1 * _h });
        }
        initLastChart(resultMap);
    });
    FRF.find(".rolling_btn_area .rolling_btn_b").click(function () {
        var _n = FRF_ROOLING_BTN_LI.index(FRF_ROOLING_BTN_LI.find(".rolling_current").parent()) + 1;
        var _h = FRF.find(".rolling_box .rolling_item").height();
        if (_n <= front_rolling_flash_number - 1) {
            FRF_ROOLING_BTN_LI.find(".ico16").removeClass("rolling_current").addClass("rolling_uncurrent");
            FRF_ROOLING_BTN_LI.eq(_n).find(".ico16").toggleClass("rolling_current rolling_uncurrent");
            FRF.find(".rolling_box").stop(true).animate({ top: _n * -1 * _h });
        }
        initLastChart(resultMap);
    });
    FRF_ROOLING_BTN_LI.find(".ico16").click(function () {
        FRF_ROOLING_BTN_LI.find(".ico16").removeClass("rolling_current").addClass("rolling_uncurrent");
        $(this).toggleClass("rolling_current rolling_uncurrent");
        var _n = FRF_ROOLING_BTN_LI.index(FRF_ROOLING_BTN_LI.find(".rolling_current").parent());
        var _h = FRF.find(".rolling_box .rolling_item").height();
        if (_n >= 0) {
            FRF.find(".rolling_box").stop(true).animate({ top: _n * -1 * _h });
        }
        initLastChart(resultMap);
    });
}

//生成统计图
function initLastChart(resultMap){
    if(!hasImportantLevel&&!hasOverdue&&!hasHandlingState&&!hasHandleType&&!hasExigency){//初次加载不执行
		return;
    }
	//重要程度
	if(!hasImportantLevel){
		importantLevelGraph(resultMap);
    }
	//是否超期
	if(!hasOverdue){
		overdueGraph(resultMap);
    }
	//办理状态
    if(!hasHandlingState){
    	handlingStateGraph(resultMap);
    }
	//办理类型
	if(!hasHandleType){
		handleTypeGraph(resultMap);
    }
    //紧急程度
	if(!hasExigency){
		exigencyGraph(resultMap);
    }
}

function createChart(resultMap,selectChartId){
    //生成统计图
	var tempDataIdListId;
	var FRF = $(".front_rolling_flash");//
	var chartValue=FRF.find(".rolling_current").parent().attr("id");
	
	if((chartValue=='importantLevel'&&!hasImportantLevel)||selectChartId=='importantLevelGraph'){//重要程度
		importantLevelGraph(resultMap,selectChartId);
	}
	
	if((chartValue=='overdue'&&!hasOverdue)||selectChartId=='overdueGraph'){//是否超期
		overdueGraph(resultMap,selectChartId);
	}
	
	if((chartValue=='handlingState'&&!hasHandlingState)|selectChartId=='handlingStateGraph'){//办理状态
		handlingStateGraph(resultMap,selectChartId);
	}
	
	if((chartValue=='handleType'&&!hasHandleType)||selectChartId=='handleTypeGraph'){//办理类型
		handleTypeGraph(resultMap,selectChartId);
	}
	
	if((chartValue=='exigency'&&!hasExigency)||selectChartId=='exigencyGraph'){//紧急程度（公文）
		exigencyGraph(resultMap,selectChartId);
	}
	return;
}

function initChart(selectChartId){
	
	//初始化数据查询
	var _pendingManager = new pendingManager();
    var ajaxMapBean = new Object();
    ajaxMapBean["fragmentId"] = fragmentId;
    ajaxMapBean["ordinal"] = ordinal;      
    resultMap=_pendingManager.transInitChartData(ajaxMapBean);
	
    createChart(resultMap,selectChartId);
	if(!selectChartId){
		initRollingChart();
	}
	
	//统计图默认选中设置
	//办理类型"自由协同","协同/表单模板","收文","发文","待发送","待签收","待登记","签报","会议","会议室审批","待审批公共信息","待审批综合办公审批"
}

//重要程度
function importantLevelGraph(resultMap,selectChartId){
	if(!selectChartId&&hasImportantLevel){
		return;
	}
	if(!resultMap){
		return;
	}
	var import3Count=resultMap.import3Count;//非常重要
	var import2Count=resultMap.import2Count;//重要
	var import1Count=resultMap.import1Count;//普通
	
	tempDataIdListId=new Array();
	var importantLevelNames = new Array();
	var importantLevel = new Array();
	var importantLevelArray=new Array();
	var importantLevelIdArray=new Array();
	var dataColorList = new Array(); 
	var collorArray=new Array();
	
	importantLevelNames.push($.i18n('collaboration.newcoll.veryimportant'));
	importantLevelArray.push(import3Count);
	importantLevelIdArray.push("import3");
	collorArray.push("#f83f3d");
	
	importantLevelNames.push($.i18n('collaboration.newcoll.important'));
	importantLevelArray.push(import2Count);
	importantLevelIdArray.push("import2");
	collorArray.push("#ffde00");
	
	importantLevelNames.push($.i18n('collaboration.pendingsection.importlevl.normal'));
	importantLevelArray.push(import1Count);
	importantLevelIdArray.push("import1");
	collorArray.push("#a9e051");
	
	importantLevel.push(importantLevelArray);
	tempDataIdListId.push(importantLevelIdArray);
	dataColorList.push(collorArray);
	
	showChart("importantLevelGraph",$.i18n('collaboration.pending.importantLevel'),importantLevel,importantLevelNames,tempDataIdListId,dataColorList,$.i18n('collaboration.pending.noDataAlert2'));
	hasImportantLevel=true;
}

//紧急程度（公文）
function exigencyGraph(resultMap,selectChartId){
	if(!selectChartId&&hasExigency){
		return;
	}
	if(!resultMap){
		return;
	}
	var topExigency=resultMap.topExigency;//特急
	var exigency=resultMap.exigency;//紧急
	var commonExigency=resultMap.commonExigency;//普通
	
	tempDataIdListId=new Array();
	var exigencyList = new Array();
	var exigencyNames = new Array();
	var exigencyArray=new Array();
	var exigencyIdArray=new Array();
	var dataColorList = new Array();
	var collorArray=new Array();
	
	exigencyNames.push($.i18n('collaboration.pending.exigencyNames1'));
	exigencyArray.push(topExigency);
	exigencyIdArray.push("topExigency");
	collorArray.push("#f83f3d");
	
	exigencyNames.push($.i18n('collaboration.pending.exigencyNames2'));
	exigencyArray.push(exigency);
	exigencyIdArray.push("exigency");
	collorArray.push("#ffde00");
	
	exigencyNames.push($.i18n('collaboration.pendingsection.importlevl.normal'));
	exigencyArray.push(commonExigency);
	exigencyIdArray.push("commonExigency");
	collorArray.push("#a9e051");
	
	exigencyList.push(exigencyArray);
	tempDataIdListId.push(exigencyIdArray);
	dataColorList.push(collorArray);
	
	showChart("exigencyGraph",$.i18n('collaboration.pending.exigencyGraph'),exigencyList,exigencyNames,tempDataIdListId,dataColorList,$.i18n('collaboration.pending.noDataAlert1'));
	hasExigency=true;
}
//是否超期
function overdueGraph(resultMap,selectChartId){
	if(!selectChartId&&hasOverdue){
		return;
	}
	if(!resultMap){
		return;
	}
	var overdue=resultMap.overdue;//已超期
	var noOverdue=resultMap.noOverdue;//未超期
	
	tempDataIdListId=new Array();
	var overdueList = new Array();
	var overdueNames = new Array();
	var overdueArray=new Array();
	var overdueIdArray=new Array();
	var dataColorList = new Array(); 
	var collorArray=new Array();
	
	overdueNames.push($.i18n('collaboration.pending.overdueNames3'));//未超期
	overdueArray.push(noOverdue);
	overdueIdArray.push("noOverdue");
	collorArray.push("#1f83e4");
	
	overdueNames.push($.i18n('collaboration.pending.overdueNames2'));
	overdueArray.push(overdue);
	overdueIdArray.push("overdue");
	collorArray.push("#f83f3d");
	
	overdueList.push(overdueArray);
	tempDataIdListId.push(overdueIdArray);
	dataColorList.push(collorArray);
	
	showChart("overdueGraph",$.i18n('collaboration.pending.overdueGraph'),overdueList,overdueNames,tempDataIdListId,dataColorList,$.i18n('collaboration.pending.noDataAlert2'));
	hasOverdue=true;
}

//办理状态
function handlingStateGraph(resultMap,selectChartId){
	if(!selectChartId&&hasHandlingState){
		return;
	}
	if(!resultMap){
		return;
	}
	var pendingCount=resultMap.pendingCount;//待办
	var zcdbCount=resultMap.zcdbCount;//暂存待办
	
	var  handlingStateNames= new Array();
	var handlingStateList = new Array();
	var handlingStateCountArray=new Array();
	var stateIdArray=new Array();
	tempDataIdListId=new Array();
	var dataColorList = new Array(); 
	var collorArray=new Array();
	
	handlingStateNames.push($.i18n('collaboration.pending.handlingState.pending'));
	handlingStateCountArray.push(pendingCount);
	stateIdArray.push("pending");
	collorArray.push("#aadf4f");
	
	handlingStateNames.push($.i18n('collaboration.pending.handlingState.zcdb'));
	handlingStateCountArray.push(zcdbCount);
	stateIdArray.push("zcdb");
	collorArray.push("#45b3e7");
	
	handlingStateList.push(handlingStateCountArray);
	tempDataIdListId.push(stateIdArray);
	dataColorList.push(collorArray);
	
	showChart("handlingStateGraph",$.i18n('collaboration.pending.handlingState.name'),handlingStateList,handlingStateNames,tempDataIdListId,dataColorList,$.i18n('collaboration.pending.noDataAlert2'));
	hasHandlingState=true;
}
//办理类型
function handleTypeGraph(resultMap,selectChartId){
	if(!selectChartId&&hasHandleType){
		return;
	}
	if(!resultMap){
		return;
	}
	var zyxt=resultMap.zyxt;//自由协同，
	var xtbdmb=resultMap.xtbdmb;//协同/表单模板，
	var shouWen=resultMap.shouWen;//收文，
	var faWen=resultMap.faWen;//发文，
	var daiFaEdoc=resultMap.daiFaEdoc;//待发送，
	var daiQianShou=resultMap.daiQianShou;//待签收，
	var daiDengJi=resultMap.daiDengJi;//待登记，
	var qianBao=resultMap.qianBao;//签报，
	var huiYi=resultMap.huiYi;//会议，
	var huiYiShi=resultMap.huiYiShi;//会议室审批，
	var diaoCha = resultMap.diaoCha; //调查
	var daiShenPiGGXX=resultMap.daiShenPiGGXX;//待审批公共信息 (公告，新闻，调查，讨论)
	var daiShenPiZHBG=resultMap.daiShenPiZHBG;//待审批综合办公审批
	
	tempDataIdListId=new Array();
	var handleTypeList = new Array();
	var handleTypeNames = new Array();
	var handleTypeArray = new Array();
	var handleTypeIdArray = new Array();
	var dataColorList = new Array(); 
	var collorArray=new Array();
	
	if(zyxt!=0){
		handleTypeNames.push($.i18n('collaboration.eventsource.category.collaboration'));
		handleTypeArray.push(zyxt);
		handleTypeIdArray.push("zyxt");
		collorArray.push("#F93D3E");
	}
	if(xtbdmb!=0){
		handleTypeNames.push($.i18n('collaboration.eventsource.category.collOrFormTemplete'));
		handleTypeArray.push(xtbdmb);
		handleTypeIdArray.push("xtbdmb");
		collorArray.push("#DA8A01");
	}
	if(shouWen!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable1'));
		handleTypeArray.push(shouWen);
		handleTypeIdArray.push("shouWen");
		collorArray.push("#FFDE00");
	}
	if(faWen!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable2'));
		handleTypeArray.push(faWen);
		handleTypeIdArray.push("faWen");
		collorArray.push("#DEFF00");
	}
	if(daiFaEdoc!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable3'));
		handleTypeArray.push(daiFaEdoc);
		handleTypeIdArray.push("daiFaEdoc");
		collorArray.push("#A9E051");
	}
	if(daiQianShou!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable4'));
		handleTypeArray.push(daiQianShou);
		handleTypeIdArray.push("daiQianShou");
		collorArray.push("#3DD582");
	}
	if(daiDengJi!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable5'));
		handleTypeArray.push(daiDengJi);
		handleTypeIdArray.push("daiDengJi");
		collorArray.push("#0FC000");
	}
	if(qianBao!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable6'));
		handleTypeArray.push(qianBao);
		handleTypeIdArray.push("qianBao");
		collorArray.push("#DE509C");
	}
	if(huiYi!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable7'));
		handleTypeArray.push(huiYi);
		handleTypeIdArray.push("huiYi");
		collorArray.push("#5D6BF0");
	}
	if(huiYiShi!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable8'));
		handleTypeArray.push(huiYiShi);
		handleTypeIdArray.push("huiYiShi");
		collorArray.push("#0066A1");
	}
	if(daiShenPiGGXX!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable9'));
		handleTypeArray.push(daiShenPiGGXX);
		handleTypeIdArray.push("daiShenPiGGXX");
		collorArray.push("#45B3E8");
	}
	if(daiShenPiZHBG!=0){
		handleTypeNames.push($.i18n('collaboration.pending.lable10'));
		handleTypeArray.push(daiShenPiZHBG);
		handleTypeIdArray.push("daiShenPiZHBG");
		collorArray.push("#AF50DE");
	}
	if(diaoCha!=0){
		handleTypeNames.push($.i18n('collaboration.pending.inquiry.label'));
		handleTypeArray.push(diaoCha);
		handleTypeIdArray.push("diaoCha");
		collorArray.push("#1D85DC");
	}
	
	handleTypeList.push(handleTypeArray);
	tempDataIdListId.push(handleTypeIdArray);
	dataColorList.push(collorArray);
	
	showChart("handleTypeGraph",$.i18n('collaboration.pending.handleType'),handleTypeList,handleTypeNames,tempDataIdListId,dataColorList,$.i18n('collaboration.pending.noDataAlert2'));
	hasHandleType=true;
}

/**
 * 1.紧急程度（公文），提示语为：您没有待办公文 
 * 2.其他四个，提示语为：您没有待办事项
 */
function showChart(_htmlId,_title,_dataList,_indexNames,_tempDataIdListId,_dataColorList,_noData){
	var _htmlId = new SeeyonChart({
		htmlId:_htmlId,
		width : 260,
		height: 204,
		legend : "points_true_Bottom_20%",
		chartType : ChartType.pie,
		border:false,
		title:_title,
		noData:_noData,
		labelFontSize : "12",
		animation : false,
		toolTip:"{%Name} {%YValue}{numDecimals:0}",
		insideLabel : "{%Value}{numDecimals:0}",
		explodeOnClick : true,
		dataList: _dataList,
		dataIdList:_tempDataIdListId,
		indexNames : _indexNames,
		dataColorList : _dataColorList,
		event : [{
			name:"pointClick",
			func:function (e){
				showLeftList(e.data.ID,_htmlId);
			}
		}]
	});
}
//按名称生成统计图
function initCharByName(charName,resultMap){
	if(charName){
		charName=charName.trim();
	}else{
		return;
	}
	//[handlingState, overdue, handleType, exigency, importantLevel]
	 //办理类型
	if("handleType"==charName){
		handleTypeGraph(resultMap);
	}
	 //办理状态
	if("handlingState"==charName){
		handlingStateGraph(resultMap);
	}
	//是否超期
	if("overdue"==charName){
		overdueGraph(resultMap);
	}
	//紧急程度（公文）
	if("exigency"==charName){
		exigencyGraph(resultMap);
	}
	//重要程度
	if("importantLevel"==charName){
		importantLevelGraph(resultMap);
	}
}
function removeChart(){
    try{
    	$("body").empty();
    }catch(e){
    }
}
//重新设置列表的宽度
function resetSize(isChangeSize){
	if(columnsStyleStr == 'doubleList'){//双列表
		if(widthSize==5){//双栏
			$("#contentDiv").css("overflow-y","hidden");
			$("#contentDiv").css("overflow-x","scroll");
			$("#leftListDiv").css("width",iframeWidth-4);
			$("#rightListDiv").css("width",iframeWidth-4);
			isChangeSize=true;
		}else if(widthSize<5){//三栏
			$("#contentDiv").css("overflow-y","hidden");
			$("#contentDiv").css("overflow-x","scroll");
			$("#leftListDiv").css("width",iframeWidth*5/(widthSize*1));
			$("#rightListDiv").css("width",iframeWidth*5/(widthSize*1));
		}else if(widthSize==7){//
			var width=iframeWidth*5/(widthSize*1);
			$("#leftListDiv").css("width",width);
			$("#rightListDiv").css("width",width);
			isChangeSize=true;
		}
	}else if(columnsStyleStr == 'listAndStatisticalGraph'){//列表加统计图
		if(widthSize==5){//双栏
			$("#contentDiv").css("overflow-y","hidden");
			$("#contentDiv").css("overflow-x","scroll");
			$("#leftListDiv").css("width",iframeWidth*4/3);
			$("#leftListIframe").css("width",iframeWidth*4/3);
			isChangeSize=true;
		}else if(widthSize<5){//三栏
			$("#contentDiv").css("overflow-y","hidden");
			$("#contentDiv").css("overflow-x","scroll");
			$("#leftListDiv").css("width",iframeWidth*20/(widthSize*3));
			$("#leftListIframe").css("width",iframeWidth*20/(widthSize*3));
		}else if(widthSize==10){//通栏
			$("#leftListDiv").css("width",iframeWidth*2/3);
			$("#contentDiv").removeClass("over_auto");
		}else if(widthSize==7){//模板4 大于1/2栏
			$("#leftListDiv").css("width",iframeWidth-320);
			$("#leftListIframe").css("width",iframeWidth-320);
			$("#contentDiv").removeClass("over_auto");
		}
		if(iframeHeight<208){
			$("#leftListIframe").css("height",iframeHeight+1);
		}else{
			$("#leftListIframe").css("height",iframeHeight);
		}
	}else{//单列表
		if(widthSize==5){//双栏
			$("#leftListDiv").css("width",iframeWidth-4);
		}else if(widthSize<5){//三栏
			$("#contentDiv").css("overflow-y","hidden");
			$("#contentDiv").css("overflow-x","scroll");
			$("#leftListDiv").css("width",iframeWidth*5/(widthSize*1));
		}else if(widthSize==7){
			$("#leftListDiv").css("width",iframeWidth-4);
		}
	}
	return isChangeSize;
}