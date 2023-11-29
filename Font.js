import { Nunito_400Regular } from "@expo-google-fonts/nunito";
import * as Font from "expo-font";

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      Nunito_400Regular,
    });
    return true;
  } catch (error) {
    console.error("Error loading fonts:", error);
    return false;
  }
};

export const Fonts = {
  nunito: "Nunito_400Regular",
  medium: 16,
};