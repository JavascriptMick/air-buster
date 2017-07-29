"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlatformsData {
    constructor($androidProjectService, $iOSProjectService) {
        this.platformsData = {};
        this.platformsData = {
            ios: $iOSProjectService,
            android: $androidProjectService
        };
    }
    get platformsNames() {
        return Object.keys(this.platformsData);
    }
    getPlatformData(platform, projectData) {
        const platformKey = platform && _.first(platform.toLowerCase().split("@"));
        let platformData;
        if (platformKey) {
            platformData = this.platformsData[platformKey] && this.platformsData[platformKey].getPlatformData(projectData);
        }
        return platformData;
    }
    get availablePlatforms() {
        return {
            iOS: "ios",
            Android: "android"
        };
    }
}
exports.PlatformsData = PlatformsData;
$injector.register("platformsData", PlatformsData);
