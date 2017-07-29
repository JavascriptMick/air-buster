"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../common/decorators");
const path = require("path");
class DeviceLiveSyncServiceBase {
    constructor($platformsData) {
        this.$platformsData = $platformsData;
    }
    canExecuteFastSync(filePath, projectData, platform) {
        const fastSyncFileExtensions = this.getFastLiveSyncFileExtensions(platform, projectData);
        return _.includes(fastSyncFileExtensions, path.extname(filePath));
    }
    getFastLiveSyncFileExtensions(platform, projectData) {
        const platformData = this.$platformsData.getPlatformData(platform, projectData);
        const fastSyncFileExtensions = DeviceLiveSyncServiceBase.FAST_SYNC_FILE_EXTENSIONS.concat(platformData.fastLivesyncFileExtensions);
        return fastSyncFileExtensions;
    }
}
DeviceLiveSyncServiceBase.FAST_SYNC_FILE_EXTENSIONS = [".css", ".xml", ".html"];
__decorate([
    decorators_1.cache()
], DeviceLiveSyncServiceBase.prototype, "getFastLiveSyncFileExtensions", null);
exports.DeviceLiveSyncServiceBase = DeviceLiveSyncServiceBase;
