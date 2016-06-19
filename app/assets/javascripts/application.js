// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require_tree ./main
//= require codemirror_base
//= require codemirror_editor
//= require turbolinks
//= require turboboost
//= require clipboard
toastr.options = {
  "positionClass": "toast-bottom-left",
  "progressBar": true,
}

$('.copy').tooltip({
  trigger: 'click',
  placement: 'left'
});

function setTooltip(btn, message) {
  $(btn).tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltip(btn) {
  setTimeout(function() {
    $(btn).tooltip('hide');
  }, 1000);
}

function ready() {
  $.material.init();
  new Clipboard('.copy-codemirror', {
    text: function(trigger) {
      console.log(trigger);
      return getCodeMirrorJQuery($(trigger).attr('target') + ' + .CodeMirror').getDoc().getValue();
    }
  });
  setupSelect(); // comes from kuhstomize
  var clipboard = new Clipboard('.copy');

  clipboard.on('success', function(e) {
    setTooltip(e.trigger, 'Copied!');
    hideTooltip(e.trigger);
  });
}
// Retrieve a CodeMirror Instance via jQuery.
function getCodeMirrorJQuery(target) {
  var $target = target instanceof jQuery ? target : $(target);
  if ($target.length === 0) {
    throw new Error('Element does not reference a CodeMirror instance.');
  }

  if (!$target.hasClass('CodeMirror')) {
    if ($target.is('textarea')) {
      $target = $target.next('.CodeMirror');
    }
  }

  return $target.get(0).CodeMirror;
};
$(document).ready(ready);
$(document).on('page:load', ready);
