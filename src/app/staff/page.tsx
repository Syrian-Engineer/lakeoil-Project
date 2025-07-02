'use client';

import { useEffect, useState } from 'react';
import { Button } from 'rizzui';
import Link from 'next/link';

// Icons
import { PiMapPin, PiSealCheckFill } from 'react-icons/pi';
import Swal from 'sweetalert2';

// Type for each staff record
type StaffType = {
  id: number;
  role: string;
  username: string;
};

let countPerPage = 4;

export default function Page() {
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [staff, setStaff] = useState<StaffType[]>([]);
  const [nextPage, setNextPage] = useState(countPerPage);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isReportsLogin = localStorage.getItem("onlyReports") === "true";
    const access_token = sessionStorage.getItem("access_token");

    const endpoint = isReportsLogin
    ?"/api/reports/staff"
    :"/api/staff";

    const headers :Record<string,string> = {
      'Content-Type': 'application/json',
    }

    if(isReportsLogin && access_token){
      headers["Authorization"] = `${access_token}`
    }



    const fetchStaff = async () => {
      setIsFetching(true);
      try {
        const res = await fetch(endpoint,{
          headers,
          credentials:isReportsLogin?"omit":"include"
        });
        
        const data = await res.json();
        if (data?.data?.page_records) {
          setStaff(data.data.page_records);
        }
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchStaff();
  }, []);

  const isLoadMore = nextPage < staff.length;

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setNextPage(nextPage + countPerPage);
      setLoading(false);
    }, 600);
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary" />
      </div>
    );
  }
  return (
    <div>
      {staff.slice(0, nextPage).map((person) => (
        <StaffCard key={person.id} data={person} />
      ))}

      {isLoadMore && (
        <div className="mb-4 flex justify-center">
          <Button variant="solid" isLoading={isLoading} onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}

      <div className="w-full flex justify-center mb-12">
        <Link
          className="w-3/4 absolute z-10 text-center bg-gray-800 text-white p-5 rounded-xl hover:bg-gray-900 hover:cursor-pointer hover:scale-95 transition duration-300"
          href="/staff/new-user"
        >
          New User
        </Link>
      </div>
    </div>
  );
}





function StaffCard({ data }: { data: StaffType }) {
  const handleEditClick = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Edit Staff Info',
        html: `
        <div class="flex flex-col gap-4 text-left w-full">
          <div class="flex flex-col gap-1 w-full">
            <label class="text-sm font-medium text-gray-700">Username</label>
            <input id="swal-input1" class="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username" value="${data.username}" />
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label class="text-sm font-medium text-gray-700">Role</label>
            <select id="swal-input3" class="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Technician" ${data.role === 'Technician' ? 'selected' : ''}>Technician</option>
              <option value="Manager" ${data.role === 'Manager' ? 'selected' : ''}>Manager</option>
              <option value="Operator" ${data.role === 'Operator' ? 'selected' : ''}>Operator</option>
            </select>
          </div>
        </div>
      `,
        showCancelButton: true,
        confirmButtonText: '💾 Save',
        cancelButtonText: '✖ Cancel',
        icon: 'info',
        preConfirm: () => {
          return {
            username: (document.getElementById('swal-input1') as HTMLInputElement).value,
            role: (document.getElementById('swal-input3') as HTMLSelectElement).value,
          };
        },
      });

      if (formValues) {
        const isReportsLogin = localStorage.getItem("onlyReports") === "true";
        const access_token = sessionStorage.getItem("access_token");


        const endpoint = isReportsLogin
        ?"/api/reports/staff/edit-staff-data"
        :"/api/staff/edit-staff-data";

        const headers :Record<string,string> = {
          'Content-Type': 'application/json'
        }

        if(isReportsLogin && access_token){
          headers["Authorization"] = `${access_token}`
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers,
          credentials:isReportsLogin?"omit":"include",
          body: JSON.stringify({
            id: data.id,
            username: formValues.username,
            role: formValues.role,
          }),
        });

        const result = await response.json();
        if (response.ok && result?.status_code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'User Updated',
            text: 'The user information has been successfully updated!',
          }).then(() => window.location.reload());
        } else {
          throw new Error(result?.message || 'Failed to update user info');
        }
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const handleDeleteClick = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete user "${data.username}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '🗑️ Delete',
      cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
      try {
        const isReportsLogin = localStorage.getItem("onlyReports") === "true";
        const access_token = sessionStorage.getItem("access_token");

        const endpoint = isReportsLogin
        ?"/api/reports/staff/delete-staff"
        :"/api/staff/delete-staff";

        const headers :Record<string,string> = {
          'Content-Type': 'application/json'
        }

        if(isReportsLogin && access_token){
          headers["Authorization"] = `${access_token}`
        }


        const res = await fetch(endpoint, {
          method: 'POST',
          headers,
          credentials: isReportsLogin?"omit":"include",
          body: JSON.stringify({ id: data.id }),
        });

        const result = await res.json();
        if (res.ok && result?.status_code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'User has been deleted successfully.',
          }).then(() => window.location.reload());
        } else {
          throw new Error(result?.message || 'Failed to delete user');
        }
      } catch (err: any) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
        });
      }
    }
  };

  return (
    <div className="mb-6 w-full rounded-[10px] border border-muted p-4 sm:p-[30px]">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">
            {data.username} <span className="text-sm text-gray-500">(ID: {data.id})</span>
          </h3>
          <p className="text-sm text-gray-600">{data.role}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 items-center">
            <PiSealCheckFill size={20} className="text-primary" />
            <PiMapPin size={20} className="text-gray-500" />
          </div>
          <Button size="sm" variant="outline" onClick={handleEditClick}>
            Edit
          </Button>
          <Button size="sm"  variant="outline" onClick={handleDeleteClick}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

