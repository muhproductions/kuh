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
toastr.options = {
  "positionClass": "toast-bottom-left",
  "progressBar": true,
}


function ready() {
  $.material.init();
  setupSelect(); // comes from kuhstomize
}

$(document).ready(ready);
$(document).on('page:load', ready);
