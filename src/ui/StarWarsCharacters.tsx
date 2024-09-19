import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator, FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useStarWarsCharacters } from "./StarWarsCharacters.hook";
import { Character } from '../data/model/StarWarsSearch';

const StarWarsCharactersScreen = () => {
    const [query, setQuery] = useState<string>('');
    const { characters, loading, getMoreCharacters, loadingMore, hasMorePage } = useStarWarsCharacters(query);

    const renderItem = ({ item }: { item: Character }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.detailsRow}>
                <Text style={styles.label}>Eye Color: </Text>
                <Text style={styles.value}>{item.eye_color}</Text>
            </View>
            <View style={styles.detailsRow}>
                <Text style={styles.label}>Birth Year: </Text>
                <Text style={styles.value}>{item.birth_year}</Text>
            </View>
            <View style={styles.detailsRow}>
                <Text style={styles.label}>Height: </Text>
                <Text style={styles.value}>{item.height} cm</Text>
            </View>
            <View style={styles.detailsRow}>
                <Text style={styles.label}>Created Date: </Text>
                <Text style={styles.value}>{item.created}</Text>
            </View>
        </View>
    );

    const EmptyItem = () => (
        <View style={styles.card}>
            <Text style={styles.name}>No characters found</Text>
        </View>
    )

    const LoadingItem = () => (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );

    return (
        <SafeAreaView style={styles.screen}>
            <TextInput
                placeholder="Search Star Wars Characters"
                placeholderTextColor='#ffffff'
                onChangeText={setQuery}
                value={query}
                style={styles.textInput}
            />
            {loading ? (
                <LoadingItem />
            ) : (
                <FlatList
                    data={characters}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                    ListEmptyComponent={query ? <EmptyItem /> : null}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (hasMorePage && !loadingMore) {
                            getMoreCharacters();
                        }
                    }}
                    ListFooterComponent={loadingMore ? <LoadingItem /> : null}
                    removeClippedSubviews={true}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 30,
    },
    card: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: '#444',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#feda4a',
    },
    detailsRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        fontWeight: 'bold',
        color: '#39b4ff',
    },
    value: {
        color: '#ffffff',
    },
    textInput: {
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        margin: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 20,
    },
});

export default StarWarsCharactersScreen;