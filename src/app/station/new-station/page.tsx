'use client';

import { useForm } from 'react-hook-form';
import { Button } from 'rizzui';
import { stationProps } from '../page';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Section from '@/components/Section';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { newStationPageTranslations } from '@/translations/stationPage/newStation';



export default function Page() {
    const route = useRouter();
    const form = useForm<stationProps>();
    const {register,handleSubmit} = form
    const [selectedSection, setSelectedSection] = useState("basic_station_info");
    

  const handleFormSubmit = async (newStation:stationProps)=>{
    try{

        const accessToken = sessionStorage.getItem("access_token");

        if (!accessToken) {
            console.warn("No token found in sessionStorage")
            return
            }
        
            const response = await fetch("/api/stations/create-new-station",{
                method:"POST",
                headers:{
                    Authorization:`${accessToken}`
                },
                body:JSON.stringify({
                    Distributor_Id: newStation.Distributor_Id,
                    RetailStationName: newStation.RetailStationName,
                    EWURALicenseNo: newStation.EWURALicenseNo,
                    EWURA_URL: newStation.EWURA_URL,
                    OperatorTin: newStation.OperatorTin,
                    Operator_XTin: newStation.Operator_XTin,
                    OperatorVrn: newStation.OperatorVrn,
                    OperatorUIN: newStation.OperatorUIN,
                    OperatorName: newStation.OperatorName,
                    LicenseeTraSerialNo: newStation.LicenseeTraSerialNo,
                    RegionName: newStation.RegionName,
                    DistrictName: newStation.DistrictName,
                    WardName: newStation.WardName,
                    Zone: newStation.Zone,
                    ContactPersonEmailAddress: newStation.ContactPersonEmailAddress,
                    ContactPersonPhone: newStation.ContactPersonPhone,
                    default_printer_IP: newStation.default_printer_IP,
                    station_url_or_IP: newStation.station_url_or_IP,
                    VFD_provider: newStation.VFD_provider,
                    VFD_provider_URL: newStation.VFD_provider_URL,
                    VFD_provider_userName: newStation.VFD_provider_userName,
                    VFD_provider_userPass: newStation.VFD_provider_userPass,
                    VFD_provider_TAPIkey: newStation.VFD_provider_TAPIkey,
                    Tax_office:newStation.Tax_office,
                    automation_server_url:newStation.automation_server_url,
                    automation_server_username:newStation.automation_server_username,
                    automation_server_pass:newStation.automation_server_pass,
                    TotalNoTanks:newStation.TotalNoTanks,
                    x_active_business:newStation.x_active_business,
                    mobile_group1:newStation.mobile_group1,
                    mobile_group2:newStation.mobile_group2
                })
            })

        if (!response.ok) {
            const err = await response.json();
            console.error("Submission failed:", err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: err?.error || 'Something went wrong!',
            });
            return;
            }

        const data = await response.json();
        
        // ✅ Show success Swal
        Swal.fire({
        icon: 'success',
        title: 'Station Added',
        text: 'The station was added successfully!',
        confirmButtonColor: '#16a34a', // Tailwind green-600
        }).then(()=>{
            route.push("/station")
        });


    }catch(error:any){
        console.error(error);

            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error?.message || 'An unexpected error occurred.',
            });
    }
  }




    // Function to handle scroll event and update the selected section
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section") as NodeListOf<HTMLElement>;
      let currentSection: string = ""; // Default section
    
      // Get the scroll position of the page
      const scrollPosition = window.scrollY;
    
      sections.forEach((section: HTMLElement) => {
        const sectionTop = section.offsetTop; // The distance of the section from the top of the document
        const sectionHeight = section.offsetHeight; // The height of the section
    
        // Adjust the threshold to handle larger gaps
        const threshold = 210; // You can adjust this to match your gap value (gap-44 corresponds to ~11rem)
    
        // Check if the section is in view
        if (scrollPosition + threshold >= sectionTop && scrollPosition + threshold < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });
    
      setSelectedSection(currentSection);
    };

    // Attach scroll event listener when component mounts
    useEffect(() => {
      // Scroll to the top after page reload
      setTimeout(() => {
        window.scrollTo(0, 0); // Ensure scroll position is reset after page load
      }, 100); // Delay for 100 milliseconds (can adjust as needed)

      // Set default section to Home when the page is reloaded
      setSelectedSection("basic_station_info");

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []); // Empty dependency array ensures this only runs once on mount

    const handleSectionClick = (section: string) => {
      setSelectedSection(section);

      const element = document.getElementById(section);
      if (element) {
        const offset = 200;
        const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    // for translations 
    const lang = useSelector((state:RootState)=>state.language.language);
    const basicStationInfo = translate(newStationPageTranslations,lang,"basicStationInfo");
    const operatorDetails = translate(newStationPageTranslations,lang,"operatorDetails");
    const contanctStationInfo = translate(newStationPageTranslations,lang,"contanctStationInfo");
    const VFDAutomation = translate(newStationPageTranslations,lang,"VFDAutomation");
    const stationName = translate(newStationPageTranslations,lang,"stationName");
    const EWURALicenseNo = translate(newStationPageTranslations,lang,"EWURALicenseNo");
    const EWURAUrl = translate(newStationPageTranslations,lang,"EWURAUrl");
    const distributorId = translate(newStationPageTranslations,lang,"distributorId");
    const operatorName = translate(newStationPageTranslations,lang,"operatorName");
    const licenseTraSerialNo = translate(newStationPageTranslations,lang,"licenseTraSerialNo");
    const regionName = translate(newStationPageTranslations,lang,"regionName");
    const districtName = translate(newStationPageTranslations,lang,"districtName");
    const wardName = translate(newStationPageTranslations,lang,"wardName");
    const zone = translate(newStationPageTranslations,lang,"zone");
    const contactEmail = translate(newStationPageTranslations,lang,"contactEmail");
    const contactPhone = translate(newStationPageTranslations,lang,"contactPhone");
    const printerIP = translate(newStationPageTranslations,lang,"printerIP");
    const stationUrlIP = translate(newStationPageTranslations,lang,"stationUrlIP");
    const businessType = translate(newStationPageTranslations,lang,"businessType");
    const totalNumberOfTanks = translate(newStationPageTranslations,lang,"totalNumberOfTanks");
    const mobileGroup1 = translate(newStationPageTranslations,lang,"mobileGroup1");
    const mobileGroup2 = translate(newStationPageTranslations,lang,"mobileGroup2");
    const taxOffice = translate(newStationPageTranslations,lang,"taxOffice");
    const addStation = translate(newStationPageTranslations,lang,"addStation");

  return (
    <div className={`flex flex-col gap-2 p-4 scroll-smooth ${basicStationInfo.className}`}>
        <div className="hidden lg:block  fixed z-50 bg-white top-16 w-full px-6  py-2 border-b border-gray-200 rounded-sm">
          <div className=" w-2/3 flex justify-between items-center space-x-4 text-sm font-medium text-gray-700">
            <Section 
             title={`${basicStationInfo.text}`} 
             href='basic_station_info'
             isSelected={selectedSection ==="basic_station_info"} 
             onClick={()=> handleSectionClick("basic_station_info")}  />
             
            <Section 
             title={`${operatorDetails.text}`} 
             href='operator_details'
             isSelected={selectedSection === "operator_details"} 
             onClick={()=> handleSectionClick("operator_details")}  />

            <Section 
             title={`${contanctStationInfo.text}`} 
             href='cotatact_station_info'
             isSelected={selectedSection === "cotatact_station_info"} 
             onClick={()=> handleSectionClick("cotatact_station_info")}  />

            <Section 
             title={`${VFDAutomation.text}`}
             href='VFD_automation'
             isSelected={selectedSection === "VFD_automation"} 
             onClick={()=> handleSectionClick("VFD_automation")}  />                            
          </div>
        </div>
        {/* Form Sections */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-28 mt-8">
            {/* Info 1 */}
           <div className=" section space-y-4 scroll-mt-24" id='basic_station_info'>
              <h2 className="text-xl font-bold">{basicStationInfo.text}</h2>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap3 lg:grid-cols-3 lg:gap-4">
                <div className="flex flex-col gap-1 hover:scale-95 transition-all duration-300">
                  <label className={`text-sm font-medium text-gray-700 `}>{stationName.text}</label>
                  <input placeholder="Retail Station Name" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("RetailStationName")} />
                </div>
                <div className="flex flex-col gap-1 hover:scale-95 transition-all duration-300">
                  <label className="text-sm font-medium text-gray-700 ">{EWURALicenseNo.text}</label>
                  <input placeholder="EWURA License No" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("EWURALicenseNo")} />
                </div>
                <div className="flex flex-col gap-1 hover:scale-95 transition-all duration-300">
                  <label className="text-sm font-medium text-gray-700 ">{EWURAUrl.text}</label>
                  <input placeholder="EWURA URL" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("EWURA_URL")} />
                </div>
                <div className="flex flex-col gap-1 hover:scale-95 transition-all duration-300">
                  <label className="text-sm font-medium text-gray-700 ">{distributorId.text}</label>
                  <input placeholder="Distributor ID" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" type="number" {...register("Distributor_Id")} />
                </div>
                <div className="flex flex-col gap-1 hover:scale-95 transition-all duration-300">
                  <label className="text-sm font-medium text-gray-700 ">Operator TIN</label>
                  <input placeholder="Operator TIN" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" type="number" {...register("OperatorTin")} />
                </div>
                <div className="flex flex-col gap-1 hover:scale-95 transition-all duration-300">
                  <label className="text-sm font-medium text-gray-700 ">Operator XTIN</label>
                  <input placeholder="Operator XTIN" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("Operator_XTin")} />
                </div>
                <div className="flex flex-col gap-1 hover:scale-95 transition-all duration-300">
                  <label className="text-sm font-medium text-gray-700 ">Operator VRN</label>
                  <input placeholder="Operator VRN" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("OperatorVrn")} />
                </div>
              </div>
            </div>

            {/* Info 2 */}
            <div className="section space-y-4 scroll-mt-24" id='operator_details'>
              <h2 className="text-xl font-bold">{operatorDetails.text}</h2>
              <div className='grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-4'>
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                    <label className="text-sm font-medium text-gray-700 ">Operator UIN</label>
                    <input placeholder="Operator UIN" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("OperatorUIN")} />     
                </div>
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{operatorName.text}</label>
                  <input placeholder="Operator Name" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("OperatorName")} />
                </div>
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{licenseTraSerialNo.text}</label>
                  <input placeholder="Licensee TRA Serial No" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("LicenseeTraSerialNo")} />
                </div>
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{regionName.text}</label>
                 <input placeholder="Region Name" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("RegionName")} />
                </div>
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{districtName.text}</label>
                 <input placeholder="District Name" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("DistrictName")} />
                </div>
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{wardName.text}</label>
                  <input placeholder="Ward Name" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("WardName")} />
                </div>
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{zone.text}</label>
                  <input placeholder="Zone" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("Zone")} />
                </div>
              </div>
              
            </div>
            {/* Info 3 */}
            <div className="section space-y-4 scroll-mt-24" id='cotatact_station_info'>
              <h2 className="text-xl font-bold">{contanctStationInfo.text}</h2>
              <div className='grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-4'>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{contactEmail.text}</label>                  
                  <input placeholder="Contact Email" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("ContactPersonEmailAddress")} />  
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{contactPhone.text}</label>
                  <input placeholder="Contact Phone" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" type="number" {...register("ContactPersonPhone")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{printerIP.text}</label>
                  <input placeholder="Printer IP" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("default_printer_IP")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{stationUrlIP.text}</label>                  
                  <input placeholder="Station IP/URL" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("station_url_or_IP")} />                  
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{businessType.text}</label>                  
                  <input placeholder="Business Type" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("x_active_business")} />                
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{totalNumberOfTanks.text}</label>
                  <input placeholder="Total Number of Tanks" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" type="number" {...register("TotalNoTanks")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{mobileGroup1.text}</label>
                  <input placeholder="Mobile Group 1 (comma-separated)" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("mobile_group1")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{mobileGroup2.text}</label>
                  <input placeholder="Mobile Group 2 (comma-separated)" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("mobile_group2")} />
                </div>

              </div>
            </div>
            {/* Info 4 */}
            <div className="section space-y-4 scroll-mt-24" id='VFD_automation'>
              <h2 className="text-xl font-bold">{VFDAutomation.text}</h2>
              <div className='grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-4'>
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">VFD Provider</label>
                  <input placeholder="VFD Provider" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("VFD_provider")} />
                </div>
                
                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">VFD Provider URL</label>
                  <input placeholder="VFD Provider URL" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("VFD_provider_URL")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">VFD Username</label>
                  <input placeholder="VFD Username" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("VFD_provider_userName")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">VFD Password</label>
                  <input placeholder="VFD Password" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("VFD_provider_userPass")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">VFD API Key</label>
                  <input placeholder="VFD API Key" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("VFD_provider_TAPIkey")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">{taxOffice.text}</label>
                  <input placeholder="Tax Office" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("Tax_office")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">Automation Server URL</label>
                  <input placeholder="Automation Server URL" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("automation_server_url")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">Automation Username</label>
                  <input placeholder="Automation Username" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("automation_server_username")} />
                </div>

                <div className='flex flex-col gap-1 hover:scale-95 transition-all duration-300'>
                  <label className="text-sm font-medium text-gray-700 ">Automation Password</label>
                  <input placeholder="Automation Password" className="rounded-xl border border-gray-500 hover:border-gray-900 p-2" {...register("automation_server_pass")} />
                </div>
              </div>
            </div>
              {/* Submit Button */}
              <div className='w-full mt-12'>
                <Button 
                  className="w-full mt-4 hover:scale-95 transition-all duration-300" 
                  type='submit'
                  >{addStation.text}</Button>
              </div>
          </div>
      </form>
    </div>
  );
}
