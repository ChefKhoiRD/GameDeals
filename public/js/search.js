const generateCard = (game) => {
    return `
    <img src="${game.thumb}"
    class="p-1 border rounded object-scale-down h-20 w-20"
    alt="thumbnail for game image">
        
    <div class="pb-5 text-4xl">
        <a href="/search/${game.id}">${game.gtitle}</a>
    </div>`
}

const searchTitle = async (event) => {
    event.preventDefault();
    console.log("Checkpoint");

    const gameTitle = document.querySelector('#game-title').value.trim();

    let gameArray = [];
    let cardArray = [];

    try {
        const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=6`)
        const data = await response.json();
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            let newGameTitle = data[i].internalName;
            let newGameId = data[i].gameID;
            let newThumb = data[i].thumb;
    
            gameArray[i] = {
                gtitle: newGameTitle,
                id: newGameId,
                thumb: newThumb,
            }
            console.log(gameArray[i])
        }
        

        for (let i = 0; i < gameArray.length; i++) {
            let newCard = generateCard(gameArray[i]);
            cardArray.push(newCard);
        }
        console.log(gameArray);
        $('#appendCard').append(cardArray);
        
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
        var data = response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
document
    .querySelector('#game-search')
    .addEventListener('submit', searchTitle);