
import { useState, useEffect } from 'react';
import { getStarWarsCharacters } from '../data/service/StarWarsService';
import { Character } from '../data/model/StarWarsSearch';

export const useStarWarsCharacters = (query: string) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMorePage, setHasMorePage] = useState<boolean>(true);

    const getCharacters = async (isLoadMore = false) => {
        try {
            if (!isLoadMore) {
                setLoading(true);
            }
            const results = await getStarWarsCharacters(query, page);
            setCharacters((prev) => isLoadMore ? [...prev, ...sortCharacters(results.characters)] : sortCharacters(results.characters));
            setHasMorePage(results.hasMorePage);
        } catch (error: any) {
            setHasMorePage(false);
        } finally {
            if (!isLoadMore) {
                setLoading(false);
            } else {
                setLoadingMore(false);
            }
        }
    };

    const getMoreCharacters = async () => {
        if (hasMorePage && !loadingMore) {
            setLoadingMore(true);
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (page > 1) {
            getCharacters(true);
        } else {
            getCharacters(false);
        }
    }, [page]); 

    useEffect(() => {
        setPage(1);
        setCharacters([]);
        setHasMorePage(true);
        getCharacters(false);
    }, [query]);

    return { 
        characters, 
        loading, 
        getMoreCharacters, 
        loadingMore, 
        hasMorePage
    };
};

// This sort is applied only to the data from the currently fetched page.
const sortCharacters = (characters: Character[]): Character[] => {
    const blueEyedCharacters = characters
        .filter((char) => char.eye_color.toLowerCase() === 'blue')
        .sort((a, b) => a.name.localeCompare(b.name));

    const otherCharacters = characters
        .filter((char) => char.eye_color.toLowerCase() !== 'blue')
        .sort((a, b) => getCharacterDate(a.raw_created) - getCharacterDate(b.raw_created));

    return [...blueEyedCharacters, ...otherCharacters];
};

const getCharacterDate = (date: string) => new Date(date).getTime()