import {useColorScheme} from 'react-native';

const colors = {
  dark: {
    color: 'white',
    color2: 'white',
    backgroundColor: 'black',
    backgroundColor2: 'dodgerblue',
    theme: 'dark',
  },
  default: {
    color: 'black',
    color2: 'white',
    backgroundColor: 'white',
    backgroundColor2: 'dodgerblue',
    theme: 'default',
  },
};

export function useColors() {
  const scheme = useColorScheme();

  // return scheme === 'dark' ? colors.dark : colors.default;
  return colors.dark;
}
