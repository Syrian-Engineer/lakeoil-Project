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




// 'use client';

// import { useEffect, useState } from 'react';
// import { routes } from '@/config/routes';
// import { FaPumpSoap } from 'react-icons/fa';
// import { GiWaterTank } from 'react-icons/gi';
// import { MdPerson, MdGroup } from 'react-icons/md';
// import { FiSettings, FiAlertCircle } from 'react-icons/fi';
// import { FaChartBar } from 'react-icons/fa';
// import { TbReportSearch } from "react-icons/tb";
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { translate } from '@/translations/translate';
// import { menuItemTranslations } from '@/translations/sideBar/menuItemTranslations';


// export interface MenuItem {
//   name: string;
//   href: string;
//   icon: React.ReactNode;
//   badge?: string;
// }

// function getMenuItems(): MenuItem[] {
//   // for translation 
//   const lang = useSelector((state:RootState)=>state.language.language);
//   const pumps = translate(menuItemTranslations,lang,"pumps");
//   const tanks = translate(menuItemTranslations,lang,"tanks");
//   const sales_reports = translate(menuItemTranslations,lang,"sales_reports");
//   const periodic_reports = translate(menuItemTranslations,lang,"periodic_reports");
//   const customers = translate(menuItemTranslations,lang,"customers");
//   const staff = translate(menuItemTranslations,lang,"staff");
//   const alarms = translate(menuItemTranslations,lang,"alarms");
//   const settings = translate(menuItemTranslations,lang,"settings");

//   const onlyReports = localStorage.getItem('onlyReports');
//   if (onlyReports === 'true') {
//     return [
//       {
//         name: `${sales_reports}`,
//         href: '/reports',
//         icon: <FaChartBar />,
//       },
//       {
//         name: `${periodic_reports}`,
//         href: '/reports/preodic-reports',
//         icon: <TbReportSearch />,
//       },
//     ];
//   }

//   return [
//     {
//       name: `${pumps}`,
//       href: '/pumps',
//       icon: <FaPumpSoap />,
//     },
//     {
//       name: `${tanks}`,
//       href: routes.Tanks.dashboard,
//       icon: <GiWaterTank />,
//     },
//     {
//       name: `${sales_reports}`,
//       href: routes.Reports.dashboard,
//       icon: <FaChartBar />,
//       badge: 'NEW',
//     },
//     {
//       name: `${customers}`,
//       href: routes.Customers.dashboard,
//       icon: <MdPerson />,
//     },
//     {
//       name: `${staff}`,
//       href: routes.Staff.dashboard,
//       icon: <MdGroup />,
//     },
//     {
//       name: `${alarms}`,
//       href: routes.Alarms.dashboard,
//       icon: <FiAlertCircle />,
//     },
//     {
//       name: `${settings}`,
//       href: routes.Settings.dashboard,
//       icon: <FiSettings />,
//     },
//   ];
// }

// export default function useMenuItems(): MenuItem[] {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

//   useEffect(() => {
//     const updateMenu = () => {
//       setMenuItems(getMenuItems());
//     };

//     // Initial load
//     updateMenu();

//     // Listen for localStorage changes
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === 'onlyReports') {
//         updateMenu();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     // For same-tab updates (manual dispatch)
//     window.addEventListener('onlyReportsChange', updateMenu as EventListener);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('onlyReportsChange', updateMenu as EventListener);
//     };
//   }, []);

//   return menuItems;
// }









'use client';

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { FaGasPump } from "react-icons/fa";
import { GiFuelTank } from "react-icons/gi";
import { MdPerson, MdGroup } from 'react-icons/md';
import { FiSettings, FiAlertCircle } from 'react-icons/fi';
import { FaChartBar } from 'react-icons/fa';
import { TbReportSearch } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { menuItemTranslations } from '@/translations/sideBar/menuItemTranslations';
import { FaCity } from "react-icons/fa";



export interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}


export default function useMenuItems(): MenuItem[] {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const lang = useSelector((state: RootState) => state.language.language); // ✅ move here

  useEffect(() => {
    const pumps = translate(menuItemTranslations, lang, "pumps");
    const tanks = translate(menuItemTranslations, lang, "tanks");
    const sales_reports = translate(menuItemTranslations, lang, "sales_reports");
    const periodic_reports = translate(menuItemTranslations, lang, "periodic_reports");
    const customers = translate(menuItemTranslations, lang, "customers");
    const staff = translate(menuItemTranslations, lang, "staff");
    const alarms = translate(menuItemTranslations, lang, "alarms");
    const settings = translate(menuItemTranslations, lang, "settings");
    const stations = translate(menuItemTranslations,lang,"stations")

    const onlyReports = localStorage.getItem("onlyReports");

    const newMenu: MenuItem[] =
      onlyReports === "true"
        ? [
            {
              name: sales_reports.text,
              href: "/reports",
              icon: <FaChartBar />,
            },
            {
              name: periodic_reports.text,
              href: "/reports/preodic-reports",
              icon: <TbReportSearch />,
            },
            {
              name: "Daily-Reports",
              href: "/daily-reports",
              icon: <TbReportSearch />,
            },
            {
              name: stations.text,
              href: "/station",
              icon: <FaCity />,
            },
            {
              name: customers.text,
              href: routes.Customers.dashboard,
              icon: <MdPerson />,
            },
            {
              name: staff.text,
              href: routes.Staff.dashboard,
              icon: <MdGroup />,
            },
            {
              name: alarms.text,
              href: routes.Alarms.dashboard,
              icon: <FiAlertCircle />,
            },
            {
              name: settings.text,
              href: routes.Settings.dashboard,
              icon: <FiSettings />,
            },
          ]
        : [
            {
              name: pumps.text,
              href: "/pumps",
              icon: <FaGasPump />,
            },
            {
              name: tanks.text,
              href: routes.Tanks.dashboard,
              icon: <GiFuelTank />,
            },
            // {
            //   name: sales_reports.text,
            //   href: routes.Reports.dashboard,
            //   icon: <FaChartBar />,
            //   badge: "NEW",
            // },
            {
              name: customers.text,
              href: routes.Customers.dashboard,
              icon: <MdPerson />,
            },
            {
              name: stations.text,
              href: "/station",
              icon: <FaCity />,
            },
            {
              name: staff.text,
              href: routes.Staff.dashboard,
              icon: <MdGroup />,
            },
            {
              name: alarms.text,
              href: routes.Alarms.dashboard,
              icon: <FiAlertCircle />,
            },
            {
              name: settings.text,
              href: routes.Settings.dashboard,
              icon: <FiSettings />,
            },
          ];

    setMenuItems(newMenu);
  }, [lang]);

  return menuItems;
}
