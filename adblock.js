/**
 * Hide/Block/remove the forced ad that covers up the viewport
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
        config = config[document.location.hostname];
    if (!config) {
      return;
    }
    for (var key in config) {
      if (key === 'call') {
        config[key].forEach(function(cb) {
          try { cb.call(); } catch (e) {}
        });
      } else {
        el = config[key].join(',');
        chrome.runtime.sendMessage({
          elm: el
        });
        try {
          els = document.querySelectorAll(el);
          for (var i=0; i<els.length; i++) {
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