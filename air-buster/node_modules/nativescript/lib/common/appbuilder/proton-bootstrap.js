"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./appbuilder-bootstrap");
$injector.require("messages", "./messages/messages");
const options_1 = require("../options");
$injector.require("staticConfig", "./appbuilder/proton-static-config");
$injector.register("config", {});
$injector.register("analyiticsService", {});
$injector.register("options", $injector.resolve(options_1.OptionsBase, { options: {}, defaultProfileDir: "" }));
$injector.requirePublicClass("deviceEmitter", "./appbuilder/device-emitter");
$injector.requirePublicClass("deviceLogProvider", "./appbuilder/device-log-provider");
const errors_1 = require("../errors");
errors_1.installUncaughtExceptionListener();
$injector.register("emulatorSettingsService", {
    canStart(platform) {
        return true;
    },
    minVersion() {
        return 10;
    }
});
$injector.require("logger", "./logger");
$injector.register("deployHelper", {
    deploy: (platform) => Promise.resolve()
});
$injector.require("liveSyncProvider", "./appbuilder/providers/livesync-provider");
$injector.requirePublic("liveSyncService", "./appbuilder/services/livesync/livesync-service");
$injector.require("project", "./appbuilder/project/project");
