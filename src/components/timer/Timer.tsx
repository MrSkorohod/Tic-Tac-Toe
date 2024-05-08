import { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function Timer({stopGame}: {stopGame: boolean}) {
  const {
    seconds,
    minutes,

    start,
    pause,
    reset,
  } = useStopwatch({autoStart: true});

  const showTimer = () => {
    const second = Math.floor(seconds)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor(minutes)
      .toString()
      .padStart(2, "0");


    return (minute + ":" + second)
  };

  useEffect(() => {
    if(stopGame) {
      pause()
    }
  }, [stopGame, pause])

  return (
    <>
      {showTimer()}
    </>
  );
}
