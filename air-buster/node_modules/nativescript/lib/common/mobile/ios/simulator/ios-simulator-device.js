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
const applicationManagerPath = require("./ios-simulator-application-manager");
const fileSystemPath = require("./ios-simulator-file-system");
const constants = require("../../../constants");
class IOSSimulator {
    constructor(simulator, $devicePlatformsConstants, $injector, $iOSSimResolver, $iOSSimulatorLogProvider) {
        this.simulator = simulator;
        this.$devicePlatformsConstants = $devicePlatformsConstants;
        this.$injector = $injector;
        this.$iOSSimResolver = $iOSSimResolver;
        this.$iOSSimulatorLogProvider = $iOSSimulatorLogProvider;
    }
    get deviceInfo() {
        return {
            identifier: this.simulator.id,
            displayName: this.simulator.name,
            model: _.last(this.simulator.fullId.split(".")),
            version: this.simulator.runtimeVersion,
            vendor: "Apple",
            platform: this.$devicePlatformsConstants.iOS,
            status: constants.CONNECTED_STATUS,
            errorHelp: null,
            isTablet: this.simulator.fullId.toLowerCase().indexOf("ipad") !== -1,
            type: constants.DeviceTypes.Emulator
        };
    }
    get isEmulator() {
        return true;
    }
    getApplicationInfo(applicationIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.applicationManager.getApplicationInfo(applicationIdentifier);
        });
    }
    get applicationManager() {
        if (!this._applicationManager) {
            this._applicationManager = this.$injector.resolve(applicationManagerPath.IOSSimulatorApplicationManager, { iosSim: this.$iOSSimResolver.iOSSim, identifier: this.simulator.id });
        }
        return this._applicationManager;
    }
    get fileSystem() {
        if (!this._fileSystem) {
            this._fileSystem = this.$injector.resolve(fileSystemPath.IOSSimulatorFileSystem, { iosSim: this.$iOSSimResolver.iOSSim });
        }
        return this._fileSystem;
    }
    openDeviceLogStream() {
        return __awaiter(this, void 0, void 0, function* () {
            this.$iOSSimulatorLogProvider.startLogProcess(this.simulator.id);
        });
    }
}
exports.IOSSimulator = IOSSimulator;
