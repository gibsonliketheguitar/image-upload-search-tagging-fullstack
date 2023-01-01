const baseURL = 'http://localhost:8000'

export async function searchPhoto(query: string) {
    const URL = baseURL + '/photos?search=' + query
    const response = await fetch(URL)
    return await response.json()
}