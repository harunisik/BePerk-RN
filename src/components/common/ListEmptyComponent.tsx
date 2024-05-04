import {useMemo} from 'react';
import {Text, View} from 'react-native';

const ListEmptyComponent = () => {
  return (
    <>
      {useMemo(
        () => (
          <View style={{alignItems: 'center'}}>
            <Text>No data available</Text>
          </View>
        ),
        [],
      )}
    </>
  );
};

export default ListEmptyComponent;
