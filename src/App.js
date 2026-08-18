import { useState, useEffect } from 'react';
import './App.css';
import dayjs from 'dayjs';

function App() {
  const todoData = [
    {
      _id: 1,
      title: 'Complete AWS Cloud Computing Lab',
      status: false,
      deadline: dayjs('2026-08-18T17:11:54'),
    },
    {
      _id: 2,
      title: 'Revise Java Inheritance',
      status: true,
      deadline: dayjs('2026-08-18T10:16:04'),
    },
    {
      _id: 3,
      title: 'Submit DBMS Assignment',
      status: false,
      deadline: dayjs('2026-08-19T21:11:54'),
    },
  ];

  const [listTasks, setListTasks] = useState(todoData);
  const [showListTasks, setShowListTasks] = useState([]);
  const [modeSort, setModeSort] = useState('All');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editingTask) {
      handleEdit({ ...editingTask, title: newTitle });
      setEditingTask(null);
    } else {
      const newTask = {
        _id: Date.now(),
        title: newTitle,
        status: false,
        deadline: dayjs(),
      };
      setListTasks([...listTasks, newTask]);
    }
    setNewTitle('');
    setIsFormOpen(false);
  };

  const handleDelete = (_id) => {
    setListTasks(listTasks.filter((t) => t._id !== _id));
  };

  const handleCheck = (task) => {
    setListTasks(
      listTasks.map((t) => {
        if (t._id === task._id) {
          return {
            ...task,
            status: !task.status,
          };
        } else {
          return t;
        }
      })
    );
  };

  const handleEdit = (task) => {
    setListTasks(
      listTasks.map((t) => {
        if (t._id === task._id) {
          return task;
        } else {
          return t;
        }
      })
    );
  };

  const handleSortList = (mode) => {
    setModeSort(mode);
  };

  useEffect(() => {
    if (modeSort === 'All') {
      setShowListTasks(listTasks);
    } else if (modeSort === 'Incomplete') {
      let sortedListTasks = listTasks.filter((t) => !t.status);
      setShowListTasks(sortedListTasks);
    } else {
      let sortedListTasks = listTasks.filter((t) => t.status);
      setShowListTasks(sortedListTasks);
    }
  }, [listTasks, modeSort]);

  const totalTasks = listTasks.length;
  const completedTasks = listTasks.filter((t) => t.status).length;

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center font-sans antialiased text-slate-800 p-0 sm:p-4">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[390px] h-screen sm:h-[844px] bg-slate-50 flex flex-col relative overflow-hidden sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-slate-900">
        
        {/* Header Block */}
        <header className="px-6 pt-8 pb-4 bg-white border-b border-slate-100 shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold tracking-tight text-indigo-600">StudyMate</h1>
            <span className="text-[11px] bg-indigo-50 text-indigo-600 font-bold px-2.5 py-1 rounded-full">24MIC0022</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Good morning, Pavithra 👋</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Let's get things done today.</p>
          
          <div className="flex gap-3 mt-4">
            <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks</span>
              <span className="text-base font-bold text-slate-800">{totalTasks} Assigned</span>
            </div>
            <div className="flex-1 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100/50">
              <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Progress</span>
              <span className="text-base font-bold text-emerald-700">{completedTasks} Done</span>
            </div>
          </div>
        </header>

        {/* Filter Segment Tabs */}
        <section className="px-6 py-3 bg-white/80 backdrop-blur-md shrink-0">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['All', 'Incomplete', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleSortList(tab)}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
                  modeSort === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab === 'Incomplete' ? 'Today' : tab}
              </button>
            ))}
          </div>
        </section>

        {/* Core Task List Cards Scroll Space */}
        <main className="flex-1 overflow-y-auto px-6 py-2 space-y-3 pb-24">
          {showListTasks.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-medium">
              No tasks found in this section! ✨
            </div>
          ) : (
            showListTasks.map((task) => (
              <div 
                key={task._id} 
                className={`flex items-center justify-between p-4 bg-white rounded-2xl border transition-all duration-200 shadow-sm ${
                  task.status ? 'border-slate-100 opacity-60' : 'border-slate-200/60'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 pr-2">
                  <div className="relative flex items-center mt-0.5">
                    <input 
                      type="checkbox" 
                      checked={task.status}
                      onChange={() => handleCheck(task)}
                      className="w-5 h-5 rounded-full border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all checked:bg-indigo-600 checked:border-indigo-600"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className={`text-sm font-semibold tracking-tight text-slate-800 leading-snug ${task.status ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 font-medium flex items-center gap-1">
                      🗓️ {dayjs(task.deadline).format('MMM DD, YYYY - h:mm A')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => {
                      setEditingTask(task);
                      setNewTitle(task.title);
                      setIsFormOpen(true);
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)}
                    className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </main>

        {/* Floating Action Button (FAB) */}
        <button 
          onClick={() => {
            setEditingTask(null);
            setNewTitle('');
            setIsFormOpen(true);
          }}
          className="absolute bottom-20 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-indigo-200 transition-all text-2xl font-light z-40"
        >
          ＋
        </button>

        {/* Integrated Mobile Interactive Drawer Form Overlay */}
        {isFormOpen && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-end z-50 animate-fade-in">
            <form onSubmit={handleSubmit} className="w-full bg-white rounded-t-3xl p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900">
                  {editingTask ? 'Edit Task Title' : 'Create New Task'}
                </h3>
                <button 
                  type="button" 
                  onClick={() => setIsFormOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
              <input 
                type="text" 
                placeholder="What are you studying next?" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              <button 
                type="submit" 
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
              >
                {editingTask ? 'Save Variations' : 'Add to Schedule'}
              </button>
            </form>
          </div>
        )}

        {/* Fixed Bottom Tab Bar */}
        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-around px-4 z-30">
