import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ServiceOrderStatus } from '@types/index';

interface StatusBadgeProps {
  status: ServiceOrderStatus | string;
}

const statusConfig = {
  ORCAMENTO: { color: '#9E9E9E', label: 'Orçamento' },
  APROVADO: { color: '#2196F3', label: 'Aprovado' },
  EM_EXECUCAO: { color: '#FF9800', label: 'Em Execução' },
  CONCLUIDO: { color: '#4CAF50', label: 'Concluído' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    color: '#999999',
    label: status,
  };

  return (
    <View style={[styles.badge, { backgroundColor: config.color }]}>
      <Text style={styles.badgeText}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
