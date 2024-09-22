# add-to-homescreen 📱 🖥️

## Motivation

Add to home screen allows websites and PWA's to work like native apps without registering in the Apple or Google App Stores. Currently, it is very difficult to get users to add web apps to their home screen, limiting the utility of such websites compared to native apps. See [related Medium blog post](https://medium.com/@philipfung/add-to-homescreen-websites-an-option-for-startups-in-2023-efb92f5e03ad).

## This Library

This drop-in JS Library for websites effectively guides a user to add the website to their home screen on IOS, Android and Desktop.
</br>
Instructions and UI in this library have been "battle-tested" and has yielded an _~85% home screen install rate_ on IOS and Android across all ages in past implementations.

Here is a [demo (please open on your phone)](https://philfung.github.io) of library use within a hypothetical app "Aardvark" <img width="40" alt="aardvark-icon" src="https://github.com/philfung/add-to-homescreen/assets/1054593/e933af84-9225-4079-8fd7-5af525878693">
</br>
</br>
<img src="https://github.com/user-attachments/assets/3e751e86-f438-4a33-b9bb-fc81495fa67c" width="300"/>

## Browser Support

All major browsers on IOS/Android/Desktop are supported.
Here are the guides shown for each platform/browser:

#### IOS - Safari browser

<img width="175" alt="sc-ios-safari" src="https://github.com/user-attachments/assets/a7457b49-b9f7-4748-8571-73672dcfd7f2">

#### IOS - Chrome browser

<img width="175" alt="sc-ios-chrome" src="https://github.com/user-attachments/assets/bdfa90eb-f23a-4f81-9d65-3c473d3f181f">

#### Android - Chrome browser

<img width="175" alt="sc-android-chrome" src="https://github.com/user-attachments/assets/edbbf840-b33b-4cb9-98da-22db8764cbc2">

#### Desktop - Chrome/Edge browsers

<img width="475" alt="sc-desktop-chromeedge" src="https://github.com/user-attachments/assets/86727d6f-ade9-4e7a-b1bf-b0e2b2dcd1ed">

#### Desktop - Safari browser

<img width="475" alt="sc-desktop-safari" src="https://github.com/user-attachments/assets/384b7ed8-7acf-4bee-805c-36ca820c19ee">

#### In-App Mobile Browsers

Users are guided to open the link in the system browser.

## Installation

### Prerequisite

Make sure your site has the minimum requirements for installing a web app on homescreen for IOS and Android and Desktop.

1. At `https://your-website.com/apple-touch-icon.png`, include a square icon of your app that is (1) at least 40 x 40 pixels and (2) specifically named `apple-touch-icon.png`([example](https://github.com/philfung/add-to-homescreen/blob/main/apple-touch-icon.png)).
2. At `https://your-website.com/manifest.json`, include a web manifest file `manifest.json` ([example](https://github.com/philfung/add-to-homescreen/blob/main/manifest.json)). Reference the manifest in your index HTML file.

   `index.html`

   ```html
   <head>
     ...
     <link rel="manifest" crossorigin="use-credentials" href="manifest.json" />
     ..
   </head>
   ```

### Usage (If you're not making changes to library)

This should be a quick drop-in library into your website.

1. Include the library JavaScript and CSS files in your header (You can use [JSDelivr CDN](https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@master/dist/) if you're just using the library directly and not making any changes):

   `index.html`

   ```html
   <head>
     ...
     <link
       rel="stylesheet"
       href="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@2.0/dist/add-to-homescreen.min.css"
     />
     <script src="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@2.0/dist/add-to-homescreen.min.js"></script>
     ...
   </head>
   ```

2. Call the library onload.

   `index.html`

   ```javascript
   <script>
   document.addEventListener('DOMContentLoaded', function () {
    window.AddToHomeScreenInstance = window.AddToHomeScreen({
     appName: 'Aardvark',                                   // Name of the app.
                                                            // Required.
     appNameDisplay: 'standalone',                          // If set to 'standalone' (the default), the app name will be diplayed
                                                            // on it's own, beneath the "Install App" header. If set to 'inline', the
                                                            // app name will be displayed on a single line like "Install MyApp"
                                                            // Optional. Default 'standalone'
     appIconUrl: 'apple-touch-icon.png',                    // App icon link (square, at least 40 x 40 pixels).
                                                            // Required.
     assetUrl: 'https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@2.0/dist/assets/img/',  // Link to directory of library image assets.

     maxModalDisplayCount: -1                               // If set, the modal will only show this many times.
                                                            // Optional. Default: -1 (no limit).  (Debugging: Use this.clearModalDisplayCount() to reset the count)
   });

    ret = window.AddToHomeScreenInstance.show('en');        // show "add-to-homescreen" instructions to user, or do nothing if already added to homescreen
                                                            // The only argument is the language to show the messages in (currently only 'da', 'de', 'en', 'es', 'fr', 'he', 'it', 'pt' and 'ru' are available).
   });
   </script>
   </body>
   ```

Here's an [example implementation](https://github.com/philfung/add-to-homescreen/blob/main/index.html).

#### Special Case: calling the UI later

2-alternate. if you're calling the UI NOT onload, but sometime after (for example, in an onclick() handler for an "Install App" button), then
you should still create your the instance onload, but call your UI later on the instance variable with .show()):

`index.html`

```javascript
<script>
document.addEventListener('DOMContentLoaded', function () {

   window.AddToHomeScreenInstance = window.AddToHomeScreen({...
}));

document.getElementById('my_install_app_button').addEventListener('click', function () {
   window.AddToHomeScreenInstance.show('en');
});
</script>
</body>
```

This is because some handlers must be created onload.

### Usage (If you're making changes to library)

1. Make changes
2. Test locally:

Start local server

```
npm run install
npm run build
npm run start
```

Load an example page http://127.0.0.1:8081

3. Build the library into the `dist` directory

```
npm run build
```

4. Save the [dist](https://github.com/philfung/add-to-homescreen/tree/main/dist) directory to a CDN of your choice.
   Follow the steps in the previous section.

## Dependencies

No dependencies. This is written in raw ES6 javascript and all css is namespaced to minimize codebase conflict and bloat.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
