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
const constants = require("../constants");
class CreateProjectCommand {
    constructor($projectService, $errors, $options, $stringParameterBuilder) {
        this.$projectService = $projectService;
        this.$errors = $errors;
        this.$options = $options;
        this.$stringParameterBuilder = $stringParameterBuilder;
        this.enableHooks = false;
        this.allowedParameters = [this.$stringParameterBuilder.createMandatoryParameter("Project name cannot be empty.")];
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((this.$options.tsc || this.$options.ng) && this.$options.template) {
                this.$errors.fail("You cannot use --ng or --tsc options together with --template.");
            }
            let selectedTemplate;
            if (this.$options.tsc) {
                selectedTemplate = constants.TYPESCRIPT_NAME;
            }
            else if (this.$options.ng) {
                selectedTemplate = constants.ANGULAR_NAME;
            }
            else {
                selectedTemplate = this.$options.template;
            }
            yield this.$projectService.createProject({
                projectName: args[0],
                template: selectedTemplate,
                appId: this.$options.appid,
                pathToProject: this.$options.path,
                force: this.$options.force,
                ignoreScripts: this.$options.ignoreScripts
            });
        });
    }
}
exports.CreateProjectCommand = CreateProjectCommand;
$injector.registerCommand("create", CreateProjectCommand);
