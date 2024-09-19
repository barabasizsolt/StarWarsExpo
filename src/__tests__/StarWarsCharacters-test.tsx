
import { useStarWarsCharacters } from "../ui/StarWarsCharacters.hook";
import { renderHook, act } from '@testing-library/react-hooks';
import { getStarWarsCharacters } from '../data/service/StarWarsService';

jest.mock('../data/service/StarWarsService', () => ({
    getStarWarsCharacters: jest.fn(),
}));

const mockCharacters = [
    { name: 'Luke Skywalker', eye_color: 'blue', birth_year: '19BBY', height: '172', raw_created: '2014-12-09T13:50:51.644000Z', created: '2014-12-09T13:50:51.644000Z' },
    { name: 'C-3PO', eye_color: 'yellow', birth_year: '112BBY', height: '167', raw_created: '2014-12-10T16:20:44.310000Z', created: '2014-12-10T16:20:44.310000Z' },
    { name: 'Leia Organa', eye_color: 'brown', birth_year: '19BBY', height: '150', raw_created: '2014-12-10T15:20:09.791000Z', created: '2014-12-10T15:20:09.791000Z' },
    { name: 'Anakin Skywalker', eye_color: 'blue', birth_year: '41.9BBY', height: '188', raw_created: '2014-12-10T16:40:44.310000Z', created: '2014-12-10T16:40:44.310000Z' },
    { name: 'Owen Lars', eye_color: 'blue', birth_year: '52BBY', height: '178', raw_created: '2014-12-10T16:50:44.310000Z', created: '2014-12-10T16:50:44.310000Z' },
    { name: 'Beru Whitesun Lars', eye_color: 'red', birth_year: '47BBY', height: '165', raw_created: '2014-12-10T17:00:44.310000Z', created: '2014-12-10T17:00:44.310000Z' },
];
  
describe('useStarWarsCharacters', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('fetches characters based on query [Skywalker]', async () => {
        (getStarWarsCharacters as jest.Mock).mockResolvedValueOnce({
            characters: [mockCharacters[0], mockCharacters[3]],
            hasMorePage: true,
        });
    
        const { result, waitForNextUpdate } = renderHook(() => useStarWarsCharacters('Skywalker'));
    
        expect(result.current.loading).toBe(true);
    
        await waitForNextUpdate();

        expect(result.current.characters.length).toBe(2);
        expect(result.current.characters[0].name).toBe('Anakin Skywalker');
        expect(result.current.loading).toBe(false);
    });
  
    test('sorts characters by eye color and creation date', async () => {
        (getStarWarsCharacters as jest.Mock).mockResolvedValueOnce({
            characters: mockCharacters,
            hasMorePage: false,
        });
    
        const { result, waitForNextUpdate } = renderHook(() => useStarWarsCharacters('luke'));
    
        await waitForNextUpdate();
    
        expect(result.current.characters[0].eye_color).toBe('blue');
        expect(result.current.characters[1].eye_color).toBe('blue');
        expect(result.current.characters[2].eye_color).toBe('blue');
        expect(result.current.characters[3].eye_color).toBe('brown');
        expect(result.current.characters[4].eye_color).toBe('yellow');
        expect(result.current.characters[5].eye_color).toBe('red');
    });
});