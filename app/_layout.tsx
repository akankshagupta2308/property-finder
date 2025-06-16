import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useUserStore } from './store/useUserStore';

const queryClient = new QueryClient();

export default function RootLayout() {

  const { fetchUserData } = useUserStore();

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="PropertyDetailsScreen" />
      </Stack>
    </QueryClientProvider>
  );
}