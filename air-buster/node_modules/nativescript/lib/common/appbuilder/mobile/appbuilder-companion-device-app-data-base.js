"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appbuilder_device_app_data_base_1 = require("./appbuilder-device-app-data-base");
class AppBuilderCompanionDeviceAppDataBase extends appbuilder_device_app_data_base_1.AppBuilderDeviceAppDataBase {
    isLiveSyncSupported() {
        return this.device.applicationManager.isApplicationInstalled(this.appIdentifier);
    }
    getLiveSyncNotSupportedError() {
        return `Cannot LiveSync changes to the ${this.getCompanionAppName()}. The ${this.getCompanionAppName()} is not installed on ${this.device.deviceInfo.identifier}.`;
    }
}
exports.AppBuilderCompanionDeviceAppDataBase = AppBuilderCompanionDeviceAppDataBase;
