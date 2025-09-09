import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        const access_token = req.headers.get("Authorization")
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")

        if(!id){
            return NextResponse.json(
                { error: "Station ID is required in query parameters." },
                { status: 400 }
              );
        }

        const response = await fetch(`http://central.oktin.ak4tek.com:3950/stationinfo/${id}`,{
            method:"GET",
            headers:{
                Authorization:`${access_token}`
            }
        })
        
        if(!response.ok){
            if(response.status === 404){
                return NextResponse.json(
                    {message:"Station Not Found"},
                    {status:404}
                )
            }
        }
        const data = await response.json();

        return NextResponse.json(data,{status:200})
            
    }catch(error){
        console.error(error);
        return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
        );        
    }
}