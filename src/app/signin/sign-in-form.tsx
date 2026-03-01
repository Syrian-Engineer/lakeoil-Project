// "use client";

// import { useState } from "react";
// import { translate } from "@/translations/translate";
// import { signInFormTranslations } from "@/translations/signinPage/signinFrom";
// import { useRouter } from "next/navigation";
// import { Input, Button, Title, Text, Password } from "rizzui";
// import { PiArrowRightBold } from "react-icons/pi";

// export default function SignInForm() {
//   const lang = "en";
//   const loginText = translate(signInFormTranslations, lang, "login");
//   const passwordText = translate(signInFormTranslations, lang, "password");

//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const SuperAdminDetails = {
//     email: 'ak4tek@admin.com',
//     password: '!Ak4tek12*',
//   };


//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         "/api/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Login failed");
//       }

//       const result = await response.json();

//       const accessToken = result?.data?.access_token;
//       const userRecord = result?.data?.user_record;

//       if (!accessToken) {
//         throw new Error("Login failed: no token received");
//       }
//       if(
//         email === SuperAdminDetails.email
//         && password === SuperAdminDetails.password
//       ){
//         localStorage.setItem("isSuperAdmin","true")
//       }
//       // Save token and user info in sessionStorage
//       sessionStorage.setItem("access_token", accessToken);
//       sessionStorage.setItem("user_record", JSON.stringify(userRecord));
//       localStorage.setItem("email",email)
//       // Optionally store isSuperAdmin flag
//       const isSuperAdmin = userRecord?.roles?.name === "SuperAdmin";
//       sessionStorage.setItem("isSuperAdmin", isSuperAdmin ? "true" : "false");

//       router.push("/reports");
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <form onSubmit={handleLogin} className="space-y-5">
//         {/* Email Field */}
//         <Input
//           type="email"
//           size="lg"
//           name="email"
//           label="Email"
//           required
//           placeholder="Enter your email"
//           className="[&>label>span]:font-medium"
//           inputClassName="text-sm"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password Field */}
//         <Password
//           label={"password"}
//           placeholder="Enter your password"
//           size="lg"
//           name="password"
//           required
//           className={`[&>label>span]:font-medium`}
//           inputClassName="text-sm"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* Submit Button */}
//         <Button className={`w-full`} type="submit" size="lg" disabled={loading}>
//           {loading ? (
//             <div className="flex items-center justify-center gap-2">
//               <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//               <span>Logging in...</span>
//             </div>
//           ) : (
//             <>
//               <span>{"login"}</span>
//               <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
//             </>
//           )}
//         </Button>
//       </form>

//       <Text className={`mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start`} />
//     </>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import { translate } from "@/translations/translate";
import { signInFormTranslations } from "@/translations/signinPage/signinFrom";
import { useRouter } from "next/navigation";
import { Input, Button, Title, Text, Password } from "rizzui";
import { PiArrowRightBold } from "react-icons/pi";

export default function SignInForm() {
  const lang = "en";
  const loginText = translate(signInFormTranslations, lang, "login");
  const passwordText = translate(signInFormTranslations, lang, "password");

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  const LOCAL_SERVER = "http://192.168.8.224:3000";
  const CENTRAL_SERVER = "http://central.oktin.ak4tek.com:3950";

  useEffect(() => {
    const saved = localStorage.getItem("backend_url");
    if (saved) setSelectedServer(saved);
  }, []);

  function chooseServer(url: string) {
    localStorage.setItem("backend_url", url);
    setSelectedServer(url);
  }

  const SuperAdminDetails = {
    email: "ak4tek@admin.com",
    password: "!Ak4tek12*",
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedServer) {
      setError("Please select a server first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-backend-url": selectedServer, // 🔥 send selected server
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();

      const accessToken = result?.data?.access_token;
      const userRecord = result?.data?.user_record;

      if (!accessToken) {
        throw new Error("Login failed: no token received");
      }

      if (
        email === SuperAdminDetails.email &&
        password === SuperAdminDetails.password
      ) {
        localStorage.setItem("isSuperAdmin", "true");
      }

      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("user_record", JSON.stringify(userRecord));
      localStorage.setItem("email", email);

      const isSuperAdmin = userRecord?.roles?.name === "SuperAdmin";
      sessionStorage.setItem("isSuperAdmin", isSuperAdmin ? "true" : "false");

      router.push("/reports");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🔵 SERVER SELECTION */}
      <div className="mb-6 space-y-3">
        <Title as="h6">Select Server</Title>

        <div className="flex gap-3">
          <Button
            type="button"
            variant={selectedServer === LOCAL_SERVER ? "solid" : "outline"}
            onClick={() => chooseServer(LOCAL_SERVER)}
            className="w-full"
          >
            🏠 Local Server
          </Button>

          <Button
            type="button"
            variant={selectedServer === CENTRAL_SERVER ? "solid" : "outline"}
            onClick={() => chooseServer(CENTRAL_SERVER)}
            className="w-full"
          >
            🌍 Central Server
          </Button>
        </div>
      </div>

      {/* 🔐 LOGIN FORM */}
      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          type="email"
          size="lg"
          name="email"
          label="Email"
          required
          placeholder="Enter your email"
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Password
          label={"Password"}
          placeholder="Enter your password"
          size="lg"
          name="password"
          required
          className="[&>label>span]:font-medium"
          inputClassName="text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Text className="text-red-500 text-sm">{error}</Text>
        )}

        <Button className="w-full" type="submit" size="lg" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Logging in...</span>
            </div>
          ) : (
            <>
              <span>Login</span>
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start" />
    </>
  );
}
