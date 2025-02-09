import { fetchDataFromUrls } from './fetcher';
import { processText } from './processor';
import { writeOutput } from './writer';

const NUM_URLS = 100;
const API_URL = 'https://baconipsum.com/api/?type=meat-and-filler&paras=2&format=text';

async function main() {
    const urls = Array.from({ length: NUM_URLS }, () => API_URL);

    console.log('Fetching data from URLs...');
    const texts = await fetchDataFromUrls(urls);

    console.log('Processing text...');
    const wordFrequency = processText(texts);

    console.log('Writing output...');
    writeOutput(wordFrequency, 'output.txt');

    console.log('Word cloud generated successfully!');
}

main().catch(err => console.error('Error:', err));
