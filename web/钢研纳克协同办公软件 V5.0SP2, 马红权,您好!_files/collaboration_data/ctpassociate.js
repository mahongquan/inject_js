/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights
 *          reserved. For licensing, see LICENSE.html or
 *          http://ckeditor.com/license
 */
var currentPlugin = 'ctpassociate';
var associates = [];
function updateAssociateUrl(){
    var array = [];
    for ( var i = 0; i < associates.length; i++) {
      var att = associates[i];
      array.push(att.filename);
    }
    var dialog = CKEDITOR.dialog.getCurrent();
    var editor = dialog.getParentEditor();
    var value = array.join(editor.lang.ctpassociate.seperator);
    var txtUrl = dialog.getContentElement('info', 'txtUrl');
    txtUrl.setValue(value);
    txtUrl.getInputElement().$.title = value;        
}
(function() {
  function CtpAssociateDialog(editor) {

    function insertCorrelationFile() {
      var atts = v3x
          .openWindow( {
            url : getContextPath() + '/ctp/common/associateddoc/assdocFrame.do?poi=99&isBind=' + getEditorAssociate(),
            height : 600,
            width : 800
          });

      if (atts) {
        associates = atts;
//        deleteAllAttachment(2);
        updateAssociateUrl();
      }
    }

    return {
      title : editor.lang.ctpassociate.title,
      minWidth : 400,
      minHeight : 180,
      buttons : [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ],
      contents : [ {
        id : 'info',
        label : editor.lang.ctpassociate.link,
        title : editor.lang.ctpassociate.link,
        elements : [
            {
              id : 'cmbLinktype',
              type : 'select',
              widths : [ '65%', '35%' ],
              style : 'width:200px',
              label : editor.lang.ctpassociate.linktype,
              'default' : '1',
              items : [ [ editor.lang.ctpassociate.linktype1, '1' ],
                  [ editor.lang.ctpassociate.linktype3, '3' ]

              ],
              onChange : function() {
                associates = [];
                updateAssociateUrl();
              },
              setup : function(type, element) {
                element.getInputElement().setAttribute( 'readOnly', true );
              },
              commit : function(type, element, internalCommit) {

              }
            },
            {
              type : 'hbox',
              widths : [ '75%', '25%' ],
              children : [
                  {
                    id : 'txtUrl',
                    type : 'text',
                    style : 'width: 100%;',
                    inputStyle : CKEDITOR.env.ie && CKEDITOR.env.version < 9 && 'width:280px',
                    label : editor.lang.ctpassociate.link,
                    'default' : '',
                    required : true,
                    validate : CKEDITOR.dialog.validate
                        .notEmpty(editor.lang.ctpassociate.linkIsMissing),
                    onLoad : function(type, element) {
                      this.getInputElement().$.readonly = true;
                      this.getInputElement().setAttribute( 'readOnly', true );
                    },
                    commit : function() {

                    }
                  },
                  {
                    type : 'button',
                    id : 'buttonId',
                    label : editor.lang.ctpassociate.setting,
                    title : editor.lang.ctpassociate.setting,
                    onLoad :  function(type, element) {
                      this.getElement().getParent().setStyle("vertical-align","bottom");
                    },
                    onClick : function() {
                      associates = [];
                      updateAssociateUrl();
                      var dialog = this.getDialog();
                      var cmbLinktype = dialog.getContentElement('info',
                          'cmbLinktype');
                      if (cmbLinktype.getValue() == 1) {
                        insertCorrelationFile();
                      }
                      else if (cmbLinktype.getValue() == 3) {
                           var url = getContextPath()+'/fileUpload.do?type=0&applicationCategory=1&extensions=&maxSize=&isEncrypt=true&popupTitleKey=&isA8geniusAdded=false&quantity=5&callback=addCkEditorAttachment&firstSave=true';
                            v3x.openWindow({
                              url   : url,
                              width : 400,
                              height  : 250,
                              resizable : "yes"
                            });
                      }   
                      else if (cmbLinktype.getValue() == 2) {
                           var url = getContextPath()+'/fileUpload.do?type=0&applicationCategory=1&extensions=&maxSize=&isEncrypt=true&popupTitleKey=&isA8geniusAdded=false&quantity=5&callback=addCkEditorAttachment&firstSave=true';
                            v3x.openWindow({
                              url   : url,
                              width : 400,
                              height  : 250,
                              resizable : "yes"
                            });
                      }                                   
                    }
                  } ]
            },

            {
              id : 'cmbMode',
              type : 'select',
              widths : [ '35%', '65%' ],
              style : 'width:200px;display:none',
              label : editor.lang.ctpassociate.openmode,
              'default' : '1',
              items : [ [ editor.lang.ctpassociate.openmode1, '1' ],
                  [ editor.lang.ctpassociate.openmode2, '2' ]

              ],
              onChange : function() {

              },
              setup : function(type, element) {
              },
              commit : function(type, element, internalCommit) {

              }
            }

        ]
      } ],
      onLoad : function() {
        // alert('onLoad');
    },
    onShow : function() {
      // alert('onShow');
      var dialog = CKEDITOR.dialog.getCurrent();
      dialog.getContentElement('info', 'txtUrl').focus();
    },
    onHide : function() {
      // alert('onHide');
    },
    onOk : function() {
      this.commitContent(editor);
      var dialog = CKEDITOR.dialog.getCurrent();
      var txtUrl = dialog.getContentElement('info', 'txtUrl');
      var array = txtUrl.getElement().data('attachements');

      var editor = this.getParentEditor();
      // this.getParentEditor().insertElement(element);
      var html = [];
      for ( var i = 0; i < associates.length; i++) {
        var att = associates[i];
        var v = [att.id,
          att.mimeType,
          att.description,
          att.reference,
          att.category,
          att.createDate,
          att.filename.replace(/\'/g,"\\'").replace(/\"/g,"&#034;"),
          att.v,
          'v_'+att.id+'_v'
        ];
        var s = [];
        for (var j = 0; j < v.length; j++) {
          s.push("\'" + v[j] + "\'");
        };
        var attachmentIdStr = att.id ? ' attachmentId="'+att.id+'"' : '';
        var script = '<a href="javascript:if(typeof(openEditorAssociate)!=\'undefined\')openEditorAssociate('+s.join(',')+');"' + attachmentIdStr +'>' + att.filename.escapeHTML() + '</a>'
        html.push(script);        
      }
      var element = editor.document.createElement("span");
      element.setHtml(html.join(editor.lang.ctpassociate.seperator));
      editor.insertElement(element);
    },
    onCancel : function() {
      // alert('onCancel');
    },
    resizable : CKEDITOR.DIALOG_RESIZE_HEIGHT
    };
  }

  CKEDITOR.dialog.add('ctpassociate', function(editor) {
    return CtpAssociateDialog(editor, 'ctpassociate');
  });

})();
