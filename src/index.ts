import './styles.css';

// Configure I18n
const i18n = require('i18n');

i18n.configure({
  locales: ['da','de','en','es','fr','pt','ru'],
  staticCatalog: {
    da: require('./locales/da.json'),
    de: require('./locales/de.json'),
    en: require('./locales/en.json'),
    es: require('./locales/es.json'),
    fr: require('./locales/fr.json'),
    pt: require('./locales/pt.json'),
    ru: require('./locales/ru.json')
  },
  directory: '.'
});

enum DeviceType {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  DESKTOP = 'DESKTOP'
}

class DeviceInfo {
  isStandAlone: boolean;
  canBeStandAlone: boolean;
  device: DeviceType;
  constructor(isStandAlone: boolean, canBeStandAlone: boolean, device: DeviceType) {
    this.isStandAlone = isStandAlone;
    this.canBeStandAlone = canBeStandAlone;
    this.device = device;
  }
}

interface ADHSBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: ADHSBeforeInstallPromptEvent;
  }
}

class AddToHomeScreen {
  appName: string;
  appIconUrl: string;
  assetUrl: string;
  maxModalDisplayCount: number;
  closeEventListener: EventListener | null;

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
   * @param {URL} assetUrl                                   directory of static image assets needed by the AddToHomeScreen framework e.g. "https://aardvark.app/dist/assets/img/"
   * 
   *
   * @param {int} maxModalDisplayCount                       If set, the modal will only show this many times.
   *                                                         Default is -1 (no limit).  (Debugging: Use this.clearModalDisplayCount() to reset the count)
   */
  constructor({
    appName,
    appIconUrl,
    assetUrl,
    maxModalDisplayCount
  }: {
    appName: string,
    appIconUrl: string,
    assetUrl: string,
    maxModalDisplayCount: number
  }) {
    this.appName = appName;
    this._assertArg(
      "appName",
      typeof this.appName === "string" && this.appName.length > 0
    );
    this.appIconUrl = appIconUrl;
    this._assertArg(
      "appIconUrl",
      typeof this.appIconUrl === "string" && this.appIconUrl.length > 0
    );
    this.assetUrl = assetUrl;
    this._assertArg(
      "assetUrl",
      typeof this.assetUrl === "string" && this.assetUrl.length > 0
    );
    this.maxModalDisplayCount = (maxModalDisplayCount === undefined) ? -1 : maxModalDisplayCount;
    this._assertArg(
      "maxModalDisplayCount",
      Number.isInteger(this.maxModalDisplayCount)
    );
    this.closeEventListener = null;

    this._genDesktopChrome = this._genDesktopChrome.bind(this);

    // handles the case where the chrome prompt is not immediately shown on page load, 
    // such as an onclick handler
    if (this.shouldShowDesktopInstallPromptBasedOnDevice()) {
        this._registerDesktopInstallPromptEvent = this._registerDesktopInstallPromptEvent.bind(this);
        this._registerDesktopInstallPromptEvent();
    }
  }

  isStandAlone() {
    // test if web app is already installed to home screen
    return ('standalone' in window.navigator && window.navigator.standalone) || // IOS (TODO: detect iPad 13)
      window.matchMedia('(display-mode: standalone)').matches; // Android and Desktop Chrome/Safari/Edge
  }

  show(locale='en'): DeviceInfo {
    i18n.setLocale(locale);
    var ret: DeviceInfo;

    var device: DeviceType;
    var isStandAlone: boolean;
    var canBeStandAlone: boolean;
    if (this.isDeviceIOS()) {
      device = DeviceType.IOS;
    } else if (this.isDeviceAndroid()) {
      device = DeviceType.ANDROID;
    } else {
      device = DeviceType.DESKTOP;
    }

    if (this.isStandAlone()) {
      this.debugMessage("ALREADY STANDALONE");

      ret = new DeviceInfo(
          isStandAlone = true,
          canBeStandAlone = true,
          device = device
      );

    } else if (this._hasReachedMaxModalDisplayCount()) {
      ret = new DeviceInfo(
        isStandAlone = false,
        canBeStandAlone = false,
        device = device
      );

    } else if (this.isDeviceIOS() || this.isDeviceAndroid()) {
      this.debugMessage("NOT STANDALONE - IOS OR ANDROID");
      var shouldShowModal = true;
      this._incrModalDisplayCount();
      var container = this._createContainer(
        false // include_modal
      );

      if (this.isDeviceIOS()) { // ios
        if (this.isBrowserIOSSafari()) {
          ret = new DeviceInfo(
            isStandAlone = false,
            canBeStandAlone = true,
            device = device
          );

          this._genIOSSafari(container);
        } else if (this.isBrowserIOSChrome()) {
          ret = new DeviceInfo(
            isStandAlone = false,
            canBeStandAlone = true,
            device = device
          );

          this._genIOSChrome(container);
        } else if (
          this.isBrowserIOSInAppFacebook() ||
          this.isBrowserIOSInAppLinkedin()
        ) {
          ret = new DeviceInfo(
            isStandAlone = false,
            canBeStandAlone = false,
            device = device
          );

          this._genIOSInAppBrowserOpenInSystemBrowser(container);
        } else if (
          this.isBrowserIOSInAppInstagram() ||
          this.isBrowserIOSInAppThreads() ||
          this.isBrowserIOSInAppTwitter()
        ) {
          ret = new DeviceInfo(
            isStandAlone = false,
            canBeStandAlone = false,
            device = device
          );

          this._genIOSInAppBrowserOpenInSafariBrowser(container);
        } else {
          ret = new DeviceInfo(
            isStandAlone = false,
            canBeStandAlone = false,
            device = device
          );
          shouldShowModal = false;
        }
      } else { // android
        if (this.isBrowserAndroidChrome()) {
          ret = new DeviceInfo(
            isStandAlone = false,
            canBeStandAlone = true,
            device = device
          );
          this._genAndroidChrome(container);
        } else if (this.isBrowserAndroidFacebook()) {
          ret = new DeviceInfo(
            isStandAlone = false,
            canBeStandAlone = false,
            device = device
          );
          this._genIOSInAppBrowserOpenInSystemBrowser(container);
        } else {
          ret = new DeviceInfo(
            isStandAlone = false,
            canBeStandAlone = false,
            device = device
          );

          shouldShowModal = false;
        }
      }
      
      if (shouldShowModal) {
        this._addContainerToBody(container);
      }

    } else {
      this.debugMessage("DESKTOP");
      ret = new DeviceInfo(
        isStandAlone = false,
        canBeStandAlone = false,
        device = device
      );

      if (this.isDesktopChrome() || this.isDesktopEdge()) {
        this.debugMessage("DESKTOP CHROME");
        this.showDesktopInstallPrompt();
      } else if (this.isDesktopSafari()) {
        this.debugMessage("DESKTOP SAFARI");
        this._showDesktopSafariPrompt();
      }
    
    } 

    return ret;

  }

  closeModal() {
    // close the modal if the user clicks outside of the modal contents
    const container = document.querySelector('.adhs-container');
    if (container) {
      container.classList.remove('visible');
      setTimeout(() => {
        container.remove();
        if (this.closeEventListener) {
          window.removeEventListener('touchstart', this.closeEventListener);
          window.removeEventListener('click', this.closeEventListener);
          this.closeEventListener = null;
        }
      }, 300);
    }
  }

  /**** Device Detection Functions ****/

  isDeviceAndroid() {
    return navigator.userAgent.match(/Android/);
  }

  isDeviceIOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/);
  }

  // isBrowserIOSIPadSafari() {
  //   return navigator.userAgent.match(/Macintosh/) && 
  //   navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
  // }

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


    // TODO: this is incompatible with Instagram/Threads mobile website links.
    // TODO: this solution only works with first-level links
    if (window.document.referrer.match('//l.instagram.com/')) {
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

    // TODO: this solution is incompatible with Twitter mobile website links
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

  isDesktopWindows() {
    return navigator.userAgent.includes("Windows");
  }

  isDesktopMac() {
    return navigator.userAgent.includes("Macintosh");
  }

  isDesktopChrome() {
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.includes("Chrome") && !userAgent.includes("Edg"); // Exclude Edge browser
    const isDesktop = userAgent.includes("Windows") || userAgent.includes("Macintosh") || userAgent.includes("Linux");
  
    return isChrome && isDesktop;
  }

  isDesktopSafari() {
    const userAgent = navigator.userAgent;
    const isSafari = userAgent.includes("Safari") && !userAgent.includes("Chrome") && !userAgent.includes("Edg");
    const isDesktop = userAgent.includes("Macintosh") || userAgent.includes("Windows");
  
    return isSafari && isDesktop;
  }

  isDesktopEdge() {
    const userAgent = window.navigator.userAgent;
    return userAgent.includes('Edg/');
  }

  /**** Internal Functions ****/


  _getAppDisplayUrl():string {
    // return 'https://aardvark.app';
    const currentUrl = new URL(window.location.href);
    return currentUrl.href.replace(/\/$/, "");
  }

  _assertArg(variableName: string, booleanExp: boolean) {  
    if (!booleanExp) {
      throw new Error("AddToHomeScreen: variable '" + variableName + "' has an invalid value.");
    }
  }

  _createContainer(include_modal=false) {
    const container = document.createElement('div');
    container.classList.add('adhs-container');

    if (include_modal) {
      var containerInnerHTML =
      this._genLogo() +
      this._genModalStart() +
      this._genModalEnd();
      container.innerHTML = containerInnerHTML;
    }

    return container;
  }

  _addContainerToBody(container: HTMLElement) {
    document.body.appendChild(container);
    this._registerCloseListener();
    setTimeout(() => {
      container.classList.add('visible');
    }, 50);
  }

  _genLogo() {
    return `
      <div class="adhs-logo">
        <img src="` + this.appIconUrl + `" alt="logo" />
      </div>
      `;
  }

  _genTitleWithMessage(message: string) {
    return `
      <div class="adhs-title">` + message + `</div>
      `;
  }

  _genModalStart() {
    return `<div class="` + this._modalClassName() + `">`;
  }

  _genModalEnd() {
    return `</div>`;
  }

  _modalClassName() {
    return 'adhs-modal';
  }

  _genListStart() {
    return `<div class="adhs-list">`;
  }

  _genListEnd() {
    return `</div>`;
  }

  _genListItem(numberString: string, instructionHTML: string) {
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

  _genListButtonWithImage(imageUrl: string, text: string = '', image_side: string = 'none') {
    if (!text) {
      return `
      <div class="adhs-list-button">
          <img class="adhs-list-button-image-only" src="` + imageUrl + `" />
      </div>`;
    } else if (image_side === 'right') {
      return `
      <div class="adhs-list-button">
        <div class="adhs-list-button-text">` + text + `</div>
        <img class="adhs-list-button-image-right" src="` + imageUrl + `" />
      </div>`;
    } else if (image_side === 'left') {
      return `
      <div class="adhs-list-button">
        <img class="adhs-list-button-image-left" src="` + imageUrl + `" />
        <div class="adhs-list-button-text">` + text + `</div>
      </div>`;
    } else {
      throw new Error("_genListButtonWithImage: invalid arguments");
    }
  }

  _genAssetUrl(fileName: string) {
    return this.assetUrl + fileName;
  }

  _genIOSSafari(container: HTMLElement) {
    var containerInnerHTML =
      this._genLogo() +
      this._genModalStart() +
      this._genInstallAppHeader() +
      this._genAppNameHeader() +
      // this._genAppUrlHeader() +
      this._genListStart() +
      this._genListItem(`1`, i18n.__('Tap the %s button in the toolbar.', this._genListButtonWithImage(this._genAssetUrl('ios-safari-sharing-api-button-2.svg')))) +
      this._genListItem(`2`, i18n.__('Select %s from the menu that pops up.', this._genListButtonWithImage(this._genAssetUrl('ios-safari-add-to-home-screen-button-2.svg'), i18n.__('Add to Home Screen'), 'right')) + ` <span class="adhs-emphasis">${i18n.__('You may need to scroll down to find this menu item.')}</span>`) +
      // this._genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${this.appIconUrl}"/>`)) +
      this._genListEnd() +
      this._genBlurbMobile() +
      this._genModalEnd() +
      `<div class="adhs-ios-safari-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('ios-safari-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-mobile');
    container.classList.add('adhs-ios');
    container.classList.add('adhs-safari');
  }

  _genIOSChrome(container: HTMLElement) {
    var containerInnerHTML =
      this._genLogo() +
      this._genModalStart() +
      this._genInstallAppHeader() +
      this._genAppNameHeader() +
      // this._genAppUrlHeader() +
      this._genListStart() +
      this._genListItem(`1`, i18n.__('Tap the %s button in the upper right corner.', this._genListButtonWithImage(this._genAssetUrl('ios-chrome-more-button-2.svg')))) +
      this._genListItem(`2`, i18n.__('Select %s from the menu that pops up.', 
        this._genListButtonWithImage(this._genAssetUrl('ios-safari-add-to-home-screen-button-2.svg'), i18n.__('Add to Home Screen'), 'right')) + ` ` +
        `<span class="adhs-emphasis">${i18n.__('You may need to scroll down to find this menu item.')}</span>`
      ) +
      // this._genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${this.appIconUrl}"/>`)) +
      this._genListEnd() +
      this._genBlurbMobile() +
      this._genModalEnd() +
      `<div class="adhs-ios-chrome-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('ios-chrome-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-mobile');
    container.classList.add('adhs-ios');
    container.classList.add('adhs-chrome');
  }

  _genIOSInAppBrowserOpenInSystemBrowser(container: HTMLElement) {
    var containerInnerHTML =
      this._genLogo() +
      this._genModalStart() +
      this._genInstallAppHeader() +
      this._genAppNameHeader() +
      // this._genAppUrlHeader() +
      this._genListStart() +
      this._genListItem(`1`, i18n.__('Tap the %s button above.', `<img class="adhs-more-button" src="${this._genAssetUrl('generic-more-button.svg')}"/>`)) +
      this._genListItem(`2`, `${i18n.__('Tap')} <span class="adhs-emphasis">${i18n.__('Open in browser')}</span>`) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="adhs-inappbrowser-openinsystembrowser-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('generic-vertical-up-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-mobile');
    container.classList.add('adhs-ios');
    container.classList.add('adhs-inappbrowser-openinsystembrowser');
  }

  _genIOSInAppBrowserOpenInSafariBrowser(container: HTMLElement) {
    var containerInnerHTML =
      this._genLogo() +
      this._genModalStart() +
      this._genInstallAppHeader() +
      this._genAppNameHeader() +
      // this._genAppUrlHeader() +
      this._genListStart() +
      this._genListItem(`1`, i18n.__('Tap the %s button below to open your system browser.', `<img class="adhs-more-button" src="${this._genAssetUrl('openinsafari-button.png')}"/>`)) +
      this._genListEnd() +
      this._genModalEnd() +
      `<div class="adhs-inappbrowser-openinsafari-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('generic-vertical-down-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-mobile');
    container.classList.add('adhs-ios');
    container.classList.add('adhs-inappbrowser-openinsafari');
  }

  _genAndroidChrome(container: HTMLElement) {
    var containerInnerHTML =
      this._genLogo() +
      this._genModalStart() +
      this._genInstallAppHeader() +
      this._genAppNameHeader() +
      // this._genAppUrlHeader() +
      this._genListStart() +
      this._genListItem(`1`, i18n.__('Tap %s in the browser bar.', this._genListButtonWithImage(this._genAssetUrl('android-chrome-more-button-2.svg')))) +
      this._genListItem(`2`, i18n.__('Tap %s', this._genListButtonWithImage(this._genAssetUrl('android-chrome-add-to-home-screen-button-2.svg'), i18n.__('Add to Home Screen'), 'left'))) + 
      // this._genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${this.appIconUrl}"/>`)) +
      this._genListEnd() +
      this._genBlurbMobile() +
      this._genModalEnd() +
      `<div class="adhs-android-chrome-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('android-chrome-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-mobile');
    container.classList.add('adhs-android');
    container.classList.add('adhs-chrome');
  }

  _genInstallAppHeader() {
    return `<h1 class="adhs-install-app">` + i18n.__('Install app') + `</h1>`;
  }

  _genAppNameHeader() {
    return `<div class="adhs-app-name">` + this.appName + `</div>`;
  }

  _genAppUrlHeader() {
    return `<div class="adhs-app-url">` + this._getAppDisplayUrl() + `</div>`;
  }

  _genBlurbWithMessage(message: string) {
    return `<div class="adhs-blurb">` + message + `</div>`;
  }

  _genBlurbMobile() {
    return this._genBlurbWithMessage(i18n.__('An icon will be added to your home screen so you can quickly access this website.'));
  }

  _genBlurbDesktopWindows() {
    return this._genBlurbWithMessage(i18n.__('An icon will be added to your Taskbar so you can quickly access this website.'));
  }

  _genBlurbDesktopMac() {
    return this._genBlurbWithMessage(i18n.__('An icon will be added to your Dock so you can quickly access this website.'));
  }

  _genDesktopChrome = (container: HTMLElement) =>  {

    var blurb: string = this.isDesktopMac() ? this._genBlurbDesktopMac() : this._genBlurbDesktopWindows();

    var containerInnerHTML = this._genLogo() +
    this._genModalStart() +
    this._genInstallAppHeader() +
    this._genAppNameHeader() +
    this._genAppUrlHeader() +
    blurb +
    `<div class="adhs-button-container">
      <button class="adhs-button adhs-button-cancel">
        ` + i18n.__('Later') + `
      </button>
      <button class="adhs-button adhs-button-install">
        ` + i18n.__('Install') + `
      </button>
    </div>` +
    this._genModalEnd();

    container.innerHTML = containerInnerHTML;
    container.classList.add('adhs-desktop');
    container.classList.add('adhs-desktop-chrome');

    var cancelButton = container.getElementsByClassName('adhs-button-cancel')[0];
    cancelButton.addEventListener('click', () => {
      this.closeModal();
    });

    var installButton = container.getElementsByClassName('adhs-button-install')[0];
    installButton.addEventListener('click', () => {
      if (!this._desktopInstallPromptEvent) {
        return;
      }
      this._desktopInstallPromptEvent.prompt();
      this.closeModal();

      this._desktopInstallPromptEvent.userChoice.then((choiceResult: { outcome: string; }) => {
        if (choiceResult.outcome === 'accepted') {
          this.debugMessage('User accepted the install prompt');
        } else {
          this.debugMessage('User dismissed the install prompt');
        }
        this._desktopInstallPromptEvent = null;
      });
    });

  }

  _genDesktopSafari(container: HTMLElement) {

    var blurb: string = this.isDesktopMac() ? this._genBlurbDesktopMac() : this._genBlurbDesktopWindows();

    var containerInnerHTML =
      this._genLogo() +
      this._genModalStart() +
      this._genInstallAppHeader() +
      this._genAppNameHeader() +
      this._genAppUrlHeader() +
      this._genListStart() +
      this._genListItem(`1`, i18n.__('Tap %s in the toolbar.', this._genListButtonWithImage(this._genAssetUrl('desktop-safari-menu.svg')))) +
      this._genListItem(`2`, i18n.__('Tap %s', this._genListButtonWithImage(this._genAssetUrl('desktop-safari-dock.svg'), i18n.__('Add To Dock'), 'left'))) +
      this._genListEnd() +
      blurb +
      this._genModalEnd() +
      `<div class="adhs-desktop-safari-bouncing-arrow-container">
      <img src="` + this._genAssetUrl('desktop-safari-bouncing-arrow.svg') + `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;

    container.classList.add('adhs-desktop');
    container.classList.add('adhs-desktop-safari');
  }

  _registerCloseListener() {
  
      var self = this;
      this.closeEventListener = (e: Event) => {
        var modal = document.getElementsByClassName('adhs-container')[0].getElementsByClassName('adhs-modal')[0];
        if (!modal.contains(e.target as Node)) {
          self.closeModal();
        };
      };
  
      // enclose in setTimeout to prevent firing when this class used with an onclick
      setTimeout(() => {
        window.addEventListener('touchstart', this.closeEventListener!);
        window.addEventListener('click', this.closeEventListener!);
      }, 50);
  
    }

  clearModalDisplayCount() {
    if (this._isEnabledModalDisplayCount()) {
      window.localStorage.removeItem(this._getModalDisplayCountKey());
    }
  }

  _isEnabledModalDisplayCount(): boolean {
    return (typeof (this.maxModalDisplayCount) === 'number') && (this.maxModalDisplayCount >= 0) && window.localStorage !== undefined;
  }

  _hasReachedMaxModalDisplayCount(): boolean {
    if (!this._isEnabledModalDisplayCount()) {
      return false;
    }
    return (this._getModalDisplayCount() >= this.maxModalDisplayCount);
  }

  _incrModalDisplayCount(): boolean {
    if (!this._isEnabledModalDisplayCount()) {
      return false;
    }

    var count: number = this._getModalDisplayCount();
    count++;
    window.localStorage.setItem(this._getModalDisplayCountKey(), count.toString());
    return true;
  }

  _getModalDisplayCountKey(): string {
    return 'adhs-modal-display-count';
  }

  _getModalDisplayCount(): number {
    var countStr: string | null = window.localStorage.getItem(this._getModalDisplayCountKey());
    var count: number;
    if (countStr === null) {
      count = 0;
      window.localStorage.setItem(this._getModalDisplayCountKey(), count.toString());
    } else {
      count = parseInt(countStr);
    }
    return count;
  }

  debugMessage(message: string) {
    // alert(message);
    // console.log(message);
  }

  _desktopInstallPromptEvent: ADHSBeforeInstallPromptEvent | null = null;
  _desktopInstallPromptWasShown: boolean = false;

  _registerDesktopInstallPromptEvent() {
    window.addEventListener('beforeinstallprompt', this._desktopInstallPromptEventListener);
  }

  _desktopInstallPromptEventListener = (e: ADHSBeforeInstallPromptEvent) => {
    this.debugMessage("DESKTOP CHROME LISTENER");
    e.preventDefault();
    this._desktopInstallPromptEvent = e;
  }

  _desktopInstallPromptEventHasFired(): boolean {
    return this._desktopInstallPromptEvent !== null;
  }

  shouldShowDesktopInstallPromptBasedOnDevice(): boolean {
    return !this.isStandAlone() && !this._hasReachedMaxModalDisplayCount()
    && !this.isDeviceIOS() && !this.isDeviceAndroid() && (this.isDesktopChrome() || this.isDesktopEdge());
  }

  // show the desktop chrome promotion
  showDesktopInstallPrompt() {

    this.debugMessage("SHOW DESKTOP CHROME / EDGE PROMOTION");

    if (this._desktopInstallPromptWasShown) {
      return;
    }

    // if the prompt has not fired, wait for it the be fired, then show the promotion
    if (!this._desktopInstallPromptEventHasFired()) {
      // this.debugMessage("SHOW DESKTOP CHROME PROMOTION: PROMPT NOT FIRED");
      setTimeout(() => {
        this.showDesktopInstallPrompt();
      }, 500);
      return;
    }

    // this.debugMessage("SHOW DESKTOP CHROME PROMOTION: PROMPT FIRED");

    this._desktopInstallPromptWasShown = true;

    var container = this._createContainer(
      true // include_modal
    );

    this._genDesktopChrome(container);
    this._addContainerToBody(container);

  }

  _showDesktopSafariPrompt() {
    this.debugMessage("SHOW SAFARI DESKTOP PROMPT");
    var container = this._createContainer(
      true // include_modal
    );
    this._genDesktopSafari(container);
    this._addContainerToBody(container);
  }
}

export default AddToHomeScreen;