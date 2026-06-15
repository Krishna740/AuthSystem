import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const s = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px)',
    padding: '2rem',
    background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.06) 0%, transparent 70%)',
  },
  card: {
    background: 'var(--bg-card)',
    padding: '2.5rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid var(--border)',
  },
  title: { textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 700 },
  subtitle: { textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    marginBottom: '1.2rem',
  },
  btn: {
    width: '100%',
    padding: '0.75rem',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  error: {
    background: 'rgba(255,71,87,0.1)',
    border: '1px solid rgba(255,71,87,0.3)',
    color: 'var(--error)',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.85rem',
    textAlign: 'center',
  },
  footer: { textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' },
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <h2 style={s.title}>Welcome back</h2>
        <p style={s.subtitle}>Enter your credentials to access your account</p>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Email</label>
          <input
            style={s.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
          <label style={s.label}>Password</label>
          <input
            style={s.input}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
          <button type="submit" style={s.btn} disabled={submitting}>
            {submitting ? 'Signing in...' : 'Log In'}
          </button>
        </form>
        <p style={s.footer}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
