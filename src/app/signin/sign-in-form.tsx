// "use client";

// import Cookies from "js-cookie";
// import { useState, useTransition } from "react";
// import { PiArrowRightBold } from "react-icons/pi";
// import { Password, Button, Input, Text } from "rizzui";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import { translate } from "@/translations/translate";
// import { signInFormTranslations } from "@/translations/signinPage/signinFrom";
// import { loginAction } from "@/app/actions/authActions";
// import { useRouter } from "next/navigation";

// export default function SignInForm() {
//   const [isPending, startTransition] = useTransition();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const SuperAdminDetails = {
//     email: 'ak4tek@admin.com',
//     password: '!Ak4tek12*',
//   };
//   // Translations
//   const lang = useSelector((state: RootState) => state.language.language);
//   const passwordd = translate(signInFormTranslations, lang, "password");
//   const login = translate(signInFormTranslations, lang, "login");
//   const noAccount = translate(signInFormTranslations, lang, "noAccount");

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     try {
//       const result = await loginAction(formData);

//       if (result?.data?.access_token) {
//         sessionStorage.setItem("access_token", result.data.access_token);

//         // to save the acess_token in the cookies to use it in server components
//         Cookies.set("access_token",result.data.access_token,{
//           path: "/", // ✅ available across the entire site
//           expires: 1, // 1 day
//         })
//         if(
//           email === SuperAdminDetails.email&&
//           password === SuperAdminDetails.password
//         ){
//           localStorage.setItem('isSuperAdmin', 'true');
//         }else{
//           localStorage.setItem('isSuperAdmin', 'false');
//         }
//         alert("Login Successfully")
//         window.location.href = "/reports"; // redirect to reports
//       } else {
//         alert("Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   }
  

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="space-y-5">
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
//           label={passwordd.text}
//           placeholder="Enter your password"
//           size="lg"
//           name="password"
//           required
//           className={`[&>label>span]:font-medium ${passwordd.className}`}
//           inputClassName="text-sm"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* Submit Button */}
//         <Button className={`w-full ${login.className}`} type="submit" size="lg" disabled={isPending}>
//           {isPending ? (
//             <div className="flex items-center justify-center gap-2">
//               <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//               <span>Logging in...</span>
//             </div>
//           ) : (
//             <>
//               <span>{login.text}</span>
//               <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
//             </>
//           )}
//         </Button>
//       </form>

//       <Text className={`mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start ${noAccount.className}`} />
//     </>
//   );
// }






"use client";

import { useState } from "react";
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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();

      const accessToken = result?.data?.access_token;
      const userRecord = result?.data?.user_record;

      if (!accessToken) {
        throw new Error("Login failed: no token received");
      }

      // Save token and user info in sessionStorage
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("user_record", JSON.stringify(userRecord));

      // Optionally store isSuperAdmin flag
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
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email Field */}
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

        {/* Password Field */}
        <Password
          label={"password"}
          placeholder="Enter your password"
          size="lg"
          name="password"
          required
          className={`[&>label>span]:font-medium`}
          inputClassName="text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <Button className={`w-full`} type="submit" size="lg" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Logging in...</span>
            </div>
          ) : (
            <>
              <span>{"login"}</span>
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <Text className={`mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start`} />
    </>
  );
}
