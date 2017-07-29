"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CordovaProjectCapabilities {
    get build() {
        return true;
    }
    get buildCompanion() {
        return true;
    }
    get deploy() {
        return true;
    }
    get simulate() {
        return true;
    }
    get livesync() {
        return true;
    }
    get livesyncCompanion() {
        return true;
    }
    get updateKendo() {
        return true;
    }
    get emulate() {
        return true;
    }
    get publish() {
        return false;
    }
    get uploadToAppstore() {
        return true;
    }
    get canChangeFrameworkVersion() {
        return true;
    }
    get imageGeneration() {
        return true;
    }
    get wp8Supported() {
        return true;
    }
}
exports.CordovaProjectCapabilities = CordovaProjectCapabilities;
$injector.register("cordovaProjectCapabilities", CordovaProjectCapabilities);
