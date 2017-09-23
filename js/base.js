// show balloon message
var showBalloon = function (jqObject, message, pos, timeout) {
  if (!message) message = 'Done!';
  if (!pos) pos = 'down';
  if (!timeout) timeout = 3000;
  var balloonId = Date.now();
  jqObject.attr('data-balloon', message);
  jqObject.attr('data-balloon-pos', pos);
  jqObject.attr('data-balloon-visible', '');
  jqObject.attr('data-balloon-id', balloonId);
  setTimeout(function () {
    if (jqObject.attr('data-balloon-id') != balloonId) return false;
    jqObject.removeAttr('data-balloon');
    jqObject.removeAttr('data-balloon-pos');
    jqObject.removeAttr('data-balloon-visible');
  }, timeout);
}

$(function () {
  // Ajax default setting
  $.ajaxSetup({
    cache: false,
    beforeSend: function (jqXHR, settings) {
      // do something
    },
    error: function (xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
    },
    complete: function (jqXHR, status) {
      // do something
    },
    dataType: "json",
    timeout: 5000,
    method: "POST"
  });

  /* === examples === */
  
  $("#getAjax").on("click", function () {
    var btn = $(this).prop('disabled', true);
    $.get("https://api.github.com/users/s-com")
      .done(function (json) {
        $("#getData").val(json.updated_at);
      })
      .always(function (xhr, status) {
        btn.prop('disabled', false);
        showBalloon(btn);
      });
  });

  $("#postAjax").on("click", function () {
    var btn = $(this).prop('disabled', true);
    var postData = {
      param1: $("#param1").val(),
      param2: $("#param2").val()
    };
    $.post("http://www.mocky.io/v2/59c33d5612000061089c0cab", JSON.stringify(postData))
      .done(function (json) {
        // json = { "host": "http://www.mocky.io/", "success": "true", "ref_number": "123"}
        showBalloon($("#postMessage"), 'reference number is ' + json.ref_number, 'right', 5000);
      })
      .always(function (xhr, status) {
        btn.prop('disabled', false);
        showBalloon(btn);
      });
  });

});