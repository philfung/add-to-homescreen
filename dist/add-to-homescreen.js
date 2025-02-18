/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 279:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddToHomeScreen = AddToHomeScreen;
__webpack_require__(279);
const types_1 = __webpack_require__(699);
const config = __webpack_require__(182);
const LOCALES = config.LOCALES;
// Configure I18n
const simpleI18n_1 = __importDefault(__webpack_require__(794));
const localeCatalog = {};
LOCALES.forEach((locale) => {
    localeCatalog[locale] = __webpack_require__(259)("./" + locale + ".json");
});
simpleI18n_1.default.configure({
    locales: LOCALES,
    staticCatalog: localeCatalog,
    directory: ".",
});
function AddToHomeScreen(options) {
    let { appIconUrl, appName, appNameDisplay, assetUrl, maxModalDisplayCount, displayOptions, allowClose } = options;
    let closeEventListener = null;
    const userAgent = window.navigator.userAgent;
    _assertArg("appName", typeof appName === "string" && appName.length > 0);
    appIconUrl = appIconUrl;
    _assertArg("appIconUrl", typeof appIconUrl === "string" && appIconUrl.length > 0);
    assetUrl = assetUrl;
    _assertArg("assetUrl", typeof assetUrl === "string" && assetUrl.length > 0);
    maxModalDisplayCount =
        maxModalDisplayCount === undefined ? -1 : maxModalDisplayCount;
    _assertArg("maxModalDisplayCount", Number.isInteger(maxModalDisplayCount));
    displayOptions =
        displayOptions === undefined ? types_1.DISPLAY_OPTIONS_DEFAULT : displayOptions;
    _assertArg("displayOptions", (0, types_1.isDisplayOptions)(displayOptions));
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
        return (!!("standalone" in window.navigator && window.navigator.standalone) || // IOS (TODO: detect iPad 13)
            !!window.matchMedia("(display-mode: standalone)").matches); // Android and Desktop Chrome/Safari/Edge
    }
    function show(locale) {
        if (locale && !localeCatalog[locale]) {
            console.log("add-to-homescreen: WARNING: locale selected not available:", locale);
            locale = "";
        }
        if (!locale) {
            const language_from_browser_settings = simpleI18n_1.default._getLanguageFromBrowserSettings();
            // if no locale indicated
            // check url param "locale" and browser settings
            if (language_from_browser_settings && localeCatalog[language_from_browser_settings]) {
                locale = language_from_browser_settings;
                // if "en" intl file is available, default to "en"
            }
            else if (localeCatalog["en"]) {
                locale = "en";
                // else default to first language available
            }
            else {
                locale = Object.keys(localeCatalog)[0];
            }
        }
        debugMessage("LOCALE: " + locale);
        simpleI18n_1.default.setLocale(locale);
        var ret;
        var _device;
        let _isStandAlone;
        let _canBeStandAlone;
        if (isDeviceIOS()) {
            _device = types_1.DeviceType.IOS;
        }
        else if (isDeviceAndroid()) {
            _device = types_1.DeviceType.ANDROID;
        }
        else {
            _device = types_1.DeviceType.DESKTOP;
        }
        if (isStandAlone()) {
            debugMessage("ALREADY STANDALONE");
            ret = new types_1.DeviceInfo((_isStandAlone = true), (_canBeStandAlone = true), (_device = _device));
        }
        else if (_hasReachedMaxModalDisplayCount()) {
            ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
        }
        else if (displayOptions.showMobile &&
            (isDeviceIOS() || isDeviceAndroid())) {
            debugMessage("NOT STANDALONE - IOS OR ANDROID");
            var shouldShowModal = true;
            _incrModalDisplayCount();
            var container = _createContainer(false // include_modal
            );
            if (isDeviceIOS()) {
                // ios
                if (isBrowserIOSSafari()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genIOSSafari(container);
                }
                else if (isBrowserIOSChrome()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genIOSChrome(container);
                }
                else if (isBrowserIOSInAppFacebook()
                    || isBrowserIOSInAppLinkedin()
                    || isBrowserIOSInAppInstagram()) {
                    // IOS INSTAGRAM: https://github.com/user-attachments/assets/0d3ab224-1ac7-454e-b75d-21f6c52ffa87
                    // IOS FACEBOOK: https://github.com/user-attachments/assets/4c8121a2-3c62-402f-be05-0c54bf108ddc
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container);
                }
                else if (isBrowserIOSInAppTwitter()) {
                    // IOS TWITTER/X: https://github.com/user-attachments/assets/ed01b58e-5aab-48b9-8c42-d21d24cd2c03
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserLowerRightButtonOpenInSafariBrowser(container);
                }
                else {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    shouldShowModal = false;
                }
            }
            else {
                // android
                if (isBrowserAndroidChrome()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = true), (_device = _device));
                    _genAndroidChrome(container);
                }
                else if (isBrowserAndroidFacebook() || isBrowserAndroidInstagram()) {
                    // ANDROID FACEBOOK: https://github.com/user-attachments/assets/45701ac3-d337-4fc4-8e82-3d03236bf3a5
                    // ANDROID INSTAGRAM: https://github.com/user-attachments/assets/7e1d11fd-31ba-4b27-a13d-6beb079b4204
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container);
                }
                else {
                    // ANDROID X/TWITTER JUST OPENS SYSTEM BROWSER
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    shouldShowModal = false;
                }
            }
            if (shouldShowModal) {
                _addContainerToBody(container);
            }
        }
        else {
            debugMessage("DESKTOP");
            ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
            if (displayOptions.showDesktop) {
                if (isDesktopChrome() || isDesktopEdge()) {
                    debugMessage("DESKTOP CHROME");
                    _incrModalDisplayCount();
                    showDesktopInstallPrompt();
                }
                else if (isDesktopSafari()) {
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
            setTimeout(() => {
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
            isDeviceIOS() ? 500 : 300);
        }
    }
    function modalIsShowing() {
        return _modalIsShowing;
    }
    /**** Device Detection Functions ****/
    function _matchesUserAgent(regex) {
        return !!userAgent.match(regex);
    }
    function isDeviceAndroid() {
        return !!_matchesUserAgent(/Android/);
    }
    function isDeviceIOS() {
        return _matchesUserAgent(/iPhone|iPad|iPod/) || isBrowserIOSIPadSafari();
    }
    function isBrowserIOSIPadSafari() {
        return !!(_matchesUserAgent(/iPad/) || // iPad Mini
            // iPad Air, iPad Pro
            (_matchesUserAgent(/Macintosh/) &&
                navigator.maxTouchPoints &&
                navigator.maxTouchPoints > 1));
    }
    /* Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)
     AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0
     Mobile/14E5239e Safari/602.1 */
    function isBrowserIOSSafari() {
        return (isDeviceIOS() &&
            _matchesUserAgent(/Safari/) &&
            !isBrowserIOSChrome() &&
            !isBrowserIOSFirefox() &&
            !isBrowserIOSInAppFacebook() &&
            !isBrowserIOSInAppLinkedin() &&
            !isBrowserIOSInAppInstagram() &&
            !isBrowserIOSInAppThreads() &&
            !isBrowserIOSInAppTwitter());
    }
    /* Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)
       AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75
       Mobile/14E5239e Safari/602.1 */
    function isBrowserIOSChrome() {
        return isDeviceIOS() && _matchesUserAgent(/CriOS/);
    }
    /* Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)
    AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/114.1 Mobile/15E148 Safari/605.1.15 */
    function isBrowserIOSFirefox() {
        return isDeviceIOS() && _matchesUserAgent(/FxiOS/);
    }
    function isBrowserIOSInAppFacebook() {
        if (!isDeviceIOS()) {
            return false;
        }
        return _matchesUserAgent(/FBAN|FBAV/);
    }
    function isBrowserIOSInAppLinkedin() {
        if (!isDeviceIOS()) {
            return false;
        }
        return _matchesUserAgent(/LinkedInApp/);
    }
    function isBrowserIOSInAppInstagram() {
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
    function isBrowserIOSInAppThreads() {
        return isBrowserIOSInAppInstagram();
    }
    function isBrowserIOSInAppTwitter() {
        if (!isDeviceIOS()) {
            return false;
        }
        // TODO: this solution is incompatible with Twitter mobile website links
        // TODO: this solution only works with first-level links
        return !!window.document.referrer.match("//t.co/");
    }
    /* Mozilla/5.0 (Linux; Android 10)
       AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.92 Mobile Safari/537.36 */
    function isBrowserAndroidChrome() {
        return (isDeviceAndroid() &&
            !!_matchesUserAgent(/Chrome/) &&
            !isBrowserAndroidFacebook() &&
            !isBrowserAndroidInstagram() &&
            !isBrowserAndroidSamsung() &&
            !isBrowserAndroidFirefox() &&
            !isBrowserAndroidEdge() &&
            !isBrowserAndroidOpera());
    }
    /*Mozilla/5.0 (Linux; Android 12; SM-S908U1 Build/SP1A.210812.016; wv)
      AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.88
      Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/377.0.0.22.107;]*/
    function isBrowserAndroidFacebook() {
        return isDeviceAndroid() && _matchesUserAgent(/FBAN|FBAV/);
    }
    function isBrowserAndroidInstagram() {
        return isDeviceAndroid() && _matchesUserAgent(/Instagram/);
    }
    /* Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-S918B) AppleWebKit/537.36
    (KHTML, like Gecko) SamsungBrowser/21.0 Chrome/110.0.5481.154 Mobile Safari/537.36 */
    function isBrowserAndroidSamsung() {
        return isDeviceAndroid() && _matchesUserAgent(/SamsungBrowser/);
    }
    /* Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/114.0 Firefox/114.0 */
    function isBrowserAndroidFirefox() {
        return isDeviceAndroid() && _matchesUserAgent(/Firefox/);
    }
    function isBrowserAndroidOpera() {
        return isDeviceAndroid() && _matchesUserAgent(/OPR/);
    }
    function isBrowserAndroidEdge() {
        return isDeviceAndroid() && _matchesUserAgent(/Edg/);
    }
    function isDesktopWindows() {
        return userAgent.includes("Windows");
    }
    function isDesktopMac() {
        return userAgent.includes("Macintosh");
    }
    function isDesktopChrome() {
        const isChrome = userAgent.includes("Chrome") && !userAgent.includes("Edg"); // Exclude Edge browser
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
    /**** Internal Functions ****/
    function _getAppDisplayUrl() {
        // return 'https://aardvark.app';
        const currentUrl = new URL(window.location.href);
        return currentUrl.href.replace(/\/$/, "");
    }
    function _assertArg(variableName, booleanExp) {
        if (!booleanExp) {
            throw new Error("AddToHomeScreen: variable '" + variableName + "' has an invalid value.");
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
    function _addContainerToBody(container) {
        _modalIsShowing = true;
        document.body.appendChild(container);
        _registerCloseListener();
        setTimeout(() => {
            container.classList.add("visible");
        }, 50);
    }
    function _genLogo() {
        return (`
      ${div("logo")}
        <img src="` +
            appIconUrl +
            `" alt="logo" />
      </div>
      `);
    }
    function _genTitleWithMessage(message) {
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
    function _genListItem(numberString, instructionHTML) {
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
    function _genListButtonWithImage(imageUrl, text = "", image_side = "none") {
        if (!text) {
            // -translate-y-1 for tailwindcss compensation
            return (`
        ${div("list-button")}
          <img class="adhs-list-button-image-only -translate-y-1" src="` +
                imageUrl +
                `" />
      </div>`);
        }
        else if (image_side === "right") {
            // -translate-y-1 for tailwindcss compensation
            return (`
        ${div("list-button")}
        ${div("list-button-text")}
        ${text}
        </div>
        <img class="adhs-list-button-image-right -translate-y-1" src="` +
                imageUrl +
                `" />
      </div>`);
        }
        else if (image_side === "left") {
            // -translate-y-1 for tailwindcss compensation
            return (`
        ${div("list-button")}
        <img class="adhs-list-button-image-left -translate-y-1" src="` +
                imageUrl +
                `" />
        ${div("list-button-text")}
        ${text}
        </div>
      </div>`);
        }
        else {
            throw new Error("_genListButtonWithImage: invalid arguments");
        }
    }
    function _genAssetUrl(fileName) {
        return assetUrl + fileName;
    }
    function _genIOSSafari(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap the %s button in the toolbar.", _genListButtonWithImage(_genAssetUrl("ios-safari-sharing-api-button-2.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Select %s from the menu that pops up.", _genListButtonWithImage(_genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"), simpleI18n_1.default.__("Add to Home Screen"), "right")) +
                ` <span class="adhs-emphasis">${simpleI18n_1.default.__("You may need to scroll down to find this menu item.")}</span>`) +
            // _genListItem(`3`, i18n.__('Open the %s app.', `<img class="adhs-your-app-icon" src="${appIconUrl}"/>`)) +
            _genListEnd() +
            _genBlurbMobile() +
            _genModalEnd() +
            div(isBrowserIOSIPadSafari()
                ? "ios-ipad-safari-bouncing-arrow-container"
                : "ios-safari-bouncing-arrow-container") +
            `<img src="` +
            _genAssetUrl("ios-safari-bouncing-arrow.svg") +
            `" alt="arrow" />
    </div>`;
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-safari");
    }
    function _genIOSChrome(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap the %s button in the upper right corner.", _genListButtonWithImage(_genAssetUrl("ios-chrome-more-button-2.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Select %s from the menu that pops up.", _genListButtonWithImage(_genAssetUrl("ios-safari-add-to-home-screen-button-2.svg"), simpleI18n_1.default.__("Add to Home Screen"), "right")) +
                ` ` +
                `<span class="adhs-emphasis">${simpleI18n_1.default.__("You may need to scroll down to find this menu item.")}</span>`) +
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
    function _genIOSInAppBrowserUpperRightButtonOpenInSystemBrowser(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap the %s button above.", `<img class="adhs-more-button" src="${_genAssetUrl("generic-more-button.svg")}"/>`)) +
            _genListItem(`2`, `${simpleI18n_1.default.__("Tap")} <span class="adhs-emphasis">${simpleI18n_1.default.__("Open in browser")}</span>`) +
            _genListEnd() +
            _genModalEnd() +
            div("inappbrowser-openinsystembrowser-bouncing-arrow-container") +
            `<img src="` +
            _genAssetUrl("generic-vertical-up-bouncing-arrow.svg") +
            `" alt="arrow" />
    </div>`;
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-inappbrowser-openinsystembrowser");
    }
    function _genIOSInAppBrowserLowerRightButtonOpenInSafariBrowser(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap the %s button below to open your system browser.", `<img class="adhs-more-button" src="${_genAssetUrl("openinsafari-button.png")}"/>`)) +
            _genListEnd() +
            _genModalEnd() +
            div("inappbrowser-openinsafari-bouncing-arrow-container") +
            `<img src="` +
            _genAssetUrl("generic-vertical-down-bouncing-arrow.svg") +
            `" alt="arrow" />
    </div>`;
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-mobile", "adhs-ios", "adhs-inappbrowser-openinsafari");
    }
    function _genAndroidChrome(container) {
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            // _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap %s in the browser bar.", _genListButtonWithImage(_genAssetUrl("android-chrome-more-button-2.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Tap %s", _genListButtonWithImage(_genAssetUrl("android-chrome-add-to-home-screen-button-2.svg"), simpleI18n_1.default.__("Add to Home Screen"), "left"))) +
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
        const text = appNameDisplay === "inline"
            ? simpleI18n_1.default.__("Install %s", appName)
            : simpleI18n_1.default.__("Install app");
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
    function _genBlurbWithMessage(message) {
        return div("blurb") + message + `</div>`;
    }
    function _genBlurbMobile() {
        return _genBlurbWithMessage(simpleI18n_1.default.__("An icon will be added to your home screen so you can quickly access this website."));
    }
    function _genBlurbDesktopWindows() {
        return _genBlurbWithMessage(simpleI18n_1.default.__("An icon will be added to your Taskbar so you can quickly access this website."));
    }
    function _genBlurbDesktopMac() {
        return _genBlurbWithMessage(simpleI18n_1.default.__("An icon will be added to your Dock so you can quickly access this website."));
    }
    function _genDesktopChrome(container) {
        var blurb = isDesktopMac()
            ? _genBlurbDesktopMac()
            : _genBlurbDesktopWindows();
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            _genAppUrlHeader() +
            blurb +
            div("button-container") +
            `<button class="adhs-button adhs-button-cancel">
        ` +
            simpleI18n_1.default.__("Later") +
            `
      </button>
      <button class="adhs-button adhs-button-install">
        ` +
            simpleI18n_1.default.__("Install") +
            `
      </button>
    </div>` +
            _genModalEnd();
        container.innerHTML = containerInnerHTML;
        container.classList.add("adhs-desktop", "adhs-desktop-chrome");
        var cancelButton = container.getElementsByClassName("adhs-button-cancel")[0];
        cancelButton.addEventListener("click", () => {
            closeModal();
        });
        var installButton = container.getElementsByClassName("adhs-button-install")[0];
        installButton.addEventListener("click", () => {
            if (!_desktopInstallPromptEvent) {
                return;
            }
            _desktopInstallPromptEvent.prompt();
            closeModal();
            _desktopInstallPromptEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    debugMessage("User accepted the install prompt");
                }
                else {
                    debugMessage("User dismissed the install prompt");
                }
                _desktopInstallPromptEvent = null;
            });
        });
    }
    function _genDesktopSafari(container) {
        var blurb = isDesktopMac()
            ? _genBlurbDesktopMac()
            : _genBlurbDesktopWindows();
        var containerInnerHTML = _genModalStart() +
            _genInstallAppHeader() +
            _genAppNameHeader() +
            _genAppUrlHeader() +
            _genListStart() +
            _genListItem(`1`, simpleI18n_1.default.__("Tap %s in the toolbar.", _genListButtonWithImage(_genAssetUrl("desktop-safari-menu.svg")))) +
            _genListItem(`2`, simpleI18n_1.default.__("Tap %s", _genListButtonWithImage(_genAssetUrl("desktop-safari-dock.svg"), simpleI18n_1.default.__("Add To Dock"), "left"))) +
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
        closeEventListener = (e) => {
            var modal = document
                .getElementsByClassName("adhs-container")[0]
                .getElementsByClassName("adhs-modal")[0];
            if (!modal.contains(e.target) && allowClose) {
                closeModal();
            }
        };
        // enclose in setTimeout to prevent firing when this class used with an onclick
        setTimeout(() => {
            window.addEventListener("touchstart", closeEventListener);
            window.addEventListener("click", closeEventListener);
        }, 50);
    }
    function clearModalDisplayCount() {
        if (_isEnabledModalDisplayCount()) {
            window.localStorage.removeItem(_getModalDisplayCountKey());
        }
    }
    function _isEnabledModalDisplayCount() {
        return (typeof maxModalDisplayCount === "number" &&
            maxModalDisplayCount >= 0 &&
            window.localStorage !== undefined);
    }
    function _hasReachedMaxModalDisplayCount() {
        if (!_isEnabledModalDisplayCount()) {
            return false;
        }
        return _getModalDisplayCount() >= maxModalDisplayCount;
    }
    function _incrModalDisplayCount() {
        if (!_isEnabledModalDisplayCount()) {
            return false;
        }
        var count = _getModalDisplayCount();
        count++;
        window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());
        return true;
    }
    function _getModalDisplayCountKey() {
        return "adhs-modal-display-count";
    }
    function _getModalDisplayCount() {
        var countStr = window.localStorage.getItem(_getModalDisplayCountKey());
        var count;
        if (countStr === null) {
            count = 0;
            window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());
        }
        else {
            count = parseInt(countStr);
        }
        return count;
    }
    function debugMessage(message) {
        // alert(message);
        // console.log(message);
    }
    let _modalIsShowing = false;
    let _desktopInstallPromptEvent = null;
    let _desktopInstallPromptWasShown = false;
    let _desktopInstallPromptStartTimeMS = null;
    let DESKTOP_INSTALL_POLL_MS = 500;
    let DESKTOP_INSTALL_MAX_WAIT_TIME_MS = 2000;
    function _desktopInstallPromptEventListener(e) {
        debugMessage("DESKTOP CHROME LISTENER");
        e.preventDefault();
        _desktopInstallPromptEvent = e;
    }
    function _registerDesktopInstallPromptEvent() {
        window.addEventListener("beforeinstallprompt", _desktopInstallPromptEventListener);
    }
    function _desktopInstallPromptEventHasFired() {
        return _desktopInstallPromptEvent !== null;
    }
    function shouldShowDesktopInstallPromptBasedOnDevice() {
        return (!isStandAlone() &&
            !_hasReachedMaxModalDisplayCount() &&
            !isDeviceIOS() &&
            !isDeviceAndroid() &&
            (isDesktopChrome() || isDesktopEdge()));
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
                ((Date.now() - _desktopInstallPromptStartTimeMS) > DESKTOP_INSTALL_MAX_WAIT_TIME_MS))) {
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
        var container = _createContainer(true // include_modal
        );
        _genDesktopChrome(container);
        _addContainerToBody(container);
    }
    function _showDesktopSafariPrompt() {
        debugMessage("SHOW SAFARI DESKTOP PROMPT");
        var container = _createContainer(true // include_modal
        );
        _genDesktopSafari(container);
        _addContainerToBody(container);
    }
    function div(className) {
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


/***/ }),

/***/ 794:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
let config;
let directory;
const PLACEHOLDER = "%s";
const SimpleI18n = {
    configure: (configInput) => {
        config = configInput;
    },
    _getLanguageFromLocale: (locale) => {
        if (!locale) {
            return "";
        }
        if (locale.indexOf("-") >= 0) {
            return locale.split("-")[0];
        }
        if (locale.indexOf("_") >= 0) {
            return locale.split("_")[0];
        }
        return locale;
    },
    _getLanguageFromBrowserSettings: () => {
        // check url for a 'locale' param
        const url_params = new URLSearchParams(window.location.search);
        const url_locale = url_params.get('locale');
        if (url_locale) {
            return SimpleI18n._getLanguageFromLocale(url_locale);
        }
        // check browser setting
        if (navigator.languages && navigator.languages.length) {
            return SimpleI18n._getLanguageFromLocale(navigator.languages[0]);
        }
        return "";
    },
    setLocale: (locale) => {
        if (false) {}
        directory = config.staticCatalog[locale];
    },
    _translateKey(key) {
        if (directory == null || directory[key] == null) {
            return key;
        }
        return directory[key];
    },
    __: (key, input) => {
        if (key.indexOf(PLACEHOLDER) < 0) {
            return SimpleI18n._translateKey(key);
        }
        // Need to do a string replacement
        if (false) {}
        const translated_key = SimpleI18n._translateKey(key);
        const parts = translated_key.split(PLACEHOLDER);
        return parts[0] + input + parts[1];
    },
};
exports["default"] = SimpleI18n;


/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DISPLAY_OPTIONS_DEFAULT = exports.DeviceInfo = exports.DeviceType = void 0;
exports.isDisplayOptions = isDisplayOptions;
var DeviceType;
(function (DeviceType) {
    DeviceType["IOS"] = "IOS";
    DeviceType["ANDROID"] = "ANDROID";
    DeviceType["DESKTOP"] = "DESKTOP";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
class DeviceInfo {
    constructor(isStandAlone, canBeStandAlone, device) {
        this.isStandAlone = isStandAlone;
        this.canBeStandAlone = canBeStandAlone;
        this.device = device;
    }
}
exports.DeviceInfo = DeviceInfo;
exports.DISPLAY_OPTIONS_DEFAULT = {
    showMobile: true,
    showDesktop: true
};
function isDisplayOptions(obj) {
    return obj
        && typeof obj.showMobile === 'boolean'
        && typeof obj.showDesktop === 'boolean';
}


/***/ }),

/***/ 182:
/***/ ((module) => {

module.exports = {
  LOCALES: [
    "ar",
    "da",
    "de",
    "en",
    "es",
    "fr",
    "he",
    "it",
    "ja",
    "pt",
    "ru",
    "cs",
    "ko",
    "lv",
    "nl",
    "pl",
    "sl",
    "sv",
    "th",
    "vn",
    "zh",
    "zh_CN",
    "zh_HK",
    "zh_TW"
  ],
  DEFAULT_LOCALE: "en",
};


/***/ }),

/***/ 259:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ar.json": 726,
	"./cs.json": 789,
	"./da.json": 638,
	"./de.json": 929,
	"./en.json": 790,
	"./es.json": 563,
	"./fr.json": 844,
	"./he.json": 818,
	"./it.json": 504,
	"./ja.json": 566,
	"./ko.json": 697,
	"./lv.json": 71,
	"./nl.json": 55,
	"./pl.json": 143,
	"./pt.json": 898,
	"./ru.json": 672,
	"./sl.json": 329,
	"./sv.json": 244,
	"./th.json": 9,
	"./vn.json": 827,
	"./zh.json": 538,
	"./zh_CN.json": 662,
	"./zh_HK.json": 295,
	"./zh_TW.json": 511
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 259;

/***/ }),

/***/ 726:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"حفظ الى الرئيسية","Add To Dock":"اضافة الى مستندات","An icon will be added to your Dock so you can quickly access this website.":"سيتم وضع ايقونة كي تستطيع استخدام التطبيق فيما بعد","An icon will be added to your home screen so you can quickly access this website.":"سيتم وضع ايقونة كي تستطيع استخدام التطبيق فيما بعد","An icon will be added to your Taskbar so you can quickly access this website.":"سيتم وضع ايقونة كي تستطيع استخدام التطبيق فيما بعد","Install":"تنصيب","Install %s":"تنصيب %s","Install app":"تنصيب التطبيق","Later":"فيما بعد","Open in browser":"فتح في المتصفح","Select %s from the menu that pops up.":"اختر %s من القائمة المنبثقة","Tap %s":"اضغط %s","Tap %s in the browser bar.":"اضغط %s في شريط المتصفح","Tap %s in the toolbar.":"اضغط %s في الادوات","Tap the %s button above.":"اضغط على %s الزر بالاعلى","Tap the %s button below to open your system browser.":"اضغط على %s زر بالاسفل لفتح المتصفح","Tap the %s button in the toolbar.":"اضغط على %s زر في قائمة الادوات","Tap the %s button in the upper right corner.":"اضغط على %s زر لرؤية القائمة العلوية","You may need to scroll down to find this menu item.":"لربما انت بحاجة الى النزول للأسفل لرؤية القائمة"}');

/***/ }),

/***/ 789:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Přidat na plochu","Add To Dock":"Přidat do Docku","An icon will be added to your Dock so you can quickly access this website.":"Ikona bude přidána do vašeho Docku, abyste měli rychlý přístup k této webové stránce.","An icon will be added to your home screen so you can quickly access this website.":"Ikona bude přidána na vaši domovskou obrazovku, abyste měli rychlý přístup k této webové stránce.","An icon will be added to your Taskbar so you can quickly access this website.":"Ikona bude přidána na váš panel úloh, abyste měli rychlý přístup k této webové stránce.","Install":"Instalovat","Install %s":"Instalovat %s","Install app":"Instalovat aplikaci","Later":"Později","Open in browser":"Otevřít v prohlížeči","Select %s from the menu that pops up.":"Vyberte %s z nabídky, která se zobrazí.","Tap %s":"Klepněte na %s","Tap %s in the browser bar.":"Klepněte na %s v panelu prohlížeče.","Tap %s in the toolbar.":"Klepněte na %s v panelu nástrojů.","Tap the %s button above.":"Klepněte na tlačítko %s výše.","Tap the %s button below to open your system browser.":"Klepněte na tlačítko %s níže pro otevření systémového prohlížeče.","Tap the %s button in the toolbar.":"Klepněte na tlačítko %s v panelu nástrojů.","Tap the %s button in the upper right corner.":"Klepněte na tlačítko %s v pravém horním rohu.","You may need to scroll down to find this menu item.":"Možná budete muset posunout dolů, abyste tuto položku nabídky našli."}');

/***/ }),

/***/ 638:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Tilføj til startskærm","Add To Dock":"Tilføj til dock","An icon will be added to your Dock so you can quickly access this website.":"Et ikon vil blive tilføjet til din dock, så du hurtigt kan få adgang til dette website.","An icon will be added to your home screen so you can quickly access this website.":"Et ikon vil blive tilføjet til din startskærm, så du hurtigt kan få adgang til dette website.","An icon will be added to your Taskbar so you can quickly access this website.":"Et ikon vil blive tilføjet til din proceslinje, så du hurtigt kan få adgang til dette website.","Install":"Installer","Install %s":"Installer %s","Install app":"Installer app","Later":"Senere","Open in browser":"Åbn i browser","Select %s from the menu that pops up.":"Vælg %s fra menuen, der dukker op.","Tap %s":"Tryk på %s","Tap %s in the browser bar.":"Tryk på %s i browserlinjen.","Tap %s in the toolbar.":"Tryk på %s i værktøjslinjen.","Tap the %s button above.":"Tryk på %s-knappen ovenfor.","Tap the %s button below to open your system browser.":"Tryk på %s-knappen nedenfor for at åbne din systembrowser.","Tap the %s button in the toolbar.":"Tryk på %s-knappen i værktøjslinjen.","Tap the %s button in the upper right corner.":"Tryk på %s-knappen i øverste højre hjørne.","You may need to scroll down to find this menu item.":"Du skal måske rulle ned for at finde dette menupunkt."}');

/***/ }),

/***/ 929:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Zum Home-Bildschirm","Add To Dock":"Zum Dock hinzufügen","An icon will be added to your Dock so you can quickly access this website.":"Ein Symbol wird zu Ihrem Dock hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","An icon will be added to your home screen so you can quickly access this website.":"Ein Symbol wird zu Ihrem Startbildschirm hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","An icon will be added to your Taskbar so you can quickly access this website.":"Ein Symbol wird zu Ihrer Taskleiste hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","Install":"Installieren","Install %s":"%s installieren","Install app":"App installieren","Later":"Später","Open in browser":"Im Browser öffnen","Select %s from the menu that pops up.":"Wählen Sie %s aus dem Menü, das erscheint.","Tap %s":"Tippen Sie auf %s","Tap %s in the browser bar.":"Tippen Sie auf %s in der Browserleiste.","Tap %s in the toolbar.":"Tippen Sie auf %s in der Symbolleiste.","Tap the %s button above.":"Tippen Sie oben auf die Schaltfläche %s.","Tap the %s button below to open your system browser.":"Tippen Sie unten auf die Schaltfläche %s, um Ihren Systembrowser zu öffnen.","Tap the %s button in the toolbar.":"Tippen Sie auf die Schaltfläche %s in der Symbolleiste.","Tap the %s button in the upper right corner.":"Tippen Sie auf die Schaltfläche %s in der oberen rechten Ecke.","You may need to scroll down to find this menu item.":"Sie müssen möglicherweise nach unten scrollen, um diesen Menüpunkt zu finden."}');

/***/ }),

/***/ 790:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Add to Home Screen","Add To Dock":"Add To Dock","An icon will be added to your Dock so you can quickly access this website.":"An icon will be added to your Dock so you can quickly access this website.","An icon will be added to your home screen so you can quickly access this website.":"An icon will be added to your home screen so you can quickly access this website.","An icon will be added to your Taskbar so you can quickly access this website.":"An icon will be added to your Taskbar so you can quickly access this website.","Install":"Install","Install %s":"Install %s","Install app":"Install app","Later":"Later","Open in browser":"Open in browser","Select %s from the menu that pops up.":"Select %s from the menu that pops up.","Tap %s":"Tap %s","Tap %s in the browser bar.":"Tap %s in the browser bar.","Tap %s in the toolbar.":"Tap %s in the toolbar.","Tap the %s button above.":"Tap the %s button above.","Tap the %s button below to open your system browser.":"Tap the %s button below to open your system browser.","Tap the %s button in the toolbar.":"Tap the %s button in the toolbar.","Tap the %s button in the upper right corner.":"Tap the %s button in the upper right corner.","You may need to scroll down to find this menu item.":"You may need to scroll down to find this menu item."}');

/***/ }),

/***/ 563:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Agregar a Inicio","Add To Dock":"Añadir al Dock","An icon will be added to your Dock so you can quickly access this website.":"Se añadirá un icono a tu Dock para que puedas acceder rápidamente a este sitio web.","An icon will be added to your home screen so you can quickly access this website.":"Se añadirá un icono a tu pantalla de inicio para que puedas acceder rápidamente a este sitio web.","An icon will be added to your Taskbar so you can quickly access this website.":"Se añadirá un icono a tu barra de tareas para que puedas acceder rápidamente a este sitio web.","Install":"Instalar","Install %s":"Instalar %s","Install app":"Instalar aplicación","Later":"Más tarde","Open in browser":"Abrir en el navegador","Select %s from the menu that pops up.":"Selecciona %s del menú emergente.","Tap %s":"Toca %s","Tap %s in the browser bar.":"Toca %s en la barra del navegador.","Tap %s in the toolbar.":"Toca %s en la barra de herramientas.","Tap the %s button above.":"Toca el botón %s de arriba.","Tap the %s button below to open your system browser.":"Toca el botón %s de abajo para abrir el navegador de tu sistema.","Tap the %s button in the toolbar.":"Toca el botón %s en la barra de herramientas.","Tap the %s button in the upper right corner.":"Toca el botón %s en la esquina superior derecha.","You may need to scroll down to find this menu item.":"Es posible que necesites desplazarte hacia abajo para encontrar este elemento del menú."}');

/***/ }),

/***/ 844:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Sur l\'écran d\'accueil","Add To Dock":"Ajouter au Dock","An icon will be added to your Dock so you can quickly access this website.":"Une icône sera ajoutée à votre Dock pour accéder rapidement à ce site web.","An icon will be added to your home screen so you can quickly access this website.":"Une icône sera ajoutée à votre écran d\'accueil pour accéder rapidement à ce site web.","An icon will be added to your Taskbar so you can quickly access this website.":"Une icône sera ajoutée à votre barre des tâches pour accéder rapidement à ce site web.","Install":"Installer","Install %s":"Installer %s","Install app":"Installer l\'application","Later":"Plus tard","Open in browser":"Ouvrir dans le navigateur","Select %s from the menu that pops up.":"Sélectionnez %s dans le menu qui apparaît.","Tap %s":"Appuyez sur %s","Tap %s in the browser bar.":"Appuyez sur %s dans la barre du navigateur.","Tap %s in the toolbar.":"Appuyez sur %s dans la barre d\'outils.","Tap the %s button above.":"Appuyez sur le bouton %s ci-dessus.","Tap the %s button below to open your system browser.":"Appuyez sur le bouton %s ci-dessous pour ouvrir votre navigateur système.","Tap the %s button in the toolbar.":"Appuyez sur le bouton %s dans la barre d\'outils.","Tap the %s button in the upper right corner.":"Appuyez sur le bouton %s dans le coin supérieur droit.","You may need to scroll down to find this menu item.":"Vous devrez peut-être faire défiler vers le bas pour trouver cet élément du menu."}');

/***/ }),

/***/ 818:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"הוסף למסך הבית","Add To Dock":"הוסף לדוק","An icon will be added to your Dock so you can quickly access this website.":"אייקון יתווסף לדוק שלך כדי שתוכל לגשת במהירות לאתר זה.","An icon will be added to your home screen so you can quickly access this website.":"אייקון יתווסף למסך הבית שלך כדי שתוכל לגשת במהירות לאתר זה.","An icon will be added to your Taskbar so you can quickly access this website.":"אייקון יתווסף לשורת המשימות שלך כדי שתוכל לגשת במהירות לאתר זה.","Install":"התקן","Install %s":"התקן %s","Install app":"התקן אפלקציה","Later":"מאוחר יותר","Open in browser":"פתח בדפדפן","Select %s from the menu that pops up.":"בחר ב %s מהתפריט שנפתח.","Tap %s":"לחץ על %s","Tap %s in the browser bar.":"לחץ על %s בשורת הדפדפן.","Tap %s in the toolbar.":"לחץ על %s בסרגל הכלים.","Tap the %s button above.":"לחץ על הכפתור %s למעלה.","Tap the %s button below to open your system browser.":"לחץ על הכפתור %s למטה כדי לפתוח את דפדפן המערכת שלך.","Tap the %s button in the toolbar.":"לחץ על הכפתור %s בסרגל הכלים.","Tap the %s button in the upper right corner.":"לחץ על הכפתור %s בפינה הימנית העליונה.","You may need to scroll down to find this menu item.":"יתכן שתצטרך לגלול למטה כדי למצוא פריט זה בתפריט."}');

/***/ }),

/***/ 504:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Aggiungi alla schermata Home","Add To Dock":"Aggiungi al Dock","An icon will be added to your Dock so you can quickly access this website.":"Un\'icona verrà aggiunta al tuo Dock per accedere rapidamente a questo sito web.","An icon will be added to your home screen so you can quickly access this website.":"Un\'icona verrà aggiunta alla tua schermata Home per accedere rapidamente a questo sito web.","An icon will be added to your Taskbar so you can quickly access this website.":"Un\'icona verrà aggiunta alla tua barra delle applicazioni per accedere rapidamente a questo sito web.","Install":"Installa","Install %s":"Installa %s","Install app":"Installa app","Later":"Più tardi","Open in browser":"Apri nel browser","Select %s from the menu that pops up.":"Seleziona %s dal menu che appare.","Tap %s":"Tocca %s","Tap %s in the browser bar.":"Tocca %s nella barra del browser.","Tap %s in the toolbar.":"Tocca %s nella barra degli strumenti.","Tap the %s button above.":"Tocca il pulsante %s sopra.","Tap the %s button below to open your system browser.":"Tocca il pulsante %s sotto per aprire il browser di sistema.","Tap the %s button in the toolbar.":"Tocca il pulsante %s nella barra degli strumenti.","Tap the %s button in the upper right corner.":"Tocca il pulsante %s nell\'angolo in alto a destra.","You may need to scroll down to find this menu item.":"Potrebbe essere necessario scorrere verso il basso per trovare questa voce di menu."}');

/***/ }),

/***/ 566:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"ホーム画面に追加","Add To Dock":"Dockに追加","An icon will be added to your Dock so you can quickly access this website.":"アイコンがDockに追加され、このウェブサイトをすばやくアクセスできます。","An icon will be added to your home screen so you can quickly access this website.":"アイコンがホーム画面に追加され、このウェブサイトをすばやくアクセスできます。","An icon will be added to your Taskbar so you can quickly access this website.":"アイコンがタスクバーに追加され、このウェブサイトをすばやくアクセスできます。","Install":"インストール","Install %s":"%sをインストール","Install app":"アプリをインストール","Later":"後で","Open in browser":"ブラウザで開く","Select %s from the menu that pops up.":"表示されるメニューから%sを選択してください。","Tap %s":"%sをタップ","Tap %s in the browser bar.":"ブラウザバーで表示される%sをタップ","Tap %s in the toolbar.":"ツールバーで表示される%sをタップ","Tap the %s button above.":"上の%sボタンをタップ","Tap the %s button below to open your system browser.":"下の%sボタンをタップしてシステムのブラウザを開きます。","Tap the %s button in the toolbar.":"ツールバーの%sボタンをタップ","Tap the %s button in the upper right corner.":"右上の%sボタンをタップ","You may need to scroll down to find this menu item.":"このメニュー項目を見つけるには、下にスクロールする必要があります。"}');

/***/ }),

/***/ 697:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"홈 화면에 추가","Add To Dock":"Dock에 추가","An icon will be added to your Dock so you can quickly access this website.":"이 웹사이트에 빠르게 액세스할 수 있도록 Dock에 아이콘이 추가됩니다.","An icon will be added to your home screen so you can quickly access this website.":"이 웹사이트에 빠르게 액세스할 수 있도록 홈 화면에 아이콘이 추가됩니다.","An icon will be added to your Taskbar so you can quickly access this website.":"이 웹사이트에 빠르게 액세스할 수 있도록 작업 표시줄에 아이콘이 추가됩니다.","Install":"설치","Install %s":"%s 설치","Install app":"앱 설치","Later":"나중에","Open in browser":"브라우저에서 열기","Select %s from the menu that pops up.":"팝업 메뉴에서 %s을(를) 선택하세요.","Tap %s":"%s을(를) 탭하세요","Tap %s in the browser bar.":"브라우저 바에서 %s을(를) 탭하세요.","Tap %s in the toolbar.":"도구 모음에서 %s을(를) 탭하세요.","Tap the %s button above.":"위의 %s 버튼을 탭하세요.","Tap the %s button below to open your system browser.":"아래의 %s 버튼을 탭하여 시스템 브라우저를 여세요.","Tap the %s button in the toolbar.":"도구 모음에서 %s 버튼을 탭하세요.","Tap the %s button in the upper right corner.":"오른쪽 상단 모서리에서 %s 버튼을 탭하세요.","You may need to scroll down to find this menu item.":"이 메뉴 항목을 찾으려면 아래로 스크롤해야 할 수도 있습니다."}');

/***/ }),

/***/ 71:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Pievienot sākuma ekrānam","Add To Dock":"Pievienot Dock","An icon will be added to your Dock so you can quickly access this website.":"Ikona tiks pievienota jūsu Dock, lai jūs varētu ātri piekļūt šai vietnei.","An icon will be added to your home screen so you can quickly access this website.":"Ikona tiks pievienota jūsu sākuma ekrānam, lai jūs varētu ātri piekļūt šai vietnei.","An icon will be added to your Taskbar so you can quickly access this website.":"Ikona tiks pievienota jūsu uzdevumjoslai, lai jūs varētu ātri piekļūt šai vietnei.","Install":"Instalēt","Install %s":"Instalēt %s","Install app":"Instalēt lietotni","Later":"Vēlāk","Open in browser":"Atvērt pārlūkā","Select %s from the menu that pops up.":"Izvēlieties %s no uzlecošās izvēlnes.","Tap %s":"Pieskarieties %s","Tap %s in the browser bar.":"Pieskarieties %s pārlūka joslā.","Tap %s in the toolbar.":"Pieskarieties %s rīkjoslā.","Tap the %s button above.":"Pieskarieties pogai %s augstāk.","Tap the %s button below to open your system browser.":"Pieskarieties pogai %s zemāk, lai atvērtu sistēmas pārlūku.","Tap the %s button in the toolbar.":"Pieskarieties pogai %s rīkjoslā.","Tap the %s button in the upper right corner.":"Pieskarieties pogai %s augšējā labajā stūrī.","You may need to scroll down to find this menu item.":"Jums, iespējams, būs jāpārskrollē uz leju, lai atrastu šo izvēlnes vienumu."}');

/***/ }),

/***/ 55:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Toevoegen aan beginscherm","Add To Dock":"Toevoegen aan Dock","An icon will be added to your Dock so you can quickly access this website.":"Er wordt een pictogram toegevoegd aan je Dock, zodat je snel toegang hebt tot deze website.","An icon will be added to your home screen so you can quickly access this website.":"Er wordt een pictogram toegevoegd aan je beginscherm, zodat je snel toegang hebt tot deze website.","An icon will be added to your Taskbar so you can quickly access this website.":"Er wordt een pictogram toegevoegd aan je taakbalk, zodat je snel toegang hebt tot deze website.","Install":"Installeren","Install %s":"%s installeren","Install app":"App installeren","Later":"Later","Open in browser":"Openen in browser","Select %s from the menu that pops up.":"Selecteer %s in het menu dat verschijnt.","Tap %s":"Tik op %s","Tap %s in the browser bar.":"Tik op %s in de browserbalk.","Tap %s in the toolbar.":"Tik op %s in de werkbalk.","Tap the %s button above.":"Tik bovenaan op de knop %s.","Tap the %s button below to open your system browser.":"Tik onderaan op de knop %s om je systeembrowser te openen.","Tap the %s button in the toolbar.":"Tik op de knop %s in de werkbalk.","Tap the %s button in the upper right corner.":"Tik op de knop %s in de rechterbovenhoek.","You may need to scroll down to find this menu item.":"Je moet mogelijk naar beneden scrollen om dit menu-item te vinden."}');

/***/ }),

/***/ 143:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Dodaj do ekranu głównego","Add To Dock":"Dodaj do Docka","An icon will be added to your Dock so you can quickly access this website.":"Ikona zostanie dodana do Docka, abyś mógł szybko uzyskać dostęp do tej strony.","An icon will be added to your home screen so you can quickly access this website.":"Ikona zostanie dodana do ekranu głównego, abyś mógł szybko uzyskać dostęp do tej strony.","An icon will be added to your Taskbar so you can quickly access this website.":"Ikona zostanie dodana do paska zadań, abyś mógł szybko uzyskać dostęp do tej strony.","Install":"Zainstaluj","Install %s":"Zainstaluj %s","Install app":"Zainstaluj aplikację","Later":"Później","Open in browser":"Otwórz w przeglądarce","Select %s from the menu that pops up.":"Wybierz %s z wyświetlonego menu.","Tap %s":"Stuknij %s","Tap %s in the browser bar.":"Stuknij %s w pasku przeglądarki.","Tap %s in the toolbar.":"Stuknij %s na pasku narzędzi.","Tap the %s button above.":"Stuknij przycisk %s powyżej.","Tap the %s button below to open your system browser.":"Stuknij przycisk %s poniżej, aby otworzyć przeglądarkę systemową.","Tap the %s button in the toolbar.":"Stuknij przycisk %s na pasku narzędzi.","Tap the %s button in the upper right corner.":"Stuknij przycisk %s w prawym górnym rogu.","You may need to scroll down to find this menu item.":"Możesz musieć przewinąć w dół, aby znaleźć tę pozycję w menu."}');

/***/ }),

/***/ 898:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Adicionar à Tela de Inicio","Add To Dock":"Adicionar à Dock","An icon will be added to your Dock so you can quickly access this website.":"Um ícone será adicionado à sua Dock para que você possa acessar rapidamente este site.","An icon will be added to your home screen so you can quickly access this website.":"Um ícone será adicionado à sua tela inicial para que você possa acessar rapidamente este site.","An icon will be added to your Taskbar so you can quickly access this website.":"Um ícone será adicionado à sua barra de tarefas para que você possa acessar rapidamente este site.","Install":"Instalar","Install %s":"Instalar %s","Install app":"Instalar aplicativo","Later":"Mais tarde","Open in browser":"Abrir no navegador","Select %s from the menu that pops up.":"Selecione %s no menu que aparece.","Tap %s":"Toque em %s","Tap %s in the browser bar.":"Toque em %s na barra do navegador.","Tap %s in the toolbar.":"Toque em %s na barra de ferramentas.","Tap the %s button above.":"Toque no botão %s acima.","Tap the %s button below to open your system browser.":"Toque no botão %s abaixo para abrir o navegador do sistema.","Tap the %s button in the toolbar.":"Toque no botão %s na barra de ferramentas.","Tap the %s button in the upper right corner.":"Toque no botão %s no canto superior direito.","You may need to scroll down to find this menu item.":"Você pode precisar rolar para baixo para encontrar este item do menu."}');

/***/ }),

/***/ 672:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Добавить на главный экран","Add To Dock":"Добавить в док","An icon will be added to your Dock so you can quickly access this website.":"Значок будет добавлен в ваш док для быстрого доступа к этому веб-сайту.","An icon will be added to your home screen so you can quickly access this website.":"Значок будет добавлен на ваш главный экран для быстрого доступа к этому веб-сайту.","An icon will be added to your Taskbar so you can quickly access this website.":"Значок будет добавлен на вашу панель задач для быстрого доступа к этому веб-сайту.","Install":"Установить","Install %s":"Установить %s","Install app":"Установить приложение","Later":"Позже","Open in browser":"Открыть в браузере","Select %s from the menu that pops up.":"Выберите %s из появившегося меню.","Tap %s":"Нажмите %s","Tap %s in the browser bar.":"Нажмите %s в строке браузера.","Tap %s in the toolbar.":"Нажмите %s на панели инструментов.","Tap the %s button above.":"Нажмите кнопку %s выше.","Tap the %s button below to open your system browser.":"Нажмите кнопку %s ниже, чтобы открыть системный браузер.","Tap the %s button in the toolbar.":"Нажмите кнопку %s на панели инструментов.","Tap the %s button in the upper right corner.":"Нажмите кнопку %s в правом верхнем углу.","You may need to scroll down to find this menu item.":"Возможно, вам потребуется прокрутить вниз, чтобы найти этот пункт меню."}');

/***/ }),

/***/ 329:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Dodaj na začetni zaslon","Add To Dock":"Dodaj v Dock","An icon will be added to your Dock so you can quickly access this website.":"Da boste lahko hitro dostopali do te spletne strani, bo ikona dodana v Dock.","An icon will be added to your home screen so you can quickly access this website.":"Da boste lahko hitro dostopali do te spletne strani, bo ikona dodana na začetni zaslon.","An icon will be added to your Taskbar so you can quickly access this website.":"Da boste lahko hitro dostopali do te spletne strani, bo ikona dodana v opravilno vrstico.","Install":"Namesti","Install %s":"Namesti %s","Install app":"Namesti aplikacijo","Later":"Kasneje","Open in browser":"Odpri v brskalniku","Select %s from the menu that pops up.":"V pojavnem meniju izberite %s.","Tap %s":"Izberite %s","Tap %s in the browser bar.":"V vrstici brskalnika izberite %s.","Tap %s in the toolbar.":"V orodni vrstici izberite %s.","Tap the %s button above.":"Izberite zgornji gumb %s.","Tap the %s button below to open your system browser.":"Za odpiranje brskalnika izberite spodnji gumb %s.","Tap the %s button in the toolbar.":"V orodni vrstici izberite gumb %s.","Tap the %s button in the upper right corner.":"V zgornjem desnem kotu izberite gumb %s.","You may need to scroll down to find this menu item.":"Da boste našli ta element, se bo morda potrebno pomakniti navzdol."}');

/***/ }),

/***/ 244:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Lägg till på hemskärmen","Add To Dock":"Lägg till i Dock","An icon will be added to your Dock so you can quickly access this website.":"En ikon kommer att läggas till i din Dock så att du snabbt kan komma åt denna webbplats.","An icon will be added to your home screen so you can quickly access this website.":"En ikon kommer att läggas till på din hemskärm så att du snabbt kan komma åt denna webbplats.","An icon will be added to your Taskbar so you can quickly access this website.":"En ikon kommer att läggas till i din aktivitetsfält så att du snabbt kan komma åt denna webbplats.","Install":"Installera","Install %s":"Installera %s","Install app":"Installera app","Later":"Senare","Open in browser":"Öppna i webbläsare","Select %s from the menu that pops up.":"Välj %s från menyn som visas.","Tap %s":"Tryck på %s","Tap %s in the browser bar.":"Tryck på %s i webbläsarens fält.","Tap %s in the toolbar.":"Tryck på %s i verktygsfältet.","Tap the %s button above.":"Tryck på knappen %s ovan.","Tap the %s button below to open your system browser.":"Tryck på knappen %s nedan för att öppna din systemwebbläsare.","Tap the %s button in the toolbar.":"Tryck på knappen %s i verktygsfältet.","Tap the %s button in the upper right corner.":"Tryck på knappen %s i det övre högra hörnet.","You may need to scroll down to find this menu item.":"Du kan behöva rulla nedåt för att hitta det här menyobjektet."}');

/***/ }),

/***/ 9:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"เพิ่มลงในหน้าจอโฮม","Add To Dock":"เพิ่มลงใน Dock","An icon will be added to your Dock so you can quickly access this website.":"ไอคอนจะถูกเพิ่มลงใน Dock เพื่อให้คุณสามารถเข้าถึงเว็บไซต์นี้ได้อย่างรวดเร็ว","An icon will be added to your home screen so you can quickly access this website.":"ไอคอนจะถูกเพิ่มลงในหน้าจอโฮมเพื่อให้คุณสามารถเข้าถึงเว็บไซต์นี้ได้อย่างรวดเร็ว","An icon will be added to your Taskbar so you can quickly access this website.":"ไอคอนจะถูกเพิ่มลงในทาสก์บาร์เพื่อให้คุณสามารถเข้าถึงเว็บไซต์นี้ได้อย่างรวดเร็ว","Install":"ติดตั้ง","Install %s":"ติดตั้ง %s","Install app":"ติดตั้งแอป","Later":"ภายหลัง","Open in browser":"เปิดในเบราว์เซอร์","Select %s from the menu that pops up.":"เลือก %s จากเมนูที่แสดงขึ้น","Tap %s":"แตะ %s","Tap %s in the browser bar.":"แตะ %s ในแถบเบราว์เซอร์","Tap %s in the toolbar.":"แตะ %s ในแถบเครื่องมือ","Tap the %s button above.":"แตะปุ่ม %s ด้านบน","Tap the %s button below to open your system browser.":"แตะปุ่ม %s ด้านล่างเพื่อเปิดเบราว์เซอร์ของระบบ","Tap the %s button in the toolbar.":"แตะปุ่ม %s ในแถบเครื่องมือ","Tap the %s button in the upper right corner.":"แตะปุ่ม %s ที่มุมบนขวา","You may need to scroll down to find this menu item.":"คุณอาจจะต้องเลื่อนลงเพื่อค้นหารายการเมนูนี้"}');

/***/ }),

/***/ 827:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"Thêm vào màn hình chính","Add To Dock":"Thêm vào Dock","An icon will be added to your Dock so you can quickly access this website.":"Một biểu tượng sẽ được thêm vào Dock của bạn để nhanh chóng truy cập website này.","An icon will be added to your home screen so you can quickly access this website.":"Một biểu tượng sẽ được thêm vào màn hình chính của bạn để nhanh chóng truy cập website này.","An icon will be added to your Taskbar so you can quickly access this website.":"Một biểu tượng sẽ được thêm thanh tác vụ của bạn để nhanh chóng truy cập website này.","Install":"Cài đặt","Install app":"Cài đặt ứng dụng","Later":"Để sau","Open in browser":"Mở trong trình duyệt","Select %s from the menu that pops up.":"Chọn %s từ menu đã hiển thị.","Tap %s":"Bấm %s","Tap %s in the browser bar.":"Bấm %s tại thanh trình duyệt.","Tap %s in the toolbar.":"Bấm %s tại thanh công cụ.","Tap the %s button above.":"Bấm nút %s phía trên.","Tap the %s button below to open your system browser.":"Bấm nút %s phía dưới để mở trình duyệt từ hệ thống.","Tap the %s button in the toolbar.":"Bấm nút %s tại thanh công cụ.","Tap the %s button in the upper right corner.":"Bấm nút %s tại góc phía trên bên phải.","You may need to scroll down to find this menu item.":"Bạn có thể cần phải cuộn xuống để tìm mục này."}');

/***/ }),

/***/ 538:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"添加到主屏幕","Add To Dock":"添加到程序坞","An icon will be added to your Dock so you can quickly access this website.":"一个图标将被添加到你的程序坞，以便你可以快速访问这个网站。","An icon will be added to your home screen so you can quickly access this website.":"一个图标将被添加到你的主屏幕，以便你可以快速访问这个网站。","An icon will be added to your Taskbar so you can quickly access this website.":"一个图标将被添加到你的任务栏，以便你可以快速访问这个网站。","Install":"安装","Install %s":"安装 %s","Install app":"安装应用","Later":"稍后","Open in browser":"在浏览器中打开","Select %s from the menu that pops up.":"从弹出的菜单中选择 %s。","Tap %s":"点击 %s","Tap %s in the browser bar.":"在浏览器栏中点击 %s。","Tap %s in the toolbar.":"在工具栏中点击 %s。","Tap the %s button above.":"点击上面的 %s 按钮。","Tap the %s button below to open your system browser.":"点击下面的 %s 按钮以打开你的系统浏览器。","Tap the %s button in the toolbar.":"点击工具栏中的 %s 按钮。","Tap the %s button in the upper right corner.":"点击右上角的 %s 按钮。","You may need to scroll down to find this menu item.":"你可能需要向下滚动才能找到这个菜单项。"}');

/***/ }),

/***/ 662:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"添加到主屏幕","Add To Dock":"添加到程序坞","An icon will be added to your Dock so you can quickly access this website.":"一个图标将被添加到你的程序坞，以便你可以快速访问这个网站。","An icon will be added to your home screen so you can quickly access this website.":"一个图标将被添加到你的主屏幕，以便你可以快速访问这个网站。","An icon will be added to your Taskbar so you can quickly access this website.":"一个图标将被添加到你的任务栏，以便你可以快速访问这个网站。","Install":"安装","Install %s":"安装 %s","Install app":"安装应用","Later":"稍后","Open in browser":"在浏览器中打开","Select %s from the menu that pops up.":"从弹出的菜单中选择 %s。","Tap %s":"点击 %s","Tap %s in the browser bar.":"在浏览器栏中点击 %s。","Tap %s in the toolbar.":"在工具栏中点击 %s。","Tap the %s button above.":"点击上面的 %s 按钮。","Tap the %s button below to open your system browser.":"点击下面的 %s 按钮以打开你的系统浏览器。","Tap the %s button in the toolbar.":"点击工具栏中的 %s 按钮。","Tap the %s button in the upper right corner.":"点击右上角的 %s 按钮。","You may need to scroll down to find this menu item.":"你可能需要向下滚动才能找到这个菜单项。"}');

/***/ }),

/***/ 295:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"加入主畫面","Add To Dock":"加入程序塢","An icon will be added to your Dock so you can quickly access this website.":"一個圖示將被加入你的程序塢，以便你可以快速存取這個網站。","An icon will be added to your home screen so you can quickly access this website.":"一個圖示將被加入你的主畫面，以便你可以快速存取這個網站。","An icon will be added to your Taskbar so you can quickly access this website.":"一個圖示將被加入你的工作列，以便你可以快速存取這個網站。","Install":"安裝","Install %s":"安裝 %s","Install app":"安裝應用程式","Later":"稍後","Open in browser":"在瀏覽器中打開","Select %s from the menu that pops up.":"從彈出的選單中選擇 %s。","Tap %s":"點擊 %s","Tap %s in the browser bar.":"在瀏覽器欄中點擊 %s。","Tap %s in the toolbar.":"在工具列中點擊 %s。","Tap the %s button above.":"點擊上面的 %s 按鈕。","Tap the %s button below to open your system browser.":"點擊下面的 %s 按鈕以打開你的系統瀏覽器。","Tap the %s button in the toolbar.":"點擊工具列中的 %s 按鈕。","Tap the %s button in the upper right corner.":"點擊右上角的 %s 按鈕。","You may need to scroll down to find this menu item.":"你可能需要向下捲動才能找到這個菜單項目。"}');

/***/ }),

/***/ 511:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"加入主畫面","Add To Dock":"加入 Dock","An icon will be added to your Dock so you can quickly access this website.":"一個圖示將被加入你的 Dock，以便你可以快速存取這個網站。","An icon will be added to your home screen so you can quickly access this website.":"一個圖示將被加入你的主畫面，以便你可以快速存取這個網站。","An icon will be added to your Taskbar so you can quickly access this website.":"一個圖示將被加入你的工作列，以便你可以快速存取這個網站。","Install":"安裝","Install %s":"安裝 %s","Install app":"安裝應用程式","Later":"稍後","Open in browser":"在瀏覽器中開啟","Select %s from the menu that pops up.":"從跳出的選單中選擇 %s。","Tap %s":"點擊 %s","Tap %s in the browser bar.":"在瀏覽器列中點擊 %s。","Tap %s in the toolbar.":"在工具列中點擊 %s。","Tap the %s button above.":"點擊上面的 %s 按鈕。","Tap the %s button below to open your system browser.":"點擊下面的 %s 按鈕以開啟你的系統瀏覽器。","Tap the %s button in the toolbar.":"點擊工具列中的 %s 按鈕。","Tap the %s button in the upper right corner.":"點擊右上角的 %s 按鈕。","You may need to scroll down to find this menu item.":"你可能需要向下捲動才能找到這個選單項目。"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const { AddToHomeScreen } = __webpack_require__(607);
window.AddToHomeScreen = AddToHomeScreen;

})();

/******/ })()
;