import AddToHomeScreen from "./index";
import { AddToHomeScreenOptions, AddToHomeScreenType } from "./types";

declare global {
  interface Window {
    AddToHomeScreen: (options: AddToHomeScreenOptions) => AddToHomeScreenType;
  }
}

window.AddToHomeScreen = AddToHomeScreen;
