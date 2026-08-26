import React from 'react';
import { 
  MdSearch, 
  MdQrCodeScanner, 
  MdHistory, 
  MdFavoriteBorder, 
  MdAccessTime, 
  MdErrorOutline, 
  MdBook,
  MdDashboard,
  MdLibraryBooks
} from 'react-icons/md';
import Button from '../components/Button';

const UserDashboard = () => {
  const stats = [
    { label: "BOOKS BORROWED", value: 42, icon: MdBook, color: "#3730A3", bg: "bg-indigo-50" },
    { label: "ACTIVE LOANS", value: 3, icon: MdAccessTime, color: "#D97706", bg: "bg-amber-50" },
    { label: "OVERDUE", value: 1, icon: MdErrorOutline, color: "#DC2626", bg: "bg-red-50" }
  ];

  const currentlyReading = [
    { 
      id: 1, 
      title: "The Design of Everyday Things", 
      author: "Don Norman", 
      progress: 65, 
      cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200" 
    },
    { 
      id: 2, 
      title: "Thinking, Fast and Slow", 
      author: "Daniel Kahneman", 
      progress: 12, 
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=200" 
    }
  ];

  const deadlines = [
    { id: 101, title: "Design Systems", status: "Due in 2 days", type: "upcoming" },
    { id: 102, title: "Information Architecture", status: "Due in 5 days", type: "normal" }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sora pb-24">
      {/* Top App Bar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-indigo-100 px-6 py-4 flex justify-between items-center z-40">
        <div className="flex items-center gap-2">
          <MdBook className="text-primary-container" size={24} />
          <h1 className="text-xl font-bold text-primary-container">BookNexus</h1>
        </div>
        <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 pt-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Alex.</h2>
          <p className="text-slate-600">You have 2 books due this week.</p>
          <Button variant="primary" className="mt-4 w-full md:w-auto px-10">Browse Catalog</Button>
        </div>

        {/* Statistics Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border-l-4 flex items-center gap-5" style={{ borderLeftColor: stat.color }}>
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Borrowed - Responsive Grid */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Currently Borrowed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentlyReading.map(book => (
              <div key={book.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
                <img src={book.cover} alt={book.title} className="w-full sm:w-24 h-48 sm:h-32 rounded-lg object-cover shadow-sm" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{book.title}</h3>
                    <p className="text-sm text-slate-500">{book.author}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${book.progress < 20 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                      Due in {book.progress < 20 ? '2 days' : '5 days'}
                    </span>
                    <button className="text-primary-container text-sm font-bold hover:underline">Renew</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions - Responsive Grid */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Search Books', icon: MdSearch },
              { label: 'Scan ISBN', icon: MdQrCodeScanner },
              { label: 'Loan History', icon: MdHistory },
              { label: 'My Wishlist', icon: MdFavoriteBorder }
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                <action.icon className="text-primary-container mb-3 group-hover:scale-110 transition-transform" size={28} />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">{action.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-around items-center py-3 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
        <button className="flex flex-col items-center text-primary-container">
          <MdDashboard size={24} className="mb-1" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Dashboard</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-primary-container transition-colors">
          <MdLibraryBooks size={24} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">My Books</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-primary-container transition-colors">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-6 h-6 rounded-full mb-1 grayscale opacity-70" alt="Profile" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default UserDashboard;