const listGames = async (game) => {
    try {
        const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${game}&limit=6`)
        return response
    } catch (err) {
        console.log(err);
    }
}

module.exports = { listGames };