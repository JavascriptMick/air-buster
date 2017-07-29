"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("../../helpers");
class DeviceAppDataBase {
    constructor(_appIdentifier) {
        this._appIdentifier = _appIdentifier;
    }
    get appIdentifier() {
        return this._appIdentifier;
    }
    _getDeviceProjectRootPath(projectRoot) {
        return helpers.fromWindowsRelativePathToUnix(projectRoot);
    }
}
exports.DeviceAppDataBase = DeviceAppDataBase;
