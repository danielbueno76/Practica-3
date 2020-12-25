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
        const numberOfMatchesPerSide = teamsMatches.length / 2
        let index = 0
        for (let i = 0; i < this.groups.length;i=i+2) {
            const group1 = this.groups[i]
            const finalSummary1 = group1.summaries[this.config.numberOfTeams-2]
            const winnerGroup1 = finalSummary1.standings[FIRST_TEAM].name
            const secondGroup1 = finalSummary1.standings[SECOND_TEAM].name
            teamsMatches[index][LOCAL_TEAM] = winnerGroup1
            teamsMatches[index+numberOfMatchesPerSide][AWAY_TEAM] = secondGroup1
            
            const group2 = this.groups[i+1]
            const finalSummary2 = group2.summaries[this.config.numberOfTeams-2]
            const winnerGroup2 = finalSummary2.standings[FIRST_TEAM].name
            const secondGroup2 = finalSummary2.standings[SECOND_TEAM].name
            teamsMatches[index][AWAY_TEAM] = secondGroup2
            teamsMatches[index+numberOfMatchesPerSide][LOCAL_TEAM] = winnerGroup2
            index++
        }
        return teamsMatches
    }
}