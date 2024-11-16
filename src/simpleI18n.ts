interface Config {
  locales: Array<string>;
  staticCatalog: {
    [locale: string]: {
      [key: string]: string;
    };
  };
  directory: string;
}

let config: Config;
let directory: {
  [key: string]: string;
};

const PLACEHOLDER = "%s";

const SimpleI18n = {
  configure: (configInput: Config) => {
    config = configInput;
  },

  _getLanguageFromLocale:(locale:string):string => {
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
  _getLanguageFromBrowserSettings:():string => {

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

  setLocale: (locale: string) => {
    if (process.env.NODE_ENV === "development") {
      if (!config) {
        throw new Error(
          "SimpleI18n error: The configure function must be called before the setLocale function"
        );
      }
    }
    directory = config.staticCatalog[locale];
  },

  _translateKey(key: string) {
    if (directory == null || directory[key] == null) {
      return key;
    }

    return directory[key];
  },

  __: (key: string, input?: string): string => {
<<<<<<< HEAD
    // First get the localized string
    const localizedStr = directory[key] || key;
    
    if (localizedStr.indexOf(PLACEHOLDER) < 0) {
      return localizedStr;
=======
    if (key.indexOf(PLACEHOLDER) < 0) {
      return SimpleI18n._translateKey(key);
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324
    }

    // Need to do a string replacement
    if (process.env.NODE_ENV === "development") {
      if (!input) {
        throw new Error(
          "SimpleI18n error: if " +
            PLACEHOLDER +
            " exists in a string, a replacement string must be provided for " +
            key
        );
      }
    }
<<<<<<< HEAD
    
    const parts = localizedStr.split(PLACEHOLDER);
=======
    const translated_key = SimpleI18n._translateKey(key);

    const parts = translated_key.split(PLACEHOLDER);
>>>>>>> 63ed53d55441018c4378d0d83cce661f86bdc324
    return parts[0] + input + parts[1];
  },
};

export default SimpleI18n;
