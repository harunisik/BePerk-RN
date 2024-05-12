import {useMemo} from 'react';
import {Text, View} from 'react-native';

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
