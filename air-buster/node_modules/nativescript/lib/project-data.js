"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("./constants");
const path = require("path");
const os_1 = require("os");
class ProjectData {
    constructor($fs, $errors, $projectHelper, $staticConfig, $options, $logger) {
        this.$fs = $fs;
        this.$errors = $errors;
        this.$projectHelper = $projectHelper;
        this.$staticConfig = $staticConfig;
        this.$options = $options;
        this.$logger = $logger;
    }
    initializeProjectData(projectDir) {
        projectDir = projectDir || this.$projectHelper.projectDir;
        if (projectDir) {
            const projectFilePath = path.join(projectDir, this.$staticConfig.PROJECT_FILE_NAME);
            let data = null;
            if (this.$fs.exists(projectFilePath)) {
                let fileContent = null;
                try {
                    fileContent = this.$fs.readJson(projectFilePath);
                    data = fileContent[this.$staticConfig.CLIENT_NAME_KEY_IN_PROJECT_FILE];
                }
                catch (err) {
                    this.$errors.failWithoutHelp(`The project file ${this.projectFilePath} is corrupted. ${os_1.EOL}` +
                        `Consider restoring an earlier version from your source control or backup.${os_1.EOL}` +
                        `Additional technical info: ${err.toString()}`);
                }
                if (data) {
                    this.projectDir = projectDir;
                    this.projectName = this.$projectHelper.sanitizeName(path.basename(projectDir));
                    this.platformsDir = path.join(projectDir, constants.PLATFORMS_DIR_NAME);
                    this.projectFilePath = projectFilePath;
                    this.appDirectoryPath = path.join(projectDir, constants.APP_FOLDER_NAME);
                    this.appResourcesDirectoryPath = path.join(projectDir, constants.APP_FOLDER_NAME, constants.APP_RESOURCES_FOLDER_NAME);
                    this.projectId = data.id;
                    this.dependencies = fileContent.dependencies;
                    this.devDependencies = fileContent.devDependencies;
                    this.projectType = this.getProjectType();
                    return;
                }
            }
        }
        const currentDir = path.resolve(".");
        this.$logger.trace(`Unable to find project. projectDir: ${projectDir}, options.path: ${this.$options.path}, ${currentDir}`);
        this.$errors.fail("No project found at or above '%s' and neither was a --path specified.", projectDir || this.$options.path || currentDir);
    }
    getProjectType() {
        let detectedProjectType = _.find(ProjectData.PROJECT_TYPES, (projectType) => projectType.isDefaultProjectType).type;
        const deps = _.keys(this.dependencies).concat(_.keys(this.devDependencies));
        _.each(ProjectData.PROJECT_TYPES, projectType => {
            if (_.some(projectType.requiredDependencies, requiredDependency => deps.indexOf(requiredDependency) !== -1)) {
                detectedProjectType = projectType.type;
                return false;
            }
        });
        return detectedProjectType;
    }
}
ProjectData.PROJECT_TYPES = [
    {
        type: "Pure JavaScript",
        isDefaultProjectType: true
    },
    {
        type: "Angular",
        requiredDependencies: ["@angular/core", "nativescript-angular"]
    },
    {
        type: "Pure TypeScript",
        requiredDependencies: ["typescript", "nativescript-dev-typescript"]
    }
];
exports.ProjectData = ProjectData;
$injector.register("projectData", ProjectData);
