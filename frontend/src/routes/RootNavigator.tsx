import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '@contexts/AuthContext';

// Screens
import { LoginScreen } from '@screens/auth/LoginScreen';
import { ClientHomeScreen } from '@screens/client/HomeScreen';
import { AdminDashboardScreen } from '@screens/admin/DashboardScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Client Navigator
const ClientNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999999',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="ClientHome"
        component={ClientHomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      {/* Add more client tabs here */}
    </Tab.Navigator>
  );
};

// Admin Navigator
const AdminNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#333333',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={AdminDashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      {/* Add more admin screens here */}
    </Stack.Navigator>
  );
};

// Auth Stack
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

// Root Navigator
export const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    // Show splash screen or loading indicator
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        ) : user?.role === 'ADMIN' ? (
          <Stack.Screen
            name="AdminApp"
            component={AdminNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="ClientApp"
            component={ClientNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
