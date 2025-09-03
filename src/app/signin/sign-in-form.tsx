// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { PiArrowRightBold } from 'react-icons/pi';
// import { Checkbox, Password, Button, Input, Text } from 'rizzui';
// import { routes } from '@/config/routes';
// import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { translate } from '@/translations/translate';
// import { signInFormTranslations } from '@/translations/signinPage/signinFrom';

// export default function SignInForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginType, setLoginType] = useState('reports');
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const SuperAdminDetails = {
//     email: 'superadmin@admin.com',
//     password: 'ak4tek12',
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     localStorage.setItem('email', email);

//     if (typeof window === 'undefined') return;

//     try {
//       if (loginType === 'reports') {
//         const response = await fetch('http://78.189.54.28:2500/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });

//         const result = await response.json();
//         const tokens = result?.data;

//         if (!response.ok) {
//           console.error('Login failed:', result.error || 'Access token missing');
//           return;
//         }

//         sessionStorage.setItem('access_token', tokens.access_token);
//         sessionStorage.setItem('refresh_token', tokens.refresh_token);

//         if (
//           email === SuperAdminDetails.email &&
//           password === SuperAdminDetails.password
//         ) {
//           localStorage.setItem('isSuperAdmin', 'true');
//         } else {
//           localStorage.setItem('isSuperAdmin', 'false');
//         }

//         localStorage.setItem('onlyReports', 'true');
//         window.dispatchEvent(new Event('onlyReportsChange'));
//         router.push('/reports');
//       } else if (loginType === 'liveData') {
//         const response = await fetch('/api/auth/live-data-login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//           credentials: 'include',
//         });

//         localStorage.setItem('onlyReports', 'false');
//         window.dispatchEvent(new Event('onlyReportsChange'));
//         router.push('/');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Translations
//   const lang = useSelector((state: RootState) => state.language.language);
//   const loginTypee = translate(signInFormTranslations, lang, 'loginType');
//   const optionReports = translate(signInFormTranslations, lang, 'optionReports');
//   const optionLiveData = translate(signInFormTranslations, lang, 'optionLiveData');
//   const passwordd = translate(signInFormTranslations, lang, 'password');
//   const login = translate(signInFormTranslations, lang, 'login');
//   const noAccount = translate(signInFormTranslations, lang, 'noAccount');

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <div className="space-y-5 ">
//           {/* Login Type Select */}
//           <div>
//             <label htmlFor="loginType" className={`block text-sm font-medium text-gray-700 ${loginTypee.className}`}>
//               {loginTypee.text}
//             </label>
//             <select
//               id="loginType"
//               name="loginType"
//               value={loginType}
//               onChange={(e) => setLoginType(e.target.value)}
//               className={`${optionReports.className} custom-select mt-1 block w-full p-2.5 border border-gray-300 rounded-md appearance-none bg-no-repeat bg-[right_0.75rem_center] ${
//                 lang === 'ar'
//                   ? "bg-[url('/icons/arrow-left.svg')]"
//                   : "bg-[url('/icons/arrow-right.svg')]"
//               }`}
//             >
//               <option value="reports">{optionReports.text}</option>
//               <option value="liveData">{optionLiveData.text}</option>
//             </select>
//           </div>

//           {/* Email or Username Field */}
//           <Input
//             type={loginType === 'liveData' ? 'text' : 'email'}
//             size="lg"
//             label={loginType === 'liveData' ? 'Username' : 'Email'}
//             required
//             placeholder={loginType === 'liveData' ? 'Enter your username' : 'Enter your email'}
//             className="[&>label>span]:font-medium"
//             inputClassName="text-sm"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {/* Password Field */}
//           <Password
//             label={passwordd.text}
//             placeholder="Enter your password"
//             size="lg"
//             required
//             className={`[&>label>span]:font-medium ${passwordd.className}`}
//             inputClassName="text-sm"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* Remember me & Forgot password */}
//           {/* <div className="flex items-center justify-between pb-2">
//             <Checkbox label={rememberMe.text} className={`[&>label>span]:font-medium ${rememberMe.className}`} />
//             <Link
//               href={routes.auth.forgotPassword1}
//               className={`h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline ${forgetPassword.className}`}
//             >
//               {forgetPassword.text}
//             </Link>
//           </div> */}

//           {/* Submit Button with Spinner */}
//           <Button className={`w-full ${login.className}`} type="submit" size="lg" disabled={loading}>
//             {loading ? (
//               <div className="flex items-center justify-center gap-2">
//                 <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                 <span>Logging in...</span>
//               </div>
//             ) : (
//               <>
//                 <span>{login.text}</span>
//                 <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
//               </>
//             )}
//           </Button>
//         </div>
//       </form>

//       <Text className={`mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start ${noAccount.className}`}>
//       </Text>
//     </>
//   );
// }



"use client";

import Cookies from "js-cookie";
import { useState, useTransition } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import { Password, Button, Input, Text } from "rizzui";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { translate } from "@/translations/translate";
import { signInFormTranslations } from "@/translations/signinPage/signinFrom";
import { loginAction } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Translations
  const lang = useSelector((state: RootState) => state.language.language);
  const passwordd = translate(signInFormTranslations, lang, "password");
  const login = translate(signInFormTranslations, lang, "login");
  const noAccount = translate(signInFormTranslations, lang, "noAccount");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const result = await loginAction(formData);

      if (result?.data?.access_token) {
        sessionStorage.setItem("access_token", result.data.access_token);

        // to save the acess_token in the cookies to use it in server components
        Cookies.set("access_token",result.data.access_token,{
          path: "/", // ✅ available across the entire site
          expires: 1, // 1 day
        })

        window.location.href = "/reports"; // redirect to reports
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
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
          label={passwordd.text}
          placeholder="Enter your password"
          size="lg"
          name="password"
          required
          className={`[&>label>span]:font-medium ${passwordd.className}`}
          inputClassName="text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <Button className={`w-full ${login.className}`} type="submit" size="lg" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Logging in...</span>
            </div>
          ) : (
            <>
              <span>{login.text}</span>
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <Text className={`mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start ${noAccount.className}`} />
    </>
  );
}
