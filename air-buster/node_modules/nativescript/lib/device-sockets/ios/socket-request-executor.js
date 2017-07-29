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
const constants = require("../../common/constants");
class IOSSocketRequestExecutor {
    constructor($errors, $iOSNotification, $iOSNotificationService, $logger) {
        this.$errors = $errors;
        this.$iOSNotification = $iOSNotification;
        this.$iOSNotificationService = $iOSNotificationService;
        this.$logger = $logger;
    }
    executeAttachRequest(device, timeout, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceIdentifier = device.deviceInfo.identifier;
            const observeNotificationSockets = [
                yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getAlreadyConnected(projectId), constants.IOS_OBSERVE_NOTIFICATION_COMMAND_TYPE),
                yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getReadyForAttach(projectId), constants.IOS_OBSERVE_NOTIFICATION_COMMAND_TYPE),
                yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getAttachAvailable(projectId), constants.IOS_OBSERVE_NOTIFICATION_COMMAND_TYPE)
            ];
            const observeNotificationPromises = _(observeNotificationSockets)
                .uniq()
                .map(s => {
                return this.$iOSNotificationService.awaitNotification(deviceIdentifier, +s, timeout);
            })
                .value();
            yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getAttachAvailabilityQuery(projectId));
            let receivedNotification;
            try {
                receivedNotification = yield Promise.race(observeNotificationPromises);
            }
            catch (e) {
                this.$errors.failWithoutHelp(`The application ${projectId} does not appear to be running on ${device.deviceInfo.displayName} or is not built with debugging enabled.`);
            }
            switch (receivedNotification) {
                case this.$iOSNotification.getAlreadyConnected(projectId):
                    this.$errors.failWithoutHelp("A client is already connected.");
                    break;
                case this.$iOSNotification.getAttachAvailable(projectId):
                    yield this.executeAttachAvailable(deviceIdentifier, projectId, timeout);
                    break;
                case this.$iOSNotification.getReadyForAttach(projectId):
                    break;
                default:
                    this.$logger.trace("Response from attach availability query:");
                    this.$logger.trace(receivedNotification);
                    this.$errors.failWithoutHelp("No notification received while executing attach request.");
            }
        });
    }
    executeLaunchRequest(deviceIdentifier, timeout, readyForAttachTimeout, projectId, shouldBreak) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appLaunchingSocket = yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getAppLaunching(projectId), constants.IOS_OBSERVE_NOTIFICATION_COMMAND_TYPE);
                yield this.$iOSNotificationService.awaitNotification(deviceIdentifier, +appLaunchingSocket, timeout);
                if (shouldBreak) {
                    yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getWaitForDebug(projectId));
                }
                const readyForAttachSocket = yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getReadyForAttach(projectId), constants.IOS_OBSERVE_NOTIFICATION_COMMAND_TYPE);
                const readyForAttachPromise = this.$iOSNotificationService.awaitNotification(deviceIdentifier, +readyForAttachSocket, readyForAttachTimeout);
                yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getAttachRequest(projectId));
                yield readyForAttachPromise;
            }
            catch (e) {
                this.$logger.trace("Launch request error:");
                this.$logger.trace(e);
                this.$errors.failWithoutHelp("Error while waiting for response from NativeScript runtime.");
            }
        });
    }
    executeAttachAvailable(deviceIdentifier, projectId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readyForAttachSocket = yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getReadyForAttach(projectId), constants.IOS_OBSERVE_NOTIFICATION_COMMAND_TYPE);
                const readyForAttachPromise = this.$iOSNotificationService.awaitNotification(deviceIdentifier, +readyForAttachSocket, timeout);
                yield this.$iOSNotificationService.postNotification(deviceIdentifier, this.$iOSNotification.getAttachRequest(projectId));
                yield readyForAttachPromise;
            }
            catch (e) {
                this.$errors.failWithoutHelp(`The application ${projectId} timed out when performing the socket handshake.`);
            }
        });
    }
}
exports.IOSSocketRequestExecutor = IOSSocketRequestExecutor;
$injector.register("iOSSocketRequestExecutor", IOSSocketRequestExecutor);
