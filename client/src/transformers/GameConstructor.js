export const Game = (row, headers) => {
    const vals = [...row];

    const [time, game, golf, team] = vals
    const timestamp = new Date(time);
    const lowestScoreWins = golf === "Yes"
    const isTeamGame = team === "Yes"

    const results = [];
    let error;
    if (!isTeamGame) { // individual scores are just held at the end of the list
        const scoreIdx = headers.length - 1
        const playersIdx = headers.length - 2
        const players = vals[playersIdx].split(/,\s/g)
        const scores = vals[scoreIdx].split(/,\s*/g)

        if (players.length !== scores.length) {
            error = "Mismatched number of players and scores!"
        }
        players.forEach((player, i) => results.push({
            player,
            score: +scores[i]
        }))

    } else {
        const scores = vals[headers.length - 3].split(/,\s*/g)
        const teamMap = {}
        for (let i = 4; i < vals.length - 3; i++) {
            if (vals[i] !== "") {
                // find "Who played [person]" person name
                const playerMatch = headers[i].match(/\[(.*)\]/)
                // should always exist, but just double checking...
                if (playerMatch[1]) {
                    teamMap[vals[i]] = teamMap[vals[i]] || []
                    teamMap[vals[i]].push(playerMatch[1])
                } else {
                    error = `${headers[i]} not parsed correctly!`
                }


            }
        }

        // Ensure we see these in the order of "Team 1", "Team 2", ... etc
        // also be a bit generic so that Team 3 versus Team 5 gets parsed correctly
        const teams = Object.keys(teamMap).sort()
        if (teams.length === 0) {
            error = "No players were selected!"
        }
        teams.forEach((key, i) => {
            const teammates = teamMap[key]
            // all teammates get the same score
            teammates.forEach((player) => {
                results.push({
                    player,
                    score: +scores[i]
                })
            })
        })
    }

    return {
        error,
        timestamp,
        game,
        results,
        lowestScoreWins
    }

}

// converts rows to multiple Game models
export const Games = (rows, headers) => {
    if (!headers || !headers.length) {
        return []
    }
    return rows.map((row) => Game(row, headers))
}