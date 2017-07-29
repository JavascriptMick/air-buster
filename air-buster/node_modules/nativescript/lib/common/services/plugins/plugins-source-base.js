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
class PluginsSourceBase {
    constructor($progressIndicator, $logger) {
        this.$progressIndicator = $progressIndicator;
        this.$logger = $logger;
    }
    initialize(projectDir, keywords) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isInitialized) {
                return;
            }
            this.plugins = [];
            this.projectDir = projectDir;
            this._isInitialized = true;
            this.$logger.printInfoMessageOnSameLine(this.progressIndicatorMessage);
            yield this.$progressIndicator.showProgressIndicator(this.initializeCore(projectDir, keywords), 2000);
        });
    }
    hasPlugins() {
        return !!(this.plugins && this.plugins.length);
    }
    getAllPlugins() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.plugins;
        });
    }
}
exports.PluginsSourceBase = PluginsSourceBase;
