import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface MoneyTextProps {
  value: number;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
}

export const MoneyText: React.FC<MoneyTextProps> = ({
  value,
  style,
  size = 'medium',
}) => {
  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <Text style={[sizeStyles[size], style]}>
      R$ {value.toFixed(2)}
    </Text>
  );
};

const styles = StyleSheet.create({
  small: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  medium: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  large: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
});
