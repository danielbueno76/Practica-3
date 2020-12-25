import GroupLeague from './PointsBasedLeague.js'
import { LOCAL_TEAM, AWAY_TEAM } from './League.js'
import {groupsLetter} from '../utils/Utils.js'

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
            const group = new GroupLeague(`Group ${groupsLetter[groupIndex]}`, teamsPerGroup)
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
}