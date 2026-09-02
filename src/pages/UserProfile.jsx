import React, { useState, useContext } from 'react';
import {
  MdArrowBack,
  MdEdit,
  MdLock,
  MdNotifications,
  MdSecurity,
  MdSave,
  MdChevronRight,
  MdPersonOutline
} from 'react-icons/md';
import { UserContext } from '../context/myContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { profile } = useContext(UserContext);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    dueDates: true,
    newArrivals: false,
    approvals: true
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const inputClasses =
    'w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#3730A3] focus:ring-1 focus:ring-[#3730A3] transition-all font-medium text-slate-700 placeholder:text-slate-400';

  const labelClasses =
    'text-[11px] font-black text-slate-400 tracking-widest uppercase mb-1.5 block';

  const sectionTitleClasses =
    'text-sm font-black text-slate-800 tracking-tight flex items-center gap-2 mb-4';

  const notificationItems = [
    {
      id: 'dueDates',
      title: 'Due Date Reminders',
      desc: 'Alerts 2 days before a book is due.'
    },
    {
      id: 'newArrivals',
      title: 'New Arrivals',
      desc: 'Monthly digest of new books in your department.'
    },
    {
      id: 'approvals',
      title: 'Approval Status',
      desc: 'Instant alerts when your request is processed.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sora">

      {/* ================= PAGE HEADER ================= */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-indigo-50 z-40">
        <div className="flex items-center gap-3 py-3 md:py-4">

          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors shrink-0"
            aria-label="Go back"
          >
            <MdArrowBack size={24} />
          </button>

          <h1 className="text-lg md:text-xl font-bold text-slate-800">
            Account Settings
          </h1>

        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="page-container">
        <div className="max-w-3xl mx-auto py-6 md:py-8 lg:py-10 pb-24 space-y-8">

          {/* ================= PROFILE CARD ================= */}
          <section className="bg-white rounded-2xl border border-indigo-50 shadow-sm overflow-hidden">

            <div className="relative flex flex-col items-center p-5 sm:p-6 md:p-8">

              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-r from-indigo-500/10 to-[#3730A3]/10" />

              {/* Profile Image */}
              <div className="relative mt-4 mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                      profile?.name || 'Felix'
                    )}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-primary-container text-white rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                  aria-label="Edit profile picture"
                >
                  <MdEdit size={16} />
                </button>
              </div>

              <h2 className="text-xl font-black text-slate-800 tracking-tight text-center">
                {profile?.name || 'Felix Adebayo'}
              </h2>

              <p className="text-xs text-slate-400 font-bold tracking-wider mt-1 text-center break-all">
                {profile?.email || 'user@booknexus.edu'}
              </p>

            </div>
          </section>

          {/* ================= PERSONAL INFORMATION ================= */}
          <section>
            <h3 className={sectionTitleClasses}>
              <MdPersonOutline
                className="text-primary-container"
                size={20}
              />
              Personal Information
            </h3>

            <div className="space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-indigo-50 shadow-sm">

              <div>
                <label className={labelClasses}>
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue={profile?.name || ''}
                  placeholder="e.g. Felix Adebayo"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Email Address
                </label>

                <input
                  type="email"
                  defaultValue={profile?.email || ''}
                  className={`${inputClasses} bg-slate-100 cursor-not-allowed`}
                  disabled
                />

                <p className="text-[10px] text-slate-400 font-medium mt-1.5 px-1">
                  Institutional email cannot be changed manually.
                </p>
              </div>

              <div>
                <label className={labelClasses}>
                  Department / Major
                </label>

                <input
                  type="text"
                  placeholder="e.g. Computer Science & Engineering"
                  className={inputClasses}
                />
              </div>

            </div>
          </section>

          {/* ================= NOTIFICATIONS ================= */}
          <section>
            <h3 className={sectionTitleClasses}>
              <MdNotifications
                className="text-primary-container"
                size={20}
              />
              Notifications
            </h3>

            <div className="bg-white rounded-2xl border border-indigo-50 overflow-hidden shadow-sm divide-y divide-slate-50">

              {notificationItems.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start justify-between gap-4 p-4 sm:p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-sm font-bold text-slate-800">
                      {item.title}
                    </p>

                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative inline-flex items-center cursor-pointer mt-1 shrink-0">

                    <input
                      type="checkbox"
                      checked={notifications[item.id]}
                      onChange={() => toggleNotification(item.id)}
                      className="sr-only peer"
                    />

                    <div className="w-10 h-5 bg-slate-200 rounded-full peer-focus:outline-none peer-checked:bg-primary-container transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />

                  </div>
                </label>
              ))}

            </div>
          </section>

          {/* ================= SECURITY ================= */}
          <section>
            <h3 className={sectionTitleClasses}>
              <MdSecurity
                className="text-primary-container"
                size={20}
              />
              Security
            </h3>

            <button
              type="button"
              className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-indigo-50 flex items-center justify-between gap-4 shadow-sm hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">

                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-primary-container group-hover:bg-white transition-colors shrink-0">
                  <MdLock size={20} />
                </div>

                <div className="text-left min-w-0">
                  <p className="text-sm font-bold text-slate-800">
                    Update Password
                  </p>

                  <p className="text-[11px] text-slate-500 font-medium truncate">
                    Secure your account with a new password
                  </p>
                </div>

              </div>

              <MdChevronRight
                size={24}
                className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0"
              />
            </button>
          </section>

          {/* ================= SAVE ================= */}
          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full shadow-lg shadow-indigo-100 py-3.5 flex items-center justify-center"
            >
              <MdSave className="mr-2" size={20} />
              Save Changes
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UserProfile;
