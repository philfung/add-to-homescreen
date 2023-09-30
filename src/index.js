import './styles.css';

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
    return navigator.userAgent.match(/Android/);
  }

  isDeviceIOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/);
  }

    /* Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)
     AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0
     Mobile/14E5239e Safari/602.1 */
  isBrowserIOSSafari() {
    return this.isDeviceIOS() && 
    window.navigator.userAgent.match(/Safari/) && 
    !this.isBrowserIOSChrome() &&
    !this.isBrowserIOSFirefox() &&
    !this.isBrowserIOSInAppFacebook() &&
    !this.isBrowserIOSInAppLinkedin() &&
    !this.isBrowserIOSInAppInstagram() &&
    !this.isBrowserIOSInAppThreads() &&
    !this.isBrowserIOSInAppTwitter();
  }

  /* Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)
     AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75
     Mobile/14E5239e Safari/602.1 */
  isBrowserIOSChrome() {
    return this.isDeviceIOS() && navigator.userAgent.match(/CriOS/);
  }

  /* Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) 
  AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/114.1 Mobile/15E148 Safari/605.1.15 */
  isBrowserIOSFirefox() {
    return this.isDeviceIOS() && window.navigator.userAgent.match(/FxiOS/);
  }

  isBrowserIOSInAppFacebook() {
    if (!this.isDeviceIOS()) {
      return false;
    }

    return window.navigator.userAgent.match(/FBAN|FBAV/);
  }

  isBrowserIOSInAppLinkedin() {
    if (!this.isDeviceIOS()) {
      return false;
    }

    return window.navigator.userAgent.match(/LinkedInApp/);
  }

  isBrowserIOSInAppInstagram() {
    if (!this.isDeviceIOS()) {
      return false;
    }


        // TODO: this is incompatabile with Insta/Threads mobile website links.
        // TODO: this solution only works with first-level links
    if (window.document.referrer.match('//l.instagram.com/')) {
      return true;
    }

    // Instagram and Threads in-app browsers only 
    // take up ~90% of the height of the screen
    if (window.navigator.userAgent.match(/iPhone/) &&
      window.screen.height && window.outerHeight &&
      window.outerHeight < window.screen.height) {
      return true;
    }

    return false;
  }

  isBrowserIOSInAppThreads() {
    return this.isBrowserIOSInAppInstagram();
  }

  isBrowserIOSInAppTwitter() {
    if (!this.isDeviceIOS()) {
      return false;
    }

    // TODO: this solution is incompatabile with Twitter mobile website links
    // TODO: this solution only works with first-level links
    return window.document.referrer.match('//t.co/');
  }

  /* Mozilla/5.0 (Linux; Android 10) 
     AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.92 Mobile Safari/537.36 */
  isBrowserAndroidChrome() {
    return this.isDeviceAndroid() && 
    window.navigator.userAgent.match(/Chrome/) &&
    !this.isBrowserAndroidFacebook() &&
    !this.isBrowserAndroidSamsung() &&
    !this.isBrowserAndroidFirefox();
  }

  /*Mozilla/5.0 (Linux; Android 12; SM-S908U1 Build/SP1A.210812.016; wv) 
    AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.88 
    Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/377.0.0.22.107;]*/
  isBrowserAndroidFacebook() {
    return this.isDeviceAndroid() && window.navigator.userAgent.match(/FBAN|FBAV/);
  }

  /* Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-S918B) AppleWebKit/537.36 
  (KHTML, like Gecko) SamsungBrowser/21.0 Chrome/110.0.5481.154 Mobile Safari/537.36 */
  isBrowserAndroidSamsung() {
    return this.isDeviceAndroid() && window.navigator.userAgent.match(/SamsungBrowser/);
  }

  /* Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/114.0 Firefox/114.0 */
  isBrowserAndroidFirefox() {
    return this.isDeviceAndroid() && window.navigator.userAgent.match(/Firefox/);
  }

  show() {
    // the main function 
    // show the message modal to the user to add app to home screen
    // returns an object indicating what device/browser was detected, in case user wants
    // to use that info for some other UI purpose
    const container = document.createElement('div');
    container.classList.add('adhs-container');

    // dark overlay covers entire body
    container.style.height = document.body.clientHeight + 'px';
    //container.style.width = document.body.clientWidth + 'px';
    container.style.width = window.innerWidth + 'px';

    var ret;
    var _isStandAlone = this.isStandAlone();

    if (_isStandAlone) { // already installed
      ret = new AddToHomeScreen.ReturnObj(
        {
          isStandAlone: true,
          canBeStandAlone: true,
          device: (this.isDeviceIOS() ? 'IOS' : 'ANDROID')
        }
      );
    } else if (this.isDeviceIOS()) { // ios
      if (this.isBrowserIOSSafari()) {
        ret = new AddToHomeScreen.ReturnObj(
          {
            isStandAlone: false,
            canBeStandAlone: true,
            device: 'IOS'
          }
        );
        this._genIOSSafari(container);
      } else if (this.isBrowserIOSChrome()) {
        ret = new AddToHomeScreen.ReturnObj(
          {
            isStandAlone: false,
            canBeStandAlone: true,
            device: 'IOS'
          }
        );
        this._genIOSChrome(container);
      } else if (
        this.isBrowserIOSInAppFacebook() ||
        this.isBrowserIOSInAppLinkedin()
        ) {
        ret = new AddToHomeScreen.ReturnObj(
          {
            isStandAlone: false,
            canBeStandAlone: false,
            device: 'IOS'
          }
        );
        this._genIOSInAppBrowserOpenInSystemBrowser(container);
      } else if (
        this.isBrowserIOSInAppInstagram() ||
        this.isBrowserIOSInAppThreads() ||
        this.isBrowserIOSInAppTwitter()
      ) {
        ret = new AddToHomeScreen.ReturnObj(
          {
            isStandAlone: false,
            canBeStandAlone: false,
            device: 'IOS'
          }
        );
        this._genIOSInAppBrowserOpenInSafariBrowser(container);
      } else  {
        ret = new AddToHomeScreen.ReturnObj(
          {
            isStandAlone: false,
            canBeStandAlone: false,
            device: 'IOS'
          }
        );
        if (this.showErrorMessageForUnsupportedBrowsers) {
          this._genErrorMessage(
            container,
            `Please open this website with the Safari or Chrome app.`,
            `Adding to home screen is only supported in Safari or Chrome on IOS.`
          );
        }
      }
    } else if (this.isDeviceAndroid()) { // android
      if (this.isBrowserAndroidChrome()) {
        ret = new AddToHomeScreen.ReturnObj(
          {
            isStandAlone: false,
            canBeStandAlone: true,
            device: 'ANDROID'
          }
        );
        this._genAndroidChrome(container);
      } else if (this.isBrowserAndroidFacebook()) {
        ret = new AddToHomeScreen.ReturnObj(
          {
            isStandAlone: false,
            canBeStandAlone: false,
            device: 'ANDROID'
          }
        );
        this._genIOSInAppBrowserOpenInSystemBrowser(container);
      } else {
        ret = new AddToHomeScreen.ReturnObj(
          {
            isStandAlone: false,
            canBeStandAlone: false,
            device: 'ANDROID'
          }
        );
        if (this.showErrorMessageForUnsupportedBrowsers) {
          this._genErrorMessage(
            container,
            `Please open this website with the Chrome app.`,
            `Adding to home screen is only supported in Chrome on Android.`
          );
        }
      }
    } else { // desktop
      ret = new AddToHomeScreen.ReturnObj(
        {
          isStandAlone: false,
          canBeStandAlone: false,
          device: ''
        }
      );
      if (this.showErrorMessageForUnsupportedBrowsers) {
        this._genErrorMessage(
          container,
          `Please open this website on a mobile device.`,
          `Installing to your home screen is currently only supported on IOS and Android.`
        );
      }
    }

    if (!_isStandAlone) {
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
    const container = document.querySelector('.adhs-container');
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
      <div class="adhs-logo">
        <img src="` + this.appIconUrl + `" alt="logo" />
      </div>
      `;
  }

  _genErrorMessage(container, title, body) {
    var containerInnerHTML =
      this._genLogo() +
      this._genModalStart() +
      `<div class="adhs-error-title">` + title + `</div>` +
      `<div class="adhs-error-body">` + body + `</div>` +
      `<button class="adhs-error-copy-link-button" onclick="AddToHomeScreen.copyToClipboard();" ontouchstart="AddToHomeScreen.copyToClipboard();">Copy Website Link to Clipboard</button>` +
      this._genModalEnd();
    container.innerHTML = containerInnerHTML;
  }


  _genTitleWithMessage(message) {
    return `
      <div class="adhs-title">` + message + `</div>
      `;
  }

  _genTitle() {
    return this._genTitleWithMessage(`Install the ` + this.appName + ` app to continue`);
  }

  _genModalStart() {
    return `<div class="adhs-modal">`;
  }

  _genModalEnd() {
    return `</div>`;
  }

  _genListStart() {
    return `<div class="adhs-list">`;
  }

  _genListEnd() {
    return `</div>`;
  }

  _genListItem(numberString, instructionHTML) {
    return `
    <div class="adhs-list-item">
      <div class="adhs-number-container">
        <div class="adhs-circle">
          <div class="adhs-number">` + numberString + `</div>
        </div>
      </div>
      <div class="adhs-instruction">` + instructionHTML + `</div>
    </div>`;
  }

  _genAssetUrl(fileName) {
    return this.assetUrl + fileName;
  }

  _genIOSSafari(container) {
    var containerInnerHTML = 
      this._genLogo() +
      this._genModalStart() +
      this._genTitle() +
      this._genListStart() +
      this._genListItem(`1`, `Tap the <img class="adhs-ios-safari-sharing-api-button" src="` + this._genAssetUrl('ios-safari-sharing-api-button.svg') + `"/> button below.`) +
      this._genListItem(`2`, `Select <img class="adhs-ios-safari-add-to-home-screen-button" src="` + this._genAssetUrl('ios-safari-add-to-home-screen-button.svg') + `"/> from the menu that pops up. <span class="adhs-emphasis">You may need to scroll down to find this menu item.</span>`) +
      this._genListItem(`3`, `Open the <img class="adhs-your-app-icon" src="` + this.appIconUrl + `"/> app.`) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="adhs-ios-safari-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('ios-safari-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-ios');
    container.classList.add('adhs-safari');
  }

  _genIOSChrome(container) {
    var containerInnerHTML = 
      this._genLogo() +
      this._genModalStart() +
      this._genTitle() +
      this._genListStart() +
      this._genListItem(`1`, `Tap the <img class="adhs-ios-chrome-more-button" src="` + this._genAssetUrl('ios-chrome-more-button.svg') + `"/> button in the upper right corner.`) +
      this._genListItem(`2`, `Select <img class="adhs-ios-chrome-add-to-home-screen-button" src="` + this._genAssetUrl('ios-chrome-add-to-home-screen-button.svg') + `"/> from the menu that pops up. <span class="adhs-emphasis">You may need to scroll down to find this menu item.</span></b>`) +
      this._genListItem(`3`, `Open the <img class="adhs-your-app-icon" src="` + this.appIconUrl + `"/> app.`) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="adhs-ios-chrome-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('ios-chrome-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-ios');
    container.classList.add('adhs-chrome');
  }

  _genIOSInAppBrowserOpenInSystemBrowser(container) {
    var containerInnerHTML = 
      this._genLogo() +
      this._genModalStart() +
      this._genTitle() +
      this._genListStart() +
      this._genListItem(`1`, `Tap the <img class="adhs-more-button" src="` + this._genAssetUrl('generic-more-button.svg') + `"/> button above.`) +
      this._genListItem(`2`, `Tap <span class="adhs-emphasis">Open in browser</span>  .`) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="adhs-inappbrowser-openinsystembrowser-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('generic-vertical-up-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-ios');
    container.classList.add('adhs-inappbrowser-openinsystembrowser');
  }

  _genIOSInAppBrowserOpenInSafariBrowser(container) {
    var containerInnerHTML = 
      this._genLogo() +
      this._genModalStart() +
      this._genTitle() +
      this._genListStart() +
      this._genListItem(`1`, `Tap the <img class="adhs-more-button" src="` + this._genAssetUrl('openinsafari-button.png') + `"/> button below to open your system browser.`) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="adhs-inappbrowser-openinsafari-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('generic-vertical-down-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-ios');
    container.classList.add('adhs-inappbrowser-openinsafari');
  }

  _genAndroidChrome(container) {
    var containerInnerHTML = 
      this._genLogo() +
      this._genModalStart() +
      this._genTitle() +
      this._genListStart() +
      this._genListItem(`1`, `Tap the <img class="adhs-android-chrome-more-button" src="` + this._genAssetUrl('android-chrome-more-button.svg') + `"/> button in the browser bar.`) +
      this._genListItem(`2`, `Tap <img class="adhs-android-chrome-add-to-homescreen-button" src="` + this._genAssetUrl('android-chrome-add-to-home-screen-button.svg') + `"/>` +  
      `or <img class="adhs-android-chrome-install-app" src="` + this._genAssetUrl('android-chrome-install-app.svg') + `"/> .`) +
      this._genListItem(`3`, `Open the <img class="adhs-your-app-icon" src="` + this.appIconUrl + `"/> app.`) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="adhs-android-chrome-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('android-chrome-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-android');
    container.classList.add('adhs-chrome');
  }

  _registerCloseListener() {

    if (this.allowUserToCloseModal) {
      var self = this;
      this.closeEventListener = function (e) {
        var modal = document.getElementsByClassName('adhs-container')[0].getElementsByClassName('adhs-modal')[0];
        if (!modal.contains(e.target)) {
          self.close();
        };
      };
      window.addEventListener('touchstart', this.closeEventListener);
    }
  }

  static copyToClipboard() {
    const currentUrl = window.location.href;
    try {
      window.navigator.clipboard.writeText(currentUrl);
      document.getElementsByClassName('adhs-error-copy-link-button')[0].innerHTML = 'Link Copied to Clipboard!';
    } catch (err) {
      // android browser doesn't support clipboard API if not an https link
      document.getElementsByClassName('adhs-error-copy-link-button')[0].innerHTML = 'Failed to Copy to Clipboard! (Try Again from "https://" Link)';
    }

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
