import {ProgressBar as RNProgressBar} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {Props} from 'react-native-paper/lib/typescript/components/ProgressBar';

interface ProgressBarProps extends Props {
  duration: number;
  onIntervalEnd?: Function;
  play?: boolean;
}

const ProgressBar = ({
  duration,
  play = false,
  onIntervalEnd,
  ...rest
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const tick = 200;

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= duration) {
            clearInterval(interval);
            if (onIntervalEnd) {
              onIntervalEnd();
            }
            return duration;
          }
          return prevProgress + tick;
        });
      }, tick);
      return () => clearInterval(interval);
    }
  }, [play]);

  return <RNProgressBar {...rest} progress={progress / duration} />;
};

export default ProgressBar;
