import { cookies } from "next/headers";

export default async function DeleteDailyReport({id}:{id:number}){

  try{
    const access_token = (await cookies()).get("access_token")?.value;

    const response = await fetch(`http://78.189.54.28:3800/daily_report/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
            Authorization: `${access_token}`,
        }
    })
    if(!response.ok){
        return{
            success:false,
            status:response.status,
            message: `Failed to delete report with id ${id}`,

        }
    }
    const result = await response.json();

    return{
        success:true,
        status:response.status,
        message:`Report ${id} Deleted Successfully`
    }

  }catch(error:any){
    return{
        success:false,
        status:500,
        message:error.message || "Unexpected error occurred",
    }
  }
}