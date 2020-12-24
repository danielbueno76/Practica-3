import {worldCupTeams} from './teams.js'
import worldCupStage from './knockout/knockoutstage.js'

const worldCup = new worldCupStage('World Cup', worldCupTeams)

const teamNames = worldCup.teams.map(team => team)
console.log(teamNames)