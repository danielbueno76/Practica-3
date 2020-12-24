import {worldCupTeams} from './teams.js'
import worldCupKnockout from './knockout/knockoutstage.js'
import { LOCAL_TEAM, AWAY_TEAM } from './knockout/knockoutstage.js'

const namesStages = {
    2: "FINAL",
    4: "SEMIFINALES",
    8: "CUARTOS DE FINAL",
    16: "OCTAVOS DE FINAL",
    32: "DIECISEISAVOS DE FINAL"
}
const worldCup = new worldCupKnockout('World Cup', worldCupTeams)

worldCup.scheduleStage()

// Show the knockout stages although it is not mandatory. Just for clarification
let i = worldCupTeams.length
worldCup.matchDaysStage.forEach(matchDay => {
    const stage = namesStages[i]
    console.log(`===== ${stage} =====`)
    matchDay.forEach(match => {
        const home = match[LOCAL_TEAM]
        const away = match[AWAY_TEAM]
        console.log(`${home} vs ${away}`)
    })
    i = i /2
})
