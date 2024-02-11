import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import common from '../../styles/sharedStyles';
import {useQuery} from 'react-query';
import {getUserComments} from '../../services/UserService';
import {dateDiff} from '../../utils/DateUtil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMemo, useState} from 'react';
import {CommentLike} from '../profile/Doves';

const CommentItem = ({item, isChild = false}) => {
  const {
    row,
    rGap5,
    rGap15,
    cGap5,
    cGap10,
    bold,
    font11,
    gray,
    jcSpaceBetween,
    flex1,
    pr10,
    ml30,
  } = common;

  const [showReplies, setShowReplies] = useState(false);

  const handleViewReply = () => {
    setShowReplies(showReplies ? false : true);
  };

  return (
    <View>
      <View
        style={[styles.itemContainer, row, cGap10, ...(isChild ? [ml30] : [])]}>
        <MaterialCommunityIcons name="account" size={26} />
        <View style={[row, jcSpaceBetween, flex1, cGap10]}>
          <View style={[rGap15, flex1]}>
            <View style={[rGap5]}>
              <Text style={pr10}>
                <Text style={bold}>{item.fullname + ' '}</Text>
                <Text>{item.comment}</Text>
              </Text>
              <View style={[row, cGap5]}>
                <Text style={[font11, gray]}>{dateDiff(item.date * 1000)}</Text>
                <Text style={[font11, gray]}>Reply</Text>
              </View>
            </View>
            {!isChild && item.childList?.length > 0 && (
              <TouchableOpacity onPress={handleViewReply}>
                <Text style={[font11, gray]}>
                  {showReplies
                    ? 'Hide replies'
                    : `View ${item.childList.length} replies`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <CommentLike
              id={item.id}
              type={4}
              isLiked={item.liked}
              likes_count={item.likes_count}
            />
          </View>
        </View>
      </View>
      {showReplies && (
        <FlatList
          data={item.childList}
          renderItem={({item: item2}) => <CommentItem item={item2} isChild />}
          keyExtractor={item2 => item2.id}
        />
      )}
    </View>
  );
};

const CommentHeaderItem = ({item}) => {
  const {row, rGap15, cGap10, bold, font11, gray, pr10, flex1} = common;

  return (
    <View style={[styles.headerContainer, row, cGap10]}>
      <View>
        <MaterialCommunityIcons name="account" size={26} />
      </View>
      <View style={[rGap15, flex1]}>
        <Text style={pr10}>
          <Text style={bold}>{item.fullname + ' '}</Text>
          <Text>{item.caption}</Text>
        </Text>
        <Text style={[font11, gray]}>{dateDiff(item.upload_time * 1000)}</Text>
      </View>
    </View>
  );
};

const findTopParent = (id, data) => {
  const parent = data.find(item => item.id === id);
  if (parent.comment_id === 0) {
    return parent;
  }

  return findTopParent(parent.comment_id, data);
};

const Comment = ({
  route: {
    params: {comment},
  },
}) => {
  const {data, refetch, isFetching} = useQuery({
    queryKey: ['getUserComments', {id: comment.id, type: comment.type}],
    queryFn: getUserComments,
  });

  const result = useMemo(
    () =>
      data?.comment.reduce((acc, item) => {
        const {comment_id} = item;

        if (comment_id === 0) {
          acc.push(item);
        } else {
          const topParent = findTopParent(comment_id, data.comment);
          // const topParent = acc.find(({id}) => id === topParentId);
          if (!topParent.childList) {
            topParent.childList = [];
          }
          topParent.childList.push(item);
        }

        return acc;
      }, []),
    [data],
  );

  const {row, font20, jcSpaceBetween, p15, flex1} = common;

  return (
    <View style={flex1}>
      <FlatList
        data={result}
        ListHeaderComponent={<CommentHeaderItem item={comment} />}
        renderItem={({item}) => <CommentItem item={item} />}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
      />
      <View style={[p15, styles.shadowProp]}>
        <View style={[row, jcSpaceBetween]}>
          <Text style={font20}>😌</Text>
          <Text style={font20}>🤣</Text>
          <Text style={font20}>❤️</Text>
          <Text style={font20}>😍</Text>
          <Text style={font20}>😱</Text>
          <Text style={font20}>✝️</Text>
          <Text style={font20}>🙏</Text>
          <Text style={font20}>🔥</Text>
          <Text style={font20}>😥</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    paddingBottom: 5,
  },
  headerContainer: {
    padding: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: 'white',
    height: 100,
  },
});

export default Comment;
