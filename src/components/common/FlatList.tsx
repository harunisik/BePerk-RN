import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
} from 'react-native';
import ItemSeperator from './ItemSpearator';
import {useCallback} from 'react';
import ListEmptyComponent from './ListEmptyComponent';

type FlatListProps<T> = RNFlatListProps<T> & {
  separatorSize?: 'medium' | 'large';
};

const FlatList = ({
  data,
  renderItem,
  separatorSize,
  ...rest
}: FlatListProps<any>) => {
  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator size={separatorSize} />,
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
