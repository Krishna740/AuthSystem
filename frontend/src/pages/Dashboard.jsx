import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

const s = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 'calc(100vh - 64px)',
    padding: '2rem',
    background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.06) 0%, transparent 70%)',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  card: {
    background: 'var(--bg-card)',
    padding: '2.5rem',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '480px',
    border: '1px solid var(--border)',
  },
  title: { textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 700 },
  avatar: {
    width: '64px', height: '64px', borderRadius: '50%',
    background: 'var(--accent)', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '1.5rem', fontWeight: 700,
    margin: '0 auto 1.5rem', color: '#fff',
  },
  row: {
    display: 'flex', justifyContent: 'space-between',
    padding: '1rem 0', borderBottom: '1px solid var(--border)',
    fontSize: '0.9rem',
  },
  label: { color: 'var(--text-secondary)' },
  value: { color: 'var(--text-primary)', fontWeight: 500 },
  badge: {
    display: 'inline-block', padding: '0.25rem 0.75rem',
    borderRadius: '20px', background: 'rgba(46,213,115,0.15)',
    color: 'var(--success)', fontSize: '0.8rem', fontWeight: 500,
  },
  label2: { display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' },
  input: {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
    border: '1px solid var(--border)', background: 'var(--bg-input)',
    color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none',
    boxSizing: 'border-box', marginBottom: '1.2rem',
  },
  btn: {
    width: '100%', padding: '0.75rem', background: 'var(--accent)',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
  },
  btnSmall: {
    padding: '0.4rem 1rem', background: 'var(--accent)',
    color: '#fff', border: 'none', borderRadius: '6px',
    fontWeight: 500, fontSize: '0.8rem', cursor: 'pointer', marginTop: '1rem',
  },
  error: {
    background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)',
    color: 'var(--error)', padding: '0.6rem 1rem', borderRadius: '8px',
    marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center',
  },
  success: {
    background: 'rgba(46,213,115,0.1)', border: '1px solid rgba(46,213,115,0.3)',
    color: 'var(--success)', padding: '0.6rem 1rem', borderRadius: '8px',
    marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center',
  },
  tabs: {
    display: 'flex', gap: '0.5rem', marginBottom: '2rem',
    justifyContent: 'center',
  },
  tab: {
    padding: '0.5rem 1.2rem', borderRadius: '8px', border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer',
    fontWeight: 500, fontSize: '0.85rem',
  },
  tabActive: {
    padding: '0.5rem 1.2rem', borderRadius: '8px', border: '1px solid var(--accent)',
    background: 'rgba(108,99,255,0.15)', color: 'var(--accent)', cursor: 'pointer',
    fontWeight: 500, fontSize: '0.85rem',
  },
};

const Dashboard = () => {
  const { user, fetchProfile } = useAuth();
  const [tab, setTab] = useState('view');

  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleProfileChange = (e) =>
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const updateProfile = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    setLoading(true);
    try {
      const { data } = await api.patch('/auth/profile', profileForm);
      setMsg({ type: 'success', text: 'Profile updated' });
      if (fetchProfile) fetchProfile();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    setLoading(true);
    try {
      await api.put('/auth/password', passwordForm);
      setMsg({ type: 'success', text: 'Password changed' });
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed' });
    } finally {
      setLoading(false);
    }
  };

  const tabStyle = (t) => t === tab ? s.tabActive : s.tab;

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <div style={s.avatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 style={s.title}>Profile Dashboard</h2>

        <div style={s.tabs}>
          <button style={tabStyle('view')} onClick={() => { setTab('view'); setMsg({ type: '', text: '' }); }}>View</button>
          <button style={tabStyle('edit')} onClick={() => { setTab('edit'); setMsg({ type: '', text: '' }); setProfileForm({ name: user?.name, email: user?.email }); }}>Edit</button>
          <button style={tabStyle('password')} onClick={() => { setTab('password'); setMsg({ type: '', text: '' }); }}>Password</button>
        </div>

        {msg.text && (
          <div style={msg.type === 'error' ? s.error : s.success}>{msg.text}</div>
        )}

        {tab === 'view' && user && (
          <div>
            <div style={s.row}>
              <span style={s.label}>Name</span>
              <span style={s.value}>{user.name}</span>
            </div>
            <div style={s.row}>
              <span style={s.label}>Email</span>
              <span style={s.value}>{user.email}</span>
            </div>
            <div style={s.row}>
              <span style={s.label}>Joined</span>
              <span style={s.value}>
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
            <div style={s.row}>
              <span style={s.label}>Status</span>
              <span style={s.badge}>Active</span>
            </div>
          </div>
        )}

        {tab === 'edit' && (
          <form onSubmit={updateProfile}>
            <label style={s.label2}>Name</label>
            <input
              style={s.input}
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              required
              minLength={2}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <label style={s.label2}>Email</label>
            <input
              style={s.input}
              name="email"
              type="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              required
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <button type="submit" style={s.btn} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}

        {tab === 'password' && (
          <form onSubmit={changePassword}>
            <label style={s.label2}>Current Password</label>
            <input
              style={s.input}
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              required
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <label style={s.label2}>New Password</label>
            <input
              style={s.input}
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
              minLength={8}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <button type="submit" style={s.btn} disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
