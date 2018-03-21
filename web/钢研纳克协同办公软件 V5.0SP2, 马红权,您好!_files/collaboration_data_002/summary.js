  
var isSubmitOperation = false;
//将所有操作置为可用状态
 function enableOperation(){
  //提交 
  $("#_dealSubmit").enable();
  //存为草稿
  $('#_dealSaveDraft').enable();
  //暂存待办
  $('#_dealSaveWait').enable();
  //态度
  $("input[name='attitude']").enable();
  //加签
  $("#_dealAddNode_a,#_commonAddNode_a").enable();
  //知会
  $("#_dealAddInform_a,#_commonAddInform_a").enable();
  //当前会签
  $("#_dealAssign_a,#_commonAssign_a").enable();
  //减签
  $("#_dealDeleteNode_a,#_commonDeleteNode_a").enable();
  //回退
  $("#_dealStepBack_a,#_commonStepBack_a").enable();
  //转发
  $("#_dealForward_a,#_commonForward_a").enable();
  //终止
  $("#_dealStepStop_a,#_commonStepStop_a").enable();
  //撤销流程
  $("#_dealCancel_a,#_commonCancel_a").enable();
  //修改附件
  $("#_commonUpdateAtt_a,#_dealUpdateAttachment_a").enable();
  //签章
  $("#_commonSign_a,#_dealSign_a").enable();
  // 指定回退
  $("#_dealSpecifiesReturn_a").enable();
  //修改正文
  $('#_commonEditContent_a,#_dealEditContent_a').enable();
  //督办设置开始
  $("#_commonSuperviseSet_a,#_dealSuperviseSet_a").enable();
  //转事件
     $("#_dealTransform_a,#_commonTransform_a").enable();
  //意见隐藏
  $("#isHidden").enable();
  //跟踪
  $("#isTrack").enable();
  //处理后归档
  $('#pigeonhole').enable();
  //常用语
  $('#cphrase').enable();
  //更多
  $('#moreLabel').enable();
  //消息推送
  $('#pushMessageButton').enable();
  //关联文档
  $('#uploadRelDocID').enable();
  //附件
  $('#uploadAttachmentID').enable();
  //通过并发布
  $('#_dealPass1').enable();
  //不通过
  $('#_dealNotPass').enable();
  //审核通过
  $('#_auditPass').enable();
  //审核不通过
  $('#_auditNotPass').enable();
  //核定通过
  $('#_vouchPass').enable();
  //核定不通过
  $('#_vouchNotPass').enable();
 }
 function disabl4Hw(){
	 //提交 
	 $("#_dealSubmit").disable();
 }
  //将所有操作置为不可用
 function disableOperation(){ 
  //提交 
  $("#_dealSubmit").disable();
  //存为草稿
  $('#_dealSaveDraft').disable();
  //暂存待办
  $('#_dealSaveWait').disable();
  //态度
  $("input[name='attitude']").disable();
  //加签
  $("#_dealAddNode_a,#_commonAddNode_a").disable();
  //知会
  $("#_dealAddInform_a,#_commonAddInform_a").disable();
  //当前会签
  $("#_dealAssign_a,#_commonAssign_a").disable();
  //减签
  $("#_dealDeleteNode_a,#_commonDeleteNode_a").disable();
  //回退
  $("#_dealStepBack_a,#_commonStepBack_a").disable();
  //转发
  $("#_dealForward_a,#_commonForward_a").disable();
  //终止
  $("#_dealStepStop_a,#_commonStepStop_a").disable();
  //撤销流程
  $("#_dealCancel_a,#_commonCancel_a").disable();
  //修改附件
  $("#_commonUpdateAtt_a,#_dealUpdateAttachment_a").disable();
  //签章
  $("#_commonSign_a,#_dealSign_a").disable();
  // 指定回退
  $("#_dealSpecifiesReturn_a").disable();
  //修改正文
  $('#_commonEditContent_a,#_dealEditContent_a').disable();
  //督办设置开始
  $("#_commonSuperviseSet_a,#_dealSuperviseSet_a").disable();
  //转事件
     $("#_dealTransform_a,#_commonTransform_a").disable();
  //意见隐藏
  $("#isHidden").disable();
  //跟踪
  $("#isTrack").disable();
  //处理后归档
  $('#pigeonhole').disable();
  //常用语
  $('#cphrase').disable();
  //更多
  $('#moreLabel').disable();
  //消息推送
  $('#pushMessageButton').disable();
  //关联文档
  $('#uploadRelDocID').disable();
  //附件
  $('#uploadAttachmentID').disable();
  //通过并发布
  $('#_dealPass1').disable();
  //不通过
  $('#_dealNotPass').disable();
  //审核通过
  $('#_auditPass').disable();
  //审核不通过
  $('#_auditNotPass').disable();
  //核定通过
  $('#_vouchPass').disable();
  //核定不通过
  $('#_vouchNotPass').disable();
 }
//将‘提交’按钮由'禁用'状态改为'可用'
 function releaseApplicationButtons(){
	 mainbody_callBack_failed();
 }

 //ajax判断事项是否可用。
 function isAffairValid(affairId){
   var cm = new colManager();
   var msg = cm.checkAffairValid(affairId);
   if($.trim(msg) !=''){
        $.messageBox({
            'title' : $.i18n('collaboration.system.prompt.js'), //系统提示
            'type': 0,
            'imgType':2,
            'msg': msg,
           ok_fn:function(){
                enableOperation();
                setButtonCanUseReady();
                closeCollDealPage();
           }
         });
        
        return false;
   }
   return true;
 }
 
 /**
  * 示例代码
  * 所保护字段
  * DocForm.SignatureControl.FieldsList="XYBH=协议编号;BMJH=保密级别;JF=甲方签章;HZNR=合作内容;QLZR=权利责任;CPMC=产品名称;DGSL=订购数量;DGRQ=订购日期"      
  */
 function getProjectField4Form(){
	 var projectArr=new Array();
     var projectData= "";
	 var projectValue= "";
     var ff = new Properties();
     var form  = componentDiv.getFieldVals4hw();
     projectArr.push(form.displayStr);
     projectArr.push(form.valueStr);
     return projectArr;
 }
 
 /**
  * 1、HTML编辑状态不能盖章
  * 2、对修改正文的地方增加限制：已经加盖了专业签章的地方不能修改正文
  * 3、表单数据域保护
  */
 function openSignature(){
   if(isSpecifiesBack()){
       return;
   }
   //添加正文锁
   var lockWorkflowRe = lockWorkflow(summaryId, _currentUserId, -1);
   if(lockWorkflowRe[0] == "false"){
       $.alert(lockWorkflowRe[1]);
       return;
   }
   //表单正文和HTML标准正文加盖isignaturehtml专业签章
   if(bodyType=="10"||bodyType=="20"){
       try{
           //非IE浏览器不支持专业签章
           if(!$.browser.msie){
               $.alert($.i18n("collaboration.alert.isignature.not.ie"));
               return;
           }
           if (!componentDiv.isInstallIsignatureHtml()) {
               $.alert($.i18n("collaboration.client.not.installed.professional.signature"));
               return ;
           }
           var projectArr = new Array();
           if(bodyType=="20"){
               projectArr =getProjectField4Form();
           }
           componentDiv.doSignature(projectArr);
           
       }catch(e){
           $.alert($.i18n("collaboration.client.not.installed.professional.signature"));
           return false;
       }
       
   }else{
     componentDiv.checkOpenState();
     componentDiv.WebOpenSignature();
     componentDiv.officeEditorFrame.document.getElementById("WebOffice").EditType = "4,0";
     $(window.componentDiv)[0].$("#officeTransIframe").remove();
     $(window.componentDiv)[0].$("#officeFrameDiv").show();

   }  
   //设置正文为编辑状态
   var fnx =$(window.componentDiv)[0];
   fnx.$("#viewState").val("1");
 }
 function popupContentWin(){
   componentDiv.checkOpenState();
   componentDiv.fullSize();
 }
 //保存 ISiginature HTML 专业签章
 function saveISignature(){
     try{
         var bodyTypeStr = $("#bodyType").val();
         var flag = true;
         if(bodyTypeStr == '10' || bodyTypeStr == '20'){
             flag = componentDiv.saveISignatureHtml();
         }
         return flag;
     }catch(e){
         return false;
     }
     return true;
 }


 function downloadAttrList(fileUrl,uploadTime,fileName,fileType,v){
   var url=_ctxPath + "/fileDownload.do?method=download&v="+v+"&fileId="+fileUrl+"&createDate="+uploadTime+"&filename="+encodeURIat(fileName);
   if($.trim(fileType)!==""){
     url+="."+fileType;
   }
   $("#downloadFileFrame").attr("src",url);
 }
 
//指定回退
 function specifiesReturn() {
   // 指定回退状态
     if(isSpecifiesBack()){
       enableOperation();
     setButtonCanUseReady();
       return;
     }
     if (!dealCommentTrue()){
       enableOperation();
       setButtonCanUseReady();
         return;
     }
   
     stepBackToTargetNode(getCtpTop(), getCtpTop(),
         _summaryItemId,_summaryProcessId,
         _summaryCaseId, _summaryActivityId,
         stepBackToTargetNodeCallBack,
         show1, show2,isFromTemplate);
 }
 
 function stepBackToTargetNodeCallBack(workitemId, processId, caseId, activityId, theStepBackNodeId, submitStyle, falshDialog) {
   falshDialog.close();
   var domains = [];
   if($.content.getContentDealDomains(domains)) {
	   var jsonSubmitCallBack = function(){
		   $("#layout").jsonSubmit({
			   action : _ctxPath+ "/collaboration/collaboration.do?method=updateAppointStepBack"
			   +"&workitemId="+workitemId
			   +"&processId="+processId
			   +"&caseId="+caseId
			   +"&activityId="+activityId
			   +"&theStepBackNodeId="+theStepBackNodeId
			   +"&submitStyle="+submitStyle
			   +"&summaryId="+summaryId
			   +"&affairId="+affairId,
			   domains : domains,
			   callback:function(data){
				   closeCollDealPage();
			   }
		   });
	   };

	   //V50_SP2_NC业务集成插件_001_表单开发高级
	   formDevelopAdance4ThirdParty(bodyType,affairId,"stepBack", $("#content_deal_comment").val(),null,jsonSubmitCallBack);

   };
 }
 

 /**
  * 加表单同步锁
  */
  function formAddLock(){
    var callerResponder = new CallerResponder();
    callerResponder.success = function(jsonObj) {
      if(jsonObj && jsonObj.owner != _currentUserId){
        $.alert(jsonObj.loginName + $.i18n('collaboration.common.flag.editingForm'));  //正在编辑表单
        $("#_dealDiv").hide();
        $("#_dealStepBack,#_commonStepBack").addClass("back_disable_color").disable();//回退
        $("#_dealCancel_a,#_commonCancel_a").addClass("back_disable_color").disable();//撤销
        $("#_dealStepStop,#_commonStepStop").addClass("back_disable_color").disable(); //终止 
        $("#_dealSpecifiesReturn").addClass("back_disable_color").disable();//指定回退
        $("#_dealSpecifiesReturn_a").addClass("back_disable_color").disable();
      }
    };
    var cm = new colManager();
    cm.formAddLock($("#affairId").val(), callerResponder);
  }
 
  /**
   * 修改完流程，解除流程同步锁
   */
  function colDelLock(affairId){
    if(typeof(colManager) == 'function'){
        var cm = new colManager();
        cm.colDelLock(affairId);
    }
  }
 
  /**
   * 向具体位置中增加附件
   */
  function addAttachmentPoiDomain(type, filename, mimeType, createDate, size, fileUrl, canDelete, needClone, description, extension, icon, poi, reference, category, onlineView, width, embedInput) {
    canDelete = canDelete == null ? true : canDelete;
    needClone = needClone == null ? false : needClone;
    description = description ==null ? "" : description;
    if(attachDelete != null) canDelete = attachDelete;
    if(fileUrl == null){
      fileUrl=filename;
    }
    var attachment = new Attachment('', '', '', '', type, filename, mimeType, createDate, size, fileUrl, description, needClone,extension,icon, false);
    attachment.showArea=poi;
    attachment.embedInput=embedInput;
   
    fileUploadAttachments.put(fileUrl, attachment);
    showAtachmentObject(attachment, canDelete, null);
    //更新关联文档隐藏域
    var file=attachment;
    if(file.type==2  && $("#"+file.embedInput).size()>0){
        var assArray =new Array();
        if($("#"+file.embedInput).attr("value")){
          assArray=$("#"+file.embedInput).attr("value").split(",");
        }
       
        if(!assArray.contains(file.fileUrl)){
          assArray.push(attachment.fileUrl);
        }
        $("#"+file.embedInput).attr("value", assArray);
    }
    showAtachmentTR(type,'',poi);
    if(attachCount)
      showAttachmentNumber(type,attachment);
    if(typeof(currentPage) !="undefined" && currentPage== "newColl"){
      addScrollForDocument();
    }
  }
   
function updateAtt(processId,summaryId){
    var lockWorkflowRe = lockWorkflow(summaryId, _currentUserId, 16);
    if(lockWorkflowRe[0] == "false"){
        $.alert(lockWorkflowRe[1]);
        return;
    }
    // 取得要修改的附件
    var attachmentList = new ArrayList();
    var keys = fileUploadAttachments.keys();
    // 过滤非正文区域的附件
    var keyIds=new ArrayList();
    for(var i = 0; i < keys.size(); i++) {
    	var att = fileUploadAttachments.get(keys.get(i));
    	if(att.showArea=="showAttFile"||att.showArea=="Doc1"){
    		attachmentList.add(att);
    		keyIds.add(keys.get(i));
    	}
    }
    var result = editAttachments(attachmentList,summaryId,summaryId,'1');
    if(result){
    	// 标记协同内容有变化，关闭页面时需进行判断
    	summaryChange();
    	// 将修改后的附件，与本地更新。
    	var toShowAttTemp=new ArrayList();
    	for(var i = 0; i < theToShowAttachments.size(); i++) {
    		var att  = theToShowAttachments.get(i);
    		toShowAttTemp.add(att);
    	}
    	for(var i = 0; i < toShowAttTemp.size(); i++) {
    		var att  = toShowAttTemp.get(i);
    		if(att.showArea!="showAttFile"&&att.showArea!="Doc1"){
    			theToShowAttachments.remove(att);
    		}
    	}
    	theToShowAttachments=new ArrayList();
    	updateAttachmentMemory(result,summaryId,summaryId,'');
    }else{
    	theToShowAttachments=attachmentList;
    	return;//沒有修改附件直接返回
    }
    try{
    	clearAttOrDocShowArea("attachmentNumberDivshowAttFile");
    	clearAttOrDocShowArea("attachmentAreashowAttFile");
    	clearAttOrDocShowArea("attachment2NumberDivDoc1");
    	clearAttOrDocShowArea("attachment2AreaDoc1");
    	hideTr("attachmentTRshowAttFile");
    	hideTr("attachment2TRDoc1");
    }catch(e){
    	
    }
    for(var k=0;k<keyIds.size();k++){
    	fileUploadAttachments.remove(keyIds.get(k));
    }
    for(var i=0;i<theToShowAttachments.size();i++){
    	var att = theToShowAttachments.get(i);
    	var poi;
    	if(att.type==0){
    		poi='showAttFile';
    	}else if(att.type==2){
    		poi='Doc1';
    	}
    	addAttachmentPoiDomain(att.type, att.filename, att.mimeType, att.createDate ? att.createDate.toString() : null, att.size,
        att.fileUrl, false, false, 
        att.description, att.extension, att.icon, poi, att.reference, 
        att.category, true);
    }
    $("#attFileDomain").html("");
    $("#assDocDomain").html("");
    saveAttachmentPart("attFileDomain");
    saveAttachmentPart("assDocDomain");
    saveAttachmentActionLog();
    summaryHeadHeight();
}
function saveAttachmentActionLog(){
  if(typeof(attActionLog) != 'undefined' && attActionLog){
      var result = "";
      var attLogListObj=$("#attActionLogDomain");
      if(attActionLog.logs != null && typeof(attActionLog.logs) != 'undefined' ){
          for(var i = 0 ; i< attActionLog.logs.size();i++){
        	  var attObj=attActionLog.logs.get(i);
        	  if(!checkIsExist(attLogListObj,attObj)){
        		  result += attActionLog.logs.get(i).toInput();
        	  }
          }
      }
      $("#attActionLogDomain").append($(result));
  }
}
//检查当前的attActionLog是否已经记录了这个附件
function checkIsExist(attLogListObj,attObj){
	var attTitle=attObj.des;
	for(var i=0;i<attLogListObj.size();i++){
		var attLogObj=attLogListObj.get(i);
		var attLogHTML="";
		if(attLogObj&&attLogObj.innerHTML){
			attLogHTML=attLogObj.innerHTML;
		}
		if(attLogHTML==""&&attLogObj&&attLogObj.outerHTML){
			attLogHTML+=attLogObj.outerHTML;
		}
		if(attLogHTML&&attLogHTML.indexOf(attTitle)!=-1){
			return true;
		}
	}
	return false;
}
function clearAttOrDocShowArea(id){
  var showDiv = document.getElementById(id);
  if(showDiv){
    showDiv.innerHTML="";
  }
}
function hideTr(attachmentTrId){
  var attachmentTr = document.getElementById(attachmentTrId);
  if(attachmentTr){
    attachmentTr.style.display = "none";
  }
}

function transmitColById(data){
  var dataStr = "";
  for(var i = 0; i < data.length; i++){
      dataStr += data[i]["summaryId"] + "_" + data[i]["affairId"] + ",";
  }
  
  var commentAttFiles = [];
  var commentAttDocs = [];
  
  var atts = fileUploadAttachments.values();
  for (var i = 0; i < atts.size(); i++) {
      var att = atts.get(i);

      if(att.showArea != commentId){
          continue;
      }
      
      var attjson = att.toJson();
      var attjsonObj = $.parseJSON(attjson);
      
      attjsonObj.needClone = true;
      attjsonObj.extReference = "";
      attjsonObj.extSubReference = "";
      
      if(att.type == "2" || att.type == "4"){ //关联文档
          commentAttDocs[commentAttDocs.length++] = $.toJSON(attjsonObj);
      }
      else{ //文件附件
          commentAttFiles[commentAttFiles.length++] = $.toJSON(attjsonObj);
      }
  }
  
  var dialog = $.dialog({
      id : "showForwardDialog",
      url : _ctxPath+'/collaboration/collaboration.do?method=showForward&data=' + dataStr,
      title : $.i18n('collaboration.transmit.col.label'),
      targetWindow: getCtpTop(),
      transParams:{
          commentContent : $("#content_deal_comment").val(),
          commentAttFiles : "[" + commentAttFiles.join(",") + "]",
          commentAttDocs : "[" + commentAttDocs.join(",") + "]"
      },
      buttons: [{
          id : "okButton",
          text: $.i18n("common.button.ok.label"),
          handler: function () {
             var rv = dialog.getReturnValue();
             if(rv == -1){
                 
             }
             else{
                 $.alert($.i18n('collaboration.forward.forwardSuccess')); //转发成功!
                 dialog.close();
             }
          },
          OKFN : function(){
              dialog.close();
          }
      }, {
          id:"cancelButton",
          text: $.i18n("common.button.cancel.label"),
          handler: function () {
              dialog.close();
          }
      }]
  });
}
/**
 * 转会议接口，页面之间跳转到新建会议页面
 * @param affairId 
 * @param collaborationFrom
 * @param frameObj     需要跳转到新建会议的框架
 * @param closeWin     是否关闭当前窗口，true：关闭；false：不关闭
 */
function createMeeting(affairId,collaborationFrom,frameObj,closeWin){
    if($.ctx.plugins.contains('meeting')){ 
          if(!frameObj){
            frameObj = window.dialogArguments.frames['main'];
            if(!frameObj){
              frameObj = window.dialogArguments.getCtpTop().frames['main'];
            }
          }
          var  url = _ctxPath + "/meetingNavigation.do?method=entryManager&entry=meetingArrange&listType=listSendMeeting&listMethod=create&affairId="+affairId+"&collaborationFrom="+collaborationFrom+"&formOper=new";

          if(closeWin == true){
              var jsonObj = {"openPage":"createMeeting","frameObj":frameObj, "url":url};
              getCtpTop().callTopFrameMethod(jsonObj); 
          } else {
              frameObj.location.href = url;
              if (typeof(frameObj.dialogDealColl)!='undefined' &&frameObj.dialogDealColl!=null) {
                  frameObj.dialogDealColl.close();
              } 
          }
    } 
}


function doSearch(flag){
  if(typeof(flag)=='undefined' || flag == null){
      flag = 'forward';
  }
  var t = document.getElementById('searchText').value;
  componentDiv.$.content.commentSearchCreate(t, flag);
  return false;
}
function enterKeySearch(e) {
  var c;
  if ("which" in e) {
    c = e.which;
  } else if ("keyCode" in e) {
    c = e.keyCode;
  }
  if (c == 13) {
    doSearch("forward");
  }
}

function advanceViews(flag,obj) {
  var processAdvanceDIVObj = document.getElementById("processAdvanceDIV");
  var isDisplay = flag;
  if(flag == null){
      isDisplay = processAdvanceDIVObj.style.display == "none";
  }
  if(isDisplay){
      //判断当前是否是office插件
      if (bodyType >= 40 && bodyType<=45 && !_isOfficeTrans) {
          processAdvanceDIVObj.style.top = ($(obj).offset().top-40)+"px";
      } else {
          processAdvanceDIVObj.style.top = ($(obj).offset().top+20)+"px";
      }
      processAdvanceDIVObj.style.display = "";
      if(document.getElementById("processAdvance"))
          document.getElementById("processAdvance").innerHTML = "<font style='color:#5A5A5A;'>&gt;&gt;</font>";
  }else{
      processAdvanceDIVObj.style.display = "none";
      if(document.getElementById("processAdvance"))
          document.getElementById("processAdvance").innerHTML = "<font style='color:#5A5A5A;'>&gt;&gt;</font>";
  }
}

//跟踪
function setTrack(){
   var dialog = $.dialog({
     targetWindow:getCtpTop(),
     id: 'dialog',
     url: _ctxPath+'/collaboration/collaboration.do?method=openTrackDetail&objectId='+summaryId+'&affairId='+affairId,
     width: 200,
     height: 100,
     title: $.i18n('collaboration.listDone.traceSettings'),
     buttons: [{
         text: $.i18n('collaboration.pushMessageToMembers.confirm'), //确定
         handler: function () {
              var returnValue = dialog.getReturnValue();
              dialog.close();
              if(openFrom = "listSent"  && window.parent && window.parent.$('#listSent')[0]){
 									window.parent.$('#listSent').ajaxgridLoad();
 							}
  						if(openFrom = "listDone"  && window.parent && window.parent.$('#listDone')[0]){
 										window.parent.$('#listDone').ajaxgridLoad();
 							}
         }
     }, {
         text: $.i18n('collaboration.pushMessageToMembers.cancel'), //取消
         handler: function () {
             dialog.close();
         }
     }]
 });
}

/**
 * 查看属性设置信息 弹出对话框
 */
function attributeSettingDialog(affairId){
    var dialog = $.dialog({
        url : _ctxPath+'/collaboration/collaboration.do?method=getAttributeSettingInfo&affairId='+affairId,
        width : 500,
        height : 450,
        targetWindow:openType,
        title : $.i18n('collaboration.common.flag.findAttributeSetting'),  // 查看属性状态设置
        buttons : [{
            text :$.i18n('collaboration.dialog.close'),//关闭
            handler : function() {
              dialog.close();
            }
        }]
    });
}
function showDetailLogFunc(){
  showDetailLogDialog(summaryId,_summaryProcessId);
}
/**
* 明细日志 弹出对话框
*/
function showDetailLogDialog(summaryId,processId){
  var dialog = $.dialog({
      url : _ctxPath+'/detaillog/detaillog.do?method=showDetailLog&summaryId='+summaryId+'&processId='+processId,
      width : 800,
      height : 400,
      title :$.i18n('collaboration.sendGrid.findAllLog'), //查看明细日志
      targetWindow:openType,
      buttons : [{
          text : $.i18n('collaboration.dialog.close'),
          handler : function() {
            dialog.close();
          }
      }]
  });
}
//回退（用于处理协同的业务逻辑处理）
function stepBackCallBack(){
  //置灰
  disableOperation();
    var confirm = "";
    if (!dealCommentTrue()){
      enableOperation();
      setButtonCanUseReady();
        return;
    }
    //调用工作流函数判断是否能够回退
    var obj = canStepBack(_contextItemId,_contextProcessId,_contextActivityId,_contextCaseId);
    //不能回退
    if(obj[0] === 'false'){
        $.alert(obj[1]);
        enableOperation();
        setButtonCanUseReady();
        return;
    }
    var lockWorkflowRe = lockWorkflow(_contextProcessId,_currentUserId, 9);
    if(lockWorkflowRe[0] == "false"){
        $.alert(lockWorkflowRe[1]);
        enableOperation();
        setButtonCanUseReady();
        return;
    }
    
    if(!isAffairValid(affairId)) return;
    
    confirm = $.confirm({
        'msg':$.i18n('collaboration.confirmStepBackItem'),
        ok_fn: function () {
          
            var fnx =$(window.componentDiv)[0];
            fnx.$.content.getContentDomains(function(domains) {
                if($.content.getContentDealDomains(domains)) {
                	
                	var jsonSubmitCallBack = function(){
                		 domains.push('attFileDomain');
                         domains.push('assDocDomain');
                         domains.push('attActionLogDomain');
                       
			        	 $("#layout").jsonSubmit({
		                        action : _ctxPath + '/collaboration/collaboration.do?method=stepBack&affairId='+affairId+'&summaryId='+summaryId,
		                        domains : domains,
		                        validate:false,
		                        callback:function(data){
		                          closeCollDealPage();
		                        }
		                 });
			        };
			        //V50_SP2_NC业务集成插件_001_表单开发高级
			        formDevelopAdance4ThirdParty(bodyType,affairId,"stepBack", $("#content_deal_comment").val(),null,jsonSubmitCallBack);
			        
                   
             }
           },'stepBack');
         },
        cancel_fn:function(){
            releaseWorkflowByAction(_contextProcessId, _currentUserId, 9);
            enableOperation();
            setButtonCanUseReady();
            confirm.close();
        },
        close_fn:function(){
          enableOperation();
          setButtonCanUseReady();
        }
    });
}

//弹出 更多操作
function showMessageBox2() {
    var dialog = new MxtDialog({
        width: 100,
        height: 190,
        type: 'panel',
        htmlId: 'img_more',
        targetId: 'img_more_btn',
        targetWindow:getCtpTop(),
        shadow: false,
        panelParam: {
            'show': false,
            'margins': false
        }
    });

    $('#img_more').mouseleave(function () {
        dialog.close();
    });
}


function refreshWorkflow(callBackObj){
  // 加签的情况
  if(callBackObj && (callBackObj.type == 1 
      || callBackObj.type == 2 
      || callBackObj.type == 3 
      || callBackObj.type == 4)){
    summaryChange();
  }
  showWorkFlowView();
  var isTemplate = isFromTemplate;
 
  var wfurl = _ctxPath+"/workflow/designer.do?method=showDiagram&isModalDialog=false&isDebugger=false&isTemplate="+isTemplate+"&scene="+_scene+"&processId="+_contextProcessId+"&caseId="+_contextCaseId+"&currentNodeId="+_contextActivityId+"&appName=collaboration&formMutilOprationIds="+operationId;
  if(openFrom=='supervise' && summaryReadOnly !=='true'){
      wfurl+="&showHastenButton=true";
  }else{
     //加载流程页面 待办、已办、已发、
     if(affairState == '1'){//协同-待发
          wfurl += "&currentUserName="+_currentUserName+"&currentUserId="+_currentUserId;
     }else{
         if((affairState == '2'||(affairState == '4' && isCurrentUserSupervisor=='true')) 
             && isFinshed!="true" && openFrom!='glwd'&& openFrom!='subFlow' && summaryReadOnly!=='true'){
             wfurl+="&showHastenButton=true";
         }
     }
  }
  $("#iframeright").attr("src",encodeURI(wfurl));
}

function superviseSettingFunc(){
    var col = new colManager(); 
    var retVal = col.checkTemplateCanModifyProcess(templateId);
    var mflag = false;
    if("no" == retVal.canModify){
        mflag = true;
    }
    if("no" == retVal.canSetSupervise){
      mflag = true;     
    }
    if( isFinish == true || mflag){
        $.alert($.i18n('collaboration.cannotSupervise_flow_end_or_template2'));
        return false;
    }
    openSuperviseWindow(1,true,summaryId,templeteId,null,_startMemberId);
}

//刷新流程图 （用于修改流程时回调）
var isWorkflowChange = false;
function summaryChange(){
  isWorkflowChange = true;
  var dialogDealColl = parent.dialogDealColl;
  if(dialogDealColl){
    dialogDealColl.isWorkflowChange = true;
  }
  if(!(window.parentDialogObj && window.parentDialogObj['dialogDealColl'])){
    $.confirmClose();
  }
}
//流程图展现
function showWorkFlowView(){
    $("#content_view_li").removeClass("current");
    $("#workflow_view_li").addClass("current");
    $("#display_content_view").hide();
    $("#iframeright").show();
    $("#componentDiv").hide();
    //1.如果是 督办未结办时 显示修改流程按钮
    //2.如果是已办列表中当前用户是督办人，并且流程未结束 显示修改流程按钮
    if((isSupervise||isCurSuperivse) && !isFinish){
        $("#show_edit_workFlow").show();
        var attachment = $("#attachmentAreashowAttFile .attachment_block").length;
        var realDoc = $("#attachment2AreaDoc1 .attachment_block").length;
        if(attachment == 0 && realDoc == 0){
          $('.stadic_body_top_bottom').css('top','120px');
        }else if(attachment != 0 || realDoc != 0){
          $('.stadic_body_top_bottom').css('top',$(".stadic_head_height").height()+5);
        }
    }
}

//正文展现
function showContentView(){
  $("#workflow_view_li").removeClass("current");
  $("#content_view_li").addClass("current");
  $("#iframeright").hide();
  $("#componentDiv").show();
  $("#display_content_view").show();
  //将'修改流程'按钮隐藏,并且把样式上移
  $("#show_edit_workFlow").hide();
  var attachment = $("#attachmentAreashowAttFile .attachment_block").length;
  var realDoc = $("#attachment2AreaDoc1 .attachment_block").length;
  if(attachment == 0 && realDoc == 0){
    $('.stadic_body_top_bottom').css('top','90px');
  }else if(attachment != 0 || realDoc != 0){
      $('.stadic_body_top_bottom').css('top',$(".stadic_head_height").height()+10);
  }
}

function superviseFunc(){
    showSuperviseWindow(summaryId,1,isFinish,templateId);
}
/*
 * 表单开发高级 : V50_SP2_NC业务集成插件_001_表单开发高级
 * @param bodyType ：正文类型
 * @param affairId :affairId
 * @param attitude :态度
 * @param opinionContent ：意见内容
 * @param currentDialogWindowObj ：当前Dialog对象
*/
function formDevelopAdance4ThirdParty(bodyType,affairId,attitude,opinionContent,currentDialogWindowObj,succesCallBack) {
  try{
	  function failedCallBack(){
		  enableOperation();
	  }
	  if(bodyType != '20' ){
		  succesCallBack();
	  }else {
		  beforeSubmit(affairId, $.trim(attitude), $.trim(opinionContent),currentDialogWindowObj,succesCallBack,failedCallBack);
	  }
   }catch(e){
	   alert("表单开发高级异常!");
   } 
}
function addOne(n){
    return parseInt(n)+1;
}
//提交回调函数
var subCount=0;
function submitFunc(){
     subCount = addOne(subCount);
	 if(parseInt(subCount)>=2){
	        //不能重复提交，用最原生的alert，$.ALERT不能阻塞，太慢了才弹出
	        alert("不能重复提交！");
	        subCount = 0;
	        return;
	    }
	try{showMask();}catch(e){}
    var fnx =$(window.componentDiv)[0];
    var domains =[];
    
    if(!isAffairValid(affairId)) {
        try{hideMask();}catch(e){}
        subCount=0;
    	return;  
    }
    var sbcallback = function(domains) {
      //保存ISignaturehtml专业签章
      if(!saveISignature(1)){
        enableOperation();
        setButtonCanUseReady();
        subCount=0;
        try{hideMask();}catch(e){}
        return;
      }
      
      //OFFICE正文中直接点修改按钮，不是“正文修改”菜单进去的，这种情况下会这种contentUpdate变量为true;
      if(fnx.contentUpdate) fnx.$("#viewState").val("1");
      
      //保存正文
      if(fnx.$("#viewState").val()=="1" || bodyType=='20'){ 
        var domains =[];
        fnx.saveOrUpdate({
            success:bulnewsAudit,
            failed:mainbody_callBack_failed,
            needSubmit:true,
            "mainbodyDomains":domains
          });
       }else{
    	   bulnewsAudit();
       }
     };
     //公告新闻审核提交
     var bulnewsAudit=function(){
    	 if (nodePolicy == "bulletionaudit" ) {
             bulletinIssue(summaryId,affairId,bodyType,sub,rightId);
             return ;
         }else if (nodePolicy == "newsaudit" ){
    		 newsIssue(summaryId,affairId,bodyType,sub,rightId);
          	 return ;
    	 }else{
    		 sub();
    	 }
     }
      var sub = function(){
        if($.content.getContentDealDomains(domains)) {
          var path = _ctxPath + '/collaboration/collaboration.do?method=finishWorkItem&affairId='+affairId;
          // 归档信息
          var pigeonholeValue = $("#pigeonholeValue").val();
          if(pigeonholeValue && pigeonholeValue != "cancel"){
            var pigeonhole = pigeonholeValue.split(",");
            path += '&pigeonholeValue=' + pigeonhole[0];
            var cm = new colManager();
            var aids= [];
            aids.push(affairId);
            var jsonObj = cm.getIsSamePigeonhole(aids,pigeonhole[0]);
            if(jsonObj && !confirm(jsonObj)){
            	enableOperation();
            	subCount=0;
                try{hideMask();}catch(e){}
            	return;
            }
          }
          domains.push('colSummaryData');
          domains.push('trackDiv_detail');
          domains.push('superviseDiv');
          domains.push('workflow_definition');
          domains.push('attFileDomain');
          domains.push('assDocDomain');
          domains.push('attActionLogDomain');
          domains.push(fnx.getMainBodyDataDiv());
          
          var jsonSubmitCallBack = function(){
        	  $("#layout").jsonSubmit({
              action : path,
              domains : domains,
              isMask : false,
              callback:function(data){
        		  try{hideMask();}catch(e){}
        		  subCount=0;
                  closeCollDealPage();
              }
            });
          }

          //V50_SP2_NC业务集成插件_001_表单开发高级
          formDevelopAdance4ThirdParty(bodyType,affairId,$("input[name='attitude']:checked").val(), $("#content_deal_comment").val(),null,jsonSubmitCallBack);
        
          
          
          
        }
      }
      var wffinish = function(contentObj) {
        var domains =[];
        $.content.getWorkflowDomains($("#moduleType").val(), domains);
        $.content.callback.workflowFinish = function() {
          sbcallback(domains);
        };
        fnx.preSubmitData(function(){
            preSendOrHandleWorkflow(window, _contextItemId,_contextProcessId, _contextProcessId,
                _contextActivityId,_currentUserId,_contextCaseId,_loginAccountId,
                formRecordid, _moduleTypeName, $("#process_xml").val(), false);
        },mainbody_callBack_failed,true);
      };
      
    wffinish();
}
//正文保存失败
function mainbody_callBack_failed(){
  enableOperation();
  setButtonCanUseReady();
  subCount=0;
  try{hideMask();}catch(e){}
  return;
}
function doZCDB(){
  try{showMask();}catch(e){}
  var fnx =$(window.componentDiv)[0];
  var domains =[];
  if(!isAffairValid(affairId)) {
	try{hideMask();}catch(e){}
    return;  
  }
  var sbcallback = function(domains) {
    //保存ISignaturehtml专业签章
    if(!saveISignature(1)){
      enableOperation();
      setButtonCanUseReady();
      try{hideMask();}catch(e){}
      return;
    }
    
    //OFFICE正文中直接点修改按钮，不是“正文修改”菜单进去的，这种情况下会这种contentUpdate变量为true;
    if(fnx.contentUpdate) fnx.$("#viewState").val("1");
    
    if(fnx.$("#viewState").val()=="1" || bodyType=='20'){ 
      var domains =[];
      fnx.saveOrUpdate({
          success:sub,
          failed:mainbody_callBack_failed,
          needSubmit:true,
          "mainbodyDomains":domains,
          checkNull:false,
          needCheckRule:false
        });
     }else{
        sub();
     }
  }

  var sub = function(){
        if($.content.getContentDealDomains(domains)) {
          domains.push('colSummaryData');
          domains.push('trackDiv_detail');
          domains.push('superviseDiv');
          domains.push('workflow_definition');
          domains.push('attFileDomain');
          domains.push('assDocDomain');
          domains.push('attActionLogDomain');
          
          domains.push(fnx.getMainBodyDataDiv());
          var path = _ctxPath+ '/collaboration/collaboration.do?method=doZCDB&affairId='+affairId+'&processId='+_summaryProcessId;
          $("#layout").jsonSubmit({
              action : path,
              domains : domains,
              isMask : false,
              callback:function(data){
        	      try{hideMask();}catch(e){}
                  closeCollDealPage();
              }
          });
        };
  }
    
  var wffinish = function(contentObj,domains) {
    var domains =[];
    $.content.getWorkflowDomains($("#moduleType").val(), domains);
    sbcallback(domains);
  };
 
  wffinish();
}
function closeCollDealPage(){
  var fromDialog = true;
  var dialogTemp= null;
  try{
	  if (window.parentDialogObj != undefined) {
		    dialogTemp=window.parentDialogObj['dialogDealColl'];
	  } else {
		    fromDialog = false;
	  }
	  if (fromDialog) {
		  var _win = window.parent.$("#main")[0].contentWindow;
	      if (_win != undefined && _win.loadPendingGrid != undefined) {
	    	  _win.loadPendingGrid();
	    	  dialogTemp.close();
	      }
	  } else {
		  window.parent.loadPendingGrid();
	  }
      try{window.parent.$('#listStatistic').ajaxgridLoad();}catch(e){}
  }catch(e){//弹出对话框模式
  }
 
  //首页更多
  try{
    if(window.dialogArguments){
        if(typeof(window.dialogArguments.callbackOfPendingSection) == 'function'){
          var iframeSectionId=window.dialogArguments.iframeSectionId;
            var selectChartId=window.dialogArguments.selectChartId;
            var dataNameTemp=window.dialogArguments.dataNameTemp;
            window.dialogArguments.callbackOfPendingSection(iframeSectionId,selectChartId,dataNameTemp);
            if(dialogTemp!=null&&typeof(dialogTemp)!='undefined'){
                dialogTemp.close();
            } 
            return;
        }
        if(typeof(window.dialogArguments.callbackOfEvent) == 'function'){
          window.dialogArguments.callbackOfEvent();
          //协同V5.0 OA-45058 时间线上点击待办协同进行处理，点击提交按钮后，协同页面一直不消失
          if(dialogTemp!=null&&typeof(dialogTemp)!='undefined'){
              dialogTemp.close();
          }
          return;
        }
    }
  }catch(e){
  }
  try{
      if(fromDialog){
          if (getCtpTop().main.sectionHandler != undefined){
              getCtpTop().main.sectionHandler.reload("pendingSection",true);
          }
          dialogTemp.close();
      }
  }catch(e){
      dialogTemp.close();
  }
  //不是dialog方式打开的都用window.close
  if(!fromDialog){
    //刷新首页待办栏目
      try{
          if(getA8Top().dialogArguments){
          getA8Top().dialogArguments.main.sectionHandler.reload("pendingSection",true);
          }else{
            getA8Top().opener.main.sectionHandler.reload("pendingSection",true);
          }
      }catch(e){}
      window.close();
  }
}
//查看附件列表
function showOrCloseAttachmentList(){
  //获取正文下的附件
    var attmentList = null;
    var attmentContent =$("#componentDiv").contents().find("#mainbodyDiv a[attachmentid]");
    if (attmentContent.length > 0) {
        attmentList = new Array();
        for (var i=0;i<attmentContent.length;i++) {
            attmentList[i] = $("#componentDiv").contents().find("#mainbodyDiv a[attachmentid]").eq(i).attr('attachmentid');
        }
    }
    
    var fnx =$(window.componentDiv)[0];
    var attrs = fnx.getContentAttrs();
    var formAttrId = "";
    if($.trim(attrs) != ""){
        for(var i=0;i<attrs.length;i++){
            var id = attrs[i].fileUrl;
            if(attrs.length == 1){
                formAttrId = id;
            }else if(i < attrs.length -1){
                formAttrId += id + ",";
            }else{
                formAttrId += id;
            }
        }
    }
    var attachmentListObj = document.getElementById("attachmentList");
    if(attachmentListObj.style.display == "none"){
        attachmentListObj.style.display = "block";
        var url = _ctxPath+"/collaboration/collaboration.do?method=findAttachmentListBuSummaryId&summaryId="+summaryId+"&memberId="+_affairMemberId+"&canFavorite="+_canFavorite+"&formAttrId=" + formAttrId+"&attmentList="+attmentList;
        $("#attachmentList").attr("src",url);
    }else{
        attachmentListObj.style.display = "none";
    }
}



//将标题部分高度改为动态值
function summaryHeadHeight(){
   $("#content_workFlow").css("top",$("#summaryHead").height()+10);
}
function formAuthorityFunc(){
  var moduleIds=new Array();
  var affairIds=new Array();
  moduleIds.push(summaryId);
  affairIds.push($('#affairId').val());
  setRelationAuth(moduleIds,1,function(flag){
  var colM = new colManager();   
  var param = new Object();
  param.affairIds = affairIds;
  param.flag = flag;
  colM.updateAffairIdentifierForRelationAuth(param, {
      success: function(){ }
   });
 });
}

function getParentWindow(win){
  if(win.dialogArguments){
    return win.dialogArguments;
  }else{
    return win.opener || win;
  }
}

function timelyExchangeFun(){
    var colM = new colManager();
    colM.getColAllMemberId(summaryId, {success:
        function(members){
            try{
              var currentWin = getA8Top();
              for(var i = 0; i < 5; i++){
                if(typeof currentWin.isCtpTop != 'undefined' && currentWin.isCtpTop){
                  break;
                }else{
                  currentWin = getParentWindow(currentWin).getA8Top();
                }
              }
              
              currentWin.createCollaborationTeam(members,summaryId,escapeStringToJavascript(subject));
            }catch(e){
               $.alert($.i18n('collaboration.alert.uc.error'));
            }
        } 
    });
}
function colseProce(){
  if (proce==""){
      setTimeout(colseProce,300);
  }else{
      proce.close();
  }
}

function setIframeHeight_IE7(){
    setTimeout(function(){
            $("#content_workFlow").height($("#center").height()-$("#summaryHead").height()-10);
            $("#iframeright").height($("#content_workFlow").height());
            $("#componentDiv").height($("#content_workFlow").height());
    },0);
}

$(function(){
  if (openFrom != 'glwd' && openFrom != 'docLib'){
    openType = getCtpTop();
  } else {
    openType = window;
  }
 
  //正文加载
  proce = $.progressBar();
  //从首页portal打开时，在弹出框中添加'标题'显示
  if(window.parentDialogObj && window.parentDialogObj['dialogDealColl' ]){
     window.parentDialogObj['dialogDealColl' ].setTitle(escapeStringToJavascript(subject));
   }
  if( trackType =='1' ){
    $( "#isTrack[name=isTrack]").attr( 'checked' ,'checked' );
    $( "#label_all[for=trackRange_all]").removeClass( "disabled_color" );
    $("#label_members[for=trackRange_members]" ).removeClass( "disabled_color");
    $("#trackRange_all" ).removeAttr( 'disabled').attr( "checked" ,"checked" );
    $( "#trackRange_members").removeAttr( 'disabled' );
} else if (trackType == '2'){
    $( "#isTrack[name=isTrack]").attr( 'checked' ,'checked' );
   
    $( "#label_all[for=trackRange_all]").removeClass( "disabled_color" );
    $("#label_members[for=trackRange_members]" ).removeClass( "disabled_color");
    $( "#trackRange_all").removeAttr( 'disabled' );
    $("#trackRange_members" ).removeAttr( 'disabled').attr( "checked" ,"checked" );
}

  $.content.callback = {
      dealSubmit : function () {//提交回调函数
          isSubmitOperation = true ;
          if ($("input[name='attitude']:checked" ).val()== "collaboration.dealAttitude.disagree"){ //当态度为"不同意"时做的一些判断
              var isdealStepBackShow= false;
              var isdealStepStopShow= false;
              var isdealCancelShow= false;

              if ((nodePerm_commonActionList && nodePerm_commonActionList.contains('Return' ))
                      ||(nodePerm_advanceActionList && nodePerm_advanceActionList.contains('Return' ))){
                  isdealStepBackShow = true ;
              }
              if ((nodePerm_commonActionList && nodePerm_commonActionList.contains('Terminate' ))
                      ||(nodePerm_advanceActionList && nodePerm_advanceActionList.contains('Terminate' ))){
                  isdealStepStopShow = true ;
              }
              if ((nodePerm_commonActionList && nodePerm_commonActionList.contains('Cancel' ))
                      ||(nodePerm_advanceActionList && nodePerm_advanceActionList.contains('Cancel' ))){
                  isdealCancelShow = true ;
              }
              if (isdealStepBackShow||isdealStepStopShow||isdealCancelShow){ //节点权限没有回退、撤销、终止,系统不会弹出确认框，直接可以提交成功
              var ur=_ctxPath+"/collaboration/collaboration.do?method=disagreeDeal" ;
              if (!isdealStepBackShow){
                  ur+= "&stepBack=hidden" ;
              }
              if (!isdealStepStopShow){
                  ur+= "&stepStop=hidden" ;
              }
              if (!isdealCancelShow){
                  ur+= "&repeal=hidden" ;
              }
              if (affairState =='3' && affairSubState == '16'){
                ur+= "&disableTB=1" ;
              }
              var dialog = $.dialog({
                  url : ur,
                  title :$.i18n( 'collaboration.system.prompt.js' ), //系统提示
                  width : 300,
                  height: 100,
                  targetWindow:getCtpTop(),
                  buttons : [ {
                    text : $.i18n('collaboration.pushMessageToMembers.confirm' ), //确定
                    handler : function () {
                      var rv = dialog.getReturnValue();
                      if (rv == "continue" ){
                          dialog.close();
                          submitFunc();
                      } else if (rv == "stepBack"){
                          dialog.close();
                          stepBackCallBack();
                      } else if (rv == "stepStop"){
                          dialog.close();
                          $.content.callback.dealStepStop();
                      } else if (rv == "repeal"){
                          dialog.close();
                          $.content.callback.dealCancel();
                      }
                    }
                  }, {
                    text : $.i18n('collaboration.pushMessageToMembers.cancel' ), //取消
                    handler : function () {
                      enableOperation();
                      setButtonCanUseReady();
                        dialog.close();
                    }
                  } ],
                  closeParam:{
                     'show' :true ,
                     handler: function (){
                       enableOperation();
                       setButtonCanUseReady();
                     }
                  }
                });
              } else {
                  submitFunc();
              }
          } else {
              submitFunc();
          }
      },
      dealSaveDraft : function (){  //存为草稿
          var url = _ctxPath + '/collaboration/collaboration.do?method=doDraftOpinion&affairId=' +affairId+ '&summaryId='+summaryId;
          var domains = [];
              if ($.content.getContentDealDomains(domains)) {
                  $( "#layout" ).jsonSubmit({
                    action : url,
                      domains : domains,
                      callback: function (data){
                          $.infor($.i18n('collaboration.summary.savesucess' ));
                      }
                  });
              }
      },
      dealSaveWait : function () {//暂存待办回调函数
           if ($("#pigeonhole" ).length > 0 && $("#pigeonhole" )[0].checked){
             $.messageBox({
               'title' : $.i18n('collaboration.system.prompt.js' ), //系统提示
                  'type' : 0,
                  'imgType' :2,
                  'msg' : '暂存待办情况下，归档无效!' ,
                 ok_fn: function (){
                        doZCDB();
                        isSubmitOperation = true ;
                 }
              });
           } else {
               doZCDB();
               isSubmitOperation = true ;
           }
      },
      dealForward : function (){
          transmitColById([{ "summaryId" : summaryId, "affairId" :affairId}]);
      },
      dealStepStop : function (){//终止
          var lockWorkflowRe = lockWorkflow(_summaryProcessId, _currentUserId, 11);
          if (lockWorkflowRe[0] == "false" ){
              $.alert(lockWorkflowRe[1]);
              enableOperation();
              setButtonCanUseReady();
              return ;
          }
         
          if (!isAffairValid(affairId)) return;
         
          var confirm = "" ;
          confirm = $.confirm({
              'msg' : $.i18n('collaboration.confirmStepStopItem' ),
              ok_fn: function () {
                 
                 var fnx =$(window.componentDiv)[0];
                 if(fnx.contentUpdate) fnx.$("#viewState").val("1");
                 //保存正文
                 if(fnx.$("#viewState").val()=="1" || bodyType=='20'){ 
                   var domains =[];
                   var isSubmitFlag = false;
                   fnx.saveOrUpdate({
                       needSubmit:true,
                       checkNull:false,
                       needCheckRule:false,
                       "mainbodyDomains":domains,
                       success:function(){},
                       failed:function(){
                    	   enableOperation();
                    	   setButtonCanUseReady();
                    	   isSubmitFlag = true;
                       }
                     });
                 	}
                 if(isSubmitFlag){
                	 return;
                 }
                 fnx.$.content.getContentDomains( function (domains) {
                     if ($.content.getContentDealDomains(domains)) {
                    	 
                    	 var jsonSubmitCallBack = function(){
                        	 $( "#east" ).jsonSubmit({
                                 action : _ctxPath+ '/collaboration/collaboration.do?method=stepStop&affairId=' +affairId,
                                 domains : domains,
                                 validate: false ,
                                 callback: function (data){
                                       closeCollDealPage();
                                 }
                             });
                         }
                    	 //V50_SP2_NC业务集成插件_001_表单开发高级
                    	 formDevelopAdance4ThirdParty(bodyType,affairId, "stepstop", $("#content_deal_comment").val(),confirm,jsonSubmitCallBack);
                         
                    	 
                   }
                 }, 'stepStop' );
               },
              cancel_fn: function (){
                  releaseWorkflowByAction(_summaryProcessId, _currentUserId, 11);
                  enableOperation();
                  setButtonCanUseReady();
                  confirm.close();
              },
              close_fn: function (){
                  enableOperation();
                  setButtonCanUseReady();
              }
          });
      },
      dealCancel : function (){//撤销流程
          //校验开始
          var _colManager = new colManager();
          var params = new Object();
          params[ "summaryId" ] = summaryId;
          //校验是否流程结束、是否审核、是否核定，涉及到的子流程调用工作流接口校验
          var canDealCancel = _colManager.checkIsCanRepeal(params);
          if (canDealCancel.msg != null){
              $.alert(canDealCancel.msg);
              enableOperation();
              setButtonCanUseReady();
              return ;
          }
          //调用工作流接口校验是否能够撤销流程
          var repeal = canRepeal('collaboration' ,_summaryProcessId,_contextActivityId);
          //不能撤销流程
          if (repeal[0] === 'false' ){
              $.alert(repeal[1]);
              enableOperation();
              setButtonCanUseReady();
              return ;
          }
          var lockWorkflowRe = lockWorkflow(_summaryProcessId,_currentUserId, 12);
          if (lockWorkflowRe[0] == "false" ){
              $.alert(lockWorkflowRe[1]);
              enableOperation();
              setButtonCanUseReady();
              return ;
          }
          if (!dealCommentTrue()){
              enableOperation();
            setButtonCanUseReady();
              return ;
          }

          if (!isAffairValid(affairId)) return;
         
          repealConfirm = $.confirm({
              'msg' : $.i18n('collaboration.confirmRepal' ),
              ok_fn: function (){
	            
                  var fnx =$(window.componentDiv)[0];
                  fnx.$.content.getContentDomains( function (domains) {
                      if ($.content.getContentDealDomains(domains)) {
                          var repealComment = $.trim($("#content_deal_comment" ).val());
                         
                          var jsonSubmitCallBack = function(){
                        	  $( "#east" ).jsonSubmit({
                                  action : _ctxPath + '/collaboration/collaboration.do?method=repeal&affairId=' +affairId+ '&summaryId='+summaryId+ '&repealComment=' + escapeStringToHTML(repealComment),
                                  domains : domains,
                                  validate: false ,
                                  callback: function (data){
                                    closeCollDealPage();
                                  }
                             });
                          }  
                          //V50_SP2_NC业务集成插件_001_表单开发高级
                          formDevelopAdance4ThirdParty(bodyType,affairId,"repeal", $("#content_deal_comment").val(),repealConfirm,jsonSubmitCallBack);
                          
                          
                      }
                  }, 'repeal' );
            },
            cancel_fn: function (){
                releaseWorkflowByAction(_summaryProcessId, _currentUserId, 12);
                enableOperation();
                setButtonCanUseReady();
                repealConfirm.close();
            },
            close_fn: function (){
              enableOperation();
              setButtonCanUseReady();
            }
         });
      },
      auditPass : function (){//审核通过
          $.content.callback.dealSubmit();
      },
      auditNotPass : function (){//审核不通过
          stepBackCallBack();
      },
      vouchPass : function (){//核定通过
          $.content.callback.dealSubmit();
      },
      vouchNotPass : function (){//核定不通过
          stepBackCallBack();
      },
      specifiesReturnFunc : function (){//指定回退
          specifiesReturn();
      }
  };
  /*设置正文编辑区域*/

  if ($.browser.msie) {
      if ($.browser.version < 8) {
          $( "#iframe_content" ).css("height" , $(".stadic_layout_body" ).height());
      }
  }
  //设置iframe高度后,再加载
  $( "#iframe_content").attr( "src" , "content_view.html" );
  //新增附言 绑定点击事件
  $( '#add_new').click( function (){
      $( '.textarea').removeClass( 'display_none' );
  });

  //新增附言取消 绑定点击事件
  $( '#cancel').click( function (){
      $( '.textarea').addClass( 'display_none' );
  });
  //跟踪 绑定点击事件，选中该 checkbox，默认选中‘全部’
  $( '#isTrack').click( function (){
      var trackRange = $( 'input:radio[name="trackRange"]' );
      if($( this ).attr('checked' )){
          trackRange.removeAttr( 'disabled' );
          //将‘全部’置为选中状态
          trackRange.get(0).checked = true ;
          //改变<label>样式
          $( '#label_all' ).removeClass('disabled_color hand' );
          $( '#label_members' ).removeClass('disabled_color hand' );
      } else{
          trackRange.attr( 'disabled' ,'true' );
          //去掉选中状态
          trackRange.removeAttr( 'checked' );
          //改变<label>样式
          $( '#label_all' ).addClass('disabled_color hand' );
          $( '#label_members' ).addClass('disabled_color hand' );
      }
  });
  var msData=[];
//流程最大化、意见查找、附件列表、收藏、跟踪、新建会议、即时交流、表单授权、属性状态、明细日志、打印、督办/督办设置
  if($( "#attachmentListFlag" ).length>0){
      msData[msData.length]={
              name:$.i18n( 'collaboration.common.flag.attachmentList' ),  // 附件列表
              className: "affix_16" ,
              handle: function (json) {
                  showOrCloseAttachmentList();
              }
          };
  }
  if($( "#gzbuttonFlag" ).length>0){
      msData[msData.length]={
              name: $.i18n( 'collaboration.forward.page.label4' ),  //跟踪
              className: "track_16" ,
              handle: function (json) {
                   setTrack();
              }
          };
  }
  if($.ctx.resources.contains( 'F09_meetingArrange' )){
    if($( "#createMeetingFlag" ).length>0) {
        msData[msData.length]={
              name: $.i18n( 'collaboration.summary.createMeeting' ),  //新建会议
              className: "ico16" ,
              handle: function (json) {
                  createMeeting(affairId,openFrom,getCtpTop().frames['main' ], true);
              }
          };
    } else {
      if($( "#createMeeting" )) {
        $( "#createMeeting" ).click( function() {
          createMeeting(affairId,openFrom,getCtpTop().frames['main' ], true);
        });
      }
    }
  }else{
	  $("#createMeetingFlag,#createMeeting").hide();
  }
  if($( "#timelyExchangeFlag" ).length>0 && hasPluginUC){
      msData[msData.length]={
              name: $.i18n( 'collaboration.summary.timelyExchange' ),  //即时交流
              className: "communication_16" ,
              handle: function (json) {
                  timelyExchangeFun();
              }
          };
  }
  if($( "#formAuthorityFlag" ).length>0){
      msData[msData.length]={
              name: $.i18n('collaboration.toolbar.relationAuthority.label' ),//表单授权
              className: "authorize_16" ,
              handle: function (json) {
                  formAuthorityFunc();
              }
          };
  }
  if($( "#attributeSettingFlag" ).length>0){
      msData[msData.length]={
              name: $.i18n('collaboration.common.flag.attributeSetting' ),  // 属性状态
              className: "attribute_16" ,
              handle: function (json) {
                  attributeSettingDialog($( '#affairId' ).val());
              }
          };
  }
  if($( "#showDetailLogFlag" ).length>0){
    msData[msData.length]={
          name: $.i18n( 'collaboration.common.flag.showDetailLog' ),  //明细日志
          className: "view_log_16" ,
          handle: function (json) {
            showDetailLogFunc();
          }
    };
  }
  if($( "#printFlag" ).length>0){
    msData[msData.length]={
            name: $.i18n( 'collaboration.newcoll.print' ),  //打印
            className: "print_16" ,
            handle: function (json) {
              newDoPrint( "summary" );
            }
        };
  }
  if($( "#showSuperviseSettingWindowFlag" ).length>0){
    msData[msData.length]={
            name: $.i18n('collaboration.common.flag.showSuperviseSetting' ),  //督办设置
            className: "setting_16" ,
            handle: function (json) {
              superviseSettingFunc();
            }
        };
  }
  if($( "#showSuperviseWindowFlag" ).length>0){
    msData[msData.length]={
            name: $.i18n( 'collaboration.common.flag.showSupervise' ),  //督办
            className: "meeting_look_1" ,
            handle: function (json) {
              superviseFunc();
            }
        };
  }
  $( "#caozuo_more").menuSimple({
      direction: "BR" ,
      data: msData
  });


  //督办设置 绑定点击事件
  $( '#showSuperviseSettingWindow').click(superviseSettingFunc);
 
  //督办绑定点击事件
  $( '#showSuperviseWindow').click(superviseFunc);
 
  //查看明细日志 绑定点击事件
  $( '#showDetailLog').click(showDetailLogFunc);
  //打印 绑定点击事件
  $( '#print').click( function (){
    newDoPrint( "summary");
  });
  //表单授权绑定点击事件
  $( '#formAuthority').click(formAuthorityFunc);
  //属性设置 绑定点击事件
  $( '#attributeSetting').click( function (){
      attributeSettingDialog($( '#affairId' ).val());
  });
  //盖章
  $( "#_commonSign, #_dealSign").click(openSignature);
  //右侧 半屏展开
  $( "#deal_area_show").click( function () {
    $( ".deal_area #hidden_side").trigger( "click" );
  });
//右侧  收缩
  $( ".deal_area #hidden_side").click( function () {
    if ($( "#east" ).outerWidth() == 350) {
          layout.setEast(38);
          $( ".deal_area" ).hide();
          $( "#deal_area_show" ).show();
      } else {
          layout.setEast(348);
          $( ".deal_area" ).show();
          $( "#deal_area_show" ).hide();
      }
  });
  //给跟踪按钮加事件
  $( "#gzbutton").bind( "click" ,function (){
      setTrack();
  });

  $( "#gz").change( function () {
      var a8obj = getCtpTop().document;
      var value = $( this ).val();
      var _gz_ren = $( "#gz_ren" ,a8obj);
      switch (value) {
          case "0" :
              _gz_ren.hide();
              break ;
          case "1" :
              _gz_ren.show();
              break ;
      }
  });
  //指定人弹出选人窗口
  $( "#radio4").bind( 'click' ,function (){
       $.selectPeople({
              type: 'selectPeople'
              ,panels: 'Department,Team,Post,Outworker,RelatePeople'
              ,selectType: 'Member'
              ,text:$.i18n( 'collaboration.default.selectPeople.value' )
              ,params:{
                 value: forTrackShowString
              }
              ,targetWindow:getCtpTop()
              ,callback : function (res){
                  if (res && res.obj && res.obj.length>0){
                      var selPeopleId="" ;
                      for (var i = 0; i < res.obj.length; i ++){
                          if (i == res.obj.length -1){
                              selPeopleId +=res.obj[i].id;
                          } else {
                              selPeopleId+=res.obj[i].id + "," ;
                          }
                      }
                      forTrackShowString = res.value;
                      $( "#zdgzry" ).val(selPeopleId);
                  } else {
                    
                  }
              }
          });
    });
  //修改流程绑定点击事件
  $( '#edit_workFlow').click( function (){
      editWFCDiagram(getCtpTop(),_summaryCaseId,_summaryProcessId,
              '', 'collaboration' ,isFromTemplate,
              flowPermAccountId,'collaboration' ,$.i18n( "permission.col_flow_perm_policy"),refreshWorkflow,$.i18n( 'supervise.col.label' ));
  });

  //添加人员卡片信息
  $( "#panleStart").click( function (){
      $.PeopleCard({
          targetWindow:openType,
          memberId:_startMemberId
      });
  });

  //新闻审核、公告审核
  $( "#_dealPass1").click( function (){
      var lockWorkflowRe = lockWorkflow(_summaryProcessId, _currentUserId, 14);
      if(lockWorkflowRe[0] == "false" ){
          $.alert(lockWorkflowRe[1]);
          enableOperation();
          setButtonCanUseReady();
          return ;
      }
      var lockWorkflowCon = checkWorkflowLock(summaryId, currUserId);
      if (lockWorkflowCon[0] == "false") {
          $.alert(lockWorkflowCon[1]);
          enableOperation();
          setButtonCanUseReady();
          return;
      }
      if (!dealCommentTrue()){
          return ;
       }
      //如果是公告审核
      //BUG_OA-53523_V5.0SP2_中建一局集团建设发展有限公司_流程节点是新闻审批权限，在新闻审批节点修改了正文，保存退出之后通过并发布，修改的正文内容不生效_20140321
      /*if (nodePolicy == "bulletionaudit" ) {
          bulletinIssue(summaryId,affairId,bodyType,submitFunc,rightId);
          return ;
      }
      if (nodePolicy == "newsaudit" ){
          newsIssue(summaryId,affairId,bodyType,submitFunc,rightId);
          return ;
      }*/
      submitFunc();
  });

  
 //协同收藏
 $( "#favoriteSpan"+affairId).click( function (){
     favorite(1,affairId,hasAttsFlag,3);
 });
 $( "#cancelFavorite"+affairId).click( function (){
     cancelFavorite(1,affairId,hasAttsFlag,3);
 });
 

 //流程最大化
$( "#processMaxFlag").click( function (){
    var isTemplate = isFromTemplate;
    //是否显示催办按钮
    var showHastenButton = false ;
    //判断是否显示催办按钮
    if((affairState == '2' ||(affairState == '4' && isCurrentUserSupervisor=='true' ))
            && isFinshed!= "true" && summaryReadOnly!='true' ){
        showHastenButton= true ;
     }
    var senderName = null ;
    //senderName待发已发列表才能传递，其他情况下步传递
    if(openFrom == 'listWaitSend' ){
       senderName = _currentUserName;
    }
    if(affairState == '1' &&  affairSubState == '1' && isTemplate == 'true' && templateType != 'text' ){
       showWFTDiagram(getCtpTop(), templateWorkflowId, getCtpTop());
    } else{
       showWFCDiagram(openType,_contextCaseId,_contextProcessId,isTemplate,showHastenButton,supervisorsId,window, 'collaboration', false ,_contextActivityId,operationId,'' ,senderName);
    }
});

//即时交流
$("#timelyExchangeFlag,#timelyExchange").click( function (){
   timelyExchangeFun();
});

//表单加锁单
if(bodyType == '20' && isHasDealPage == 'true'){
	formAddLock();
    $(window.componentDiv).load(function(){
    	this.checkInstallHw(disabl4Hw)
    });
}




 
 if ($.browser.msie){
   if($.browser.version < 8){
     setIframeHeight_IE7();
     $(window).resize(function(){
       setIframeHeight_IE7();
     });
   }
 }
});