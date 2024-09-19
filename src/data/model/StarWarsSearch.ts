export type SearchResult = {
    characters: Character[];
    hasMorePage: boolean;
}

export type Character = {
    name: string;
    eye_color: string;
    birth_year: string;
    height: string;
    raw_created: string,
    created: string;
};