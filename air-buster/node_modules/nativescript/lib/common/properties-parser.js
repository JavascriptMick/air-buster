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
const propertiesParser = require("properties-parser");
const assert = require("assert");
class PropertiesParser {
    constructor() {
        this._editor = null;
    }
    parse(text) {
        return propertiesParser.parse(text);
    }
    read(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                propertiesParser.read(filePath, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    createEditor(filePath) {
        return new Promise((resolve, reject) => {
            propertiesParser.createEditor(filePath, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    this._editor = data;
                    resolve(this._editor);
                }
            });
        });
    }
    saveEditor() {
        return __awaiter(this, void 0, void 0, function* () {
            assert.ok(this._editor, "Editor is undefied. Ensure that createEditor is called.");
            return new Promise((resolve, reject) => {
                this._editor.save((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
}
exports.PropertiesParser = PropertiesParser;
$injector.register("propertiesParser", PropertiesParser);
