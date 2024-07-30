interface TimerDisplay {
  time: string;
}

const TimerDisplay: React.FC<TimerDisplay> = ({ time }) => {
  return <div className="timer-display">{time}</div>;
};

export default TimerDisplay;
