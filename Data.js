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
var ECMap_1 = require("./ECMap");
var HouseScrape_1 = require("./HouseScrape");
var PopulationMap_1 = require("./PopulationMap");
var promises_1 = require("fs/promises");
function scrape() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 5]);
                    return [4 /*yield*/, Promise.all([
                            HouseScrape_1.GovResults(),
                            HouseScrape_1.SenResults(),
                            HouseScrape_1.PresResults(),
                            HouseScrape_1.HouseResults()
                        ])];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_1 = _a.sent();
                    return [4 /*yield*/, new Promise(function (res) { setTimeout(res, 1000); })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, scrape()];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, gov, sen, pres, hou, ResultCountyMap, stateTotals, ECAndPopularResultsWeightedByCounty, closeStates, DemocratRaces, DemRaceDiff, RepublicanRaces, RepRaceDiff, DownBallotDiffsByStraight, minimumCount, demDbDiff, repDbDiff, largestNoDownBallotCounties;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, scrape()];
            case 1:
                _a = _b.sent(), gov = _a[0], sen = _a[1], pres = _a[2], hou = _a[3];
                ResultCountyMap = Object.keys(pres).reduce(function (counties, county) {
                    var _a, _b, _c, _d, _e, _f;
                    var votes = pres[county];
                    var _g = votes.sort(function (a, b) { return b[1] - a[1]; }), winning = _g[0], second = _g[1];
                    var winHouResults = (_a = hou[county]) === null || _a === void 0 ? void 0 : _a.filter(function (val) { return val[0] === winning[0]; }).reduce(function (acc, val) { return Math.max(val[1], acc); }, 0);
                    var secondHouResults = (_b = hou[county]) === null || _b === void 0 ? void 0 : _b.filter(function (val) { return val[0] === second[0]; }).reduce(function (acc, val) { return Math.max(val[1], acc); }, 0);
                    var winGovResults = (_c = gov[county]) === null || _c === void 0 ? void 0 : _c.filter(function (val) { return val[0] === winning[0]; }).reduce(function (acc, val) { return Math.max(val[1], acc); }, 0);
                    var secondGovResults = (_d = gov[county]) === null || _d === void 0 ? void 0 : _d.filter(function (val) { return val[0] === second[0]; }).reduce(function (acc, val) { return Math.max(val[1], acc); }, 0);
                    var winSenResults = (_e = sen[county]) === null || _e === void 0 ? void 0 : _e.filter(function (val) { return val[0] === winning[0]; }).reduce(function (acc, val) { return Math.max(val[1], acc); }, 0);
                    var secondSenResults = (_f = sen[county]) === null || _f === void 0 ? void 0 : _f.filter(function (val) { return val[0] === second[0]; }).reduce(function (acc, val) { return Math.max(val[1], acc); }, 0);
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
                    var countyPopulation = PopulationMap_1.populationMap[key];
                    prev[state] = prev[state] || { rep: 0, dem: 0, weightedRep: 0, weightedDem: 0, EC: ECMap_1.StateECMap[state], population: 0 };
                    var DemPresVote = ResultCountyMap[key].Dem.pres;
                    var RepPresVote = ResultCountyMap[key].Rep.pres;
                    if (!DemPresVote && !RepPresVote) {
                        DemPresVote = 1;
                        RepPresVote = 1;
                    }
                    prev[state].dem += DemPresVote;
                    prev[state].rep += RepPresVote;
                    prev[state].weightedDem += countyPopulation * (DemPresVote / (DemPresVote + RepPresVote));
                    prev[state].weightedRep += countyPopulation * (RepPresVote / (DemPresVote + RepPresVote));
                    prev[state].population += countyPopulation;
                    return prev;
                }, {});
                ECAndPopularResultsWeightedByCounty = Object.keys(stateTotals).reduce(function (acc, key) {
                    if (stateTotals[key].weightedRep < stateTotals[key].weightedDem) {
                        acc.demEC += stateTotals[key].EC;
                        var margin = stateTotals[key].weightedDem - stateTotals[key].weightedRep;
                        var pctMargin = margin / stateTotals[key].population;
                        acc.demStates.push({ key: key, margin: margin, pctMargin: pctMargin });
                    }
                    if (stateTotals[key].weightedRep > stateTotals[key].weightedDem) {
                        acc.repEC += stateTotals[key].EC;
                        var margin = stateTotals[key].weightedRep - stateTotals[key].weightedDem;
                        var pctMargin = margin / stateTotals[key].population;
                        acc.repStates.push({ key: key, margin: margin, pctMargin: pctMargin });
                    }
                    acc.repWeightedTotal += stateTotals[key].weightedRep || 0;
                    acc.demWeightedTotal += stateTotals[key].weightedDem || 0;
                    return acc;
                }, { demEC: 0, repEC: 0, repStates: [], repWeightedTotal: 0, demStates: [], demWeightedTotal: 0 });
                ECAndPopularResultsWeightedByCounty.repStates = ECAndPopularResultsWeightedByCounty.repStates.sort(function (a, b) { return a.pctMargin - b.pctMargin; });
                ECAndPopularResultsWeightedByCounty.demStates = ECAndPopularResultsWeightedByCounty.demStates.sort(function (a, b) { return a.pctMargin - b.pctMargin; });
                console.log(ECAndPopularResultsWeightedByCounty);
                promises_1.writeFile("./Outputs/CountyWeightedResults.json", JSON.stringify(ECAndPopularResultsWeightedByCounty), "utf-8");
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
                DemocratRaces = Object.keys(ResultCountyMap).reduce(function (prev, current) {
                    prev.push([current, __assign(__assign({}, ResultCountyMap[current].Dem), { opp: ResultCountyMap[current].Rep })]);
                    return prev;
                }, []);
                DemRaceDiff = DemocratRaces.filter(function (val) {
                    var state = val[0].split('-')[0];
                    return closeStates[state] && stateTotals[state].dem > stateTotals[state].rep;
                });
                RepublicanRaces = Object.keys(ResultCountyMap).reduce(function (prev, current) {
                    prev.push([current, __assign(__assign({}, ResultCountyMap[current].Rep), { opp: ResultCountyMap[current].Dem })]);
                    return prev;
                }, []);
                RepRaceDiff = RepublicanRaces.filter(function (val) {
                    var state = val[0].split('-')[0];
                    return closeStates[state] && stateTotals[state].dem < stateTotals[state].rep;
                });
                DownBallotDiffsByStraight = RepublicanRaces.reduce(function (acc, val) {
                    var _a = val[0].split('-'), state = _a[0], county = _a[1];
                    var result = val[1];
                    var straight = Math.min(result.gov || Infinity, result.sen || Infinity, result.hou || Infinity);
                    var nonStraight = result.pres - straight;
                    var oppStraight = Math.min(result.opp.gov || Infinity, result.opp.sen || Infinity, result.opp.hou || Infinity);
                    var oppNonStraight = val[1].opp.pres - oppStraight;
                    var straightPct = straight / (straight + oppStraight) * 100;
                    var nonStraightPct = nonStraight / (nonStraight + oppNonStraight) * 100;
                    acc[state] = acc[state] || [];
                    if ([(straightPct), (nonStraightPct - straightPct)].includes(NaN)) {
                        return acc;
                    }
                    acc[state].push([(straightPct), (nonStraightPct - straightPct), county]);
                    return acc;
                }, {});
                Object.keys(DownBallotDiffsByStraight).forEach(function (key) { return DownBallotDiffsByStraight[key] = DownBallotDiffsByStraight[key].sort(function (a, b) { return a[0] - b[0]; }).filter(function (val) { return Math.abs(val[1]) < 100; }); });
                console.log(DownBallotDiffsByStraight);
                promises_1.writeFile("./Outputs/CountyDownBallotDiffsByStraight.json", JSON.stringify(DownBallotDiffsByStraight), "utf-8");
                minimumCount = 175000;
                demDbDiff = {};
                repDbDiff = {};
                largestNoDownBallotCounties = (__spreadArrays(DemRaceDiff.map(function (val) {
                    var state = val[0].split('-')[0];
                    var max = Math.max(val[1].gov || 0, val[1].sen || 0, val[1].hou || 0);
                    var downBallotDiff = (val[1].pres - max);
                    if (downBallotDiff > 0) {
                        demDbDiff[state] = (demDbDiff[state] || 0) + downBallotDiff;
                    }
                    var oppmax = Math.max(val[1].opp.gov || 0, val[1].opp.sen || 0, val[1].opp.hou || 0);
                    var oppositionDownBallotDiff = (val[1].opp.pres - oppmax);
                    if (oppositionDownBallotDiff > 0) {
                        repDbDiff[state] = (repDbDiff[state] || 0) + oppositionDownBallotDiff;
                    }
                    var leadingPresidentVote = val[1].pres;
                    return {
                        state: state,
                        county: val[0].split('-')[1],
                        leadingPresidentVote: leadingPresidentVote,
                        downBallotDiff: downBallotDiff,
                        oppositionDownBallotDiff: oppositionDownBallotDiff,
                        data: val[1]
                    };
                }).map(function (val) {
                    var state = val.state;
                    var downBallotPct = {
                        main: val.downBallotDiff > 0 && demDbDiff[state] ? val.downBallotDiff : 0,
                        opp: val.oppositionDownBallotDiff > 0 && repDbDiff[state] ? val.oppositionDownBallotDiff : 0
                    };
                    return __assign(__assign({}, val), { pctDeltaDownBallotDiff: (downBallotPct.main - downBallotPct.opp) / (demDbDiff[state] - repDbDiff[state]) * 100 });
                }), RepRaceDiff.map(function (val) {
                    var state = val[0].split('-')[0];
                    var max = Math.max(val[1].gov || 0, val[1].sen || 0, val[1].hou || 0);
                    var downBallotDiff = (val[1].pres - max);
                    if (downBallotDiff > 0) {
                        repDbDiff[state] = (repDbDiff[state] || 0) + downBallotDiff;
                    }
                    var oppmax = Math.max(val[1].opp.gov || 0, val[1].opp.sen || 0, val[1].opp.hou || 0);
                    var oppositionDownBallotDiff = (val[1].opp.pres - oppmax);
                    if (oppositionDownBallotDiff > 0) {
                        demDbDiff[state] = (demDbDiff[state] || 0) + oppositionDownBallotDiff;
                    }
                    var leadingPresidentVote = val[1].pres;
                    return {
                        state: state,
                        county: val[0].split('-')[1],
                        leadingPresidentVote: leadingPresidentVote,
                        downBallotDiff: downBallotDiff,
                        oppositionDownBallotDiff: oppositionDownBallotDiff,
                        data: val[1]
                    };
                }).map(function (val) {
                    var state = val.state;
                    var downBallotPct = {
                        main: val.downBallotDiff > 0 && repDbDiff[state] ? val.downBallotDiff : 0,
                        opp: val.oppositionDownBallotDiff > 0 && demDbDiff[state] ? val.oppositionDownBallotDiff : 0
                    };
                    return __assign(__assign({}, val), { pctDeltaDownBallotDiff: (downBallotPct.opp - downBallotPct.main) / (demDbDiff[state] - repDbDiff[state]) * 100 });
                })).filter(function (val) { return val.leadingPresidentVote > minimumCount; }).sort(function (a, b) {
                    return (b.pctDeltaDownBallotDiff) - (a.pctDeltaDownBallotDiff);
                }));
                promises_1.writeFile("./Outputs/LargestNoDownBallotCounties.json", JSON.stringify(largestNoDownBallotCounties), "utf-8");
                return [2 /*return*/];
        }
    });
}); })().then();
