
import got from "got";



export default async function createTags(key) {
    const awsS3URL = `https://s3-chainsawman-bucket.s3.us-west-1.amazonaws.com/${key}`
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(awsS3URL);

    try {
        const response = await got(url, { username: apiKey, password: apiSecret });
        return await JSON.parse(response.body)
    } catch (error) {
        console.log('what is error', error)
    }
}