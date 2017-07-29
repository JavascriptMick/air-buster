"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_base_1 = require("./project-base");
class Project extends project_base_1.ProjectBase {
    constructor($cordovaProjectCapabilities, $errors, $fs, $logger, $nativeScriptProjectCapabilities, $options, $projectConstants, $staticConfig) {
        super($cordovaProjectCapabilities, $errors, $fs, $logger, $nativeScriptProjectCapabilities, $options, $projectConstants, $staticConfig);
        this.$cordovaProjectCapabilities = $cordovaProjectCapabilities;
        this.$errors = $errors;
        this.$fs = $fs;
        this.$logger = $logger;
        this.$nativeScriptProjectCapabilities = $nativeScriptProjectCapabilities;
        this.$options = $options;
        this.$projectConstants = $projectConstants;
        this.$staticConfig = $staticConfig;
    }
    validate() { }
    saveProjectIfNeeded() { }
}
exports.Project = Project;
$injector.register("project", Project);
