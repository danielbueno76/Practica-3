import GroupLeague from './PointsBasedLeague.js'
import { LOCAL_TEAM, AWAY_TEAM } from './League.js'
import {groupsLetter} from '../utils/Utils.js'

const FIRST_TEAM = 0
const SECOND_TEAM = 1

export default class WorldCupLeague{
    constructor(name, teams=[], config={}) {
        this.name = name
        this.groups = []
        this.setup(config)
        this.setupTeams(teams)
    }

    setup(config) {
        const defaultConfig = { numberOfTeams: 1 }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames) {
        this.teams = teamNames
        this.teams.shuffle()
    }

    scheduleMatchDaysGroups() {
        let groupIndex = 0
        const numberOfTeams = this.config.numberOfTeams
        for(let i = 0; i < this.teams.length; i=i+numberOfTeams) {
            const teamsPerGroup = this.teams.filter(function(team,index) { // we take four teams each time
                return (index >= i) && (index < (numberOfTeams+i))
            })
            const group = new GroupLeague(`Grupo ${groupsLetter[groupIndex]}`, teamsPerGroup)
            group.scheduleMatchDays()
            this.groups.push(group)
            groupIndex++
        }
    }

    start() {
        this.groups.forEach(group => {
            group.start()
        })
    }

    getClassificatedTeams() { // Returns the classificated teams in order to be matched in the knockout stage. For example: first and second team will be the first match in the round of 16.
        const teamsMatches = []
        for (let i = 0; i < this.teams.length/4;i++) {
            const match = ["Equipo local", "Equipo visitante"]
            teamsMatches.push(match)
        }
        let index = 0
        this.groups.forEach(group => {
            const finalSummary = group.summaries[this.config.numberOfTeams-2]
            const winnerGroup = finalSummary.standings[FIRST_TEAM].name
            const secondGroup = finalSummary.standings[SECOND_TEAM].name
            if (index % 2 == 0) {
                teamsMatches[index][LOCAL_TEAM] = winnerGroup
                teamsMatches[index+1][AWAY_TEAM] = secondGroup
            } else {
                teamsMatches[index-1][AWAY_TEAM] = secondGroup
                teamsMatches[index][LOCAL_TEAM] = winnerGroup
            }
            index++
        })
        return teamsMatches
    }
}