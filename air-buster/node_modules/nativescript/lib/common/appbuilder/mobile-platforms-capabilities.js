"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MobilePlatformsCapabilities {
    getPlatformNames() {
        return _.keys(this.getAllCapabilities());
    }
    getAllCapabilities() {
        this.platformCapabilities = this.platformCapabilities || {
            iOS: {
                wirelessDeploy: true,
                cableDeploy: true,
                companion: true,
                hostPlatformsForDeploy: ["win32", "darwin"]
            },
            Android: {
                wirelessDeploy: true,
                cableDeploy: true,
                companion: true,
                hostPlatformsForDeploy: ["win32", "darwin", "linux"]
            },
            WP8: {
                wirelessDeploy: true,
                cableDeploy: false,
                companion: true,
                hostPlatformsForDeploy: ["win32"]
            }
        };
        return this.platformCapabilities;
    }
}
exports.MobilePlatformsCapabilities = MobilePlatformsCapabilities;
$injector.register("mobilePlatformsCapabilities", MobilePlatformsCapabilities);
