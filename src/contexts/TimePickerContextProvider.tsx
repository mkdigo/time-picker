import { createContext, useState } from 'react';

type TTimePickerName = string | null;

export interface ITimePickerContext {
  currentTimePicker: TTimePickerName;
  handleOpenTimePicker: (name: TTimePickerName) => void;
  handleCloseTimePicker: () => void;
}

export const TimePickerContext = createContext<ITimePickerContext>({} as any);

type Props = {
  children: JSX.Element;
};

export function TimePickerContextProvider({ children }: Props) {
  const [currentTimePicker, setCurrentTimePicker] =
    useState<TTimePickerName>(null);

  function handleOpenTimePicker(name: TTimePickerName): void {
    setCurrentTimePicker(name);
  }

  function handleCloseTimePicker(): void {
    setCurrentTimePicker(null);
  }

  return (
    <TimePickerContext.Provider
      value={{
        currentTimePicker,
        handleOpenTimePicker,
        handleCloseTimePicker,
      }}
    >
      {children}
    </TimePickerContext.Provider>
  );
}
