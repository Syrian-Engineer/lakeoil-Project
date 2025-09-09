
// "use server";

// export async function loginAction(formData:FormData) {
//   const email = formData.get("email");
//   const password = formData.get("password");

//   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error("Login failed");
//   }

//   const data = await response.json();
//   // save token in sessionStorage on the client side
//   return data;
// }



"use server";

interface LoginPayload {
  email: string;
  password: string;
}

export async function loginAction({ email, password }: LoginPayload) {
  const response = await fetch(
    `http://central.oktin.ak4tek.com:3950/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
}
