# add-to-homescreen 📱

## Motivation
Adding to home screen allows mobile websites and PWA's to open like native apps without registering in the Apple or Google App Stores. Currently, it is very difficult to get users to add web apps to their home screen, limiting the utility of mobile websites compared to native apps.

## This Library
This drop-in JS Library for mobile websites effectively guides a user to add the website to their home screen on both IOS and Android.
</br>
Instructions and UI in this library have been "battle-tested" and has yielded an *~85% home screen install rate* on IOS and Android in past implementations.

<!-- ## Demo
Here is a [demo (please open on your phone)](https://philfung.github.io) of library use within a hypothetical app "Aardvark" <img width="40" alt="aardvark-icon" src="https://github.com/philfung/add-to-homescreen/assets/1054593/e933af84-9225-4079-8fd7-5af525878693">

![demo-iphone](https://github.com/philfung/add-to-homescreen/assets/1054593/855108a0-e0ed-4213-8789-76d59345dd46)

-->
## Browser Support
All major browsers on IOS and Android are supported comprising 95% of browser use on each platform.
Here are the guides shown for each platform/browser:
#### IOS - Safari browser
<img src="https://github.com/philfung/add-to-homescreen/assets/1054593/f4f763e6-a3fa-4871-ae4a-699fd57bbcf6" width="175"/>

#### IOS - Chrome browser
<img src="https://github.com/philfung/add-to-homescreen/assets/1054593/122d6a59-4657-421f-8c9f-17e6467b8485)" width="175"/>

#### Android - Chrome browser
<img src="https://github.com/philfung/add-to-homescreen/assets/1054593/53f06e82-61f3-4173-890e-0a6a42026dea)" width="175"/>

## Browser Fallback Support
All major browsers on IOS and Android are supported, but in the edge case of a non-compliant or desktop browser, a message is shown to redirect the user to a supported browser.  (This feature can be toggled on/off using the `showErrorMessageForUnsupportedBrowsers` flag.)

#### Desktop users
<img width="200" alt="error-modal-desktop" src="https://github.com/philfung/add-to-homescreen/assets/1054593/83c07702-15b6-4bd3-a362-1b846ab381a7">

#### iPhone and Android users on the Facebook in-app browser
Guided to open the link in the system browser.
</br>
<img width="200" alt="facebook-browser" src="https://github.com/philfung/add-to-homescreen/assets/1054593/04135f4d-76b1-4797-bd3f-dc402cf9abb4">

#### iPhone users not on Safari or Chrome
<img width="200" alt="ios-non-compliant" src="https://github.com/philfung/add-to-homescreen/assets/1054593/054f7a08-4576-4452-93e9-5810969c0653">

#### Android users not on Chrome
<img width="200" alt="android-non-compliant" src="https://github.com/philfung/add-to-homescreen/assets/1054593/0072304f-4ec5-4cab-b14b-e96a5226ae79">

## Installation
Install the package using npm:

```
npm install add-to-homescreen
```

Now test locally:
```
npm run build
npm start
```

## Usage
This should be a quick drop-in library to your mobile website codebase. 

1. Follow installation instructions above to compile JS and CSS.
2. Copy the entire ["dist" folder](https://github.com/philfung/add-to-homescreen/tree/main/dist) over to your codebase or CDN. 
   This folder includes all js,css, and image assets required.

3. Make sure your site has the minimum requirements for installing a web app on homescreen for IOS and Android.
    1. in your root directory, include a square icon of your app that is (1) at least 40 x 40 pixels and (2) specifically named ["apple-touch-icon.png"](https://github.com/philfung/add-to-homescreen/blob/main/apple-touch-icon.png)    
    2. in your root directory, include a web manifest file ["manifest.json"](https://github.com/philfung/add-to-homescreen/blob/main/manifest.json). Reference the manifest in your index HTML file. 
        ```
        = index.html =
        <head>
        ...
        <link rel="manifest" href="manifest.json">
        ..
        </head>
        ```
4. Include the library JavaScript and CSS files in your index HTML file:

    ```
    = index.html =
    <head>
    ...
    <link rel="stylesheet" href="https://your-cdn.com/../dist/add-to-homescreen.min.css">
    <script src="https://your-cdn.com/../dist/add-to-homescreen.min.js"></script>
    ...
    </head>
    ```

5. Call the library.

    ```
    = index.html =
    <script>
    document.addEventListener('DOMContentLoaded', function () {

        window.AddToHomeScreenInstance = new window.AddToHomeScreen(
            {
                appName: 'Aardvark',                                   // Name of the app
                appIcon: 'apple-touch-icon.png',                       // App icon link (square, at least 40 x 40 pixels)
                assetUrl: 'https://your-cdn.com/../dist/assets/img/',  // Link to directory of library image assets 
                showErrorMessageForUnsupportedBrowsers: true,          // Should we prompt users on non-compliant browsers (like IOS Opera) to switch for 'Add to Homescreen' (like IOS Safari)? Default: true.
                allowUserToCloseModal: false                           // Allow user to close the 'Add to Homescreen' message? Not allowing will increase installs. Default: false.
            }
        );
            
        ret = window.AddToHomeScreenInstance.show();                   // show "add-to-homescreen" instructions to user, or do nothing if already added to homescreen
    });
    </script>
    ```
Here's an [example implementation](https://github.com/philfung/add-to-homescreen/blob/main/index.html). 
## Dependencies

No dependencies. This is written in raw ES6 javascript and all css is namespaced to minimize codebase conflict and bloat.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Todos
- [ ] Use a different font other than Material, looks janky, especially the title text.
- [ ] Guide in-app browsers users to open system browser instead: 
    - [ ] GMail
    - [ ] LinkedIn
    - [ ] Threads
    - [ ] Instagram
    - [ ] Reddit
- [ ] IOS Chrome: in modal, replace the settings icon with properly colored gray icon
- [ ] Error Screen: fix ontouchstart not being triggered on Android Chrome







