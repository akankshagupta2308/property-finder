import Ionicons from '@expo/vector-icons/Ionicons';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import DatePicker from '../components/DatePicker';
import PropertyImageCarousel from '../components/PropertyImageCarousel';
import ImageCarouselModal from '../modals/ImageCarouselModal';
import { usePropertyStore } from '../store/usePropertyStore';
import { useUserStore } from '../store/useUserStore';
import { getNextDate } from '../utils/dateUtils';

const PropertyDetailsScreen = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { id } = params ?? {};
    const { propertyDetail, loading, error, fetchPropertyDetails } = usePropertyStore();
    const { userData } = useUserStore();
    const [openImageCarousel, setOpenImageCarousel] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { location, title, features, images } = propertyDetail;

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title });
    }, [navigation, title]);

    useEffect(() => {
        fetchPropertyDetails(id.toString());
    }, [fetchPropertyDetails, id])

    const fullAddress = (!!location?.address ? `${location.address}, ` : '') + (!!location?.city ? `${location.city}, ` : '') + (!!location?.state ? `${location.state}` : '');
    const fullFeatures = features?.join(', ');

    const onBookProperty = async () => {
        setShowDatePicker(true);
    };

    const onSelectDate = async (event: DateTimePickerEvent, date: Date) => {
        toggleDatePicker();
        if (event.type === 'dismissed') {
            return;
        }

        if (event.type === 'neutralButtonPressed') {
            setDate(new Date(0));
        } else {
            setDate(date);
        }
        setDate(date);
        setLoading(true);
        const checkInDate = date?.toISOString().slice(0, 10);
        const checkOutDate = getNextDate(date)?.toISOString().slice(0, 10)
        const payload = {
            propertyId: id,
            userId: userData?.id,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            status: "confirmed"
        }
        try {
            const response = await axios.post('http://localhost:3000/bookings', payload);
            if (response.status === 201) {
                ToastAndroid.showWithGravity('Booking is successfully done!', 2000, ToastAndroid.CENTER)
            }
            setLoading(false);
        } catch (error) {
            console.log('Booking error:', error);
            setLoading(false);
        }
    };


    const toggleImageCarousel = () => {
        setOpenImageCarousel(!openImageCarousel);
    }

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }

    if (!!loading) {
        return <View style={tw`flex-1 items-center justify-center`}>
            <ActivityIndicator color={'blue'} size="large" />
        </View>
    }

    return (
        <View style={tw`flex-1`}>
            <View
                style={tw`bg-white flex-row`}
            >
                <View style={tw`flex-1 ml-2`}>
                    <View style={tw`flex-row items-center mt-2`}>
                        <Ionicons name="home" size={16} color="green" />
                        <Text style={tw`text-black text-base ml-1 mt-1 font-bold`} numberOfLines={2}>{fullFeatures}</Text>
                    </View>
                    <View style={tw`flex-row items-center mt-2`}>
                        <Ionicons name="location" size={16} color="green" />
                        <Text style={tw`text-sm text-black ml-1 font-500`}>{fullAddress}</Text>
                    </View>
                    <TouchableOpacity onPress={toggleImageCarousel}>
                        <Text style={tw`text-xs text-blue-700 ml-1 mb-3 font-500 mt-2 underline`}>View Property Images</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <MapView style={tw`w-full h-full`} initialRegion={{
                latitude: location.coordinates.latitude,
                longitude: location.coordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
                <Marker
                    coordinate={{ latitude: location?.coordinates?.latitude, longitude: location?.coordinates?.longitude }}
                />
            </MapView>
            <Pressable
                onPress={onBookProperty}
                style={tw`flex-1 ml-2 mr-2  h-12 bg-blue-500 items-center justify-center absolute left-2 right-2 bottom-5 rounded`}>
                {!!isLoading ? <ActivityIndicator color={'#ffffff'} size="small" /> : <Text style={tw`text-white text-sm font-700`}>Book Now</Text>}
            </Pressable>

            <ImageCarouselModal isVisible={openImageCarousel} onClose={toggleImageCarousel}>
                <PropertyImageCarousel images={images} />
            </ImageCarouselModal>
            {
                !!showDatePicker ?
                    <DatePicker onChange={onSelectDate} onClose={toggleDatePicker} date={date} />
                    :
                    <></>
            }
        </View>
    );
}

export default memo(PropertyDetailsScreen);
