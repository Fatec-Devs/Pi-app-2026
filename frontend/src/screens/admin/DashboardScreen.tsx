import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { ServiceOrderCard } from '@components/cards/ServiceOrderCard';
import { EmptyState } from '@components/common/EmptyState';
import { LoadingOverlay } from '@components/common/LoadingOverlay';
import { MoneyText } from '@components/common/MoneyText';
import { AppButton } from '@components/common/AppButton';
import { mockServiceOrders, mockFinancialEntries } from '@services/mockData';
import { ServiceOrder, FinancialEntry } from '@types/index';

export const AdminDashboardScreen: React.FC = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [financialData, setFinancialData] = useState<{
    income: number;
    expense: number;
    balance: number;
  }>({ income: 0, expense: 0, balance: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load service orders
        setServiceOrders(mockServiceOrders);

        // Calculate financial summary
        const income = mockFinancialEntries
          .filter((entry) => entry.type === 'INCOME')
          .reduce((sum, entry) => sum + entry.amount, 0);

        const expense = mockFinancialEntries
          .filter((entry) => entry.type === 'EXPENSE')
          .reduce((sum, entry) => sum + entry.amount, 0);

        setFinancialData({
          income,
          expense,
          balance: income - expense,
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const pendingOrders = serviceOrders.filter(
    (order) => order.status === 'ORCAMENTO' || order.status === 'APROVADO'
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard Admin</Text>
        </View>

        {isLoading ? (
          <LoadingOverlay visible={isLoading} />
        ) : (
          <>
            {/* Financial Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Resumo Financeiro</Text>

              <View style={styles.financialGrid}>
                <View style={styles.financialCard}>
                  <Text style={styles.financialLabel}>Receita</Text>
                  <MoneyText value={financialData.income} size="large" />
                </View>

                <View style={styles.financialCard}>
                  <Text style={styles.financialLabel}>Despesa</Text>
                  <Text style={styles.expenseValue}>
                    R$ {financialData.expense.toFixed(2)}
                  </Text>
                </View>

                <View style={[styles.financialCard, styles.balanceCard]}>
                  <Text style={styles.financialLabel}>Saldo</Text>
                  <MoneyText value={financialData.balance} size="large" />
                </View>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ações Rápidas</Text>
              <View style={styles.actionButtons}>
                <AppButton
                  label="Novo Cliente"
                  onPress={() => console.log('New client')}
                  variant="primary"
                />
                <AppButton
                  label="Nova O.S."
                  onPress={() => console.log('New OS')}
                  variant="primary"
                />
                <AppButton
                  label="Estoque"
                  onPress={() => console.log('Inventory')}
                  variant="secondary"
                />
              </View>
            </View>

            {/* Pending Orders */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Ordens Pendentes ({pendingOrders.length})
              </Text>

              {pendingOrders.length === 0 ? (
                <EmptyState
                  title="Tudo atualizado"
                  message="Não há ordens pendentes"
                />
              ) : (
                <FlatList
                  data={pendingOrders}
                  renderItem={({ item }) => (
                    <ServiceOrderCard order={item} />
                  )}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              )}
            </View>
          </>
        )}
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
    backgroundColor: '#333333',
    paddingVertical: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
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
  financialGrid: {
    gap: 12,
  },
  financialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  balanceCard: {
    backgroundColor: '#E8F5E9',
  },
  financialLabel: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '600',
    marginBottom: 8,
  },
  expenseValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF3B30',
  },
  actionButtons: {
    gap: 8,
  },
});
