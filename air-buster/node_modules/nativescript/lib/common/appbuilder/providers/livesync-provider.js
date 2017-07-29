"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const appbuilder_livesync_provider_base_1 = require("./appbuilder-livesync-provider-base");
class LiveSyncProvider extends appbuilder_livesync_provider_base_1.AppBuilderLiveSyncProviderBase {
    constructor($androidLiveSyncServiceLocator, $iosLiveSyncServiceLocator) {
        super($androidLiveSyncServiceLocator, $iosLiveSyncServiceLocator);
    }
    buildForDevice(device) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`Application is not installed on device ${device.deviceInfo.identifier}. Cannot LiveSync changes without installing the application before that.`);
        });
    }
}
exports.LiveSyncProvider = LiveSyncProvider;
$injector.register("liveSyncProvider", LiveSyncProvider);
