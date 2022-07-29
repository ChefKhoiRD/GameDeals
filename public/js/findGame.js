const findGame = async (gameId) => {
    try {
        const response = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameId}`)
        return response
    } catch (err) {
        console.log(err);
    }
}

module.exports = { findGame };