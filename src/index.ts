import "./styles.css";
import {
  AddToHomeScreenOptions,
  AddToHomeScreenType,
  ADHSBeforeInstallPromptEvent,
  DeviceInfo,
  DeviceType,
  DisplayOptions,
  isDisplayOptions,
  DISPLAY_OPTIONS_DEFAULT
} from "./types";

const config = require("./config");
const LOCALES = config.LOCALES as Array<string>;

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
  let { appIconUrl, appName, appNameDisplay, assetUrl, maxModalDisplayCount, displayOptions, allowClose } =
    options;
  let closeEventListener: EventListener | null = null;

  const userAgent = window.navigator.userAgent;

  _assertArg("appName", typeof appName === "string" && appName.length > 0);

  appIconUrl = appIconUrl;
  _assertArg(
    "appIconUrl",
    typeof appIconUrl === "string" && appIconUrl.length > 0
  );

  assetUrl = assetUrl;
  _assertArg("assetUrl", typeof assetUrl === "string" && assetUrl.length > 0);

  maxModalDisplayCount =
    maxModalDisplayCount === undefined ? -1 : maxModalDisplayCount;
  _assertArg("maxModalDisplayCount", Number.isInteger(maxModalDisplayCount));

  displayOptions = 
    displayOptions === undefined ? DISPLAY_OPTIONS_DEFAULT : displayOptions;
  _assertArg("displayOptions", isDisplayOptions(displayOptions))

  allowClose = allowClose === undefined ? true : allowClose;
  _assertArg("allowClose", typeof allowClose === "boolean");

  closeEventListener = null;

  // handles the case where the chrome prompt is not immediately shown on page load,
  // such as an onclick handler
  if (shouldShowDesktopInstallPromptBasedOnDevice()) {
    _registerDesktopInstallPromptEvent();
  }

  function isStandAlone() {
    // test if web app is already installed to home screen
    return (
      !!("standalone" in window.navigator && window.navigator.standalone) || // IOS (TODO: detect iPad 13)
      !!window.matchMedia("(display-mode: standalone)").matches
    ); // Android and Desktop Chrome/Safari/Edge
  }

  function show(locale: string): DeviceInfo {

    if (locale && !localeCatalog[locale]) {
      console.log("add-to-homescreen: WARNING: locale selected not available:", locale);
      locale = "";
    }

    if (!locale) {
      const language_from_browser_settings = i18n._getLanguageFromBrowserSettings();
      // if no locale indicated
      // check url param "locale" and browser settings
      if (language_from_browser_settings && localeCatalog[language_from_browser_settings]) {
        locale = language_from_browser_settings;
      // if "en" intl file is available, default to "en"
      } else if (localeCatalog["en"]) {
        locale = "en";
      // else default to first language available
      } else {
        locale = Object.keys(localeCatalog)[0];
      }
    }
    debugMessage("LOCALE: " + locale);

    i18n.setLocale(locale);
    var ret: DeviceInfo;

    var _device: DeviceType;
    let _isStandAlone: boolean;
    let _canBeStandAlone: boolean;
    if (isDeviceIOS()) {
      _device = DeviceType.IOS;
    } else if (isDeviceAndroid()) {
      _device = DeviceType.ANDROID;
    } else {
      _device = DeviceType.DESKTOP;
    }

    if (isStandAlone()) {
      debugMessage("ALREADY STANDALONE");

      ret = new DeviceInfo(
        (_isStandAlone = true),
        (_canBeStandAlone = true),
        (_device = _device)
      );
    } else if (_hasReachedMaxModalDisplayCount()) {
      ret = new DeviceInfo(
        (_isStandAlone = false),
        (_canBeStandAlone = false),
        (_device = _device)
      );
    } else if (
      displayOptions.showMobile && 
      (isDeviceIOS() || isDeviceAndroid())
    ) {
      debugMessage("NOT STANDALONE - IOS OR ANDROID");
      var shouldShowModal = true;
      _incrModalDisplayCount();
      var container = _createContainer(
        false // include_modal
      );

      if (isDeviceIOS()) {
        // ios
        if (isBrowserIOSSafari()) {
          ret = new DeviceInfo(
            (_isStandAlone = false),
            (_canBeStandAlone = true),
            (_device = _device)
          );

          _genIOSSafari(container);
        } else if (isBrowserIOSChrome()) {
          ret = new DeviceInfo(
            (_isStandAlone = false),
            (_canBeStandAlone = true),
            (_device = _device)
          );

          _genIOSChrome(container);
        } else if (
          isBrowserIOSInAppFacebook() 
          || isBrowserIOSInAppLinkedin()
          || isBrowserIOSInAppInstagram()
        ) {
          // IOS INSTAGRAM: https://github.com/user-attachments/assets/0d3ab224-1ac7-454e-b75d-21f6c52ffa87
          // IOS FACEBOOK: https://github.com/user-attachments/assets/4c8121a2-3c62-402f-be05-0c54bf108ddc
          ret = new DeviceInfo(
            (_isStandAlone = false),
            (_canBeStandAlone = false),
            (_device = _device)
          );

          _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container);
        } else if (
          isBrowserIOSInAppTwitter()
        ) {
          // IOS TWITTER/X: https://github.com/user-attachments/assets/ed01b58e-5aab-48b9-8c42-d21d24cd2c03
          ret = new DeviceInfo(
            (_isStandAlone = false),
            (_canBeStandAlone = false),
            (_device = _device)
          );

          _genIOSInAppBrowserLowerRightButtonOpenInSafariBrowser(container);
        } else {
          ret = new DeviceInfo(
            (_isStandAlone = false),
            (_canBeStandAlone = false),
            (_device = _device)
          );
          shouldShowModal = false;
        }
      } else {
        // android
        if (isBrowserAndroidChrome()) {
          ret = new DeviceInfo(
            (_isStandAlone = false),
            (_canBeStandAlone = true),
            (_device = _device)
          );
          _genAndroidChrome(container);
        } else if (isBrowserAndroidFacebook() || isBrowserAndroidInstagram()) {
          // ANDROID FACEBOOK: https://github.com/user-attachments/assets/45701ac3-d337-4fc4-8e82-3d03236bf3a5
          // ANDROID INSTAGRAM: https://github.com/user-attachments/assets/7e1d11fd-31ba-4b27-a13d-6beb079b4204
          ret = new DeviceInfo(
            (_isStandAlone = false),
            (_canBeStandAlone = false),
            (_device = _device)
          );
          _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container);
        } else {
          // ANDROID X/TWITTER JUST OPENS SYSTEM BROWSER
          ret = new DeviceInfo(
            (_isStandAlone = false),
            (_canBeStandAlone = false),
            (_device = _device)
          );

          shouldShowModal = false;
        }
      }

      if (shouldShowModal) {
        _addContainerToBody(container);
      }
    } else {
      debugMessage("DESKTOP");
      ret = new DeviceInfo(
        (_isStandAlone = false),
        (_canBeStandAlone = false),
        (_device = _device)
      );


      if (displayOptions.showDesktop) {
        if (isDesktopChrome() || isDesktopEdge()) {
          debugMessage("DESKTOP CHROME");
          _incrModalDisplayCount();
          showDesktopInstallPrompt();
        } else if (isDesktopSafari()) {
          debugMessage("DESKTOP SAFARI");
          _incrModalDisplayCount();
          _showDesktopSafariPrompt();
        }
      }
    }

    return ret;
  }

  function closeModal() {
    // close the modal if the user clicks outside of the modal contents
    const container = document.querySelector(".adhs-container");
    if (container) {
      container.classList.remove("visible");
      setTimeout(
        () => {
          container.remove();
          _modalIsShowing = false;
          if (closeEventListener) {
            window.removeEventListener("touchstart", closeEventListener);
            window.removeEventListener("click", closeEventListener);
            closeEventListener = null;
            if (_desktopInstallPromptWasShown) {
              _desktopInstallPromptWasShown = false;
            }
          }
        },
        // If the dialog is hidden in 300ms in Safari, the browser reports a second
        // click event on an underlying DOM node. If you wait a bit longer this
        // does not happen
        isDeviceIOS() ? 500 : 300
      );
    }
  }

  function modalIsShowing(): boolean {
    return _modalIsShowing;
  }

  /**** Device Detection Functions ****/

  function _matchesUserAgent(regex: RegExp): boolean {
    return !!userAgent.match(regex);
  }

  function isDeviceAndroid(): boolean {
    return !!_matchesUserAgent(/Android/);
  }

  function isDeviceIOS(): boolean {
    return _matchesUserAgent(/iPhone|iPad|iPod/) || isBrowserIOSIPadSafari();
  }

  function isBrowserIOSIPadSafari(): boolean {
    return !!(
      _matchesUserAgent(/iPad/) || // iPad Mini
      // iPad Air, iPad Pro
      (
        _matchesUserAgent(/Macintosh/) &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 1
      )
    )
  }

  /* Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)
   AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0
   Mobile/14E5239e Safari/602.1 */
  function isBrowserIOSSafari(): boolean {
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

  /* Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)
     AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75
     Mobile/14E5239e Safari/602.1 */
  function isBrowserIOSChrome(): boolean {
    return isDeviceIOS() && _matchesUserAgent(/CriOS/);
  }

  /* Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) 
  AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/114.1 Mobile/15E148 Safari/605.1.15 */
  function isBrowserIOSFirefox(): boolean {
    return isDeviceIOS() && _matchesUserAgent(/FxiOS/);
  }

  function isBrowserIOSInAppFacebook(): boolean {
    if (!isDeviceIOS()) {
      return false;
    }

    return _matchesUserAgent(/FBAN|FBAV/);
  }

  function isBrowserIOSInAppLinkedin(): boolean {
    if (!isDeviceIOS()) {
      return false;
    }

    return _matchesUserAgent(/LinkedInApp/);
  }

  function isBrowserIOSInAppInstagram(): boolean {
    if (!isDeviceIOS()) {
      return false;
    }

    // TODO: this is incompatible with Instagram/Threads mobile website links.
    // TODO: this solution only works with first-level links
    if (!!window.document.referrer.match("//l.instagram.com/")) {
      return true;
    }

    return false;
  }

  function isBrowserIOSInAppThreads(): boolean {
    return isBrowserIOSInAppInstagram();
  }

  function isBrowserIOSInAppTwitter(): boolean {
    if (!isDeviceIOS()) {
      return false;
    }

    // TODO: this solution is incompatible with Twitter mobile website links
    // TODO: this solution only works with first-level links
    return !!window.document.referrer.match("//t.co/");
  }

  /* Mozilla/5.0 (Linux; Android 10) 
     AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.92 Mobile Safari/537.36 */
  function isBrowserAndroidChrome(): boolean {
    return (
      isDeviceAndroid() &&
      !!_matchesUserAgent(/Chrome/) &&
      !isBrowserAndroidFacebook() &&
      !isBrowserAndroidInstagram() &&
      !isBrowserAndroidSamsung() &&
      !isBrowserAndroidFirefox() &&
      !isBrowserAndroidEdge() &&
      !isBrowserAndroidOpera()
    );
  }

  /*Mozilla/5.0 (Linux; Android 12; SM-S908U1 Build/SP1A.210812.016; wv) 
    AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.88 
    Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/377.0.0.22.107;]*/
  function isBrowserAndroidFacebook(): boolean {
    return isDeviceAndroid() && _matchesUserAgent(/FBAN|FBAV/);
  }

  function isBrowserAndroidInstagram(): boolean {
    return isDeviceAndroid() && _matchesUserAgent(/Instagram/);
  }

  /* Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-S918B) AppleWebKit/537.36 
  (KHTML, like Gecko) SamsungBrowser/21.0 Chrome/110.0.5481.154 Mobile Safari/537.36 */
  function isBrowserAndroidSamsung(): boolean {
    return isDeviceAndroid() && _matchesUserAgent(/SamsungBrowser/);
  }

  /* Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/114.0 Firefox/114.0 */
  function isBrowserAndroidFirefox(): boolean {
    return isDeviceAndroid() && _matchesUserAgent(/Firefox/);
  }

  function isBrowserAndroidOpera(): boolean {
    return isDeviceAndroid() && _matchesUserAgent(/OPR/);
  }

  function isBrowserAndroidEdge(): boolean {
    return isDeviceAndroid() && _matchesUserAgent(/Edg/);
  }

  function isDesktopWindows(): boolean {
    return userAgent.includes("Windows");
  }

  function isDesktopMac(): boolean {
    return userAgent.includes("Macintosh");
  }

  function isDesktopChrome(): boolean {
    const isChrome = userAgent.includes("Chrome") && !userAgent.includes("Edg"); // Exclude Edge browser
    const isDesktop =
      userAgent.includes("Windows") ||
      userAgent.includes("Macintosh") ||
      userAgent.includes("Linux");

    return isChrome && isDesktop;
  }

  function isDesktopSafari(): boolean {
    const isSafari =
      userAgent.includes("Safari") &&
      !userAgent.includes("Chrome") &&
      !userAgent.includes("Edg");
    const isDesktop =
      userAgent.includes("Macintosh") || userAgent.includes("Windows");

    return isSafari && isDesktop;
  }

  function isDesktopEdge(): boolean {
    return userAgent.includes("Edg/");
  }

  /**** Internal Functions ****/

  function _getAppDisplayUrl(): string {
    // return 'https://aardvark.app';
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

  function _createContainer(include_modal = false) {
    const container = document.createElement("div");
    container.classList.add("adhs-container");

    if (include_modal) {
      var containerInnerHTML = _genModalStart() + _genModalEnd();
      container.innerHTML = containerInnerHTML;
    }

    return container;
  }

  function _addContainerToBody(container: HTMLElement) {
    _modalIsShowing = true;
    document.body.appendChild(container);
    _registerCloseListener();
    setTimeout(() => {
      container.classList.add("visible");
    }, 50);
  }

  function _genLogo() {
    return (
      `
      ${div("logo")}
        <img src="` +
      appIconUrl +
      `" alt="logo" />
      </div>
      `
    );
  }

  function _genTitleWithMessage(message: string) {
    return `
      ${div("title")}
      ${message}
      </div>`;
  }

  function _genModalStart() {
    return div("modal") + _genLogo();
  }

  function _genModalEnd() {
    return `</div>`;
  }

  function _genListStart() {
    return div("list");
  }

  function _genListEnd() {
    return `</div>`;
  }

  function _genListItem(numberString: string, instructionHTML: string) {
    return `
      ${div("list-item")}
      ${div("number-container")}
      ${div("circle")}
       ${div("number")}
       ${numberString}
       </div>
        </div>
      </div>
      ${div("instruction")}
      ${instructionHTML}
      </div>
    </div>`;
  }

  function _genListButtonWithImage(
    imageUrl: string,
    text: string = "",
    image_side: string = "none"
  ) {
    if (!text) {
      // -translate-y-1 for tailwindcss compensation
      return (
        `
        ${div("list-button")}
          <img class="adhs-list-button-image-only -translate-y-1" src="` +
        imageUrl +
        `" />
      </div>`
      );
    } else if (image_side === "right") {
      // -translate-y-1 for tailwindcss compensation
      return (
        `
        ${div("list-button")}
        ${div("list-button-text")}
        ${text}
        </div>
        <img class="adhs-list-button-image-right -translate-y-1" src="` +
        imageUrl +
        `" />
      </div>`
      );
    } else if (image_side === "left") {
      // -translate-y-1 for tailwindcss compensation
      return (
        `
        ${div("list-button")}
        <img class="adhs-list-button-image-left -translate-y-1" src="` +
        imageUrl +
        `" />
        ${div("list-button-text")}
        ${text}
        </div>
      </div>`
      );
    } else {
      throw new Error("_genListButtonWithImage: invalid arguments");
    }
  }

  function _genAssetUrl(fileName: string) {
    return assetUrl + fileName;
  }

  function _genIOSSafari(container: HTMLElement) {
    var containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      // _genAppUrlHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__(
          "Tap the %s button in the toolbar.",
          _genListButtonWithImage(
            _genAssetUrl("ios-safari-sharing-api-button-2.svg")
          )
        )
      ) +
      _genListItem(
        `2`,
        i18n.__(
          "Select %s from the menu that pops up.",
          _genListButtonWithImage(
            _genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"),
            i18n.__("Add to Home Screen"),
            "right"
          )
        ) +
          ` <span class="adhs-emphasis">${i18n.__(
            "You may need to scroll down to find this menu item."
          )}</span>`
      ) +
      // _genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${appIconUrl}"/>`)) +
      _genListEnd() +
      _genBlurbMobile() +
      _genModalEnd() +
      div(
        isBrowserIOSIPadSafari()
          ? "ios-ipad-safari-bouncing-arrow-container"
          : "ios-safari-bouncing-arrow-container"
      ) +
      `<img src="` +
      _genAssetUrl("ios-safari-bouncing-arrow.svg") +
      `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-mobile", "adhs-ios", "adhs-safari");
  }

  function _genIOSChrome(container: HTMLElement) {
    var containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      // _genAppUrlHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__(
          "Tap the %s button in the upper right corner.",
          _genListButtonWithImage(_genAssetUrl("ios-chrome-more-button-2.svg"))
        )
      ) +
      _genListItem(
        `2`,
        i18n.__(
          "Select %s from the menu that pops up.",
          _genListButtonWithImage(
            _genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"),
            i18n.__("Add to Home Screen"),
            "right"
          )
        ) +
          ` ` +
          `<span class="adhs-emphasis">${i18n.__(
            "You may need to scroll down to find this menu item."
          )}</span>`
      ) +
      // _genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${appIconUrl}"/>`)) +
      _genListEnd() +
      _genBlurbMobile() +
      _genModalEnd() +
      div("ios-chrome-bouncing-arrow-container") +
      `<img src="` +
      _genAssetUrl("ios-chrome-bouncing-arrow.svg") +
      `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-mobile", "adhs-ios", "adhs-chrome");
  }

  function _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container: HTMLElement) {
    var containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      // _genAppUrlHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__(
          "Tap the %s button above.",
          `<img class="adhs-more-button" src="${_genAssetUrl(
            "generic-more-button.svg"
          )}"/>`
        )
      ) +
      _genListItem(
        `2`,
        `${i18n.__("Tap")} <span class="adhs-emphasis">${i18n.__(
          "Open in browser"
        )}</span>`
      ) +
      _genListEnd() +
      _genModalEnd() +
      div("inappbrowser-openinsystembrowser-bouncing-arrow-container") +
      `<img src="` +
      _genAssetUrl("generic-vertical-up-bouncing-arrow.svg") +
      `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add(
      "adhs-mobile",
      "adhs-ios",
      "adhs-inappbrowser-openinsystembrowser"
    );
  }

  function _genIOSInAppBrowserLowerRightButtonOpenInSafariBrowser(container: HTMLElement) {
    var containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      // _genAppUrlHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__(
          "Tap the %s button below to open your system browser.",
          `<img class="adhs-more-button" src="${_genAssetUrl(
            "openinsafari-button.png"
          )}"/>`
        )
      ) +
      _genListEnd() +
      _genModalEnd() +
      div("inappbrowser-openinsafari-bouncing-arrow-container") +
      `<img src="` +
      _genAssetUrl("generic-vertical-down-bouncing-arrow.svg") +
      `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add(
      "adhs-mobile",
      "adhs-ios",
      "adhs-inappbrowser-openinsafari"
    );
  }

  function _genAndroidChrome(container: HTMLElement) {
    var containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      // _genAppUrlHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__(
          "Tap %s in the browser bar.",
          _genListButtonWithImage(
            _genAssetUrl("android-chrome-more-button-2.svg")
          )
        )
      ) +
      _genListItem(
        `2`,
        i18n.__(
          "Tap %s",
          _genListButtonWithImage(
            _genAssetUrl("android-chrome-add-to-home-screen-button-2.svg"),
            i18n.__("Add to Home Screen"),
            "left"
          )
        )
      ) +
      // _genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${appIconUrl}"/>`)) +
      _genListEnd() +
      _genBlurbMobile() +
      _genModalEnd() +
      div("android-chrome-bouncing-arrow-container") +
      `<img src="` +
      _genAssetUrl("android-chrome-bouncing-arrow.svg") +
      `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-mobile", "adhs-android", "adhs-chrome");
  }

  function _genInstallAppHeader() {
    const text =
      appNameDisplay === "inline"
        ? i18n.__("Install %s", appName)
        : i18n.__("Install app");
    return `<h1 class="adhs-install-app">` + text + `</h1>`;
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

  function _genDesktopChrome(container: HTMLElement) {
    var blurb: string = isDesktopMac()
      ? _genBlurbDesktopMac()
      : _genBlurbDesktopWindows();

    var containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genAppUrlHeader() +
      blurb +
      div("button-container") +
      `<button class="adhs-button adhs-button-cancel">
        ` +
      i18n.__("Later") +
      `
      </button>
      <button class="adhs-button adhs-button-install">
        ` +
      i18n.__("Install") +
      `
      </button>
    </div>` +
      _genModalEnd();

    container.innerHTML = containerInnerHTML;
    container.classList.add("adhs-desktop", "adhs-desktop-chrome");

    var cancelButton =
      container.getElementsByClassName("adhs-button-cancel")[0];
    cancelButton.addEventListener("click", () => {
        closeModal();
    });

    var installButton = container.getElementsByClassName(
      "adhs-button-install"
    )[0];
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
    var blurb: string = isDesktopMac()
      ? _genBlurbDesktopMac()
      : _genBlurbDesktopWindows();

    var containerInnerHTML =
      _genModalStart() +
      _genInstallAppHeader() +
      _genAppNameHeader() +
      _genAppUrlHeader() +
      _genListStart() +
      _genListItem(
        `1`,
        i18n.__(
          "Tap %s in the toolbar.",
          _genListButtonWithImage(_genAssetUrl("desktop-safari-menu.svg"))
        )
      ) +
      _genListItem(
        `2`,
        i18n.__(
          "Tap %s",
          _genListButtonWithImage(
            _genAssetUrl("desktop-safari-dock.svg"),
            i18n.__("Add To Dock"),
            "left"
          )
        )
      ) +
      _genListEnd() +
      blurb +
      _genModalEnd() +
      div("desktop-safari-bouncing-arrow-container") +
      `<img src="` +
      _genAssetUrl("desktop-safari-bouncing-arrow.svg") +
      `" alt="arrow" />
    </div>`;
    container.innerHTML = containerInnerHTML;

    container.classList.add("adhs-desktop", "adhs-desktop-safari");
  }

  function _registerCloseListener() {
    closeEventListener = (e: Event) => {
      var modal = document
        .getElementsByClassName("adhs-container")[0]
        .getElementsByClassName("adhs-modal")[0];
      if (!modal.contains(e.target as Node) && allowClose) {
        closeModal();
      }
    };

    // enclose in setTimeout to prevent firing when this class used with an onclick
    setTimeout(() => {
      window.addEventListener("touchstart", closeEventListener!);
      window.addEventListener("click", closeEventListener!);
    }, 50);
  }

  function clearModalDisplayCount() {
    if (_isEnabledModalDisplayCount()) {
      window.localStorage.removeItem(_getModalDisplayCountKey());
    }
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

    var count: number = _getModalDisplayCount();
    count++;
    window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());
    return true;
  }

  function _getModalDisplayCountKey(): string {
    return "adhs-modal-display-count";
  }

  function _getModalDisplayCount(): number {
    var countStr: string | null = window.localStorage.getItem(
      _getModalDisplayCountKey()
    );
    var count: number;
    if (countStr === null) {
      count = 0;
      window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());
    } else {
      count = parseInt(countStr);
    }
    return count;
  }

  function debugMessage(message: string) {
    // alert(message);
    // console.log(message);
  }

  let _modalIsShowing: boolean = false;
  let _desktopInstallPromptEvent: ADHSBeforeInstallPromptEvent | null = null;
  let _desktopInstallPromptWasShown: boolean = false;
  let _desktopInstallPromptStartTimeMS: number | null = null;
  let DESKTOP_INSTALL_POLL_MS = 500;
  let DESKTOP_INSTALL_MAX_WAIT_TIME_MS = 2000;

  function _desktopInstallPromptEventListener(e: ADHSBeforeInstallPromptEvent) {
    debugMessage("DESKTOP CHROME LISTENER");
    e.preventDefault();
    _desktopInstallPromptEvent = e;
  }

  function _registerDesktopInstallPromptEvent() {
    window.addEventListener(
      "beforeinstallprompt",
      _desktopInstallPromptEventListener
    );
  }

  function _desktopInstallPromptEventHasFired(): boolean {
    return _desktopInstallPromptEvent !== null;
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

  // show the desktop chrome promotion
  function showDesktopInstallPrompt() {
    debugMessage("SHOW DESKTOP CHROME / EDGE PROMOTION");

    if (_desktopInstallPromptWasShown) {
      return;
    }

    // - if the prompt has not fired, wait for it the be fired, then show the promotion
    // - Don't bother showing promotion if wait time > DESKTOP_INSTALL_MAX_WAIT_TIME_MS,
    //   this means the event will never fire, like in Incognito mode
    if (_desktopInstallPromptEvent === null && 
        !(_desktopInstallPromptStartTimeMS && 
          ((Date.now() - _desktopInstallPromptStartTimeMS) > DESKTOP_INSTALL_MAX_WAIT_TIME_MS)
         ) 
       ) {
      // debugMessage("SHOW DESKTOP CHROME PROMOTION: PROMPT NOT FIRED");
      if (_desktopInstallPromptStartTimeMS === null) {
        _desktopInstallPromptStartTimeMS = Date.now();
      }

      setTimeout(() => {
        showDesktopInstallPrompt();
      }, DESKTOP_INSTALL_POLL_MS);
      return;
    }

    // debugMessage("SHOW DESKTOP CHROME PROMOTION: PROMPT FIRED");

    _desktopInstallPromptWasShown = true;

    var container = _createContainer(
      true // include_modal
    );

    _genDesktopChrome(container);
    _addContainerToBody(container);
  }

  function _showDesktopSafariPrompt() {
    debugMessage("SHOW SAFARI DESKTOP PROMPT");
    var container = _createContainer(
      true // include_modal
    );
    _genDesktopSafari(container);
    _addContainerToBody(container);
  }

  function div(className: string) {
    return `<div class="adhs-${className}">`;
  }

  return {
    appName,
    appIconUrl,
    assetUrl,
    maxModalDisplayCount,
    displayOptions,
    allowClose,
    clearModalDisplayCount,
    isStandAlone,
    show,
    closeModal,
    modalIsShowing,
    isDeviceIOS,
    isDeviceAndroid,
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
