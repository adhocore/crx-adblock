/**
 * Hide/Block/remove the forced ad that covers up the viewport
 * 
 * @author adhocore | Jitendra Adhikari
 * @email jiten.adhikary@gmail.com
 */
;
function injectCss(elm)
{
  chrome.tabs.insertCSS(null, {code: elm+'{display:none !important;z-index:-100;}'});
}

chrome.runtime.onMessage.addListener(
  function(data, sender, sendResponse) {
    if (data.elm) {
      injectCss(data.elm);
    }
  }
);
