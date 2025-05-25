import StationCard from "@/widgets/cards/station-card"

export interface stationProps{
     Distributor_Id: number,
     RetailStationName: string,
     EWURALicenseNo: string,
     EWURA_URL: string,
     OperatorTin: number,
     Operator_XTin: string,
     OperatorVrn: string,
     OperatorUIN: string,
     OperatorName: string,
     LicenseeTraSerialNo: string,
     RegionName: string,
     DistrictName: string,
     WardName: string,
     Zone: string,
     ContactPersonEmailAddress: string,
     ContactPersonPhone: number,
     default_printer_IP: string,
     station_url_or_IP: string,
     VFD_provider: string,
     VFD_provider_URL: string,
     VFD_provider_userName: string,
     VFD_provider_userPass: string,
     VFD_provider_TAPIkey: string,
     Tax_office: string,
     automation_server_url: string,
     automation_server_username: string,
     automation_server_pass: string,
     TotalNoTanks: number,
     x_active_business: string,
     mobile_group1:[string],
     mobile_group2:[string],
     id:number,
     created_date:string
}


const mockStations: stationProps[] = [
  {
    Distributor_Id: 1,
    RetailStationName: "Sunrise Fuel Station",
    EWURALicenseNo: "EWURA12345",
    EWURA_URL: "http://ewura.go.tz/license/12345",
    OperatorTin: 123456789,
    Operator_XTin: "XTIN987654321",
    OperatorVrn: "VRN54321",
    OperatorUIN: "UIN12345",
    OperatorName: "John Doe Operators Ltd",
    LicenseeTraSerialNo: "TRA123456",
    RegionName: "Dar es Salaam",
    DistrictName: "Ilala",
    WardName: "Kariakoo",
    Zone: "Coastal",
    ContactPersonEmailAddress: "contact@sunrisestation.com",
    ContactPersonPhone: 255712345678,
    default_printer_IP: "192.168.0.100",
    station_url_or_IP: "http://192.168.0.50",
    VFD_provider: "Smart VFD Ltd",
    VFD_provider_URL: "http://smartvfd.com/api",
    VFD_provider_userName: "vfduser",
    VFD_provider_userPass: "vfdpass",
    VFD_provider_TAPIkey: "apikey123",
    Tax_office: "TRA HQ",
    automation_server_url: "http://auto.server.com",
    automation_server_username: "admin",
    automation_server_pass: "password",
    TotalNoTanks: 3,
    x_active_business: "fuel",
    mobile_group1: ["0712345678"],
    mobile_group2: ["0755123456"],
    id: 1,
    created_date: "2024-01-15"
  },
  {
    Distributor_Id: 2,
    RetailStationName: "Moon Fuel Station",
    EWURALicenseNo: "EWURA12345",
    EWURA_URL: "http://ewura.go.tz/license/12345",
    OperatorTin: 123456789,
    Operator_XTin: "XTIN987654321",
    OperatorVrn: "VRN54321",
    OperatorUIN: "UIN12345",
    OperatorName: "John Doe Operators Ltd",
    LicenseeTraSerialNo: "TRA123456",
    RegionName: "Dar es Salaam",
    DistrictName: "Ilala",
    WardName: "Kariakoo",
    Zone: "Coastal",
    ContactPersonEmailAddress: "contact@sunrisestation.com",
    ContactPersonPhone: 255712345678,
    default_printer_IP: "192.168.0.100",
    station_url_or_IP: "http://192.168.0.50",
    VFD_provider: "Smart VFD Ltd",
    VFD_provider_URL: "http://smartvfd.com/api",
    VFD_provider_userName: "vfduser",
    VFD_provider_userPass: "vfdpass",
    VFD_provider_TAPIkey: "apikey123",
    Tax_office: "TRA HQ",
    automation_server_url: "http://auto.server.com",
    automation_server_username: "admin",
    automation_server_pass: "password",
    TotalNoTanks: 3,
    x_active_business: "fuel",
    mobile_group1: ["0712345678"],
    mobile_group2: ["0755123456"],
    id: 2,
    created_date: "2024-01-15"
  },
];
export default function Page(){




    return(
        <div className="p-4 space-y-4">
            {mockStations.map((station) => (
                <StationCard key={station.id} station={station} />
            ))}
        </div>
    )
}