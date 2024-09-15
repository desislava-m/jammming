import getSpotifyAccessToken from './spotify-access-token';



const getUserId = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data.id;
};


const createSpotifyPlaylist = async (userId, playlistName, accessToken) => {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: playlistName,
            description: 'Created with Jammming',
            public: false
        })
    });
    const data = await response.json();
    return data.id; // Returns the playlist ID
};


const addTracksToPlaylist = async (playlistId, trackUris, accessToken) => {
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: trackUris
        })
    });
};


const savePlaylistSpotify = async () => {
    try {
        const accessToken = await getSpotifyAccessToken();
        if (!accessToken) {
            console.error("Access token is not available");
            return;
        }

        // Fetch the user's Spotify ID
        const userId = await getUserId(accessToken);
        if (!userId) {
            console.error("Could not retrieve user ID");
            return;
        }

        // Create a new playlist
        const playlistId = await createSpotifyPlaylist(userId, playlistName, accessToken);
        if (!playlistId) {
            console.error("Could not create playlist");
            return;
        }

        // Get track URIs from the playlist
        const trackUris = playlist.map(song => song.uri);
        if (trackUris.length === 0) {
            console.error("No tracks to add to the playlist");
            return;
        }

        // Add tracks to the newly created playlist
        await addTracksToPlaylist(playlistId, trackUris, accessToken);
        
        console.log('Playlist saved successfully!');
    } catch (error) {
        console.error("Error saving playlist:", error);
    }
};

export default savePlaylistSpotify;