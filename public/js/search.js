const searchTitle = async (event) => {
    event.preventDefault();
    console.log("Checkpoint");

    const gameTitle = document.querySelector('#game-title').value.trim();

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

        game = Handlebars.compile(game);
    } catch (err) {
        console.log(err);
    }
}

const searchTitleFetch = async function(event) {
    event.preventDefault();

    const gameTitle = document.querySelector('#game-title').value.trim();

    try {
        var response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({ last_search: gameTitle}),
            headers: {
                'Content-Type': 'application/json',
              },          
        })
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            console.log('Error with put')
        }
    } catch (err) {
        console.log(err);
    }
}
document
    .querySelector('#game-search')
    .addEventListener('submit', searchTitleFetch);