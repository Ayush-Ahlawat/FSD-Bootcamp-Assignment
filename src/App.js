import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid
} from 'recharts';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Computer Science', 'Economics'];
const COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#f97316', '#14b8a6'];

const getDayName = (dateStr) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[new Date(dateStr).getDay()];
};

const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

const getProductivityScore = (minutes) => {
  if (minutes >= 300) return { score: 'Excellent', color: '#10b981', emoji: '🔥' };
  if (minutes >= 180) return { score: 'Good', color: '#6366f1', emoji: '✅' };
  if (minutes >= 60) return { score: 'Average', color: '#f59e0b', emoji: '📚' };
  return { score: 'Low', color: '#ef4444', emoji: '💤' };
};

const SAMPLE_SESSIONS = [
  { id: 1, subject: 'Mathematics', date: new Date(Date.now() - 86400000 * 0).toISOString().split('T')[0], startTime: '09:00', endTime: '11:00', notes: 'Calculus chapter 5', duration: 120 },
  { id: 2, subject: 'Physics', date: new Date(Date.now() - 86400000 * 0).toISOString().split('T')[0], startTime: '14:00', endTime: '15:30', notes: 'Optics revision', duration: 90 },
  { id: 3, subject: 'English', date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0], startTime: '10:00', endTime: '11:30', notes: 'Essay writing practice', duration: 90 },
  { id: 4, subject: 'Chemistry', date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0], startTime: '15:00', endTime: '17:00', notes: 'Organic chemistry', duration: 120 },
  { id: 5, subject: 'Computer Science', date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], startTime: '09:00', endTime: '12:00', notes: 'Data structures', duration: 180 },
  { id: 6, subject: 'History', date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0], startTime: '11:00', endTime: '12:00', notes: 'Modern India', duration: 60 },
  { id: 7, subject: 'Biology', date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0], startTime: '08:00', endTime: '10:30', notes: 'Cell biology', duration: 150 },
  { id: 8, subject: 'Economics', date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0], startTime: '14:00', endTime: '16:00', notes: 'Macroeconomics', duration: 120 },
  { id: 9, subject: 'Mathematics', date: new Date(Date.now() - 86400000 * 6).toISOString().split('T')[0], startTime: '09:00', endTime: '10:30', notes: 'Statistics', duration: 90 },
];

export default function App() {
  const [sessions, setSessions] = useState(SAMPLE_SESSIONS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [form, setForm] = useState({ subject: 'Mathematics', date: new Date().toISOString().split('T')[0], startTime: '09:00', endTime: '10:00', notes: '' });
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const stats = useMemo(() => {
    const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
    const todayStr = new Date().toISOString().split('T')[0];
    const todayMinutes = sessions.filter(s => s.date === todayStr).reduce((sum, s) => sum + s.duration, 0);
    const subjectMap = {};
    sessions.forEach(s => {
      subjectMap[s.subject] = (subjectMap[s.subject] || 0) + s.duration;
    });
    const subjectData = Object.entries(subjectMap).map(([name, mins]) => ({ name, minutes: mins, hours: +(mins / 60).toFixed(1) })).sort((a, b) => b.minutes - a.minutes);

    const weekData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - 86400000 * i).toISOString().split('T')[0];
      const mins = sessions.filter(s => s.date === d).reduce((sum, s) => sum + s.duration, 0);
      weekData.push({ day: getDayName(d), minutes: mins, hours: +(mins / 60).toFixed(1) });
    }

    const pieData = subjectData.map((s, i) => ({ ...s, color: COLORS[i % COLORS.length] }));
    return { totalMinutes, todayMinutes, subjectData, weekData, pieData, sessionCount: sessions.length };
  }, [sessions]);

  const handleAddSession = () => {
    setFormError('');
    if (!form.subject || !form.date || !form.startTime || !form.endTime) {
      setFormError('Please fill in all required fields.'); return;
    }
    const start = form.startTime.split(':').map(Number);
    const end = form.endTime.split(':').map(Number);
    const duration = (end[0] * 60 + end[1]) - (start[0] * 60 + start[1]);
    if (duration <= 0) { setFormError('End time must be after start time.'); return; }
    const newSession = { id: Date.now(), ...form, duration };
    setSessions(prev => [newSession, ...prev]);
    setForm({ subject: 'Mathematics', date: new Date().toISOString().split('T')[0], startTime: '09:00', endTime: '10:00', notes: '' });
    setSuccessMsg('Session added successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
    setActiveTab('dashboard');
  };

  const handleDelete = (id) => setSessions(prev => prev.filter(s => s.id !== id));

  const productivity = getProductivityScore(stats.todayMinutes);

  const styles = {
    app: { minHeight: '100vh', background: '#f8fafc', fontFamily: "'Segoe UI', sans-serif", color: '#1e293b' },
    header: { background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    headerTitle: { margin: 0, fontSize: 22, fontWeight: 700 },
    headerSub: { margin: '4px 0 0', fontSize: 13, opacity: 0.85 },
    nav: { display: 'flex', background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 24px', gap: 4 },
    navBtn: (active) => ({ padding: '14px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 400, color: active ? '#6366f1' : '#64748b', borderBottom: active ? '2px solid #6366f1' : '2px solid transparent', transition: 'all 0.2s' }),
    main: { padding: '24px', maxWidth: 1100, margin: '0 auto' },
    grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 },
    card: { background: 'white', borderRadius: 12, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' },
    statLabel: { fontSize: 12, color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 },
    statValue: { fontSize: 28, fontWeight: 700, margin: '8px 0 4px', color: '#1e293b' },
    statSub: { fontSize: 13, color: '#64748b' },
    grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16, marginBottom: 24 },
    chartTitle: { fontSize: 15, fontWeight: 600, marginBottom: 16, color: '#1e293b' },
    badge: (color) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 20, background: color + '20', color: color, fontSize: 12, fontWeight: 600 }),
    formGroup: { marginBottom: 16 },
    label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 },
    input: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'white' },
    select: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'white' },
    btn: { padding: '11px 24px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    errorBox: { padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', fontSize: 13, marginBottom: 14 },
    successBox: { padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, color: '#16a34a', fontSize: 13, marginBottom: 14 },
    sessionItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid #f1f5f9' },
    delBtn: { padding: '5px 12px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, fontSize: 12, cursor: 'pointer' },
    insightCard: { background: 'linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)', border: '1px solid #c4b5fd', borderRadius: 12, padding: '20px', marginBottom: 16 },
    prodBadge: { display: 'inline-block', padding: '6px 16px', borderRadius: 20, color: 'white', fontWeight: 700, fontSize: 13 },
  };

  const renderDashboard = () => (
    <div>
      <div style={styles.grid4}>
        <div style={styles.card}>
          <div style={styles.statLabel}>Today's Study Time</div>
          <div style={styles.statValue}>{formatTime(stats.todayMinutes)}</div>
          <span style={styles.badge(productivity.color)}>{productivity.emoji} {productivity.score}</span>
        </div>
        <div style={styles.card}>
          <div style={styles.statLabel}>Total Study Time</div>
          <div style={styles.statValue}>{formatTime(stats.totalMinutes)}</div>
          <div style={styles.statSub}>across all sessions</div>
        </div>
        <div style={styles.card}>
          <div style={styles.statLabel}>Total Sessions</div>
          <div style={styles.statValue}>{stats.sessionCount}</div>
          <div style={styles.statSub}>sessions recorded</div>
        </div>
        <div style={styles.card}>
          <div style={styles.statLabel}>Avg Daily Study</div>
          <div style={styles.statValue}>{formatTime(Math.round(stats.weekData.reduce((s, d) => s + d.minutes, 0) / 7))}</div>
          <div style={styles.statSub}>this week</div>
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.card}>
          <div style={styles.chartTitle}>📅 Weekly Study Hours</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`${v} hrs`, 'Study Time']} />
              <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.card}>
          <div style={styles.chartTitle}>📊 Subject Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats.pieData} cx="50%" cy="50%" outerRadius={80} dataKey="minutes" nameKey="name" label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {stats.pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [formatTime(v), 'Study Time']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.chartTitle}>📈 Weekly Study Trend</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={stats.weekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => [`${v} hrs`, 'Study Time']} />
            <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAddSession = () => (
    <div style={{ ...styles.card, maxWidth: 540 }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#1e293b' }}>➕ Add New Study Session</div>
      {formError && <div style={styles.errorBox}>⚠️ {formError}</div>}
      {successMsg && <div style={styles.successBox}>✅ {successMsg}</div>}
      <div style={styles.formGroup}>
        <label style={styles.label}>Subject *</label>
        <select style={styles.select} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Date *</label>
        <input style={styles.input} type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={styles.label}>Start Time *</label>
          <input style={styles.input} type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} />
        </div>
        <div>
          <label style={styles.label}>End Time *</label>
          <input style={styles.input} type="time" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} />
        </div>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Notes (optional)</label>
        <input style={styles.input} type="text" placeholder="What did you study?" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
      </div>
      <button style={styles.btn} onClick={handleAddSession}>Add Session</button>
    </div>
  );

  const renderHistory = () => (
    <div style={styles.card}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>📋 Session History</div>
      {sessions.length === 0 && <div style={{ color: '#64748b', textAlign: 'center', padding: 40 }}>No sessions yet. Add your first session!</div>}
      {sessions.sort((a, b) => b.date.localeCompare(a.date)).map(s => (
        <div key={s.id} style={styles.sessionItem}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{s.subject}</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>{s.date} · {s.startTime} – {s.endTime}</div>
            {s.notes && <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>📝 {s.notes}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontWeight: 700, color: '#6366f1', fontSize: 15 }}>{formatTime(s.duration)}</span>
            <button style={styles.delBtn} onClick={() => handleDelete(s.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSubjects = () => (
    <div>
      <div style={styles.grid2}>
        {stats.subjectData.map((s, i) => (
          <div key={s.name} style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
              <span style={{ ...styles.badge(COLORS[i % COLORS.length]), fontSize: 13 }}>#{i + 1}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS[i % COLORS.length], marginBottom: 6 }}>{formatTime(s.minutes)}</div>
            <div style={{ background: '#f1f5f9', borderRadius: 6, height: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: COLORS[i % COLORS.length], width: `${(s.minutes / stats.subjectData[0].minutes) * 100}%`, borderRadius: 6, transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
              {sessions.filter(x => x.subject === s.name).length} sessions
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => {
    const topSubject = stats.subjectData[0];
    const leastSubject = stats.subjectData[stats.subjectData.length - 1];
    const bestDay = [...stats.weekData].sort((a, b) => b.minutes - a.minutes)[0];
    return (
      <div>
        <div style={styles.insightCard}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎯 Today's Productivity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ ...styles.prodBadge, background: productivity.color }}>{productivity.emoji} {productivity.score}</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{formatTime(stats.todayMinutes)} studied today</span>
          </div>
          <div style={{ fontSize: 13, color: '#475569' }}>
            {stats.todayMinutes >= 300 ? "Outstanding! You're crushing your study goals today." :
             stats.todayMinutes >= 180 ? "Great progress! Keep it up and try to hit 5 hours." :
             stats.todayMinutes >= 60 ? "Good start! Aim for at least 3 hours for better retention." :
             "Let's get started! Even 30 minutes can make a difference."}
          </div>
        </div>

        <div style={styles.grid2}>
          <div style={styles.card}>
            <div style={styles.chartTitle}>🏆 Most Studied Subject</div>
            {topSubject ? <>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#6366f1' }}>{topSubject.name}</div>
              <div style={{ color: '#64748b', marginTop: 4 }}>{formatTime(topSubject.minutes)} total</div>
            </> : <div style={{ color: '#94a3b8' }}>No data yet</div>}
          </div>
          <div style={styles.card}>
            <div style={styles.chartTitle}>⚠️ Needs More Attention</div>
            {leastSubject ? <>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>{leastSubject.name}</div>
              <div style={{ color: '#64748b', marginTop: 4 }}>Only {formatTime(leastSubject.minutes)} total</div>
            </> : <div style={{ color: '#94a3b8' }}>No data yet</div>}
          </div>
          <div style={styles.card}>
            <div style={styles.chartTitle}>📅 Best Study Day (This Week)</div>
            {bestDay ? <>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#10b981' }}>{bestDay.day}</div>
              <div style={{ color: '#64748b', marginTop: 4 }}>{formatTime(bestDay.minutes)} studied</div>
            </> : <div style={{ color: '#94a3b8' }}>No data yet</div>}
          </div>
          <div style={styles.card}>
            <div style={styles.chartTitle}>📊 Weekly Average</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#8b5cf6' }}>
              {formatTime(Math.round(stats.weekData.reduce((s, d) => s + d.minutes, 0) / 7))}
            </div>
            <div style={{ color: '#64748b', marginTop: 4 }}>per day this week</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>📚 Study Session Visualizer</h1>
          <p style={styles.headerSub}>Track, analyze, and improve your study habits</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 13, opacity: 0.9 }}>
          <div style={{ fontWeight: 700, fontSize: 20 }}>{formatTime(stats.totalMinutes)}</div>
          <div>total studied</div>
        </div>
      </div>
      <nav style={styles.nav}>
        {[['dashboard', '📊 Dashboard'], ['add', '➕ Add Session'], ['history', '📋 History'], ['subjects', '📚 Subjects'], ['insights', '💡 Insights']].map(([id, label]) => (
          <button key={id} style={styles.navBtn(activeTab === id)} onClick={() => setActiveTab(id)}>{label}</button>
        ))}
      </nav>
      <main style={styles.main}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'add' && renderAddSession()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'subjects' && renderSubjects()}
        {activeTab === 'insights' && renderInsights()}
      </main>
    </div>
  );
}
