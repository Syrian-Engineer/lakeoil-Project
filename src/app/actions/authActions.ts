"use server"
 export async function loginAction(email:string,password:string){
    try{
        const response = await fetch("http://78.189.54.28:2500/auth/login",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({email,password}),
            cache:"no-cache"
        })
        const result = await response.json();
        const token = result?.data

        if(!response.ok || !token?.access_token){
            throw new Error(result.error || "Login failed")
        }

        return{
            access_token : token.access_token,
            refresh_token: token.refresh_token,        
        }

    }catch(error:any){
        console.error("Login failed:", error.message);
        throw error;
    }
 }
 