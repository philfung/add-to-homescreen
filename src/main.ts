import AddToHomeScreen from './index';

declare global {
  interface Window {
	AddToHomeScreen: typeof AddToHomeScreen;
  }
}

window.AddToHomeScreen = AddToHomeScreen;   