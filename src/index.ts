import "./styles.css";
import {
  AddToHomeScreenOptions,
  AddToHomeScreenType,
  ADHSBeforeInstallPromptEvent,
  DeviceInfo,
  DeviceType,
} from "./types";

const config = require("./config");
const LOCALES = config.LOCALES as Array<string>;

// Add list of RTL languages
const RTL_LOCALES = ['ar', 'fa', 'he', 'ur'];

// Configure I18n
import i18n from "./simpleI18n";

const localeCatalog: { [locale: string]: any } = {};

LOCALES.forEach((locale) => {
  localeCatalog[locale] = require("./locales/" + locale + ".json");
});

i18n.configure({
  locales: LOCALES,
  staticCatalog: localeCatalog,
  directory: ".",
});

export function AddToHomeScreen(
  options: AddToHomeScreenOptions
): AddToHomeScreenType {
  let { appIconUrl, appName, appNameDisplay, assetUrl, maxModalDisplayCount } = options;
  let closeEventListener: EventListener | null = null;
  let currentLocale: string = 'en';
  let browserRTL: boolean = false;

  const userAgent = window.navigator.userAgent;

  _assertArg("appName", typeof appName === "string" && appName.length > 0);
  _assertArg("appIconUrl", typeof appIconUrl === "string" && appIconUrl.length > 0);
  _assertArg("assetUrl", typeof assetUrl === "string" && assetUrl.length > 0);
  
  maxModalDisplayCount = maxModalDisplayCount === undefined ? -1 : maxModalDisplayCount;
  _assertArg("maxModalDisplayCount", Number.isInteger(maxModalDisplayCount));

  closeEventListener = null;

  // Check if current locale is RTL
  function isRTL(): boolean {
    return RTL_LOCALES.includes(currentLocale);
  }

  function isBrowserRTL(): boolean {
    // return RTL_LOCALES.includes(currentLocale);
    return browserRTL;
  }

  function show(locale: string, rtl: boolean): DeviceInfo {
    currentLocale = locale;
    browserRTL = rtl;

    if (!locale) {
      if (localeCatalog["en"]) {
        locale = "en";
      } else {
        locale = Object.keys(localeCatalog)[0];
      }
    }

    i18n.setLocale(locale);
    
    // Initialize device info
    let _device: DeviceType;
    if (isDeviceIOS()) {
      _device = DeviceType.IOS;
    } else if (isDeviceAndroid()) {
      _device = DeviceType.ANDROID;
    } else {
      _device = DeviceType.DESKTOP;
    }

    // Handle standalone check
    if (isStandAlone()) {
      return new DeviceInfo(true, true, _device);
    }

    // Handle max modal display count
    if (_hasReachedMaxModalDisplayCount()) {
      return new DeviceInfo(false, false, _device);
    }

    // Create container with RTL support
    const container = _createContainer(false);
    if (isRTL()) {
      container.classList.add('adhs-rtl');
    }

    // Generate appropriate content based on device/browser
    let ret: DeviceInfo;
    let shouldShowModal = true;

    if (isDeviceIOS() || isDeviceAndroid()) {
      _incrModalDisplayCount();
      
      if (isDeviceIOS()) {
        if (isBrowserIOSSafari()) {
          ret = new DeviceInfo(false, true, _device);
          _genIOSSafari(container);
        } else if (isBrowserIOSChrome()) {
          ret = new DeviceInfo(false, true, _device);
          _genIOSChrome(container);
        } else if (isBrowserIOSInAppFacebook() || isBrowserIOSInAppLinkedin()) {
          ret = new DeviceInfo(false, false, _device);
          _genIOSInAppBrowserOpenInSystemBrowser(container);
        } else if (isBrowserIOSInAppInstagram() || isBrowserIOSInAppThreads() || isBrowserIOSInAppTwitter()) {
          ret = new DeviceInfo(false, false, _device);
          _genIOSInAppBrowserOpenInSafariBrowser(container);
        } else {
          ret = new DeviceInfo(false, false, _device);
          shouldShowModal = false;
        }
      } else {
        if (isBrowserAndroidChrome()) {
          ret = new DeviceInfo(false, true, _device);
          _genAndroidChrome(container);
        } else if (isBrowserAndroidFacebook()) {
          ret = new DeviceInfo(false, false, _device);
          _genIOSInAppBrowserOpenInSystemBrowser(container);
        } else {
          ret = new DeviceInfo(false, false, _device);
          shouldShowModal = false;
        }
      }

      if (shouldShowModal) {
        _addContainerToBody(container);
      }
    } else {
      ret = new DeviceInfo(false, false, _device);

      if (isDesktopChrome() || isDesktopEdge()) {
        _incrModalDisplayCount();
        showDesktopInstallPrompt();
      } else if (isDesktopSafari()) {
        _incrModalDisplayCount();
        _showDesktopSafariPrompt();
      }
    }

    return ret;
  }

  function showDesktopInstallPrompt() {
    debugMessage("SHOW DESKTOP CHROME / EDGE PROMOTION");

    if (_desktopInstallPromptWasShown) {
      return;
    }

    // if the prompt has not fired, wait for it to be fired, then show the promotion
    if (!_desktopInstallPromptEventHasFired()) {
      setTimeout(() => {
        showDesktopInstallPrompt();
      }, 500);
      return;
    }

    _desktopInstallPromptWasShown = true;

    var container = _createContainer(true); // include_modal

    _genDesktopChrome(container);
    _addContainerToBody(container);
  }

  function _showDesktopSafariPrompt() {
    debugMessage("SHOW SAFARI DESKTOP PROMPT");
    var container = _createContainer(true); // include_modal
    _genDesktopSafari(container);
    _addContainerToBody(container);
  }

  // Fixed _genListButtonWithImage with proper RTL support
  function _genListButtonWithImage(
    imageUrl: string,
    text: string = "",
    image_side: string = "none"
  ): string {
    if (!text) {
      return `
        ${div("list-button")}
          <img class="adhs-list-button-image-only${isRTL() ? " rtl" : ""}" src="${imageUrl}" />
        </div>`;
    }

    const effectiveImageSide = isRTL() ? 
      (image_side === "left" ? "right" : "left") : 
      image_side;

    const imageClass = `adhs-list-button-image-${effectiveImageSide}${isRTL() ? " rtl" : ""}`;
    
    const buttonContent = effectiveImageSide === "right" 
      ? `${div("list-button-text")}${text}</div><img class="${imageClass}" src="${imageUrl}" />`
      : `<img class="${imageClass}" src="${imageUrl}" />${div("list-button-text")}${text}</div>`;

    return `${div("list-button")}${buttonContent}</div>`;
  }

// Fixed browser-specific generators with RTL support
  function _genIOSSafari(container: HTMLElement) {
    const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';
    const sharingButton = _genListButtonWithImage(
      _genAssetUrl("ios-safari-sharing-api-button-2.svg")
    );
    
    const addToHomeButton = _genListButtonWithImage(
      _genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"),
      i18n.__("Add to Home Screen"),
      isRTL() ? "left" : "right"
    );

    const containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__("Tap the %s button in the toolbar.", sharingButton)  // Confirmed correct format
      ) +
      _genListItem(
        `2`,
        i18n.__("Select %s from the menu that pops up.", addToHomeButton) +
        ` <span class="adhs-emphasis">${i18n.__(
          "You may need to scroll down to find this menu item."
        )}</span>`
      ) +
      _genListEnd() +
      _genBlurbMobile() +
      _genModalEnd() +
      div(
        `${
          isBrowserIOSIPadSafari()
            ? "ios-ipad-safari-bouncing-arrow-container"
            : "ios-safari-bouncing-arrow-container"
        } ${rtlArrowClass}`
      ) +
      `<img src="${_genAssetUrl(
        "ios-safari-bouncing-arrow.svg"
      )}" alt="arrow" />
    </div>`;

    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-mobile", "adhs-ios", "adhs-safari");
  }

  function _genIOSChrome(container: HTMLElement) {
    const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';
    const moreButton = _genListButtonWithImage(
      _genAssetUrl("ios-chrome-more-button-2.svg")
    );
    
    const addToHomeButton = _genListButtonWithImage(
      _genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"),
      i18n.__("Add to Home Screen"),
      isRTL() ? "left" : "right"
    );

    const containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__("Tap the %s button in the upper right corner.", moreButton)
      ) +
      _genListItem(
        `2`,
        i18n.__("Select %s from the menu that pops up.", addToHomeButton) +
        ` <span class="adhs-emphasis">${i18n.__(
          "You may need to scroll down to find this menu item."
        )}</span>`
      ) +
      _genListEnd() +
      _genBlurbMobile() +
      _genModalEnd() +
      div(`ios-chrome-bouncing-arrow-container ${rtlArrowClass}`) +
      `<img src="${_genAssetUrl(
        "ios-chrome-bouncing-arrow.svg"
      )}" alt="arrow" />
    </div>`;

    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-mobile", "adhs-ios", "adhs-chrome");
  }

  function _genAndroidChrome(container: HTMLElement) {
    const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';
    const moreButton = _genListButtonWithImage(
      _genAssetUrl("android-chrome-more-button-2.svg")
    );
    
    const addToHomeButton = _genListButtonWithImage(
      _genAssetUrl("android-chrome-add-to-home-screen-button-2.svg"),
      i18n.__("Add to Home Screen"),
      isRTL() ? "right" : "left"
    );

    const translatedText = i18n.__("Tap %s in the browser bar.", moreButton)
    const instructionHTML = translatedText.replace("%s", moreButton);

    const containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__("Tap %s in the browser bar.", instructionHTML)
      ) +
      _genListItem(
        `2`,
        i18n.__("Tap %s", addToHomeButton)
      ) +
      _genListEnd() +
      _genBlurbMobile() +
      _genModalEnd() +
      div(`android-chrome-bouncing-arrow-container ${rtlArrowClass}`) +
      `<img src="${_genAssetUrl(
        "android-chrome-bouncing-arrow.svg"
      )}" alt="arrow" />
    </div>`;

    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-mobile", "adhs-android", "adhs-chrome");
  }

  function _genIOSInAppBrowserOpenInSystemBrowser(container: HTMLElement) {
    const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';
    const moreButtonImg = `<img class="adhs-more-button${isRTL() ? " rtl" : ""}" src="${_genAssetUrl(
      "generic-more-button.svg"
    )}"/>`;

    const containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__("Tap the %s button above.", moreButtonImg)
      ) +
      _genListItem(
        `2`,
        `${i18n.__("Tap")} <span class="adhs-emphasis">${i18n.__(
          "Open in browser"
        )}</span>`
      ) +
      _genListEnd() +
      _genModalEnd() +
      div(`inappbrowser-openinsystembrowser-bouncing-arrow-container ${rtlArrowClass}`) +
      `<img src="${_genAssetUrl(
        "generic-vertical-up-bouncing-arrow.svg"
      )}" alt="arrow" />
    </div>`;

    container.innerHTML = containerInnerHTML;
    container.classList.add(
      "adhs-mobile",
      "adhs-ios",
      "adhs-inappbrowser-openinsystembrowser"
    );
  }

  function _genIOSInAppBrowserOpenInSafariBrowser(container: HTMLElement) {
    const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';
    const moreButtonImg = `<img class="adhs-more-button${isRTL() ? " rtl" : ""}" src="${_genAssetUrl(
      "openinsafari-button.png"
    )}"/>`;

    const containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__("Tap the %s button below to open your system browser.", moreButtonImg)
      ) +
      _genListEnd() +
      _genModalEnd() +
      div(`inappbrowser-openinsafari-bouncing-arrow-container ${rtlArrowClass}`) +
      `<img src="${_genAssetUrl(
        "generic-vertical-down-bouncing-arrow.svg"
      )}" alt="arrow" />
    </div>`;

    container.innerHTML = containerInnerHTML;
    container.classList.add(
      "adhs-mobile",
      "adhs-ios",
      "adhs-inappbrowser-openinsafari"
    );
  }


function _genDesktopChrome(container: HTMLElement) {
    const rtlClass = isRTL() ? 'rtl' : '';
    const blurb: string = isDesktopMac()
      ? _genBlurbDesktopMac()
      : _genBlurbDesktopWindows();

    const containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genAppUrlHeader() +
      blurb +
      div(`button-container ${rtlClass}`) +
      `<button class="adhs-button adhs-button-cancel">
        ${i18n.__("Later")}
      </button>
      <button class="adhs-button adhs-button-install">
        ${i18n.__("Install")}
      </button>
    </div>` +
      _genModalEnd();

    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-desktop", "adhs-desktop-chrome");

    // Button event listeners
    const cancelButton = container.getElementsByClassName("adhs-button-cancel")[0];
    const installButton = container.getElementsByClassName("adhs-button-install")[0];
    
    cancelButton.addEventListener("click", () => {
      closeModal();
    });

    installButton.addEventListener("click", () => {
      if (!_desktopInstallPromptEvent) {
        return;
      }
      _desktopInstallPromptEvent.prompt();
      closeModal();

      _desktopInstallPromptEvent.userChoice.then(
        (choiceResult: { outcome: string }) => {
          if (choiceResult.outcome === "accepted") {
            debugMessage("User accepted the install prompt");
          } else {
            debugMessage("User dismissed the install prompt");
          }
          _desktopInstallPromptEvent = null;
        }
      );
    });
  }

  function _genDesktopSafari(container: HTMLElement) {
    const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';
    const blurb: string = isDesktopMac()
      ? _genBlurbDesktopMac()
      : _genBlurbDesktopWindows();

    const menuButton = _genListButtonWithImage(
      _genAssetUrl("desktop-safari-menu.svg")
    );

    const dockButton = _genListButtonWithImage(
      _genAssetUrl("desktop-safari-dock.svg"),
      i18n.__("Add To Dock"),
      isRTL() ? "right" : "left"
    );

    const containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genAppUrlHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__("Tap %s in the toolbar.", menuButton) 
      ) +
      _genListItem(
        `2`,
        i18n.__("Tap %s", dockButton)
      ) +
      _genListEnd() +
      blurb +
      _genModalEnd() +
      div(`desktop-safari-bouncing-arrow-container ${rtlArrowClass}`) +
      `<img src="${_genAssetUrl(
        "desktop-safari-bouncing-arrow.svg"
      )}" alt="arrow" />
    </div>`;

    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-desktop", "adhs-desktop-safari");
  }

  function _genAssetUrl(fileName: string): string {
    if (!assetUrl.endsWith('/') && !fileName.startsWith('/')) {
      return `${assetUrl}/${fileName}`;
    }
    return assetUrl + fileName;
  }

  // Helper functions
  function _genInstallAppHeader() {
    const text = appNameDisplay === "inline"
      ? i18n.__("Install %s", appName)
      : i18n.__("Install app");
    return `<h1 class="adhs-install-app">${text}</h1>`;
  }

  function _genAppNameHeader() {
    if (appNameDisplay === "inline") {
      return "";
    }
    return div("app-name") + appName + `</div>`;
  }

  function _genAppUrlHeader() {
    return div("app-url") + _getAppDisplayUrl() + `</div>`;
  }

  function _genBlurbWithMessage(message: string) {
    return div("blurb") + message + `</div>`;
  }

  function _genBlurbMobile() {
    return _genBlurbWithMessage(
      i18n.__(
        "An icon will be added to your home screen so you can quickly access this website."
      )
    );
  }

  function _genBlurbDesktopWindows() {
    return _genBlurbWithMessage(
      i18n.__(
        "An icon will be added to your Taskbar so you can quickly access this website."
      )
    );
  }

  function _genBlurbDesktopMac() {
    return _genBlurbWithMessage(
      i18n.__(
        "An icon will be added to your Dock so you can quickly access this website."
      )
    );
  }

  function _createContainer(include_modal = false) {
    const container = document.createElement("div");
    container.classList.add("adhs-container");
    
    if (isRTL()) {
      container.classList.add("adhs-rtl");
    }

    if (include_modal) {
      var containerInnerHTML = _genModalStart() + _genModalEnd();
      container.innerHTML = containerInnerHTML;
    }

    return container;
  }

  function _addContainerToBody(container: HTMLElement) {
    document.body.appendChild(container);
    _registerCloseListener();
    setTimeout(() => {
      container.classList.add("visible");
    }, 50);
  }

  function _genListStart() {
    return div("list");
  }

  function _genListEnd() {
    return `</div>`;
  }

  function _genListItem(numberString: string, instructionHTML: string) {
    const rtlClass = isRTL() ? 'rtl' : '';
    return `
      ${div(`list-item ${rtlClass}`)}
        ${isRTL() ? '' : `
        ${div("number-container")}
          ${div("circle")}
            ${div("number")}
              ${numberString}
            </div>
          </div>
        </div>`}
        ${div("instruction")}
          ${instructionHTML}
        </div>
        ${isRTL() ? `
        ${div("number-container")}
          ${div("circle")}
            ${div("number")}
              ${numberString}
            </div>
          </div>
        </div>` : ''}
      </div>`;
  }

  function _genModalStart() {
    return div("modal") + _genLogo();
  }

  function _genModalEnd() {
    return `</div>`;
  }

  function _genLogo() {
    return `
      ${div("logo")}
        <img src="${appIconUrl}" alt="logo" />
      </div>
    `;
  }

  function div(className: string) {
    return `<div class="adhs-${className}">`;
  }

// Device Detection Functions
  function _matchesUserAgent(regex: RegExp): boolean {
    return !!userAgent.match(regex);
  }

  function isDeviceAndroid() {
    return !!_matchesUserAgent(/Android/);
  }

  function isDeviceIOS() {
    return _matchesUserAgent(/iPhone|iPad|iPod/) || isBrowserIOSIPadSafari();
  }

  function isBrowserIOSIPadSafari() {
    return !!(
      userAgent.match(/Macintosh/) &&
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 1
    );
  }

  function isBrowserIOSSafari() {
    return (
      isDeviceIOS() &&
      _matchesUserAgent(/Safari/) &&
      !isBrowserIOSChrome() &&
      !isBrowserIOSFirefox() &&
      !isBrowserIOSInAppFacebook() &&
      !isBrowserIOSInAppLinkedin() &&
      !isBrowserIOSInAppInstagram() &&
      !isBrowserIOSInAppThreads() &&
      !isBrowserIOSInAppTwitter()
    );
  }

  function isBrowserIOSChrome() {
    return isDeviceIOS() && _matchesUserAgent(/CriOS/);
  }

  function isBrowserIOSFirefox() {
    return isDeviceIOS() && _matchesUserAgent(/FxiOS/);
  }

  function isBrowserIOSInAppFacebook() {
    return isDeviceIOS() && _matchesUserAgent(/FBAN|FBAV/);
  }

  function isBrowserIOSInAppLinkedin() {
    return isDeviceIOS() && _matchesUserAgent(/LinkedInApp/);
  }

  function isBrowserIOSInAppInstagram() {
    if (!isDeviceIOS()) {
      return false;
    }
    return !!window.document.referrer.match("//l.instagram.com/");
  }

  function isBrowserIOSInAppThreads() {
    return isBrowserIOSInAppInstagram();
  }

  function isBrowserIOSInAppTwitter() {
    if (!isDeviceIOS()) {
      return false;
    }
    return !!window.document.referrer.match("//t.co/");
  }

  function isBrowserAndroidChrome() {
    return (
      isDeviceAndroid() &&
      !!_matchesUserAgent(/Chrome/) &&
      !isBrowserAndroidFacebook() &&
      !isBrowserAndroidSamsung() &&
      !isBrowserAndroidFirefox()
    );
  }

  function isBrowserAndroidFacebook() {
    return isDeviceAndroid() && _matchesUserAgent(/FBAN|FBAV/);
  }

  function isBrowserAndroidSamsung() {
    return isDeviceAndroid() && _matchesUserAgent(/SamsungBrowser/);
  }

  function isBrowserAndroidFirefox() {
    return isDeviceAndroid() && _matchesUserAgent(/Firefox/);
  }

  function isDesktopWindows() {
    return userAgent.includes("Windows");
  }

  function isDesktopMac() {
    return userAgent.includes("Macintosh");
  }

  function isDesktopChrome() {
    const isChrome = userAgent.includes("Chrome") && !userAgent.includes("Edg");
    const isDesktop = userAgent.includes("Windows") ||
      userAgent.includes("Macintosh") ||
      userAgent.includes("Linux");
    return isChrome && isDesktop;
  }

  function isDesktopSafari() {
    const isSafari = userAgent.includes("Safari") &&
      !userAgent.includes("Chrome") &&
      !userAgent.includes("Edg");
    const isDesktop = userAgent.includes("Macintosh") || userAgent.includes("Windows");
    return isSafari && isDesktop;
  }

  function isDesktopEdge() {
    return userAgent.includes("Edg/");
  }

  function isStandAlone() {
    return (
      !!("standalone" in window.navigator && window.navigator.standalone) ||
      !!window.matchMedia("(display-mode: standalone)").matches
    );
  }

  // Modal Display Count Handling
  function _getModalDisplayCountKey(): string {
    return "adhs-modal-display-count";
  }

  function _getModalDisplayCount(): number {
    const countStr = window.localStorage.getItem(_getModalDisplayCountKey());
    if (countStr === null) {
      const count = 0;
      window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());
      return count;
    }
    return parseInt(countStr);
  }

  function _isEnabledModalDisplayCount(): boolean {
    return (
      typeof maxModalDisplayCount === "number" &&
      maxModalDisplayCount >= 0 &&
      window.localStorage !== undefined
    );
  }

  function _hasReachedMaxModalDisplayCount(): boolean {
    if (!_isEnabledModalDisplayCount()) {
      return false;
    }
    return _getModalDisplayCount() >= maxModalDisplayCount;
  }

  function _incrModalDisplayCount(): boolean {
    if (!_isEnabledModalDisplayCount()) {
      return false;
    }
    const count = _getModalDisplayCount() + 1;
    window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());
    return true;
  }

  function clearModalDisplayCount() {
    if (_isEnabledModalDisplayCount()) {
      window.localStorage.removeItem(_getModalDisplayCountKey());
    }
  }

  // Modal Closing
  function closeModal() {
    const container = document.querySelector(".adhs-container");
    if (container) {
      container.classList.remove("visible");
      setTimeout(
        () => {
          container.remove();
          if (closeEventListener) {
            window.removeEventListener("touchstart", closeEventListener);
            window.removeEventListener("click", closeEventListener);
            closeEventListener = null;
          }
        },
        isDeviceIOS() ? 500 : 300
      );
    }
  }

  function _registerCloseListener() {
    closeEventListener = (e: Event) => {
      const modal = document
        .getElementsByClassName("adhs-container")[0]
        .getElementsByClassName("adhs-modal")[0];
      if (!modal.contains(e.target as Node)) {
        closeModal();
      }
    };

    setTimeout(() => {
      window.addEventListener("touchstart", closeEventListener!);
      window.addEventListener("click", closeEventListener!);
    }, 50);
  }

  // Desktop Install Prompt Handling
  let _desktopInstallPromptEvent: ADHSBeforeInstallPromptEvent | null = null;
  let _desktopInstallPromptWasShown: boolean = false;

  function _desktopInstallPromptEventListener(e: ADHSBeforeInstallPromptEvent) {
    e.preventDefault();
    _desktopInstallPromptEvent = e;
  }

  function _registerDesktopInstallPromptEvent() {
    window.addEventListener("beforeinstallprompt", _desktopInstallPromptEventListener);
  }

  function shouldShowDesktopInstallPromptBasedOnDevice(): boolean {
    return (
      !isStandAlone() &&
      !_hasReachedMaxModalDisplayCount() &&
      !isDeviceIOS() &&
      !isDeviceAndroid() &&
      (isDesktopChrome() || isDesktopEdge())
    );
  }

  function _desktopInstallPromptEventHasFired(): boolean {
    return _desktopInstallPromptEvent !== null;
  }

  // Utility Functions
  function _getAppDisplayUrl(): string {
    const currentUrl = new URL(window.location.href);
    return currentUrl.href.replace(/\/$/, "");
  }

  function _assertArg(variableName: string, booleanExp: boolean) {
    if (!booleanExp) {
      throw new Error(
        "AddToHomeScreen: variable '" + variableName + "' has an invalid value."
      );
    }
  }

  function debugMessage(message: string) {
    // console.log(message);
  }

  // Return public interface
  return {
    appName,
    appIconUrl,
    assetUrl,
    maxModalDisplayCount,
    clearModalDisplayCount,
    isStandAlone,
    show,
    closeModal,
    isBrowserAndroidChrome,
    isBrowserAndroidFacebook,
    isBrowserAndroidFirefox,
    isBrowserAndroidSamsung,
    isBrowserIOSChrome,
    isBrowserIOSFirefox,
    isBrowserIOSInAppFacebook,
    isBrowserIOSInAppInstagram,
    isBrowserIOSInAppLinkedin,
    isBrowserIOSInAppThreads,
    isBrowserIOSInAppTwitter,
    isBrowserIOSSafari,
    isDesktopChrome,
    isDesktopEdge,
    isDesktopMac,
    isDesktopSafari,
    isDesktopWindows,
  };
}