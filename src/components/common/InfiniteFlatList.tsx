import {FlatListProps} from 'react-native';
import FlatList from './FlatList';

interface InfiniteListProps {
  fetchNextPage: any;
  isFetching: any;
  refetch: any;
  remove: any;
}

type InfiniteFlatListProps = FlatListProps<any> | InfiniteListProps;

const InfiniteFlatList = ({
  data,
  renderItem,
  fetchNextPage,
  isFetching,
  refetch,
  remove,
  ...rest
}: InfiniteFlatListProps) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      onRefresh={() => {
        remove();
        refetch();
      }}
      refreshing={isFetching}
      onEndReached={() => !isFetching && fetchNextPage()}
      onScrollToIndexFailed={() => {}}
      {...rest}
    />
  );
};

export default InfiniteFlatList;
