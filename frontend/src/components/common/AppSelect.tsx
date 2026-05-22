import React from 'react';
import { View, Picker, StyleSheet, Text, ViewStyle } from 'react-native';

interface AppSelectProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  error?: string;
  style?: ViewStyle;
}

export const AppSelect: React.FC<AppSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  error,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.pickerContainer, error && styles.pickerError]}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma opção" value="" />
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  pickerError: {
    borderColor: '#FF3B30',
  },
  picker: {
    height: 44,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});
