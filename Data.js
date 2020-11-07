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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var HouseScrape_1 = require("./HouseScrape");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, gov, sen, pres, hou, ResultCountyMap, stateTotals, closeStates, DemRaceDiff, RepRaceDiff, minimumCount, demDbDiff, repDbDiff;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    HouseScrape_1.GovResults,
                    HouseScrape_1.SenResults,
                    HouseScrape_1.PresResults,
                    HouseScrape_1.HouseResults
                ])];
            case 1:
                _a = _b.sent(), gov = _a[0], sen = _a[1], pres = _a[2], hou = _a[3];
                console.log(hou);
                ResultCountyMap = Object.keys(pres).reduce(function (counties, county) {
                    var _a, _b, _c, _d, _e, _f;
                    var votes = pres[county];
                    var _g = votes.sort(function (a, b) { return b[1] - a[1]; }), winning = _g[0], second = _g[1];
                    var winHouResults = (_a = hou[county]) === null || _a === void 0 ? void 0 : _a.filter(function (val) { return val[0] === winning[0]; }).reduce(function (acc, val) { return val[1] + acc; }, 0);
                    var secondHouResults = (_b = hou[county]) === null || _b === void 0 ? void 0 : _b.filter(function (val) { return val[0] === second[0]; }).reduce(function (acc, val) { return val[1] + acc; }, 0);
                    var winGovResults = (_c = gov[county]) === null || _c === void 0 ? void 0 : _c.filter(function (val) { return val[0] === winning[0]; }).reduce(function (acc, val) { return val[1] + acc; }, 0);
                    var secondGovResults = (_d = gov[county]) === null || _d === void 0 ? void 0 : _d.filter(function (val) { return val[0] === second[0]; }).reduce(function (acc, val) { return val[1] + acc; }, 0);
                    var winSenResults = (_e = sen[county]) === null || _e === void 0 ? void 0 : _e.filter(function (val) { return val[0] === winning[0]; }).reduce(function (acc, val) { return val[1] + acc; }, 0);
                    var secondSenResults = (_f = sen[county]) === null || _f === void 0 ? void 0 : _f.filter(function (val) { return val[0] === second[0]; }).reduce(function (acc, val) { return val[1] + acc; }, 0);
                    var wResult = {
                        pres: winning[1],
                        party: winning[0],
                        hou: winHouResults,
                        gov: winGovResults,
                        sen: winSenResults,
                        win: true
                    };
                    var lResult = {
                        pres: second[1],
                        party: second[0],
                        hou: secondHouResults,
                        gov: secondGovResults,
                        sen: secondSenResults,
                        win: false
                    };
                    counties[county] = {
                        Rep: wResult.party === "(R)" ? wResult : lResult,
                        Dem: wResult.party === "(D)" ? wResult : lResult
                    };
                    return counties;
                }, {});
                stateTotals = Object.keys(ResultCountyMap).reduce(function (prev, key) {
                    var state = key.split('-')[0];
                    prev[state] = prev[state] || { rep: 0, dem: 0 };
                    prev[state].dem += ResultCountyMap[key].Dem.pres;
                    prev[state].rep += ResultCountyMap[key].Rep.pres;
                    return prev;
                }, {});
                closeStates = Object.keys(stateTotals).map(function (key) {
                    var max = Math.max(stateTotals[key].dem, stateTotals[key].rep);
                    var min = Math.min(stateTotals[key].dem, stateTotals[key].rep);
                    return {
                        state: key,
                        margin: max - min,
                        close: (max - min) / min,
                        max: max,
                        min: min
                    };
                }).filter(function (val) { return val.close < 0.20; }).reduce(function (acc, val) {
                    acc[val.state] = val;
                    return acc;
                }, {});
                DemRaceDiff = Object.keys(ResultCountyMap).reduce(function (prev, current) {
                    prev.push([current, __assign(__assign({}, ResultCountyMap[current].Dem), { opp: ResultCountyMap[current].Rep })]);
                    return prev;
                }, []).filter(function (val) {
                    var state = val[0].split('-')[0];
                    return closeStates[state] && stateTotals[state].dem > stateTotals[state].rep;
                });
                RepRaceDiff = Object.keys(ResultCountyMap).reduce(function (prev, current) {
                    prev.push([current, __assign(__assign({}, ResultCountyMap[current].Rep), { opp: ResultCountyMap[current].Dem })]);
                    return prev;
                }, []).filter(function (val) {
                    var state = val[0].split('-')[0];
                    return closeStates[state] && stateTotals[state].dem < stateTotals[state].rep;
                });
                minimumCount = 175000;
                demDbDiff = {};
                console.log(__spreadArrays(DemRaceDiff.map(function (val) {
                    var state = val[0].split('-')[0];
                    var max = Math.max(val[1].gov || 0, val[1].sen || 0, val[1].hou || 0);
                    var downBallotDiff = (val[1].pres - max);
                    if (downBallotDiff > 0) {
                        demDbDiff[state] = (demDbDiff[state] || 0) + downBallotDiff;
                    }
                    var presTotal = val[1].pres;
                    return {
                        state: state,
                        county: val[0].split('-')[1],
                        presTotal: presTotal,
                        downBallotDiff: downBallotDiff,
                        data: val[1]
                    };
                }).map(function (val) {
                    var state = val.state;
                    if (val.downBallotDiff > 0 && demDbDiff[state]) {
                        return __assign(__assign({}, val), { downBallotDiffTotalPct: val.downBallotDiff / demDbDiff[state] });
                    }
                    return __assign(__assign({}, val), { downBallotDiffTotalPct: 0 });
                })).filter(function (val) { return val.presTotal > minimumCount; }).sort(function (a, b) {
                    return (b.downBallotDiffTotalPct) - (a.downBallotDiffTotalPct);
                }));
                repDbDiff = {};
                console.log(__spreadArrays(RepRaceDiff.map(function (val) {
                    var state = val[0].split('-')[0];
                    var max = Math.max(val[1].gov || 0, val[1].sen || 0, val[1].hou || 0);
                    var downBallotDiff = (val[1].pres - max);
                    if (downBallotDiff > 0) {
                        repDbDiff[state] = (repDbDiff[state] || 0) + downBallotDiff;
                    }
                    var presTotal = val[1].pres;
                    return {
                        state: state,
                        county: val[0].split('-')[1],
                        presTotal: presTotal,
                        downBallotDiff: downBallotDiff,
                        data: val[1]
                    };
                }).map(function (val) {
                    var state = val.state;
                    if (val.downBallotDiff > 0 && repDbDiff[state]) {
                        return __assign(__assign({}, val), { downBallotDiffTotalPct: val.downBallotDiff / repDbDiff[state] });
                    }
                    return __assign(__assign({}, val), { downBallotDiffTotalPct: 0 });
                })).filter(function (val) { return val.presTotal > minimumCount; }).sort(function (a, b) {
                    return (b.downBallotDiffTotalPct) - (a.downBallotDiffTotalPct);
                }));
                return [2 /*return*/];
        }
    });
}); })().then(console.log);
