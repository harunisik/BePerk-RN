import {FlatList as RNFlatList, FlatListProps} from 'react-native';
import ItemSeperator from './ItemSpearator';
import {useCallback} from 'react';
import ListEmptyComponent from './ListEmptyComponent';

const FlatList = ({data, renderItem, ...rest}: FlatListProps<any>) => {
  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator medium />,
    [],
  );

  return (
    <RNFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
      {...rest}
    />
  );
};

export default FlatList;
