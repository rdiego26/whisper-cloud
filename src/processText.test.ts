import { processText } from './processor';

describe('processor#processText', () => {
  it('should process text and return word frequency map', () => {
    const texts = [
      'This is a test. This test is only a test.',
      'If this were an actual emergency, you would be instructed to do something.',
    ];

    const result = processText(texts);

    expect(result).toBeInstanceOf(Map);
    expect(result.get('test')).toBe(3); // "test" appears 3 times
    expect(result.get('emergency')).toBeUndefined(); // "emergency" appears once but is filtered out
    expect(result.get('actual')).toBeUndefined(); // "actual" appears once
    expect(result.get('this')).toBeUndefined(); // "this" is a stop word and should be removed
    expect(result.get('is')).toBeUndefined(); // "is" is a stop word and should be removed
  });

  it('should ignore single-character words', () => {
    const texts = ['a b c d e f g h i j k l m n o p q r s t u v w x y z'];

    const result = processText(texts);

    expect(result.size).toBe(0); // All single-character words should be ignored
  });

  it('should remove punctuation and split by whitespace', () => {
    const texts = ['Hello, world! This is a test.'];

    const result = processText(texts);

    expect(result.get('hello')).toBeUndefined(); // "hello" is a stop word (if included in the stop word list)
    expect(result.get('world')).toBeUndefined(); // "world" appears once but is filtered out
    expect(result.get('test')).toBeUndefined(); // "test" appears once but is filtered out
  });

  it('should remove words that appear only once', () => {
    const texts = ['This is a unique word.'];

    const result = processText(texts);

    expect(result.size).toBe(0); // "unique" and "word" appear only once and should be removed
  });

  it('should handle empty input', () => {
    const texts: string[] = [];

    const result = processText(texts);

    expect(result.size).toBe(0); // No words to process
  });

  it('should handle empty strings in input', () => {
    const texts = ['', ' ', '  '];

    const result = processText(texts);

    expect(result.size).toBe(0); // No valid words to process
  });

  it('should handle mixed case and normalize to lowercase', () => {
    const texts = ['Hello WORLD', 'HELLO world'];

    const result = processText(texts);

    expect(result.get('hello')).toBe(2); // "hello"
    expect(result.get('world')).toBe(2); // "world" appears twice
  });

  it('should handle stop words correctly', () => {
    const texts = ['This is the house that Jack built.', 'This is the house is expensive.'];

    const result = processText(texts);

    expect(result.get('this')).toBeUndefined(); // "this" is a stop word
    expect(result.get('is')).toBeUndefined(); // "is" is a stop word
    expect(result.get('the')).toBeUndefined(); // "the" is a stop word
    expect(result.get('Jack')).toBeUndefined(); // "Jack" appears once but is filtered out
    expect(result.get('house')).toBe(2); // "house" appears twice
    expect(result.get('that')).toBeUndefined(); // "that" is a stop word
  });
});
