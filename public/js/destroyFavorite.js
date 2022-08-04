const destroyGameFavorite = async (event) => {
    console.log("Checkpoint");
    const gameId = event.target.getAttribute('data-id');

    console.log(gameId);

    const response = await fetch(`/api/game/${gameId}`, {
        method: 'DELETE',
    });

    if(!response.ok) {
        alert('Failed to delete the game from favorites');
    } else {
        console.log('Favorite Delete Okay');
        document.location.replace('/favorites');
    }
};

document.getElementById('remove-favorite').addEventListener('click', destroyGameFavorite);