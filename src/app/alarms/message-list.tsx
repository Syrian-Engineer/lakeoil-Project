'use client';

import { useEffect, useState } from 'react';
import { getRelativeTime } from '@/utils/get-relative-time';

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

  return (
    <div className={`fixed top-20 z-50 right-4 px-4 py-2 rounded border shadow ${colors}`}>
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

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const res = await fetch('/api/alarms/get-alarms', { credentials: 'include' });
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
        const res = await fetch('/api/alarms/get-warnings', { credentials: 'include' });
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
      const res = await fetch('/api/alarms/delete-alarm', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
        setNotification({ message: data.message || 'Alarm deleted successfully', type: 'success' });
      } else {
        setNotification({ message: data.message || 'Failed to delete alarm', type: 'error' });
      }
    } catch (err) {
      console.error('Failed to delete alarm:', err);
      setNotification({ message: 'Something went wrong while deleting the alarm.', type: 'error' });
    }
  };

  const handleDeleteWarning = async (id: number) => {
    try {
      const res = await fetch('/api/alarms/delete-warning', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
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

  return (
    <div className="p-4 space-y-6">
      {/* Tab Selector */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${selectedTab === 'alarms' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('alarms')}
        >
          Alarms
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedTab === 'warnings' ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('warnings')}
        >
          Warnings
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
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
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
                    className="text-sm text-yellow-700 hover:underline"
                  >
                    Delete
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
