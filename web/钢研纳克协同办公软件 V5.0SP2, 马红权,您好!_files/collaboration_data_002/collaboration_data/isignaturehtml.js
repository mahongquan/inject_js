//是否做了签章操作，有签章操作才保存，没有不保存。
var isDoSignature = false;
//是否安装了签章客户端。 
var isInstallClient = true;
function ISignatureHtml(userName,DOCUMENTID,SIGNATURE,SIGNATUREID){
    this.USERNAME = userName;
    this.DOCUMENTID = DOCUMENTID;
    this.SIGNATURE = SIGNATURE;
    this.SIGNATUREID = SIGNATUREID;
}

function isInstallIsignatureHtml(){
    return isInstallClient;
}

ISignatureHtml.prototype.toInput = function (){
    var str = "";
    str += '<input type="hidden"  name = "USERNAME" value = "'+this.USERNAME+'">';
    str += '<input type="hidden"  name = "DOCUMENTID" value = "'+this.DOCUMENTID+'">';
    str += '<input type="hidden"  name = "SIGNATURE" value = "'+this.SIGNATURE+'">';
    str += '<input type="hidden"  name = "SIGNATUREID" value = "'+this.SIGNATUREID+'">';
    return str;
}


function getISignatureToInput(form){
     var iHtmlSignatures =document.getElementsByName("iHtmlSignature");
     if(iHtmlSignatures){
         var mLength = iHtmlSignatures.length;
         for (var i=0;i<mLength;i++){
                var vItem=iHtmlSignatures[i];
                var isignaure  =  new ISignatureHtml("",vItem.DocumentID , vItem.SignatureValueStr ,vItem.SIGNATUREID);
                form.innerHTML += isignaure.toInput();
          } 
     }
}
/**
 * 装载iSignature Html签章
 * @param documentId :需要装载印章的文档的ID，将其装载ID为iSignatureHtmlDiv的区域。
 * @param MenuDeleteSign :是否显示撤销签章按钮
 * @param dtype:文档类型
 * @param  dtype:文档类型
 * 1、协同表单正文
 * 2、公文单
 * 3、公文正文一
 * 4、公文正文二（可能暂时用不上，预留字段）
 */
function loadSignatures(documentId,MenuDeleteSign,dtype){
    var iSignatureHtmlDiv = document.getElementById("iSignatureHtmlDiv");
    if(iSignatureHtmlDiv == null ){
        var iSignatureHtmlDiv =  document.createElement("div");
        iSignatureHtmlDiv.setAttribute("id","iSignatureHtmlDiv");
        iSignatureHtmlDiv.setAttribute("name","iSignatureHtmlDiv");
        iSignatureHtmlDiv.setAttribute("width",'1px');
        iSignatureHtmlDiv.setAttribute("height",'1px');
        document.body.appendChild(iSignatureHtmlDiv);
    }
    var signatureControl = document.getElementById("SignatureControl");
    if(signatureControl == null){
        iSignatureHtmlDiv.innerHTML = getOcx(MenuDeleteSign);
    }
    if(dtype == null || typeof(dtype) == 'undefined'){
      dtype == 1;
    }
    loadISObj(documentId,dtype);
}

function loadISObj(documentId,dtype){
 
    try{
        var signatureControl = document.getElementById("SignatureControl");
        if(signatureControl){
            //向后台发送一个请求，显示页面的签章数据。
            signatureControl.AutoSave = "False";
            signatureControl.ExtParam = dtype;
            showSign(documentId,signatureControl);
			var mLength = document.getElementsByName("iHtmlSignature").length;
			for ( var i = mLength - 1; i >= 0; i--) {
				var vItem = document.getElementsByName("iHtmlSignature")[i];
				vItem.SetParam('CHECKTYPE', '1');
				vItem.SignRefresh();
			}
            checkSignatures();//验证印章是否有效
            CalculatePosition();
            isInstallClient = true;
            setAutoSaveFalse();
        }
    }catch(e){
        //方法报异常，没有安装签章客户端。
        isInstallClient = false;
    }
}
/**
验证印章是否有效
*/
function checkSignatures(){
	var mLength=document.getElementsByName("iHtmlSignature").length; 
	for (var i=0;i<mLength;i++){
	   var vItem=document.getElementsByName("iHtmlSignature")[i];
	   //如果签章设置了文档锁定，则取消选人、选部门等按钮的点击事件
	   try{
		   if(vItem.DocProtect){
			   parent.componentDiv.unbindOrgBtn();
		   }
	   }catch(e){
	   }
	   vItem.SetParam('CHECKTYPE','1');
	   verifySignature(vItem);
	}
}
//验证签章是否失效并刷新
function verifySignature(vItem) {
  var returnValue="";
  var formStrs;
  if(parent.componentDiv){
	  formStrs = parent.componentDiv.getFieldVals4hw();//取现在表单页面上的值
  }
  if(formStrs){
    returnValue=formStrs.valueStr;
  }
  vItem.SetParam("SetFieldListValue", returnValue);
}

/**
 * 手动保存签章
 * 
 * @param dtype:文档类型
 *            1、协同表单正文 2、公文单 3、公文正文一 4、公文正文二（可能暂时用不上，预留字段）
 */
function saveISignatureHtml(dtype){
    
    //没有安装签章客户端不保存。
    if(!isInstallClient)  
        return true;
    try{
        var signatureControl = document.getElementById("SignatureControl");
        
        var mLength=document.getElementsByName("iHtmlSignature").length; 
        for (var i=0;i<mLength;i++){
            var vItem=document.getElementsByName("iHtmlSignature")[i];
            vItem.ExtParam= dtype;
            if (!vItem.SaveSignature()){
                $.alert( $.i18n("collaboration.alert.SignHtmlError"));
                return false;
            }
         }
    }catch(e){
        $.alert($.i18n("collaboration.alert.SignHtmlError"));
        return false;
    }
    return true;
}
function setAutoSaveFalse(){
    try{
        var mLength=document.getElementsByName("iHtmlSignature").length; 
        for (var i=0;i<mLength;i++){
            var vItem=document.getElementsByName("iHtmlSignature")[i];
            vItem.AutoSave = "False";
         }
    }catch(e){
    }
}
function getOcx(MenuDeleteSign){
    try{
        var canDelete = false;
        if(MenuDeleteSign=="true")  canDelete=true;
        if(MenuDeleteSign=="false") canDelete=false;
        var strObj = '<OBJECT id="SignatureControl"  classid="clsid:D85C89BE-263C-472D-9B6B-5264CD85B36E" ';
        strObj += ' width=0 height=0 VIEWASTEXT>';
        strObj += '<param name="ServiceUrl" value="'+_ctxServer+'/isignaturehtmlservlet">';  //需要写绝对路径
        strObj += '<param name="AutoSave" value="False">';
        strObj += '<param name="MenuDeleteSign" value="'+canDelete+'">';   
        strObj += '</OBJECT>'
        return strObj;
    }catch(e){
        //webroot为空。。。
    }
}
var projectData= new Array();
function sign(choose){
  if(typeof(choosedialog)!='undefined' && choosedialog!=null){
    choosedialog.close();
  }
  var signatureControl = document.getElementById("SignatureControl");
  //签章位置，屏幕坐标
  signatureControl.RelativeTagId = "inputPosition";
  signatureControl.Position(100,100);  

  if(typeof(projectData)!='undefined'  && projectData.length==0){
      //不保护数据.
      signatureControl.WebIsProtect = 0;
  }else{
      //保护数据
      signatureControl.FieldsList = projectData[0];
      signatureControl.SetParam("SetFieldListValue", projectData[1]);
      signatureControl.SetParam('CHECKTYPE','1'); 
  }

  signatureControl.AutoSave = "False";
  if(choose == '1'){
      isDoSignature = signatureControl.RunHandWrite(false);
  }else{
      //执行签章操作
      isDoSignature = signatureControl.RunSignature(false);                         
  }
  CalculatePosition();
}
//window.parent.top.doSignatureCallBack = function(choose) {
//   sign(choose);
//}
/**
 * 执行签章操作。
 * @param projectData : 保护数据,如果为""，则为不保护数据
 */
var choosedialog ;
function doSignature(proData){
     projectData = proData;
     var signatureControl = document.getElementById("SignatureControl");
    
     if(signatureControl == null) 
        return false;
     
     if(!isInstallClient)  return false;
     
     //选择签章操作,URL需要书写绝对路径
    var url =_ctxPath+'/collaboration/collaboration.do?method=chooseOperation';
        choosedialog = $.dialog({
            url: url,
            height: 180,
            width: 300,
            title:$.i18n("common.choose.signature.style"),
            targetWindow:top,
            transParams:{signCallBack:sign}
        });
     //window.parent.top.isignaturedialog = choosedialog;
}

/**
 * 释放签章对象,页面离开的时候需要释放页面里的签章。
 */
function releaseISignatureHtmlObj()
{
    try{
        if(!isInstallClient)  
            return  ;
         
        var signatureControl = document.getElementById("SignatureControl");
        if(signatureControl){
            signatureControl.DeleteSignature();
        }
    }catch(e){
    }
}

var isISignature = false;
var signX = []; //签章坐标X
var signY = []; //签章坐标Y
var inputX = 0; //标签坐标X
var inputY = 0; //标签坐标Y    
var difX = [];   //坐标差距X
var difY = [];  //坐标差距Y

function showSign(documentId, signatureControl) {
	var mXml = "<?xml version='1.0' encoding='GB2312' standalone='yes'?>";
	mXml = mXml + "  <Signature>";
	mXml = mXml + "    <OtherParam>";
	mXml = mXml + "     <AfterMoveEvent>true</AfterMoveEvent>";// 移动签章后是否触发事件
	mXml = mXml + "    </OtherParam>";
	mXml = mXml + "  </Signature>";
	signatureControl.XmlConfigParam = mXml;
	signatureControl.ShowSignature(documentId);

	var mLength = document.getElementsByName("iHtmlSignature").length;
	for ( var i = mLength - 1; i >= 0; i--) {
		var vItem = document.getElementsByName("iHtmlSignature")[i];
		vItem.SetParam('CHECKTYPE', '1');
		vItem.SignRefresh();
	}
	// 绑定动作触发事件
	signatureControl.attachEvent("EventOnSign", function(DocumentId, SignSn,KeySn, Extparam, EventId, Ext1) {
		if (EventId == 4) {
			CalculatePosition();
			signatureControl.EventResult = true;
		} else if (EventId == 5) {
			var mLength = document.getElementsByName("iHtmlSignature").length;
			for ( var i = 0; i < mLength; i++) {
				var vItem = document.getElementsByName("iHtmlSignature")[i];
				if (vItem.SignatureID == SignSn) {
					verifySignature(vItem);// 验证并刷新签章
				}
			}
		}
	});
}
function CalculatePosition(){
    try{
        isISignature= true;
        //获取输入框坐标
        var vItem2=document.getElementById("inputPosition");
        inputX = vItem2.getBoundingClientRect().left;
        inputY = vItem2.getBoundingClientRect().top;
        
        //获取签章坐标
        var mLength=document.getElementsByName("iHtmlSignature").length;
        for (var i=mLength-1;i>=0;i--){
            var vItem=document.getElementsByName("iHtmlSignature")[i];
            signX[i] = vItem.style.left;        
            signY[i] = vItem.style.top;
            signX[i] = signX[i].substring(0,signX[i].indexOf("px"));
            signY[i] = signY[i].substring(0,signY[i].indexOf("px"));  
            
            //求坐标差
            difX[i] = parseInt(signX[i]) - parseInt(inputX);
            difY[i] = parseInt(signY[i]) - parseInt(inputY); 
        } 
    }catch(e){
        
    }
}
function getTop(e){   
    try{
        var offset=e.offsetTop;   
        if(e.offsetParent!=null) offset+=getTop(e.offsetParent);   
        return offset;   
    }catch(e){
        return 0;
    }

}  

function getLeft(e){  
    try{
        var offset=e.offsetLeft;   
        if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);   
        return offset; 
    }catch(e){
        return 0;
    }
} 

/**
 * 页面移动的时候移动签章到正确的位置。
 */
function moveISignatureOnResize(){
    try{
        if (isISignature){ 
            //获取输入框坐标
            var vItem2=document.getElementById("inputPosition");
            inputX = getLeft(vItem2);
            inputY = getTop(vItem2);
      
            //设置签章坐标      
            var mLength=document.getElementsByName("iHtmlSignature").length;
            for (var i=mLength-1;i>=0;i--){
                var vItem=document.getElementsByName("iHtmlSignature")[i];
                vItem.style.left = (parseInt(inputX) + parseInt(difX[i]))+"px" ;       
                vItem.style.top = (parseInt(inputY) + parseInt(difY[i]))+"px" ;                
            }        
        }
    }catch(e){
        
    }
}

/**
 * 添加签章事件
 */
function addEvent2ISignatureObj(){
    try{
          var signatureControl = document.getElementById("SignatureControl"); 
          if(signatureControl){
              signatureControl.attachEvent("EventOnSign",function(DocumentId,SignSn,KeySn,Extparam,EventId,Ext1){
                    if(EventId = 4 ){
                        CalculatePosition();
                        signatureControl.EventResult = true;
                      }
                })
          }
    }catch(e){

    }
}