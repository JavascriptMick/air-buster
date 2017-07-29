"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DebugDataService {
    createDebugData(projectData, options) {
        return {
            applicationIdentifier: projectData.projectId,
            projectDir: projectData.projectDir,
            deviceIdentifier: options.device,
            projectName: projectData.projectName
        };
    }
}
exports.DebugDataService = DebugDataService;
$injector.register("debugDataService", DebugDataService);
