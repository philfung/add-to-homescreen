import './styles.css';
console.log("BOO");
class AddToHomeScreen {

/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 *
 * @param {string} appName                                 The name of the app e.g. 'Aardvark'.  
 *                                                         Try to keep as short as possible as this is displayed in the install message on the device.
 * 
 * @param {URL} appIconUrl                                 URL link to the app icon e.g. "https://aardvark.app/icon.png" .  
 *                                                         Should have rounded corners, square, and larger than 40 x 40 pixels.
 *
 * 
 * @param (URL) assetUrl                                   
 * @param {boolean} showErrorMessageForUnsupportedBrowsers If true, show an error message if the user is on an unsupported browser/device on IOS or Android
 *                                                         e.g 
 *                                                         "On IOS, adding to homescreen is only supported on Safari.  
 *                                                         Please open this website on Safari [Copy link to clipboard]"
 *                                                         Default is true.
 * @param {boolean} allowUserToCloseModal                  If true, user can close the modal if they click outside the modal window.  
 *                                                         (I've found that user is way more likely to install if user has no other option.) 
 *                                                         Default is false.
 */
  constructor({
    appName,
    appIconUrl,
    assetUrl,
    showErrorMessageForUnsupportedBrowsers,
    allowUserToCloseModal
  }) {
    this.appName = appName;
    this.appIconUrl = appIconUrl;
    this.assetUrl = assetUrl;
    this.showErrorMessageForUnsupportedBrowsers = (typeof showErrorMessageForUnsupportedBrowsers === "undefined") ? true : showErrorMessageForUnsupportedBrowsers;
    this.allowUserToCloseModal = (typeof allowUserToCloseModal === "undefined") ? false : allowUserToCloseModal;

    this.closeEventListener = null;
  }

  isStandAlone() {
    // test if web app is already installed to home screen
    return window.navigator.standalone || // IOS (TODO: detect iPad 13)
      window.matchMedia('(display-mode: standalone)').matches; // Android
  }

  isDeviceAndroid() {
    return navigator.userAgent.match(/android/i);
  }

  isDeviceIOS() {
    return navigator.userAgent.match(/iphone|ipad|ipod/i);
  }

  isBrowserAndroidChrome() {
    return this.isDeviceAndroid() && navigator.userAgent.match(/chrome/i);
  }

  isBrowserIOSSafari() {
    return this.isDeviceIOS() && navigator.userAgent.match(/safari/i);
  }

  show() {
    // the main function 
    // show the message modal to the user to add app to home screen
    // returns an object indicating what device/browser was detected, in case user wants
    // to use that info for some other UI purpose
    const container = document.createElement('div');
    container.className = 'add-to-homescreen-container';

    var containerInnerHTML;
    var ret;

    if (this.isStandAlone()) {
      ret = new AddToHomeScreen.ReturnObj(
        {
          isStandAlone: true,
          canBeStandAlone: true,
          device: (this.isDeviceIOS() ? 'IOS' : 'ANDROID')
        }
      );
    } else if (this.isDeviceIOS() && this.isBrowserIOSSafari()) {
      ret = new AddToHomeScreen.ReturnObj(
        {
          isStandAlone: false,
          canBeStandAlone: true,
          device: 'IOS'
        }
      );
      containerInnerHTML = this._genIOSSafari();
    } else if (this.isDeviceAndroid() && this.isBrowserAndroidChrome()) {
      ret = new AddToHomeScreen.ReturnObj(
        {
          isStandAlone: false,
          canBeStandAlone: true,
          device: 'ANDROID'
        }
      );
      containerInnerHTML = this._genAndroidChrome();
    } else if (this.isDeviceIOS()) {
      ret = new AddToHomeScreen.ReturnObj(
        {
          isStandAlone: false,
          canBeStandAlone: false,
          device: 'IOS'
        }
      );
      if (this.showErrorMessageForUnsupportedBrowsers) {
        containerInnerHTML = this._genErrorMessage(
          `Please open this website with the Safari or Chrome app.`,
          `Adding to home screen is only supported in Safari or Chrome on IOS.`
        );
      }
    } else if (this.isDeviceAndroid()) {
      ret = new AddToHomeScreen.ReturnObj(
        {
          isStandAlone: false,
          canBeStandAlone: false,
          device: 'ANDROID'
        }
      );
      if (this.showErrorMessageForUnsupportedBrowsers) {
        containerInnerHTML = this._genErrorMessage(
          `Please open this website with the Chrome app.`,
          `Adding to home screen is only supported in Chrome on Android.`
        );
      }
    } else {
      ret = new AddToHomeScreen.ReturnObj(
        {
          isStandAlone: false,
          canBeStandAlone: false,
          device: ''
        }
      );
      if (this.showErrorMessageForUnsupportedBrowsers) {
        containerInnerHTML += this._genErrorMessage(
          `Please open this website on a mobile device.`,
          `Installing to your home screen is currently only supported on IOS and Android.`
        );
      }
    }

    if (containerInnerHTML) {
      container.innerHTML = containerInnerHTML;
      document.body.appendChild(container);
      this._registerCloseListener();

      setTimeout(() => {
        container.classList.add('visible');
      }, 50);
    }

    return ret;

  }

  close() {
    // close the modal if the user clicks outside of the modal contents
    const container = document.querySelector('.add-to-homescreen-container');
    if (container) {
      container.classList.remove('visible');
      setTimeout(() => {
        container.remove();
        if (this.closeEventListener) {
          window.removeEventListener('touchstart', this.closeEventListener);
          this.closeEventListener = null;
        }
      }, 300);
    }
  }

  // below are all internal functions
  _genLogo() {
    return `
      <div class="logo">
        <img src="` + this.appIconUrl + `" alt="logo" />
      </div>
      `;
  }

  _genErrorMessage(title, body) {
    return this._genLogo() +
      this._genModalStart() +
      `<div class="error-title">` + title + `</div>` +
      `<div class="error-body">` + body + `</div>` +
      `<button class="error-copy-link-button" onclick="AddToHomeScreen.copyToClipboard()">Copy Website Link to Clipboard</button>` +
      this._genModalEnd();
  }


  _genTitleWithMessage(message) {
    return `
      <div class="title">` + message + `</div>
      `;
  }

  _genTitle() {
    return this._genTitleWithMessage(`Install the ` + this.appName + ` app to continue`);
  }

  _genModalStart() {
    return `<div class="modal">`;
  }

  _genModalEnd() {
    return `</div>`;
  }

  _genListStart() {
    return `<div class="list">`;
  }

  _genListEnd() {
    return `</div>`;
  }

  _genListItem(numberString, instructionHTML) {
    return `
    <div class="list-item">
      <div class="number-container">
        <div class="circle">
          <div class="number">` + numberString + `</div>
        </div>
      </div>
      <div class="instruction">` + instructionHTML + `</div>
    </div>`;
  }

  _genAssetUrl(fileName) {
    return this.assetUrl + fileName;
  }

  _genIOSSafari() {
    return this._genLogo() +
      this._genModalStart() +
      this._genTitle() +
      this._genListStart() +
      this._genListItem(`1`, `Tap the <img class="ios-safari-sharing-api-button" src="` + this._genAssetUrl('ios-safari-sharing-api-button.svg') + `"/> button below.`) +
      this._genListItem(`2`, `Select <img class="ios-safari-add-to-home-screen-button" src="` + this._genAssetUrl('ios-safari-add-to-home-screen-button.svg') + `"/> from the menu that pops up. <span class="emphasis">You may need to scroll down to find this menu item.</span></b>`) +
      this._genListItem(`3`, `Open the <img class="your-app-icon" src="` + this.appIconUrl + `"/> app.`) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="add-to-homescreen-ios-safari-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('ios-safari-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
  }

  _genAndroidChrome() {
    return this._genLogo() +
      this._genModalStart() +
      this._genTitle() +
      this._genListStart() +
      this._genListItem(`1`, `Tap the <img class="android-chrome-more-button" src="` + this._genAssetUrl('android-chrome-more-button.svg') + `"/> button in the browser bar.`) +
      this._genListItem(`2`, `Tap <img class="android-chrome-add-to-homescreen-button" src="` + this._genAssetUrl('android-chrome-add-to-home-screen-button.svg') + `"/>.`) +
      this._genListItem(`3`, `Open the <img class="your-app-icon" src="` + this.appIconUrl + `"/> app.`) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="add-to-homescreen-android-chrome-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('android-chrome-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
  }

  _registerCloseListener() {

    if (this.allowUserToCloseModal) {
      var self = this;
      this.closeEventListener = function (e) {
        var modal = document.getElementsByClassName('add-to-homescreen-container')[0].getElementsByClassName('modal')[0];
        if (!modal.contains(e.target)) {
          self.close();
        };
      };
      window.addEventListener('touchstart', this.closeEventListener);
    }
  }

  static copyToClipboard() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(function () {
      document.getElementsByClassName('error-copy-link-button')[0].innerHTML = 'Link Copied to Clipboard!';
    });
  }

}

AddToHomeScreen.ReturnObj = class R {
  constructor({ isStandAlone, canBeStandAlone, device }) {
    this.isStandAlone = isStandAlone;
    this.canBeStandAlone = canBeStandAlone;
    this.device = device; // IOS, ANDROID, or '' (desktop/unknown)
  }
}




export default AddToHomeScreen;
