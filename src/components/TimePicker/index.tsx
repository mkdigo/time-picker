import { useEffect, useState } from 'react';

import { useTimePickerContext } from '../../hooks/useTimePickerContext';

import styles from './styles.module.css';

type Props = {
  name: string;
  currentTime: string;
  onChange: (time: string) => void;
};

type TPeriod = 'am' | 'pm';

export function TimePicker({ name, currentTime, onChange }: Props) {
  const { currentTimePicker, handleCloseTimePicker } = useTimePickerContext();

  const [hours, setHours] = useState<number[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState<TPeriod>('am');
  const [currentHour, setCurrentHour] = useState<number>(12);
  const [currentMinute, setCurrentMinute] = useState<number>(0);

  function amHoursGenerate(): number[] {
    const hours: number[] = [];
    for (let n = 1; n <= 12; n++) {
      hours.push(n);
    }
    return hours;
  }

  function pmHoursGenerate(): number[] {
    const hours: number[] = [];
    for (let n = 13; n <= 24; n++) {
      hours.push(n === 24 ? 0 : n);
    }
    return hours;
  }

  function minutesGenerate(multiple: number = 5): number[] {
    const minutes: number[] = [];
    const maxLength = Math.floor(60 / multiple);

    for (let n = 0; n < maxLength; n++) {
      minutes.push(n * multiple);
    }

    return minutes;
  }

  // press ESC to close
  useEffect(() => {
    if (currentTimePicker !== name) return;

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') handleCloseTimePicker();
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentTimePicker]);

  // validate currentTime
  useEffect(() => {
    const regex = /\d{2}:\d{2}/g;
    let period: TPeriod = 'am';

    if (regex.test(currentTime) && currentTime.length === 5) {
      let [h, m] = currentTime.split(':');
      const hour = Number(h);
      const minute = Number(m);
      setCurrentHour(hour < 24 ? hour : 12);
      setCurrentMinute(minute);

      if ((hour > 12 && hour < 24) || hour === 0) period = 'pm';
    } else {
      setCurrentHour(12);
      setCurrentMinute(0);
    }

    setCurrentPeriod(period);
    setHours(period === 'am' ? amHoursGenerate() : pmHoursGenerate());
    setMinutes(minutesGenerate());
  }, [currentTime]);

  function handleChangeCurrentTime(hour: number, minute: number) {
    setCurrentHour(hour);
    setCurrentMinute(minute);
    onChange(
      `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`
    );
  }

  function handleChangePeriod(period: TPeriod) {
    if (period === currentPeriod) return;

    let updatedCurrentHour = 0;

    if (period === 'am') {
      setHours(amHoursGenerate());
      updatedCurrentHour = currentHour === 0 ? 12 : currentHour - 12;
    }

    if (period === 'pm') {
      setHours(pmHoursGenerate());
      updatedCurrentHour = currentHour === 12 ? 0 : currentHour + 12;
    }

    setCurrentPeriod(period);
    handleChangeCurrentTime(updatedCurrentHour, currentMinute);
  }

  if (currentTimePicker !== name) return null;

  return (
    <div className={styles.clockContainer} onClick={handleCloseTimePicker}>
      <div className={styles.clock} onClick={(e) => e.stopPropagation()}>
        <div className={styles.minutes}>
          <span
            className={styles.minutePin}
            style={{ ['--currentMinute' as any]: currentMinute / 5 }}
          ></span>
          <div className={styles.markers}>
            {minutesGenerate(1).map((minute) => (
              <span
                key={`marker-${minute}`}
                style={{ ['--minute' as any]: minute }}
              ></span>
            ))}
          </div>
          {minutes.map((minute, i) => (
            <div
              className={styles.minute}
              style={{ ['--minute' as any]: i }}
              key={`minute-${minute}`}
            >
              <button
                type='button'
                className={`${currentMinute === minute ? styles.selected : ''}`}
                onClick={() => handleChangeCurrentTime(currentHour, minute)}
              >
                {minute.toString().padStart(2, '0')}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.hours}>
          <span
            className={styles.hourPin}
            style={{
              ['--currentHour' as any]:
                currentHour <= 12 ? currentHour : currentHour - 12,
            }}
          ></span>
          {hours.map((hour, i) => (
            <div
              className={styles.hour}
              style={{ ['--hour' as any]: i + 1 }}
              key={`hour-${hour}`}
            >
              <button
                type='button'
                className={`${currentHour === hour ? styles.selected : ''}`}
                onClick={() => handleChangeCurrentTime(hour, currentMinute)}
              >
                {hour}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.center}></div>
      </div>

      <div className={styles.period} onClick={(e) => e.stopPropagation()}>
        <button
          type='button'
          className={`${currentPeriod === 'am' ? styles.selected : ''}`}
          onClick={() => handleChangePeriod('am')}
        >
          AM
        </button>
        <button
          type='button'
          className={`${currentPeriod === 'pm' ? styles.selected : ''}`}
          onClick={() => handleChangePeriod('pm')}
        >
          PM
        </button>
      </div>
    </div>
  );
}
