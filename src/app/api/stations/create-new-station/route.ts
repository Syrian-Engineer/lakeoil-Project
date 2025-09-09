import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const body = await req.json();

        const accessToken = req.headers.get("authorization")

        const response = await fetch("http://central.oktin.ak4tek.com:3950/stationinfo",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization:`${accessToken}`
            },
            body:JSON.stringify(body)
        });

        if (!response.ok) {
            if(response.status === 409){
                return NextResponse.json(
                    {error:"Distributor ID already exists"},
                    {status:response.status}
                )
            }
            return NextResponse.json(
                { error: "Failed to forward request"},
                { status: response.status }
            );
            }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });

    }catch(error:any){
        console.error("API Route Error:", error);
            return NextResponse.json(
            { error: "Internal Server Error", message: error.message }
            );
        }
}