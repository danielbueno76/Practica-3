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
// let i = worldCupTeams.length
// worldCup.matchDaysStage.forEach(matchDay => {
//     const stage = namesStages[i]
//     console.log(`===== ${stage} =====`)
//     matchDay.forEach(match => {
//         const home = match[LOCAL_TEAM]
//         const away = match[AWAY_TEAM]
//         console.log(`${home} vs ${away}`)
//     })
//     i = i /2
// })

console.log(`===============================================`)
console.log(`==== COMIENZO DE LA FASE DE ELIMINATORIAS =====`)
console.log(`===============================================`)

// Start the world cup
worldCup.start()

let i = worldCupTeams.length
let wonTeam = undefined
worldCup.summaries.forEach(stageResults => {
    const stage = namesStages[i]
    console.log(`===== ${stage} =====`)
    stageResults.forEach(result => {
        wonTeam = worldCup.getWonTeam(result)
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${wonTeam}`)
    })
    i = i /2
    if (i == 1) {
        console.log(`===============================================`)
        console.log(`¡${wonTeam} campeón del mundo!`)
        console.log(`===============================================`)
    }

})
