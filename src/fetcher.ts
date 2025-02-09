import axios from 'axios';

/**
 * Fetches data from the given URL.
 * @param url
 */
export async function fetchData(url: string): Promise<string> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return '';
    }
}

/**
 * Fetches data from the API_URL.
 * @param urls
 */
export async function fetchDataFromUrls(urls: string[]): Promise<string[]> {
    const fetchPromises = urls.map(url => fetchData(url));
    return Promise.all(fetchPromises);
}
