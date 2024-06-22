import {useEffect, useState} from 'react';
import {useStore} from '../containers/StoreContainer';

export interface Theme {
  color: string;
  backgroundColor: string;
}

export const colors = {
  dark: {
    theme: 'dark',
    color: 'white',
    backgroundColor: 'black',
    theme1: {
      color: 'white',
      backgroundColor: '#0AAEEF',
    },
    theme2: {
      color: 'white',
      backgroundColor: 'rgb(40, 40, 40)',
    },
  },
  default: {
    theme: 'default',
    color: 'black',
    backgroundColor: 'white',
    theme1: {
      color: 'white',
      backgroundColor: '#0AAEEF',
    },
    theme2: {
      color: 'black',
      backgroundColor: 'rgb(245, 240, 240)',
    },
  },
  red: '#b60000',
  blue: '#0AAEEF',
};

export function useColors() {
  // const scheme = useColorScheme();
  const {store} = useStore();

  return store.userInfo?.theme === 'dark' ? colors.dark : colors.default;
  // return colors.dark;
}

export function useDelay(delay: number = 500) {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, delay);
  }, []);

  return {isLoading};
}
