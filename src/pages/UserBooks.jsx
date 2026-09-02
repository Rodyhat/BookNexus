import React, { useState } from 'react';
import { 
  MdMenuBook, 
  MdAccessTime, 
  MdHistory, 
  MdMoreVert, 
  MdInfoOutline, 
  MdCheckCircle 
} from 'react-icons/md';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

/**
 * MyBooks Component
 * 
 * Displays the user's active loans and borrowing history.
 * Refined for responsiveness to prevent overflow on small mobile devices.
 */
const MyBooks = () => {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  const activeLoans = [
    {
      id: 1,
      title: "Advanced Data Structures",
      author: "Peter Brass",
      dueDate: "Oct 12, 2023",
      status: "Overdue",
      statusType: "error",
      cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200"
    },
    {
      id: 2,
      title: "Machine Learning Engineering",
      author: "Andriy Burkov",
      dueDate: "Oct 26, 2023",
      status: "Due in 2 days",
      statusType: "warning",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=200"
    },
    {
      id: 3,
      title: "Design Systems",
      author: "Alla Kholmatova",
      dueDate: "Nov 15, 2023",
      status: "Active",
      statusType: "success",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200"
    }
  ];

  const history = [
    { id: 101, title: "Clean Code", date: "Returned Oct 12", author: "Robert C. Martin" },
    { id: 102, title: "Refactoring UI", date: "Returned Sep 28", author: "Adam Wathan" },
    { id: 103, title: "The Pragmatic Programmer", date: "Returned Aug 15", author: "Andrew Hunt" }
  ];

  const getStatusStyles = (type) => {
    switch (type) {
      case 'error': return 'bg-red-50 text-red-600 border-red-100';
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'success': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sora">
      <main className="mx-auto p py-6 md:py-10">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">My Books</h1>
          <p className="text-slate-500 text-sm font-medium">Track your active materials and reading history.</p>
        </div>

        {/* Custom Tab Switcher - Max width constraint to prevent mobile stretch */}
        <div className="flex p-1 bg-indigo-50/50 rounded-xl mb-8  mx-auto sm:mx-0">
          <button 
            onClick={() => setActiveTab('active')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'active' 
                ? 'bg-primary-container text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <MdMenuBook size={18} />
            Active ({activeLoans.length})
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'history' 
                ? 'bg-primary-container text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <MdHistory size={18} />
            History
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'active' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activeLoans.map((loan) => (
              <div key={loan.id} className="bg-white rounded-2xl border border-indigo-50 p-4 flex gap-4 sm:gap-5 shadow-sm hover:shadow-md transition-shadow group relative">
                
                {/* Book Cover */}
                <div className="w-20 h-28 sm:w-24 sm:h-36 bg-slate-50 rounded-xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
                  <img src={loan.cover} alt={loan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>

                {/* Info Section - min-w-0 for flex children to allow text truncation */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-slate-800 text-sm sm:text-base leading-snug pr-6 line-clamp-2">{loan.title}</h3>
                      <button className="absolute top-4 right-4 p-1 text-slate-300 hover:text-slate-500 transition-colors">
                        <MdMoreVert size={20} />
                      </button>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wide mt-1 truncate">{loan.author}</p>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2 text-slate-500">
                      <MdAccessTime size={16} className="shrink-0" />
                      <span className="text-[10px] sm:text-xs font-bold">Due: {loan.dueDate}</span>
                    </div>
                    
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${getStatusStyles(loan.statusType)}`}>
                      {loan.statusType === 'error' && <MdInfoOutline size={12} />}
                      {loan.statusType === 'success' && <MdCheckCircle size={12} />}
                      {loan.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* History View */
          <div className="bg-white rounded-2xl border border-indigo-50 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-50">
              {history.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-primary-container shrink-0">
                      <MdMenuBook size={20} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{item.title}</h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-tight mt-0.5 truncate">{item.author}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider">{item.date}</p>
                    <span className="text-[9px] font-bold text-green-500 flex items-center justify-end gap-1 mt-1">
                      <MdCheckCircle size={12} /> Returned
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Helper Action */}
        <div className="mt-12 text-center p-6 sm:p-8 border-2 border-dashed border-indigo-100 rounded-3xl bg-white/50">
          <p className="text-sm text-slate-500 font-medium mb-4 px-4">Need to find more resources for your research?</p>
          <Button 
            variant="secondary" 
            className="w-full sm:w-auto px-8 shadow-sm"
            onClick={() => navigate('/trendinglist')}
          >
            Explore Full Catalog
          </Button>
        </div>

      </main>
    </div>
  );
};

export default MyBooks;
