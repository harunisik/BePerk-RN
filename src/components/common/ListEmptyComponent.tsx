import {useMemo} from 'react';
import {View} from 'react-native';
import Text from './Text';

const ListEmptyComponent = () => {
  return (
    <>
      {useMemo(
        () => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <Text style={{color: 'gray'}}>No data available</Text>
          </View>
        ),
        [],
      )}
    </>
  );
};

export default ListEmptyComponent;
