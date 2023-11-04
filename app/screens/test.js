import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';

const TimeSelector = () => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [ampm, setAMPM] = useState('AM');

  // Generate time options
  const hoursArray = Array.from({ length: 12 }, (_, i) => (i < 9 ? '0' + (i + 1) : '' + (i + 1)));
  const minutesArray = Array.from({ length: 60 }, (_, i) => (i < 10 ? '0' + i : '' + i));
  const ampmArray = ['AM', 'PM'];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          style={{ width: 100 }}
          selectedValue={hours}
          onValueChange={(itemValue) => setHours(itemValue)}
        >
          {hoursArray.map((hour) => (
            <Picker.Item key={hour} label={hour} value={hour} />
          ))}
        </Picker>
        <Text style={{ fontSize: 20 }}>:</Text>
        <Picker
          style={{ width: 100 }}
          selectedValue={minutes}
          onValueChange={(itemValue) => setMinutes(itemValue)}
        >
          {minutesArray.map((minute) => (
            <Picker.Item key={minute} label={minute} value={minute} />
          ))}
        </Picker>
        <Picker
          style={{ width: 100 }}
          selectedValue={ampm}
          onValueChange={(itemValue) => setAMPM(itemValue)}
        >
          {ampmArray.map((period) => (
            <Picker.Item key={period} label={period} value={period} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default TimeSelector;