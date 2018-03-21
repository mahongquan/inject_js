/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */
function getContextPath(){
    if(v3x){
      return v3x.baseURL ? v3x.baseURL: parent._ctxPath;
    }
    return '/seeyon';       
}
CKEDITOR.editorConfig = function( config ) {
    var FCKLang = [];
    FCKLang['zh_CN'] = {
        /////字号
            fontSize_1    : "7号",
            fontSize_2    : "6号",
            fontSize_3    : "5号",
            fontSize_4    : "4号",
            fontSize_5    : "3号",
            fontSize_6    : "2号",
            fontSize_7    : "1号",

        /////字体,以半角分号分隔，并以它结束
            fontFamily    : "仿宋,仿宋_gb2312;宋体;黑体;隶书;华文行楷;楷体,楷体_gb2312;微软雅黑;幼圆;方正舒体;方正姚体;"
    };
    FCKLang['zh-cn'] = FCKLang['zh_CN'];
    FCKLang['zh_TW'] = {
            /////字號
            fontSize_1    : "7號",
            fontSize_2    : "6號",
            fontSize_3    : "5號",
            fontSize_4    : "4號",
            fontSize_5    : "3號",
            fontSize_6    : "2號",
            fontSize_7    : "1號",

        /////字體,以半角分號分隔，并以它結束
            fontFamily    : "宋體;黑體;隸書;華文行楷;" 
    };
    FCKLang['zh-tw'] = FCKLang['zh_TW'];
    FCKLang['en'] = {
        /////Font size
               fontSize_1    : "7",
               fontSize_2    : "6",
               fontSize_3    : "5",
               fontSize_4    : "4",
               fontSize_5    : "3",
               fontSize_6    : "2",
               fontSize_7    : "1",

            /////Font, separated by and finished with semicolon of half angle
               fontFamily    : "" 
    };
    var lang;
    if(parent && parent._locale){
        lang = parent._locale;
    }else if(parent.v3x && parent.v3x.currentLanguage){
        lang = parent.v3x.currentLanguage;
    }
    function getLang(key){
        if(!lang){
          lang = this._locale;
        }
        return  FCKLang[lang][key] || '';
    //  if(parent.$ && parent.$.i18n){
    //      return parent.$.i18n(key) || "";
    //  }
    //  return parent.v3x.getMessage("V3XLang." + key) || "";
    }

    var baseUrl = getContextPath() + '/common/ckeditor/'

    config.editingBlock = true;
    config.height = '100%';
    config.contentsCss = [baseUrl+'../skin/default/skin.css',baseUrl+'../../skin/default/skin.css',baseUrl+'../../common/all-min.css',baseUrl+'contents.css'];
    config.coreStyles_italic =
    {
        element : 'em',
        attributes : { 'style' : 'font-style:italic' }
    };
    // Define changes to default configuration here. For example:
    config.language = lang.toLowerCase().replace('_','-');
    // config.uiColor = '#AADC6E';
    config.toolbar = 'Basic';
    config.removePlugins = 'elementspath,magicline,form';  // ,pastefromword
    config.forcePasteAsPlainText = false;
    config.toolbar_Full =
    [
        { name: 'document', items : [ 'Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates' ] },
        { name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
        { name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt' ] },
        { name: 'forms', items : [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 
            'HiddenField' ] },
        '/',
        { name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },
        { name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv',
        '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ] },
        { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
        { name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe' ] },
        '/',
        { name: 'styles', items : [ 'Styles','Format','Font','FontSize' ] },
        { name: 'colors', items : [ 'TextColor','BGColor' ] },
        { name: 'tools', items : [ 'Maximize', 'ShowBlocks','-','About' ] }
    ];

    config.toolbar_Default = [
        ['FontFormat','FontName','FontSize'],
        ['Cut','Copy','Paste','PasteText'],
        ['Undo','Redo','-','Find','Replace','-','RemoveFormat'],
        ['Bold','Italic','Underline','StrikeThrough','-','Subscript','Superscript'],
        ['TextColor','BGColor'],
        ['NumberedList','BulletedList','-','Outdent','Indent'],
        ['JustifyLeft','JustifyCenter','JustifyRight'],
        ['Link','Unlink','Anchor'],
        ['Image','Flash','ctpassociate','Table','Rule','SpecialChar','PageBreak',]
    ] ;

    config.toolbar_Basic = [
        ['Font','FontSize','-'],
        ['Bold','Italic','Underline'],
        ['JustifyLeft','JustifyCenter','JustifyRight','-'],
        ['TextColor','BGColor'],
        ['NumberedList','BulletedList','Outdent','Indent','-'],
        //'/',
        ['Image','Flash','ctpassociate','Table','HorizontalRule','Link','Unlink'],
        ['Undo','Redo']
        //,['Save']
        //['Preview']
    ] ;
    config.toolbar_BasicAdmin = [
        ['Font','FontSize','-'],
        ['Bold','Italic','Underline'],
        ['JustifyLeft','JustifyCenter','JustifyRight','-'],
        ['TextColor','BGColor'],
        ['NumberedList','BulletedList','Outdent','Indent','-'],
        //'/',
        ['Image','Flash','Table','HorizontalRule','Link','Unlink'],
        ['Undo','Redo']
        //,['Save']
        //['Preview']
    ] ; 
  config.toolbar_Mail = [
    ['Font','FontSize','-'],
    ['Bold','Italic','Underline'],
    ['JustifyLeft','JustifyCenter','JustifyRight','-'],
    ['TextColor','BGColor'],
    ['NumberedList','BulletedList','Outdent','Indent','-'],
    //'/',
    ['Image','Smiley','Flash','Table','HorizontalRule','Link','Unlink'],
    ['Undo','Redo']
  ] ;
    config.toolbar_Bbs = [
        ['Font','FontSize','-'],
        ['Bold','Italic','Underline'],
        ['JustifyLeft','JustifyCenter','JustifyRight','-'],
        ['TextColor','BGColor'],
        ['NumberedList','BulletedList','Outdent','Indent','-'],
        ['Image','Smiley','Flash','Table','Link','Unlink'],
        ['Undo','Redo']
    ] ;

    config.toolbar_BbsSimple = [
        ['Font','FontSize','-'],
        ['Bold','Italic','Underline'],
        ['JustifyLeft','JustifyCenter','JustifyRight','-'],
        ['TextColor','BGColor'],
        ['Image','Smiley','Flash','Link','Unlink'],
        ['Undo','Redo']
    ] ; 


    //config.skin = 'kama';

    config.font_names       = (parent.customFontNames ? parent.customFontNames : '') + getLang("fontFamily") + 'Arial;Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana';
    config.fontSize_sizes = getLang("fontSize_1")+'/10px;'+getLang("fontSize_2")+'/13px;'+getLang("fontSize_3")+'/16px;'+getLang("fontSize_4")+'/18px;'+getLang("fontSize_5")+'/24px;'+getLang("fontSize_6")+'/32px;'+getLang("fontSize_7")+'/48px' ;
//    config.filebrowserUploadUrl = '/uploader/upload.php';
//    config.filebrowserImageUploadUrl = '/uploader/upload.php';
    
    config.pasteFromWordRemoveFontStyles = false;
    config.pasteFromWordRemoveStyles = false;
//    config.resize_enabled = false;
//    config.toolbarStartupExpanded = false;
    config.extraPlugins = 'ctpassociate';
    config.resize_enabled = false;
    config.dialog_backgroundCoverColor = "#000";   
    config.tabSpaces = 8; 
    // config.enterMode = CKEDITOR.ENTER_BR;
};

var currentPlugin = '';
// 上传实现，配合image和flash插件实现自定义上传
// mode : 1 点击Ok时上传，上传完毕回写关闭dialog，用于image；
//        2 Upload改变就上传，用于flash
var UploadConfig = {
    'image' : {
        acceptFile : 'image/*',
        extensions : 'jpg,gif,jpeg,png',
        uploadUrlInputName : 'txtUrl',      
        warnUrlMissing : function (editor){
            return editor.lang.image.urlMissing;    
        },
        mode : 1  
    },
    'flash' : {
        acceptFile : 'application/x-shockwave-flash,.swf',
        extensions : 'swf',
        uploadUrlInputName : 'src',      
        warnUrlMissing : function (editor){
            return editor.lang.flash.validateSrc;    
        },
        mode : 2         
    }
 };

// 保证修改时更改图片能得到更新
var isUploadChanged = false;
// 上传文件改变时，更新预览
function onUploadChange(){
    createIframe();
    if(getUploadMode() == 2){
        document.getElementById('uploadForm'+currentPlugin).submit();
    }    
    if(getUploadMode() == 1){
        clearImageSize();
        resetImageDimension();
    }
    isUploadChanged = true;
}

function isTextEmpty(value){
  return value == undefined  || (value.trim() == '');
}
// 点击Ok时的校验
function beforeOk(txtUrl){
    var isUrlEmpty = isTextEmpty(txtUrl.getInputElement().getValue());
    var v = document.getElementById('ckupload').value;
    var isUploadEmpty = isTextEmpty(v);
    if(!isUrlEmpty && !isUploadChanged) return true;
    if(getUploadMode() == 1){
        if(!isUploadEmpty){
            document.getElementById('uploadForm'+currentPlugin).submit();
            return false;
        }
    }
    var editor = CKEDITOR.dialog.getCurrent().getParentEditor();
    alert(UploadConfig[currentPlugin].warnUrlMissing(editor));
    return false;
}
// 必须放在顶层，否则提交时找不到
// 上传完毕回调
function addCkEditorAttachment(type, filename, mimeType, createDate, size, fileUrl, canDelete,needClone,x1,extension,icon,x2,x3,x4,v) {
    var dialog = CKEDITOR.dialog.getCurrent();
    if(currentPlugin == 'ctpassociate'){
        var attachment = new Attachment(fileUrl, '', '', 1, type, filename, mimeType, createDate, size, fileUrl, '', '','','', '','',v);
        associates.push(attachment);
        updateAssociateUrl();   
        return;
    }
    
    var url = getContextPath() + '/fileUpload.do?method=showRTE&fileId='+fileUrl+'&createDate='+createDate.substring(0, 10) + '&type=' + currentPlugin;
    dialog.getContentElement( 'info', getUploadUrlInputName() ).setValue(url);
    isUploadChanged = false;
    if(currentPlugin == 'image') resetImageDimension();
    if(getUploadMode() == 1){
        // 提交，关闭
        dialog.fire('ok',{hide:true});
        dialog.hide();
    }
}  
function getAttachementDownloadUrl(attachment){
    var url;
    if(attachment.mimeType == "collaboration"){
        url = "collaboration/collaboration.do?method=summary&openFrom=glwd&type=&affairId="+ attachment.description +"&baseObjectId=" + attachment.reference +"&baseApp="+ attachment.category;
    }
    else if(attachment.mimeType == "edoc"){
        url = "/edocController.do?method=detailIFrame&from=Done&openFrom=glwd&affairId=" + attachment.description + "&isQuote=true&baseObjectId=" + attachment.reference +"&baseApp="+ attachment.category;
    }
    else if(attachment.mimeType == "km"){
        url = "doc.do?method=docOpenIframeOnlyId&openFrom=glwd&docResId=" + attachment.description + "&baseObjectId=" + attachment.reference +"&baseApp="+ attachment.category ;
    }
    else if(attachment.mimeType == "meeting") {
        url = "mtMeeting.do?method=myDetailFrame&id=" + attachment.description + "&isQuote=true&baseObjectId=" + attachment.reference +"&baseApp="+ attachment.category + "&state=10";
    }else{
        url = 'fileUpload.do?method=download&fileId='+attachment.id+'&createDate='+attachment.createDate.substring(0, 10)+'&filename='+escapeStringToHTML(attachment.filename);
    }
    return getContextPath() + '/' + url;
}
// 创建静默提交目标iframe
function createIframe(){
    if(document.getElementById('uploadTarget')) return;
    var iframe = CKEDITOR.dom.element.createFromHtml( '<iframe style="display:none" id="uploadTarget" name="uploadTarget"' +
                                ' src="' + '' + '"' +
                                '></iframe>' );
    CKEDITOR.dialog.getCurrent().getElement().append(iframe);
}
function clearImageSize(){
    var dialog = CKEDITOR.dialog.getCurrent();
    var original = dialog.originalElement;

        var widthField = dialog.getContentElement( 'info', 'txtWidth' ),
            heightField = dialog.getContentElement( 'info', 'txtHeight' ); 
        dialog.setValueOf( 'info', 'txtWidth', '' );
        dialog.setValueOf( 'info', 'txtHeight', '' );
        dialog.commitContent();
}
function resetImageDimension(){
    var dialog = CKEDITOR.dialog.getCurrent();
    var original = dialog.originalElement;
    original.setCustomData( 'isReady', 'true' );
    var preview = dialog.preview;
    if(preview){
        var widthField = dialog.getContentElement( 'info', 'txtWidth' ),
            heightField = dialog.getContentElement( 'info', 'txtHeight' ); 
        var widthHasSet  = widthField && widthField.getValue()!='';
        var heightHasSet = heightField && heightField.getValue()!='';
        var oldWidth = widthHasSet ? widthField.getValue() : '';
        var oldHeight = heightHasSet ? heightField.getValue() : ''

        var img = original.$;
        img.src = getImagePath(document.getElementById('ckupload'));
        preview.removeStyle( 'display' );
        preview.$.src = img.src;

        widthHasSet && dialog.setValueOf( 'info', 'txtWidth', oldWidth );
        heightHasSet && dialog.setValueOf( 'info', 'txtHeight', oldHeight );

        // Only if ratio is locked
        if ( dialog.lockRatio && !(widthHasSet&&heightHasSet)) {
            var oImageOriginal = dialog.originalElement;
            // if ( oImageOriginal.getCustomData( 'isReady' ) == 'true' ) {
                if ( heightHasSet ) {
                    var value = heightField.getValue();
                    if ( value && value != '0' )
                        value = Math.round( oImageOriginal.$.width * ( value / oImageOriginal.$.height ) );
                    if ( !isNaN( value ) )
                        dialog.setValueOf( 'info', 'txtWidth', value );
                } else if ( widthHasSet )
                {
                    var value = widthField.getValue();
                    if ( value && value != '0' )
                        value = Math.round( oImageOriginal.$.height * ( value / oImageOriginal.$.width ) );
                    if ( !isNaN( value ) )
                        dialog.setValueOf( 'info', 'txtHeight', value );
                }
            // }
        }        

        widthField && widthField.getValue()=='' && widthField.setValue( img.width );
        heightField && heightField.getValue()=='' && heightField.setValue( img.height );    
        dialog.commitContent( 4, dialog.preview );
        if(!widthHasSet && !heightHasSet){
            preview.setStyle( 'height','auto' );
            preview.setStyle( 'width','auto' );
            if(arguments.length==0){
                clearImageSize();
                resetImageDimension(1);
            }
        }         
    }    
}
/**
 * 解决IE8/Firefox 得不到上传图片的全路径问题
 */
function getImagePath(obj){
    if(obj){
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("MSIE")>0) {
            try {
                obj.select(); 
                var result = document.selection.createRange().text;
                document.selection.empty();
                return result;
            }
             catch (e) {
                return "";
            }
        } else if (userAgent.indexOf("Firefox")>=1  ||  (userAgent.indexOf("Mozilla")>=0)){  
            if(obj.files) {  
                var file = obj.files.item(0);
          
                if(file.getAsDataURL){
                  return file.getAsDataURL();  
                }else{
                  return window.URL.createObjectURL(file);
                }
            }  
            return obj.value;  
        }
        return obj.value;
    }
}    

function getUploadFormHtml(currentPlugin){
    var uploadUrl = getContextPath()+'/fileUpload.do?method=processUpload&type=1&applicationCategory=1&extensions='+UploadConfig[currentPlugin].extensions+'&maxSize=10240000&callback=addCkEditorAttachment&closeWindow=false';
    var uploadFormHtml = '<form id="uploadForm'+currentPlugin+'" target="uploadTarget" action="'+uploadUrl+'" method="POST" enctype="multipart/form-data">'
                                    +'<label for="ckupload">'+CKEDITOR.currentInstance.lang.common.uploadSubmit+'</label><br/><input type="file" size="38" name="upload" id="ckupload" onchange="onUploadChange()" class="cke_dialog_ui_input_text" accept="'
                                    +UploadConfig[currentPlugin].acceptFile+'"/></form>';
    return uploadFormHtml;
}
function getUploadUrlInputName(){
    return UploadConfig[currentPlugin].uploadUrlInputName;
}
function getUploadMode(){
    var c = UploadConfig[currentPlugin];
    var mode = c ? c.mode : 1;
    return mode ? mode : 1;
}
function getEditorAssociate(){
  if(this.editorAssociates){
    return this.editorAssociates;
  }else{
    return '1,3';
  }
}
// 空方法，附件上传回调
function again(){
    
}
CKEDITOR.on('dialogDefinition', function (e) {
    var dialogName = e.data.name;
    var dialog = e.data.definition.dialog;
    dialog.on('show', function () {
        currentPlugin = dialogName;
    });
});