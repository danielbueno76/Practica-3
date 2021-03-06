import {worldCupTeams, namesStages, namesLoseStages} from './utils/Utils.js'
import WorldCupKnockout from './knockout/KnockoutPhase.js'
import WorldCupLeague from './league/WorldCupLeague.js'

const config = { numberOfTeams: 4 } // Number of teams per group
const worldCupLeague = new WorldCupLeague('Copa del mundo', worldCupTeams, config)

worldCupLeague.scheduleMatchDaysGroups()
console.log(`===============================================`)
console.log(`=============== Grupos y equipos ==============`)
console.log(`===============================================`)
// Show match days and matches
let i = 0
worldCupLeague.groups.forEach(group => {
    console.log(`----------------------`)
    console.log(`${group.name}`)
    console.log(`----------------------`)
    group.teams.forEach(team => {
        console.log(team.name)
    })
    let j = 1
    group.matchDaySchedule.forEach(matchDay => {
        console.log(`JORNADA ${j}:`)
        matchDay.forEach(match => {
            const home = match[0] != null ? match[0] : 'DESCANSA'
            const away = match[1] != null ? match[1] : 'DESCANSA'
            console.log(`- ${home} vs ${away}`)
        })
        j++
    })
    i++
})

console.log(`===============================================`)
console.log(`============= COMIENZA EL MUNDIAL =============`)
console.log(`===============================================`)

worldCupLeague.start()

const numberOfSchedules = worldCupLeague.config.numberOfTeams-1
for (let i = 0; i < numberOfSchedules; i++) {    
    worldCupLeague.groups.forEach(group => {
        const summary = group.summaries[i]
        console.log(`${group.name} - JORNADA ${i+1}:`)
        summary.results.forEach(result => {
            console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
        })
        console.table(summary.standings.map(team => {
            return {
                Equipo: team.name,
                Puntos: team.points,
                "Goles a favor": team.goalsFor,
                "Goles en contra": team.goalsAgainst,
                "Diferencia goles": team.goalsFor - team.goalsAgainst
            }
        }))
    })
}

const worldCupTeamsKnockout = worldCupLeague.getClassificatedTeams()
const worldCup = new WorldCupKnockout('World Cup', worldCupTeamsKnockout)

worldCup.scheduleStage()

console.log(`===============================================`)
console.log(`==== COMIENZO DE LA FASE DE ELIMINATORIAS =====`)
console.log(`===============================================`)

// Start the world cup
worldCup.start()

i = (worldCupTeamsKnockout.length*2)
let wonTeam = undefined
worldCup.summariesWinStages.forEach(stageResults => {
    if (i in namesLoseStages) { // first show the stage of the teams that had been lost. In this example only third and fourth position.
        const stageLose = namesLoseStages[i]
        console.log(`===== ${stageLose} =====`)
        worldCup.summariesLoseStages[0].forEach(result => { // zero because is just one
            wonTeam = worldCup.getWonTeam(result)
            console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${wonTeam}`)
        })
    }

    const stage = namesStages[i]
    console.log(`===== ${stage} =====`)
    stageResults.forEach(result => {
        wonTeam = worldCup.getWonTeam(result)
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${wonTeam}`)
    })
    i = i /2
})

console.log(`===============================================`)
console.log(`¡${wonTeam} campeón del mundo!`)
console.log(`===============================================`)