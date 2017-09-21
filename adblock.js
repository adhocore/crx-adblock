/**
 * Hide/Block/remove the forced ad that covers up the viewport.
 *
 * You can also pimp the webpage for example widen the container using "call": "evalable function body"!
 *
 * @author adhocore | Jitendra Adhikari
 * @email jiten.adhikary@gmail.com
 */
;
var Adblock = Adblock || {
  fire: function() {
    var xhr = new XMLHttpRequest();
      xhr.open("GET", chrome.extension.getURL('/rules.json'), true);
      xhr.onload = this.block.bind(this);
      xhr.send();
  },
  block: function(xhrEvt) {
    var config = xhrEvt.target.responseText;
        config = JSON.parse(config);
    var _config = config[document.location.hostname];

    if (typeof _config == 'string') {
      _config = config[_config];
    }

    if (!_config) {
      return;
    }

    for (var key in _config) {
      if (key === 'call') {
        if (typeof _config[key] !== 'string') {
          _config[key].forEach(function(cb) {
            try {
              cb && typeof window[cb] === 'function' && cb.call();
            } catch (e) {
            }
          });
        } else {
          (new Function(_config[key]))();
        }
      }

      else if (key === 'query') {
        var el = typeof _config[key] !== 'string' ? _config[key].join(',') : _config[key];

        chrome.runtime.sendMessage({
          elm: el
        });

        try {
          els = document.querySelectorAll(el);

          for (var i = 0; i < els.length; i++) {
            els[i].innerHTML = '';
            els[i].style.display = 'none';
            els[i].style.zIndex = -100;
          }
        } catch (e) {}
      }
    }
  }
};

Adblock.fire();
