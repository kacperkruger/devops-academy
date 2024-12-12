const getPublisherDetails = ( state, id ) => {
    try {
        const publisher = state.publishers.publishers.find(publisher => publisher._id === id);
        return publisher
    } catch (error) {
        console.log(error)
    }
}

const getPublisherFromGame = ( state, gameId ) => {
    try {
        const game = state.games.games.find(game => game._id === gameId)
        const publisher = state.publishers.publishers.find(publisher => publisher._id === game.publisher);
        return publisher
    } catch (error) {
        console.log(error)
    }
}

const selectors = {
    getPublisherDetails,
    getPublisherFromGame
}

export default selectors;