// 'use client';

// import dynamic from 'next/dynamic';
// import toast from 'react-hot-toast';
// import { SubmitHandler, Controller } from 'react-hook-form';
// import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
// import { Form } from '@/ui/form';
// import { Loader, Text, Input, Select } from 'rizzui';
// import FormGroup from '@/app/shared/form-group';
// import FormFooter from '@/components/form-footer';
// import {
//   defaultValues,
//   personalInfoFormSchema,
//   PersonalInfoFormTypes,
// } from '@/validators/personal-info.schema';
// import UploadZone from '@/ui/file-upload/upload-zone';
// import { countries, roles, timezones } from '@/app/_data/forms/my-details';
// import AvatarUpload from '@/ui/file-upload/avatar-upload';

// // const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
// //   ssr: false,
// //   loading: () => (
// //     <div className="grid h-10 place-content-center">
// //       <Loader variant="spinner" />
// //     </div>
// //   ),
// // });

// const QuillEditor = dynamic(() => import('@/ui/quill-editor'), {
//   ssr: false,
// });

// export default function PersonalInfoView() {
//   const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
//     toast.success(<Text as="b">Successfully added!</Text>);
//     console.log('Profile settings data ->', {
//       ...data,
//     });
//   };

//   return (
//     <Form<PersonalInfoFormTypes>
//       validationSchema={personalInfoFormSchema}
//       // resetValues={reset}
//       onSubmit={onSubmit}
//       className="@container"
//       useFormProps={{
//         mode: 'onChange',
//         defaultValues,
//       }}
//     >
//       {({ register, control, setValue, getValues, formState: { errors } }) => {
//         return (
//           <>
//             <FormGroup
//               title="Customer Personal Info"
//               description="Update The Customer Personal Details Here"
//               className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//             />

//             <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
//               <FormGroup
//                 title="Name"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Input
//                   placeholder="Customer Name"
//                   {...register('first_name')}
//                   error={errors.first_name?.message}
//                   className="flex-grow"
//                 //   inputClassName="placeholder-black"
//                 />
//               </FormGroup>

//               <FormGroup
//                 title="Email Address"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Input
//                   className="col-span-full"
//                   prefix={
//                     <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
//                   }
//                   type="email"
//                   placeholder="georgia.young@example.com"
//                   {...register('email')}
//                   error={errors.email?.message}
//                 />
//               </FormGroup>


//               <FormGroup
//                 title="ID Type"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Controller
//                   control={control}
//                   name="role"
//                   render={({ field: { value, onChange } }) => (
//                     <Select
//                       dropdownClassName="!z-10 h-auto"
//                       inPortal={false}
//                       placeholder="Select Role"
//                       options={roles}
//                       onChange={onChange}
//                       value={value}
//                       className="col-span-full"
//                       getOptionValue={(option) => option.value}
//                       displayValue={(selected) =>
//                         roles?.find((r) => r.value === selected)?.label ?? ''
//                       }
//                       error={errors?.role?.message as string}
//                     />
//                   )}
//                 />
//               </FormGroup>

//               <FormGroup
//                 title="Phone Number"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Input
//                   placeholder="Phone Number"
//                   {...register('first_name')}
//                   error={errors.first_name?.message}
//                   className="flex-grow"
//                 //   inputClassName="placeholder-black"
//                 />
//               </FormGroup>


//               <FormGroup
//                 title="ID Value"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Input
//                   placeholder="Enter  ID Value"
//                   {...register('first_name')}
//                   error={errors.first_name?.message}
//                   className="flex-grow"
//                 //   inputClassName="placeholder-black"
//                 />
//               </FormGroup>

//               <FormGroup
//                 title="Max Credit"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Input
//                   placeholder="Enter Max Credit"
//                   {...register('first_name')}
//                   error={errors.first_name?.message}
//                   className="flex-grow"
//                 //   inputClassName="placeholder-black"
//                 />
//               </FormGroup>

//               <FormGroup
//                 title="Current Credit"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Input
//                   placeholder="Enter Current Credit"
//                   {...register('first_name')}
//                   error={errors.first_name?.message}
//                   className="flex-grow"
//                 //   inputClassName="placeholder-black"
//                 />
//               </FormGroup>
//               {/* <FormGroup
//                 title="Country"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Controller
//                   control={control}
//                   name="country"
//                   render={({ field: { onChange, value } }) => (
//                     <Select
//                       dropdownClassName="!z-10 h-auto"
//                       inPortal={false}
//                       placeholder="Select Country"
//                       options={countries}
//                       onChange={onChange}
//                       value={value}
//                       className="col-span-full"
//                       getOptionValue={(option) => option.value}
//                       displayValue={(selected) =>
//                         countries?.find((con) => con.value === selected)
//                           ?.label ?? ''
//                       }
//                       error={errors?.country?.message as string}
//                     />
//                   )}
//                 />
//               </FormGroup>

//               <FormGroup
//                 title="Timezone"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Controller
//                   control={control}
//                   name="timezone"
//                   render={({ field: { onChange, value } }) => (
//                     <Select
//                       dropdownClassName="!z-10 h-auto"
//                       inPortal={false}
//                       prefix={<PiClock className="h-6 w-6 text-gray-500" />}
//                       placeholder="Select Timezone"
//                       options={timezones}
//                       onChange={onChange}
//                       value={value}
//                       className="col-span-full"
//                       getOptionValue={(option) => option.value}
//                       displayValue={(selected) =>
//                         timezones?.find((tmz) => tmz.value === selected)
//                           ?.label ?? ''
//                       }
//                       error={errors?.timezone?.message as string}
//                     />
//                   )}
//                 />
//               </FormGroup>

//               <FormGroup
//                 title="Bio"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <Controller
//                   control={control}
//                   name="bio"
//                   render={({ field: { onChange, value } }) => (
//                     <QuillEditor
//                       value={value}
//                       onChange={onChange}
//                       className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
//                       labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
//                     />
//                   )}
//                 />
//               </FormGroup> */}

//               {/* <FormGroup
//                 title="Portfolio Projects"
//                 description="Share a few snippets of your work"
//                 className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
//               >
//                 <div className="mb-5 @3xl:col-span-2">
//                   <UploadZone
//                     name="portfolios"
//                     getValues={getValues}
//                     setValue={setValue}
//                     error={errors?.portfolios?.message as string}
//                   />
//                 </div>
//               </FormGroup> */}
//             </div>

//             <FormFooter
//               // isLoading={isLoading}
//               altBtnText="Cancel"
//               submitBtnText="Add New Customer"
//             />
//           </>
//         );
//       }}
//     </Form>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { Input, Select } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@/components/form-footer';
import { roles } from '@/app/_data/forms/my-details';

const initialForm = {
  name: '',
  email: '',
  address: '',
  phone: '',
  id_type: '',
  id_value: '',
  credit: '',
  max_credit: '',
  type: '',
};

export default function CustomerCreateForm() {
  const [formData, setFormData] = useState(initialForm);
  const router = useRouter();

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/customers/new-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: Number(formData.phone),
          id_type: Number(formData.id_type),
          id_value: Number(formData.id_value),
          credit: Number(formData.credit),
          max_credit: Number(formData.max_credit),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Customer added successfully!',
          icon: 'success',
          confirmButtonText: 'Done',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/customers');
          }
        });
      } else {
        toast.error(`Failed: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Request failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormGroup title="Name">
        <Input
          placeholder="Customer Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </FormGroup>

      <FormGroup title="Email Address">
        <Input
          type="email"
          prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
          placeholder="example@mail.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </FormGroup>

      <FormGroup title="Address">
        <Input
          placeholder="Customer Address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </FormGroup>

      <FormGroup title="Phone Number">
        <Input
          type="number"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </FormGroup>

      <FormGroup title="ID Value">
        <Input
          type="number"
          placeholder="ID Value"
          value={formData.id_value}
          onChange={(e) => handleChange('id_value', e.target.value)}
        />
      </FormGroup>

      <FormGroup title="Max Credit">
        <Input
          type="number"
          placeholder="Max Credit"
          value={formData.max_credit}
          onChange={(e) => handleChange('max_credit', e.target.value)}
        />
      </FormGroup>

      <FormGroup title="Current Credit">
        <Input
          type="number"
          placeholder="Current Credit"
          value={formData.credit}
          onChange={(e) => handleChange('credit', e.target.value)}
        />
      </FormGroup>

      <FormGroup title="Type">
        <Input
          placeholder="Type"
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
        />
      </FormGroup>

      <FormFooter submitBtnText="Add New Customer" />
    </form>
  );
}
