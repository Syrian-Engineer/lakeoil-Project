// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { PiArrowRightBold } from 'react-icons/pi';
// import { Checkbox, Password, Button, Input, Text } from 'rizzui';
// import { routes } from '@/config/routes';
// import { useRouter } from 'next/navigation';
// import { useSetAtom } from 'jotai';
// import { isSuperAdmin } from '@/atoms/superAdminDetails';
// import { LoginSchema } from '@/validators/login.schema';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { translate } from '@/translations/translate';
// import { signInFormTranslations } from '@/translations/signinPage/signinFrom';

// const initialValues: LoginSchema = {
//   email: '',
//   password: '',
//   rememberMe: false,
// };

// export default function SignInForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginType, setLoginType] = useState('reports'); // Default to 'reports'

//   const router = useRouter();

//   const SuperAdminDetails = {
//     email: 'superadmin@admin.com',
//     password: 'ak4tek12',
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     localStorage.setItem("email",email);
//     e.preventDefault();
//     if(typeof window === "undefined"){
//       return;
//     }

//     if(loginType === "reports"){
//       try {
//         const response = await fetch('/api/auth/reports-login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });
  
//         const result = await response.json();
//         console.log('Login result:', result);
  
//         console.log(result)
  
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
//           localStorage.setItem("isSuperAdmin","true");
//         } else {
//           localStorage.setItem("isSuperAdmin","false");
//         }
//         localStorage.setItem("onlyReports","true");
//         window.dispatchEvent(new Event("onlyReportsChange"));

//         setTimeout(() => {
//           router.push('/reports');
//         }, 100);
//       } catch (error) {
//         console.error('Error logging in:', error);
//       }

//     } else if(loginType === "liveData"){
//       try{

//         const response = await fetch('/api/auth/live-data-login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//           credentials: 'include', // 👈 this is important
//         });

//         localStorage.setItem("onlyReports","false");
//         window.dispatchEvent(new Event("onlyReportsChange"));

//         setTimeout(() => {
//           router.push('/');
//         }, 100);
//       }catch(error){
//         console.error(error)
//       }
//     }
//   };

//   // for translations
//   const lang = useSelector((state:RootState)=>state.language.language)
//   const loginTypee = translate(signInFormTranslations,lang,"loginType");
//   const optionReports = translate(signInFormTranslations,lang,"optionReports");
//   const optionLiveData = translate(signInFormTranslations,lang,"optionLiveData");
//   const passwordd = translate(signInFormTranslations,lang,"password");
//   const rememberMe = translate(signInFormTranslations,lang,"rememberMe")
//   const forgetPassword = translate(signInFormTranslations,lang,"forgetPassword")
//   const login = translate(signInFormTranslations,lang,"login")
//   const noAccount = translate(signInFormTranslations,lang,"noAccount")

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <div className="space-y-5">
//           {/* Select Dropdown to choose login type */}
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
//                 lang === "ar" ? "bg-[url('/icons/arrow-left.svg')]" : "bg-[url('/icons/arrow-right.svg')]"
//               }`}
//             >
//               <option value="reports">{optionReports.text}</option>
//               <option value="liveData">{optionLiveData.text}</option>
//             </select>
//           </div>

//           {/* Email/Username Field */}
//           <Input
//             type={loginType === 'liveData' ? 'text' : 'email'} // If "Live Data", change to username
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
          
//           <div className="flex items-center justify-between pb-2">
//             <Checkbox label={rememberMe.text} className={`[&>label>span]:font-medium ${rememberMe.className}`} />
//             <Link
//               href={routes.auth.forgotPassword1}
//               className={`h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline ${forgetPassword.className}`}
//             >
//              {forgetPassword.text}
//             </Link>
//           </div>
          
//           <Button className={`w-full ${login.className}`} type="submit" size="lg">
//             <span>{login.text}</span>{' '}
//             <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
//           </Button>
//         </div>
//       </form>
      
//       <Text className={`mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start ${noAccount.className}`}>
//       </Text>
//     </>
//   );
// }



'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { translate } from '@/translations/translate';
import { signInFormTranslations } from '@/translations/signinPage/signinFrom';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('reports');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const SuperAdminDetails = {
    email: 'superadmin@admin.com',
    password: 'ak4tek12',
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem('email', email);

    if (typeof window === 'undefined') return;

    try {
      if (loginType === 'reports') {
        const response = await fetch('/api/auth/reports-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        const tokens = result?.data;

        if (!response.ok) {
          console.error('Login failed:', result.error || 'Access token missing');
          return;
        }

        sessionStorage.setItem('access_token', tokens.access_token);
        sessionStorage.setItem('refresh_token', tokens.refresh_token);

        if (
          email === SuperAdminDetails.email &&
          password === SuperAdminDetails.password
        ) {
          localStorage.setItem('isSuperAdmin', 'true');
        } else {
          localStorage.setItem('isSuperAdmin', 'false');
        }

        localStorage.setItem('onlyReports', 'true');
        window.dispatchEvent(new Event('onlyReportsChange'));
        router.push('/reports');
      } else if (loginType === 'liveData') {
        const response = await fetch('/api/auth/live-data-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        localStorage.setItem('onlyReports', 'false');
        window.dispatchEvent(new Event('onlyReportsChange'));
        router.push('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  // Translations
  const lang = useSelector((state: RootState) => state.language.language);
  const loginTypee = translate(signInFormTranslations, lang, 'loginType');
  const optionReports = translate(signInFormTranslations, lang, 'optionReports');
  const optionLiveData = translate(signInFormTranslations, lang, 'optionLiveData');
  const passwordd = translate(signInFormTranslations, lang, 'password');
  const rememberMe = translate(signInFormTranslations, lang, 'rememberMe');
  const forgetPassword = translate(signInFormTranslations, lang, 'forgetPassword');
  const login = translate(signInFormTranslations, lang, 'login');
  const noAccount = translate(signInFormTranslations, lang, 'noAccount');

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="space-y-5 ">
          {/* Login Type Select */}
          <div>
            <label htmlFor="loginType" className={`block text-sm font-medium text-gray-700 ${loginTypee.className}`}>
              {loginTypee.text}
            </label>
            <select
              id="loginType"
              name="loginType"
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              className={`${optionReports.className} custom-select mt-1 block w-full p-2.5 border border-gray-300 rounded-md appearance-none bg-no-repeat bg-[right_0.75rem_center] ${
                lang === 'ar'
                  ? "bg-[url('/icons/arrow-left.svg')]"
                  : "bg-[url('/icons/arrow-right.svg')]"
              }`}
            >
              <option value="reports">{optionReports.text}</option>
              <option value="liveData">{optionLiveData.text}</option>
            </select>
          </div>

          {/* Email or Username Field */}
          <Input
            type={loginType === 'liveData' ? 'text' : 'email'}
            size="lg"
            label={loginType === 'liveData' ? 'Username' : 'Email'}
            required
            placeholder={loginType === 'liveData' ? 'Enter your username' : 'Enter your email'}
            className="[&>label>span]:font-medium"
            inputClassName="text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <Password
            label={passwordd.text}
            placeholder="Enter your password"
            size="lg"
            required
            className={`[&>label>span]:font-medium ${passwordd.className}`}
            inputClassName="text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember me & Forgot password */}
          {/* <div className="flex items-center justify-between pb-2">
            <Checkbox label={rememberMe.text} className={`[&>label>span]:font-medium ${rememberMe.className}`} />
            <Link
              href={routes.auth.forgotPassword1}
              className={`h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline ${forgetPassword.className}`}
            >
              {forgetPassword.text}
            </Link>
          </div> */}

          {/* Submit Button with Spinner */}
          <Button className={`w-full ${login.className}`} type="submit" size="lg" disabled={loading}>
            {loading ? (
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
        </div>
      </form>

      <Text className={`mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start ${noAccount.className}`}>
      </Text>
    </>
  );
}
