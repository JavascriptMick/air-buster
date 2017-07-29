"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppBuilderLiveSyncProviderBase {
    constructor($androidLiveSyncServiceLocator, $iosLiveSyncServiceLocator) {
        this.$androidLiveSyncServiceLocator = $androidLiveSyncServiceLocator;
        this.$iosLiveSyncServiceLocator = $iosLiveSyncServiceLocator;
    }
    get deviceSpecificLiveSyncServices() {
        return {
            android: (_device, $injector) => {
                return $injector.resolve(this.$androidLiveSyncServiceLocator.factory, { _device: _device });
            },
            ios: (_device, $injector) => {
                return $injector.resolve(this.$iosLiveSyncServiceLocator.factory, { _device: _device });
            }
        };
    }
    preparePlatformForSync(platform) {
        return;
    }
    canExecuteFastSync(filePath) {
        return false;
    }
    transferFiles(deviceAppData, localToDevicePaths, projectFilesPath, isFullSync) {
        return deviceAppData.device.fileSystem.transferFiles(deviceAppData, localToDevicePaths);
    }
}
exports.AppBuilderLiveSyncProviderBase = AppBuilderLiveSyncProviderBase;
