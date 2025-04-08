
export async function fetchSongs(mood: string) {
    const JAMENDO_CLIENT_ID = "46f00fe7";
    const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&tags=${mood}&limit=10`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data.results;
}

export type Track = Partial<{
    album: string
    album_id: string
    album_image: string
    album_name: string
    artist_id: string
    artist_idstr: string
    artist_name: string
    audio: string
    audiodownload: string
    audiodownload_allowed: boolean
    duration: string
    id: string
    image: string
    license_ccurl: string
    name: string
    position: number
    prourl: string
    releasedate: string
    shareurl: string
    shorturl: string
    waveform: string
}>