import "./Timer.css";

import LapList from "./LapList";
import TimerControls from "./TimerControls";
import TimerDisplay from "./TimerDisplay";
import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [miliseconds, setMilliseconds] = useState(0);
  const [timerOn, setTimeOn] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);

  function formatTime() {
    const minutes = ("0" + (Math.floor(miliseconds / 60000) % 60)).slice(-2);
    const seconds = ("0" + (Math.floor(miliseconds / 1000) % 60)).slice(-2);
    const centiseconds = ("0" + (Math.floor(miliseconds / 10) % 100)).slice(-2);

    return `${minutes}:${seconds}:${centiseconds}`;
  }

  function resetTimer() {
    setMilliseconds(0);
    setTimeOn(false);
    setLaps([]);
  }

  function startTimer() {
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
      }, 10);
    }
  }
  function stopTimer(interval: number | null) {
    if (interval !== null) {
      clearInterval(interval);
    }
  }

  function addLap() {
    setLaps([...laps, formatTime()]);
    console.log(laps);
  }

  useEffect(() => {
    if (timerOn) {
      startTimer();
    } else {
      stopTimer(intervalRef.current);
      intervalRef.current = null;
    }
    return () => stopTimer(intervalRef.current);
  }, [timerOn]);

  return (
    <div className="timer-container">
      <TimerDisplay time={formatTime()} />
      <TimerControls
        timerOn={timerOn}
        onReset={resetTimer}
        onLap={addLap}
        onStart={() => setTimeOn(true)}
        onStop={() => setTimeOn(false)}
      />
      <LapList laps={laps} />
    </div>
  );
};
export default Timer;
