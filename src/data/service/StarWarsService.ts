import { SearchResult } from "../model/StarWarsSearch";
import { CharacterResponse, StarWarsSearchResponse } from "../model/StarWarsSearchResponse";

const BASE_URL: string = 'https://swapi.dev/api/'

export const getStarWarsCharacters = async (query: string, page: number): Promise<SearchResult> => {
    try {
        const rawData = await fetch(`${BASE_URL}/people/?search=${query}&page=${page}`);
        const response: StarWarsSearchResponse = await rawData.json();
        return mapResponse(response);
    } catch (ex: any) {
        return { characters: [], hasMorePage: false };
    }
};

const mapCharacters = (response: StarWarsSearchResponse) => response.results.map((character: CharacterResponse) => ({
    name: character.name,
    eye_color: character.eye_color,
    birth_year: character.birth_year,
    height: character.height,
    raw_created: character.created,
    created: new Date(character.created).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }),
}))

const mapResponse = (response: StarWarsSearchResponse): SearchResult => {
    return {
        characters: mapCharacters(response),
        hasMorePage: response.next !== null,
    }
}