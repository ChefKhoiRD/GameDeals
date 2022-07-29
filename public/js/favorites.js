const newGameFavorite = async (event) => {
    event.preventDefault();

    const gameTitle = docuemnt.querySelector('#game-title');
    const gameId = document.querySelector('#game-Id');

    const response = await fetch('/api/game', {
        method: 'POST',
        body: JSON.stringify({ gameId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

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

document.querySelector('').addEventListener('click', newGameFavorite);
document.querySelector('').addEventListener('click', destroyGameFavorite);