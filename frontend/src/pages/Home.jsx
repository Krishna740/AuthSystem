import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px)',
    textAlign: 'center',
    padding: '2rem',
    background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.08) 0%, transparent 70%)',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    marginBottom: '0.75rem',
    background: 'linear-gradient(135deg, #e8e8f0 0%, #6c63ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
    maxWidth: '480px',
    lineHeight: 1.7,
    marginBottom: '2rem',
  },
  actions: { display: 'flex', gap: '1rem' },
  btnPrimary: {
    padding: '0.75rem 2rem',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  btnSecondary: {
    padding: '0.75rem 2rem',
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
};

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={styles.section}>
      <h1 style={styles.title}>Authentication System</h1>
      <p style={styles.subtitle}>
        A secure full-stack authentication system built with JWT refresh tokens,
        bcrypt password hashing, and MongoDB.
      </p>
      {user ? (
        <Link to="/dashboard" style={styles.btnPrimary}>Go to Dashboard</Link>
      ) : (
        <div style={styles.actions}>
          <Link to="/login" style={styles.btnPrimary}>Log In</Link>
          <Link to="/signup" style={styles.btnSecondary}>Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
