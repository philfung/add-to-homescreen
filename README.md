# add-to-homescreen 📱

## Motivation
Adding to home screen allows mobile websites and PWA's to open like native apps without registering in the Apple or Google App Stores. Currently, it is very difficult to get users to add web apps to their home screen, limiting the utility of mobile websites compared to native apps.  See [related Medium blog post](https://medium.com/@philipfung/add-to-homescreen-websites-an-option-for-startups-in-2023-efb92f5e03ad).

## This Library
This drop-in JS Library for mobile websites effectively guides a user to add the website to their home screen on both IOS and Android.
</br>
Instructions and UI in this library have been "battle-tested" and has yielded an *~85% home screen install rate* on IOS and Android across all ages in past implementations.

Here is a [demo (please open on your phone)](https://philfung.github.io) of library use within a hypothetical app "Aardvark" <img width="40" alt="aardvark-icon" src="https://github.com/philfung/add-to-homescreen/assets/1054593/e933af84-9225-4079-8fd7-5af525878693">

![261203234-855108a0-e0ed-4213-8789-76d59345dd46 (1)](https://github.com/philfung/add-to-homescreen/assets/1054593/6cbfe5e0-c25e-484b-8c34-6da14969c162)

## Browser Support
All major browsers on IOS and Android are supported.
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

#### In-App Browsers 

##### Facebook and Linkedin in-app browsers on IOS and Android
User is guided to open the link in the system browser.
</br>
<img width="200" alt="facebook-browser" src="https://github.com/philfung/add-to-homescreen/assets/1054593/04135f4d-76b1-4797-bd3f-dc402cf9abb4">

##### Twitter, Instagram and Threads in-app browsers on IOS
These apps all use SFSafariViewController and can be handled similarly.
</br>
<img width="200" alt="Screenshot 2023-08-20 at 4 06 45 PM" src="https://github.com/philfung/add-to-homescreen/assets/1054593/8adba8bd-2ded-4d95-8f67-0188995a7b4c">

#### iPhone users not on Safari or Chrome or in-app browser
<img width="200" alt="ios-non-compliant" src="https://github.com/philfung/add-to-homescreen/assets/1054593/054f7a08-4576-4452-93e9-5810969c0653">

#### Android users not on Chrome or in-app browser
<img width="200" alt="android-non-compliant" src="https://github.com/philfung/add-to-homescreen/assets/1054593/0072304f-4ec5-4cab-b14b-e96a5226ae79">


## Installation

### Prerequisite
Make sure your site has the minimum requirements for installing a web app on homescreen for IOS and Android.
1. At `https://your-website.com/apple-touch-icon.png`, include a square icon of your app that is (1) at least 40 x 40 pixels and (2) specifically named `apple-touch-icon.png`([example](https://github.com/philfung/add-to-homescreen/blob/main/apple-touch-icon.png)).    
2. At `https://your-website.com/manifest.json`, include a web manifest file `manifest.json` ([example](https://github.com/philfung/add-to-homescreen/blob/main/manifest.json)). Reference the manifest in your index HTML file.
   
   `index.html`
   ```html
   <head>
   ...
   <link rel="manifest" href="manifest.json">
   ..
   </head>
   ```
### Usage (If you're not making changes to library)
This should be a quick drop-in library into your mobile website. 

1. Include the library JavaScript and CSS files in your header (You can use [JSDelivr CDN](https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@master/dist/) if you're just using the library directly and not making any changes):

   `index.html`
   ```html
   <head>
   ...
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@1.8/dist/add-to-homescreen.min.css">
   <script src="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@1.8/dist/add-to-homescreen.min.js"></script>
   ...
   </head>
   ```

2. Call the library onload.

   `index.html`
   ```javascript
   <script>
   document.addEventListener('DOMContentLoaded', function () { // document.getElementById('addToHomeScreen').addEventListener('click', function () and add <button id="addToHomeScreen">Add to Home Screen</button> somewhere on your page to get a button instead.

    window.AddToHomeScreenInstance = new window.AddToHomeScreen({
     appName: 'Aardvark',                                   // Name of the app.
                                                            // Required.
     appIconUrl: 'apple-touch-icon.png',                    // App icon link (square, at least 40 x 40 pixels).
                                                            // Required.
     assetUrl: 'https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@1.8/dist/assets/img/',  // Link to directory of library image assets.

     maxModalDisplayCount: -1                               // If set, the modal will only show this many times.
                                                            // Optional. Default: -1 (no limit).  (Debugging: Use this.clearModalDisplayCount() to reset the count)
   });
         
    ret = window.AddToHomeScreenInstance.show('en');        // show "add-to-homescreen" instructions to user, or do nothing if already added to homescreen
                                                            // The only argument is the language to show the messages in (currently only 'de', 'en', 'pt' and 'fr' are available).
   });
   </script>
   </body>
   ```
Here's an [example implementation](https://github.com/philfung/add-to-homescreen/blob/main/index.html). 

### Usage (If you're making changes to library)
1. Make changes
2. Test locally:

Start local server
```
npm install
npm start
```
Load an example page http://127.0.0.1:8081

3. Build the library into the ```dist``` directory
```
npm run build
```

4. Save the [dist](https://github.com/philfung/add-to-homescreen/tree/main/dist) directory to a CDN of your choice. 
Follow the steps in the previous section.

## Dependencies

No dependencies. This is written in raw ES6 javascript and all css is namespaced to minimize codebase conflict and bloat.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Todos
- [ ] Bug: Fix browser instructions:
    - Android
        - [ ] Edge
- [ ] Bug: Fix in-app browser detection:
    - IOS
        - [ ] Reddit
        - [ ] Google App
        - [ ] Medium App
    - Android
        - [ ] Twitter
        - [ ] LinkedIn
        - [ ] Threads
        - [ ] Instagram
        - [ ] Reddit
        - [ ] Google App
        - [ ] Medium App









