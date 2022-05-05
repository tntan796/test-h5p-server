"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
/**
 * @param h5pEditor
 * @param h5pPlayer
 * @param languageOverride the language to use. Set it to 'auto' to use the
 * language set by a language detector in the req.language property.
 * (recommended)
 */
function default_1(h5pEditor, h5pPlayer, languageOverride) {
    var _this = this;
    if (languageOverride === void 0) { languageOverride = 'auto'; }
    var router = express_1["default"].Router();
    router.get("/:contentId/play", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var content, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, h5pPlayer.render(req.params.contentId)];
                case 1:
                    content = _a.sent();
                    res.send(content);
                    res.status(200).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).end(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    router.get('/:contentId/edit', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var editorModel, content;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, h5pEditor.render(req.params.contentId === 'undefined'
                        ? undefined
                        : req.params.contentId, languageOverride === 'auto'
                        ? (_a = req.language) !== null && _a !== void 0 ? _a : 'en' : languageOverride)];
                case 1:
                    editorModel = (_b.sent());
                    if (!(!req.params.contentId || req.params.contentId === 'undefined')) return [3 /*break*/, 2];
                    res.send(editorModel);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, h5pEditor.getContent(req.params.contentId)];
                case 3:
                    content = _b.sent();
                    res.send(__assign(__assign({}, editorModel), { library: content.library, metadata: content.params.metadata, params: content.params.params }));
                    _b.label = 4;
                case 4:
                    res.status(200).end();
                    return [2 /*return*/];
            }
        });
    }); });
    router.post('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, contentId, metadata;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!req.body.params ||
                        !req.body.params.params ||
                        !req.body.params.metadata ||
                        !req.body.library ||
                        !req.user) {
                        res.status(400).send('Malformed request').end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, h5pEditor.saveOrUpdateContentReturnMetaData(undefined, req.body.params.params, req.body.params.metadata, req.body.library, req.user)];
                case 1:
                    _a = _b.sent(), contentId = _a.id, metadata = _a.metadata;
                    res.send(JSON.stringify({ contentId: contentId, metadata: metadata }));
                    res.status(200).end();
                    return [2 /*return*/];
            }
        });
    }); });
    router.patch('/:contentId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, contentId, metadata;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!req.body.params ||
                        !req.body.params.params ||
                        !req.body.params.metadata ||
                        !req.body.library ||
                        !req.user) {
                        res.status(400).send('Malformed request').end();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, h5pEditor.saveOrUpdateContentReturnMetaData(req.params.contentId.toString(), req.body.params.params, req.body.params.metadata, req.body.library, req.user)];
                case 1:
                    _a = _b.sent(), contentId = _a.id, metadata = _a.metadata;
                    res.send(JSON.stringify({ contentId: contentId, metadata: metadata }));
                    res.status(200).end();
                    return [2 /*return*/];
            }
        });
    }); });
    router["delete"]('/:contentId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, h5pEditor.deleteContent(req.params.contentId, req.user)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.send("Error deleting content with id " + req.params.contentId + ": " + error_2.message);
                    res.status(500).end();
                    return [2 /*return*/];
                case 3:
                    res.send("Content " + req.params.contentId + " successfully deleted.");
                    res.status(200).end();
                    return [2 /*return*/];
            }
        });
    }); });
    router.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var contentIds, contentObjects;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, h5pEditor.contentManager.listContent()];
                case 1:
                    contentIds = _a.sent();
                    return [4 /*yield*/, Promise.all(contentIds.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = {};
                                        return [4 /*yield*/, h5pEditor.contentManager.getContentMetadata(id, req.user)];
                                    case 1: return [2 /*return*/, (_a.content = _b.sent(),
                                            _a.id = id,
                                            _a)];
                                }
                            });
                        }); }))];
                case 2:
                    contentObjects = _a.sent();
                    res.status(200).send(contentObjects.map(function (o) {
                        return {
                            contentId: o.id,
                            title: o.content.title,
                            mainLibrary: o.content.mainLibrary
                        };
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    return router;
}
exports["default"] = default_1;
//# sourceMappingURL=routes.js.map