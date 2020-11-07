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
exports.SenResults = exports.PresResults = exports.GovResults = exports.HouseResults = void 0;
var node_fetch_1 = require("node-fetch");
var promises_1 = require("fs/promises");
var node_html_parser_1 = require("node-html-parser");
var lodash_1 = require("lodash");
var Urls = {
    HouseResults: [
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AL-1005/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AL-1374/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AL-1375/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AL-1011/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-3004/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-3006/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-3008/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-3010/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-3012/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-3544/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-3920/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-3924/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AZ-4173/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AR-5105/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AR-6092/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-AR-5107/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-6478/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5692/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5693/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5694/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5695/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5696/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5697/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5698/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5699/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-8514/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5701/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5702/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5703/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5704/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5705/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5706/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5707/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5708/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5709/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5710/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5711/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5712/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5713/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5714/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5715/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5716/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5717/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5718/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5719/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5720/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5721/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5722/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5723/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-8725/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5725/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5726/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5727/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5728/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5729/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5730/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5731/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5732/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5733/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5734/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5735/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5736/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5739/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-8149/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5741/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5742/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-6235/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-7296/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CA-5744/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CO-7191/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CO-6614/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CO-6615/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CO-6616/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CO-6617/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CO-6618/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CO-6954/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CT-7007/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CT-7009/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CT-7011/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CT-7013/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-CT-7015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-DE-8074/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-11126/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10011/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10013/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10017/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10019/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10021/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10023/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10025/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10027/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10029/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10031/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10033/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10035/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10037/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10039/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10041/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-11670/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10401/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10393/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10396/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-10398/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-11128/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-11586/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-FL-11587/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11007/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11009/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11011/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11013/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-12547/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11019/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11021/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11023/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11025/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-11610/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-12237/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-12238/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-GA-12463/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-HI-12881/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-HI-12008/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-ID-13253/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-ID-13254/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15990/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16310/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15992/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15993/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15994/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15995/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15996/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15997/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15998/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-15999/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16000/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16001/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16002/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16003/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16004/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16005/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16006/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IL-16414/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15014/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15017/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15020/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15023/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15026/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15029/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15032/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15035/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IN-15038/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IA-17071/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IA-17072/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IA-17073/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-IA-17074/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KS-17007/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KS-17355/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KS-17009/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KS-17720/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KY-18622/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KY-18624/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KY-18009/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KY-18835/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KY-18013/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-KY-18015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-LA-20048/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-LA-20049/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-LA-20050/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-LA-20051/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-LA-20052/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-LA-20053/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-ME-20644/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-ME-20645/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MD-21746/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MD-21749/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MD-21752/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MD-21754/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MD-21757/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MD-21760/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MD-21762/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MD-21764/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MA-22948/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MA-22950/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MA-24356/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MA-22952/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MA-22953/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MA-22954/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MA-23865/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23805/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23806/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23807/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23808/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23809/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23810/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23811/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23812/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23813/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23814/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23815/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23816/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23817/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MI-23818/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MN-24007/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MN-24010/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MN-24013/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MN-24016/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MN-24019/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MN-24022/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MN-24025/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MN-24028/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MS-27167/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MS-25929/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MS-26488/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MO-27025/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MO-26023/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MO-26025/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MO-26027/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MO-26029/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MO-26031/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MO-26033/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MO-26035/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-MT-28447/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NE-28382/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NE-28385/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NE-28384/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NV-3/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NV-30989/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NV-30155/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NV-30992/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NH-30015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NH-30017/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31202/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31205/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31216/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31208/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31211/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31212/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31218/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31215/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31226/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31220/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31230/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NJ-31223/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NM-32005/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NM-33279/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NM-32052/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36581/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36582/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36583/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36584/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36586/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36587/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36588/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-39860/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36590/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36591/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36592/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36593/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36594/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36595/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36596/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36597/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36598/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36599/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36600/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36601/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36602/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36603/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36604/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-36605/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-39859/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NY-40344/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-35385/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-35386/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-34969/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-35387/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-35388/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-35389/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-34973/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-35390/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-34975/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-35391/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-34977/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-NC-35753/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-ND-35342/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-37258/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36019/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36021/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36023/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36025/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36027/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-37564/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36031/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36033/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36035/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-37571/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36039/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36041/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36043/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OH-36045/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OK-37030/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OK-37855/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OK-37034/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OK-37036/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OK-37856/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OR-39031/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OR-38529/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OR-38530/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OR-38531/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-OR-38532/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39008/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39303/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39010/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39011/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39012/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39013/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39014/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-40041/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39017/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39018/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39019/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39020/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39021/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-40306/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39023/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39024/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-PA-39025/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-RI-40015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-RI-40017/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-SC-41922/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-SC-41003/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-SC-41004/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-SC-41313/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-SC-41972/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-SC-41315/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-SC-41908/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-SD-42005/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TN-43003/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TN-43007/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TN-43009/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TN-43011/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TN-43015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TN-43017/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TN-43019/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TN-43020/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45871/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45872/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45873/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45874/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45875/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45876/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45877/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45878/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45879/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45880/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45881/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45882/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45883/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45884/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45885/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45886/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45887/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45888/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45889/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45890/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45891/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45892/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45893/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45894/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45895/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45896/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45897/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-47179/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45899/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-45900/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-48732/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-48733/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-49477/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-49478/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-49479/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-TX-49480/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-UT-45669/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-UT-45670/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-UT-49642/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-UT-49548/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VT-46374/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47001/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47003/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47005/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47007/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47009/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47011/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47013/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47019/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-VA-47021/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-2/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-48008/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-48009/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-48011/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-48013/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-48015/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-48017/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-48020/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-4/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WA-49358/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WV-49273/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WV-49274/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WV-49275/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WI-50040/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WI-50044/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WI-50048/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WI-50052/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WI-50056/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WI-50060/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WI-50064/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WI-50068/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-house-WY-51401/"
    ],
    GovResults: [
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-IN-15007/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-MO-26795/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-MT-27003/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-NH-30005/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-NC-35392/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-ND-35343/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-UT-45672/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-VT-46375/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-WA-48022/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-governor-WV-49136/"
    ],
    PresResults: [
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-AL-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-AK-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-AZ-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-AR-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-CA-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-CO-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-CT-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-DE-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-DC-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-FL-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-GA-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-HI-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-ID-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-IL-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-IN-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-IA-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-KS-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-KY-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-LA-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-ME-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-MD-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-MA-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-MI-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-MN-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-MS-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-MO-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-MT-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-NE-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-NV-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-NH-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-NJ-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-NM-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-NY-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-NC-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-ND-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-OH-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-OK-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-OR-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-PA-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-RI-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-SC-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-SD-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-TN-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-TX-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-UT-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-VT-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-VA-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-WA-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-WV-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-WI-0/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-presidential-WY-0/"
    ],
    SenResults: [
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-AL-1755/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-AK-3079/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-AZ-3002/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-AR-6345/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-CO-7168/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-DE-8362/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-GA-12301/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-GA-12588/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-ID-13252/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-IL-16430/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-IA-17247/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-KS-17585/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-KY-18783/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-LA-20157/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-ME-20643/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-MA-24467/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-MI-24463/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-MN-25151/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-MS-26692/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-MT-27607/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-NE-28594/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-NH-30003/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-NJ-31296/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-NM-33948/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-NC-35984/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-OK-37960/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-OR-38952/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-RI-40003/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-SC-41938/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-SD-42003/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-TN-43441/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-TX-46643/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-VA-47917/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-WV-49137/",
        "https://www.jsonline.com/elections/results/race/2020-11-03-senate-WY-51677/"
    ]
};
function readOrFetch(url, folder, split) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 6]);
                    return [4 /*yield*/, promises_1.readFile(folder + "/" + url.split(split)[1].slice(0, -1), { encoding: "utf-8" })];
                case 1: return [2 /*return*/, _b.sent()];
                case 2:
                    _a = _b.sent();
                    return [4 /*yield*/, node_fetch_1["default"](url)];
                case 3: return [4 /*yield*/, (_b.sent()).text()];
                case 4:
                    text = _b.sent();
                    return [4 /*yield*/, promises_1.writeFile(folder + "/" + url.split(split)[1].slice(0, -1), text, "utf-8")];
                case 5:
                    _b.sent();
                    return [2 /*return*/, text];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.HouseResults = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var split, roots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                split = "-house-";
                return [4 /*yield*/, Promise.all(Urls.HouseResults.map(function (url) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = {};
                                    _a = node_html_parser_1.parse;
                                    return [4 /*yield*/, readOrFetch(url, "HouseResults", split)];
                                case 1: return [2 /*return*/, (_b.root = _a.apply(void 0, [_c.sent()]), _b.url = url, _b)];
                            }
                        });
                    }); }))];
            case 1:
                roots = _a.sent();
                return [2 /*return*/, roots.reduce(function (results, _a) {
                        var root = _a.root, url = _a.url;
                        var state = url.split(split).slice(-1)[0].slice(0, 2);
                        var counties = root.querySelectorAll(".result-county-table-header").map(function (val) { return val.innerText.replace(" County", ""); });
                        var countyVotes = lodash_1.zip(root.querySelectorAll(".result-county-table-col-candidate").map(function (val) { return val.text.split(" ").filter(function (val) { return val !== '*'; }).slice(-1)[0]; }), root.querySelectorAll(".result-county-table-col-votes").map(function (val) { return Number.parseInt(val.text.replace(',', "")); }));
                        return __spreadArrays(counties).reduce(function (acc, county) {
                            var restVotes = countyVotes.slice(1);
                            var votes = lodash_1.takeWhile(restVotes, function (val) { return val[0] !== "Candidate"; });
                            acc[state + "-" + county] = (acc[state + "-" + county] || []).concat(votes);
                            countyVotes = restVotes.slice(votes.length);
                            return acc;
                        }, results);
                    }, {})];
        }
    });
}); })();
exports.GovResults = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var split, roots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                split = "-governor-";
                return [4 /*yield*/, Promise.all(Urls.GovResults.map(function (url) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = {};
                                    _a = node_html_parser_1.parse;
                                    return [4 /*yield*/, readOrFetch(url, "GovResults", split)];
                                case 1: return [2 /*return*/, (_b.root = _a.apply(void 0, [_c.sent()]), _b.url = url, _b)];
                            }
                        });
                    }); }))];
            case 1:
                roots = _a.sent();
                return [2 /*return*/, roots.reduce(function (results, _a) {
                        var root = _a.root, url = _a.url;
                        var state = url.split(split).slice(-1)[0].slice(0, 2);
                        var counties = root.querySelectorAll(".result-county-table-header").map(function (val) { return val.innerText.replace(" County", ""); });
                        var countyVotes = lodash_1.zip(root.querySelectorAll(".result-county-table-col-candidate").map(function (val) { return val.text.split(" ").filter(function (val) { return val !== '*'; }).slice(-1)[0]; }), root.querySelectorAll(".result-county-table-col-votes").map(function (val) { return Number.parseInt(val.text.replace(',', "")); }));
                        return __spreadArrays(counties).reduce(function (acc, county) {
                            var restVotes = countyVotes.slice(1);
                            var votes = lodash_1.takeWhile(restVotes, function (val) { return val[0] !== "Candidate"; });
                            acc[state + "-" + county] = (acc[state + "-" + county] || []).concat(votes);
                            countyVotes = restVotes.slice(votes.length);
                            return acc;
                        }, results);
                    }, {})];
        }
    });
}); })();
exports.PresResults = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var split, roots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                split = "-presidential-";
                return [4 /*yield*/, Promise.all(Urls.PresResults.map(function (url) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = {};
                                    _a = node_html_parser_1.parse;
                                    return [4 /*yield*/, readOrFetch(url, "PresResults", split)];
                                case 1: return [2 /*return*/, (_b.root = _a.apply(void 0, [_c.sent()]), _b.url = url, _b)];
                            }
                        });
                    }); }))];
            case 1:
                roots = _a.sent();
                return [2 /*return*/, roots.reduce(function (results, _a) {
                        var root = _a.root, url = _a.url;
                        var state = url.split(split).slice(-1)[0].slice(0, 2);
                        var counties = root.querySelectorAll(".result-county-table-header").map(function (val) { return val.innerText.replace(" County", ""); });
                        var countyVotes = lodash_1.zip(root.querySelectorAll(".result-county-table-col-candidate").map(function (val) { return val.text.split(" ").filter(function (val) { return val !== '*'; }).slice(-1)[0]; }), root.querySelectorAll(".result-county-table-col-votes").map(function (val) { return Number.parseInt(val.text.replace(',', "")); }));
                        return __spreadArrays(counties).reduce(function (acc, county) {
                            var restVotes = countyVotes.slice(1);
                            var votes = lodash_1.takeWhile(restVotes, function (val) { return val[0] !== "Candidate"; });
                            acc[state + "-" + county] = (acc[state + "-" + county] || []).concat(votes);
                            countyVotes = restVotes.slice(votes.length);
                            return acc;
                        }, results);
                    }, {})];
        }
    });
}); })();
exports.SenResults = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var split, roots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                split = "-senate-";
                return [4 /*yield*/, Promise.all(Urls.SenResults.map(function (url) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = {};
                                    _a = node_html_parser_1.parse;
                                    return [4 /*yield*/, readOrFetch(url, "SenResults", split)];
                                case 1: return [2 /*return*/, (_b.root = _a.apply(void 0, [_c.sent()]), _b.url = url, _b)];
                            }
                        });
                    }); }))];
            case 1:
                roots = _a.sent();
                return [2 /*return*/, roots.reduce(function (results, _a) {
                        var root = _a.root, url = _a.url;
                        var state = url.split(split).slice(-1)[0].slice(0, 2);
                        var counties = root.querySelectorAll(".result-county-table-header").map(function (val) { return val.innerText.replace(" County", ""); });
                        var countyVotes = lodash_1.zip(root.querySelectorAll(".result-county-table-col-candidate").map(function (val) { return val.text.split(" ").filter(function (val) { return val !== '*'; }).slice(-1)[0]; }), root.querySelectorAll(".result-county-table-col-votes").map(function (val) { return Number.parseInt(val.text.replace(',', "")); }));
                        return __spreadArrays(counties).reduce(function (acc, county) {
                            var restVotes = countyVotes.slice(1);
                            var votes = lodash_1.takeWhile(restVotes, function (val) { return val[0] !== "Candidate"; });
                            acc[state + "-" + county] = (acc[state + "-" + county] || []).concat(votes);
                            countyVotes = restVotes.slice(votes.length);
                            return acc;
                        }, results);
                    }, {})];
        }
    });
}); })();
