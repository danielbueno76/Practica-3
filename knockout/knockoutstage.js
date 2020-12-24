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
        this.teams = teamNames
        this.teams.shuffle()
    }

    scheduleStage(){
        for (let i = this.teams.length; i > 1 ; i=i/2) {
            const newStage = this.createStage(i/2)

            this.matchDaysStage = this.matchDaysStage.concat(newStage)
        }
    }

    createStage(numberStage) {
        const newStage = []
        this.initStage(newStage, numberStage)
        if (numberStage == (this.teams.length/2))
            this.setFirstStageTeams(newStage)
        return newStage
    }

    initStage(newStage, numberStage) {
        const numberOfTeamsPerStage = numberStage
        const matchStage = []
        for (let i = 0; i < numberOfTeamsPerStage; i++) {
            const match = ['Local team', 'Away team']
            matchStage.push(match)
        }
        newStage.push(matchStage)
    }

    setFirstStageTeams(newStage) {
        let teamIndex = 0
        newStage[0].forEach(match => {
            match[LOCAL_TEAM] = this.teams[teamIndex]
            match[AWAY_TEAM] = this.teams[++teamIndex]
            teamIndex++
        })
    }
}