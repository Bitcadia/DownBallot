import { StateECMap } from './ECMap';
import { GovResults, HouseResults, PresResults, SenResults } from './HouseScrape';
import { populationMap } from './PopulationMap';
import { readFile, writeFile } from 'fs/promises';
async function scrape() {
    try {
        return await Promise.all([
            GovResults(),
            SenResults(),
            PresResults(),
            HouseResults()
        ]);
    } catch (e) {
        await new Promise((res) => { setTimeout(res, 1000) });
        return await scrape();
    }
}
(async () => {
    const [gov, sen, pres, hou] = await scrape();
    const ResultCountyMap = Object.keys(pres).reduce((counties, county) => {
        const votes = pres[county];
        const [winning, second] = votes.sort((a, b) => b[1] - a[1]);
        const winHouResults = hou[county]?.filter(val => val[0] === winning[0]).reduce((acc, val) => val[1]+acc, 0);
        const secondHouResults = hou[county]?.filter(val => val[0] === second[0]).reduce((acc, val) => val[1]+acc, 0);
        const winGovResults = gov[county]?.filter(val => val[0] === winning[0]).reduce((acc, val) => Math.max(val[1], acc), 0);
        const secondGovResults = gov[county]?.filter(val => val[0] === second[0]).reduce((acc, val) => Math.max(val[1], acc), 0);
        const winSenResults = sen[county]?.filter(val => val[0] === winning[0]).reduce((acc, val) => Math.max(val[1], acc), 0);
        const secondSenResults = sen[county]?.filter(val => val[0] === second[0]).reduce((acc, val) => Math.max(val[1], acc), 0);
        const wResult = {
            pres: winning[1],
            party: winning[0],
            hou: winHouResults,
            gov: winGovResults,
            sen: winSenResults,
            win: true
        };
        const lResult = {
            pres: second[1],
            party: second[0],
            hou: secondHouResults,
            gov: secondGovResults,
            sen: secondSenResults,
            win: false
        };
        if (county.includes("DC")) {
            return counties
        }
        counties[county] = {
            Rep: wResult.party === "(R)" ? wResult : lResult,
            Dem: wResult.party === "(D)" ? wResult : lResult,
        }
        return counties;
    }, {} as {
        [county: string]: {
            Dem: { pres: number, hou: number, sen?: number, gov?: number, party: string, win: boolean },
            Rep: { pres: number, hou: number, sen?: number, gov?: number, party: string, win: boolean },
        }
    });
    const stateTotals = Object.keys(ResultCountyMap).reduce((prev, key) => {
        const state = key.split('-')[0];
        const countyPopulation = populationMap[key];
        prev[state] = prev[state] || { rep: 0, dem: 0, weightedRep: 0, weightedDem: 0, EC: StateECMap[state], population: 0 };
        let DemPresVote = ResultCountyMap[key].Dem.pres;
        let RepPresVote = ResultCountyMap[key].Rep.pres;
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
    }, {} as { [state: string]: { rep: number, dem: number, weightedRep: number, weightedDem: number, EC: number, population: number } });

    const ECAndPopularResultsWeightedByCounty = Object.keys(stateTotals).reduce((acc, key) => {
        if (stateTotals[key].weightedRep < stateTotals[key].weightedDem) {
            acc.demEC += stateTotals[key].EC;
            const margin = stateTotals[key].weightedDem - stateTotals[key].weightedRep;
            const pctMargin = margin / stateTotals[key].population;
            acc.demStates.push({ key, margin, pctMargin });
        }
        if (stateTotals[key].weightedRep > stateTotals[key].weightedDem) {
            acc.repEC += stateTotals[key].EC;
            const margin = stateTotals[key].weightedRep - stateTotals[key].weightedDem;
            const pctMargin = margin / stateTotals[key].population;
            acc.repStates.push({ key, margin, pctMargin });
        }
        acc.repWeightedTotal += stateTotals[key].weightedRep || 0
        acc.demWeightedTotal += stateTotals[key].weightedDem || 0
        return acc;
    }, { demEC: 0, repEC: 0, repStates: [] as { key: string, margin: number, pctMargin: number }[], repWeightedTotal: 0, demStates: [] as { key: string, margin: number, pctMargin: number }[], demWeightedTotal: 0 });

    ECAndPopularResultsWeightedByCounty.repStates = ECAndPopularResultsWeightedByCounty.repStates.sort((a, b) => a.pctMargin - b.pctMargin);
    ECAndPopularResultsWeightedByCounty.demStates = ECAndPopularResultsWeightedByCounty.demStates.sort((a, b) => a.pctMargin - b.pctMargin);

    console.log(ECAndPopularResultsWeightedByCounty);
    writeFile("./Outputs/CountyWeightedResults.json", JSON.stringify(ECAndPopularResultsWeightedByCounty), "utf-8");

    const closeStates = Object.keys(stateTotals).map((key) => {
        const max = Math.max(stateTotals[key].dem, stateTotals[key].rep);
        const min = Math.min(stateTotals[key].dem, stateTotals[key].rep);
        return {
            state: key,
            margin: max - min,
            close: (max - min) / min,
            max,
            min
        };
    }).filter((val) => val.close < 0.20).reduce((acc, val) => {
        acc[val.state] = val;
        return acc;
    }, {} as { [state: string]: { state: string, margin: number, close: number, min: number, max: number } });

    const DemocratRaces = Object.keys(ResultCountyMap).reduce((prev, current: keyof typeof ResultCountyMap) => {
        prev.push([current, { ...ResultCountyMap[current].Dem, opp: ResultCountyMap[current].Rep }]);
        return prev;
    }, [] as [keyof typeof ResultCountyMap, typeof ResultCountyMap[keyof typeof ResultCountyMap]["Dem"] & { opp: typeof ResultCountyMap[keyof typeof ResultCountyMap]["Rep"] }][]);
    let DemRaceDiff = DemocratRaces.filter((val) => {
        const state = (val[0] as string).split('-')[0];
        return closeStates[state] && stateTotals[state].dem > stateTotals[state].rep;
    });

    const RepublicanRaces = Object.keys(ResultCountyMap).reduce((prev, current: keyof typeof ResultCountyMap) => {
        prev.push([current, { ...ResultCountyMap[current].Rep, opp: ResultCountyMap[current].Dem }]);
        return prev;
    }, [] as [keyof typeof ResultCountyMap, typeof ResultCountyMap[keyof typeof ResultCountyMap]["Rep"] & { opp: typeof ResultCountyMap[keyof typeof ResultCountyMap]["Dem"] }][]);

    let RepRaceDiff = RepublicanRaces.filter((val) => {
        const state = (val[0] as string).split('-')[0];
        return closeStates[state] && stateTotals[state].dem < stateTotals[state].rep;
    });

    const TrumpDownBallotVsStraight = RepublicanRaces.reduce((acc, val) => {
        const [state, county] = (val[0] as string).split('-');
        const result = val[1];
        const straight = Math.min(result.gov || Infinity, result.sen || Infinity, result.hou || Infinity, result.pres || Infinity) * 0.9;

        const nonStraight = Math.max(result.gov || 0, result.sen || 0, result.hou || 0, result.pres || 0) - straight;

        const oppStraight = Math.min(result.opp.gov || Infinity, result.opp.sen || Infinity, result.opp.hou || Infinity, result.opp.pres || Infinity) * 0.9;
        const oppNonStraight = Math.max(result.opp.gov || 0, result.opp.sen || 0, result.opp.hou || 0, result.opp.pres || 0) - oppStraight;

        const totalStraight = straight + oppStraight;
        const totalNonStraight = nonStraight + oppNonStraight;

        const nonStraightPres = result.pres - straight;
        const straightPres = straight;
        const ratioStraightPres = straightPres / totalStraight;
        const ratioNonStraightPres = nonStraightPres / totalNonStraight;
        acc[state] = acc[state] || [];
        acc[state].push([(ratioStraightPres * 100), ((ratioNonStraightPres - ratioStraightPres) * 100), county]);

        return acc;
    }, {} as { [state: string]: [number, number, string][] });
    Object.keys(TrumpDownBallotVsStraight).forEach((key) => TrumpDownBallotVsStraight[key] = TrumpDownBallotVsStraight[key].sort((a, b) => a[0] - b[0]));
    const BidenDownBallotVsStraight = DemocratRaces.reduce((acc, val) => {
        const [state, county] = (val[0] as string).split('-');
        const result = val[1];
        const straight = Math.min(result.gov || Infinity, result.sen || Infinity, result.hou || Infinity, result.pres || Infinity) * 0.9;

        const nonStraight = Math.max(result.gov || 0, result.sen || 0, result.hou || 0, result.pres || 0) - straight;

        const oppStraight = Math.min(result.opp.gov || Infinity, result.opp.sen || Infinity, result.opp.hou || Infinity, result.opp.pres || Infinity) * 0.9;
        const oppNonStraight = Math.max(result.opp.gov || 0, result.opp.sen || 0, result.opp.hou || 0, result.opp.pres || 0) - oppStraight;

        const totalStraight = straight + oppStraight;
        const totalNonStraight = nonStraight + oppNonStraight;

        const nonStraightPres = result.pres - straight;
        const straightPres = straight;
        const ratioStraightPres = straightPres / totalStraight;
        const ratioNonStraightPres = nonStraightPres / totalNonStraight;
        acc[state] = acc[state] || [];
        acc[state].push([(ratioStraightPres * 100), ((ratioNonStraightPres - ratioStraightPres) * 100), county]);
        return acc;
    }, {} as { [state: string]: [number, number, string][] });
    Object.keys(BidenDownBallotVsStraight).forEach((key) => BidenDownBallotVsStraight[key] = BidenDownBallotVsStraight[key].sort((a, b) => a[0] - b[0]));
    writeFile("./Outputs/CountyDownBallotDiffsByStraight.json", JSON.stringify({ TrumpDownBallotVsStraight, BidenDownBallotVsStraight }), "utf-8");
    
    const TrumpDownStraightIndividualRatio = RepublicanRaces.reduce((acc, val) => {
        const [state, county] = (val[0] as string).split('-');
        const result = val[1];
        const straight = Math.min(result.gov || Infinity, result.sen || Infinity, result.hou || Infinity, result.pres || Infinity);

        const nonStraight = Math.max(result.gov || 0, result.sen || 0, result.hou || 0, result.pres || 0) - straight;

        const oppStraight = Math.min(result.opp.gov || Infinity, result.opp.sen || Infinity, result.opp.hou || Infinity, result.opp.pres || Infinity);
        const oppNonStraight = Math.max(result.opp.gov || 0, result.opp.sen || 0, result.opp.hou || 0, result.opp.pres || 0) - oppStraight;

        const totalStraight = straight + oppStraight;
        const totalNonStraight = nonStraight + oppNonStraight;

        const straightPres = straight;
        const ratioStraightPres = straightPres / totalStraight;
        acc[state] = acc[state] || [];
        const nonStraightMargin = nonStraight - oppNonStraight;
        if(nonStraightMargin < 0)
        {
            return acc;
        }
        const nonStraightMarginRatio = nonStraight / oppNonStraight;
        acc[state].push([(ratioStraightPres * 100), ((totalNonStraight/totalStraight) * 100), nonStraightMargin, nonStraightMarginRatio, county]);
        return acc;
    }, {} as { [state: string]: [number, number, number, number, string][] });

    Object.keys(TrumpDownStraightIndividualRatio).forEach((key) => TrumpDownStraightIndividualRatio[key] = TrumpDownStraightIndividualRatio[key].filter((val)=>val[0]).sort((a, b) => a[0] - b[0]));
    const BidenDownStraightIndividualRatio = DemocratRaces.reduce((acc, val) => {
        const [state, county] = (val[0] as string).split('-');
        const result = val[1];
        const straight = Math.min(result.gov || Infinity, result.sen || Infinity, result.hou || Infinity, result.pres || Infinity);

        const nonStraight = Math.max(result.gov || 0, result.sen || 0, result.hou || 0, result.pres || 0) - straight;

        const oppStraight = Math.min(result.opp.gov || Infinity, result.opp.sen || Infinity, result.opp.hou || Infinity, result.opp.pres || Infinity);
        const oppNonStraight = Math.max(result.opp.gov || 0, result.opp.sen || 0, result.opp.hou || 0, result.opp.pres || 0) - oppStraight;

        const totalStraight = straight + oppStraight;
        const totalNonStraight = nonStraight + oppNonStraight;

        const straightPres = straight;
        const ratioStraightPres = straightPres / totalStraight;
        acc[state] = acc[state] || [];
        const nonStraightMargin = nonStraight - oppNonStraight;
        if(nonStraightMargin < 0)
        {
            return acc;
        }
        const nonStraightMarginRatio = nonStraight / oppNonStraight;
        acc[state].push([(ratioStraightPres * 100), ((totalNonStraight/totalStraight) * 100), nonStraightMargin, nonStraightMarginRatio, county]);
        return acc;
    }, {} as { [state: string]: [number, number, number, number, string][] });
    Object.keys(BidenDownStraightIndividualRatio).forEach((key) => BidenDownStraightIndividualRatio[key] = BidenDownStraightIndividualRatio[key].filter((val)=>val[0]).sort((a, b) => a[0] - b[0]));
    writeFile("./Outputs/StraightIndividualRatio.json", JSON.stringify({ TrumpDownStraightIndividualRatio, BidenDownStraightIndividualRatio }), "utf-8");

    const minimumCount = 175000;
    let demDbDiff: { [state: string]: number } = {};
    let repDbDiff: { [state: string]: number } = {};
    const largestNoDownBallotCounties = ([
        ...DemRaceDiff.map((val) => {
            const state = (val[0] as string).split('-')[0];
            const max = Math.max(val[1].gov || 0, val[1].sen || 0, val[1].hou || 0);
            const downBallotDiff = (val[1].pres - max);
            if (downBallotDiff > 0) {
                demDbDiff[state] = (demDbDiff[state] || 0) + downBallotDiff;
            }
            const oppmax = Math.max(val[1].opp.gov || 0, val[1].opp.sen || 0, val[1].opp.hou || 0);
            const oppositionDownBallotDiff = (val[1].opp.pres - oppmax);
            if (oppositionDownBallotDiff > 0) {
                repDbDiff[state] = (repDbDiff[state] || 0) + oppositionDownBallotDiff;
            }
            const leadingPresidentVote = val[1].pres;
            return {
                state,
                county: (val[0] as string).split('-')[1],
                leadingPresidentVote,
                downBallotDiff,
                oppositionDownBallotDiff,
                data: val[1]
            };
        }).map((val) => {
            const { state } = val;
            const downBallotPct = {
                main: val.downBallotDiff > 0 && demDbDiff[state] ? val.downBallotDiff : 0,
                opp: val.oppositionDownBallotDiff > 0 && repDbDiff[state] ? val.oppositionDownBallotDiff : 0,
            };
            return {
                ...val,
                pctDeltaDownBallotDiff: (downBallotPct.main - downBallotPct.opp) / (demDbDiff[state] - repDbDiff[state]) * 100,
            }
        }),
        ...RepRaceDiff.map((val) => {
            const state = (val[0] as string).split('-')[0];
            const max = Math.max(val[1].gov || 0, val[1].sen || 0, val[1].hou || 0);
            const downBallotDiff = (val[1].pres - max);
            if (downBallotDiff > 0) {
                repDbDiff[state] = (repDbDiff[state] || 0) + downBallotDiff;
            }
            const oppmax = Math.max(val[1].opp.gov || 0, val[1].opp.sen || 0, val[1].opp.hou || 0);
            const oppositionDownBallotDiff = (val[1].opp.pres - oppmax);
            if (oppositionDownBallotDiff > 0) {
                demDbDiff[state] = (demDbDiff[state] || 0) + oppositionDownBallotDiff;
            }
            const leadingPresidentVote = val[1].pres;
            return {
                state,
                county: (val[0] as string).split('-')[1],
                leadingPresidentVote,
                downBallotDiff,
                oppositionDownBallotDiff,
                data: val[1]
            };
        }).map((val) => {
            const { state } = val;
            const downBallotPct = {
                main: val.downBallotDiff > 0 && repDbDiff[state] ? val.downBallotDiff : 0,
                opp: val.oppositionDownBallotDiff > 0 && demDbDiff[state] ? val.oppositionDownBallotDiff : 0,
            };
            return {
                ...val,
                pctDeltaDownBallotDiff: (downBallotPct.opp - downBallotPct.main) / (demDbDiff[state] - repDbDiff[state]) * 100,
            }
        })
    ].filter((val) => val.leadingPresidentVote > minimumCount).sort((a, b) => {
        return (b.pctDeltaDownBallotDiff) - (a.pctDeltaDownBallotDiff);
    }));

    writeFile("./Outputs/LargestNoDownBallotCounties.json", JSON.stringify(largestNoDownBallotCounties), "utf-8");
})().then();