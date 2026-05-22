import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { ServiceOrderCard } from '@components/cards/ServiceOrderCard';
import { EmptyState } from '@components/common/EmptyState';
import { LoadingOverlay } from '@components/common/LoadingOverlay';
import { MoneyText } from '@components/common/MoneyText';
import { mockServiceOrders, mockClients } from '@services/mockData';
import { ServiceOrder } from '@types/index';

export const ClientHomeScreen: React.FC = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // In real app, would fetch based on authenticated user
        // For now, use mock data from first client
        const client = mockClients[0];
        setClientName(client.userId);

        const orders = mockServiceOrders.filter(
          (order) => order.clientId === client.id
        );
        setServiceOrders(orders);
      } catch (error) {
        console.error('Error loading service orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const totalSpent = serviceOrders.reduce(
    (sum, order) => sum + order.totalCost,
    0
  );
  const completedOrders = serviceOrders.filter(
    (order) => order.status === 'CONCLUIDO'
  ).length;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Summary Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Bem-vindo</Text>
          <Text style={styles.clientName}>{clientName}</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Ordens Concluídas</Text>
            <Text style={styles.summaryValue}>{completedOrders}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Gasto</Text>
            <MoneyText value={totalSpent} size="large" />
          </View>
        </View>

        {/* Service Orders List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minhas Ordens de Serviço</Text>

          {isLoading ? (
            <LoadingOverlay visible={isLoading} />
          ) : serviceOrders.length === 0 ? (
            <EmptyState
              title="Sem ordens de serviço"
              message="Você ainda não possui ordens de serviço criadas"
            />
          ) : (
            <FlatList
              data={serviceOrders}
              renderItem={({ item }) => (
                <ServiceOrderCard order={item} />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  greeting: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  clientName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  summaryContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
  },
});
