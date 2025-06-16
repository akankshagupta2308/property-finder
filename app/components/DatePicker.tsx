import DateTimePicker from '@react-native-community/datetimepicker';
import { memo, PropsWithChildren } from 'react';
import { View } from 'react-native';

type Props = PropsWithChildren<{
    onClose: () => void;
    onChange: any;
    date: Date;
}>;

const DatePicketModal = ({ onChange, date, onClose }: Props) => {
    return (
        <View>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
                onTouchCancel={onClose}
            />
        </View>

    );
}

export default memo(DatePicketModal);