# Time Picker React Component

![alt text](https://github.com/mkdigo/time-picker/blob/main/example.png?raw=true)

## How to install

```
npm install @mkdigo/time-picker
```

## How to use

In your **App.tsx** file, wrap your components with the TimePickerContextProvider:

```
import { TimePickerContextProvider } from '@mkdigo/time-picker';

import { Home } from './Home';

function App() {
  return (
    <TimePickerContextProvider>
      <HomePage />
    </TimePickerContextProvider>
  );
}

export default App;
```

The TimePicker component works like a modal, than you can put it in anywhere. To open the TimePicker, use the handleOpenTimePicker function that you can get it on useTimePickerContext hook. The handleOpenTimePicker recive a name paramater and it should be equal than name that you give to TimePicker's attribute.

```
import { useState } from 'react';
import { TimePicker, useTimePickerContext } from '@mkdigo/time-picker';

export function Home() {
  const { handleOpenTimePicker } = useTimePickerContext();
  const [currentTime, setCurrentTime] = useState('10:45');

  function handleChange(time: string): void {
    setCurrentTime(time);
  }

  return (
    <main>
      <input
        type='time'
        value={currentTime}
        onChange={(e) => setCurrentTime(e.target.value)}
      />
      <button
        type='button'
        onClick={() => handleOpenTimePicker('timeInput')}
      >
        Time Picker
      </button>
      <TimePicker
        currentTime={currentTime}
        name='timeInput'
        onChange={handleChange}
      />
    </main>
  );
}
```

### Repository

[https://github.com/mkdigo/time-picker](https://github.com/mkdigo/time-picker)
