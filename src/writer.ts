import fs from 'fs';

export function writeOutput(wordFrequency: Map<string, number>, outputFile: string): void {
    const sortedWords = Array.from(wordFrequency.entries()).sort((a, b) => b[1] - a[1]);

    const maxFrequency = sortedWords[0][1];
    const outputLines: string[] = [];

    sortedWords.forEach(([word, frequency]) => {
        let fontSize = 'Small';
        if (frequency === maxFrequency) {
            fontSize = 'Huge';
        } else if (frequency > 0.6 * maxFrequency) {
            fontSize = 'Big';
        } else if (frequency > 0.3 * maxFrequency) {
            fontSize = 'Normal';
        }

        outputLines.push(`${word}: ${frequency} (${fontSize})`);
    });

    fs.writeFileSync(outputFile, outputLines.join('\n'));
}
