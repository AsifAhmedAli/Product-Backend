const request = require('request');

const generateRandomNumber = (count) => {
    const random = Math.floor(Math.random() * count);
    return random;
}

const generateRandomVideoLink = (id) => {
    // return video link
    const generatedVideoLink = `https://www.youtube.com/embed/${id}`;

    return generatedVideoLink;
}

const getYoutubeVideos = async (req, res) => {
    // const { youtubeVideoId } = req.body;

    const BASE_URL = "https://www.googleapis.com/youtube/v3";
    const CHANNEL_ID = "UCCa-k6rtOHWt2PmjBbhy7oQ";

    const channelVideosUrl = `${BASE_URL}/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`

    request(channelVideosUrl, (error, response, body) => {
        if (error) {
            res.status(500).json(error.message);
        }
        if (response) {
            // length of response body
            const totalVideos = JSON.parse(response.body).items.length;

            // Generate Random Value to be selected
            const randomVal = generateRandomNumber(totalVideos);

            // Get the video id
            const videoId = generateRandomVideoLink(JSON.parse(response.body).items[randomVal].id.videoId);

            res.json(videoId);
        }
    })

}

module.exports = getYoutubeVideos;
