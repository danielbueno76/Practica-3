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

export default class KnockoutPhase {
    constructor(name, teams=[]) {
        this.name = name
        this.matchDaysStage = []
        this.setupTeams(teams)
        this.summaries = []
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
            goalsFor: 0,
            goalsAgainst: 0
        }
    }

    getTeamForName(name) {
        return this.teams.find(team => team.name == name)
    }

    scheduleStage(){
        for (let i = this.teams.length; i > 1 ; i=i/2) {
            const newStage = this.createStage(i/2)

            this.matchDaysStage = this.matchDaysStage.concat(newStage)
        }
        this.setFirstStageTeams(this.matchDaysStage[0])// In the first stage we assign the team names
    }

    createStage(numberStages) {
        const newStage = []
        this.initStage(newStage, numberStages)
        return newStage
    }

    initStage(newStage, numberStages) {
        const matchStage = []
        for (let i = 0; i < numberStages; i++) {
            const match = ['Local team', 'Away team']
            matchStage.push(match)
        }
        newStage.push(matchStage)
    }

    setFirstStageTeams(stage) {
        let teamIndex = 0
        stage.forEach(match => {
            match[LOCAL_TEAM] = this.teams[teamIndex].name
            match[AWAY_TEAM] = this.teams[++teamIndex].name
            teamIndex++
        })
    }

    start() {
        for (const stage of this.matchDaysStage) {
            const stageResults = []
            for (const match of stage) {
                const result = this.play(match)
                this.updateTeams(result)
                stageResults.push(result)
            }
            // Calculate next stage
            // this.getStandings()
            // Guardar resumen de la jornada
            this.summaries.push(stageResults)
        }
    }

    generateGoals() {
        return Math.round(Math.random() * 10)
    }

    play(match) {
        let homeGoals = this.generateGoals()
        let awayGoals = this.generateGoals()
        while (true) { //if it is a draw let's play again
            if (homeGoals == awayGoals) {
                homeGoals = this.generateGoals()
                awayGoals = this.generateGoals()
            } else {
                break
            }
        }

        return {
            homeTeam: match[LOCAL_TEAM],
            homeGoals,
            awayTeam: match[AWAY_TEAM],
            awayGoals
        }
    }

    updateTeams(result) {
        const homeTeam = this.getTeamForName(result.homeTeam)
        const awayTeam = this.getTeamForName(result.awayTeam)
        if (homeTeam && awayTeam) {
            homeTeam.goalsFor += result.homeGoals
            homeTeam.goalsAgainst += result.awayGoals
            awayTeam.goalsFor += result.awayGoals
            awayTeam.goalsAgainst += result.homeGoals

            if (result.homeGoals > result.awayGoals) {
                this.updateTeamNext
            } else if (result.homeGoals < result.awayGoals) {
                awayTeam.hasWon = true
            }
        }
    }

    getWonTeam(result) {
        let wonTeam
        if (result.homeGoals > result.awayGoals) {
            wonTeam = result.homeTeam
        }
        else {
            wonTeam = result.awayTeam
        }
        return wonTeam
    }
}