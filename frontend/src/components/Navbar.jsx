import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'rgba(18, 18, 42, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: 'var(--text-primary)',
    fontWeight: 700,
    fontSize: '1.3rem',
    textDecoration: 'none',
  },
  accent: { color: 'var(--accent)' },
  right: { display: 'flex', alignItems: 'center', gap: '1rem' },
  userName: { color: 'var(--text-secondary)', fontSize: '0.9rem' },
  btn: {
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.85rem',
    background: 'var(--accent)',
    color: '#fff',
  },
  link: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
};

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Auth<span style={styles.accent}>System</span>
      </Link>
      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.userName}>{user.name}</span>
            <button style={styles.btn} onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
