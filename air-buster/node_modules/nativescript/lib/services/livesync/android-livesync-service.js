"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const android_device_livesync_service_1 = require("./android-device-livesync-service");
const platform_livesync_service_base_1 = require("./platform-livesync-service-base");
class AndroidLiveSyncService extends platform_livesync_service_base_1.PlatformLiveSyncServiceBase {
    constructor($platformsData, $projectFilesManager, $injector, $devicePathProvider, $fs, $logger, $projectFilesProvider) {
        super($fs, $logger, $platformsData, $projectFilesManager, $devicePathProvider, $projectFilesProvider);
        this.$platformsData = $platformsData;
        this.$projectFilesManager = $projectFilesManager;
        this.$injector = $injector;
    }
    _getDeviceLiveSyncService(device) {
        const service = this.$injector.resolve(android_device_livesync_service_1.AndroidDeviceLiveSyncService, { _device: device });
        return service;
    }
}
exports.AndroidLiveSyncService = AndroidLiveSyncService;
$injector.register("androidLiveSyncService", AndroidLiveSyncService);
