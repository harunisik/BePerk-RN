import common from '../../styles/sharedStyles';
import Text from '../common/Text';
import View from '../common/View';

const {ph10, pv5, radius6, row, cGap5, jcCenter} = common;

const SelectedUsers = ({data}) => {
  return (
    <View
      style={[row, cGap5, {flexWrap: 'wrap', rowGap: 10, paddingVertical: 10}]}>
      {data?.map(item => {
        return (
          <View
            key={item.user_id}
            style={[
              jcCenter,
              radius6,
              ph10,
              pv5,
              {backgroundColor: '#0AAEEF'},
            ]}>
            <Text>{item.fullname}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default SelectedUsers;
