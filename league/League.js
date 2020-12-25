Array.prototype.shuffle = function()
{
	var i = this.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}

export const LOCAL_TEAM = 0
export const AWAY_TEAM = 1

export default class League {

    constructor(name, teams=[], config={}) {
        this.name = name
        this.matchDaySchedule = []
        this.setup(config)
        this.setupTeams(teams)
        this.summaries = []
    }

    setup(config) {
        const defaultConfig = { rounds: 1 }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames) {
        this.teams = []
        for (const teamName of teamNames) {
            const team = this.customizeTeam(teamName)
            this.teams.push(team)
        }
        this.teams.shuffle()
    }

    customizeTeam(teamName) {
        return {
            name: teamName,
            matchesWon: 0,
            matchesDrawn: 0,
            matchesLost: 0
        }
    }

    initSchedule(round) {
        const numberOfMatchDays = this.teams.length - 1
        const numberOfMatchesPerMatchDay = this.teams.length / 2
        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = ['Equipo local', 'Equipo visitante']
                matchDay.push(match)
            }
            round.push(matchDay)  // add matches to the schedule
        }
    }

    getTeamNames() {
        return this.teams.map(team => team.name)
    }
    
    getTeamNamesForSchedule() {
        const teamNames = this.getTeamNames()
        if (teamNames.length % 2 == 0) { // pairs
            return teamNames
        } else {
            return [...teamNames, null]
        }
    }

    setLocalTeams(round) {
        const teamNames = this.getTeamNamesForSchedule()
        const maxHomeTeams = teamNames.length - 2
        let teamIndex = 0
        round.forEach(matchDay => { // each schedule
            matchDay.forEach(match => { // each match
                // establish local team
                match[LOCAL_TEAM] = teamNames[teamIndex]
                teamIndex++
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0
                }
            })
        })
    }

    setAwayTeams(round) {
        const teamNames = this.getTeamNamesForSchedule()
        const maxAwayTeams = teamNames.length - 2
        let teamIndex = maxAwayTeams
        round.forEach(matchDay => {
            let firstMatchFound = false
            matchDay.forEach(match => {
                if (!firstMatchFound) {
                    firstMatchFound = true
                } else {
                    match[AWAY_TEAM] = teamNames[teamIndex]
                    teamIndex--
                    if (teamIndex < 0) {
                        teamIndex = maxAwayTeams
                    }
                }
            })
        })
    }

    fixLastTeamSchedule(round) {
        let matchDayNumber = 1
        const teamNames = this.getTeamNamesForSchedule()
        const lastTeamName = teamNames[teamNames.length - 1]
        round.forEach(matchDay => {
            const firstMatch = matchDay[0]
            if (matchDayNumber % 2 == 0) { // if the schedule is pair we are local
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM]
                firstMatch[LOCAL_TEAM] = lastTeamName
            } else { // if the schedule is even we are away team
                firstMatch[AWAY_TEAM] = lastTeamName
            }
            matchDayNumber++
        })
    }

    scheduleMatchDays() {
        for (let i = 0; i < this.config.rounds; i++) {
            const newRound = this.createRound()
            // If the schedule is pair, inverte matches
            if (i % 2 != 0) {
                for (const matchDay of newRound) {
                    for (const match of matchDay) {
                        const localTEam = match[LOCAL_TEAM]
                        match[LOCAL_TEAM] = match[AWAY_TEAM]
                        match[AWAY_TEAM] = localTEam
                    }
                }
            }
            this.matchDaySchedule = this.matchDaySchedule.concat(newRound)
        }
    }

    createRound() {
        // https://es.wikipedia.org/wiki/Sistema_de_todos_contra_todos
        const newRound = []
        this.initSchedule(newRound)
        this.setLocalTeams(newRound)
        this.setAwayTeams(newRound)
        this.fixLastTeamSchedule(newRound)
        return newRound
    }

    start() {
        for (const matchDay of this.matchDaySchedule) {
            const matchDaySummary = {
                results: [],
                standings: undefined
            }
            for (const match of matchDay) {
                const result = this.play(match)
                this.updateTeams(result)  // update the teams with the result of the match
                matchDaySummary.results.push(result)
            }
            // Calculate classification
            this.getStandings()
            matchDaySummary.standings = this.teams.map(team => Object.assign({}, team))
            // Save summary of the schedule
            this.summaries.push(matchDaySummary)
        }
    }

    getStandings() {
        throw new Error('getStandings not implemented')
    }

    updateTeams(result) {
        throw new Error('updateTeams method not implemented')
    }

    play(match) {
        throw new Error('play method not implented')
    }

}
