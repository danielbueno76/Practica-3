export const LOCAL_TEAM = 0
export const AWAY_TEAM = 1

export default class KnockoutPhase {
    constructor(name, teams=[]) {
        this.name = name
        this.matchDaysStage = []
        this.matchDaysLoseStage = []
        this.setupTeams(teams)
        this.summariesWinStages = []
        this.summariesLoseStages = []
    }

    setupTeams(teams) {
        this.teams = teams
    }

    scheduleStage(){
        this.scheduleStageWin()
        this.scheduleStageLose()
    }
    
    scheduleStageWin(){
        for (let i = (this.teams.length*2); i > 1 ; i=i/2) {
            const newStage = this.createStage(i/2)

            this.matchDaysStage = this.matchDaysStage.concat(newStage)
        }
        this.setFirstStageTeams(this.matchDaysStage[0])// In the first stage we assign the team names
    }

    scheduleStageLose(){
        const newStageLose = this.createStage(1) // just third and fourth position
        this.matchDaysLoseStage = this.matchDaysLoseStage.concat(newStageLose)
    }
    
    getLoseTeams(numberOfMatches) {
        let matchDayLose = undefined
        this.matchDaysLoseStage.forEach( matchDay => {
            if (matchDay.length == numberOfMatches) {
                matchDayLose = matchDay
            }
        })
        return matchDayLose
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
            match[LOCAL_TEAM] = this.teams[teamIndex][LOCAL_TEAM]
            match[AWAY_TEAM] = this.teams[teamIndex][AWAY_TEAM]
            teamIndex++
        })
    }

    start() {
        this.calculateWinStages()
        this.calculateLoseStages() // Third and fourth position
    }

    calculateWinStages() {
        let currentStage = 0
        for (const stage of this.matchDaysStage) {
            const stageResults = []
            for (const match of stage) {
                const result = this.play(match)
                stageResults.push(result)
            }
            // Calculate next stage except final
            if ((currentStage+1) != this.matchDaysStage.length) {
                this.updateNextWinStage(currentStage+1, stageResults)
            }

            // Calculate stage of lose teams. just third and fourth position
            if (stageResults.length == 2) {
                this.updateNextLoseStage(0, stageResults)
            }

            // Save summary of the stage
            this.summariesWinStages.push(stageResults)
            currentStage++
        }
    }
    calculateLoseStages() {
        this.matchDaysLoseStage.forEach(stage => {
            const stageResults = []
            stage.forEach( match => {
                const result = this.play(match)
                stageResults.push(result)
            })

            // Save summary of the stage
            this.summariesLoseStages.push(stageResults)
        })
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

    getLoseTeam(result) {
        let loseTeam
        if (result.homeGoals < result.awayGoals) {
            loseTeam = result.homeTeam
        }
        else {
            loseTeam = result.awayTeam
        }
        return loseTeam
    }

    updateNextWinStage(nextStage, stageResults) {
        let teamIndex = 0
        for(let i = 0; i < stageResults.length; i=i+2) {
            const wonTeam1 = this.getWonTeam(stageResults[i])
            const wonTeam2 = this.getWonTeam(stageResults[i+1])
            const stage = this.matchDaysStage[nextStage]
            const match = stage[teamIndex]
            match[LOCAL_TEAM] = wonTeam1
            match[AWAY_TEAM] = wonTeam2
            teamIndex++
        }
    }

    updateNextLoseStage(nextStage, stageResults) {
        let teamIndex = 0
        for(let i = 0; i < stageResults.length; i=i+2) {
            const loseTeam1 = this.getLoseTeam(stageResults[i])
            const loseTeam2 = this.getLoseTeam(stageResults[i+1])
            const stage = this.matchDaysLoseStage[nextStage]
            const match = stage[teamIndex]
            match[LOCAL_TEAM] = loseTeam1
            match[AWAY_TEAM] = loseTeam2
            teamIndex++
        }
    }
}