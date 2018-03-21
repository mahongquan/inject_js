(function() {
  CKEDITOR.plugins.add('ctpassociate', {
    lang:['zh-cn','en','zh'],
    init: function (editor) {
        var pluginName = 'ctpassociate';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/ctpassociate.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton(pluginName,
        {
            label: editor.lang.ctpassociate.pluginname,
            icon: this.path + 'images/associate.png',
            command: pluginName
        });
    }
});


})();


