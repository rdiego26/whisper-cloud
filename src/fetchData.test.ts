import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchData, fetchDataFromUrls } from './fetcher';

describe('fetcher#fetchData', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should fetch data successfully from the given URL', async () => {
    const url = 'https://example.com';
    const mockData = 'Mocked data';

    mockAxios.onGet(url).reply(200, mockData);

    const result = await fetchData(url);
    expect(result).toBe(mockData);
  });

  it('should handle errors when fetching data', async () => {
    const url = 'https://example.com';

    mockAxios.onGet(url).reply(500);

    const result = await fetchData(url);
    expect(result).toBe('');
  });
});

describe('fetchDataFromUrls', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should fetch data from multiple URLs successfully', async () => {
    const urls = ['https://example.com/1', 'https://example.com/2'];
    const mockData1 = 'Mocked data 1';
    const mockData2 = 'Mocked data 2';

    mockAxios.onGet(urls[0]).reply(200, mockData1);
    mockAxios.onGet(urls[1]).reply(200, mockData2);

    const results = await fetchDataFromUrls(urls);
    expect(results).toEqual([mockData1, mockData2]);
  });

  it('should handle errors when fetching data from multiple URLs', async () => {
    const urls = ['https://example.com/1', 'https://example.com/2'];
    const mockData1 = 'Mocked data 1';

    mockAxios.onGet(urls[0]).reply(200, mockData1);
    mockAxios.onGet(urls[1]).reply(500);

    const results = await fetchDataFromUrls(urls);
    expect(results).toEqual([mockData1, '']);
  });
});
