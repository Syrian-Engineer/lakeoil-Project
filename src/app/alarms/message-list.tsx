'use client';

import { useEffect, useState } from 'react';
import { getRelativeTime } from '@/utils/get-relative-time';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { alarmHomePageTranslations } from '@/translations/alarmPage/home';

// Inline Notification Component
function Notification({
  message,
  type = 'success',
  onClose,
}: {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors =
    type === 'success'
      ? 'bg-green-100 text-green-700 border-green-300'
      : 'bg-red-100 text-red-700 border-red-300';

  //  for translations
  
  return (
    <div className={`fixed top-20 z-50 left-4 px-4 py-2 rounded border shadow ${colors}`}>
      {message}
    </div>
  );
}

interface AlarmsProps {
  date: Date;
  id: number;
  message: string;
}

interface WarningsProps {
  date: Date;
  id: number;
  message: string;
}

export default function MessageList() {
  const [alarms, setAlarms] = useState<AlarmsProps[]>([]);
  const [warnings, setWarnings] = useState<WarningsProps[]>([]);
  const [loadingAlarms, setLoadingAlarms] = useState(true);
  const [loadingWarnings, setLoadingWarnings] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'alarms' | 'warnings'>('alarms');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deletingAlarmId, setDeletingAlarmId] = useState<number | null>(null);
  const [deletingWarningId, setDeletingWarningId] = useState<number | null>(null);

  useEffect(() => {
    if(typeof window === "undefined"){
      return;
    }

    const isReportsLogin = localStorage.getItem("onlyReports") === "true";
    const access_token = sessionStorage.getItem("access_token");

    const fetchAlarms = async () => {
      try {
          const endpoint = isReportsLogin
          ?"/api/reports/alarms/get-alarms"
          :"/api/alarms/get-alarms"

          const headers : Record<string,string> = {
            'Content-Type': 'application/json',
          }

          if(isReportsLogin && access_token){
            headers["Authorization"] = `${access_token}`
          }
        const res = await fetch(endpoint, {
           headers,
           credentials: isReportsLogin?"omit":"include"
          }
        );
        const data = await res.json();
        setAlarms(data.alarms || []);
      } catch (error) {
        console.error('Failed to fetch alarms:', error);
      } finally {
        setLoadingAlarms(false);
      }
    };

    const fetchWarnings = async () => {
      try {
        const endpoint = isReportsLogin
        ?"/api/reports/alarms/get-warnings"
        :"/api/alarms/get-warnings";

        const headers :Record<string,string> = {
          'Content-Type': 'application/json',
        }

        if(isReportsLogin && access_token){
          headers["Authorization"] = `${access_token}`
        }

        const res = await fetch(endpoint, { 
          headers,
          credentials: isReportsLogin?"omit":"include"
        }
      );
        const data = await res.json();
        setWarnings(data.warnings || []);
      } catch (error) {
        console.error('Failed to fetch warnings:', error);
      } finally {
        setLoadingWarnings(false);
      }
    };

    fetchAlarms();
    fetchWarnings();
  }, []);

  const handleDeleteAlarm = async (id: number) => {
    try {
      setDeletingAlarmId(id)
      const isReportsLogin = localStorage.getItem("onlyReports") === "true";
      const access_token = sessionStorage.getItem("access_token")

      const endpoint = isReportsLogin
      ?"/api/reports/alarms/delete-alarm"
      :"/api/alarms/delete-alarm";

      const headers :Record<string,string> = {
        'Content-Type': 'application/json',
      }

      if(isReportsLogin && access_token){
        headers["Authorization"] = `${access_token}`
      }

      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers,
        credentials: isReportsLogin?"omit":"include",
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
        setNotification({ message: data.message || `${deletedAlarm.text}`, type: 'success' });
      } else {
        setNotification({ message: data.message || 'Failed to delete alarm', type: 'error' });
      }
    } catch (err) {
      console.error('Failed to delete alarm:', err);
      setNotification({ message: 'Something went wrong while deleting the alarm.', type: 'error' });
    }
  };

  const handleDeleteWarning =async (id: number) => {
    try {
      setDeletingWarningId(id)

      const isReportsLogin = localStorage.getItem("onlyReports") === "true";
      const access_token = sessionStorage.getItem("access_token");

      const endpoint = isReportsLogin
      ?"/api/reports/alarms/delete-warning"
      :"/api/alarms/delete-warning";

      const headers :Record<string,string> = {
        'Content-Type': 'application/json',
      }

      if(isReportsLogin && access_token){
        headers["Authorization"] = `${access_token}`
      }

      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers,
        credentials: isReportsLogin?"omit":"include" ,
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        setWarnings((prev) => prev.filter((warning) => warning.id !== id));
        setNotification({ message: data.message || 'Warning deleted successfully', type: 'success' });
      } else {
        setNotification({ message: data.message || 'Failed to delete warning', type: 'error' });
      }
    } catch (err) {
      console.error('Failed to delete warning:', err);
      setNotification({ message: 'Something went wrong while deleting the warning.', type: 'error' });
    }
  };


  // for Translations
  const lang = useSelector((state:RootState)=>state.language.language);
  const alarmss = translate(alarmHomePageTranslations,lang,"alarms");
  const warningss = translate(alarmHomePageTranslations,lang,"warnings");
  const deletee = translate(alarmHomePageTranslations,lang,"delete");
  const deletedAlarm = translate(alarmHomePageTranslations,lang,"deletedAlarm");
  const deletedWarning = translate(alarmHomePageTranslations,lang,"deletedWarning");

  return (
    <div className={`p-4 space-y-6 ${alarmss.className}`}>
      {/* Tab Selector */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${selectedTab === 'alarms' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('alarms')}
        >
          {alarmss.text}
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedTab === 'warnings' ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('warnings')}
        >
          {warningss.text}
        </button>
      </div>

      {/* Content */}
      {selectedTab === 'alarms' ? (
        <div>
          {loadingAlarms ? (
            <div className="flex justify-center">
              <div className="h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : alarms.length === 0 ? (
            <p className="text-sm text-gray-500">No alarms found.</p>
          ) : (
            <ul className="space-y-2">
              {alarms.map((alarm) => (
                <li
                  key={alarm.id}
                  className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded"
                >
                  <div>
                    <p className="font-medium text-red-700">{alarm.message}</p>
                    <p className="text-xs text-gray-500">{getRelativeTime(alarm.date)}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAlarm(alarm.id)}
                    className={` ${deletee.className} text-sm text-red-600 hover:underline flex items-center gap-1`}
                    disabled={deletingAlarmId === alarm.id}
                  >
                    {deletingAlarmId === alarm.id ? (
                      <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      `${deletee.text}`
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div>
          {loadingWarnings ? (
            <div className="flex justify-center">
              <div className="h-6 w-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : warnings.length === 0 ? (
            <p className="text-sm text-gray-500">No warnings found.</p>
          ) : (
            <ul className="space-y-2">
              {warnings.map((warning) => (
                <li
                  key={warning.id}
                  className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded"
                >
                  <div>
                    <p className="font-medium text-yellow-700">{warning.message}</p>
                    <p className="text-xs text-gray-500">{getRelativeTime(warning.date)}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteWarning(warning.id)}
                    className={`${deletee.className} text-sm text-yellow-700 hover:underline`}
                    disabled={deletingWarningId === warning.id}
                  >
                    {deletingWarningId === warning.id ? (
                      <div className="h-4 w-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      `${deletee.text}`
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
