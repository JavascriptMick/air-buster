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
require("./bootstrap");
const shelljs = require("shelljs");
shelljs.config.silent = true;
shelljs.config.fatal = true;
const errors_1 = require("./common/errors");
errors_1.installUncaughtExceptionListener(process.exit.bind(process, 120));
const helpers_1 = require("./common/helpers");
(() => __awaiter(this, void 0, void 0, function* () {
    const config = $injector.resolve("$config");
    const err = $injector.resolve("$errors");
    err.printCallStack = config.DEBUG;
    const logger = $injector.resolve("logger");
    const extensibilityService = $injector.resolve("extensibilityService");
    try {
        yield helpers_1.settlePromises(extensibilityService.loadExtensions());
    }
    catch (err) {
        logger.trace("Unable to load extensions. Error is: ", err);
    }
    const commandDispatcher = $injector.resolve("commandDispatcher");
    const messages = $injector.resolve("$messagesService");
    messages.pathsToMessageJsonFiles = [];
    if (process.argv[2] === "completion") {
        yield commandDispatcher.completeCommand();
    }
    else {
        yield commandDispatcher.dispatchCommand();
    }
    $injector.dispose();
}))();
