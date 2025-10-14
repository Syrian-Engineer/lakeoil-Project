// Define the shape of one station item
interface Station {
  EWURALicenseNo: string;
  RetailStationName: string;
}

// Extract only what you need from your full dataset
const stationList: Station[] = [
  { EWURALicenseNo: "542", RetailStationName: "Nabiah" },
  { EWURALicenseNo: "538", RetailStationName: "Darma" },
  { EWURALicenseNo: "540", RetailStationName: "Auhud" },
  { EWURALicenseNo: "503", RetailStationName: "Sahab 2" },
  { EWURALicenseNo: "501", RetailStationName: "Fursan" },
  { EWURALicenseNo: "505", RetailStationName: "Fahed" },
  { EWURALicenseNo: "564", RetailStationName: "Shubayli" },
  { EWURALicenseNo: "511", RetailStationName: "Azizye 1" },
  { EWURALicenseNo: "513", RetailStationName: "Azizye 2" },
  { EWURALicenseNo: "507", RetailStationName: "Alhala" },
  { EWURALicenseNo: "535", RetailStationName: "Jaber" },
  { EWURALicenseNo: "504", RetailStationName: "Nafajan" },
  { EWURALicenseNo: "545", RetailStationName: "Azizye 3" },
  { EWURALicenseNo: "509", RetailStationName: "West Dammam" },
  { EWURALicenseNo: "570", RetailStationName: "Nairiye" },
];

// Lookup function
export function getStationNameByLicense(EWURALicenseNo: string): string | null {
  const station = stationList.find(
    (s) => s.EWURALicenseNo.trim() === EWURALicenseNo.trim()
  );
  return station ? station.RetailStationName : null;
}
