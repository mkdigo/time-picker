import { useContext } from 'react';
import {
  ITimePickerContext,
  TimePickerContext,
} from '../contexts/TimePickerContextProvider';

export function useTimePickerContext(): ITimePickerContext {
  return useContext(TimePickerContext);
}
