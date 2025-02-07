export enum DeviceType {
  IOS = "IOS",
  ANDROID = "ANDROID",
  DESKTOP = "DESKTOP",
}

export class DeviceInfo {
  isStandAlone: boolean;
  canBeStandAlone: boolean;
  device: DeviceType;
  constructor(
    isStandAlone: boolean,
    canBeStandAlone: boolean,
    device: DeviceType
  ) {
    this.isStandAlone = isStandAlone;
    this.canBeStandAlone = canBeStandAlone;
    this.device = device;
  }
}

export interface DisplayOptions {
  showMobile: boolean;
  showDesktop: boolean;
}

export const DISPLAY_OPTIONS_DEFAULT: DisplayOptions = {
  showMobile: true,
  showDesktop: true
}

export function isDisplayOptions(obj: any): obj is DisplayOptions {
  return obj
    && typeof obj.showMobile === 'boolean'
    && typeof obj.showDesktop === 'boolean';
}

export interface ADHSBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface AddToHomeScreenOptions {
  appName: string;
  appIconUrl: string;
  assetUrl: string;
  maxModalDisplayCount: number;
  appNameDisplay?: "standalone" | "inline";
  displayOptions: DisplayOptions;
  allowClose?: boolean;
}

export interface AddToHomeScreenType {
  appName: string;
  appIconUrl: string;
  assetUrl: string;
  maxModalDisplayCount: number;
  displayOptions: DisplayOptions;
  allowClose: boolean;

  clearModalDisplayCount: () => void;
  isStandAlone: () => boolean;
  show: (locale: string) => DeviceInfo;
  closeModal: () => void;
  modalIsShowing: () => boolean;
  isDeviceIOS: () => boolean;
  isDeviceAndroid: () => boolean;
  isBrowserIOSSafari: () => boolean;
  isBrowserIOSChrome: () => boolean;
  isBrowserIOSFirefox: () => boolean;
  isBrowserIOSInAppFacebook: () => boolean;
  isBrowserIOSInAppLinkedin: () => boolean;
  isBrowserIOSInAppInstagram: () => boolean;
  isBrowserIOSInAppThreads: () => boolean;
  isBrowserIOSInAppTwitter: () => boolean;
  isBrowserAndroidChrome: () => boolean;
  isBrowserAndroidFacebook: () => boolean;
  isBrowserAndroidSamsung: () => boolean;
  isBrowserAndroidFirefox: () => boolean;
  isDesktopWindows: () => boolean;
  isDesktopMac: () => boolean;
  isDesktopChrome: () => boolean;
  isDesktopSafari: () => boolean;
  isDesktopEdge: () => boolean;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: ADHSBeforeInstallPromptEvent;
  }
}
