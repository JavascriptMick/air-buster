"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NativeScriptProjectCapabilities {
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
        return false;
    }
    get livesync() {
        return true;
    }
    get livesyncCompanion() {
        return true;
    }
    get updateKendo() {
        return false;
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
        return false;
    }
}
exports.NativeScriptProjectCapabilities = NativeScriptProjectCapabilities;
$injector.register("nativeScriptProjectCapabilities", NativeScriptProjectCapabilities);
