import { GovResults, HouseResults, PresResults, SenResults } from './HouseScrape';
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

    console.log(hou);

    const ResultCountyMap = Object.keys(pres).reduce((counties, county) => {
        const votes = pres[county];
        const [winning, second] = votes.sort((a, b) => b[1] - a[1]);
        const winHouResults = hou[county]?.filter(val => val[0] === winning[0]).reduce((acc, val) => Math.max(val[1], acc), 0);
        const secondHouResults = hou[county]?.filter(val => val[0] === second[0]).reduce((acc, val) => Math.max(val[1], acc), 0);
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
        prev[state] = prev[state] || { rep: 0, dem: 0 };
        prev[state].dem += ResultCountyMap[key].Dem.pres;
        prev[state].rep += ResultCountyMap[key].Rep.pres;
        return prev;
    }, {} as { [state: string]: { rep: number, dem: number } })
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

    let DemRaceDiff = Object.keys(ResultCountyMap).reduce((prev, current: keyof typeof ResultCountyMap) => {
        prev.push([current, { ...ResultCountyMap[current].Dem, opp: ResultCountyMap[current].Rep }]);
        return prev;
    }, [] as [keyof typeof ResultCountyMap, typeof ResultCountyMap[keyof typeof ResultCountyMap]["Dem"] & { opp: typeof ResultCountyMap[keyof typeof ResultCountyMap]["Rep"] }][]).filter((val) => {
        const state = (val[0] as string).split('-')[0];
        return closeStates[state] && stateTotals[state].dem > stateTotals[state].rep;
    });

    let RepRaceDiff = Object.keys(ResultCountyMap).reduce((prev, current: keyof typeof ResultCountyMap) => {
        prev.push([current, { ...ResultCountyMap[current].Rep, opp: ResultCountyMap[current].Dem }]);
        return prev;
    }, [] as [keyof typeof ResultCountyMap, typeof ResultCountyMap[keyof typeof ResultCountyMap]["Rep"] & { opp: typeof ResultCountyMap[keyof typeof ResultCountyMap]["Dem"] }][]).filter((val) => {
        const state = (val[0] as string).split('-')[0];
        return closeStates[state] && stateTotals[state].dem < stateTotals[state].rep;
    });

    const minimumCount = 175000;
    let demDbDiff: { [state: string]: number } = {};
    let repDbDiff: { [state: string]: number } = {};
    console.log([
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
})().then(console.log);