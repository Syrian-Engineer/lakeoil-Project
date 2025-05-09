// 'use client';

// import { useEffect, useState } from 'react';
// import { routes } from '@/config/routes';
// import { FaPumpSoap } from 'react-icons/fa';
// import { GiWaterTank } from 'react-icons/gi';
// import { MdPerson, MdGroup } from 'react-icons/md';
// import { FiSettings, FiAlertCircle } from 'react-icons/fi';
// import { FaChartBar } from 'react-icons/fa';

// export interface MenuItem {
//   name: string;
//   href: string;
//   icon: React.ReactNode;
//   badge?: string;
// }

// export default function useMenuItems(): MenuItem[] {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

//   useEffect(() => {
//     const onlyReports = localStorage.getItem("onlyReports");

//     if (onlyReports === "true") {
//       setMenuItems([
//         {
//           name: "Sales Reports",
//           href: "/sales-reports",
//           icon: <FaChartBar />,
//         },
//         {
//           name: "Periodic Reports",
//           href: "/periodic-reports",
//           icon: <FaChartBar />,
//         },
//       ]);
//     } else {
//       setMenuItems([
//         {
//           name: "Pumps",
//           href: "/pumps",
//           icon: <FaPumpSoap />,
//         },
//         {
//           name: "Tanks",
//           href: routes.Tanks.dashboard,
//           icon: <GiWaterTank />,
//         },
//         {
//           name: "Reports",
//           href: routes.Reports.dashboard,
//           icon: <FaChartBar />,
//           badge: "NEW",
//         },
//         {
//           name: "Customers",
//           href: routes.Customers.dashboard,
//           icon: <MdPerson />,
//         },
//         {
//           name: "Staff",
//           href: routes.Staff.dashboard,
//           icon: <MdGroup />,
//         },
//         {
//           name: "Alarms",
//           href: routes.Alarms.dashboard,
//           icon: <FiAlertCircle />,
//         },
//         {
//           name: "Settings",
//           href: routes.Settings.dashboard,
//           icon: <FiSettings />,
//         },
//       ]);
//     }
//   }, []);

//   return menuItems;
// }




'use client';

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { FaPumpSoap } from 'react-icons/fa';
import { GiWaterTank } from 'react-icons/gi';
import { MdPerson, MdGroup } from 'react-icons/md';
import { FiSettings, FiAlertCircle } from 'react-icons/fi';
import { FaChartBar } from 'react-icons/fa';
import { TbReportSearch } from "react-icons/tb";


export interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

function getMenuItems(): MenuItem[] {
  const onlyReports = localStorage.getItem('onlyReports');
  if (onlyReports === 'true') {
    return [
      {
        name: 'Sales Reports',
        href: '/reports',
        icon: <FaChartBar />,
      },
      {
        name: 'Periodic Reports',
        href: '/reports/preodic-reports',
        icon: <TbReportSearch />,
      },
    ];
  }

  return [
    {
      name: 'Pumps',
      href: '/pumps',
      icon: <FaPumpSoap />,
    },
    {
      name: 'Tanks',
      href: routes.Tanks.dashboard,
      icon: <GiWaterTank />,
    },
    {
      name: 'Reports',
      href: routes.Reports.dashboard,
      icon: <FaChartBar />,
      badge: 'NEW',
    },
    {
      name: 'Customers',
      href: routes.Customers.dashboard,
      icon: <MdPerson />,
    },
    {
      name: 'Staff',
      href: routes.Staff.dashboard,
      icon: <MdGroup />,
    },
    {
      name: 'Alarms',
      href: routes.Alarms.dashboard,
      icon: <FiAlertCircle />,
    },
    {
      name: 'Settings',
      href: routes.Settings.dashboard,
      icon: <FiSettings />,
    },
  ];
}

export default function useMenuItems(): MenuItem[] {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const updateMenu = () => {
      setMenuItems(getMenuItems());
    };

    // Initial load
    updateMenu();

    // Listen for localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'onlyReports') {
        updateMenu();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // For same-tab updates (manual dispatch)
    window.addEventListener('onlyReportsChange', updateMenu as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('onlyReportsChange', updateMenu as EventListener);
    };
  }, []);

  return menuItems;
}
