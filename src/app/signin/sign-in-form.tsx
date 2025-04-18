// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { SubmitHandler } from 'react-hook-form';
// import { PiArrowRightBold } from 'react-icons/pi';
// import { Checkbox, Password, Button, Input, Text } from 'rizzui';
// import { Form } from '@/ui/form';
// import { routes } from '@/config/routes';
// import { loginSchema, LoginSchema } from '@/validators/login.schema';
// import {getAuth} from '../_lib/data-services';


// const initialValues: LoginSchema = {
//   email: '',
//   password: '',
//   rememberMe: false,
// };

// const emaill = "airport@station.com"
// const passwordd = "LAKEOIL2456"

// export default function SignInForm() {
//   //TODO: why we need to reset it here
//   const [reset, setReset] = useState({});
//   const [email,setEmail] = useState("");
//   const[password,setPassword] = useState("");

//   const onSubmit: SubmitHandler<LoginSchema> = () => {
//     const data = getAuth({email,password})
//     console.log(data)
//   };

//   return (
//     <>
//       <Form<LoginSchema>
//         // validationSchema={loginSchema}
//         resetValues={reset}
//         onSubmit={onSubmit}
//         useFormProps={{
//           defaultValues: initialValues,
//         }}
//       >
//         {({ register, formState: { errors } }) => (
//           <div className="space-y-5">
//             <Input
//               type="email"
//               size="lg"
//               label="Email"
//               placeholder="Enter your email"
//               className="[&>label>span]:font-medium"
//               inputClassName="text-sm"
//               {...register('email')}
//               error={errors.email?.message}
//               onChange={(e)=>setEmail(e.target.value)}
//             />
//             <Password
//               label="Password"
//               placeholder="Enter your password"
//               size="lg"
//               className="[&>label>span]:font-medium"
//               inputClassName="text-sm"
//               {...register('password')}
//               error={errors.password?.message}
//               onChange={(e)=>setPassword(e.target.value)}
//             />
//             <div className="flex items-center justify-between pb-2">
//               <Checkbox
//                 {...register('rememberMe')}
//                 label="Remember Me"
//                 className="[&>label>span]:font-medium"
//               />
//               <Link
//                 href={routes.auth.forgotPassword1}
//                 className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
//               >
//                 Forget Password?
//               </Link>
//             </div>
//             <Button className="w-full" type="submit" size="lg">
//               <span>Sign in</span>{' '}
//               <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
//             </Button>
//           </div>
//         )}
//       </Form>
//       <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
//         Don’t have an account?{' '}
//         <Link
//           href={routes.auth.signUp1}
//           className="font-semibold text-gray-700 transition-colors hover:text-blue"
//         >
//           Sign Up
//         </Link>
//       </Text>
//     </>
//   );
// }







'use client'


import Link from 'next/link';
import { useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { routes } from '@/config/routes';
import { LoginSchema } from '@/validators/login.schema';
import { useRouter } from 'next/navigation';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: false,
};

// const emaill = "airport@station.com"
// const passwordd = "LAKEOIL2456"

export default function SignInForm() {
  const [reset, setReset] = useState({});
  const [email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Login failed:', result.data.error);
        return;
      }
      sessionStorage.setItem("access_token",result.data.access_token);
      sessionStorage.setItem("refresh_token",result.data.refresh_token);
      
      router.push("/")

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <form
       onSubmit={onSubmit}
      >
        
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              required
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              required
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                label="Remember Me"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg">
              <span>Sign in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
      </form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}

