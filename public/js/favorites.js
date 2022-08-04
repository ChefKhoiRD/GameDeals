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

const destroyGameFavorite = async (event) => {
    const gameId = event.target.getAttribute('');

    const response = await fetch(`/api/game/${gameId}`, {
        method: 'DELETE',
    });

    if(!response.ok) {
        alert('Failed to delete the game from favorites');
    } else {
        console.log('Favorite Delete Okay');
    }
};

document.getElementById('addFavorite').addEventListener('click', newGameFavorite);
document.getElementById('removeFavorite').addEventListener('click', destroyGameFavorite);