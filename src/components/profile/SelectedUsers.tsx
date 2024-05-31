import {ScrollView} from 'react-native';
import common from '../../styles/sharedStyles';
import Text from '../common/Text';
import View from '../common/View';

const SelectedUsers = ({data}) => {
  const {p10, radius6, row, cGap5} = common;

  return (
    <ScrollView>
      <View style={[row, cGap5]}>
        {data?.map(item => {
          return (
            <View
              key={item.user_id}
              style={[radius6, p10, {backgroundColor: 'dodgerblue'}]}>
              <Text>{item.fullname}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SelectedUsers;
