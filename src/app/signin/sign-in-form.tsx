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







import { redirect } from "next/navigation";
import { translate } from "@/translations/translate";
import { signInFormTranslations } from "@/translations/signinPage/signinFrom";
import { loginAction } from "@/app/actions/authActions";
import { cookies } from "next/headers";

interface FormDataType {
  email: string;
  password: string;
}

export default function SignInForm() {
  const lang = "en"; // You can get this from your i18n server state
  const loginText = translate(signInFormTranslations, lang, "login");
  const passwordText = translate(signInFormTranslations, lang, "password");

  // Server Action
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    // SuperAdmin logic
    const isSuperAdmin = email === "ak4tek@admin.com" && password === "!Ak4tek12*";

    const result = await loginAction({ email, password });
    if (!result?.data?.access_token) {
      throw new Error("Login failed");
    }

    // Set HTTP-only cookie
    (await
      // Set HTTP-only cookie
      cookies()).set("access_token", result.data.access_token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Optionally set isSuperAdmin flag in cookie as well
    (await
      // Optionally set isSuperAdmin flag in cookie as well
      cookies()).set("isSuperAdmin", isSuperAdmin ? "true" : "false", {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    redirect("/reports");
  }

  return (
    <form action={handleLogin} className="space-y-5">
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label>{passwordText.text}</label>
        <input
          type="password"
          name="password"
          required
          placeholder="Enter your password"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <button
        type="submit"
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loginText.className}`}
      >
        {loginText.text}
      </button>
    </form>
  );
}
