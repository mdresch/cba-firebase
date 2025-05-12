import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { useAuth } from '../context/AuthContext';

const useRequireAuth = (): void => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until loading is false before checking currentUser
    if (!loading && !currentUser) {
      // Redirect to login page if not authenticated
      router.push('/auth/login');
    }
  }, [currentUser, loading, router]); // Include router in the dependency array
};

export default useRequireAuth;