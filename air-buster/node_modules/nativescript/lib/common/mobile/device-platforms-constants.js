"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DevicePlatformsConstants {
    constructor() {
        this.iOS = "iOS";
        this.Android = "Android";
        this.WP8 = "WP8";
    }
}
exports.DevicePlatformsConstants = DevicePlatformsConstants;
$injector.register("devicePlatformsConstants", DevicePlatformsConstants);
