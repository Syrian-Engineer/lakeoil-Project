import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {

    const accessToken = req.headers.get("Authorization");

    const { searchParams } = new URL(req.url);
    const id =  searchParams.get("id");

    if(!id){
       return NextResponse.json(
        { error: "Station ID is required in query parameters." },
        { status: 400 }
      );
    }

    const response = await fetch(`http://78.189.54.28:3800/stationinfo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Station not found" }, { status: 404 });
      }
      return NextResponse.json({ error: "Failed to Delete Station" }, { status: response.status });
    }

        let result;
        try {
          result = await response.json();
        } catch {
          result = { message: "Station deleted successfully." };
        }

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
