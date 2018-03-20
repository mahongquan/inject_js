var shim = '' + function() {
    if(typeof window.showModalDialog !== 'function') {
    window.showModalDialog = function() {
      var opts = arguments[2];
      opts = opts
        .replace(/;/g, ',')
        .replace(/:/g, '=')
        .replace(/dialogWidth/g, 'width')
        .replace(/dialogHeight/g, 'height')
        .replace(/center/g, 'centerScreen');
        return window.open.call(this, arguments[0], '_blank', opts );
    };
  }
} + '';
console.log(shim);