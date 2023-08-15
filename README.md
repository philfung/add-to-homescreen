# Add to Homescreen 📱
Adding to Home Screen allows web apps to have nearly full app functionality without registering in the Apple/Google App Stores. 
</br>
The following is UI Library for adding a web app to a user's home screen on IOS and Android.
</br>
Instructions and UI have been user-optimized and should give ~85% home screen install rate on IOS and Android.

Demo implementation [here](https://philfung.github.io).
TODO video here.

## Installation
Testing locally:
```
npm run build
npm start
```

Install the package using npm:

```
npm install add-to-homescreen
```


## Usage
Usage Instructions (with example implementation TODO:here):

1. Copy the entire "dist" folder (TODO: LINK) over to your codebase or CDN. 
   This folder includes all js,css, and image assets required.

2. Make sure your site has the minimum requirements for installing a web app on homescreen for IOS and Android.
    1. in your root directory, include a square app icon of at least 40 x 40 px specifically named "apple-touch-icon.png" (TODO: example)
    2. in your root directory, include a web manifest file "manifest.json". (TODO: example) Reference the manifest in your index HTML file. 
        ```
        = index.html =
        <head>
        ...
        <link rel="manifest" href="manifest.json">
        ..
        </head>
        ```
3. Include the library JavaScript and CSS files in your index HTML file:

    ```
    = index.html =
    <head>
    ...
    <link rel="stylesheet" href="https://your-cdn.com/../dist/add-to-homescreen.min.css">
    <script src="https://your-cdn.com/../dist/add-to-homescreen.min.js"></script>
    ...
    </head>
    ```

4. Call the library. 

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
# Dependencies

No dependencies. This is written in raw ES6 javascript and all css is namespaced to minimize codebase conflict and bloat.

# TODOs
- [ ] Add support for Chrome App on IOS
- [ ] Update Android Chrome instructions for new Chrome release (include "Install App" messaging)
- [ ] README: Add video thumbnails
- [ ] README: Fill in missing url links

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

