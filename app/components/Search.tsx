import Ionicons from '@expo/vector-icons/Ionicons';
import { memo, useRef, useState } from 'react';
import { TextInput, ToastAndroid, View } from "react-native";
import tw from 'twrnc';
import { usePropertyStore } from '../store/usePropertyStore';

const Search = () => {
    const { properties, updatePropertyList } = usePropertyStore();
    const [serachedProperty, setSerachedProperty] = useState('');
    const inputRef = useRef<TextInput>(null);

    const onChangeSerachedProperty = (text: string) => {
        if (!text) {
            updatePropertyList([]);
        }
        setSerachedProperty(text)
    }

    const onSearchProperties = () => {
        const regex = new RegExp(serachedProperty, "i");
        const filteredProperties = properties.filter(item => {
            return regex.test(item.title);
        });
        updatePropertyList(filteredProperties);
        if (!filteredProperties.length) {
            ToastAndroid.show('No Properties Found!', ToastAndroid.SHORT);
        }
    }

    return (
        <View
            style={tw`bg-white border-gray border-width-1 mt-4 ml-4 mr-4 pl-4 pr-4 flex-row rounded-lg h-14 items-center`}
        >
            <Ionicons name="search" size={14} color="green" />
            <TextInput
                ref={inputRef}
                value={serachedProperty}
                onChangeText={onChangeSerachedProperty}
                placeholder='Search your dream property'
                onEndEditing={onSearchProperties}
                style={tw `w-full`}
            />

        </View>
    );
}

export default memo(Search);
