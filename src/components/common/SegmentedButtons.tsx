import {useEffect, useState} from 'react';
import Text from './Text';
import View from './View';
import {Pressable, ViewProps} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type SegmentedButtonsProps = ViewProps & {
  value: string;
  onChange: (value: string) => void;
  buttons: {value: string; label: string}[];
};

const SegmentedButtons = ({
  value,
  onChange,
  buttons,
  style,
}: SegmentedButtonsProps) => {
  // const [value, setValue] = useState();

  // useEffect(() => {
  //   setValue(value);
  // }, [value]);

  return (
    <View
      style={[
        style,
        {
          borderRadius: 20,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: 'lightgray',
        },
      ]}
      disableTheme>
      {buttons.map((item, index) => {
        1;
        return (
          <Pressable
            onPress={() => onChange(item.value)}
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 5,
              borderRightWidth: index < buttons.length - 1 ? 1 : 0,
              borderRightColor: 'white',
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor:
                item.value === value ? 'rgb(40, 40, 40)' : 'rgb(120, 120, 120)',
              opacity: item.value === value ? 1 : 0.9,
              borderTopStartRadius: index === 0 ? 20 : 0,
              borderBottomStartRadius: index === 0 ? 20 : 0,
              borderTopEndRadius: index === buttons.length - 1 ? 20 : 0,
              borderBottomEndRadius: index === buttons.length - 1 ? 20 : 0,
            }}>
            {item.value === value && (
              <MaterialCommunityIcons name="check" color="white" />
            )}
            <Text color="white">{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SegmentedButtons;
