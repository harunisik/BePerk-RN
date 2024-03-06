import {Alert} from 'react-native';
import Button from './Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ReportButton = ({item}) => {
  return (
    <Button
      onPress={() => Alert.alert('under construction')}
      title="Report"
      iconComponent={
        <MaterialIcons name="report-gmailerrorred" size={26} color="red" />
      }
    />
  );
};

export default ReportButton;
