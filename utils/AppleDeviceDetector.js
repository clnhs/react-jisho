// Based on https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
export const isAppleDevice = () => {
    return (
        [
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod",
        ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes("Mac") &&
            "ontouchend" in document) ||
        navigator.userAgent.includes("Mac") ||
        navigator.platform.toLowerCase().match("mac")
    );
};
