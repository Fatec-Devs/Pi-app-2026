import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { AppInput } from '@components/common/AppInput';
import { AppButton } from '@components/common/AppButton';
import { useAuth } from '@contexts/AuthContext';
import { mockUsers } from '@services/mockData';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setIsLoading(true);
      // Mock login validation
      const user = Object.values(mockUsers).find((u) => u.email === email);
      if (!user) {
        Alert.alert('Erro', 'Usuário ou senha inválidos');
        return;
      }

      // Call actual login API
      await login({ email, password });
      Alert.alert('Sucesso', 'Login realizado com sucesso');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao fazer login';
      Alert.alert('Erro', message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (userEmail: string) => {
    try {
      setIsLoading(true);
      await login({ email: userEmail, password: 'demo' });
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Oficina Automotiva</Text>
        <Text style={styles.subtitle}>Sistema de Gestão</Text>

        <View style={styles.formContainer}>
          <AppInput
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!isLoading}
          />

          <AppInput
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <AppButton
            label={isLoading ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Usuários de Demonstração</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.demoContainer}>
          <AppButton
            label="Admin: admin@workshop.com"
            onPress={() => handleDemoLogin('admin@workshop.com')}
            variant="secondary"
            disabled={isLoading}
          />

          <AppButton
            label="Cliente: joao@email.com"
            onPress={() => handleDemoLogin('joao@email.com')}
            variant="secondary"
            disabled={isLoading}
          />

          <AppButton
            label="Cliente: maria@email.com"
            onPress={() => handleDemoLogin('maria@email.com')}
            variant="secondary"
            disabled={isLoading}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Use qualquer senha para os usuários de demonstração
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999999',
    fontSize: 12,
    fontWeight: '600',
  },
  demoContainer: {
    gap: 8,
    marginBottom: 24,
  },
  info: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#1976D2',
    textAlign: 'center',
  },
});
