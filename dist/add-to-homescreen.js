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
    let { appIconUrl, appName, appNameDisplay, assetUrl, maxModalDisplayCount } = options;
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
        if (!locale) {
            // If we have 'en', then use it. If just a single non 'en' locale
            // is included in the localeCatalog, default to that one.
            if (localeCatalog["en"]) {
                locale = "en";
            }
            else {
                locale = Object.keys(localeCatalog)[0];
            }
        }
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
        else if (isDeviceIOS() || isDeviceAndroid()) {
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
                else if (isBrowserIOSInAppFacebook() || isBrowserIOSInAppLinkedin()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserOpenInSystemBrowser(container);
                }
                else if (isBrowserIOSInAppInstagram() ||
                    isBrowserIOSInAppThreads() ||
                    isBrowserIOSInAppTwitter()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserOpenInSafariBrowser(container);
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
                else if (isBrowserAndroidFacebook()) {
                    ret = new types_1.DeviceInfo((_isStandAlone = false), (_canBeStandAlone = false), (_device = _device));
                    _genIOSInAppBrowserOpenInSystemBrowser(container);
                }
                else {
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
        return ret;
    }
    function closeModal() {
        // close the modal if the user clicks outside of the modal contents
        const container = document.querySelector(".adhs-container");
        if (container) {
            container.classList.remove("visible");
            setTimeout(() => {
                container.remove();
                if (closeEventListener) {
                    window.removeEventListener("touchstart", closeEventListener);
                    window.removeEventListener("click", closeEventListener);
                    closeEventListener = null;
                }
            }, 
            // If the dialog is hidden in 300ms in Safari, the browser reports a second
            // click event on an underlying DOM node. If you wait a bit longer this
            // does not happen
            isDeviceIOS() ? 500 : 300);
        }
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
        return !!(userAgent.match(/Macintosh/) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1);
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
            !isBrowserAndroidSamsung() &&
            !isBrowserAndroidFirefox());
    }
    /*Mozilla/5.0 (Linux; Android 12; SM-S908U1 Build/SP1A.210812.016; wv)
      AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.88
      Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/377.0.0.22.107;]*/
    function isBrowserAndroidFacebook() {
        return isDeviceAndroid() && _matchesUserAgent(/FBAN|FBAV/);
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
            return (`
        ${div("list-button")}
          <img class="adhs-list-button-image-only" src="` +
                imageUrl +
                `" />
      </div>`);
        }
        else if (image_side === "right") {
            return (`
        ${div("list-button")}
        ${div("list-button-text")}
        ${text}
        </div>
        <img class="adhs-list-button-image-right" src="` +
                imageUrl +
                `" />
      </div>`);
        }
        else if (image_side === "left") {
            return (`
        ${div("list-button")}
        <img class="adhs-list-button-image-left" src="` +
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
    function _genIOSInAppBrowserOpenInSystemBrowser(container) {
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
    function _genIOSInAppBrowserOpenInSafariBrowser(container) {
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
            if (!modal.contains(e.target)) {
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
    let _desktopInstallPromptEvent = null;
    let _desktopInstallPromptWasShown = false;
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
        // if the prompt has not fired, wait for it the be fired, then show the promotion
        if (!_desktopInstallPromptEventHasFired()) {
            // debugMessage("SHOW DESKTOP CHROME PROMOTION: PROMPT NOT FIRED");
            setTimeout(() => {
                showDesktopInstallPrompt();
            }, 500);
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
    setLocale: (locale) => {
        if (false) {}
        directory = config.staticCatalog[locale];
    },
    __: (key, input) => {
        if (key.indexOf(PLACEHOLDER) < 0) {
            return directory[key] || key;
        }
        // Need to do a string replacement
        if (false) {}
        const parts = key.split(PLACEHOLDER);
        return parts[0] + input + parts[1];
    },
};
exports["default"] = SimpleI18n;


/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceInfo = exports.DeviceType = void 0;
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


/***/ }),

/***/ 182:
/***/ ((module) => {

module.exports = {
  LOCALES: [
    "da",
    "de",
    "en",
    "es",
    "fr",
    "he",
    "it",
    "pt",
    "ru",
    "cs",
    "ko",
    "lv",
    "pl",
    "vn",
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
	"./cs.json": 789,
	"./da.json": 638,
	"./de.json": 929,
	"./en.json": 790,
	"./es.json": 563,
	"./fr.json": 844,
	"./he.json": 818,
	"./it.json": 504,
	"./ko.json": 697,
	"./lv.json": 71,
	"./pl.json": 143,
	"./pt.json": 898,
	"./ru.json": 672,
	"./vn.json": 827,
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

/***/ 789:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Přidat na plochu","k2":"Přidat do Docku","k3":"Ikona bude přidána do vašeho Docku, abyste měli rychlý přístup k této webové stránce.","k4":"Ikona bude přidána na vaši domovskou obrazovku, abyste měli rychlý přístup k této webové stránce.","k5":"Ikona bude přidána na váš panel úloh, abyste měli rychlý přístup k této webové stránce.","k6":"Instalovat","k7":"Instalovat %s","k8":"Instalovat aplikaci","k9":"Později","k10":"Otevřít v prohlížeči","k11":"Vyberte %s z nabídky, která se zobrazí.","k12":"Klepněte na %s","k13":"Klepněte na %s v panelu prohlížeče.","k14":"Klepněte na %s v panelu nástrojů.","k15":"Klepněte na tlačítko %s výše.","k16":"Klepněte na tlačítko %s níže pro otevření systémového prohlížeče.","k17":"Klepněte na tlačítko %s v panelu nástrojů.","k18":"Klepněte na tlačítko %s v pravém horním rohu.","k19":"Možná budete muset posunout dolů, abyste tuto položku nabídky našli."}');

/***/ }),

/***/ 638:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Tilføj til startskærm","k2":"Tilføj til dock","k3":"Et ikon vil blive tilføjet til din dock, så du hurtigt kan få adgang til dette website.","k4":"Et ikon vil blive tilføjet til din startskærm, så du hurtigt kan få adgang til dette website.","k5":"Et ikon vil blive tilføjet til din proceslinje, så du hurtigt kan få adgang til dette website.","k6":"Installer","k7":"Installer %s","k8":"Installer app","k9":"Senere","k10":"Åbn i browser","k11":"Vælg %s fra menuen, der dukker op.","k12":"Tryk på %s","k13":"Tryk på %s i browserlinjen.","k14":"Tryk på %s i værktøjslinjen.","k15":"Tryk på %s-knappen ovenfor.","k16":"Tryk på %s-knappen nedenfor for at åbne din systembrowser.","k17":"Tryk på %s-knappen i værktøjslinjen.","k18":"Tryk på %s-knappen i øverste højre hjørne.","k19":"Du skal måske rulle ned for at finde dette menupunkt."}');

/***/ }),

/***/ 929:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Zum Home-Bildschirm","k2":"Zum Dock hinzufügen","k3":"Ein Symbol wird zu Ihrem Dock hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","k4":"Ein Symbol wird zu Ihrem Startbildschirm hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","k5":"Ein Symbol wird zu Ihrer Taskleiste hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","k6":"Installieren","k7":"%s installieren","k8":"App installieren","k9":"Später","k10":"Im Browser öffnen","k11":"Wählen Sie %s aus dem Menü, das erscheint.","k12":"Tippen Sie auf %s","k13":"Tippen Sie auf %s in der Browserleiste.","k14":"Tippen Sie auf %s in der Symbolleiste.","k15":"Tippen Sie oben auf die Schaltfläche %s.","k16":"Tippen Sie unten auf die Schaltfläche %s, um Ihren Systembrowser zu öffnen.","k17":"Tippen Sie auf die Schaltfläche %s in der Symbolleiste.","k18":"Tippen Sie auf die Schaltfläche %s in der oberen rechten Ecke.","k19":"Sie müssen möglicherweise nach unten scrollen, um diesen Menüpunkt zu finden."}');

/***/ }),

/***/ 790:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Add to Home Screen","k2":"Add To Dock","k3":"An icon will be added to your Dock so you can quickly access this website.","k4":"An icon will be added to your home screen so you can quickly access this website.","k5":"An icon will be added to your Taskbar so you can quickly access this website.","k6":"Install","k7":"Install %s","k8":"Install app","k9":"Later","k10":"Open in browser","k11":"Select %s from the menu that pops up.","k12":"Tap %s","k13":"Tap %s in the browser bar.","k14":"Tap %s in the toolbar.","k15":"Tap the %s button above.","k16":"Tap the %s button below to open your system browser.","k17":"Tap the %s button in the toolbar.","k18":"Tap the %s button in the upper right corner.","k19":"You may need to scroll down to find this menu item."}');

/***/ }),

/***/ 563:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Agregar a Inicio","k2":"Añadir al Dock","k3":"Se añadirá un icono a tu Dock para que puedas acceder rápidamente a este sitio web.","k4":"Se añadirá un icono a tu pantalla de inicio para que puedas acceder rápidamente a este sitio web.","k5":"Se añadirá un icono a tu barra de tareas para que puedas acceder rápidamente a este sitio web.","k6":"Instalar","k7":"Instalar %s","k8":"Instalar aplicación","k9":"Más tarde","k10":"Abrir en el navegador","k11":"Selecciona %s del menú emergente.","k12":"Toca %s","k13":"Toca %s en la barra del navegador.","k14":"Toca %s en la barra de herramientas.","k15":"Toca el botón %s de arriba.","k16":"Toca el botón %s de abajo para abrir el navegador de tu sistema.","k17":"Toca el botón %s en la barra de herramientas.","k18":"Toca el botón %s en la esquina superior derecha.","k19":"Es posible que necesites desplazarte hacia abajo para encontrar este elemento del menú."}');

/***/ }),

/***/ 844:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Sur l\'écran d\'accueil","k2":"Ajouter au Dock","k3":"Une icône sera ajoutée à votre Dock pour accéder rapidement à ce site web.","k4":"Une icône sera ajoutée à votre écran d\'accueil pour accéder rapidement à ce site web.","k5":"Une icône sera ajoutée à votre barre des tâches pour accéder rapidement à ce site web.","k6":"Installer","k7":"Installer %s","k8":"Installer l\'application","k9":"Plus tard","k10":"Ouvrir dans le navigateur","k11":"Sélectionnez %s dans le menu qui apparaît.","k12":"Appuyez sur %s","k13":"Appuyez sur %s dans la barre du navigateur.","k14":"Appuyez sur %s dans la barre d\'outils.","k15":"Appuyez sur le bouton %s ci-dessus.","k16":"Appuyez sur le bouton %s ci-dessous pour ouvrir votre navigateur système.","k17":"Appuyez sur le bouton %s dans la barre d\'outils.","k18":"Appuyez sur le bouton %s dans le coin supérieur droit.","k19":"Vous devrez peut-être faire défiler vers le bas pour trouver cet élément du menu."}');

/***/ }),

/***/ 818:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"הוסף למסך הבית","k2":"הוסף לדוק","k3":"אייקון יתווסף לדוק שלך כדי שתוכל לגשת במהירות לאתר זה.","k4":"אייקון יתווסף למסך הבית שלך כדי שתוכל לגשת במהירות לאתר זה.","k5":"אייקון יתווסף לשורת המשימות שלך כדי שתוכל לגשת במהירות לאתר זה.","k6":"התקן","k7":"התקן %s","k8":"התקן אפלקציה","k9":"מאוחר יותר","k10":"פתח בדפדפן","k11":"בחר ב %s מהתפריט שנפתח.","k12":"לחץ על %s","k13":"לחץ על %s בשורת הדפדפן.","k14":"לחץ על %s בסרגל הכלים.","k15":"לחץ על הכפתור %s למעלה.","k16":"לחץ על הכפתור %s למטה כדי לפתוח את דפדפן המערכת שלך.","k17":"לחץ על הכפתור %s בסרגל הכלים.","k18":"לחץ על הכפתור %s בפינה הימנית העליונה.","k19":"יתכן שתצטרך לגלול למטה כדי למצוא פריט זה בתפריט."}');

/***/ }),

/***/ 504:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Aggiungi alla schermata Home","k2":"Aggiungi al Dock","k3":"Un\'icona verrà aggiunta al tuo Dock per accedere rapidamente a questo sito web.","k4":"Un\'icona verrà aggiunta alla tua schermata Home per accedere rapidamente a questo sito web.","k5":"Un\'icona verrà aggiunta alla tua barra delle applicazioni per accedere rapidamente a questo sito web.","k6":"Installa","k7":"Installa %s","k8":"Installa app","k9":"Più tardi","k10":"Apri nel browser","k11":"Seleziona %s dal menu che appare.","k12":"Tocca %s","k13":"Tocca %s nella barra del browser.","k14":"Tocca %s nella barra degli strumenti.","k15":"Tocca il pulsante %s sopra.","k16":"Tocca il pulsante %s sotto per aprire il browser di sistema.","k17":"Tocca il pulsante %s nella barra degli strumenti.","k18":"Tocca il pulsante %s nell\'angolo in alto a destra.","k19":"Potrebbe essere necessario scorrere verso il basso per trovare questa voce di menu."}');

/***/ }),

/***/ 697:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"홈 화면에 추가","k2":"Dock에 추가","k3":"이 웹사이트에 빠르게 액세스할 수 있도록 Dock에 아이콘이 추가됩니다.","k4":"이 웹사이트에 빠르게 액세스할 수 있도록 홈 화면에 아이콘이 추가됩니다.","k5":"이 웹사이트에 빠르게 액세스할 수 있도록 작업 표시줄에 아이콘이 추가됩니다.","k6":"설치","k7":"%s 설치","k8":"앱 설치","k9":"나중에","k10":"브라우저에서 열기","k11":"팝업 메뉴에서 %s을(를) 선택하세요.","k12":"%s을(를) 탭하세요","k13":"브라우저 바에서 %s을(를) 탭하세요.","k14":"도구 모음에서 %s을(를) 탭하세요.","k15":"위의 %s 버튼을 탭하세요.","k16":"아래의 %s 버튼을 탭하여 시스템 브라우저를 여세요.","k17":"도구 모음에서 %s 버튼을 탭하세요.","k18":"오른쪽 상단 모서리에서 %s 버튼을 탭하세요.","k19":"이 메뉴 항목을 찾으려면 아래로 스크롤해야 할 수도 있습니다."}');

/***/ }),

/***/ 71:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Pievienot sākuma ekrānam","k2":"Pievienot Dock","k3":"Ikona tiks pievienota jūsu Dock, lai jūs varētu ātri piekļūt šai vietnei.","k4":"Ikona tiks pievienota jūsu sākuma ekrānam, lai jūs varētu ātri piekļūt šai vietnei.","k5":"Ikona tiks pievienota jūsu uzdevumjoslai, lai jūs varētu ātri piekļūt šai vietnei.","k6":"Instalēt","k7":"Instalēt %s","k8":"Instalēt lietotni","k9":"Vēlāk","k10":"Atvērt pārlūkā","k11":"Izvēlieties %s no uzlecošās izvēlnes.","k12":"Pieskarieties %s","k13":"Pieskarieties %s pārlūka joslā.","k14":"Pieskarieties %s rīkjoslā.","k15":"Pieskarieties pogai %s augstāk.","k16":"Pieskarieties pogai %s zemāk, lai atvērtu sistēmas pārlūku.","k17":"Pieskarieties pogai %s rīkjoslā.","k18":"Pieskarieties pogai %s augšējā labajā stūrī.","k19":"Jums, iespējams, būs jāpārskrollē uz leju, lai atrastu šo izvēlnes vienumu."}');

/***/ }),

/***/ 143:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Dodaj do ekranu głównego","k2":"Dodaj do Docka","k3":"Ikona zostanie dodana do Docka, abyś mógł szybko uzyskać dostęp do tej strony.","k4":"Ikona zostanie dodana do ekranu głównego, abyś mógł szybko uzyskać dostęp do tej strony.","k5":"Ikona zostanie dodana do paska zadań, abyś mógł szybko uzyskać dostęp do tej strony.","k6":"Zainstaluj","k7":"Zainstaluj %s","k8":"Zainstaluj aplikację","k9":"Później","k10":"Otwórz w przeglądarce","k11":"Wybierz %s z wyświetlonego menu.","k12":"Stuknij %s","k13":"Stuknij %s w pasku przeglądarki.","k14":"Stuknij %s na pasku narzędzi.","k15":"Stuknij przycisk %s powyżej.","k16":"Stuknij przycisk %s poniżej, aby otworzyć przeglądarkę systemową.","k17":"Stuknij przycisk %s na pasku narzędzi.","k18":"Stuknij przycisk %s w prawym górnym rogu.","k19":"Możesz musieć przewinąć w dół, aby znaleźć tę pozycję w menu."}');

/***/ }),

/***/ 898:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Adicionar à Tela de Inicio","k2":"Adicionar à Dock","k3":"Um ícone será adicionado à sua Dock para que você possa acessar rapidamente este site.","k4":"Um ícone será adicionado à sua tela inicial para que você possa acessar rapidamente este site.","k5":"Um ícone será adicionado à sua barra de tarefas para que você possa acessar rapidamente este site.","k6":"Instalar","k7":"Instalar %s","k8":"Instalar aplicativo","k9":"Mais tarde","k10":"Abrir no navegador","k11":"Selecione %s no menu que aparece.","k12":"Toque em %s","k13":"Toque em %s na barra do navegador.","k14":"Toque em %s na barra de ferramentas.","k15":"Toque no botão %s acima.","k16":"Toque no botão %s abaixo para abrir o navegador do sistema.","k17":"Toque no botão %s na barra de ferramentas.","k18":"Toque no botão %s no canto superior direito.","k19":"Você pode precisar rolar para baixo para encontrar este item do menu."}');

/***/ }),

/***/ 672:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Добавить на главный экран","k2":"Добавить в док","k3":"Значок будет добавлен в ваш док для быстрого доступа к этому веб-сайту.","k4":"Значок будет добавлен на ваш главный экран для быстрого доступа к этому веб-сайту.","k5":"Значок будет добавлен на вашу панель задач для быстрого доступа к этому веб-сайту.","k6":"Установить","k7":"Установить %s","k8":"Установить приложение","k9":"Позже","k10":"Открыть в браузере","k11":"Выберите %s из появившегося меню.","k12":"Нажмите %s","k13":"Нажмите %s в строке браузера.","k14":"Нажмите %s на панели инструментов.","k15":"Нажмите кнопку %s выше.","k16":"Нажмите кнопку %s ниже, чтобы открыть системный браузер.","k17":"Нажмите кнопку %s на панели инструментов.","k18":"Нажмите кнопку %s в правом верхнем углу.","k19":"Возможно, вам потребуется прокрутить вниз, чтобы найти этот пункт меню."}');

/***/ }),

/***/ 827:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"Thêm vào màn hình chính","k2":"Thêm vào Dock","k3":"Một biểu tượng sẽ được thêm vào Dock của bạn để nhanh chóng truy cập website này.","k4":"Một biểu tượng sẽ được thêm vào màn hình chính của bạn để nhanh chóng truy cập website này.","k5":"Một biểu tượng sẽ được thêm thanh tác vụ của bạn để nhanh chóng truy cập website này.","k6":"Cài đặt","k8":"Cài đặt ứng dụng","k9":"Để sau","k10":"Mở trong trình duyệt","k11":"Chọn %s từ menu đã hiển thị.","k12":"Bấm %s","k13":"Bấm %s tại thanh trình duyệt.","k14":"Bấm %s tại thanh công cụ.","k15":"Bấm nút %s phía trên.","k16":"Bấm nút %s phía dưới để mở trình duyệt từ hệ thống.","k17":"Bấm nút %s tại thanh công cụ.","k18":"Bấm nút %s tại góc phía trên bên phải.","k19":"Bạn có thể cần phải cuộn xuống để tìm mục này."}');

/***/ }),

/***/ 662:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"添加到主屏幕","k2":"添加到程序坞","k3":"一个图标将被添加到你的程序坞，以便你可以快速访问这个网站。","k4":"一个图标将被添加到你的主屏幕，以便你可以快速访问这个网站。","k5":"一个图标将被添加到你的任务栏，以便你可以快速访问这个网站。","k6":"安装","k7":"安装 %s","k8":"安装应用","k9":"稍后","k10":"在浏览器中打开","k11":"从弹出的菜单中选择 %s。","k12":"点击 %s","k13":"在浏览器栏中点击 %s。","k14":"在工具栏中点击 %s。","k15":"点击上面的 %s 按钮。","k16":"点击下面的 %s 按钮以打开你的系统浏览器。","k17":"点击工具栏中的 %s 按钮。","k18":"点击右上角的 %s 按钮。","k19":"你可能需要向下滚动才能找到这个菜单项。"}');

/***/ }),

/***/ 295:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"加入主畫面","k2":"加入程序塢","k3":"一個圖示將被加入你的程序塢，以便你可以快速存取這個網站。","k4":"一個圖示將被加入你的主畫面，以便你可以快速存取這個網站。","k5":"一個圖示將被加入你的工作列，以便你可以快速存取這個網站。","k6":"安裝","k7":"安裝 %s","k8":"安裝應用程式","k9":"稍後","k10":"在瀏覽器中打開","k11":"從彈出的選單中選擇 %s。","k12":"點擊 %s","k13":"在瀏覽器欄中點擊 %s。","k14":"在工具列中點擊 %s。","k15":"點擊上面的 %s 按鈕。","k16":"點擊下面的 %s 按鈕以打開你的系統瀏覽器。","k17":"點擊工具列中的 %s 按鈕。","k18":"點擊右上角的 %s 按鈕。","k19":"你可能需要向下捲動才能找到這個菜單項目。"}');

/***/ }),

/***/ 511:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"k1":"加入主畫面","k2":"加入 Dock","k3":"一個圖示將被加入你的 Dock，以便你可以快速存取這個網站。","k4":"一個圖示將被加入你的主畫面，以便你可以快速存取這個網站。","k5":"一個圖示將被加入你的工作列，以便你可以快速存取這個網站。","k6":"安裝","k7":"安裝 %s","k8":"安裝應用程式","k9":"稍後","k10":"在瀏覽器中開啟","k11":"從跳出的選單中選擇 %s。","k12":"點擊 %s","k13":"在瀏覽器列中點擊 %s。","k14":"在工具列中點擊 %s。","k15":"點擊上面的 %s 按鈕。","k16":"點擊下面的 %s 按鈕以開啟你的系統瀏覽器。","k17":"點擊工具列中的 %s 按鈕。","k18":"點擊右上角的 %s 按鈕。","k19":"你可能需要向下捲動才能找到這個選單項目。"}');

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