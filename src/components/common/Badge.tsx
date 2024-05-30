import React from 'react';
import Text from './Text';
import View from './View';

const Badge = ({value}) => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        position: 'absolute',
        top: -3,
        right: -3,
        borderRadius: 20,
        padding: 2,
      }}>
      <Text style={{color: 'white', fontSize: 9}}>{value}</Text>
    </View>
  );
};

export default Badge;
