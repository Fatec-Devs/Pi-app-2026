import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ServiceOrder } from '@types/index';
import { StatusBadge } from './StatusBadge';

interface ServiceOrderCardProps {
  order: ServiceOrder;
  onPress?: () => void;
}

export const ServiceOrderCard: React.FC<ServiceOrderCardProps> = ({
  order,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>OS #{order.id.slice(-4)}</Text>
        <StatusBadge status={order.status} />
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Serviços:</Text>
          <Text style={styles.value}>{order.services.length}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Valor Total:</Text>
          <Text style={styles.valueHighlight}>
            R$ {order.totalCost.toFixed(2)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>
            {new Date(order.createdAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666666',
  },
  value: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  valueHighlight: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '700',
  },
});
