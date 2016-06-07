/* 
 * This is kuhstomize.js, it handles most of the front-end operations
 * such as creating CodeMirrors Editors or Viewers or cloning selects
 *
 * Please note, the lower you scroll, the dirtier it gets ;)
 *
 */

var snippet_limit = 5;
var counter = 1;

var editors = [];
var viewers = [];
function editor(id) {
  ed = CodeMirror.fromTextArea(id, {
    theme: 'solarized dark',
    keyMap: isMobile() ? 'default' : 'vim',
    lineNumbers: true,
    viewportMargin: Infinity
  });
  editors.push(ed);
}
function viewer(id, lang) {
  v = CodeMirror.fromTextArea(id, {
    theme: 'solarized dark',
    lineNumbers: true,
    readOnly: true,
    mode: lang,
    viewportMargin: Infinity
  });
  viewers.push(v);
}

function addSnippet(div) {
  if (counter == snippet_limit) {
    toastr.error("Maximum of " + snippet_limit + " snippets reached")
  } else {
    var snippet = document.createElement('div');

    container = '<div class="jumbotron" style="padding: 0;">'
    textarea = '<textarea autofocus class="hero-spacer z-depth-2" id="gist-'+counter+'" name="gist[]"></textarea>';
    select = '<div class="form-group" style="margin: 10px; overflow: hidden;"><label>Language</label><select id="select-'+counter+'"name="lang[]"></select></div>'
    div_end = '</div>'

    snippet.innerHTML = container+textarea+select+div_end;
    document.getElementById(div).appendChild(snippet);
    editor($('#gist-'+counter)[0]);
    cloneOptions($('#select-0 option'), $('#select-'+counter));
		setupSelect();
    counter++;
    toastr.success('You are ready to share even more crappy code! ('+counter+'/'+snippet_limit+')', 'Success!');
  }
}

function setupSelect() {
$('select').select2();
$('select').off("select2:select");
$('select').on("select2:select", function(e) {
     console.log(e.currentTarget.id);
     ed = e.currentTarget.id.split('-')[1];
     console.log(ed);
     editors[ed].setOption('mode', e.target.value);
   });

}

function cloneOptions(from, to) {
  from.each(function(key, value) {
    to.append($("<option>", {
      value: value.value,
      text: value.text,
      disabled: (value.disabled)
    }));
  });
}

function isMobile() {
  return window.matchMedia("only screen and (max-width: 760px)").matches;
}

function createExpireSlider(div) {
  var nonLinearSlider = document.getElementById(div)
	noUiSlider.create(nonLinearSlider, {
		behaviour: 'tap',
		start: 1209600,
		range: {
			'min': [ 86400, 86400 ],
			'30%': [ 604800, 604800 ],
			'60%': [ 2419200, 2419200 ],
			'max': [ 29030400 ]
		}
	});
  var value = document.getElementById('test-value')
  var form_val = document.getElementById('form-value')
	nonLinearSlider.noUiSlider.on('update', function ( values, handle ) {
		if ( !handle ) {
      var val = parseInt(values[handle]) / 86400;
      if (val >= 28) {
			  value.value = (val/7/4) + ' month(s)';
      } else if (val >= 7) {
			  value.value = (val/7) + ' week(s)';
      } else {
			  value.value = val + ' day(s)';
      }
      form_val.value = values[handle];
		}
	});
}
