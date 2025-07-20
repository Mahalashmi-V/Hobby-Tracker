import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Bell, CheckCircle, Circle, Save, X, BarChart3, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import './dashboard.css'

const HobbyTrackerApp = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'chart'
  const [selectedHobbyForChart, setSelectedHobbyForChart] = useState(null);

  const [hobbies, setHobbies] = useState([
    {
      id: 1,
      name: 'Guitar Playing',
      startDate: '2024-01-15',
      endDate: '',
      status: 'active',
      notes: 'Learning fingerpicking techniques',
      todos: [
        { id: 1, text: 'Practice scales for 30 minutes', completed: false },
        { id: 2, text: 'Learn new song', completed: true }
      ],
      reminder: '2025-07-15T10:00',
      progressData: [
        { date: '2024-01-15', hours: 2, completed: 0 },
        { date: '2024-02-15', hours: 3, completed: 1 },
        { date: '2024-03-15', hours: 4, completed: 1 },
        { date: '2024-04-15', hours: 5, completed: 2 },
        { date: '2024-05-15', hours: 3, completed: 3 },
        { date: '2024-06-15', hours: 4, completed: 4 },
        { date: '2024-07-15', hours: 6, completed: 5 }
      ]
    },
    {
      id: 2,
      name: 'Photography',
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      status: 'completed',
      notes: 'Completed portrait photography course',
      todos: [
        { id: 3, text: 'Edit last photoshoot', completed: true },
        { id: 4, text: 'Print portfolio', completed: true }
      ],
      reminder: '',
      progressData: [
        { date: '2024-03-01', hours: 5, completed: 0 },
        { date: '2024-04-01', hours: 8, completed: 2 },
        { date: '2024-05-01', hours: 6, completed: 4 },
        { date: '2024-06-01', hours: 10, completed: 6 },
        { date: '2024-07-01', hours: 7, completed: 8 },
        { date: '2024-08-01', hours: 9, completed: 10 }
      ]
    }
  ]);

  const showHobbyChart = (hobby) => {
    setSelectedHobbyForChart(hobby);
    setCurrentView('chart');
  };

  const backToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedHobbyForChart(null);
  };

  if (currentView === 'chart' && selectedHobbyForChart) {
    return <HobbyChartPage hobby={selectedHobbyForChart} onBack={backToDashboard} />;
  }

  return <HobbyTrackerDashboard hobbies={hobbies} setHobbies={setHobbies} onShowChart={showHobbyChart} />;
};

const HobbyTrackerDashboard = ({ hobbies, setHobbies, onShowChart }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingHobby, setEditingHobby] = useState(null);
  const [newHobby, setNewHobby] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: 'active',
    notes: '',
    todos: [],
    reminder: '',
    progressData: []
  });

  const [newTodo, setNewTodo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    checkReminders();
  }, [hobbies]);

  const checkReminders = () => {
    const now = new Date();
    hobbies.forEach(hobby => {
      if (hobby.reminder) {
        const reminderDate = new Date(hobby.reminder);
        if (reminderDate <= now && reminderDate > new Date(now.getTime() - 60000)) {
          alert(`Reminder: Time to work on ${hobby.name}!`);
        }
      }
    });
  };

  const addHobby = () => {
    if (newHobby.name.trim()) {
      const hobby = {
        ...newHobby,
        id: Date.now(),
        todos: [],
        progressData: [
          { date: new Date().toISOString().split('T')[0], hours: 0, completed: 0 }
        ]
      };
      setHobbies([...hobbies, hobby]);
      setNewHobby({
        name: '',
        startDate: '',
        endDate: '',
        status: 'active',
        notes: '',
        todos: [],
        reminder: '',
        progressData: []
      });
      setShowAddForm(false);
    }
  };

  const deleteHobby = (id) => {
    setHobbies(hobbies.filter(hobby => hobby.id !== id));
  };

  const updateHobby = (id, updatedHobby) => {
    setHobbies(hobbies.map(hobby => 
      hobby.id === id ? { ...hobby, ...updatedHobby } : hobby
    ));
    setEditingHobby(null);
  };

  const addTodo = (hobbyId) => {
    if (newTodo.trim()) {
      const updatedHobbies = hobbies.map(hobby => {
        if (hobby.id === hobbyId) {
          return {
            ...hobby,
            todos: [...hobby.todos, { id: Date.now(), text: newTodo, completed: false }]
          };
        }
        return hobby;
      });
      setHobbies(updatedHobbies);
      setNewTodo('');
    }
  };

  const toggleTodo = (hobbyId, todoId) => {
    const updatedHobbies = hobbies.map(hobby => {
      if (hobby.id === hobbyId) {
        return {
          ...hobby,
          todos: hobby.todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          )
        };
      }
      return hobby;
    });
    setHobbies(updatedHobbies);
  };

  const deleteTodo = (hobbyId, todoId) => {
    const updatedHobbies = hobbies.map(hobby => {
      if (hobby.id === hobbyId) {
        return {
          ...hobby,
          todos: hobby.todos.filter(todo => todo.id !== todoId)
        };
      }
      return hobby;
    });
    setHobbies(updatedHobbies);
  };

  const getHobbiesForDate = (date) => {
    return hobbies.filter(hobby => {
      const start = new Date(hobby.startDate);
      const end = hobby.endDate ? new Date(hobby.endDate) : new Date();
      const selected = new Date(date);
      return selected >= start && selected <= end;
    });
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'Not set';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
   <div className="dashboard-container">
  <div className="dashboard-wrapper">
    <header className="dashboard-header">
      <h1 className="dashboard-title">Hobby Tracker Dashboard</h1>
      <p className="dashboard-subtitle">Track your hobbies, set reminders, and manage your progress</p>
    </header>

    <div className="dashboard-grid">
      <div className="hobby-section">
        <div className="hobby-box">
          <div className="hobby-header">
            <h2 className="hobby-heading">My Hobbies</h2>
            <button onClick={() => setShowAddForm(true)} className="btn btn-primary">
              <Plus size={20} />
              Add Hobby
            </button>
          </div>

          {showAddForm && (
            <div className="add-form">
              <h3 className="add-title">Add New Hobby</h3>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Hobby name"
                  value={newHobby.name}
                  onChange={(e) => setNewHobby({ ...newHobby, name: e.target.value })}
                />
                <select
                  value={newHobby.status}
                  onChange={(e) => setNewHobby({ ...newHobby, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
                <div>
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newHobby.startDate}
                    onChange={(e) => setNewHobby({ ...newHobby, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label>End Date (Optional)</label>
                  <input
                    type="date"
                    value={newHobby.endDate}
                    onChange={(e) => setNewHobby({ ...newHobby, endDate: e.target.value })}
                  />
                </div>
                <div>
                  <label>Reminder</label>
                  <input
                    type="datetime-local"
                    value={newHobby.reminder}
                    onChange={(e) => setNewHobby({ ...newHobby, reminder: e.target.value })}
                  />
                </div>
              </div>
              <textarea
                placeholder="Notes"
                value={newHobby.notes}
                onChange={(e) => setNewHobby({ ...newHobby, notes: e.target.value })}
                rows={3}
              />
              <div className="form-actions">
                <button onClick={addHobby} className="btn btn-green">
                  <Save size={16} />
                  Save
                </button>
                <button onClick={() => setShowAddForm(false)} className="btn btn-gray">
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="hobby-list">
            {hobbies.map(hobby => (
              <div key={hobby.id} className="hobby-card">
                {editingHobby === hobby.id ? (
                  <EditHobbyForm
                    hobby={hobby}
                    onSave={(updatedHobby) => updateHobby(hobby.id, updatedHobby)}
                    onCancel={() => setEditingHobby(null)}
                  />
                ) : (
                  <div>
                    <div className="hobby-top">
                      <div>
                        <h3 className="hobby-name">{hobby.name}</h3>
                        <span className={`status-tag ${getStatusColor(hobby.status)}`}>
                          {hobby.status.charAt(0).toUpperCase() + hobby.status.slice(1)}
                        </span>
                      </div>
                      <div className="hobby-actions">
                        <button onClick={() => onShowChart(hobby)} className="text-btn purple" title="View Progress Chart">
                          <BarChart3 size={16} />
                        </button>
                        <button onClick={() => setEditingHobby(hobby.id)} className="text-btn blue">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => deleteHobby(hobby.id)} className="text-btn red">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="hobby-meta">
                      <div><strong>Start:</strong> {formatDate(hobby.startDate)}</div>
                      <div><strong>End:</strong> {formatDate(hobby.endDate)}</div>
                      {hobby.reminder && (
                        <div className="reminder">
                          <Bell size={14} />
                          <strong>Reminder:</strong> {new Date(hobby.reminder).toLocaleString()}
                        </div>
                      )}
                    </div>

                    {hobby.notes && (
                      <div className="hobby-notes">
                        <strong>Notes:</strong>
                        <p>{hobby.notes}</p>
                      </div>
                    )}

                    <div className="todo-section">
                      <h4>To-Do List</h4>
                      <div className="todo-list">
                        {hobby.todos.map(todo => (
                          <div key={todo.id} className="todo-item">
                            <button
                              onClick={() => toggleTodo(hobby.id, todo.id)}
                              className={todo.completed ? 'todo-icon done' : 'todo-icon'}
                            >
                              {todo.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
                            </button>
                            <span className={`todo-text ${todo.completed ? 'done' : ''}`}>{todo.text}</span>
                            <button
                              onClick={() => deleteTodo(hobby.id, todo.id)}
                              className="text-btn red small"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="todo-input">
                        <input
                          type="text"
                          placeholder="Add new task..."
                          value={newTodo}
                          onChange={(e) => setNewTodo(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addTodo(hobby.id)}
                        />
                        <button onClick={() => addTodo(hobby.id)} className="btn btn-primary small">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="sidebar">
        <div className="calendar-card">
          <h3 className="sidebar-title"><Calendar size={20} /> Calendar View</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div className="calendar-list">
            <h4>Hobbies on {formatDate(selectedDate)}:</h4>
            {getHobbiesForDate(selectedDate).length > 0 ? (
              getHobbiesForDate(selectedDate).map(hobby => (
                <div key={hobby.id} className="calendar-item">
                  <div className="calendar-name">{hobby.name}</div>
                  <div className="calendar-status">Status: {hobby.status}</div>
                </div>
              ))
            ) : (
              <p className="calendar-empty">No hobbies scheduled for this date.</p>
            )}
          </div>
        </div>

        <div className="summary-card">
          <h3 className="sidebar-title">Summary</h3>
          <div className="summary-list">
            <div><span>Total Hobbies:</span> <strong>{hobbies.length}</strong></div>
            <div><span>Active:</span> <strong>{hobbies.filter(h => h.status === 'active').length}</strong></div>
            <div><span>Completed:</span> <strong>{hobbies.filter(h => h.status === 'completed').length}</strong></div>
            <div><span>Paused:</span> <strong>{hobbies.filter(h => h.status === 'paused').length}</strong></div>
            <div><span>Total Tasks:</span> <strong>{hobbies.reduce((acc, h) => acc + h.todos.length, 0)}</strong></div>
            <div><span>Completed Tasks:</span> <strong>{hobbies.reduce((acc, h) => acc + h.todos.filter(t => t.completed).length, 0)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

const EditHobbyForm = ({ hobby, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    name: hobby.name,
    startDate: hobby.startDate,
    endDate: hobby.endDate,
    status: hobby.status,
    notes: hobby.notes,
    reminder: hobby.reminder
  });

  const handleSave = () => {
    onSave(editData);
  };

  return (
    <div className="edit-form">
      <div className="edit-grid">
        <input
          type="text"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          placeholder="Hobby Name"
        />
        <select
          value={editData.status}
          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          value={editData.startDate}
          onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
        />
        <input
          type="date"
          value={editData.endDate}
          onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
        />
        <input
          type="datetime-local"
          value={editData.reminder}
          onChange={(e) => setEditData({ ...editData, reminder: e.target.value })}
        />
      </div>

      <textarea
        value={editData.notes}
        onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
        rows={3}
        placeholder="Notes"
      />

      <div className="edit-actions">
        <button onClick={handleSave} className="save-btn">
          <Save size={16} /> Save
        </button>
        <button onClick={onCancel} className="cancel-btn">
          <X size={16} /> Cancel
        </button>
      </div>
    </div>
  );
};

const HobbyChartPage = ({ hobby, onBack }) => {
  const [chartType, setChartType] = useState('progress');

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088aa'];

  const getTotalHours = () => {
    return hobby.progressData?.reduce((sum, entry) => sum + entry.hours, 0) || 0;
  };

  const getCompletedTasks = () => {
    return hobby.todos?.filter(todo => todo.completed).length || 0;
  };

  const getTotalTasks = () => {
    return hobby.todos?.length || 0;
  };

  const getTaskCompletionData = () => {
    const completed = getCompletedTasks();
    const remaining = getTotalTasks() - completed;
    return [
      { name: 'Completed', value: completed },
      { name: 'Remaining', value: remaining }
    ];
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={onBack} className="btn btn-gray">
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <div>
              <h1 className="dashboard-title">{hobby.name} - Progress Chart</h1>
              <p className="dashboard-subtitle">Visual representation of your hobby progress</p>
            </div>
          </div>
        </header>

        <div className="chart-controls" style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <label>Chart Type:</label>
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="progress">Time Progress</option>
              <option value="tasks">Task Completion</option>
              <option value="overview">Overview</option>
            </select>
          </div>
        </div>

        <div className="chart-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1565c0' }}>Total Hours</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0d47a1' }}>{getTotalHours()}</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Completed Tasks</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#1b5e20' }}>{getCompletedTasks()}/{getTotalTasks()}</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#fff3e0', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#ef6c00' }}>Status</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#e65100' }}>{hobby.status.toUpperCase()}</p>
          </div>
        </div>

        <div className="chart-container" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          {chartType === 'progress' && hobby.progressData && (
            <>
              <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Time Spent Over Time</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hobby.progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}

          {chartType === 'tasks' && (
            <>
              <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Task Completion Status</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={getTaskCompletionData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getTaskCompletionData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </>
          )}

          {chartType === 'overview' && hobby.progressData && (
            <>
              <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Hours vs Completed Tasks</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={hobby.progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8884d8" name="Hours Spent" />
                  <Bar dataKey="completed" fill="#82ca9d" name="Tasks Completed" />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        <div className="hobby-details" style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Hobby Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div><strong>Start Date:</strong> {new Date(hobby.startDate).toLocaleDateString()}</div>
            <div><strong>End Date:</strong> {hobby.endDate ? new Date(hobby.endDate).toLocaleDateString() : 'Ongoing'}</div>
            <div><strong>Status:</strong> {hobby.status}</div>
          </div>
          {hobby.notes && (
            <div style={{ marginTop: '1rem' }}>
              <strong>Notes:</strong>
              <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>{hobby.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HobbyTrackerApp;