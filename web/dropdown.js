function() {
  var J = $(this).attr("title");
  var H = $(this).attr("value");
  var I = $(this).attr("tar");
  J = J.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  F.html(J);
  $("#" + I).val(H);
  G.hide();
  $("#" + A.id + "_dropdown_content_iframe").hide();
  A.onchange()
}

function() {
  var Y = A(this).attr("value");
  A(K.selects).each(function() {
    var Z = A(this).attr("id");
    A("#" + Z + "_dropdown_content a").eq(0).trigger("click")
  });
  for (var X = 0; X < K.inputs.length; X++) {
    var W = K.inputs[X];
    A("#" + W.id).attr("value", "");
    if (A("#" + W.id).attr("type") == "hidden") {
      A("#" + W.id + "_txt").attr("value", "")
    }
  }
  if (U != null) {
    A("#from_" + U).val("");
    A("#to_" + U).val("")
  }
  A(".condition_text").addClass("hidden");
  A("#" + Y + "_container").removeClass("hidden");
  if (Y != "") {
    A(".search_btn").eq(0).removeClass("margin_l_5")
  } else {
    A(".search_btn").eq(0).addClass("margin_l_5")
  }
}