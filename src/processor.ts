import * as stopword from 'stopword';

export function processText(texts: string[]): Map<string, number> {
    const wordFrequency = new Map<string, number>();

    texts.forEach(text => {
        const words = text
            .toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove punctuation
            .split(/\s+/); // Split by whitespace

        const filteredWords = stopword.removeStopwords(words);

        filteredWords.forEach(word => {
            if (word.length > 1) { // Ignore single-character words
                wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
            }
        });
    });

    // Remove words that appear only once
    for (const [word, count] of wordFrequency.entries()) {
        if (count === 1) {
            wordFrequency.delete(word);
        }
    }

    return wordFrequency;
}
