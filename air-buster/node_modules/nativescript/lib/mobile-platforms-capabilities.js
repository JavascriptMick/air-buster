"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MobilePlatformsCapabilities {
    getPlatformNames() {
        return _.keys(this.getAllCapabilities());
    }
    getAllCapabilities() {
        this.platformCapabilities = this.platformCapabilities || {
            iOS: {
                wirelessDeploy: false,
                cableDeploy: true,
                companion: false,
                hostPlatformsForDeploy: ["darwin"]
            },
            Android: {
                wirelessDeploy: false,
                cableDeploy: true,
                companion: false,
                hostPlatformsForDeploy: ["win32", "darwin", "linux"]
            }
        };
        return this.platformCapabilities;
    }
}
exports.MobilePlatformsCapabilities = MobilePlatformsCapabilities;
$injector.register("mobilePlatformsCapabilities", MobilePlatformsCapabilities);
