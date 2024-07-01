import {MasonryFlashList, MasonryFlashListProps} from '@shopify/flash-list';
import PostItem, {IMAGE_HEIGHT, VIDEO_HEIGHT} from './PostItem';
import {Tabs} from 'react-native-collapsible-tab-view';
import {useColors, useDelay} from '../../hooks/customHooks';
import {useWindowDimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Fragment} from 'react';

const COL_NUM = 3;

export const Loader = () => {
  const {theme} = useColors();
  const {width} = useWindowDimensions();
  const colNum = COL_NUM;
  const rowNum = 3;
  const _width = width / colNum;
  const _height = VIDEO_HEIGHT;
  const gap = 3;

  return (
    <ContentLoader
      speed={1}
      backgroundColor={
        theme === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(240, 240, 240)'
      }
      foregroundColor={
        theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(250, 250, 250)'
      }>
      {Array.from({length: rowNum}, (_, v) => v).map(i => {
        const hGap = i === 0 || i === rowNum - 1 ? 0 : gap;
        return (
          <Fragment key={i}>
            {Array.from({length: colNum}, (_, v) => v).map(j => {
              const vGap = j === 0 || j === colNum - 1 ? 0 : gap;
              return (
                <Rect
                  x={j * _width - vGap}
                  y={i * _height - hGap}
                  rx={i + j}
                  ry={i + j}
                  width={_width}
                  height={_height}
                  key={j}
                />
              );
            })}
          </Fragment>
        );
      })}
    </ContentLoader>
  );
};

type PostItemListProps<T> = Partial<MasonryFlashListProps<T>> & {
  data: any;
  isFetching: boolean;
  refetch: any;
  remove?: any;
  onPressItem: (index: number) => void;
  fetchNextPage?: any;
  hasNextPage?: boolean;
  useTabView?: boolean;
  imageHeight?: number;
  videoHeight?: number;
};

const PostItemList = ({
  data,
  isFetching,
  refetch,
  remove,
  onPressItem,
  fetchNextPage,
  hasNextPage = true,
  useTabView = false,
  imageHeight,
  videoHeight,
  ...rest
}: PostItemListProps<any>) => {
  const ListComp = useTabView ? Tabs.MasonryFlashList : MasonryFlashList;
  const {isLoading} = useDelay();

  return (
    <>
      {(isLoading && isFetching) || isLoading ? (
        <Loader />
      ) : (
        <ListComp
          data={data}
          renderItem={({item, index}) => (
            <PostItem
              item={item}
              onPress={() => onPressItem(index)}
              imageHeight={imageHeight}
              videoHeight={videoHeight}
            />
          )}
          keyExtractor={item => item.id}
          onRefresh={() => {
            if (remove) {
              remove();
            }
            refetch();
          }}
          refreshing={isFetching}
          onEndReached={() => {
            if (!isFetching && hasNextPage) {
              if (fetchNextPage) {
                fetchNextPage();
              }
            }
          }}
          numColumns={COL_NUM}
          estimatedItemSize={IMAGE_HEIGHT}
          contentContainerStyle={{paddingBottom: 10}}
          {...rest}
        />
      )}
    </>
  );
};

export default PostItemList;
