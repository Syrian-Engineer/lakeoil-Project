import { routes } from "@/config/routes";
// import { DUMMY_ID } from "@/config/constants";
import {
  // PiShoppingCartDuotone,
  // PiHeadsetDuotone,
  // PiPackageDuotone,
  // PiChartBarDuotone,
  // PiCurrencyDollarDuotone,
  // PiSquaresFourDuotone,
  // PiGridFourDuotone,
  // PiFeatherDuotone,
  // PiChartLineUpDuotone,
  // PiMapPinLineDuotone,
  // PiUserGearDuotone,
  // PiBellSimpleRingingDuotone,
  // PiUserDuotone,
  // PiEnvelopeSimpleOpenDuotone,
  // PiStepsDuotone,
  // PiCreditCardDuotone,
  // PiTableDuotone,
  // PiBrowserDuotone,
  // PiHourglassSimpleDuotone,
  // PiUserCircleDuotone,
  // PiShootingStarDuotone,
  // PiRocketLaunchDuotone,
  // PiFolderLockDuotone,
  // PiBinocularsDuotone,
  // PiHammerDuotone,
  // PiNoteBlankDuotone,
  // PiUserPlusDuotone,
  // PiShieldCheckDuotone,
  // PiLockKeyDuotone,
  // PiChatCenteredDotsDuotone,
  // PiCalendarPlusDuotone,
  // PiEnvelopeDuotone,
  // PiCurrencyCircleDollarDuotone,
  // PiBriefcaseDuotone,
  // PiHouseLineDuotone,
  // PiAirplaneTiltDuotone,
  // PiFolder,
  // PiCaretCircleUpDownDuotone,
  // PiListNumbersDuotone,
  // PiCoinDuotone,
  // PiUserSquareDuotone,
  // PiShapesDuotone,
  // PiNewspaperClippingDuotone,
} from "react-icons/pi";
import { FaPumpSoap } from 'react-icons/fa';
import { GiWaterTank } from 'react-icons/gi';
import { MdPerson } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { MdGroup } from 'react-icons/md';
import { FiAlertCircle } from 'react-icons/fi';
import { FaChartBar } from 'react-icons/fa';


// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: "Pumps",
    href: "/pumps",
    icon: <FaPumpSoap />,
  },
  {
    name: "Tanks",
    href: routes.Tanks.dashboard,
    icon: <GiWaterTank />,
  },
  {
    name: "Reports",
    href: routes.Reports.dashboard,
    icon: <FaChartBar />,
    badge: "NEW",
  },
  {
    name: "Customers",
    href: routes.Customers.dashboard,
    icon: <MdPerson />,
  },
  {
    name: "Staff",
    href: routes.Staff.dashboard,
    icon: <MdGroup />,
  },
  {
    name: "Alarms",
    href: routes.Alarms.dashboard,
    icon: <FiAlertCircle />,
  },
  {
    name: "Settings",
    href: routes.Settings.dashboard,
    icon: <FiSettings />,
  },
];
