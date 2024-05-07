import { useStopwatch } from 'react-timer-hook';

export default function Timer({stopGame}: {stopGame: boolean}) {
  const {
    seconds,
    minutes,

    start,
    pause,
    reset,
  } = useStopwatch({autoStart: true});

  if(stopGame) {
    pause();
  }

  return (
    <>
      <span>{minutes}</span>:<span>{seconds}</span>
    </>
  );
}
