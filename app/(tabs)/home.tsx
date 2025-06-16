import { memo, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import PropertyListingCard from '../components/PropertyListingCard';
import Search from '../components/Search';
import { usePropertyStore } from '../store/usePropertyStore';

const HomeScreen = () => {
    const { properties, loading, error, fetchProperties, filteredProperties } = usePropertyStore();

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View>
            <FlatList
                data={!!filteredProperties.length ? filteredProperties : properties}
                renderItem={({ item, index }) => <PropertyListingCard propertyDetails={item} key={index} />}
                ListHeaderComponent={<Search />}
            />
        </View>
    );
}

export default memo(HomeScreen);
