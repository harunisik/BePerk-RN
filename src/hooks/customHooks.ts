import {useColorScheme} from 'react-native';

const colors = {
  dark: {
    color: 'white',
    backgroundColor: 'black',
  },
  default: {
    color: 'black',
    backgroundColor: 'white',
  },
};

export function useColors() {
  const scheme = useColorScheme();

  return scheme === 'dark' ? colors.dark : colors.default;
}
