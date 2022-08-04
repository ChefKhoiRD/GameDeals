const newGameFavorite = async (event) => {
    const gameId = window.location.href.replace('http://localhost:8000/search/', "");

    console.log(gameId);
    

    var response = await fetch('/api/game', {
        method: 'POST',
        body: JSON.stringify({ game_id: gameId }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if(!response.ok) {
        alert('Failed to save the game to favorites');
    } else {
        console.log('Favorite Post Okay');
    }
};

document.getElementById('addFavorite').addEventListener('click', newGameFavorite);