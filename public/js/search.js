const searchTitle = async (event) => {
    event.preventDefault();

    const gameTitle = document.querySelector('#').ariaValueMax.trim();

    let gameArray = [];

    try {
        const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=6`)
        const data = response.json();

        for (let i = 0; i < data.length; i++) {
            let newGameTitle = data[i].internalName;
            let newGameId = data[i].gameID;
            let newThumb = data[i].thumb;
    
            gameArray[i] = {
                gtitle: newGameTitle,
                id: newGameId,
                thumb: newThumb,
            }
        }

        const game = gameArray.map((game) => game.get({ plain: true }));

        res.render('homepage', {
            game,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
    }
}

document.querySelector('.form-input').addEventListener('submit', searchTitle);