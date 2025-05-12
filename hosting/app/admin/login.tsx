import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext'; // Assuming AuthContext is in the correct relative path
import { useRouter } from 'next/router'; // Using next/router as it's a pages directory component

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { signInWithGoogle } = useAuth(); // Using signInWithGoogle from AuthContext
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Assuming a login function exists in AuthContext that takes email and password
      // await login(email, password);
      // Replace with appropriate login logic if not using email/password
      console.log('Login with email:', email, 'password:', password);
      // Redirect or perform action on successful login
      router.push('/admin'); // Redirect to admin page on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push('/admin'); // Redirect on successful Google login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Login</button>
      </form>
      <button onClick={handleGoogleLogin} disabled={loading}>Sign in with Google</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;