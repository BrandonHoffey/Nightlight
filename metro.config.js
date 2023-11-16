// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Uncomment the following lines to enable Flipper
if (process.env.FLIPPER_ENABLED === "true") {
  config.plugins.push(require("react-native-flipper"));
}

module.exports = config;
