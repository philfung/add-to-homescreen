/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://add-to-homescreen/./src/styles.css?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
<<<<<<< HEAD
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AddToHomeScreen = AddToHomeScreen;\n__webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\nconst types_1 = __webpack_require__(/*! ./types */ \"./src/types.ts\");\nconst config = __webpack_require__(/*! ./config */ \"./src/config.js\");\nconst LOCALES = config.LOCALES;\n// Add list of RTL languages\nconst RTL_LOCALES = ['ar', 'fa', 'he', 'ur'];\n// Configure I18n\nconst simpleI18n_1 = __importDefault(__webpack_require__(/*! ./simpleI18n */ \"./src/simpleI18n.ts\"));\nconst localeCatalog = {};\nLOCALES.forEach((locale) => {\n    localeCatalog[locale] = __webpack_require__(\"./src/locales sync recursive ^\\\\.\\\\/.*\\\\.json$\")(\"./\" + locale + \".json\");\n});\nsimpleI18n_1.default.configure({\n    locales: LOCALES,\n    staticCatalog: localeCatalog,\n    directory: \".\",\n});\nfunction AddToHomeScreen(options) {\n    let { appIconUrl, appName, appNameDisplay, assetUrl, maxModalDisplayCount } = options;\n    let closeEventListener = null;\n    let currentLocale = 'en';\n    let browserRTL = false;\n    const userAgent = window.navigator.userAgent;\n    _assertArg(\"appName\", typeof appName === \"string\" && appName.length > 0);\n    _assertArg(\"appIconUrl\", typeof appIconUrl === \"string\" && appIconUrl.length > 0);\n    _assertArg(\"assetUrl\", typeof assetUrl === \"string\" && assetUrl.length > 0);\n    maxModalDisplayCount = maxModalDisplayCount === undefined ? -1 : maxModalDisplayCount;\n    _assertArg(\"maxModalDisplayCount\", Number.isInteger(maxModalDisplayCount));\n    closeEventListener = null;\n    // Check if current locale is RTL\n    function isRTL() {\n        return RTL_LOCALES.includes(currentLocale);\n    }\n    function isBrowserRTL() {\n        // return RTL_LOCALES.includes(currentLocale);\n        return browserRTL;\n    }\n    function show(locale, rtl) {\n        currentLocale = locale;\n        browserRTL = rtl;\n        if (!locale) {\n            if (localeCatalog[\"en\"]) {\n                locale = \"en\";\n            }\n            else {\n                locale = Object.keys(localeCatalog)[0];\n            }\n        }\n        simpleI18n_1.default.setLocale(locale);\n        // Initialize device info\n        let _device;\n        if (isDeviceIOS()) {\n            _device = types_1.DeviceType.IOS;\n        }\n        else if (isDeviceAndroid()) {\n            _device = types_1.DeviceType.ANDROID;\n        }\n        else {\n            _device = types_1.DeviceType.DESKTOP;\n        }\n        // Handle standalone check\n        if (isStandAlone()) {\n            return new types_1.DeviceInfo(true, true, _device);\n        }\n        // Handle max modal display count\n        if (_hasReachedMaxModalDisplayCount()) {\n            return new types_1.DeviceInfo(false, false, _device);\n        }\n        // Create container with RTL support\n        const container = _createContainer(false);\n        if (isRTL()) {\n            container.classList.add('adhs-rtl');\n        }\n        // Generate appropriate content based on device/browser\n        let ret;\n        let shouldShowModal = true;\n        if (isDeviceIOS() || isDeviceAndroid()) {\n            _incrModalDisplayCount();\n            if (isDeviceIOS()) {\n                if (isBrowserIOSSafari()) {\n                    ret = new types_1.DeviceInfo(false, true, _device);\n                    _genIOSSafari(container);\n                }\n                else if (isBrowserIOSChrome()) {\n                    ret = new types_1.DeviceInfo(false, true, _device);\n                    _genIOSChrome(container);\n                }\n                else if (isBrowserIOSInAppFacebook() || isBrowserIOSInAppLinkedin()) {\n                    ret = new types_1.DeviceInfo(false, false, _device);\n                    _genIOSInAppBrowserOpenInSystemBrowser(container);\n                }\n                else if (isBrowserIOSInAppInstagram() || isBrowserIOSInAppThreads() || isBrowserIOSInAppTwitter()) {\n                    ret = new types_1.DeviceInfo(false, false, _device);\n                    _genIOSInAppBrowserOpenInSafariBrowser(container);\n                }\n                else {\n                    ret = new types_1.DeviceInfo(false, false, _device);\n                    shouldShowModal = false;\n                }\n            }\n            else {\n                if (isBrowserAndroidChrome()) {\n                    ret = new types_1.DeviceInfo(false, true, _device);\n                    _genAndroidChrome(container);\n                }\n                else if (isBrowserAndroidFacebook()) {\n                    ret = new types_1.DeviceInfo(false, false, _device);\n                    _genIOSInAppBrowserOpenInSystemBrowser(container);\n                }\n                else {\n                    ret = new types_1.DeviceInfo(false, false, _device);\n                    shouldShowModal = false;\n                }\n            }\n            if (shouldShowModal) {\n                _addContainerToBody(container);\n            }\n        }\n        else {\n            ret = new types_1.DeviceInfo(false, false, _device);\n            if (isDesktopChrome() || isDesktopEdge()) {\n                _incrModalDisplayCount();\n                showDesktopInstallPrompt();\n            }\n            else if (isDesktopSafari()) {\n                _incrModalDisplayCount();\n                _showDesktopSafariPrompt();\n            }\n        }\n        return ret;\n    }\n    function showDesktopInstallPrompt() {\n        debugMessage(\"SHOW DESKTOP CHROME / EDGE PROMOTION\");\n        if (_desktopInstallPromptWasShown) {\n            return;\n        }\n        // if the prompt has not fired, wait for it to be fired, then show the promotion\n        if (!_desktopInstallPromptEventHasFired()) {\n            setTimeout(() => {\n                showDesktopInstallPrompt();\n            }, 500);\n            return;\n        }\n        _desktopInstallPromptWasShown = true;\n        var container = _createContainer(true); // include_modal\n        _genDesktopChrome(container);\n        _addContainerToBody(container);\n    }\n    function _showDesktopSafariPrompt() {\n        debugMessage(\"SHOW SAFARI DESKTOP PROMPT\");\n        var container = _createContainer(true); // include_modal\n        _genDesktopSafari(container);\n        _addContainerToBody(container);\n    }\n    // Fixed _genListButtonWithImage with proper RTL support\n    function _genListButtonWithImage(imageUrl, text = \"\", image_side = \"none\") {\n        if (!text) {\n            return `\n        ${div(\"list-button\")}\n          <img class=\"adhs-list-button-image-only${isRTL() ? \" rtl\" : \"\"}\" src=\"${imageUrl}\" />\n        </div>`;\n        }\n        const effectiveImageSide = isRTL() ?\n            (image_side === \"left\" ? \"right\" : \"left\") :\n            image_side;\n        const imageClass = `adhs-list-button-image-${effectiveImageSide}${isRTL() ? \" rtl\" : \"\"}`;\n        const buttonContent = effectiveImageSide === \"right\"\n            ? `${div(\"list-button-text\")}${text}</div><img class=\"${imageClass}\" src=\"${imageUrl}\" />`\n            : `<img class=\"${imageClass}\" src=\"${imageUrl}\" />${div(\"list-button-text\")}${text}</div>`;\n        return `${div(\"list-button\")}${buttonContent}</div>`;\n    }\n    // Fixed browser-specific generators with RTL support\n    function _genIOSSafari(container) {\n        const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';\n        const sharingButton = _genListButtonWithImage(_genAssetUrl(\"ios-safari-sharing-api-button-2.svg\"));\n        const addToHomeButton = _genListButtonWithImage(_genAssetUrl(\"ios-safari-add-to-home-screen-button-2.svg\"), simpleI18n_1.default.__(\"Add to Home Screen\"), isRTL() ? \"left\" : \"right\");\n        const containerInnerHTML = _genModalStart() +\n            _genInstallAppHeader() +\n            _genAppNameHeader() +\n            _genListStart() +\n            _genListItem(`1`, simpleI18n_1.default.__(\"Tap the %s button in the toolbar.\", sharingButton) // Confirmed correct format\n            ) +\n            _genListItem(`2`, simpleI18n_1.default.__(\"Select %s from the menu that pops up.\", addToHomeButton) +\n                ` <span class=\"adhs-emphasis\">${simpleI18n_1.default.__(\"You may need to scroll down to find this menu item.\")}</span>`) +\n            _genListEnd() +\n            _genBlurbMobile() +\n            _genModalEnd() +\n            div(`${isBrowserIOSIPadSafari()\n                ? \"ios-ipad-safari-bouncing-arrow-container\"\n                : \"ios-safari-bouncing-arrow-container\"} ${rtlArrowClass}`) +\n            `<img src=\"${_genAssetUrl(\"ios-safari-bouncing-arrow.svg\")}\" alt=\"arrow\" />\n    </div>`;\n        container.innerHTML = containerInnerHTML;\n        container.classList.add(\"adhs-mobile\", \"adhs-ios\", \"adhs-safari\");\n    }\n    function _genIOSChrome(container) {\n        const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';\n        const moreButton = _genListButtonWithImage(_genAssetUrl(\"ios-chrome-more-button-2.svg\"));\n        const addToHomeButton = _genListButtonWithImage(_genAssetUrl(\"ios-safari-add-to-home-screen-button-2.svg\"), simpleI18n_1.default.__(\"Add to Home Screen\"), isRTL() ? \"left\" : \"right\");\n        const containerInnerHTML = _genModalStart() +\n            _genInstallAppHeader() +\n            _genAppNameHeader() +\n            _genListStart() +\n            _genListItem(`1`, simpleI18n_1.default.__(\"Tap the %s button in the upper right corner.\", moreButton)) +\n            _genListItem(`2`, simpleI18n_1.default.__(\"Select %s from the menu that pops up.\", addToHomeButton) +\n                ` <span class=\"adhs-emphasis\">${simpleI18n_1.default.__(\"You may need to scroll down to find this menu item.\")}</span>`) +\n            _genListEnd() +\n            _genBlurbMobile() +\n            _genModalEnd() +\n            div(`ios-chrome-bouncing-arrow-container ${rtlArrowClass}`) +\n            `<img src=\"${_genAssetUrl(\"ios-chrome-bouncing-arrow.svg\")}\" alt=\"arrow\" />\n    </div>`;\n        container.innerHTML = containerInnerHTML;\n        container.classList.add(\"adhs-mobile\", \"adhs-ios\", \"adhs-chrome\");\n    }\n    function _genAndroidChrome(container) {\n        const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';\n        const moreButton = _genListButtonWithImage(_genAssetUrl(\"android-chrome-more-button-2.svg\"));\n        const addToHomeButton = _genListButtonWithImage(_genAssetUrl(\"android-chrome-add-to-home-screen-button-2.svg\"), simpleI18n_1.default.__(\"Add to Home Screen\"), isRTL() ? \"right\" : \"left\");\n        const translatedText = simpleI18n_1.default.__(\"Tap %s in the browser bar.\", moreButton);\n        const instructionHTML = translatedText.replace(\"%s\", moreButton);\n        const containerInnerHTML = _genModalStart() +\n            _genInstallAppHeader() +\n            _genAppNameHeader() +\n            _genListStart() +\n            _genListItem(`1`, simpleI18n_1.default.__(\"Tap %s in the browser bar.\", instructionHTML)) +\n            _genListItem(`2`, simpleI18n_1.default.__(\"Tap %s\", addToHomeButton)) +\n            _genListEnd() +\n            _genBlurbMobile() +\n            _genModalEnd() +\n            div(`android-chrome-bouncing-arrow-container ${rtlArrowClass}`) +\n            `<img src=\"${_genAssetUrl(\"android-chrome-bouncing-arrow.svg\")}\" alt=\"arrow\" />\n    </div>`;\n        container.innerHTML = containerInnerHTML;\n        container.classList.add(\"adhs-mobile\", \"adhs-android\", \"adhs-chrome\");\n    }\n    function _genIOSInAppBrowserOpenInSystemBrowser(container) {\n        const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';\n        const moreButtonImg = `<img class=\"adhs-more-button${isRTL() ? \" rtl\" : \"\"}\" src=\"${_genAssetUrl(\"generic-more-button.svg\")}\"/>`;\n        const containerInnerHTML = _genModalStart() +\n            _genInstallAppHeader() +\n            _genAppNameHeader() +\n            _genListStart() +\n            _genListItem(`1`, simpleI18n_1.default.__(\"Tap the %s button above.\", moreButtonImg)) +\n            _genListItem(`2`, `${simpleI18n_1.default.__(\"Tap\")} <span class=\"adhs-emphasis\">${simpleI18n_1.default.__(\"Open in browser\")}</span>`) +\n            _genListEnd() +\n            _genModalEnd() +\n            div(`inappbrowser-openinsystembrowser-bouncing-arrow-container ${rtlArrowClass}`) +\n            `<img src=\"${_genAssetUrl(\"generic-vertical-up-bouncing-arrow.svg\")}\" alt=\"arrow\" />\n    </div>`;\n        container.innerHTML = containerInnerHTML;\n        container.classList.add(\"adhs-mobile\", \"adhs-ios\", \"adhs-inappbrowser-openinsystembrowser\");\n    }\n    function _genIOSInAppBrowserOpenInSafariBrowser(container) {\n        const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';\n        const moreButtonImg = `<img class=\"adhs-more-button${isRTL() ? \" rtl\" : \"\"}\" src=\"${_genAssetUrl(\"openinsafari-button.png\")}\"/>`;\n        const containerInnerHTML = _genModalStart() +\n            _genInstallAppHeader() +\n            _genAppNameHeader() +\n            _genListStart() +\n            _genListItem(`1`, simpleI18n_1.default.__(\"Tap the %s button below to open your system browser.\", moreButtonImg)) +\n            _genListEnd() +\n            _genModalEnd() +\n            div(`inappbrowser-openinsafari-bouncing-arrow-container ${rtlArrowClass}`) +\n            `<img src=\"${_genAssetUrl(\"generic-vertical-down-bouncing-arrow.svg\")}\" alt=\"arrow\" />\n    </div>`;\n        container.innerHTML = containerInnerHTML;\n        container.classList.add(\"adhs-mobile\", \"adhs-ios\", \"adhs-inappbrowser-openinsafari\");\n    }\n    function _genDesktopChrome(container) {\n        const rtlClass = isRTL() ? 'rtl' : '';\n        const blurb = isDesktopMac()\n            ? _genBlurbDesktopMac()\n            : _genBlurbDesktopWindows();\n        const containerInnerHTML = _genModalStart() +\n            _genInstallAppHeader() +\n            _genAppNameHeader() +\n            _genAppUrlHeader() +\n            blurb +\n            div(`button-container ${rtlClass}`) +\n            `<button class=\"adhs-button adhs-button-cancel\">\n        ${simpleI18n_1.default.__(\"Later\")}\n      </button>\n      <button class=\"adhs-button adhs-button-install\">\n        ${simpleI18n_1.default.__(\"Install\")}\n      </button>\n    </div>` +\n            _genModalEnd();\n        container.innerHTML = containerInnerHTML;\n        container.classList.add(\"adhs-desktop\", \"adhs-desktop-chrome\");\n        // Button event listeners\n        const cancelButton = container.getElementsByClassName(\"adhs-button-cancel\")[0];\n        const installButton = container.getElementsByClassName(\"adhs-button-install\")[0];\n        cancelButton.addEventListener(\"click\", () => {\n            closeModal();\n        });\n        installButton.addEventListener(\"click\", () => {\n            if (!_desktopInstallPromptEvent) {\n                return;\n            }\n            _desktopInstallPromptEvent.prompt();\n            closeModal();\n            _desktopInstallPromptEvent.userChoice.then((choiceResult) => {\n                if (choiceResult.outcome === \"accepted\") {\n                    debugMessage(\"User accepted the install prompt\");\n                }\n                else {\n                    debugMessage(\"User dismissed the install prompt\");\n                }\n                _desktopInstallPromptEvent = null;\n            });\n        });\n    }\n    function _genDesktopSafari(container) {\n        const rtlArrowClass = isBrowserRTL() ? 'rtl-arrow' : '';\n        const blurb = isDesktopMac()\n            ? _genBlurbDesktopMac()\n            : _genBlurbDesktopWindows();\n        const menuButton = _genListButtonWithImage(_genAssetUrl(\"desktop-safari-menu.svg\"));\n        const dockButton = _genListButtonWithImage(_genAssetUrl(\"desktop-safari-dock.svg\"), simpleI18n_1.default.__(\"Add To Dock\"), isRTL() ? \"right\" : \"left\");\n        const containerInnerHTML = _genModalStart() +\n            _genInstallAppHeader() +\n            _genAppNameHeader() +\n            _genAppUrlHeader() +\n            _genListStart() +\n            _genListItem(`1`, simpleI18n_1.default.__(\"Tap %s in the toolbar.\", menuButton)) +\n            _genListItem(`2`, simpleI18n_1.default.__(\"Tap %s\", dockButton)) +\n            _genListEnd() +\n            blurb +\n            _genModalEnd() +\n            div(`desktop-safari-bouncing-arrow-container ${rtlArrowClass}`) +\n            `<img src=\"${_genAssetUrl(\"desktop-safari-bouncing-arrow.svg\")}\" alt=\"arrow\" />\n    </div>`;\n        container.innerHTML = containerInnerHTML;\n        container.classList.add(\"adhs-desktop\", \"adhs-desktop-safari\");\n    }\n    function _genAssetUrl(fileName) {\n        if (!assetUrl.endsWith('/') && !fileName.startsWith('/')) {\n            return `${assetUrl}/${fileName}`;\n        }\n        return assetUrl + fileName;\n    }\n    // Helper functions\n    function _genInstallAppHeader() {\n        const text = appNameDisplay === \"inline\"\n            ? simpleI18n_1.default.__(\"Install %s\", appName)\n            : simpleI18n_1.default.__(\"Install app\");\n        return `<h1 class=\"adhs-install-app\">${text}</h1>`;\n    }\n    function _genAppNameHeader() {\n        if (appNameDisplay === \"inline\") {\n            return \"\";\n        }\n        return div(\"app-name\") + appName + `</div>`;\n    }\n    function _genAppUrlHeader() {\n        return div(\"app-url\") + _getAppDisplayUrl() + `</div>`;\n    }\n    function _genBlurbWithMessage(message) {\n        return div(\"blurb\") + message + `</div>`;\n    }\n    function _genBlurbMobile() {\n        return _genBlurbWithMessage(simpleI18n_1.default.__(\"An icon will be added to your home screen so you can quickly access this website.\"));\n    }\n    function _genBlurbDesktopWindows() {\n        return _genBlurbWithMessage(simpleI18n_1.default.__(\"An icon will be added to your Taskbar so you can quickly access this website.\"));\n    }\n    function _genBlurbDesktopMac() {\n        return _genBlurbWithMessage(simpleI18n_1.default.__(\"An icon will be added to your Dock so you can quickly access this website.\"));\n    }\n    function _createContainer(include_modal = false) {\n        const container = document.createElement(\"div\");\n        container.classList.add(\"adhs-container\");\n        if (isRTL()) {\n            container.classList.add(\"adhs-rtl\");\n        }\n        if (include_modal) {\n            var containerInnerHTML = _genModalStart() + _genModalEnd();\n            container.innerHTML = containerInnerHTML;\n        }\n        return container;\n    }\n    function _addContainerToBody(container) {\n        document.body.appendChild(container);\n        _registerCloseListener();\n        setTimeout(() => {\n            container.classList.add(\"visible\");\n        }, 50);\n    }\n    function _genListStart() {\n        return div(\"list\");\n    }\n    function _genListEnd() {\n        return `</div>`;\n    }\n    function _genListItem(numberString, instructionHTML) {\n        const rtlClass = isRTL() ? 'rtl' : '';\n        return `\n      ${div(`list-item ${rtlClass}`)}\n        ${isRTL() ? '' : `\n        ${div(\"number-container\")}\n          ${div(\"circle\")}\n            ${div(\"number\")}\n              ${numberString}\n            </div>\n          </div>\n        </div>`}\n        ${div(\"instruction\")}\n          ${instructionHTML}\n        </div>\n        ${isRTL() ? `\n        ${div(\"number-container\")}\n          ${div(\"circle\")}\n            ${div(\"number\")}\n              ${numberString}\n            </div>\n          </div>\n        </div>` : ''}\n      </div>`;\n    }\n    function _genModalStart() {\n        return div(\"modal\") + _genLogo();\n    }\n    function _genModalEnd() {\n        return `</div>`;\n    }\n    function _genLogo() {\n        return `\n      ${div(\"logo\")}\n        <img src=\"${appIconUrl}\" alt=\"logo\" />\n      </div>\n    `;\n    }\n    function div(className) {\n        return `<div class=\"adhs-${className}\">`;\n    }\n    // Device Detection Functions\n    function _matchesUserAgent(regex) {\n        return !!userAgent.match(regex);\n    }\n    function isDeviceAndroid() {\n        return !!_matchesUserAgent(/Android/);\n    }\n    function isDeviceIOS() {\n        return _matchesUserAgent(/iPhone|iPad|iPod/) || isBrowserIOSIPadSafari();\n    }\n    function isBrowserIOSIPadSafari() {\n        return !!(userAgent.match(/Macintosh/) &&\n            navigator.maxTouchPoints &&\n            navigator.maxTouchPoints > 1);\n    }\n    function isBrowserIOSSafari() {\n        return (isDeviceIOS() &&\n            _matchesUserAgent(/Safari/) &&\n            !isBrowserIOSChrome() &&\n            !isBrowserIOSFirefox() &&\n            !isBrowserIOSInAppFacebook() &&\n            !isBrowserIOSInAppLinkedin() &&\n            !isBrowserIOSInAppInstagram() &&\n            !isBrowserIOSInAppThreads() &&\n            !isBrowserIOSInAppTwitter());\n    }\n    function isBrowserIOSChrome() {\n        return isDeviceIOS() && _matchesUserAgent(/CriOS/);\n    }\n    function isBrowserIOSFirefox() {\n        return isDeviceIOS() && _matchesUserAgent(/FxiOS/);\n    }\n    function isBrowserIOSInAppFacebook() {\n        return isDeviceIOS() && _matchesUserAgent(/FBAN|FBAV/);\n    }\n    function isBrowserIOSInAppLinkedin() {\n        return isDeviceIOS() && _matchesUserAgent(/LinkedInApp/);\n    }\n    function isBrowserIOSInAppInstagram() {\n        if (!isDeviceIOS()) {\n            return false;\n        }\n        return !!window.document.referrer.match(\"//l.instagram.com/\");\n    }\n    function isBrowserIOSInAppThreads() {\n        return isBrowserIOSInAppInstagram();\n    }\n    function isBrowserIOSInAppTwitter() {\n        if (!isDeviceIOS()) {\n            return false;\n        }\n        return !!window.document.referrer.match(\"//t.co/\");\n    }\n    function isBrowserAndroidChrome() {\n        return (isDeviceAndroid() &&\n            !!_matchesUserAgent(/Chrome/) &&\n            !isBrowserAndroidFacebook() &&\n            !isBrowserAndroidSamsung() &&\n            !isBrowserAndroidFirefox());\n    }\n    function isBrowserAndroidFacebook() {\n        return isDeviceAndroid() && _matchesUserAgent(/FBAN|FBAV/);\n    }\n    function isBrowserAndroidSamsung() {\n        return isDeviceAndroid() && _matchesUserAgent(/SamsungBrowser/);\n    }\n    function isBrowserAndroidFirefox() {\n        return isDeviceAndroid() && _matchesUserAgent(/Firefox/);\n    }\n    function isDesktopWindows() {\n        return userAgent.includes(\"Windows\");\n    }\n    function isDesktopMac() {\n        return userAgent.includes(\"Macintosh\");\n    }\n    function isDesktopChrome() {\n        const isChrome = userAgent.includes(\"Chrome\") && !userAgent.includes(\"Edg\");\n        const isDesktop = userAgent.includes(\"Windows\") ||\n            userAgent.includes(\"Macintosh\") ||\n            userAgent.includes(\"Linux\");\n        return isChrome && isDesktop;\n    }\n    function isDesktopSafari() {\n        const isSafari = userAgent.includes(\"Safari\") &&\n            !userAgent.includes(\"Chrome\") &&\n            !userAgent.includes(\"Edg\");\n        const isDesktop = userAgent.includes(\"Macintosh\") || userAgent.includes(\"Windows\");\n        return isSafari && isDesktop;\n    }\n    function isDesktopEdge() {\n        return userAgent.includes(\"Edg/\");\n    }\n    function isStandAlone() {\n        return (!!(\"standalone\" in window.navigator && window.navigator.standalone) ||\n            !!window.matchMedia(\"(display-mode: standalone)\").matches);\n    }\n    // Modal Display Count Handling\n    function _getModalDisplayCountKey() {\n        return \"adhs-modal-display-count\";\n    }\n    function _getModalDisplayCount() {\n        const countStr = window.localStorage.getItem(_getModalDisplayCountKey());\n        if (countStr === null) {\n            const count = 0;\n            window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());\n            return count;\n        }\n        return parseInt(countStr);\n    }\n    function _isEnabledModalDisplayCount() {\n        return (typeof maxModalDisplayCount === \"number\" &&\n            maxModalDisplayCount >= 0 &&\n            window.localStorage !== undefined);\n    }\n    function _hasReachedMaxModalDisplayCount() {\n        if (!_isEnabledModalDisplayCount()) {\n            return false;\n        }\n        return _getModalDisplayCount() >= maxModalDisplayCount;\n    }\n    function _incrModalDisplayCount() {\n        if (!_isEnabledModalDisplayCount()) {\n            return false;\n        }\n        const count = _getModalDisplayCount() + 1;\n        window.localStorage.setItem(_getModalDisplayCountKey(), count.toString());\n        return true;\n    }\n    function clearModalDisplayCount() {\n        if (_isEnabledModalDisplayCount()) {\n            window.localStorage.removeItem(_getModalDisplayCountKey());\n        }\n    }\n    // Modal Closing\n    function closeModal() {\n        const container = document.querySelector(\".adhs-container\");\n        if (container) {\n            container.classList.remove(\"visible\");\n            setTimeout(() => {\n                container.remove();\n                if (closeEventListener) {\n                    window.removeEventListener(\"touchstart\", closeEventListener);\n                    window.removeEventListener(\"click\", closeEventListener);\n                    closeEventListener = null;\n                }\n            }, isDeviceIOS() ? 500 : 300);\n        }\n    }\n    function _registerCloseListener() {\n        closeEventListener = (e) => {\n            const modal = document\n                .getElementsByClassName(\"adhs-container\")[0]\n                .getElementsByClassName(\"adhs-modal\")[0];\n            if (!modal.contains(e.target)) {\n                closeModal();\n            }\n        };\n        setTimeout(() => {\n            window.addEventListener(\"touchstart\", closeEventListener);\n            window.addEventListener(\"click\", closeEventListener);\n        }, 50);\n    }\n    // Desktop Install Prompt Handling\n    let _desktopInstallPromptEvent = null;\n    let _desktopInstallPromptWasShown = false;\n    function _desktopInstallPromptEventListener(e) {\n        e.preventDefault();\n        _desktopInstallPromptEvent = e;\n    }\n    function _registerDesktopInstallPromptEvent() {\n        window.addEventListener(\"beforeinstallprompt\", _desktopInstallPromptEventListener);\n    }\n    function shouldShowDesktopInstallPromptBasedOnDevice() {\n        return (!isStandAlone() &&\n            !_hasReachedMaxModalDisplayCount() &&\n            !isDeviceIOS() &&\n            !isDeviceAndroid() &&\n            (isDesktopChrome() || isDesktopEdge()));\n    }\n    function _desktopInstallPromptEventHasFired() {\n        return _desktopInstallPromptEvent !== null;\n    }\n    // Utility Functions\n    function _getAppDisplayUrl() {\n        const currentUrl = new URL(window.location.href);\n        return currentUrl.href.replace(/\\/$/, \"\");\n    }\n    function _assertArg(variableName, booleanExp) {\n        if (!booleanExp) {\n            throw new Error(\"AddToHomeScreen: variable '\" + variableName + \"' has an invalid value.\");\n        }\n    }\n    function debugMessage(message) {\n        // console.log(message);\n    }\n    // Return public interface\n    return {\n        appName,\n        appIconUrl,\n        assetUrl,\n        maxModalDisplayCount,\n        clearModalDisplayCount,\n        isStandAlone,\n        show,\n        closeModal,\n        isBrowserAndroidChrome,\n        isBrowserAndroidFacebook,\n        isBrowserAndroidFirefox,\n        isBrowserAndroidSamsung,\n        isBrowserIOSChrome,\n        isBrowserIOSFirefox,\n        isBrowserIOSInAppFacebook,\n        isBrowserIOSInAppInstagram,\n        isBrowserIOSInAppLinkedin,\n        isBrowserIOSInAppThreads,\n        isBrowserIOSInAppTwitter,\n        isBrowserIOSSafari,\n        isDesktopChrome,\n        isDesktopEdge,\n        isDesktopMac,\n        isDesktopSafari,\n        isDesktopWindows,\n    };\n}\n\n\n//# sourceURL=webpack://add-to-homescreen/./src/index.ts?");
=======

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
    let { appIconUrl, appName, appNameDisplay, assetUrl, maxModalDisplayCount, displayOptions } = options;
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

>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst { AddToHomeScreen } = __webpack_require__(/*! ./index */ \"./src/index.ts\");\nwindow.AddToHomeScreen = AddToHomeScreen;\n\n\n//# sourceURL=webpack://add-to-homescreen/./src/main.ts?");

/***/ }),

/***/ "./src/simpleI18n.ts":
/*!***************************!*\
  !*** ./src/simpleI18n.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
<<<<<<< HEAD
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nlet config;\nlet directory;\nconst PLACEHOLDER = \"%s\";\nconst SimpleI18n = {\n    configure: (configInput) => {\n        config = configInput;\n    },\n    setLocale: (locale) => {\n        if (true) {\n            if (!config) {\n                throw new Error(\"SimpleI18n error: The configure function must be called before the setLocale function\");\n            }\n        }\n        directory = config.staticCatalog[locale];\n    },\n    __: (key, input) => {\n        // First get the localized string\n        const localizedStr = directory[key] || key;\n        if (localizedStr.indexOf(PLACEHOLDER) < 0) {\n            return localizedStr;\n        }\n        // Need to do a string replacement\n        if (true) {\n            if (!input) {\n                throw new Error(\"SimpleI18n error: if \" +\n                    PLACEHOLDER +\n                    \" exists in a string, a replacement string must be provided for \" +\n                    key);\n            }\n        }\n        const parts = localizedStr.split(PLACEHOLDER);\n        return parts[0] + input + parts[1];\n    },\n};\nexports[\"default\"] = SimpleI18n;\n\n\n//# sourceURL=webpack://add-to-homescreen/./src/simpleI18n.ts?");
=======

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

>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
<<<<<<< HEAD
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DeviceInfo = exports.DeviceType = void 0;\nvar DeviceType;\n(function (DeviceType) {\n    DeviceType[\"IOS\"] = \"IOS\";\n    DeviceType[\"ANDROID\"] = \"ANDROID\";\n    DeviceType[\"DESKTOP\"] = \"DESKTOP\";\n})(DeviceType || (exports.DeviceType = DeviceType = {}));\nclass DeviceInfo {\n    constructor(isStandAlone, canBeStandAlone, device) {\n        this.isStandAlone = isStandAlone;\n        this.canBeStandAlone = canBeStandAlone;\n        this.device = device;\n    }\n}\nexports.DeviceInfo = DeviceInfo;\n\n\n//# sourceURL=webpack://add-to-homescreen/./src/types.ts?");
=======

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

>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((module) => {

<<<<<<< HEAD
eval("module.exports = {\n  LOCALES: [\n    \"af\",  // Afrikaans\n    \"am\",  // Amharic\n    \"ar\",  // Arabic\n    \"az\",  // Azerbaijani\n    \"bg\",  // Bulgarian\n    \"bn\",  // Bengali\n    \"bs\",  // Bosnian\n    \"cs\",  // Czech\n    \"cy\",  // Welsh\n    \"da\",  // Danish\n    \"de\",  // German\n    \"el\",  // Greek\n    \"en\",  // English\n    \"es\",  // Spanish\n    \"et\",  // Estonian\n    \"fa\",  // Persian\n    \"fi\",  // Finnish\n    \"fr\",  // French\n    \"ga\",  // Irish\n    \"he\",  // Hebrew\n    \"hi\",  // Hindi\n    \"hr\",  // Croatian\n    \"hu\",  // Hungarian\n    \"hy\",  // Armenian\n    \"id\",  // Indonesian\n    \"is\",  // Icelandic\n    \"it\",  // Italian\n    \"ja\",  // Japanese\n    \"ka\",  // Georgian\n    \"kk\",  // Kazakh\n    \"ko\",  // Korean\n    \"ky\",  // Kyrgyz\n    \"lb\",  // Luxembourgish\n    \"lt\",  // Lithuanian\n    \"lv\",  // Latvian\n    \"mk\",  // Macedonian\n    \"mn\",  // Mongolian\n    \"ms\",  // Malay\n    \"mt\",  // Maltese\n    \"nl\",  // Dutch\n    \"no\",  // Norwegian\n    \"pl\",  // Polish\n    \"pt\",  // Portuguese\n    \"ro\",  // Romanian\n    \"ru\",  // Russian\n    \"sk\",  // Slovak\n    \"sl\",  // Slovenian\n    \"sr\",  // Serbian\n    \"sv\",  // Swedish\n    \"th\",  // Thai\n    \"tl\",  // Filipino\n    \"tr\",  // Turkish\n    \"uk\",  // Ukrainian\n    \"ur\",  // Urdu\n    \"vi\",  // Vietnamese\n    \"zh\",  // Chinese (Simplified)\n    \"zh_CN\",  // Chinese (Simplified)\n    \"zh_HK\",  // Chinese (Hong Kong)\n    \"zh_TW\"   // Chinese (Taiwan)\n  ],\n  DEFAULT_LOCALE: \"en\"\n};\n\n\n//# sourceURL=webpack://add-to-homescreen/./src/config.js?");
=======
module.exports = {
  LOCALES: [
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
    "pl",
    "th",
    "vn",
    "zh",
    "zh_CN",
    "zh_HK",
    "zh_TW"
  ],
  DEFAULT_LOCALE: "en",
};

>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales sync recursive ^\\.\\/.*\\.json$":
/*!******************************************!*\
  !*** ./src/locales/ sync ^\.\/.*\.json$ ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

<<<<<<< HEAD
eval("var map = {\n\t\"./af.json\": \"./src/locales/af.json\",\n\t\"./am.json\": \"./src/locales/am.json\",\n\t\"./ar.json\": \"./src/locales/ar.json\",\n\t\"./az.json\": \"./src/locales/az.json\",\n\t\"./bg.json\": \"./src/locales/bg.json\",\n\t\"./bn.json\": \"./src/locales/bn.json\",\n\t\"./bs.json\": \"./src/locales/bs.json\",\n\t\"./cs.json\": \"./src/locales/cs.json\",\n\t\"./cy.json\": \"./src/locales/cy.json\",\n\t\"./da.json\": \"./src/locales/da.json\",\n\t\"./de.json\": \"./src/locales/de.json\",\n\t\"./el.json\": \"./src/locales/el.json\",\n\t\"./en.json\": \"./src/locales/en.json\",\n\t\"./es.json\": \"./src/locales/es.json\",\n\t\"./et.json\": \"./src/locales/et.json\",\n\t\"./fa.json\": \"./src/locales/fa.json\",\n\t\"./fi.json\": \"./src/locales/fi.json\",\n\t\"./fr.json\": \"./src/locales/fr.json\",\n\t\"./ga.json\": \"./src/locales/ga.json\",\n\t\"./he.json\": \"./src/locales/he.json\",\n\t\"./hi.json\": \"./src/locales/hi.json\",\n\t\"./hr.json\": \"./src/locales/hr.json\",\n\t\"./hu.json\": \"./src/locales/hu.json\",\n\t\"./hy.json\": \"./src/locales/hy.json\",\n\t\"./id.json\": \"./src/locales/id.json\",\n\t\"./is.json\": \"./src/locales/is.json\",\n\t\"./it.json\": \"./src/locales/it.json\",\n\t\"./ja.json\": \"./src/locales/ja.json\",\n\t\"./ka.json\": \"./src/locales/ka.json\",\n\t\"./kk.json\": \"./src/locales/kk.json\",\n\t\"./ko.json\": \"./src/locales/ko.json\",\n\t\"./ky.json\": \"./src/locales/ky.json\",\n\t\"./lb.json\": \"./src/locales/lb.json\",\n\t\"./lt.json\": \"./src/locales/lt.json\",\n\t\"./lv.json\": \"./src/locales/lv.json\",\n\t\"./mk.json\": \"./src/locales/mk.json\",\n\t\"./mn.json\": \"./src/locales/mn.json\",\n\t\"./ms.json\": \"./src/locales/ms.json\",\n\t\"./mt.json\": \"./src/locales/mt.json\",\n\t\"./nl.json\": \"./src/locales/nl.json\",\n\t\"./no.json\": \"./src/locales/no.json\",\n\t\"./pl.json\": \"./src/locales/pl.json\",\n\t\"./pt.json\": \"./src/locales/pt.json\",\n\t\"./ro.json\": \"./src/locales/ro.json\",\n\t\"./ru.json\": \"./src/locales/ru.json\",\n\t\"./sk.json\": \"./src/locales/sk.json\",\n\t\"./sl.json\": \"./src/locales/sl.json\",\n\t\"./sr.json\": \"./src/locales/sr.json\",\n\t\"./sv.json\": \"./src/locales/sv.json\",\n\t\"./th.json\": \"./src/locales/th.json\",\n\t\"./tl.json\": \"./src/locales/tl.json\",\n\t\"./tr.json\": \"./src/locales/tr.json\",\n\t\"./uk.json\": \"./src/locales/uk.json\",\n\t\"./ur.json\": \"./src/locales/ur.json\",\n\t\"./vi.json\": \"./src/locales/vi.json\",\n\t\"./zh.json\": \"./src/locales/zh.json\",\n\t\"./zh_CN.json\": \"./src/locales/zh_CN.json\",\n\t\"./zh_HK.json\": \"./src/locales/zh_HK.json\",\n\t\"./zh_TW.json\": \"./src/locales/zh_TW.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/locales sync recursive ^\\\\.\\\\/.*\\\\.json$\";\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/_sync_^\\.\\/.*\\.json$?");
=======
var map = {
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
	"./pl.json": 143,
	"./pt.json": 898,
	"./ru.json": 672,
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
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/af.json":
/*!*****************************!*\
  !*** ./src/locales/af.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Voeg by tuisskerm\",\"Add To Dock\":\"Voeg by dok\",\"An icon will be added to your Dock so you can quickly access this website.\":\"\\'n Ikoon sal by jou dok gevoeg word sodat jy vinnig toegang tot hierdie program kan kry.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"\\'n Ikoon sal by jou tuisskerm gevoeg word sodat jy vinnig toegang tot hierdie program kan kry.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"\\'n Ikoon sal by jou taakbalk gevoeg word sodat jy vinnig toegang tot hierdie program kan kry.\",\"Install\":\"Installeer\",\"Install %s\":\"Installeer %s\",\"Install app\":\"Installeer program\",\"Later\":\"Later\",\"Open in browser\":\"Maak oop in blaaier\",\"Select %s from the menu that pops up.\":\"Kies %s uit die spyskaart wat verskyn.\",\"Tap %s\":\"Tik %s\",\"Tap %s in the browser bar.\":\"Tik %s in die blaaier-balk.\",\"Tap %s in the toolbar.\":\"Tik %s in die nutsbalk.\",\"Tap the %s button above.\":\"Tik die %s knoppie hierbo.\",\"Tap the %s button below to open your system browser.\":\"Tik die %s knoppie hieronder om jou stelselblaaier oop te maak.\",\"Tap the %s button in the toolbar.\":\"Tik die %s knoppie in die nutsbalk.\",\"Tap the %s button in the upper right corner.\":\"Tik die %s knoppie in die boonste regterkantste hoek.\",\"You may need to scroll down to find this menu item.\":\"Jy mag moet afrol om hierdie spyskaart-item te vind.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/af.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Přidat na plochu","Add To Dock":"Přidat do Docku","An icon will be added to your Dock so you can quickly access this website.":"Ikona bude přidána do vašeho Docku, abyste měli rychlý přístup k této webové stránce.","An icon will be added to your home screen so you can quickly access this website.":"Ikona bude přidána na vaši domovskou obrazovku, abyste měli rychlý přístup k této webové stránce.","An icon will be added to your Taskbar so you can quickly access this website.":"Ikona bude přidána na váš panel úloh, abyste měli rychlý přístup k této webové stránce.","Install":"Instalovat","Install %s":"Instalovat %s","Install app":"Instalovat aplikaci","Later":"Později","Open in browser":"Otevřít v prohlížeči","Select %s from the menu that pops up.":"Vyberte %s z nabídky, která se zobrazí.","Tap %s":"Klepněte na %s","Tap %s in the browser bar.":"Klepněte na %s v panelu prohlížeče.","Tap %s in the toolbar.":"Klepněte na %s v panelu nástrojů.","Tap the %s button above.":"Klepněte na tlačítko %s výše.","Tap the %s button below to open your system browser.":"Klepněte na tlačítko %s níže pro otevření systémového prohlížeče.","Tap the %s button in the toolbar.":"Klepněte na tlačítko %s v panelu nástrojů.","Tap the %s button in the upper right corner.":"Klepněte na tlačítko %s v pravém horním rohu.","You may need to scroll down to find this menu item.":"Možná budete muset posunout dolů, abyste tuto položku nabídky našli."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/am.json":
/*!*****************************!*\
  !*** ./src/locales/am.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"ወደ መነሻ ማያ ገጽ አክል\",\"Add To Dock\":\"ወደ ዶክ አክል\",\"An icon will be added to your Dock so you can quickly access this website.\":\"ይህን መተግበሪያ በፍጥነት ለመድረስ እንዲችሉ በዶክዎ ላይ አዶ ይጨመራል።\",\"An icon will be added to your home screen so you can quickly access this website.\":\"ይህን መተግበሪያ በፍጥነት ለመድረስ እንዲችሉ በመነሻ ማያ ገጽዎ ላይ አዶ ይጨመራል።\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"ይህን መተግበሪያ በፍጥነት ለመድረስ እንዲችሉ በሥራ መደርደሪያዎ ላይ አዶ ይጨመራል።\",\"Install\":\"ጫን\",\"Install %s\":\"%s ጫን\",\"Install app\":\"መተግበሪያ ጫን\",\"Later\":\"በኋላ\",\"Open in browser\":\"በአሳሽ ውስጥ ክፈት\",\"Select %s from the menu that pops up.\":\"ከሚታየው ምናሌ %s ይምረጡ።\",\"Tap %s\":\"%s ይንኩ\",\"Tap %s in the browser bar.\":\"በአሳሹ አሞሌ ውስጥ %s ይንኩ።\",\"Tap %s in the toolbar.\":\"በመሣሪያ አሞሌ ውስጥ %s ይንኩ።\",\"Tap the %s button above.\":\"ከላይ ያለውን %s አዝራር ይንኩ።\",\"Tap the %s button below to open your system browser.\":\"የስርዓትዎን አሳሽ ለመክፈት ከታች ያለውን %s አዝራር ይንኩ።\",\"Tap the %s button in the toolbar.\":\"በመሣሪያ አሞሌ ውስጥ ያለውን %s አዝራር ይንኩ።\",\"Tap the %s button in the upper right corner.\":\"በላይኛው የቀኝ ጎን ማዕዘን ያለውን %s አዝራር ይንኩ።\",\"You may need to scroll down to find this menu item.\":\"ይህን የምናሌ ንጥል ለማግኘት ወደ ታች ማንሸራተት ሊያስፈልግዎት ይችላል።\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/am.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Tilføj til startskærm","Add To Dock":"Tilføj til dock","An icon will be added to your Dock so you can quickly access this website.":"Et ikon vil blive tilføjet til din dock, så du hurtigt kan få adgang til dette website.","An icon will be added to your home screen so you can quickly access this website.":"Et ikon vil blive tilføjet til din startskærm, så du hurtigt kan få adgang til dette website.","An icon will be added to your Taskbar so you can quickly access this website.":"Et ikon vil blive tilføjet til din proceslinje, så du hurtigt kan få adgang til dette website.","Install":"Installer","Install %s":"Installer %s","Install app":"Installer app","Later":"Senere","Open in browser":"Åbn i browser","Select %s from the menu that pops up.":"Vælg %s fra menuen, der dukker op.","Tap %s":"Tryk på %s","Tap %s in the browser bar.":"Tryk på %s i browserlinjen.","Tap %s in the toolbar.":"Tryk på %s i værktøjslinjen.","Tap the %s button above.":"Tryk på %s-knappen ovenfor.","Tap the %s button below to open your system browser.":"Tryk på %s-knappen nedenfor for at åbne din systembrowser.","Tap the %s button in the toolbar.":"Tryk på %s-knappen i værktøjslinjen.","Tap the %s button in the upper right corner.":"Tryk på %s-knappen i øverste højre hjørne.","You may need to scroll down to find this menu item.":"Du skal måske rulle ned for at finde dette menupunkt."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/ar.json":
/*!*****************************!*\
  !*** ./src/locales/ar.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"إضافة إلى الشاشة الرئيسية\",\"Add To Dock\":\"إضافة إلى المرسى\",\"An icon will be added to your Dock so you can quickly access this website.\":\"سيتم إضافة أيقونة إلى المرسى للوصول السريع إلى هذا التطبيق.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"سيتم إضافة أيقونة إلى شاشتك الرئيسية للوصول السريع إلى هذا التطبيق.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"سيتم إضافة أيقونة إلى شريط المهام للوصول السريع إلى هذا التطبيق.\",\"Install\":\"تثبيت\",\"Install %s\":\"تثبيت %s\",\"Install app\":\"تثبيت التطبيق\",\"Later\":\"لاحقاً\",\"Open in browser\":\"فتح في المتصفح\",\"Select %s from the menu that pops up.\":\"اختر %s من القائمة المنبثقة.\",\"Tap %s\":\"انقر على %s\",\"Tap %s in the browser bar.\":\"انقر على %s في شريط المتصفح.\",\"Tap %s in the toolbar.\":\"انقر على %s في شريط الأدوات.\",\"Tap the %s button above.\":\"انقر على زر %s أعلاه.\",\"Tap the %s button below to open your system browser.\":\"انقر على زر %s أدناه لفتح متصفح النظام.\",\"Tap the %s button in the toolbar.\":\"انقر على زر %s في شريط الأدوات.\",\"Tap the %s button in the upper right corner.\":\"انقر على زر %s في الزاوية العلوية اليمنى.\",\"You may need to scroll down to find this menu item.\":\"قد تحتاج إلى التمرير لأسفل للعثور على عنصر القائمة هذا.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ar.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Zum Home-Bildschirm","Add To Dock":"Zum Dock hinzufügen","An icon will be added to your Dock so you can quickly access this website.":"Ein Symbol wird zu Ihrem Dock hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","An icon will be added to your home screen so you can quickly access this website.":"Ein Symbol wird zu Ihrem Startbildschirm hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","An icon will be added to your Taskbar so you can quickly access this website.":"Ein Symbol wird zu Ihrer Taskleiste hinzugefügt, damit Sie schnell auf diese Website zugreifen können.","Install":"Installieren","Install %s":"%s installieren","Install app":"App installieren","Later":"Später","Open in browser":"Im Browser öffnen","Select %s from the menu that pops up.":"Wählen Sie %s aus dem Menü, das erscheint.","Tap %s":"Tippen Sie auf %s","Tap %s in the browser bar.":"Tippen Sie auf %s in der Browserleiste.","Tap %s in the toolbar.":"Tippen Sie auf %s in der Symbolleiste.","Tap the %s button above.":"Tippen Sie oben auf die Schaltfläche %s.","Tap the %s button below to open your system browser.":"Tippen Sie unten auf die Schaltfläche %s, um Ihren Systembrowser zu öffnen.","Tap the %s button in the toolbar.":"Tippen Sie auf die Schaltfläche %s in der Symbolleiste.","Tap the %s button in the upper right corner.":"Tippen Sie auf die Schaltfläche %s in der oberen rechten Ecke.","You may need to scroll down to find this menu item.":"Sie müssen möglicherweise nach unten scrollen, um diesen Menüpunkt zu finden."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/az.json":
/*!*****************************!*\
  !*** ./src/locales/az.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Ana ekrana əlavə et\",\"Add To Dock\":\"Doka əlavə et\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Bu tətbiqə tez daxil olmaq üçün Dokunuza nişan əlavə ediləcək.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Bu tətbiqə tez daxil olmaq üçün ana ekranınıza nişan əlavə ediləcək.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Bu tətbiqə tez daxil olmaq üçün tapşırıq panelinizə nişan əlavə ediləcək.\",\"Install\":\"Quraşdır\",\"Install %s\":\"%s quraşdır\",\"Install app\":\"Tətbiqi quraşdır\",\"Later\":\"Sonra\",\"Open in browser\":\"Brauzerdə aç\",\"Select %s from the menu that pops up.\":\"Açılan menyudan %s seçin.\",\"Tap %s\":\"%s toxunun\",\"Tap %s in the browser bar.\":\"Brauzer panelində %s toxunun.\",\"Tap %s in the toolbar.\":\"Alət panelində %s toxunun.\",\"Tap the %s button above.\":\"Yuxarıdakı %s düyməsinə toxunun.\",\"Tap the %s button below to open your system browser.\":\"Sistem brauzerinizi açmaq üçün aşağıdakı %s düyməsinə toxunun.\",\"Tap the %s button in the toolbar.\":\"Alət panelindəki %s düyməsinə toxunun.\",\"Tap the %s button in the upper right corner.\":\"Yuxarı sağ küncdəki %s düyməsinə toxunun.\",\"You may need to scroll down to find this menu item.\":\"Bu menyu elementini tapmaq üçün aşağı sürüşdürmə lazım ola bilər.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/az.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Add to Home Screen","Add To Dock":"Add To Dock","An icon will be added to your Dock so you can quickly access this website.":"An icon will be added to your Dock so you can quickly access this website.","An icon will be added to your home screen so you can quickly access this website.":"An icon will be added to your home screen so you can quickly access this website.","An icon will be added to your Taskbar so you can quickly access this website.":"An icon will be added to your Taskbar so you can quickly access this website.","Install":"Install","Install %s":"Install %s","Install app":"Install app","Later":"Later","Open in browser":"Open in browser","Select %s from the menu that pops up.":"Select %s from the menu that pops up.","Tap %s":"Tap %s","Tap %s in the browser bar.":"Tap %s in the browser bar.","Tap %s in the toolbar.":"Tap %s in the toolbar.","Tap the %s button above.":"Tap the %s button above.","Tap the %s button below to open your system browser.":"Tap the %s button below to open your system browser.","Tap the %s button in the toolbar.":"Tap the %s button in the toolbar.","Tap the %s button in the upper right corner.":"Tap the %s button in the upper right corner.","You may need to scroll down to find this menu item.":"You may need to scroll down to find this menu item."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/bg.json":
/*!*****************************!*\
  !*** ./src/locales/bg.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Добави към началния екран\",\"Add To Dock\":\"Добави към док\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Икона ще бъде добавена към вашия док за бърз достъп до това приложение.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Икона ще бъде добавена към началния ви екран за бърз достъп до това приложение.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Икона ще бъде добавена към лентата със задачи за бърз достъп до това приложение.\",\"Install\":\"Инсталирай\",\"Install %s\":\"Инсталирай %s\",\"Install app\":\"Инсталирай приложението\",\"Later\":\"По-късно\",\"Open in browser\":\"Отвори в браузър\",\"Select %s from the menu that pops up.\":\"Изберете %s от изскачащото меню.\",\"Tap %s\":\"Докоснете %s\",\"Tap %s in the browser bar.\":\"Докоснете %s в лентата на браузъра.\",\"Tap %s in the toolbar.\":\"Докоснете %s в лентата с инструменти.\",\"Tap the %s button above.\":\"Докоснете бутона %s по-горе.\",\"Tap the %s button below to open your system browser.\":\"Докоснете бутона %s по-долу, за да отворите системния браузър.\",\"Tap the %s button in the toolbar.\":\"Докоснете бутона %s в лентата с инструменти.\",\"Tap the %s button in the upper right corner.\":\"Докоснете бутона %s в горния десен ъгъл.\",\"You may need to scroll down to find this menu item.\":\"Може да се наложи да превъртите надолу, за да намерите този елемент от менюто.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/bg.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Agregar a Inicio","Add To Dock":"Añadir al Dock","An icon will be added to your Dock so you can quickly access this website.":"Se añadirá un icono a tu Dock para que puedas acceder rápidamente a este sitio web.","An icon will be added to your home screen so you can quickly access this website.":"Se añadirá un icono a tu pantalla de inicio para que puedas acceder rápidamente a este sitio web.","An icon will be added to your Taskbar so you can quickly access this website.":"Se añadirá un icono a tu barra de tareas para que puedas acceder rápidamente a este sitio web.","Install":"Instalar","Install %s":"Instalar %s","Install app":"Instalar aplicación","Later":"Más tarde","Open in browser":"Abrir en el navegador","Select %s from the menu that pops up.":"Selecciona %s del menú emergente.","Tap %s":"Toca %s","Tap %s in the browser bar.":"Toca %s en la barra del navegador.","Tap %s in the toolbar.":"Toca %s en la barra de herramientas.","Tap the %s button above.":"Toca el botón %s de arriba.","Tap the %s button below to open your system browser.":"Toca el botón %s de abajo para abrir el navegador de tu sistema.","Tap the %s button in the toolbar.":"Toca el botón %s en la barra de herramientas.","Tap the %s button in the upper right corner.":"Toca el botón %s en la esquina superior derecha.","You may need to scroll down to find this menu item.":"Es posible que necesites desplazarte hacia abajo para encontrar este elemento del menú."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/bn.json":
/*!*****************************!*\
  !*** ./src/locales/bn.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"হোম স্ক্রিনে যোগ করুন\",\"Add To Dock\":\"ডকে যোগ করুন\",\"An icon will be added to your Dock so you can quickly access this website.\":\"আপনার ডকে একটি আইকন যোগ করা হবে যাতে আপনি দ্রুত এই অ্যাপটি অ্যাক্সেস করতে পারেন।\",\"An icon will be added to your home screen so you can quickly access this website.\":\"আপনার হোম স্ক্রিনে একটি আইকন যোগ করা হবে যাতে আপনি দ্রুত এই অ্যাপটি অ্যাক্সেস করতে পারেন।\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"আপনার টাস্কবারে একটি আইকন যোগ করা হবে যাতে আপনি দ্রুত এই অ্যাপটি অ্যাক্সেস করতে পারেন।\",\"Install\":\"ইনস্টল করুন\",\"Install %s\":\"%s ইনস্টল করুন\",\"Install app\":\"অ্যাপ ইনস্টল করুন\",\"Later\":\"পরে\",\"Open in browser\":\"ব্রাউজারে খুলুন\",\"Select %s from the menu that pops up.\":\"পপ-আপ মেনু থেকে %s নির্বাচন করুন।\",\"Tap %s\":\"%s-এ ট্যাপ করুন\",\"Tap %s in the browser bar.\":\"ব্রাউজার বারে %s-এ ট্যাপ করুন।\",\"Tap %s in the toolbar.\":\"টুলবারে %s-এ ট্যাপ করুন।\",\"Tap the %s button above.\":\"উপরের %s বোতামে ট্যাপ করুন।\",\"Tap the %s button below to open your system browser.\":\"আপনার সিস্টেম ব্রাউজার খোলার জন্য নীচের %s বোতামে ট্যাপ করুন।\",\"Tap the %s button in the toolbar.\":\"টুলবারে %s বোতামে ট্যাপ করুন।\",\"Tap the %s button in the upper right corner.\":\"উপরের ডান কোণের %s বোতামে ট্যাপ করুন।\",\"You may need to scroll down to find this menu item.\":\"এই মেনু আইটেমটি খুঁজে পেতে আপনাকে নীচে স্ক্রল করতে হতে পারে।\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/bn.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Sur l\'écran d\'accueil","Add To Dock":"Ajouter au Dock","An icon will be added to your Dock so you can quickly access this website.":"Une icône sera ajoutée à votre Dock pour accéder rapidement à ce site web.","An icon will be added to your home screen so you can quickly access this website.":"Une icône sera ajoutée à votre écran d\'accueil pour accéder rapidement à ce site web.","An icon will be added to your Taskbar so you can quickly access this website.":"Une icône sera ajoutée à votre barre des tâches pour accéder rapidement à ce site web.","Install":"Installer","Install %s":"Installer %s","Install app":"Installer l\'application","Later":"Plus tard","Open in browser":"Ouvrir dans le navigateur","Select %s from the menu that pops up.":"Sélectionnez %s dans le menu qui apparaît.","Tap %s":"Appuyez sur %s","Tap %s in the browser bar.":"Appuyez sur %s dans la barre du navigateur.","Tap %s in the toolbar.":"Appuyez sur %s dans la barre d\'outils.","Tap the %s button above.":"Appuyez sur le bouton %s ci-dessus.","Tap the %s button below to open your system browser.":"Appuyez sur le bouton %s ci-dessous pour ouvrir votre navigateur système.","Tap the %s button in the toolbar.":"Appuyez sur le bouton %s dans la barre d\'outils.","Tap the %s button in the upper right corner.":"Appuyez sur le bouton %s dans le coin supérieur droit.","You may need to scroll down to find this menu item.":"Vous devrez peut-être faire défiler vers le bas pour trouver cet élément du menu."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/bs.json":
/*!*****************************!*\
  !*** ./src/locales/bs.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Dodaj na početni ekran\",\"Add To Dock\":\"Dodaj na dok\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Ikona će biti dodana na vaš dok za brzi pristup ovoj aplikaciji.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Ikona će biti dodana na vaš početni ekran za brzi pristup ovoj aplikaciji.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Ikona će biti dodana na vašu traku zadataka za brzi pristup ovoj aplikaciji.\",\"Install\":\"Instaliraj\",\"Install %s\":\"Instaliraj %s\",\"Install app\":\"Instaliraj aplikaciju\",\"Later\":\"Kasnije\",\"Open in browser\":\"Otvori u pregledniku\",\"Select %s from the menu that pops up.\":\"Odaberite %s iz iskačućeg menija.\",\"Tap %s\":\"Dodirnite %s\",\"Tap %s in the browser bar.\":\"Dodirnite %s u traci preglednika.\",\"Tap %s in the toolbar.\":\"Dodirnite %s u traci s alatima.\",\"Tap the %s button above.\":\"Dodirnite dugme %s iznad.\",\"Tap the %s button below to open your system browser.\":\"Dodirnite dugme %s ispod da otvorite sistemski preglednik.\",\"Tap the %s button in the toolbar.\":\"Dodirnite dugme %s u traci s alatima.\",\"Tap the %s button in the upper right corner.\":\"Dodirnite dugme %s u gornjem desnom uglu.\",\"You may need to scroll down to find this menu item.\":\"Možda ćete trebati da se pomjerite prema dolje da pronađete ovu stavku menija.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/bs.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"הוסף למסך הבית","Add To Dock":"הוסף לדוק","An icon will be added to your Dock so you can quickly access this website.":"אייקון יתווסף לדוק שלך כדי שתוכל לגשת במהירות לאתר זה.","An icon will be added to your home screen so you can quickly access this website.":"אייקון יתווסף למסך הבית שלך כדי שתוכל לגשת במהירות לאתר זה.","An icon will be added to your Taskbar so you can quickly access this website.":"אייקון יתווסף לשורת המשימות שלך כדי שתוכל לגשת במהירות לאתר זה.","Install":"התקן","Install %s":"התקן %s","Install app":"התקן אפלקציה","Later":"מאוחר יותר","Open in browser":"פתח בדפדפן","Select %s from the menu that pops up.":"בחר ב %s מהתפריט שנפתח.","Tap %s":"לחץ על %s","Tap %s in the browser bar.":"לחץ על %s בשורת הדפדפן.","Tap %s in the toolbar.":"לחץ על %s בסרגל הכלים.","Tap the %s button above.":"לחץ על הכפתור %s למעלה.","Tap the %s button below to open your system browser.":"לחץ על הכפתור %s למטה כדי לפתוח את דפדפן המערכת שלך.","Tap the %s button in the toolbar.":"לחץ על הכפתור %s בסרגל הכלים.","Tap the %s button in the upper right corner.":"לחץ על הכפתור %s בפינה הימנית העליונה.","You may need to scroll down to find this menu item.":"יתכן שתצטרך לגלול למטה כדי למצוא פריט זה בתפריט."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/cs.json":
/*!*****************************!*\
  !*** ./src/locales/cs.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Přidat na domovskou obrazovku\",\"Add To Dock\":\"Přidat do doku\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Do vašeho doku bude přidána ikona pro rychlý přístup k této aplikaci.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Na vaši domovskou obrazovku bude přidána ikona pro rychlý přístup k této aplikaci.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Na panel úloh bude přidána ikona pro rychlý přístup k této aplikaci.\",\"Install\":\"Instalovat\",\"Install %s\":\"Instalovat %s\",\"Install app\":\"Instalovat aplikaci\",\"Later\":\"Později\",\"Open in browser\":\"Otevřít v prohlížeči\",\"Select %s from the menu that pops up.\":\"Vyberte %s z vyskakovací nabídky.\",\"Tap %s\":\"Klepněte na %s\",\"Tap %s in the browser bar.\":\"Klepněte na %s v liště prohlížeče.\",\"Tap %s in the toolbar.\":\"Klepněte na %s v panelu nástrojů.\",\"Tap the %s button above.\":\"Klepněte na tlačítko %s výše.\",\"Tap the %s button below to open your system browser.\":\"Klepnutím na tlačítko %s níže otevřete systémový prohlížeč.\",\"Tap the %s button in the toolbar.\":\"Klepněte na tlačítko %s v panelu nástrojů.\",\"Tap the %s button in the upper right corner.\":\"Klepněte na tlačítko %s v pravém horním rohu.\",\"You may need to scroll down to find this menu item.\":\"Možná budete muset posunout dolů, abyste našli tuto položku nabídky.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/cs.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Aggiungi alla schermata Home","Add To Dock":"Aggiungi al Dock","An icon will be added to your Dock so you can quickly access this website.":"Un\'icona verrà aggiunta al tuo Dock per accedere rapidamente a questo sito web.","An icon will be added to your home screen so you can quickly access this website.":"Un\'icona verrà aggiunta alla tua schermata Home per accedere rapidamente a questo sito web.","An icon will be added to your Taskbar so you can quickly access this website.":"Un\'icona verrà aggiunta alla tua barra delle applicazioni per accedere rapidamente a questo sito web.","Install":"Installa","Install %s":"Installa %s","Install app":"Installa app","Later":"Più tardi","Open in browser":"Apri nel browser","Select %s from the menu that pops up.":"Seleziona %s dal menu che appare.","Tap %s":"Tocca %s","Tap %s in the browser bar.":"Tocca %s nella barra del browser.","Tap %s in the toolbar.":"Tocca %s nella barra degli strumenti.","Tap the %s button above.":"Tocca il pulsante %s sopra.","Tap the %s button below to open your system browser.":"Tocca il pulsante %s sotto per aprire il browser di sistema.","Tap the %s button in the toolbar.":"Tocca il pulsante %s nella barra degli strumenti.","Tap the %s button in the upper right corner.":"Tocca il pulsante %s nell\'angolo in alto a destra.","You may need to scroll down to find this menu item.":"Potrebbe essere necessario scorrere verso il basso per trovare questa voce di menu."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/cy.json":
/*!*****************************!*\
  !*** ./src/locales/cy.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Ychwanegu at Sgrin Cartref\",\"Add To Dock\":\"Ychwanegu at y Doc\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Bydd eicon yn cael ei ychwanegu at eich Doc fel y gallwch gael mynediad cyflym at yr ap hwn.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Bydd eicon yn cael ei ychwanegu at eich sgrin cartref fel y gallwch gael mynediad cyflym at yr ap hwn.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Bydd eicon yn cael ei ychwanegu at eich Bar Tasgau fel y gallwch gael mynediad cyflym at yr ap hwn.\",\"Install\":\"Gosod\",\"Install %s\":\"Gosod %s\",\"Install app\":\"Gosod ap\",\"Later\":\"Yn ddiweddarach\",\"Open in browser\":\"Agor yn y porwr\",\"Select %s from the menu that pops up.\":\"Dewiswch %s o\\'r ddewislen sy\\'n ymddangos.\",\"Tap %s\":\"Tapiwch %s\",\"Tap %s in the browser bar.\":\"Tapiwch %s yn y bar porwr.\",\"Tap %s in the toolbar.\":\"Tapiwch %s yn y bar offer.\",\"Tap the %s button above.\":\"Tapiwch y botwm %s uchod.\",\"Tap the %s button below to open your system browser.\":\"Tapiwch y botwm %s isod i agor eich porwr system.\",\"Tap the %s button in the toolbar.\":\"Tapiwch y botwm %s yn y bar offer.\",\"Tap the %s button in the upper right corner.\":\"Tapiwch y botwm %s yn y gornel dde uchaf.\",\"You may need to scroll down to find this menu item.\":\"Efallai y bydd angen i chi sgrolio i lawr i ddod o hyd i\\'r eitem ddewislen hon.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/cy.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"ホーム画面に追加","Add To Dock":"Dockに追加","An icon will be added to your Dock so you can quickly access this website.":"アイコンがDockに追加され、このウェブサイトをすばやくアクセスできます。","An icon will be added to your home screen so you can quickly access this website.":"アイコンがホーム画面に追加され、このウェブサイトをすばやくアクセスできます。","An icon will be added to your Taskbar so you can quickly access this website.":"アイコンがタスクバーに追加され、このウェブサイトをすばやくアクセスできます。","Install":"インストール","Install %s":"%sをインストール","Install app":"アプリをインストール","Later":"後で","Open in browser":"ブラウザで開く","Select %s from the menu that pops up.":"表示されるメニューから%sを選択してください。","Tap %s":"%sをタップ","Tap %s in the browser bar.":"ブラウザバーで表示される%sをタップ","Tap %s in the toolbar.":"ツールバーで表示される%sをタップ","Tap the %s button above.":"上の%sボタンをタップ","Tap the %s button below to open your system browser.":"下の%sボタンをタップしてシステムのブラウザを開きます。","Tap the %s button in the toolbar.":"ツールバーの%sボタンをタップ","Tap the %s button in the upper right corner.":"右上の%sボタンをタップ","You may need to scroll down to find this menu item.":"このメニュー項目を見つけるには、下にスクロールする必要があります。"}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/da.json":
/*!*****************************!*\
  !*** ./src/locales/da.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Føj til startskærm\",\"Add To Dock\":\"Føj til dok\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Et ikon vil blive tilføjet til din dok, så du hurtigt kan få adgang til denne app.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Et ikon vil blive tilføjet til din startskærm, så du hurtigt kan få adgang til denne app.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Et ikon vil blive tilføjet til din proceslinje, så du hurtigt kan få adgang til denne app.\",\"Install\":\"Installer\",\"Install %s\":\"Installer %s\",\"Install app\":\"Installer app\",\"Later\":\"Senere\",\"Open in browser\":\"Åbn i browser\",\"Select %s from the menu that pops up.\":\"Vælg %s fra menuen, der popper op.\",\"Tap %s\":\"Tryk på %s\",\"Tap %s in the browser bar.\":\"Tryk på %s i browserlinjen.\",\"Tap %s in the toolbar.\":\"Tryk på %s i værktøjslinjen.\",\"Tap the %s button above.\":\"Tryk på %s-knappen ovenfor.\",\"Tap the %s button below to open your system browser.\":\"Tryk på %s-knappen nedenfor for at åbne din systembrowser.\",\"Tap the %s button in the toolbar.\":\"Tryk på %s-knappen i værktøjslinjen.\",\"Tap the %s button in the upper right corner.\":\"Tryk på %s-knappen i øverste højre hjørne.\",\"You may need to scroll down to find this menu item.\":\"Du skal muligvis rulle ned for at finde dette menupunkt.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/da.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"홈 화면에 추가","Add To Dock":"Dock에 추가","An icon will be added to your Dock so you can quickly access this website.":"이 웹사이트에 빠르게 액세스할 수 있도록 Dock에 아이콘이 추가됩니다.","An icon will be added to your home screen so you can quickly access this website.":"이 웹사이트에 빠르게 액세스할 수 있도록 홈 화면에 아이콘이 추가됩니다.","An icon will be added to your Taskbar so you can quickly access this website.":"이 웹사이트에 빠르게 액세스할 수 있도록 작업 표시줄에 아이콘이 추가됩니다.","Install":"설치","Install %s":"%s 설치","Install app":"앱 설치","Later":"나중에","Open in browser":"브라우저에서 열기","Select %s from the menu that pops up.":"팝업 메뉴에서 %s을(를) 선택하세요.","Tap %s":"%s을(를) 탭하세요","Tap %s in the browser bar.":"브라우저 바에서 %s을(를) 탭하세요.","Tap %s in the toolbar.":"도구 모음에서 %s을(를) 탭하세요.","Tap the %s button above.":"위의 %s 버튼을 탭하세요.","Tap the %s button below to open your system browser.":"아래의 %s 버튼을 탭하여 시스템 브라우저를 여세요.","Tap the %s button in the toolbar.":"도구 모음에서 %s 버튼을 탭하세요.","Tap the %s button in the upper right corner.":"오른쪽 상단 모서리에서 %s 버튼을 탭하세요.","You may need to scroll down to find this menu item.":"이 메뉴 항목을 찾으려면 아래로 스크롤해야 할 수도 있습니다."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/de.json":
/*!*****************************!*\
  !*** ./src/locales/de.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Zum Startbildschirm hinzufügen\",\"Add To Dock\":\"Zum Dock hinzufügen\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Ein Symbol wird zu Ihrem Dock hinzugefügt, damit Sie schnell auf diese App zugreifen können.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Ein Symbol wird zu Ihrem Startbildschirm hinzugefügt, damit Sie schnell auf diese App zugreifen können.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Ein Symbol wird zu Ihrer Taskleiste hinzugefügt, damit Sie schnell auf diese App zugreifen können.\",\"Install\":\"Installieren\",\"Install %s\":\"%s installieren\",\"Install app\":\"App installieren\",\"Later\":\"Später\",\"Open in browser\":\"Im Browser öffnen\",\"Select %s from the menu that pops up.\":\"Wählen Sie %s aus dem Popup-Menü.\",\"Tap %s\":\"Tippen Sie auf %s\",\"Tap %s in the browser bar.\":\"Tippen Sie auf %s in der Browserleiste.\",\"Tap %s in the toolbar.\":\"Tippen Sie auf %s in der Werkzeugleiste.\",\"Tap the %s button above.\":\"Tippen Sie auf die %s-Schaltfläche oben.\",\"Tap the %s button below to open your system browser.\":\"Tippen Sie auf die %s-Schaltfläche unten, um Ihren Systembrowser zu öffnen.\",\"Tap the %s button in the toolbar.\":\"Tippen Sie auf die %s-Schaltfläche in der Werkzeugleiste.\",\"Tap the %s button in the upper right corner.\":\"Tippen Sie auf die %s-Schaltfläche in der oberen rechten Ecke.\",\"You may need to scroll down to find this menu item.\":\"Sie müssen möglicherweise nach unten scrollen, um diesen Menüpunkt zu finden.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/de.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Pievienot sākuma ekrānam","Add To Dock":"Pievienot Dock","An icon will be added to your Dock so you can quickly access this website.":"Ikona tiks pievienota jūsu Dock, lai jūs varētu ātri piekļūt šai vietnei.","An icon will be added to your home screen so you can quickly access this website.":"Ikona tiks pievienota jūsu sākuma ekrānam, lai jūs varētu ātri piekļūt šai vietnei.","An icon will be added to your Taskbar so you can quickly access this website.":"Ikona tiks pievienota jūsu uzdevumjoslai, lai jūs varētu ātri piekļūt šai vietnei.","Install":"Instalēt","Install %s":"Instalēt %s","Install app":"Instalēt lietotni","Later":"Vēlāk","Open in browser":"Atvērt pārlūkā","Select %s from the menu that pops up.":"Izvēlieties %s no uzlecošās izvēlnes.","Tap %s":"Pieskarieties %s","Tap %s in the browser bar.":"Pieskarieties %s pārlūka joslā.","Tap %s in the toolbar.":"Pieskarieties %s rīkjoslā.","Tap the %s button above.":"Pieskarieties pogai %s augstāk.","Tap the %s button below to open your system browser.":"Pieskarieties pogai %s zemāk, lai atvērtu sistēmas pārlūku.","Tap the %s button in the toolbar.":"Pieskarieties pogai %s rīkjoslā.","Tap the %s button in the upper right corner.":"Pieskarieties pogai %s augšējā labajā stūrī.","You may need to scroll down to find this menu item.":"Jums, iespējams, būs jāpārskrollē uz leju, lai atrastu šo izvēlnes vienumu."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/el.json":
/*!*****************************!*\
  !*** ./src/locales/el.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Προσθήκη στην αρχική οθόνη\",\"Add To Dock\":\"Προσθήκη στο Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Θα προστεθεί ένα εικονίδιο στο Dock σας για γρήγορη πρόσβαση σε αυτή την εφαρμογή.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Θα προστεθεί ένα εικονίδιο στην αρχική σας οθόνη για γρήγορη πρόσβαση σε αυτή την εφαρμογή.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Θα προστεθεί ένα εικονίδιο στη γραμμή εργασιών σας για γρήγορη πρόσβαση σε αυτή την εφαρμογή.\",\"Install\":\"Εγκατάσταση\",\"Install %s\":\"Εγκατάσταση %s\",\"Install app\":\"Εγκατάσταση εφαρμογής\",\"Later\":\"Αργότερα\",\"Open in browser\":\"Άνοιγμα στον περιηγητή\",\"Select %s from the menu that pops up.\":\"Επιλέξτε %s από το αναδυόμενο μενού.\",\"Tap %s\":\"Πατήστε %s\",\"Tap %s in the browser bar.\":\"Πατήστε %s στη γραμμή του περιηγητή.\",\"Tap %s in the toolbar.\":\"Πατήστε %s στη γραμμή εργαλείων.\",\"Tap the %s button above.\":\"Πατήστε το κουμπί %s παραπάνω.\",\"Tap the %s button below to open your system browser.\":\"Πατήστε το κουμπί %s παρακάτω για να ανοίξετε τον περιηγητή του συστήματός σας.\",\"Tap the %s button in the toolbar.\":\"Πατήστε το κουμπί %s στη γραμμή εργαλείων.\",\"Tap the %s button in the upper right corner.\":\"Πατήστε το κουμπί %s στην πάνω δεξιά γωνία.\",\"You may need to scroll down to find this menu item.\":\"Ίσως χρειαστεί να κάνετε κύλιση προς τα κάτω για να βρείτε αυτό το στοιχείο μενού.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/el.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Dodaj do ekranu głównego","Add To Dock":"Dodaj do Docka","An icon will be added to your Dock so you can quickly access this website.":"Ikona zostanie dodana do Docka, abyś mógł szybko uzyskać dostęp do tej strony.","An icon will be added to your home screen so you can quickly access this website.":"Ikona zostanie dodana do ekranu głównego, abyś mógł szybko uzyskać dostęp do tej strony.","An icon will be added to your Taskbar so you can quickly access this website.":"Ikona zostanie dodana do paska zadań, abyś mógł szybko uzyskać dostęp do tej strony.","Install":"Zainstaluj","Install %s":"Zainstaluj %s","Install app":"Zainstaluj aplikację","Later":"Później","Open in browser":"Otwórz w przeglądarce","Select %s from the menu that pops up.":"Wybierz %s z wyświetlonego menu.","Tap %s":"Stuknij %s","Tap %s in the browser bar.":"Stuknij %s w pasku przeglądarki.","Tap %s in the toolbar.":"Stuknij %s na pasku narzędzi.","Tap the %s button above.":"Stuknij przycisk %s powyżej.","Tap the %s button below to open your system browser.":"Stuknij przycisk %s poniżej, aby otworzyć przeglądarkę systemową.","Tap the %s button in the toolbar.":"Stuknij przycisk %s na pasku narzędzi.","Tap the %s button in the upper right corner.":"Stuknij przycisk %s w prawym górnym rogu.","You may need to scroll down to find this menu item.":"Możesz musieć przewinąć w dół, aby znaleźć tę pozycję w menu."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/en.json":
/*!*****************************!*\
  !*** ./src/locales/en.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Add to Home Screen\",\"Add To Dock\":\"Add To Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"An icon will be added to your Dock so you can quickly access this app.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"An icon will be added to your home screen so you can quickly access this app.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"An icon will be added to your Taskbar so you can quickly access this app.\",\"Install\":\"Install\",\"Install %s\":\"Install %s\",\"Install app\":\"Install app\",\"Later\":\"Later\",\"Open in browser\":\"Open in browser\",\"Select %s from the menu that pops up.\":\"Select %s from the menu that pops up.\",\"Tap %s\":\"Tap %s\",\"Tap %s in the browser bar.\":\"Tap %s in the browser bar.\",\"Tap %s in the toolbar.\":\"Tap %s in the toolbar.\",\"Tap the %s button above.\":\"Tap the %s button above.\",\"Tap the %s button below to open your system browser.\":\"Tap the %s button below to open your system browser.\",\"Tap the %s button in the toolbar.\":\"Tap the %s button in the toolbar.\",\"Tap the %s button in the upper right corner.\":\"Tap the %s button in the upper right corner.\",\"You may need to scroll down to find this menu item.\":\"You may need to scroll down to find this menu item.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/en.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Adicionar à Tela de Inicio","Add To Dock":"Adicionar à Dock","An icon will be added to your Dock so you can quickly access this website.":"Um ícone será adicionado à sua Dock para que você possa acessar rapidamente este site.","An icon will be added to your home screen so you can quickly access this website.":"Um ícone será adicionado à sua tela inicial para que você possa acessar rapidamente este site.","An icon will be added to your Taskbar so you can quickly access this website.":"Um ícone será adicionado à sua barra de tarefas para que você possa acessar rapidamente este site.","Install":"Instalar","Install %s":"Instalar %s","Install app":"Instalar aplicativo","Later":"Mais tarde","Open in browser":"Abrir no navegador","Select %s from the menu that pops up.":"Selecione %s no menu que aparece.","Tap %s":"Toque em %s","Tap %s in the browser bar.":"Toque em %s na barra do navegador.","Tap %s in the toolbar.":"Toque em %s na barra de ferramentas.","Tap the %s button above.":"Toque no botão %s acima.","Tap the %s button below to open your system browser.":"Toque no botão %s abaixo para abrir o navegador do sistema.","Tap the %s button in the toolbar.":"Toque no botão %s na barra de ferramentas.","Tap the %s button in the upper right corner.":"Toque no botão %s no canto superior direito.","You may need to scroll down to find this menu item.":"Você pode precisar rolar para baixo para encontrar este item do menu."}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/es.json":
/*!*****************************!*\
  !*** ./src/locales/es.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Añadir a pantalla de inicio\",\"Add To Dock\":\"Añadir al Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Se añadirá un icono a tu Dock para que puedas acceder rápidamente a esta aplicación.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Se añadirá un icono a tu pantalla de inicio para que puedas acceder rápidamente a esta aplicación.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Se añadirá un icono a tu barra de tareas para que puedas acceder rápidamente a esta aplicación.\",\"Install\":\"Instalar\",\"Install %s\":\"Instalar %s\",\"Install app\":\"Instalar aplicación\",\"Later\":\"Más tarde\",\"Open in browser\":\"Abrir en navegador\",\"Select %s from the menu that pops up.\":\"Selecciona %s del menú emergente.\",\"Tap %s\":\"Toca %s\",\"Tap %s in the browser bar.\":\"Toca %s en la barra del navegador.\",\"Tap %s in the toolbar.\":\"Toca %s en la barra de herramientas.\",\"Tap the %s button above.\":\"Toca el botón %s arriba.\",\"Tap the %s button below to open your system browser.\":\"Toca el botón %s abajo para abrir tu navegador del sistema.\",\"Tap the %s button in the toolbar.\":\"Toca el botón %s en la barra de herramientas.\",\"Tap the %s button in the upper right corner.\":\"Toca el botón %s en la esquina superior derecha.\",\"You may need to scroll down to find this menu item.\":\"Es posible que necesites desplazarte hacia abajo para encontrar este elemento del menú.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/es.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Добавить на главный экран","Add To Dock":"Добавить в док","An icon will be added to your Dock so you can quickly access this website.":"Значок будет добавлен в ваш док для быстрого доступа к этому веб-сайту.","An icon will be added to your home screen so you can quickly access this website.":"Значок будет добавлен на ваш главный экран для быстрого доступа к этому веб-сайту.","An icon will be added to your Taskbar so you can quickly access this website.":"Значок будет добавлен на вашу панель задач для быстрого доступа к этому веб-сайту.","Install":"Установить","Install %s":"Установить %s","Install app":"Установить приложение","Later":"Позже","Open in browser":"Открыть в браузере","Select %s from the menu that pops up.":"Выберите %s из появившегося меню.","Tap %s":"Нажмите %s","Tap %s in the browser bar.":"Нажмите %s в строке браузера.","Tap %s in the toolbar.":"Нажмите %s на панели инструментов.","Tap the %s button above.":"Нажмите кнопку %s выше.","Tap the %s button below to open your system browser.":"Нажмите кнопку %s ниже, чтобы открыть системный браузер.","Tap the %s button in the toolbar.":"Нажмите кнопку %s на панели инструментов.","Tap the %s button in the upper right corner.":"Нажмите кнопку %s в правом верхнем углу.","You may need to scroll down to find this menu item.":"Возможно, вам потребуется прокрутить вниз, чтобы найти этот пункт меню."}');

/***/ }),

/***/ 9:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"เพิ่มลงในหน้าจอโฮม","Add To Dock":"เพิ่มลงใน Dock","An icon will be added to your Dock so you can quickly access this website.":"ไอคอนจะถูกเพิ่มลงใน Dock เพื่อให้คุณสามารถเข้าถึงเว็บไซต์นี้ได้อย่างรวดเร็ว","An icon will be added to your home screen so you can quickly access this website.":"ไอคอนจะถูกเพิ่มลงในหน้าจอโฮมเพื่อให้คุณสามารถเข้าถึงเว็บไซต์นี้ได้อย่างรวดเร็ว","An icon will be added to your Taskbar so you can quickly access this website.":"ไอคอนจะถูกเพิ่มลงในทาสก์บาร์เพื่อให้คุณสามารถเข้าถึงเว็บไซต์นี้ได้อย่างรวดเร็ว","Install":"ติดตั้ง","Install %s":"ติดตั้ง %s","Install app":"ติดตั้งแอป","Later":"ภายหลัง","Open in browser":"เปิดในเบราว์เซอร์","Select %s from the menu that pops up.":"เลือก %s จากเมนูที่แสดงขึ้น","Tap %s":"แตะ %s","Tap %s in the browser bar.":"แตะ %s ในแถบเบราว์เซอร์","Tap %s in the toolbar.":"แตะ %s ในแถบเครื่องมือ","Tap the %s button above.":"แตะปุ่ม %s ด้านบน","Tap the %s button below to open your system browser.":"แตะปุ่ม %s ด้านล่างเพื่อเปิดเบราว์เซอร์ของระบบ","Tap the %s button in the toolbar.":"แตะปุ่ม %s ในแถบเครื่องมือ","Tap the %s button in the upper right corner.":"แตะปุ่ม %s ที่มุมบนขวา","You may need to scroll down to find this menu item.":"คุณอาจจะต้องเลื่อนลงเพื่อค้นหารายการเมนูนี้"}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/et.json":
/*!*****************************!*\
  !*** ./src/locales/et.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Lisa avakuvale\",\"Add To Dock\":\"Lisa dokki\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Teie dokki lisatakse ikoon, et saaksite kiiresti sellele rakendusele ligi pääseda.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Teie avakuvale lisatakse ikoon, et saaksite kiiresti sellele rakendusele ligi pääseda.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Teie tegumiribale lisatakse ikoon, et saaksite kiiresti sellele rakendusele ligi pääseda.\",\"Install\":\"Installi\",\"Install %s\":\"Installi %s\",\"Install app\":\"Installi rakendus\",\"Later\":\"Hiljem\",\"Open in browser\":\"Ava brauseris\",\"Select %s from the menu that pops up.\":\"Vali hüpikmenüüst %s.\",\"Tap %s\":\"Puuduta %s\",\"Tap %s in the browser bar.\":\"Puuduta brauseriribalt %s.\",\"Tap %s in the toolbar.\":\"Puuduta tööriistaribalt %s.\",\"Tap the %s button above.\":\"Puuduta ülal olevat %s nuppu.\",\"Tap the %s button below to open your system browser.\":\"Puuduta all olevat %s nuppu, et avada süsteemi brauser.\",\"Tap the %s button in the toolbar.\":\"Puuduta tööriistaribalt %s nuppu.\",\"Tap the %s button in the upper right corner.\":\"Puuduta paremas ülanurgas olevat %s nuppu.\",\"You may need to scroll down to find this menu item.\":\"Selle menüükirje leidmiseks võib olla vaja alla kerida.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/et.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"Thêm vào màn hình chính","Add To Dock":"Thêm vào Dock","An icon will be added to your Dock so you can quickly access this website.":"Một biểu tượng sẽ được thêm vào Dock của bạn để nhanh chóng truy cập website này.","An icon will be added to your home screen so you can quickly access this website.":"Một biểu tượng sẽ được thêm vào màn hình chính của bạn để nhanh chóng truy cập website này.","An icon will be added to your Taskbar so you can quickly access this website.":"Một biểu tượng sẽ được thêm thanh tác vụ của bạn để nhanh chóng truy cập website này.","Install":"Cài đặt","Install app":"Cài đặt ứng dụng","Later":"Để sau","Open in browser":"Mở trong trình duyệt","Select %s from the menu that pops up.":"Chọn %s từ menu đã hiển thị.","Tap %s":"Bấm %s","Tap %s in the browser bar.":"Bấm %s tại thanh trình duyệt.","Tap %s in the toolbar.":"Bấm %s tại thanh công cụ.","Tap the %s button above.":"Bấm nút %s phía trên.","Tap the %s button below to open your system browser.":"Bấm nút %s phía dưới để mở trình duyệt từ hệ thống.","Tap the %s button in the toolbar.":"Bấm nút %s tại thanh công cụ.","Tap the %s button in the upper right corner.":"Bấm nút %s tại góc phía trên bên phải.","You may need to scroll down to find this menu item.":"Bạn có thể cần phải cuộn xuống để tìm mục này."}');

/***/ }),

/***/ 538:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Add to Home Screen":"添加到主屏幕","Add To Dock":"添加到程序坞","An icon will be added to your Dock so you can quickly access this website.":"一个图标将被添加到你的程序坞，以便你可以快速访问这个网站。","An icon will be added to your home screen so you can quickly access this website.":"一个图标将被添加到你的主屏幕，以便你可以快速访问这个网站。","An icon will be added to your Taskbar so you can quickly access this website.":"一个图标将被添加到你的任务栏，以便你可以快速访问这个网站。","Install":"安装","Install %s":"安装 %s","Install app":"安装应用","Later":"稍后","Open in browser":"在浏览器中打开","Select %s from the menu that pops up.":"从弹出的菜单中选择 %s。","Tap %s":"点击 %s","Tap %s in the browser bar.":"在浏览器栏中点击 %s。","Tap %s in the toolbar.":"在工具栏中点击 %s。","Tap the %s button above.":"点击上面的 %s 按钮。","Tap the %s button below to open your system browser.":"点击下面的 %s 按钮以打开你的系统浏览器。","Tap the %s button in the toolbar.":"点击工具栏中的 %s 按钮。","Tap the %s button in the upper right corner.":"点击右上角的 %s 按钮。","You may need to scroll down to find this menu item.":"你可能需要向下滚动才能找到这个菜单项。"}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/fa.json":
/*!*****************************!*\
  !*** ./src/locales/fa.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"افزودن به صفحه اصلی\",\"Add To Dock\":\"افزودن به داک\",\"An icon will be added to your Dock so you can quickly access this website.\":\"یک نماد به داک شما اضافه می‌شود تا بتوانید به سرعت به این برنامه دسترسی پیدا کنید.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"یک نماد به صفحه اصلی شما اضافه می‌شود تا بتوانید به سرعت به این برنامه دسترسی پیدا کنید.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"یک نماد به نوار وظیفه شما اضافه می‌شود تا بتوانید به سرعت به این برنامه دسترسی پیدا کنید.\",\"Install\":\"نصب\",\"Install %s\":\"نصب %s\",\"Install app\":\"نصب برنامه\",\"Later\":\"بعداً\",\"Open in browser\":\"باز کردن در مرورگر\",\"Select %s from the menu that pops up.\":\"%s را از منوی بازشو انتخاب کنید.\",\"Tap %s\":\"روی %s ضربه بزنید\",\"Tap %s in the browser bar.\":\"در نوار مرورگر روی %s ضربه بزنید.\",\"Tap %s in the toolbar.\":\"در نوار ابزار روی %s ضربه بزنید.\",\"Tap the %s button above.\":\"روی دکمه %s در بالا ضربه بزنید.\",\"Tap the %s button below to open your system browser.\":\"برای باز کردن مرورگر سیستم خود، روی دکمه %s در پایین ضربه بزنید.\",\"Tap the %s button in the toolbar.\":\"روی دکمه %s در نوار ابزار ضربه بزنید.\",\"Tap the %s button in the upper right corner.\":\"روی دکمه %s در گوشه بالا سمت راست ضربه بزنید.\",\"You may need to scroll down to find this menu item.\":\"ممکن است برای پیدا کردن این گزینه منو نیاز به پیمایش به پایین داشته باشید.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/fa.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"添加到主屏幕","Add To Dock":"添加到程序坞","An icon will be added to your Dock so you can quickly access this website.":"一个图标将被添加到你的程序坞，以便你可以快速访问这个网站。","An icon will be added to your home screen so you can quickly access this website.":"一个图标将被添加到你的主屏幕，以便你可以快速访问这个网站。","An icon will be added to your Taskbar so you can quickly access this website.":"一个图标将被添加到你的任务栏，以便你可以快速访问这个网站。","Install":"安装","Install %s":"安装 %s","Install app":"安装应用","Later":"稍后","Open in browser":"在浏览器中打开","Select %s from the menu that pops up.":"从弹出的菜单中选择 %s。","Tap %s":"点击 %s","Tap %s in the browser bar.":"在浏览器栏中点击 %s。","Tap %s in the toolbar.":"在工具栏中点击 %s。","Tap the %s button above.":"点击上面的 %s 按钮。","Tap the %s button below to open your system browser.":"点击下面的 %s 按钮以打开你的系统浏览器。","Tap the %s button in the toolbar.":"点击工具栏中的 %s 按钮。","Tap the %s button in the upper right corner.":"点击右上角的 %s 按钮。","You may need to scroll down to find this menu item.":"你可能需要向下滚动才能找到这个菜单项。"}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/fi.json":
/*!*****************************!*\
  !*** ./src/locales/fi.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Lisää kotinäyttöön\",\"Add To Dock\":\"Lisää telakkaan\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Kuvake lisätään telakkaasi, jotta voit käyttää tätä sovellusta nopeasti.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Kuvake lisätään kotinäytöllesi, jotta voit käyttää tätä sovellusta nopeasti.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Kuvake lisätään tehtäväpalkkiisi, jotta voit käyttää tätä sovellusta nopeasti.\",\"Install\":\"Asenna\",\"Install %s\":\"Asenna %s\",\"Install app\":\"Asenna sovellus\",\"Later\":\"Myöhemmin\",\"Open in browser\":\"Avaa selaimessa\",\"Select %s from the menu that pops up.\":\"Valitse %s esiin tulevasta valikosta.\",\"Tap %s\":\"Napauta %s\",\"Tap %s in the browser bar.\":\"Napauta %s selaimen palkissa.\",\"Tap %s in the toolbar.\":\"Napauta %s työkalupalkissa.\",\"Tap the %s button above.\":\"Napauta yllä olevaa %s-painiketta.\",\"Tap the %s button below to open your system browser.\":\"Napauta alla olevaa %s-painiketta avataksesi järjestelmäselaimen.\",\"Tap the %s button in the toolbar.\":\"Napauta %s-painiketta työkalupalkissa.\",\"Tap the %s button in the upper right corner.\":\"Napauta %s-painiketta oikeassa yläkulmassa.\",\"You may need to scroll down to find this menu item.\":\"Saatat joutua vierittämään alas löytääksesi tämän valikkokohdan.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/fi.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"加入主畫面","Add To Dock":"加入程序塢","An icon will be added to your Dock so you can quickly access this website.":"一個圖示將被加入你的程序塢，以便你可以快速存取這個網站。","An icon will be added to your home screen so you can quickly access this website.":"一個圖示將被加入你的主畫面，以便你可以快速存取這個網站。","An icon will be added to your Taskbar so you can quickly access this website.":"一個圖示將被加入你的工作列，以便你可以快速存取這個網站。","Install":"安裝","Install %s":"安裝 %s","Install app":"安裝應用程式","Later":"稍後","Open in browser":"在瀏覽器中打開","Select %s from the menu that pops up.":"從彈出的選單中選擇 %s。","Tap %s":"點擊 %s","Tap %s in the browser bar.":"在瀏覽器欄中點擊 %s。","Tap %s in the toolbar.":"在工具列中點擊 %s。","Tap the %s button above.":"點擊上面的 %s 按鈕。","Tap the %s button below to open your system browser.":"點擊下面的 %s 按鈕以打開你的系統瀏覽器。","Tap the %s button in the toolbar.":"點擊工具列中的 %s 按鈕。","Tap the %s button in the upper right corner.":"點擊右上角的 %s 按鈕。","You may need to scroll down to find this menu item.":"你可能需要向下捲動才能找到這個菜單項目。"}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

/***/ }),

/***/ "./src/locales/fr.json":
/*!*****************************!*\
  !*** ./src/locales/fr.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
<<<<<<< HEAD
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Ajouter à l\\'écran d\\'accueil\",\"Add To Dock\":\"Ajouter au Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Une icône sera ajoutée à votre Dock pour accéder rapidement à cette application.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Une icône sera ajoutée à votre écran d\\'accueil pour accéder rapidement à cette application.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Une icône sera ajoutée à votre barre des tâches pour accéder rapidement à cette application.\",\"Install\":\"Installer\",\"Install %s\":\"Installer %s\",\"Install app\":\"Installer l\\'application\",\"Later\":\"Plus tard\",\"Open in browser\":\"Ouvrir dans le navigateur\",\"Select %s from the menu that pops up.\":\"Sélectionnez %s dans le menu qui apparaît.\",\"Tap %s\":\"Appuyez sur %s\",\"Tap %s in the browser bar.\":\"Appuyez sur %s dans la barre du navigateur.\",\"Tap %s in the toolbar.\":\"Appuyez sur %s dans la barre d\\'outils.\",\"Tap the %s button above.\":\"Appuyez sur le bouton %s ci-dessus.\",\"Tap the %s button below to open your system browser.\":\"Appuyez sur le bouton %s ci-dessous pour ouvrir votre navigateur système.\",\"Tap the %s button in the toolbar.\":\"Appuyez sur le bouton %s dans la barre d\\'outils.\",\"Tap the %s button in the upper right corner.\":\"Appuyez sur le bouton %s dans le coin supérieur droit.\",\"You may need to scroll down to find this menu item.\":\"Vous devrez peut-être faire défiler vers le bas pour trouver cet élément du menu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/fr.json?");

/***/ }),

/***/ "./src/locales/ga.json":
/*!*****************************!*\
  !*** ./src/locales/ga.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Cuir leis an Scáileán Baile\",\"Add To Dock\":\"Cuir leis an Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Cuirfear deilbhín le do Dock ionas gur féidir leat teacht ar an aip seo go tapa.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Cuirfear deilbhín le do scáileán baile ionas gur féidir leat teacht ar an aip seo go tapa.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Cuirfear deilbhín le do bharra tascanna ionas gur féidir leat teacht ar an aip seo go tapa.\",\"Install\":\"Suiteáil\",\"Install %s\":\"Suiteáil %s\",\"Install app\":\"Suiteáil an aip\",\"Later\":\"Níos déanaí\",\"Open in browser\":\"Oscail sa bhrabhsálaí\",\"Select %s from the menu that pops up.\":\"Roghnaigh %s ón roghchlár aníos.\",\"Tap %s\":\"Tapáil %s\",\"Tap %s in the browser bar.\":\"Tapáil %s sa bharra brabhsálaí.\",\"Tap %s in the toolbar.\":\"Tapáil %s sa bharra uirlisí.\",\"Tap the %s button above.\":\"Tapáil an cnaipe %s thuas.\",\"Tap the %s button below to open your system browser.\":\"Tapáil an cnaipe %s thíos chun do bhrabhsálaí córais a oscailt.\",\"Tap the %s button in the toolbar.\":\"Tapáil an cnaipe %s sa bharra uirlisí.\",\"Tap the %s button in the upper right corner.\":\"Tapáil an cnaipe %s sa chúinne uachtarach ar dheis.\",\"You may need to scroll down to find this menu item.\":\"B\\'fhéidir go mbeidh ort scrollú síos chun an mhír roghchláir seo a aimsiú.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ga.json?");

/***/ }),

/***/ "./src/locales/he.json":
/*!*****************************!*\
  !*** ./src/locales/he.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"הוסף למסך הבית\",\"Add To Dock\":\"הוסף לדוק\",\"An icon will be added to your Dock so you can quickly access this website.\":\"סמל יתווסף לדוק שלך כדי שתוכל לגשת במהירות לאפליקציה זו.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"סמל יתווסף למסך הבית שלך כדי שתוכל לגשת במהירות לאפליקציה זו.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"סמל יתווסף לשורת המשימות שלך כדי שתוכל לגשת במהירות לאפליקציה זו.\",\"Install\":\"התקן\",\"Install %s\":\"התקן את %s\",\"Install app\":\"התקן אפליקציה\",\"Later\":\"מאוחר יותר\",\"Open in browser\":\"פתח בדפדפן\",\"Select %s from the menu that pops up.\":\"בחר %s מהתפריט הקופץ.\",\"Tap %s\":\"הקש על %s\",\"Tap %s in the browser bar.\":\"הקש על %s בשורת הדפדפן.\",\"Tap %s in the toolbar.\":\"הקש על %s בסרגל הכלים.\",\"Tap the %s button above.\":\"הקש על הכפתור %s למעלה.\",\"Tap the %s button below to open your system browser.\":\"הקש על הכפתור %s למטה כדי לפתוח את דפדפן המערכת שלך.\",\"Tap the %s button in the toolbar.\":\"הקש על הכפתור %s בסרגל הכלים.\",\"Tap the %s button in the upper right corner.\":\"הקש על הכפתור %s בפינה השמאלית העליונה.\",\"You may need to scroll down to find this menu item.\":\"ייתכן שתצטרך לגלול למטה כדי למצוא את פריט התפריט הזה.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/he.json?");

/***/ }),

/***/ "./src/locales/hi.json":
/*!*****************************!*\
  !*** ./src/locales/hi.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"होम स्क्रीन में जोड़ें\",\"Add To Dock\":\"डॉक में जोड़ें\",\"An icon will be added to your Dock so you can quickly access this website.\":\"आपके डॉक में एक आइकन जोड़ा जाएगा ताकि आप इस ऐप को जल्दी से एक्सेस कर सकें।\",\"An icon will be added to your home screen so you can quickly access this website.\":\"आपकी होम स्क्रीन में एक आइकन जोड़ा जाएगा ताकि आप इस ऐप को जल्दी से एक्सेस कर सकें।\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"आपके टास्कबार में एक आइकन जोड़ा जाएगा ताकि आप इस ऐप को जल्दी से एक्सेस कर सकें।\",\"Install\":\"इंस्टॉल करें\",\"Install %s\":\"%s इंस्टॉल करें\",\"Install app\":\"ऐप इंस्टॉल करें\",\"Later\":\"बाद में\",\"Open in browser\":\"ब्राउज़र में खोलें\",\"Select %s from the menu that pops up.\":\"पॉप अप मेनू से %s चुनें।\",\"Tap %s\":\"%s पर टैप करें\",\"Tap %s in the browser bar.\":\"ब्राउज़र बार में %s पर टैप करें।\",\"Tap %s in the toolbar.\":\"टूलबार में %s पर टैप करें।\",\"Tap the %s button above.\":\"ऊपर दिए गए %s बटन पर टैप करें।\",\"Tap the %s button below to open your system browser.\":\"अपना सिस्टम ब्राउज़र खोलने के लिए नीचे दिए गए %s बटन पर टैप करें।\",\"Tap the %s button in the toolbar.\":\"टूलबार में %s बटन पर टैप करें।\",\"Tap the %s button in the upper right corner.\":\"ऊपरी दाएं कोने में %s बटन पर टैप करें।\",\"You may need to scroll down to find this menu item.\":\"इस मेनू आइटम को खोजने के लिए आपको नीचे स्क्रॉल करना पड़ सकता है।\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/hi.json?");

/***/ }),

/***/ "./src/locales/hr.json":
/*!*****************************!*\
  !*** ./src/locales/hr.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Dodaj na početni zaslon\",\"Add To Dock\":\"Dodaj u Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Ikona će biti dodana u vaš Dock za brzi pristup ovoj aplikaciji.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Ikona će biti dodana na vaš početni zaslon za brzi pristup ovoj aplikaciji.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Ikona će biti dodana na vašu programsku traku za brzi pristup ovoj aplikaciji.\",\"Install\":\"Instaliraj\",\"Install %s\":\"Instaliraj %s\",\"Install app\":\"Instaliraj aplikaciju\",\"Later\":\"Kasnije\",\"Open in browser\":\"Otvori u pregledniku\",\"Select %s from the menu that pops up.\":\"Odaberite %s iz skočnog izbornika.\",\"Tap %s\":\"Dodirnite %s\",\"Tap %s in the browser bar.\":\"Dodirnite %s u traci preglednika.\",\"Tap %s in the toolbar.\":\"Dodirnite %s u alatnoj traci.\",\"Tap the %s button above.\":\"Dodirnite gumb %s iznad.\",\"Tap the %s button below to open your system browser.\":\"Dodirnite gumb %s ispod za otvaranje sistemskog preglednika.\",\"Tap the %s button in the toolbar.\":\"Dodirnite gumb %s u alatnoj traci.\",\"Tap the %s button in the upper right corner.\":\"Dodirnite gumb %s u gornjem desnom kutu.\",\"You may need to scroll down to find this menu item.\":\"Možda ćete se trebati pomaknuti prema dolje da biste pronašli ovu stavku izbornika.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/hr.json?");

/***/ }),

/***/ "./src/locales/hu.json":
/*!*****************************!*\
  !*** ./src/locales/hu.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Hozzáadás a kezdőképernyőhöz\",\"Add To Dock\":\"Hozzáadás a Dockhoz\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Egy ikon kerül a Dockba, hogy gyorsan hozzáférhessen ehhez az alkalmazáshoz.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Egy ikon kerül a kezdőképernyőre, hogy gyorsan hozzáférhessen ehhez az alkalmazáshoz.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Egy ikon kerül a tálcára, hogy gyorsan hozzáférhessen ehhez az alkalmazáshoz.\",\"Install\":\"Telepítés\",\"Install %s\":\"%s telepítése\",\"Install app\":\"Alkalmazás telepítése\",\"Later\":\"Később\",\"Open in browser\":\"Megnyitás böngészőben\",\"Select %s from the menu that pops up.\":\"Válassza ki a %s elemet az előugró menüből.\",\"Tap %s\":\"Koppintson a(z) %s elemre\",\"Tap %s in the browser bar.\":\"Koppintson a(z) %s elemre a böngésző sávjában.\",\"Tap %s in the toolbar.\":\"Koppintson a(z) %s elemre az eszköztárban.\",\"Tap the %s button above.\":\"Koppintson a fenti %s gombra.\",\"Tap the %s button below to open your system browser.\":\"Koppintson az alábbi %s gombra a rendszerböngésző megnyitásához.\",\"Tap the %s button in the toolbar.\":\"Koppintson a(z) %s gombra az eszköztárban.\",\"Tap the %s button in the upper right corner.\":\"Koppintson a(z) %s gombra a jobb felső sarokban.\",\"You may need to scroll down to find this menu item.\":\"Lehet, hogy le kell görgetnie, hogy megtalálja ezt a menüelemet.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/hu.json?");

/***/ }),

/***/ "./src/locales/hy.json":
/*!*****************************!*\
  !*** ./src/locales/hy.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Ավելացնել հիմնական էկրանին\",\"Add To Dock\":\"Ավելացնել Dock-ում\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Պատկերակ կավելացվի ձեր Dock-ում, որպեսզի կարողանաք արագ մուտք գործել այս հավելված:\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Պատկերակ կավելացվի ձեր հիմնական էկրանին, որպեսզի կարողանաք արագ մուտք գործել այս հավելված:\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Պատկերակ կավելացվի ձեր առաջադրանքների գոտում, որպեսզի կարողանաք արագ մուտք գործել այս հավելված:\",\"Install\":\"Տեղադրել\",\"Install %s\":\"Տեղադրել %s\",\"Install app\":\"Տեղադրել հավելվածը\",\"Later\":\"Ավելի ուշ\",\"Open in browser\":\"Բացել դիտարկիչում\",\"Select %s from the menu that pops up.\":\"Ընտրեք %s հայտնվող ընտրացանկից:\",\"Tap %s\":\"Հպեք %s\",\"Tap %s in the browser bar.\":\"Հպեք %s դիտարկիչի գոտում:\",\"Tap %s in the toolbar.\":\"Հպեք %s գործիքագոտում:\",\"Tap the %s button above.\":\"Հպեք %s կոճակին վերևում:\",\"Tap the %s button below to open your system browser.\":\"Հպեք %s կոճակին ներքևում՝ համակարգային դիտարկիչը բացելու համար:\",\"Tap the %s button in the toolbar.\":\"Հպեք %s կոճակին գործիքագոտում:\",\"Tap the %s button in the upper right corner.\":\"Հպեք %s կոճակին վերին աջ անկյունում:\",\"You may need to scroll down to find this menu item.\":\"Հնարավոր է՝ պետք լինի ներքև գլորել՝ այս ընտրացանկի տարրը գտնելու համար:\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/hy.json?");

/***/ }),

/***/ "./src/locales/id.json":
/*!*****************************!*\
  !*** ./src/locales/id.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Tambahkan ke Layar Utama\",\"Add To Dock\":\"Tambahkan ke Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Ikon akan ditambahkan ke Dock Anda agar Anda dapat mengakses aplikasi ini dengan cepat.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Ikon akan ditambahkan ke layar utama Anda agar Anda dapat mengakses aplikasi ini dengan cepat.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Ikon akan ditambahkan ke Taskbar Anda agar Anda dapat mengakses aplikasi ini dengan cepat.\",\"Install\":\"Pasang\",\"Install %s\":\"Pasang %s\",\"Install app\":\"Pasang aplikasi\",\"Later\":\"Nanti\",\"Open in browser\":\"Buka di peramban\",\"Select %s from the menu that pops up.\":\"Pilih %s dari menu yang muncul.\",\"Tap %s\":\"Ketuk %s\",\"Tap %s in the browser bar.\":\"Ketuk %s di bilah peramban.\",\"Tap %s in the toolbar.\":\"Ketuk %s di bilah alat.\",\"Tap the %s button above.\":\"Ketuk tombol %s di atas.\",\"Tap the %s button below to open your system browser.\":\"Ketuk tombol %s di bawah untuk membuka peramban sistem Anda.\",\"Tap the %s button in the toolbar.\":\"Ketuk tombol %s di bilah alat.\",\"Tap the %s button in the upper right corner.\":\"Ketuk tombol %s di pojok kanan atas.\",\"You may need to scroll down to find this menu item.\":\"Anda mungkin perlu menggulir ke bawah untuk menemukan item menu ini.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/id.json?");

/***/ }),

/***/ "./src/locales/is.json":
/*!*****************************!*\
  !*** ./src/locales/is.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Bæta við upphafsskjá\",\"Add To Dock\":\"Bæta við dokku\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Táknmynd verður bætt við dokkuna þína svo þú getir fljótt nálgast þetta forrit.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Táknmynd verður bætt við upphafsskjáinn þinn svo þú getir fljótt nálgast þetta forrit.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Táknmynd verður bætt við verkefnastikuna þína svo þú getir fljótt nálgast þetta forrit.\",\"Install\":\"Setja upp\",\"Install %s\":\"Setja upp %s\",\"Install app\":\"Setja upp forrit\",\"Later\":\"Seinna\",\"Open in browser\":\"Opna í vafra\",\"Select %s from the menu that pops up.\":\"Veldu %s úr valmyndinni sem birtist.\",\"Tap %s\":\"Ýttu á %s\",\"Tap %s in the browser bar.\":\"Ýttu á %s í vafrastikunni.\",\"Tap %s in the toolbar.\":\"Ýttu á %s í tólastikunni.\",\"Tap the %s button above.\":\"Ýttu á %s hnappinn hér fyrir ofan.\",\"Tap the %s button below to open your system browser.\":\"Ýttu á %s hnappinn hér fyrir neðan til að opna kerfisvafrann þinn.\",\"Tap the %s button in the toolbar.\":\"Ýttu á %s hnappinn í tólastikunni.\",\"Tap the %s button in the upper right corner.\":\"Ýttu á %s hnappinn efst í hægra horni.\",\"You may need to scroll down to find this menu item.\":\"Þú gætir þurft að skruna niður til að finna þennan valmyndarhlut.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/is.json?");

/***/ }),

/***/ "./src/locales/it.json":
/*!*****************************!*\
  !*** ./src/locales/it.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Aggiungi alla schermata Home\",\"Add To Dock\":\"Aggiungi al Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Un\\'icona verrà aggiunta al Dock per accedere rapidamente a questa applicazione.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Un\\'icona verrà aggiunta alla schermata Home per accedere rapidamente a questa applicazione.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Un\\'icona verrà aggiunta alla barra delle applicazioni per accedere rapidamente a questa applicazione.\",\"Install\":\"Installa\",\"Install %s\":\"Installa %s\",\"Install app\":\"Installa applicazione\",\"Later\":\"Più tardi\",\"Open in browser\":\"Apri nel browser\",\"Select %s from the menu that pops up.\":\"Seleziona %s dal menu a comparsa.\",\"Tap %s\":\"Tocca %s\",\"Tap %s in the browser bar.\":\"Tocca %s nella barra del browser.\",\"Tap %s in the toolbar.\":\"Tocca %s nella barra degli strumenti.\",\"Tap the %s button above.\":\"Tocca il pulsante %s sopra.\",\"Tap the %s button below to open your system browser.\":\"Tocca il pulsante %s sotto per aprire il browser di sistema.\",\"Tap the %s button in the toolbar.\":\"Tocca il pulsante %s nella barra degli strumenti.\",\"Tap the %s button in the upper right corner.\":\"Tocca il pulsante %s nell\\'angolo in alto a destra.\",\"You may need to scroll down to find this menu item.\":\"Potrebbe essere necessario scorrere verso il basso per trovare questa voce del menu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/it.json?");

/***/ }),

/***/ "./src/locales/ja.json":
/*!*****************************!*\
  !*** ./src/locales/ja.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"ホーム画面に追加\",\"Add To Dock\":\"Dockに追加\",\"An icon will be added to your Dock so you can quickly access this website.\":\"このアプリにすばやくアクセスできるように、Dockにアイコンが追加されます。\",\"An icon will be added to your home screen so you can quickly access this website.\":\"このアプリにすばやくアクセスできるように、ホーム画面にアイコンが追加されます。\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"このアプリにすばやくアクセスできるように、タスクバーにアイコンが追加されます。\",\"Install\":\"インストール\",\"Install %s\":\"%sをインストール\",\"Install app\":\"アプリをインストール\",\"Later\":\"後で\",\"Open in browser\":\"ブラウザで開く\",\"Select %s from the menu that pops up.\":\"ポップアップメニューから%sを選択します。\",\"Tap %s\":\"%sをタップ\",\"Tap %s in the browser bar.\":\"ブラウザバーの%sをタップします。\",\"Tap %s in the toolbar.\":\"ツールバーの%sをタップします。\",\"Tap the %s button above.\":\"上の%sボタンをタップします。\",\"Tap the %s button below to open your system browser.\":\"下の%sボタンをタップしてシステムブラウザを開きます。\",\"Tap the %s button in the toolbar.\":\"ツールバーの%sボタンをタップします。\",\"Tap the %s button in the upper right corner.\":\"右上隅の%sボタンをタップします。\",\"You may need to scroll down to find this menu item.\":\"このメニュー項目を見つけるには、下にスクロールする必要があるかもしれません。\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ja.json?");

/***/ }),

/***/ "./src/locales/ka.json":
/*!*****************************!*\
  !*** ./src/locales/ka.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"მთავარ ეკრანზე დამატება\",\"Add To Dock\":\"Dock-ში დამატება\",\"An icon will be added to your Dock so you can quickly access this website.\":\"თქვენს Dock-ში დაემატება ხატულა, რათა ამ აპლიკაციაზე სწრაფად გქონდეთ წვდომა.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"თქვენს მთავარ ეკრანზე დაემატება ხატულა, რათა ამ აპლიკაციაზე სწრაფად გქონდეთ წვდომა.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"თქვენს დავალებათა ზოლში დაემატება ხატულა, რათა ამ აპლიკაციაზე სწრაფად გქონდეთ წვდომა.\",\"Install\":\"დაინსტალირება\",\"Install %s\":\"%s-ის დაინსტალირება\",\"Install app\":\"აპლიკაციის დაინსტალირება\",\"Later\":\"მოგვიანებით\",\"Open in browser\":\"ბრაუზერში გახსნა\",\"Select %s from the menu that pops up.\":\"ამომხტარი მენიუდან აირჩიეთ %s.\",\"Tap %s\":\"შეეხეთ %s-ს\",\"Tap %s in the browser bar.\":\"ბრაუზერის ზოლში შეეხეთ %s-ს.\",\"Tap %s in the toolbar.\":\"ხელსაწყოთა ზოლში შეეხეთ %s-ს.\",\"Tap the %s button above.\":\"შეეხეთ %s ღილაკს ზემოთ.\",\"Tap the %s button below to open your system browser.\":\"სისტემური ბრაუზერის გასახსნელად შეეხეთ %s ღილაკს ქვემოთ.\",\"Tap the %s button in the toolbar.\":\"ხელსაწყოთა ზოლში შეეხეთ %s ღილაკს.\",\"Tap the %s button in the upper right corner.\":\"ზედა მარჯვენა კუთხეში შეეხეთ %s ღილაკს.\",\"You may need to scroll down to find this menu item.\":\"ამ მენიუს ელემენტის საპოვნელად შეიძლება ქვემოთ ჩამოგორება დაგჭირდეთ.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ka.json?");

/***/ }),

/***/ "./src/locales/kk.json":
/*!*****************************!*\
  !*** ./src/locales/kk.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Негізгі экранға қосу\",\"Add To Dock\":\"Dock-қа қосу\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Бұл қолданбаға жылдам қол жеткізу үшін Dock-қа белгіше қосылады.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Бұл қолданбаға жылдам қол жеткізу үшін негізгі экранға белгіше қосылады.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Бұл қолданбаға жылдам қол жеткізу үшін тапсырмалар тақтасына белгіше қосылады.\",\"Install\":\"Орнату\",\"Install %s\":\"%s орнату\",\"Install app\":\"Қолданбаны орнату\",\"Later\":\"Кейінірек\",\"Open in browser\":\"Браузерде ашу\",\"Select %s from the menu that pops up.\":\"Қалқымалы мәзірден %s таңдаңыз.\",\"Tap %s\":\"%s түртіңіз\",\"Tap %s in the browser bar.\":\"Браузер жолағында %s түртіңіз.\",\"Tap %s in the toolbar.\":\"Құралдар тақтасында %s түртіңіз.\",\"Tap the %s button above.\":\"Жоғарыдағы %s түймесін түртіңіз.\",\"Tap the %s button below to open your system browser.\":\"Жүйелік браузерді ашу үшін төмендегі %s түймесін түртіңіз.\",\"Tap the %s button in the toolbar.\":\"Құралдар тақтасында %s түймесін түртіңіз.\",\"Tap the %s button in the upper right corner.\":\"Жоғарғы оң жақ бұрыштағы %s түймесін түртіңіз.\",\"You may need to scroll down to find this menu item.\":\"Бұл мәзір элементін табу үшін төмен жылжыту қажет болуы мүмкін.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/kk.json?");

/***/ }),

/***/ "./src/locales/ko.json":
/*!*****************************!*\
  !*** ./src/locales/ko.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"홈 화면에 추가\",\"Add To Dock\":\"Dock에 추가\",\"An icon will be added to your Dock so you can quickly access this website.\":\"이 앱에 빠르게 접근할 수 있도록 Dock에 아이콘이 추가됩니다.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"이 앱에 빠르게 접근할 수 있도록 홈 화면에 아이콘이 추가됩니다.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"이 앱에 빠르게 접근할 수 있도록 작업 표시줄에 아이콘이 추가됩니다.\",\"Install\":\"설치\",\"Install %s\":\"%s 설치\",\"Install app\":\"앱 설치\",\"Later\":\"나중에\",\"Open in browser\":\"브라우저에서 열기\",\"Select %s from the menu that pops up.\":\"팝업 메뉴에서 %s을(를) 선택하세요.\",\"Tap %s\":\"%s 탭하기\",\"Tap %s in the browser bar.\":\"브라우저 바에서 %s을(를) 탭하세요.\",\"Tap %s in the toolbar.\":\"도구 모음에서 %s을(를) 탭하세요.\",\"Tap the %s button above.\":\"위의 %s 버튼을 탭하세요.\",\"Tap the %s button below to open your system browser.\":\"시스템 브라우저를 열려면 아래의 %s 버튼을 탭하세요.\",\"Tap the %s button in the toolbar.\":\"도구 모음의 %s 버튼을 탭하세요.\",\"Tap the %s button in the upper right corner.\":\"오른쪽 상단 모서리의 %s 버튼을 탭하세요.\",\"You may need to scroll down to find this menu item.\":\"이 메뉴 항목을 찾으려면 아래로 스크롤해야 할 수 있습니다.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ko.json?");

/***/ }),

/***/ "./src/locales/ky.json":
/*!*****************************!*\
  !*** ./src/locales/ky.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Башкы экранга кошуу\",\"Add To Dock\":\"Докко кошуу\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Бул колдонмого тез жетүү үчүн докко сүрөтчө кошулат.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Бул колдонмого тез жетүү үчүн башкы экранга сүрөтчө кошулат.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Бул колдонмого тез жетүү үчүн тапшырмалар тилкесине сүрөтчө кошулат.\",\"Install\":\"Орнотуу\",\"Install %s\":\"%s орнотуу\",\"Install app\":\"Колдонмону орнотуу\",\"Later\":\"Кийинчерээк\",\"Open in browser\":\"Браузерде ачуу\",\"Select %s from the menu that pops up.\":\"Чыккан менюдан %s тандаңыз.\",\"Tap %s\":\"%s басыңыз\",\"Tap %s in the browser bar.\":\"Браузер тилкесиндеги %s басыңыз.\",\"Tap %s in the toolbar.\":\"Аспаптар тилкесиндеги %s басыңыз.\",\"Tap the %s button above.\":\"Жогорудагы %s баскычын басыңыз.\",\"Tap the %s button below to open your system browser.\":\"Тутум браузерин ачуу үчүн төмөндөгү %s баскычын басыңыз.\",\"Tap the %s button in the toolbar.\":\"Аспаптар тилкесиндеги %s баскычын басыңыз.\",\"Tap the %s button in the upper right corner.\":\"Жогорку оң бурчтагы %s баскычын басыңыз.\",\"You may need to scroll down to find this menu item.\":\"Бул меню элементин табуу үчүн төмөн сыдыруу керек болушу мүмкүн.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ky.json?");

/***/ }),

/***/ "./src/locales/lb.json":
/*!*****************************!*\
  !*** ./src/locales/lb.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Op Startschierm dobäisetzen\",\"Add To Dock\":\"Bei Dock dobäisetzen\",\"An icon will be added to your Dock so you can quickly access this website.\":\"En Icon gëtt bei Ärem Dock dobäigesat fir séier op dës App zougräifen ze kënnen.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"En Icon gëtt bei Ärem Startschierm dobäigesat fir séier op dës App zougräifen ze kënnen.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"En Icon gëtt bei Ärer Taskleescht dobäigesat fir séier op dës App zougräifen ze kënnen.\",\"Install\":\"Installéieren\",\"Install %s\":\"%s installéieren\",\"Install app\":\"App installéieren\",\"Later\":\"Méi spéit\",\"Open in browser\":\"Am Browser opmaachen\",\"Select %s from the menu that pops up.\":\"Wielt %s aus dem Popup-Menü aus.\",\"Tap %s\":\"Tippt op %s\",\"Tap %s in the browser bar.\":\"Tippt op %s an der Browser-Bar.\",\"Tap %s in the toolbar.\":\"Tippt op %s an der Toolbar.\",\"Tap the %s button above.\":\"Tippt uewen op de %s Knäppchen.\",\"Tap the %s button below to open your system browser.\":\"Tippt ënnen op de %s Knäppchen fir Äre System-Browser opzemaachen.\",\"Tap the %s button in the toolbar.\":\"Tippt op de %s Knäppchen an der Toolbar.\",\"Tap the %s button in the upper right corner.\":\"Tippt op de %s Knäppchen uewe riets.\",\"You may need to scroll down to find this menu item.\":\"Dir musst eventuell no ënne scrollen fir dëse Menüpunkt ze fannen.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/lb.json?");

/***/ }),

/***/ "./src/locales/lt.json":
/*!*****************************!*\
  !*** ./src/locales/lt.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Pridėti prie pradžios ekrano\",\"Add To Dock\":\"Pridėti prie doko\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Piktograma bus pridėta prie jūsų doko, kad galėtumėte greitai pasiekti šią programą.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Piktograma bus pridėta prie jūsų pradžios ekrano, kad galėtumėte greitai pasiekti šią programą.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Piktograma bus pridėta prie jūsų užduočių juostos, kad galėtumėte greitai pasiekti šią programą.\",\"Install\":\"Įdiegti\",\"Install %s\":\"Įdiegti %s\",\"Install app\":\"Įdiegti programą\",\"Later\":\"Vėliau\",\"Open in browser\":\"Atidaryti naršyklėje\",\"Select %s from the menu that pops up.\":\"Pasirinkite %s iš iššokančio meniu.\",\"Tap %s\":\"Bakstelėkite %s\",\"Tap %s in the browser bar.\":\"Bakstelėkite %s naršyklės juostoje.\",\"Tap %s in the toolbar.\":\"Bakstelėkite %s įrankių juostoje.\",\"Tap the %s button above.\":\"Bakstelėkite %s mygtuką viršuje.\",\"Tap the %s button below to open your system browser.\":\"Bakstelėkite %s mygtuką žemiau, kad atidarytumėte sistemos naršyklę.\",\"Tap the %s button in the toolbar.\":\"Bakstelėkite %s mygtuką įrankių juostoje.\",\"Tap the %s button in the upper right corner.\":\"Bakstelėkite %s mygtuką viršutiniame dešiniajame kampe.\",\"You may need to scroll down to find this menu item.\":\"Gali tekti slinkti žemyn, kad rastumėte šį meniu elementą.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/lt.json?");

/***/ }),

/***/ "./src/locales/lv.json":
/*!*****************************!*\
  !*** ./src/locales/lv.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Pievienot sākuma ekrānam\",\"Add To Dock\":\"Pievienot dokam\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Jūsu dokam tiks pievienota ikona, lai ātri piekļūtu šai lietotnei.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Jūsu sākuma ekrānam tiks pievienota ikona, lai ātri piekļūtu šai lietotnei.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Jūsu uzdevumjoslai tiks pievienota ikona, lai ātri piekļūtu šai lietotnei.\",\"Install\":\"Instalēt\",\"Install %s\":\"Instalēt %s\",\"Install app\":\"Instalēt lietotni\",\"Later\":\"Vēlāk\",\"Open in browser\":\"Atvērt pārlūkprogrammā\",\"Select %s from the menu that pops up.\":\"Izvēlieties %s no uznirstošās izvēlnes.\",\"Tap %s\":\"Pieskarieties %s\",\"Tap %s in the browser bar.\":\"Pieskarieties %s pārlūkprogrammas joslā.\",\"Tap %s in the toolbar.\":\"Pieskarieties %s rīkjoslā.\",\"Tap the %s button above.\":\"Pieskarieties %s pogai augšā.\",\"Tap the %s button below to open your system browser.\":\"Pieskarieties %s pogai zemāk, lai atvērtu sistēmas pārlūkprogrammu.\",\"Tap the %s button in the toolbar.\":\"Pieskarieties %s pogai rīkjoslā.\",\"Tap the %s button in the upper right corner.\":\"Pieskarieties %s pogai augšējā labajā stūrī.\",\"You may need to scroll down to find this menu item.\":\"Iespējams, jums būs jāritina uz leju, lai atrastu šo izvēlnes vienumu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/lv.json?");

/***/ }),

/***/ "./src/locales/mk.json":
/*!*****************************!*\
  !*** ./src/locales/mk.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Додади на почетен екран\",\"Add To Dock\":\"Додади во док\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Икона ќе биде додадена во вашиот док за брз пристап до оваа апликација.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Икона ќе биде додадена на вашиот почетен екран за брз пристап до оваа апликација.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Икона ќе биде додадена на вашата лента со задачи за брз пристап до оваа апликација.\",\"Install\":\"Инсталирај\",\"Install %s\":\"Инсталирај %s\",\"Install app\":\"Инсталирај апликација\",\"Later\":\"Подоцна\",\"Open in browser\":\"Отвори во прелистувач\",\"Select %s from the menu that pops up.\":\"Изберете %s од менито што се појавува.\",\"Tap %s\":\"Допрете %s\",\"Tap %s in the browser bar.\":\"Допрете %s во лентата на прелистувачот.\",\"Tap %s in the toolbar.\":\"Допрете %s во лентата со алатки.\",\"Tap the %s button above.\":\"Допрете го копчето %s погоре.\",\"Tap the %s button below to open your system browser.\":\"Допрете го копчето %s подолу за да го отворите системскиот прелистувач.\",\"Tap the %s button in the toolbar.\":\"Допрете го копчето %s во лентата со алатки.\",\"Tap the %s button in the upper right corner.\":\"Допрете го копчето %s во горниот десен агол.\",\"You may need to scroll down to find this menu item.\":\"Можеби ќе треба да лизгате надолу за да ја најдете оваа ставка од менито.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/mk.json?");

/***/ }),

/***/ "./src/locales/mn.json":
/*!*****************************!*\
  !*** ./src/locales/mn.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Нүүр дэлгэцэнд нэмэх\",\"Add To Dock\":\"Dock-д нэмэх\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Энэ програмд хурдан хандахын тулд таны Dock-д дүрс нэмэгдэх болно.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Энэ програмд хурдан хандахын тулд таны нүүр дэлгэцэнд дүрс нэмэгдэх болно.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Энэ програмд хурдан хандахын тулд таны даалгаврын мөрөнд дүрс нэмэгдэх болно.\",\"Install\":\"Суулгах\",\"Install %s\":\"%s суулгах\",\"Install app\":\"Програм суулгах\",\"Later\":\"Дараа\",\"Open in browser\":\"Хөтчөөр нээх\",\"Select %s from the menu that pops up.\":\"Гарч ирэх цэснээс %s сонгоно уу.\",\"Tap %s\":\"%s дарна уу\",\"Tap %s in the browser bar.\":\"Хөтчийн мөрөн дэх %s дарна уу.\",\"Tap %s in the toolbar.\":\"Хэрэгслийн мөрөн дэх %s дарна уу.\",\"Tap the %s button above.\":\"Дээрх %s товчийг дарна уу.\",\"Tap the %s button below to open your system browser.\":\"Системийн хөтчийг нээхийн тулд доорх %s товчийг дарна уу.\",\"Tap the %s button in the toolbar.\":\"Хэрэгслийн мөрөн дэх %s товчийг дарна уу.\",\"Tap the %s button in the upper right corner.\":\"Дээд баруун буланд байрлах %s товчийг дарна уу.\",\"You may need to scroll down to find this menu item.\":\"Энэ цэсний зүйлийг олохын тулд доош гүйлгэх хэрэгтэй байж магадгүй.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/mn.json?");

/***/ }),

/***/ "./src/locales/ms.json":
/*!*****************************!*\
  !*** ./src/locales/ms.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Tambah ke Skrin Utama\",\"Add To Dock\":\"Tambah ke Dok\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Ikon akan ditambahkan ke Dok anda supaya anda boleh mengakses aplikasi ini dengan cepat.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Ikon akan ditambahkan ke skrin utama anda supaya anda boleh mengakses aplikasi ini dengan cepat.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Ikon akan ditambahkan ke bar tugas anda supaya anda boleh mengakses aplikasi ini dengan cepat.\",\"Install\":\"Pasang\",\"Install %s\":\"Pasang %s\",\"Install app\":\"Pasang aplikasi\",\"Later\":\"Kemudian\",\"Open in browser\":\"Buka dalam pelayar\",\"Select %s from the menu that pops up.\":\"Pilih %s daripada menu yang muncul.\",\"Tap %s\":\"Ketik %s\",\"Tap %s in the browser bar.\":\"Ketik %s dalam bar pelayar.\",\"Tap %s in the toolbar.\":\"Ketik %s dalam bar alat.\",\"Tap the %s button above.\":\"Ketik butang %s di atas.\",\"Tap the %s button below to open your system browser.\":\"Ketik butang %s di bawah untuk membuka pelayar sistem anda.\",\"Tap the %s button in the toolbar.\":\"Ketik butang %s dalam bar alat.\",\"Tap the %s button in the upper right corner.\":\"Ketik butang %s di sudut kanan atas.\",\"You may need to scroll down to find this menu item.\":\"Anda mungkin perlu menatal ke bawah untuk mencari item menu ini.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ms.json?");

/***/ }),

/***/ "./src/locales/mt.json":
/*!*****************************!*\
  !*** ./src/locales/mt.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Żid mal-Iskrin Ewlieni\",\"Add To Dock\":\"Żid mad-Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Ikona se tiżdied mad-Dock tiegħek biex tkun tista\\' taċċessa din l-app malajr.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Ikona se tiżdied mal-iskrin ewlieni tiegħek biex tkun tista\\' taċċessa din l-app malajr.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Ikona se tiżdied mat-taskbar tiegħek biex tkun tista\\' taċċessa din l-app malajr.\",\"Install\":\"Installa\",\"Install %s\":\"Installa %s\",\"Install app\":\"Installa l-app\",\"Later\":\"Aktar tard\",\"Open in browser\":\"Iftaħ fil-browser\",\"Select %s from the menu that pops up.\":\"Agħżel %s mill-menu li jitfaċċa.\",\"Tap %s\":\"Taptap fuq %s\",\"Tap %s in the browser bar.\":\"Taptap fuq %s fil-bar tal-browser.\",\"Tap %s in the toolbar.\":\"Taptap fuq %s fil-bar tal-għodda.\",\"Tap the %s button above.\":\"Taptap fuq il-buttuna %s hawn fuq.\",\"Tap the %s button below to open your system browser.\":\"Taptap fuq il-buttuna %s hawn taħt biex tiftaħ il-browser tas-sistema tiegħek.\",\"Tap the %s button in the toolbar.\":\"Taptap fuq il-buttuna %s fil-bar tal-għodda.\",\"Tap the %s button in the upper right corner.\":\"Taptap fuq il-buttuna %s fil-kantuniera ta\\' fuq lemini.\",\"You may need to scroll down to find this menu item.\":\"Jista\\' jkollok bżonn tiskrollja \\'l isfel biex issib dan l-element tal-menu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/mt.json?");

/***/ }),

/***/ "./src/locales/nl.json":
/*!*****************************!*\
  !*** ./src/locales/nl.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Toevoegen aan startscherm\",\"Add To Dock\":\"Toevoegen aan Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Er wordt een pictogram toegevoegd aan je Dock zodat je snel toegang hebt tot deze app.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Er wordt een pictogram toegevoegd aan je startscherm zodat je snel toegang hebt tot deze app.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Er wordt een pictogram toegevoegd aan je taakbalk zodat je snel toegang hebt tot deze app.\",\"Install\":\"Installeren\",\"Install %s\":\"%s installeren\",\"Install app\":\"App installeren\",\"Later\":\"Later\",\"Open in browser\":\"Openen in browser\",\"Select %s from the menu that pops up.\":\"Selecteer %s uit het menu dat verschijnt.\",\"Tap %s\":\"Tik op %s\",\"Tap %s in the browser bar.\":\"Tik op %s in de browserbalk.\",\"Tap %s in the toolbar.\":\"Tik op %s in de werkbalk.\",\"Tap the %s button above.\":\"Tik op de %s-knop hierboven.\",\"Tap the %s button below to open your system browser.\":\"Tik op de %s-knop hieronder om je systeembrowser te openen.\",\"Tap the %s button in the toolbar.\":\"Tik op de %s-knop in de werkbalk.\",\"Tap the %s button in the upper right corner.\":\"Tik op de %s-knop in de rechterbovenhoek.\",\"You may need to scroll down to find this menu item.\":\"Je moet mogelijk naar beneden scrollen om dit menu-item te vinden.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/nl.json?");

/***/ }),

/***/ "./src/locales/no.json":
/*!*****************************!*\
  !*** ./src/locales/no.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Legg til på startskjerm\",\"Add To Dock\":\"Legg til i Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Et ikon vil bli lagt til i Dock slik at du raskt kan få tilgang til denne appen.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Et ikon vil bli lagt til på startskjermen din slik at du raskt kan få tilgang til denne appen.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Et ikon vil bli lagt til i oppgavelinjen slik at du raskt kan få tilgang til denne appen.\",\"Install\":\"Installer\",\"Install %s\":\"Installer %s\",\"Install app\":\"Installer app\",\"Later\":\"Senere\",\"Open in browser\":\"Åpne i nettleser\",\"Select %s from the menu that pops up.\":\"Velg %s fra menyen som dukker opp.\",\"Tap %s\":\"Trykk på %s\",\"Tap %s in the browser bar.\":\"Trykk på %s i nettleserlinjen.\",\"Tap %s in the toolbar.\":\"Trykk på %s i verktøylinjen.\",\"Tap the %s button above.\":\"Trykk på %s-knappen ovenfor.\",\"Tap the %s button below to open your system browser.\":\"Trykk på %s-knappen nedenfor for å åpne systemnettleseren.\",\"Tap the %s button in the toolbar.\":\"Trykk på %s-knappen i verktøylinjen.\",\"Tap the %s button in the upper right corner.\":\"Trykk på %s-knappen i øvre høyre hjørne.\",\"You may need to scroll down to find this menu item.\":\"Du må kanskje rulle ned for å finne dette menyelementet.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/no.json?");

/***/ }),

/***/ "./src/locales/pl.json":
/*!*****************************!*\
  !*** ./src/locales/pl.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Dodaj do ekranu głównego\",\"Add To Dock\":\"Dodaj do Docka\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Ikona zostanie dodana do Twojego Docka, aby zapewnić szybki dostęp do tej aplikacji.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Ikona zostanie dodana do Twojego ekranu głównego, aby zapewnić szybki dostęp do tej aplikacji.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Ikona zostanie dodana do Twojego paska zadań, aby zapewnić szybki dostęp do tej aplikacji.\",\"Install\":\"Zainstaluj\",\"Install %s\":\"Zainstaluj %s\",\"Install app\":\"Zainstaluj aplikację\",\"Later\":\"Później\",\"Open in browser\":\"Otwórz w przeglądarce\",\"Select %s from the menu that pops up.\":\"Wybierz %s z menu kontekstowego.\",\"Tap %s\":\"Dotknij %s\",\"Tap %s in the browser bar.\":\"Dotknij %s na pasku przeglądarki.\",\"Tap %s in the toolbar.\":\"Dotknij %s na pasku narzędzi.\",\"Tap the %s button above.\":\"Dotknij przycisku %s powyżej.\",\"Tap the %s button below to open your system browser.\":\"Dotknij przycisku %s poniżej, aby otworzyć przeglądarkę systemową.\",\"Tap the %s button in the toolbar.\":\"Dotknij przycisku %s na pasku narzędzi.\",\"Tap the %s button in the upper right corner.\":\"Dotknij przycisku %s w prawym górnym rogu.\",\"You may need to scroll down to find this menu item.\":\"Może być konieczne przewinięcie w dół, aby znaleźć ten element menu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/pl.json?");

/***/ }),

/***/ "./src/locales/pt.json":
/*!*****************************!*\
  !*** ./src/locales/pt.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Adicionar à tela inicial\",\"Add To Dock\":\"Adicionar ao Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Um ícone será adicionado ao seu Dock para que você possa acessar rapidamente este aplicativo.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Um ícone será adicionado à sua tela inicial para que você possa acessar rapidamente este aplicativo.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Um ícone será adicionado à sua barra de tarefas para que você possa acessar rapidamente este aplicativo.\",\"Install\":\"Instalar\",\"Install %s\":\"Instalar %s\",\"Install app\":\"Instalar aplicativo\",\"Later\":\"Depois\",\"Open in browser\":\"Abrir no navegador\",\"Select %s from the menu that pops up.\":\"Selecione %s no menu que aparece.\",\"Tap %s\":\"Toque em %s\",\"Tap %s in the browser bar.\":\"Toque em %s na barra do navegador.\",\"Tap %s in the toolbar.\":\"Toque em %s na barra de ferramentas.\",\"Tap the %s button above.\":\"Toque no botão %s acima.\",\"Tap the %s button below to open your system browser.\":\"Toque no botão %s abaixo para abrir seu navegador do sistema.\",\"Tap the %s button in the toolbar.\":\"Toque no botão %s na barra de ferramentas.\",\"Tap the %s button in the upper right corner.\":\"Toque no botão %s no canto superior direito.\",\"You may need to scroll down to find this menu item.\":\"Você pode precisar rolar para baixo para encontrar este item do menu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/pt.json?");

/***/ }),

/***/ "./src/locales/ro.json":
/*!*****************************!*\
  !*** ./src/locales/ro.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Adăugați la ecranul de pornire\",\"Add To Dock\":\"Adăugați la Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"O pictogramă va fi adăugată la Dock-ul dvs. pentru a accesa rapid această aplicație.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"O pictogramă va fi adăugată la ecranul dvs. de pornire pentru a accesa rapid această aplicație.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"O pictogramă va fi adăugată la bara de activități pentru a accesa rapid această aplicație.\",\"Install\":\"Instalați\",\"Install %s\":\"Instalați %s\",\"Install app\":\"Instalați aplicația\",\"Later\":\"Mai târziu\",\"Open in browser\":\"Deschideți în browser\",\"Select %s from the menu that pops up.\":\"Selectați %s din meniul care apare.\",\"Tap %s\":\"Atingeți %s\",\"Tap %s in the browser bar.\":\"Atingeți %s în bara browserului.\",\"Tap %s in the toolbar.\":\"Atingeți %s în bara de instrumente.\",\"Tap the %s button above.\":\"Atingeți butonul %s de mai sus.\",\"Tap the %s button below to open your system browser.\":\"Atingeți butonul %s de mai jos pentru a deschide browserul sistemului.\",\"Tap the %s button in the toolbar.\":\"Atingeți butonul %s din bara de instrumente.\",\"Tap the %s button in the upper right corner.\":\"Atingeți butonul %s din colțul din dreapta sus.\",\"You may need to scroll down to find this menu item.\":\"Ar putea fi necesară derularea în jos pentru a găsi acest element de meniu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ro.json?");

/***/ }),

/***/ "./src/locales/ru.json":
/*!*****************************!*\
  !*** ./src/locales/ru.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Добавить на главный экран\",\"Add To Dock\":\"Добавить в Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Значок будет добавлен в ваш Dock для быстрого доступа к этому приложению.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Значок будет добавлен на ваш главный экран для быстрого доступа к этому приложению.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Значок будет добавлен на вашу панель задач для быстрого доступа к этому приложению.\",\"Install\":\"Установить\",\"Install %s\":\"Установить %s\",\"Install app\":\"Установить приложение\",\"Later\":\"Позже\",\"Open in browser\":\"Открыть в браузере\",\"Select %s from the menu that pops up.\":\"Выберите %s из всплывающего меню.\",\"Tap %s\":\"Нажмите %s\",\"Tap %s in the browser bar.\":\"Нажмите %s в строке браузера.\",\"Tap %s in the toolbar.\":\"Нажмите %s на панели инструментов.\",\"Tap the %s button above.\":\"Нажмите кнопку %s выше.\",\"Tap the %s button below to open your system browser.\":\"Нажмите кнопку %s ниже, чтобы открыть системный браузер.\",\"Tap the %s button in the toolbar.\":\"Нажмите кнопку %s на панели инструментов.\",\"Tap the %s button in the upper right corner.\":\"Нажмите кнопку %s в правом верхнем углу.\",\"You may need to scroll down to find this menu item.\":\"Возможно, вам потребуется прокрутить вниз, чтобы найти этот пункт меню.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ru.json?");

/***/ }),

/***/ "./src/locales/sk.json":
/*!*****************************!*\
  !*** ./src/locales/sk.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Pridať na domovskú obrazovku\",\"Add To Dock\":\"Pridať do Docku\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Do vášho Docku bude pridaná ikona pre rýchly prístup k tejto aplikácii.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Na vašu domovskú obrazovku bude pridaná ikona pre rýchly prístup k tejto aplikácii.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Na panel úloh bude pridaná ikona pre rýchly prístup k tejto aplikácii.\",\"Install\":\"Inštalovať\",\"Install %s\":\"Inštalovať %s\",\"Install app\":\"Inštalovať aplikáciu\",\"Later\":\"Neskôr\",\"Open in browser\":\"Otvoriť v prehliadači\",\"Select %s from the menu that pops up.\":\"Vyberte %s z kontextového menu.\",\"Tap %s\":\"Ťuknite na %s\",\"Tap %s in the browser bar.\":\"Ťuknite na %s v lište prehliadača.\",\"Tap %s in the toolbar.\":\"Ťuknite na %s v paneli nástrojov.\",\"Tap the %s button above.\":\"Ťuknite na tlačidlo %s vyššie.\",\"Tap the %s button below to open your system browser.\":\"Ťuknite na tlačidlo %s nižšie pre otvorenie systémového prehliadača.\",\"Tap the %s button in the toolbar.\":\"Ťuknite na tlačidlo %s v paneli nástrojov.\",\"Tap the %s button in the upper right corner.\":\"Ťuknite na tlačidlo %s v pravom hornom rohu.\",\"You may need to scroll down to find this menu item.\":\"Možno budete musieť posunúť nadol, aby ste našli túto položku menu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/sk.json?");

/***/ }),

/***/ "./src/locales/sl.json":
/*!*****************************!*\
  !*** ./src/locales/sl.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Dodaj na začetni zaslon\",\"Add To Dock\":\"Dodaj v sidrišče\",\"An icon will be added to your Dock so you can quickly access this website.\":\"V vaše sidrišče bo dodana ikona za hiter dostop do te aplikacije.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Na vaš začetni zaslon bo dodana ikona za hiter dostop do te aplikacije.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"V vašo opravilno vrstico bo dodana ikona za hiter dostop do te aplikacije.\",\"Install\":\"Namesti\",\"Install %s\":\"Namesti %s\",\"Install app\":\"Namesti aplikacijo\",\"Later\":\"Kasneje\",\"Open in browser\":\"Odpri v brskalniku\",\"Select %s from the menu that pops up.\":\"Izberite %s iz pojavnega menija.\",\"Tap %s\":\"Tapnite %s\",\"Tap %s in the browser bar.\":\"Tapnite %s v vrstici brskalnika.\",\"Tap %s in the toolbar.\":\"Tapnite %s v orodni vrstici.\",\"Tap the %s button above.\":\"Tapnite gumb %s zgoraj.\",\"Tap the %s button below to open your system browser.\":\"Tapnite gumb %s spodaj za odpiranje sistemskega brskalnika.\",\"Tap the %s button in the toolbar.\":\"Tapnite gumb %s v orodni vrstici.\",\"Tap the %s button in the upper right corner.\":\"Tapnite gumb %s v zgornjem desnem kotu.\",\"You may need to scroll down to find this menu item.\":\"Morda se boste morali pomakniti navzdol, da najdete ta element menija.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/sl.json?");

/***/ }),

/***/ "./src/locales/sr.json":
/*!*****************************!*\
  !*** ./src/locales/sr.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Додај на почетни екран\",\"Add To Dock\":\"Додај у док\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Икона ће бити додата у ваш док за брзи приступ овој апликацији.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Икона ће бити додата на ваш почетни екран за брзи приступ овој апликацији.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Икона ће бити додата на вашу траку задатака за брзи приступ овој апликацији.\",\"Install\":\"Инсталирај\",\"Install %s\":\"Инсталирај %s\",\"Install app\":\"Инсталирај апликацију\",\"Later\":\"Касније\",\"Open in browser\":\"Отвори у прегледачу\",\"Select %s from the menu that pops up.\":\"Изаберите %s из искачућег менија.\",\"Tap %s\":\"Додирните %s\",\"Tap %s in the browser bar.\":\"Додирните %s у траци прегледача.\",\"Tap %s in the toolbar.\":\"Додирните %s у траци са алатима.\",\"Tap the %s button above.\":\"Додирните дугме %s изнад.\",\"Tap the %s button below to open your system browser.\":\"Додирните дугме %s испод да отворите системски прегледач.\",\"Tap the %s button in the toolbar.\":\"Додирните дугме %s у траци са алатима.\",\"Tap the %s button in the upper right corner.\":\"Додирните дугме %s у горњем десном углу.\",\"You may need to scroll down to find this menu item.\":\"Можда ћете морати да се померите надоле да бисте пронашли ову ставку менија.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/sr.json?");

/***/ }),

/***/ "./src/locales/sv.json":
/*!*****************************!*\
  !*** ./src/locales/sv.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Lägg till på startskärmen\",\"Add To Dock\":\"Lägg till i Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"En ikon läggs till i din Dock så att du snabbt kan komma åt den här appen.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"En ikon läggs till på din startskärm så att du snabbt kan komma åt den här appen.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"En ikon läggs till i din aktivitetsfält så att du snabbt kan komma åt den här appen.\",\"Install\":\"Installera\",\"Install %s\":\"Installera %s\",\"Install app\":\"Installera app\",\"Later\":\"Senare\",\"Open in browser\":\"Öppna i webbläsare\",\"Select %s from the menu that pops up.\":\"Välj %s från menyn som visas.\",\"Tap %s\":\"Tryck på %s\",\"Tap %s in the browser bar.\":\"Tryck på %s i webbläsarfältet.\",\"Tap %s in the toolbar.\":\"Tryck på %s i verktygsfältet.\",\"Tap the %s button above.\":\"Tryck på %s-knappen ovan.\",\"Tap the %s button below to open your system browser.\":\"Tryck på %s-knappen nedan för att öppna din systemwebbläsare.\",\"Tap the %s button in the toolbar.\":\"Tryck på %s-knappen i verktygsfältet.\",\"Tap the %s button in the upper right corner.\":\"Tryck på %s-knappen i det övre högra hörnet.\",\"You may need to scroll down to find this menu item.\":\"Du kan behöva scrolla ner för att hitta det här menyalternativet.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/sv.json?");

/***/ }),

/***/ "./src/locales/th.json":
/*!*****************************!*\
  !*** ./src/locales/th.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"เพิ่มไปยังหน้าจอหลัก\",\"Add To Dock\":\"เพิ่มไปยัง Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"ไอคอนจะถูกเพิ่มไปยัง Dock ของคุณเพื่อให้สามารถเข้าถึงแอพนี้ได้อย่างรวดเร็ว\",\"An icon will be added to your home screen so you can quickly access this website.\":\"ไอคอนจะถูกเพิ่มไปยังหน้าจอหลักของคุณเพื่อให้สามารถเข้าถึงแอพนี้ได้อย่างรวดเร็ว\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"ไอคอนจะถูกเพิ่มไปยังแถบงานของคุณเพื่อให้สามารถเข้าถึงแอพนี้ได้อย่างรวดเร็ว\",\"Install\":\"ติดตั้ง\",\"Install %s\":\"ติดตั้ง %s\",\"Install app\":\"ติดตั้งแอพ\",\"Later\":\"ภายหลัง\",\"Open in browser\":\"เปิดในเบราว์เซอร์\",\"Select %s from the menu that pops up.\":\"เลือก %s จากเมนูที่ปรากฏขึ้น\",\"Tap %s\":\"แตะ %s\",\"Tap %s in the browser bar.\":\"แตะ %s ในแถบเบราว์เซอร์\",\"Tap %s in the toolbar.\":\"แตะ %s ในแถบเครื่องมือ\",\"Tap the %s button above.\":\"แตะปุ่ม %s ด้านบน\",\"Tap the %s button below to open your system browser.\":\"แตะปุ่ม %s ด้านล่างเพื่อเปิดเบราว์เซอร์ระบบของคุณ\",\"Tap the %s button in the toolbar.\":\"แตะปุ่ม %s ในแถบเครื่องมือ\",\"Tap the %s button in the upper right corner.\":\"แตะปุ่ม %s ที่มุมขวาบน\",\"You may need to scroll down to find this menu item.\":\"คุณอาจต้องเลื่อนลงเพื่อหารายการเมนูนี้\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/th.json?");

/***/ }),

/***/ "./src/locales/tl.json":
/*!*****************************!*\
  !*** ./src/locales/tl.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Idagdag sa Home Screen\",\"Add To Dock\":\"Idagdag sa Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Magdadagdag ng icon sa iyong Dock upang mabilis mong ma-access ang app na ito.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Magdadagdag ng icon sa iyong home screen upang mabilis mong ma-access ang app na ito.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Magdadagdag ng icon sa iyong taskbar upang mabilis mong ma-access ang app na ito.\",\"Install\":\"I-install\",\"Install %s\":\"I-install ang %s\",\"Install app\":\"I-install ang app\",\"Later\":\"Mamaya na\",\"Open in browser\":\"Buksan sa browser\",\"Select %s from the menu that pops up.\":\"Piliin ang %s mula sa menu na lalabas.\",\"Tap %s\":\"I-tap ang %s\",\"Tap %s in the browser bar.\":\"I-tap ang %s sa bar ng browser.\",\"Tap %s in the toolbar.\":\"I-tap ang %s sa toolbar.\",\"Tap the %s button above.\":\"I-tap ang button na %s sa itaas.\",\"Tap the %s button below to open your system browser.\":\"I-tap ang button na %s sa ibaba para buksan ang iyong system browser.\",\"Tap the %s button in the toolbar.\":\"I-tap ang button na %s sa toolbar.\",\"Tap the %s button in the upper right corner.\":\"I-tap ang button na %s sa kanang sulok sa itaas.\",\"You may need to scroll down to find this menu item.\":\"Maaaring kailanganin mong mag-scroll pababa para mahanap ang item na ito sa menu.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/tl.json?");

/***/ }),

/***/ "./src/locales/tr.json":
/*!*****************************!*\
  !*** ./src/locales/tr.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Ana Ekrana Ekle\",\"Add To Dock\":\"Dock\\'a Ekle\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Bu uygulamaya hızlıca erişebilmeniz için Dock\\'unuza bir simge eklenecek.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Bu uygulamaya hızlıca erişebilmeniz için ana ekranınıza bir simge eklenecek.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Bu uygulamaya hızlıca erişebilmeniz için görev çubuğunuza bir simge eklenecek.\",\"Install\":\"Yükle\",\"Install %s\":\"%s\\'i Yükle\",\"Install app\":\"Uygulamayı yükle\",\"Later\":\"Daha sonra\",\"Open in browser\":\"Tarayıcıda aç\",\"Select %s from the menu that pops up.\":\"Açılan menüden %s\\'i seçin.\",\"Tap %s\":\"%s\\'e dokunun\",\"Tap %s in the browser bar.\":\"Tarayıcı çubuğunda %s\\'e dokunun.\",\"Tap %s in the toolbar.\":\"Araç çubuğunda %s\\'e dokunun.\",\"Tap the %s button above.\":\"Yukarıdaki %s düğmesine dokunun.\",\"Tap the %s button below to open your system browser.\":\"Sistem tarayıcınızı açmak için aşağıdaki %s düğmesine dokunun.\",\"Tap the %s button in the toolbar.\":\"Araç çubuğundaki %s düğmesine dokunun.\",\"Tap the %s button in the upper right corner.\":\"Sağ üst köşedeki %s düğmesine dokunun.\",\"You may need to scroll down to find this menu item.\":\"Bu menü öğesini bulmak için aşağı kaydırmanız gerekebilir.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/tr.json?");

/***/ }),

/***/ "./src/locales/uk.json":
/*!*****************************!*\
  !*** ./src/locales/uk.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Додати на головний екран\",\"Add To Dock\":\"Додати до Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Значок буде додано до вашого Dock для швидкого доступу до цього додатка.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Значок буде додано на ваш головний екран для швидкого доступу до цього додатка.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Значок буде додано на вашу панель завдань для швидкого доступу до цього додатка.\",\"Install\":\"Встановити\",\"Install %s\":\"Встановити %s\",\"Install app\":\"Встановити додаток\",\"Later\":\"Пізніше\",\"Open in browser\":\"Відкрити в браузері\",\"Select %s from the menu that pops up.\":\"Виберіть %s із спливаючого меню.\",\"Tap %s\":\"Торкніться %s\",\"Tap %s in the browser bar.\":\"Торкніться %s у рядку браузера.\",\"Tap %s in the toolbar.\":\"Торкніться %s на панелі інструментів.\",\"Tap the %s button above.\":\"Торкніться кнопки %s вище.\",\"Tap the %s button below to open your system browser.\":\"Торкніться кнопки %s нижче, щоб відкрити системний браузер.\",\"Tap the %s button in the toolbar.\":\"Торкніться кнопки %s на панелі інструментів.\",\"Tap the %s button in the upper right corner.\":\"Торкніться кнопки %s у верхньому правому куті.\",\"You may need to scroll down to find this menu item.\":\"Можливо, вам доведеться прокрутити вниз, щоб знайти цей пункт меню.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/uk.json?");

/***/ }),

/***/ "./src/locales/ur.json":
/*!*****************************!*\
  !*** ./src/locales/ur.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"ہوم اسکرین میں شامل کریں\",\"Add To Dock\":\"ڈاک میں شامل کریں\",\"An icon will be added to your Dock so you can quickly access this website.\":\"آپ کی ڈاک میں ایک آئیکن شامل کیا جائے گا تاکہ آپ اس ایپ تک فوری رسائی حاصل کر سکیں۔\",\"An icon will be added to your home screen so you can quickly access this website.\":\"آپ کی ہوم اسکرین میں ایک آئیکن شامل کیا جائے گا تاکہ آپ اس ایپ تک فوری رسائی حاصل کر سکیں۔\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"آپ کی ٹاسک بار میں ایک آئیکن شامل کیا جائے گا تاکہ آپ اس ایپ تک فوری رسائی حاصل کر سکیں۔\",\"Install\":\"انسٹال کریں\",\"Install %s\":\"%s انسٹال کریں\",\"Install app\":\"ایپ انسٹال کریں\",\"Later\":\"بعد میں\",\"Open in browser\":\"براؤزر میں کھولیں\",\"Select %s from the menu that pops up.\":\"پاپ اپ مینو سے %s منتخب کریں۔\",\"Tap %s\":\"%s پر تھپتھپائیں\",\"Tap %s in the browser bar.\":\"براؤزر بار میں %s پر تھپتھپائیں۔\",\"Tap %s in the toolbar.\":\"ٹول بار میں %s پر تھپتھپائیں۔\",\"Tap the %s button above.\":\"اوپر دیے گئے %s بٹن پر تھپتھپائیں۔\",\"Tap the %s button below to open your system browser.\":\"اپنا سسٹم براؤزر کھولنے کے لیے نیچے دیے گئے %s بٹن پر تھپتھپائیں۔\",\"Tap the %s button in the toolbar.\":\"ٹول بار میں %s بٹن پر تھپتھپائیں۔\",\"Tap the %s button in the upper right corner.\":\"اوپری دائیں کونے میں %s بٹن پر تھپتھپائیں۔\",\"You may need to scroll down to find this menu item.\":\"اس مینو آئٹم کو تلاش کرنے کے لیے آپ کو نیچے سکرول کرنا پڑ سکتا ہے۔\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/ur.json?");

/***/ }),

/***/ "./src/locales/vi.json":
/*!*****************************!*\
  !*** ./src/locales/vi.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"Thêm vào Màn hình chính\",\"Add To Dock\":\"Thêm vào Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"Một biểu tượng sẽ được thêm vào Dock để bạn có thể truy cập nhanh ứng dụng này.\",\"An icon will be added to your home screen so you can quickly access this website.\":\"Một biểu tượng sẽ được thêm vào màn hình chính để bạn có thể truy cập nhanh ứng dụng này.\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"Một biểu tượng sẽ được thêm vào thanh tác vụ để bạn có thể truy cập nhanh ứng dụng này.\",\"Install\":\"Cài đặt\",\"Install %s\":\"Cài đặt %s\",\"Install app\":\"Cài đặt ứng dụng\",\"Later\":\"Để sau\",\"Open in browser\":\"Mở trong trình duyệt\",\"Select %s from the menu that pops up.\":\"Chọn %s từ menu bật lên.\",\"Tap %s\":\"Chạm vào %s\",\"Tap %s in the browser bar.\":\"Chạm vào %s trong thanh trình duyệt.\",\"Tap %s in the toolbar.\":\"Chạm vào %s trong thanh công cụ.\",\"Tap the %s button above.\":\"Chạm vào nút %s ở trên.\",\"Tap the %s button below to open your system browser.\":\"Chạm vào nút %s bên dưới để mở trình duyệt hệ thống.\",\"Tap the %s button in the toolbar.\":\"Chạm vào nút %s trong thanh công cụ.\",\"Tap the %s button in the upper right corner.\":\"Chạm vào nút %s ở góc trên bên phải.\",\"You may need to scroll down to find this menu item.\":\"Bạn có thể cần cuộn xuống để tìm mục menu này.\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/vi.json?");

/***/ }),

/***/ "./src/locales/zh.json":
/*!*****************************!*\
  !*** ./src/locales/zh.json ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"添加到主屏幕\",\"Add To Dock\":\"添加到程序坞\",\"An icon will be added to your Dock so you can quickly access this website.\":\"一个图标将添加到您的程序坞，以便您快速访问此应用。\",\"An icon will be added to your home screen so you can quickly access this website.\":\"一个图标将添加到您的主屏幕，以便您快速访问此应用。\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"一个图标将添加到您的任务栏，以便您快速访问此应用。\",\"Install\":\"安装\",\"Install %s\":\"安装 %s\",\"Install app\":\"安装应用\",\"Later\":\"稍后\",\"Open in browser\":\"在浏览器中打开\",\"Select %s from the menu that pops up.\":\"从弹出菜单中选择 %s。\",\"Tap %s\":\"点击 %s\",\"Tap %s in the browser bar.\":\"点击浏览器栏中的 %s。\",\"Tap %s in the toolbar.\":\"点击工具栏中的 %s。\",\"Tap the %s button above.\":\"点击上方的 %s 按钮。\",\"Tap the %s button below to open your system browser.\":\"点击下方的 %s 按钮以打开系统浏览器。\",\"Tap the %s button in the toolbar.\":\"点击工具栏中的 %s 按钮。\",\"Tap the %s button in the upper right corner.\":\"点击右上角的 %s 按钮。\",\"You may need to scroll down to find this menu item.\":\"您可能需要向下滚动以找到此菜单项。\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/zh.json?");

/***/ }),

/***/ "./src/locales/zh_CN.json":
/*!********************************!*\
  !*** ./src/locales/zh_CN.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"添加到主屏幕\",\"Add To Dock\":\"添加到程序坞\",\"An icon will be added to your Dock so you can quickly access this website.\":\"一个图标将添加到您的程序坞，以便您快速访问此应用。\",\"An icon will be added to your home screen so you can quickly access this website.\":\"一个图标将添加到您的主屏幕，以便您快速访问此应用。\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"一个图标将添加到您的任务栏，以便您快速访问此应用。\",\"Install\":\"安装\",\"Install %s\":\"安装 %s\",\"Install app\":\"安装应用\",\"Later\":\"稍后\",\"Open in browser\":\"在浏览器中打开\",\"Select %s from the menu that pops up.\":\"从弹出菜单中选择 %s。\",\"Tap %s\":\"点击 %s\",\"Tap %s in the browser bar.\":\"点击浏览器栏中的 %s。\",\"Tap %s in the toolbar.\":\"点击工具栏中的 %s。\",\"Tap the %s button above.\":\"点击上方的 %s 按钮。\",\"Tap the %s button below to open your system browser.\":\"点击下方的 %s 按钮以打开系统浏览器。\",\"Tap the %s button in the toolbar.\":\"点击工具栏中的 %s 按钮。\",\"Tap the %s button in the upper right corner.\":\"点击右上角的 %s 按钮。\",\"You may need to scroll down to find this menu item.\":\"您可能需要向下滚动以找到此菜单项。\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/zh_CN.json?");

/***/ }),

/***/ "./src/locales/zh_HK.json":
/*!********************************!*\
  !*** ./src/locales/zh_HK.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"加至主畫面\",\"Add To Dock\":\"加至程式集\",\"An icon will be added to your Dock so you can quickly access this website.\":\"一個圖示將加至您的程式集，以便您快速存取此應用程式。\",\"An icon will be added to your home screen so you can quickly access this website.\":\"一個圖示將加至您的主畫面，以便您快速存取此應用程式。\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"一個圖示將加至您的工具列，以便您快速存取此應用程式。\",\"Install\":\"安裝\",\"Install %s\":\"安裝 %s\",\"Install app\":\"安裝應用程式\",\"Later\":\"稍後\",\"Open in browser\":\"在瀏覽器中開啟\",\"Select %s from the menu that pops up.\":\"從彈出式選單中選擇 %s。\",\"Tap %s\":\"點擊 %s\",\"Tap %s in the browser bar.\":\"點擊瀏覽器列中的 %s。\",\"Tap %s in the toolbar.\":\"點擊工具列中的 %s。\",\"Tap the %s button above.\":\"點擊上方的 %s 按鈕。\",\"Tap the %s button below to open your system browser.\":\"點擊下方的 %s 按鈕以開啟系統瀏覽器。\",\"Tap the %s button in the toolbar.\":\"點擊工具列中的 %s 按鈕。\",\"Tap the %s button in the upper right corner.\":\"點擊右上角的 %s 按鈕。\",\"You may need to scroll down to find this menu item.\":\"您可能需要向下捲動以找到此選單項目。\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/zh_HK.json?");

/***/ }),

/***/ "./src/locales/zh_TW.json":
/*!********************************!*\
  !*** ./src/locales/zh_TW.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"Add to Home Screen\":\"新增至主畫面\",\"Add To Dock\":\"新增至 Dock\",\"An icon will be added to your Dock so you can quickly access this website.\":\"將在您的 Dock 新增一個圖示，方便您快速存取此應用程式。\",\"An icon will be added to your home screen so you can quickly access this website.\":\"將在您的主畫面新增一個圖示，方便您快速存取此應用程式。\",\"An icon will be added to your Taskbar so you can quickly access this website.\":\"將在您的工作列新增一個圖示，方便您快速存取此應用程式。\",\"Install\":\"安裝\",\"Install %s\":\"安裝 %s\",\"Install app\":\"安裝應用程式\",\"Later\":\"稍後\",\"Open in browser\":\"在瀏覽器中開啟\",\"Select %s from the menu that pops up.\":\"從跳出的選單中選擇 %s。\",\"Tap %s\":\"點選 %s\",\"Tap %s in the browser bar.\":\"點選瀏覽器列中的 %s。\",\"Tap %s in the toolbar.\":\"點選工具列中的 %s。\",\"Tap the %s button above.\":\"點選上方的 %s 按鈕。\",\"Tap the %s button below to open your system browser.\":\"點選下方的 %s 按鈕以開啟系統瀏覽器。\",\"Tap the %s button in the toolbar.\":\"點選工具列中的 %s 按鈕。\",\"Tap the %s button in the upper right corner.\":\"點選右上角的 %s 按鈕。\",\"You may need to scroll down to find this menu item.\":\"您可能需要向下捲動以找到此選單項目。\"}');\n\n//# sourceURL=webpack://add-to-homescreen/./src/locales/zh_TW.json?");
=======
module.exports = JSON.parse('{"Add to Home Screen":"加入主畫面","Add To Dock":"加入 Dock","An icon will be added to your Dock so you can quickly access this website.":"一個圖示將被加入你的 Dock，以便你可以快速存取這個網站。","An icon will be added to your home screen so you can quickly access this website.":"一個圖示將被加入你的主畫面，以便你可以快速存取這個網站。","An icon will be added to your Taskbar so you can quickly access this website.":"一個圖示將被加入你的工作列，以便你可以快速存取這個網站。","Install":"安裝","Install %s":"安裝 %s","Install app":"安裝應用程式","Later":"稍後","Open in browser":"在瀏覽器中開啟","Select %s from the menu that pops up.":"從跳出的選單中選擇 %s。","Tap %s":"點擊 %s","Tap %s in the browser bar.":"在瀏覽器列中點擊 %s。","Tap %s in the toolbar.":"在工具列中點擊 %s。","Tap the %s button above.":"點擊上面的 %s 按鈕。","Tap the %s button below to open your system browser.":"點擊下面的 %s 按鈕以開啟你的系統瀏覽器。","Tap the %s button in the toolbar.":"點擊工具列中的 %s 按鈕。","Tap the %s button in the upper right corner.":"點擊右上角的 %s 按鈕。","You may need to scroll down to find this menu item.":"你可能需要向下捲動才能找到這個選單項目。"}');
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;