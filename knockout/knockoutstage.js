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
        this.matchDaySchedule = []
        this.setupTeams(teams)
        this.summaries = []
    }

    setupTeams(teamNames) {
        this.teams = []
        for (const teamName of teamNames) {
            this.teams.push(teamName)
        }
        this.teams.shuffle()
    }

}