/**
 *Created by muj!
 *IWebRevision常见BUG说明：
 *1。保存的时候：No GIF Data to write
 *   -- 页面中有高/宽都等于0PX的签章字段控件! 如果是因为修改表单一定要有的话，数据源中保留，INFOPATH中删除
 *
 * 
 * 
 */


/*
调用hw页面提供如下全局变量
webRoot  :web容器根路径
hwVer:手写控件版本号
htmOcxUserName:手写批注用户名称
*/
/**********
当页面上没有定义处理意见显示位置时候,所有手写到一个手写板上
***********/

//手写控件对象
var hwObjs=new Array();

var hwUpdateObj=null;//记录修改控件对象；取消修改时候，删除修改状态


function getHwName(actorid)
{
	if(opinionSpans==null){initSpans();}	
	var hwName="";
	var objName="my:"+actorid;	
	if(opinionSpans.get(objName,null)!=null)
	{
		hwName="hw"+actorid;
	}
	else
	{//没有定义当前节点显示位置,所有手写签批到一个手写板
		hwName="hw"+"otherOpinion";
	}
	return hwName;
}
/*得到控件插入位置控件,意见显示控件*/
function getActorTextObj(actorid)
{	
	var objName="my:"+actorid;
	if(opinionSpans==null){initSpans();}
	if(opinionSpans.get(objName,null)==null)
	{//没有定义当前节点显示位置,所有手写签批到一个手写板
		objName="my:"+"otherOpinion";
	}
	return objName;
}
/*****************/
//公文一个权限提供一个手写板供批注盖章,actorID确定手写板
//手写板用"hw"+actorid,命名
//
/*******************/
function handWrite(recordId,actorid,isNewImg,affairId)
{
	try{
	var newCreateOcx=false;
	var objName,hwObj;

	var isNewInterface = false;
	if(typeof actorid == "string"){
	  objName=getHwName(actorid);
	}else{
	  objName = actorid.value;
	  isNewInterface = true;
	}
	hwObj=document.getElementById(objName);
	var insertObj;
	if(isNewImg){
	   //是否重新生成新画布
		var noSinged=true;
		var hwObjsArr=document.getElementsByName(objName);

		if(hwObjsArr.length==1&&hwObjsArr[0].WebGetMsgByName("AFFAIRID")=="null"){//老数据取当前的签批内容
			hwObj=hwObjsArr[0];
			noSinged=false;
		}else{
			for (var i = 0; i < hwObjsArr.length; i++) {
				var objTemp=hwObjsArr[i];
				var affairIdStr=objTemp.WebGetMsgByName("AFFAIRID");
				if(affairIdStr==affairId){
					hwObj=objTemp;
					noSinged=false;
				}
			}
		}
		
		if(noSinged||hwObj==null)
		{
			newCreateOcx=true;
			if(isNewInterface){
				insertObj=actorid;
			  	hwObj=createHandWrite(objName,htmOcxUserName,recordId,actorid,true,affairId);
			}else{
				insertObj=getActorTextObj(actorid);
			  	hwObj=createHandWrite(objName,htmOcxUserName,recordId,getActorTextObj(actorid),true,affairId);
			}
			if(hwObj==null){return;}
		}
	}else{//表单签批
		if(hwObj==null)
		{
			newCreateOcx=true;
			if(isNewInterface){
				insertObj=actorid;
			  	hwObj=createHandWrite(objName,htmOcxUserName,recordId,actorid,false);
			}else{
				insertObj=getActorTextObj(actorid);
			  	hwObj=createHandWrite(objName,htmOcxUserName,recordId,getActorTextObj(actorid),false);
			}
			if(hwObj==null){return;}
		}
	}
	
	if(checkModify(hwObj)==false){return false;}
	
	if(hwObj==null){hwObj=null;return;}	
	//兼容第一次打开签章关闭后，鼠标滚动窗口后再次打开签批控件画布大小为0的情况
	hwObj=resetWidthAndHeight(hwObj,insertObj,isNewInterface,actorid);
	
	hwObj.Enabled="1";
	hwObj.EnableMenu("加宽");
	//hwObj.EnableMenu("签名盖章...");
	//hwObj.EnableMenu("文字批注...");
	hwObj.EnableMenu("签章信息...");	
 	hwObj.EnableMenu("撤消签章...");
 	hwObj.SetFieldByName("RESIZEWIDTH","FALSE");// 来控制“手写签名”窗口不能够加宽。
 	hwObj.ResizeForm=true;
 	if(v3x.currentLanguage == 'zh-cn' || v3x.currentLanguage == 'zh-tw'){
 		hwObj.FontName = "宋体";
 		hwObj.FontSize = 11;
 	}
	hwObj.OpenSignature();	
	//hwObj.Enabled="0";
	}catch(ea){var errStr=ea.number & 0xFFFF;errStr=errStr+":"+ea.description;alert(errStr);}
}

function resetWidthAndHeight(hwObj,insertObj,isNewInterface,actorid){
	if(hwObj.ImgWidth==0||hwObj.ImgHeight==0){
		var imgWidth="200";
		var imgHight="200";
		var inputObj;
		if(isNewInterface){
			insertObj=actorid;
		}else{
			insertObj=getActorTextObj(actorid);
		}
		
		//兼容老版本和5.0表单，老版本传递string，5.0传递对象
		if(typeof insertObj == "string"){
		  if(opinionSpans==null){initSpans();}
		  inputObj=opinionSpans.get(insertObj,null);
		}else{
		    inputObj = insertObj;
		}
		if(inputObj==null)
		{		  
			alert(v3x.getMessage("V3XOfficeLang.alert_noHandWriteLocation"));
			return;
		}
		imgHight=initImgHeight(inputObj, imgHight);
		imgWidth=initImgWidth(inputObj, imgWidth);
		hwObj.ImgWidth=imgWidth;
		hwObj.ImgHeight=imgHight;
	}
	return hwObj;
}

function getHtmlHandWriteDataObj(hwObj)
{
	var i;
	for(i=0;i<hwObjs.length;i++)
	{
		if(hwObjs[i].recordId==hwObj.RecordID && hwObjs[i].objName==hwObj.FieldName.substr(2))
		{
			return hwObjs[i];
		}
	}
	return null;
}

function getHtmlHandWriteId(hwObj)
{
	return hwObj.RecordID+"___"+hwObj.FieldName;
}
//检查手写批注控件是否有人修改,无人修改时返回"false",有人修改时返回修改人员的用户名称
function checkModify(hwObj)
{  
  //var objData=getHtmlHandWriteDataObj(hwObj);
  if(hwObj==null){return true;}
  if(hwObj.checkUpdate==false){return true;}
  
  var requestCaller = new XMLHttpRequestCaller(this, "ajaxHtmlHandWriteManager", "editObjectState",false);
  requestCaller.addParameter(1, "String", getHtmlHandWriteId(hwObj));  
  var ds = requestCaller.serviceRequest();
  if(ds.get("curEditState")=="true")
  {
  	//alert(getOfficeLanguage("用户")+ds.get("userName")+getOfficeLanguage("正在编辑此文件，不能修改！"));    
  	alert(v3x.getMessage("V3XOfficeLang.alert_NotHandwrite",ds.get("userName")));    	
    return false;
  }
  hwUpdateObj=hwObj;
  //alert("("+ds.get("lastUpdateTime")+")==("+hwObj.lastUpdateTime+")");
  if(ds.get("lastUpdateTime")==null){return true;}
  if(ds.get("lastUpdateTime")!=hwObj.lastUpdateTime)
  {
  	  	if(hwObj!=null)
		{
			loadObjData(hwObj);
			hwObj.checkUpdate=false;
		}
  }  
  return true;
}


function getHandWriteSize(objSize,defaultValue)
{
	var i;
	var retvalue="";
	if(objSize==null || objSize==""){return defaultValue;}
	if(objSize.lastIndexOf("%")!=-1){return defaultValue;}
	for(i=0;i<objSize.length;i++)
	{
		if(isNaN(objSize.charAt(i))==false)
		{
			retvalue+=objSize.charAt(i);
		}
		else
		{
			break;
		}
	}
	if(retvalue==""){retvalue=defaultValue;}
	return retvalue;
}
function initImgHeight(inputObj, imgHight)  {
	/*if (typeof (inputObj.clientHeight) != "undefined" && inputObj.clientHeight) {
		imgHight = inputObj.clientHeight;
	}*/
	if (typeof (inputObj.style) != "undefined"
		&& typeof (inputObj.style.pixelHeight) != "undefined"
		&& inputObj.style.pixelHeight) {
		if(imgHight<inputObj.style.pixelHeight){
			imgHight = inputObj.style.pixelHeight;
		}
	}
	if (typeof (inputObj.initHeight) != "undefined" && inputObj.initHeight) {
		var imgHightTemp = inputObj.initHeight.replace("px", "");
		//if(imgHight<imgHightTemp){
			imgHight=imgHightTemp;
		//}
	}
	return imgHight;
}
function initImgWidth(inputObj, imgWidth) {
	
	/*if (typeof (inputObj.clientWidth) != "undefined" && inputObj.clientWidth) {
		imgWidth = inputObj.clientWidth;
	} */
    if (typeof (inputObj.style) != "undefined"
			&& typeof (inputObj.style.pixelWidth) != "undefined"
			&& inputObj.style.pixelWidth) {
		if(imgWidth<inputObj.style.pixelWidth){
			imgWidth=inputObj.style.pixelWidth;
		}
	}
    if(typeof(inputObj.initWidth)!="undefined"&& inputObj.initWidth&&inputObj.initWidth.indexOf("%")==-1){
    	var imgWidthTemp = inputObj.initWidth.replace("px", "");
    	//if(imgWidth<imgWidthTemp){
    		imgWidth=imgWidthTemp;
    	//}
    }
	return imgWidth;
}

/*生成控件*/
function createHandWrite(objName,userName,recordId,insertObj,isNewImg,affairId)
{
	  var imgWidth="200";
	  var imgHight="200";
	  var inputObj;
	  //兼容老版本和5.0表单，老版本传递string，5.0传递对象
	  if(typeof insertObj == "string"){
	    if(opinionSpans==null){initSpans();}
	    inputObj=opinionSpans.get(insertObj,null);
	  }else{
	    inputObj = insertObj;
	  }
	  if(inputObj==null)
	  {		  
		  alert(v3x.getMessage("V3XOfficeLang.alert_noHandWriteLocation"));
		  return;
	  }
	  imgHight=initImgHeight(inputObj,imgHight);
	  imgWidth=initImgWidth(inputObj, imgWidth);
	  var d=new Date();
	  var sdate=d.getYear()+"-"+(d.getMonth() + 1) + "-"+d.getDate();                
	  var hwObj;
	  hwObj=document.createElement("OBJECT");	  
	  hwObj.name=objName;
	  hwObj.id=objName;
	  hwObj.classid="clsid:2294689C-9EDF-40BC-86AE-0438112CA439";
 	  hwObj.codebase=webRoot+"/common/office/iWebSignature.ocx#version="+hwVer;
	  hwObj.WebUrl=webRoot+"/htmlofficeservlet";
	  //hwObj.codebase="/seeyon/common/office/iWebSignature.ocx#version="+hwVer; 	  
	  //hwObj.WebUrl="/seeyon/htmlofficeservlet";
	  hwObj.RecordID=recordId;
	  hwObj.FieldName=objName;
	  hwObj.EditType="0";
	  hwObj.ShowPage="0";
	  hwObj.ShowMenu="1";
	  hwObj.SignatureType="0";
	  hwObj.InputList="同意\r\n不同意\r\n请上级批示\r\n请速办理";
	  hwObj.UserName=userName;
	  hwObj.Enabled="0";
	  hwObj.ImgWidth=imgWidth;
	  hwObj.ImgHeight=imgHight;
	  hwObj.BorderStyle="0";
	  hwObj.AppendMenu("9","-");
	  hwObj.AppendMenu("10","加宽");
	  hwObj.DisableMenu("加宽");
	  hwObj.DisableMenu("签名盖章...");
	  hwObj.DisableMenu("文字批注...");
	  hwObj.DisableMenu("签章信息...");	
 	  hwObj.DisableMenu("撤消签章...");
 	  hwObj.WebSetMsgByName("isNewImg",isNewImg+"");
 	  if(isNewImg){
 	  	hwObj.WebSetMsgByName("AFFAIRID",affairId);
 	  }
 	  
 	  
		try {
			if(___OfficeLicese && ___OfficeLicese != ""){
				hwObj.Copyright = ___OfficeLicese;
			}
		}
		catch (e) {
		}
 	  	if(isNewImg){//文单签批
 	  		var affairIdStr=document.getElementById("affairId");
		
			var divObj=document.getElementById(affairId);//获取意见div对象
			if(divObj){
				divObj.insertAdjacentElement("beforeBegin",hwObj);
			}else{
				if(affairId=="null"||affairId==affairIdStr.value){//兼容升级数据和暂存待办状态
					inputObj.insertAdjacentElement("beforeBegin",hwObj);
				}
			}
 	  	}else{//表单签批
 	  		inputObj.insertAdjacentElement("beforeBegin",hwObj);
 	  	}
		
	  hwObj.LoadLanguage(v3x.baseURL + "/common/office/js/i18n/iWebRevsion/" + v3x.currentLanguage + "_txt");
	  //alert(v3x.baseURL + "/apps_res/form/js/i18n/iWebRevsion/" + v3x.currentLanguage + ".txt");
	  try{inputObj.style.height="auto"||"100%";}catch(e){}
	  return hwObj;
}
/*生成控件*/
function createEmptyHandWrite(objName,userName,recordId,insertObj)
{
	  var imgWidth="200";
	  var imgHight="200";
	  if(opinionSpans==null){initSpans();}
	  var inputObj=opinionSpans.get(insertObj,null);
	  if(inputObj==null)
	  {		  
		  alert(v3x.getMessage("V3XOfficeLang.alert_noHandWriteLocation"));
		  return null;
	  }
	  imgWidth=getHandWriteSize(inputObj.initWidth,"200");
	  imgHight=getHandWriteSize(inputObj.initHeight,"200");
	  var d=new Date();
	  var sdate=d.getYear()+"-"+(d.getMonth() + 1) + "-"+d.getDate();                
	  var hwObj;
	  hwObj=document.createElement("OBJECT");	  
	  hwObj.name=objName;
	  hwObj.id=objName;
	  hwObj.classid="clsid:2294689C-9EDF-40BC-86AE-0438112CA439";
 	  hwObj.codebase=webRoot+"/common/office/iWebSignature.ocx#version="+hwVer;
	  hwObj.WebUrl=webRoot+"/htmlofficeservlet";
	  //hwObj.codebase="/seeyon/common/office/iWebSignature.ocx#version="+hwVer; 	  
	  //hwObj.WebUrl="/seeyon/htmlofficeservlet";
	  hwObj.RecordID=recordId;
	  hwObj.FieldName=objName;
	  hwObj.EditType="0";
	  hwObj.ShowPage="0";
	  hwObj.ShowMenu="1";
	  hwObj.SignatureType="0";
	  hwObj.InputList="同意\r\n不同意\r\n请上级批示\r\n请速办理";
	  hwObj.UserName=userName;
	  //hwObj.InputText=userName+" "+sdate;
	  hwObj.Enabled="0";
	  hwObj.ImgWidth=imgWidth;
	  hwObj.ImgHeight=imgHight;
	  hwObj.BorderStyle="0";
	  hwObj.AppendMenu("9","-");
	  hwObj.AppendMenu("10","加宽");
	  hwObj.DisableMenu("加宽");
	  hwObj.DisableMenu("签名盖章...");
	  hwObj.DisableMenu("文字批注...");
	  hwObj.DisableMenu("签章信息...");	
 	  hwObj.DisableMenu("撤消签章...");
	  //inputObj.insertAdjacentHTML("beforeBegin","<br>");
	  //inputObj.insertAdjacentElement("beforeBegin",hwObj);
	  hwObj.LoadLanguage(v3x.baseURL + "/common/office/js/i18n/iWebRevsion/" + v3x.currentLanguage + "_txt");
	  //alert(v3x.baseURL + "/apps_res/form/js/i18n/iWebRevsion/" + v3x.currentLanguage + ".txt");
	  try{inputObj.style.height="100%";}catch(e){}
	  return hwObj;
}
/*调入控件数据*/
function loadData(objName)
{
	var hwObj=document.getElementById(objName);
	loadObjData(hwObj);
}
function loadObjData(obj)
{
	var ret=false;
	if(obj!=null)
	{
		ret=obj.LoadSignature();
		try{
		    obj.width=obj.ImgWidth;
	        obj.height=obj.ImgHeight;
		}catch(e){}
		ret = true;
	}
	return ret;
}
/*控件菜单相应函数*/
function  OnMenuHdClick(obj,vIndex,vCaption)
{
  //alert('编号:'+vIndex+'\n\r'+'标题:'+vCaption+'\n\r'+'请根据这些信息编写具体功能'); 
  if(vIndex==10)
  {
    obj.ImgWidth=new Number(obj.ImgWidth)+100;
	obj.width=obj.ImgWidth;
  }
}
/***根据控件名称得到处理意见显示控件名称,得到控件放置位置**/
function getActorNameByObjName(objName)
{
	var actorId=objName.substr(2);
	return getActorTextObj(actorId);
}
function save(obj)
{
	var ret=false;
	obj.WebSetMsgByName("Version",obj.Version());//保存时校验控件版本	
	ret=obj.SaveSignature();	
	if(ret==false && obj.Status=="ver err")
	{
		ocxObj.alert(v3x.getMessage("V3XOfficeLang.alert_err_OcxVer"));
	}
	return ret;
}
//检查页面中的手写批注控件是否进行了修改
function checkUpdateHw()
{
  var i;
  var objs=document.getElementsByTagName("OBJECT");
  for(i=0;i<objs.length;i++)
  {
    if(objs[i].classid=="clsid:2294689C-9EDF-40BC-86AE-0438112CA439")//手写批注控件
    {
		if(objs[i].Modify)
		{
	  		return true;
		}
    }
  }
  return false;
}
//保存手写控件的数据
function saveHwData()
{
  //查找所有的Ｏｂｊｅｃｔ，坚持是否修改，如果修改，就保存
  var i;
  var objs=document.getElementsByTagName("OBJECT");
  for(i=0;i<objs.length;i++)
  {
    if(objs[i].classid=="clsid:2294689C-9EDF-40BC-86AE-0438112CA439")//手写批注控件
    {
		if(objs[i].Modify)
		{
	  		if(save(objs[i])==false){return false;};
		}
    }
  }
  return true;
}

function unLoadHtmlHandWrite()
{
  //查找所有的Ｏｂｊｅｃｔ，坚持是否修改，如果修改，就保存
  /*
  var i;
  var objs=document.getElementsByTagName("OBJECT");
  for(i=0;i<objs.length;i++)
  {
    if(objs[i].classid=="clsid:2294689C-9EDF-40BC-86AE-0438112CA439")//手写批注控件
    {
		if(objs[i].Modify)
		{
	  		var requestCaller = new XMLHttpRequestCaller(this, "ajaxHtmlHandWriteManager", "deleteUpdateObj",false);
  			requestCaller.addParameter(1, "String", getHtmlHandWriteId(objs[i]));  
  			var ds = requestCaller.serviceRequest();
		}
    }
  }
  */
  if(hwUpdateObj==null){return;}
  var requestCaller = new XMLHttpRequestCaller(this, "ajaxHtmlHandWriteManager", "deleteUpdateObj",false);
  requestCaller.addParameter(1, "String", getHtmlHandWriteId(hwUpdateObj));  
  var ds = requestCaller.serviceRequest();
    
  return true;	
}

//文单签批回显是用的js对象；

function hwObj(recordId,objName,userName,lastUpdateTime,affairId)
{
	this.recordId=recordId;
	this.objName=objName;
	this.userName=userName;
	this.lastUpdateTime=lastUpdateTime;
	this.affairId=affairId;
}

function initHandWrite()
{
	for(var i=0;i<hwObjs.length;i++)
	{	
			//	hwObjs[i].objName:"hwotherOpinion"
			//	hwObjs[i].userName:t2
			//  hwObjs[i].recordId:8138373849786699339
			//	getActorNameByObjName(hwObjs[i].objName):"my:otherOpinion"
			var hwObj=createHandWrite(hwObjs[i].objName,hwObjs[i].userName,hwObjs[i].recordId,getActorNameByObjName(hwObjs[i].objName),true,hwObjs[i].affairId);
			hwObj.lastUpdateTime=hwObjs[i].lastUpdateTime;
			if(loadObjData(hwObj)==false){alert("调入手写批注失败");};
			
	}
}

/**
 * 通过json数据加载hw对象
 * @param json  htmldocumentsignature对应数据
 *              recordId：moduleId应用id
 *              objName：需要显示签批的控件id
 *              userName：文单签批人
 *              lastUpdateTime：最后一次更新时间
 *              signObj：需要显示签批的控件
 *              enabled: 0不允许签名，1允许签名,默认0
 *  *              
 */
function initHandWriteData(json,options){
  try{
    var hwObj = createHandWrite(json.objName,json.userName,json.recordId,json.signObj,false);
    hwObj.lastUpdateTime = json.lastUpdateTime;
    if(json.enabled == "1"){
      hwObj.Enabled = json.enabled;
    }
    //增加删除当前登录人的签批内容按钮
    attchDelIWebRevision(hwObj,json.userName);
    if(loadObjData(hwObj)==false){alert("调入手写批注失败");};
  }catch(e){
    //alert("没有安装手写签批控件。。。")
    //TODO 有点恶心了，这样主要是防护没有安装的时候报异常
  }
}
//增加删除当前登录人的签批内容按钮
function attchDelIWebRevision(hwObj,userName){
	//绑定点击监听事件
	hwObj.attachEvent("OnMenuClick", function(vIndex,vCaption) {
		if (vIndex==-8){
			hwObj.Modify=true;
		}
	});
	//设置默认发起人姓名
	if(hwObj.Enabled || hwObj.Enabled =='1'){
		hwObj.SetFieldByName("DELUSERNAME",userName);
	}
}