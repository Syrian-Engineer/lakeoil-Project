// 'use client';

// import { useForm, Controller, SubmitHandler } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import { Input, Button, Select, Text } from 'rizzui';

// type AddUserFormValues = {
//   username: string;
//   password: string;
//   role: string;
// };

// const roles = [
//   { label: 'Technician', value: 'Technician' },
//   { label: 'Manager', value: 'Manager' },
//   { label: 'Operator', value: 'Operator' },
// ];

// export default function AddUserForm() {
//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<AddUserFormValues>({
//     defaultValues: {
//       username: '',
//       password: '',
//       role: '',
//     },
//   });

//   const onSubmit: SubmitHandler<AddUserFormValues> = async (data) => {
//     try {
//       const isReportsLogin = localStorage.getItem("onlyReports") === "true";
//       const access_token = sessionStorage.getItem("access_token");

//       const endpoint = isReportsLogin
//       ?"/api/reports/staff/new-staff"
//       :"/api/staff/new-staff"

//       const headers :Record<string,string> = {
//         'Content-Type': 'application/json',
//       }

//       if(isReportsLogin && access_token){
//         headers["Authorization"] = `${access_token}`
//       }

//       const response = await fetch(endpoint, {
//         method: 'PUT',
//         headers,
//         credentials:isReportsLogin?"omit":"include",
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (response.ok && result.status_code === 200) {
//         Swal.fire({
//           icon: 'success',
//           title: 'User Added',
//           text: result.message,
//           confirmButtonText: 'OK',
//         }).then(() => {
//           window.location.reload();
//         });
//       } else {
//         throw new Error(result.message || 'Failed to add user');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to add user');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 p-6 bg-white rounded-lg shadow">
//       <h2 className="text-xl font-semibold">Create New User</h2>

//       <Input
//         label="Username"
//         placeholder="Enter username"
//         {...register('username', { required: 'Username is required' })}
//         error={errors.username?.message}
//       />

//       <Input
//         label="Password"
//         // type="password"
//         placeholder="Enter password"
//         {...register('password', { required: 'Password is required' })}
//         error={errors.password?.message}
//       />

//       <Controller
//         control={control}
//         name="role"
//         rules={{ required: 'Role is required' }}
//         render={({ field: { value, onChange } }) => (
//           <Select
//             label="Role"
//             placeholder="Select role"
//             options={roles}
//             value={value}
//             onChange={onChange}
//             getOptionValue={(option) => option.value}
//             displayValue={(selected) => roles.find((r) => r.value === selected)?.label ?? ''}
//             error={errors.role?.message}
//           />
//         )}
//       />

//       <Button type="submit" className="w-full" variant="solid">
//         Add User
//       </Button>
//     </form>
//   );
// }


// 'use client';

// import { useForm, Controller, SubmitHandler } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import { Input, Button, Select } from 'rizzui';

// type AddUserFormValues = {
//   email: string;
//   password: string;
//   role: string;
//   associated_station: number | "";
// };

// const roles = [
//   { label: 'Admin', value: 'Admin', id: '1' },
//   { label: 'Manager', value: 'Manager', id: '2' },
//   { label: 'Supply', value: 'Supply', id: '3' },
// ];

// export default function AddUserForm() {
//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<AddUserFormValues>({
//     defaultValues: {
//       email: '',
//       password: '',
//       role: '',
//       associated_station: '',
//     },
//   });

//   const onSubmit: SubmitHandler<AddUserFormValues> = async (data) => {
//     try {
//       const isReportsLogin = localStorage.getItem('onlyReports') === 'true';
//       const access_token = sessionStorage.getItem('access_token');
//       console.log(access_token)
//       const endpoint = "/api/staff/new-staff"

//       const headers: Record<string, string> = {
//         'Content-Type': 'application/json',
//       };

//       if (isReportsLogin && access_token) {
//         headers['Authorization'] = `${access_token}`;
//       }

//       // ✅ Transform data to backend payload structure
//       const selectedRole = roles.find((r) => r.value === data.role);
//       const payload = {
//         email: data.email,
//         password: data.password,
//         roles: {
//           id: selectedRole?.id || '',
//           name: selectedRole?.value || '',
//         },
//         associated_station: data.associated_station || '531',
//       };

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers,
//         // credentials: isReportsLogin ? 'omit' : 'include',
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       // ✅ Handle successful creation
//       if (response.ok && (result.status_code === 200 || result.status === 200)) {
//         await Swal.fire({
//           icon: 'success',
//           title: 'User Added Successfully!',
//           text: result.message || `${data.email} has been added as ${data.role}.`,
//           confirmButtonText: 'OK',
//         });
//         reset();
//         window.location.reload();
//       } else {
//         throw new Error(result.message || 'Failed to add user');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to add user');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-full space-y-6 p-6 bg-white rounded-lg shadow"
//     >
//       <h2 className="text-xl font-semibold">Create New User</h2>

//       <Input
//         label="Email"
//         placeholder="Enter email"
//         {...register('email', { required: 'Email is required' })}
//         error={errors.email?.message}
//       />

//       <Input
//         label="Password"
//         type="text"
//         placeholder="Enter password"
//         {...register('password', { required: 'Password is required' })}
//         error={errors.password?.message}
//       />

//       <Controller
//         control={control}
//         name="role"
//         rules={{ required: 'Role is required' }}
//         render={({ field: { value, onChange } }) => (
//           <Select
//             label="Role"
//             placeholder="Select role"
//             options={roles}
//             value={value}
//             onChange={onChange}
//             getOptionValue={(option) => option.value}
//             displayValue={(selected) =>
//               roles.find((r) => r.value === selected)?.label ?? ''
//             }
//             error={errors.role?.message}
//           />
//         )}
//       />

//       <Input
//         label="Associated Station"
//         placeholder="Enter associated station (e.g., 531)"
//         {...register('associated_station')}
//         error={errors.associated_station?.message}
//       />

//       <Button type="submit" className="w-full" variant="solid">
//         Add User
//       </Button>
//     </form>
//   );
// }





'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Input, Button, Select } from 'rizzui';

type AddUserFormValues = {
  email: string;
  password: string;
  role: string;
  associated_station: number | "";
};

const roles = [
  { label: 'Admin', value: 'Admin', id: '1' },
  { label: 'Manager', value: 'Manager', id: '2' },
  { label: 'Supply', value: 'Supply', id: '3' },
];

export default function AddUserForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserFormValues>({
    defaultValues: {
      email: '',
      password: '',
      role: '',
      associated_station: '',
    },
  });

  const onSubmit: SubmitHandler<AddUserFormValues> = async (data) => {
    try {
      const isReportsLogin = localStorage.getItem('onlyReports') === 'true';
      const access_token = sessionStorage.getItem('access_token');

      const endpoint = "/api/staff/new-staff";

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (isReportsLogin && access_token) {
        headers['Authorization'] = `${access_token}`;
      }

      const selectedRole = roles.find((r) => r.value === data.role);

      // ✅ Safely parse associated_station
      const associatedStation =
        data.associated_station === "" || isNaN(Number(data.associated_station))
          ? ""
          : Number(data.associated_station);

      const payload = {
        email: data.email,
        password: data.password,
        roles: {
          id: selectedRole?.id || '',
          name: selectedRole?.value || '',
        },
        associated_station: associatedStation,
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && (result.status_code === 200 || result.status === 200)) {
        await Swal.fire({
          icon: 'success',
          title: 'User Added Successfully!',
          text: result.message || `${data.email} has been added as ${data.role}.`,
          confirmButtonText: 'OK',
        });
        reset();
        window.location.reload();
      } else {
        throw new Error(result.message || 'Failed to add user');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add user');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6 p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold">Create New User</h2>

      <Input
        label="Email"
        placeholder="Enter email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="text"
        placeholder="Enter password"
        {...register('password', { required: 'Password is required' })}
        error={errors.password?.message}
      />

      <Controller
        control={control}
        name="role"
        rules={{ required: 'Role is required' }}
        render={({ field: { value, onChange } }) => (
          <Select
            label="Role"
            placeholder="Select role"
            options={roles}
            value={value}
            onChange={onChange}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              roles.find((r) => r.value === selected)?.label ?? ''
            }
            error={errors.role?.message}
          />
        )}
      />

      <Input
        label="Associated Station"
        placeholder="Enter associated station (optional)"
        type="number"
        {...register('associated_station')}
        error={errors.associated_station?.message}
      />

      <Button type="submit" className="w-full" variant="solid">
        Add User
      </Button>
    </form>
  );
}
