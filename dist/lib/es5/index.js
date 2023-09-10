"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directusMigrator = void 0;
var migrators_1 = require("./migrators");
var Logger_1 = require("./utils/Logger");
/**
 *  Runs the Directus Migration
 */
function directusMigrator(source, target, args) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, force, roles, permissions, flows, schema, adminIds, adminIds;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = args.force, force = _a === void 0 ? false : _a, roles = args.roles, permissions = args.permissions, flows = args.flows, schema = args.schema;
                    if (!source || !target) {
                        Logger_1.default.error("Source and Target Environments are required");
                        return [2 /*return*/];
                    }
                    if (!(roles || permissions || schema || flows)) return [3 /*break*/, 6];
                    if (!schema) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, migrators_1.schemaMigrator)(source, target, force)];
                case 1: return [2 /*return*/, _b.sent()];
                case 2:
                    if (flows) {
                    }
                    if (!permissions) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, migrators_1.roleMigrator)(source, target)];
                case 3:
                    adminIds = _b.sent();
                    return [4 /*yield*/, (0, migrators_1.permissionMigrator)(source, target, adminIds)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 11];
                case 6: return [4 /*yield*/, (0, migrators_1.schemaMigrator)(source, target, force)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, (0, migrators_1.roleMigrator)(source, target)];
                case 8:
                    adminIds = _b.sent();
                    return [4 /*yield*/, (0, migrators_1.permissionMigrator)(source, target, adminIds)];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, (0, migrators_1.flowsMigrator)(source, target)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11:
                    Logger_1.default.info("Migration Completed!");
                    return [2 /*return*/];
            }
        });
    });
}
exports.directusMigrator = directusMigrator;
