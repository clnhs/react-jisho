// Based on https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
export const isAppleDevice = () => {
    return navigator.userAgent.includes("Mac");
};
