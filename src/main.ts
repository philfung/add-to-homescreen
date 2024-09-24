const { AddToHomeScreen } = require("./index");
import type { AddToHomeScreenOptions, AddToHomeScreenType } from "./types";

declare global {
  interface Window {
    AddToHomeScreen: (options: AddToHomeScreenOptions) => AddToHomeScreenType;
  }
}

window.AddToHomeScreen = AddToHomeScreen;
