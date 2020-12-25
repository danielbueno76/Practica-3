import {worldCupTeams} from './utils.js'
import {namesStages} from './utils.js'
import {namesLoseStages} from './utils.js'
import worldCupKnockout from './knockout/knockoutstage.js'
import { LOCAL_TEAM, AWAY_TEAM } from './knockout/knockoutstage.js'


const worldCup = new worldCupKnockout('World Cup', worldCupTeams)

worldCup.scheduleStage()
// Show the knockout stages although it is not mandatory. Just for clarification
let i = worldCupTeams.length
worldCup.matchDaysStage.forEach(matchDay => {
    const stage = namesStages[i]
    
    if (i in namesLoseStages) { // first show the stage of the teams that had been lost. In this example only third and fourth position.
        const stageLose = namesLoseStages[i]
        console.log(`===== ${stageLose} =====`)
        const matchLoseDay = worldCup.getLoseTeams(matchDay.length)
        matchLoseDay.forEach(match => {
            const home = match[LOCAL_TEAM]
            const away = match[AWAY_TEAM]
            console.log(`${home} vs ${away}`)
        })
    }
    console.log(`===== ${stage} =====`)
    matchDay.forEach(match => {
        const home = match[LOCAL_TEAM]
        const away = match[AWAY_TEAM]
        console.log(`${home} vs ${away}`)
    })
    i = i /2
})

console.log(`===============================================`)
console.log(`==== COMIENZO DE LA FASE DE ELIMINATORIAS =====`)
console.log(`===============================================`)

// Start the world cup
worldCup.start()

// let i = worldCupTeams.length
// let wonTeam = undefined
// worldCup.summaries.forEach(stageResults => {
//     const stages = namesStages[i]
//     stages.forEach(stage => {
//         console.log(`===== ${stage} =====`)
//         stageResults.forEach(result => {
//             wonTeam = worldCup.getWonTeam(result)
//             console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${wonTeam}`)
//         })
//     })
//     i = i /2
// })

// console.log(`===============================================`)
// console.log(`¡${wonTeam} campeón del mundo!`)
// console.log(`===============================================`)