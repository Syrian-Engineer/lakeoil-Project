'use client';

import React, { useEffect, useState } from 'react';
import Filters from './filter';
import cn from '@/utils/class-names';
import Table from '@/components/table';
import WidgetCard from '@/components/cards/widget-card';
import TablePagination from '@/components/table/pagination';
import { useTanStackTable } from '@/components/custom/use-TanStack-Table';
import { createColumnHelper } from '@tanstack/react-table';
import Pencil from '@/components/icons/pencil';
import Swal from 'sweetalert2';


interface CustomerDataType {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  id_type: number;
  id_value: number;
  credit: number;
  max_credit: number;
  type: string;
}

// 1. Define new columns matching the fetched data
const columnHelper = createColumnHelper<CustomerDataType>();

const defaultCustomerColumns = [
  columnHelper.accessor('name', {
    header: 'Name',
    size:80,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    size:100,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    header: 'Phone Number',
    size:100,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('address', {
    header: 'Address',
    size:70,
    cell: (info) => info.getValue(),
  }),columnHelper.accessor('id_value', {
    header: 'id_value',
    size:60,
    cell: (info) => info.getValue(),
  }),
    columnHelper.accessor('id_type', {
    header: 'id_type',
    size:20,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('credit', {
    header: 'Credit',
    size:100,
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor('max_credit', {
    header: 'Max Credit',
    size:100,
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    size:70,
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <button
        onClick={() => handleEditClick(row.original.id)}
        className="text-primary hover:text-blue-600"
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>
    ),
    size: 40,
  }),
];


// for editing customer data 
const handleEditClick = async (id: number) => {
  try {
    const isReportsLogin = localStorage.getItem("onlyReports") === "true";
    const access_token = sessionStorage.getItem("access_token");

    const endpoint = isReportsLogin
    ?"/api/reports/customers/edit-customer-data"
    :"/api/customers/edit-customer-data";

     const headers: Record<string, string> = {
        'Content-Type': 'application/json',
     };

     if (isReportsLogin && access_token) {
        headers['Authorization'] = ` ${access_token}`;
      }
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      credentials:isReportsLogin?"omit":"include",
      body: JSON.stringify({ id }),
    });

    const result = await res.json();
    const customer = result.data;

    const { value: formValues } = await Swal.fire({
      title: 'Edit Customer',
      html: `
        <div style="text-align: left">
          <div style="margin-bottom: 8px;">
            <strong>Name</strong><br/>
            <input id="swal-name" class="swal2-input" value="${customer.name}" />
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Email</strong><br/>
            <input id="swal-email" class="swal2-input" value="${customer.email}" />
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Phone</strong><br/>
            <input id="swal-phone" class="swal2-input" value="${customer.phone}" />
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Address</strong><br/>
            <input id="swal-address" class="swal2-input" value="${customer.address}" />
          </div>
          <div style="margin-bottom: 8px;">
            <strong>ID Type</strong><br/>
            <input id="swal-id-type" class="swal2-input" value="${customer.id_type}" />
          </div>
          <div style="margin-bottom: 8px;">
            <strong>ID Value</strong><br/>
            <input id="swal-id-value" class="swal2-input" value="${customer.id_value}" />
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Type</strong><br/>
            <input id="swal-type" class="swal2-input" value="${customer.type}" />
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Credit</strong><br/>
            <input id="swal-credit" class="swal2-input" value="${customer.credit}" />
          </div>
          <div>
            <strong>Max Credit</strong><br/>
            <input id="swal-max-credit" class="swal2-input" value="${customer.max_credit}" />
          </div>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Edit',
      showCancelButton: true,
      preConfirm: () => {
        return {
          id,
          name: (document.getElementById('swal-name') as HTMLInputElement).value,
          email: (document.getElementById('swal-email') as HTMLInputElement).value,
          phone: Number((document.getElementById('swal-phone') as HTMLInputElement).value),
          address: (document.getElementById('swal-address') as HTMLInputElement).value,
          id_type: Number((document.getElementById('swal-id-type') as HTMLInputElement).value),
          id_value: Number((document.getElementById('swal-id-value') as HTMLInputElement).value),
          type: (document.getElementById('swal-type') as HTMLInputElement).value,
          credit: Number((document.getElementById('swal-credit') as HTMLInputElement).value),
          max_credit: Number((document.getElementById('swal-max-credit') as HTMLInputElement).value),
        };
      }
    });

    if (formValues) {

      const isReportsLogin = localStorage.getItem("") === "true";
      const access_token = sessionStorage.getItem("");

      const endpoint = isReportsLogin
      ?"/api/reports/customers/edit-customer-data/edit"
      :"/api/customers/edit-customer-data/edit";

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if(isReportsLogin && access_token){
        headers["Authorization"] = `${access_token}`
      };


      const updateRes = await fetch(endpoint, {
        method: "POST",
        headers,
        credentials:isReportsLogin?"omit":"include",
        body: JSON.stringify(formValues),
      });

      const updateResult = await updateRes.json();

      if (updateResult.status_code === 200) {
        Swal.fire('Success', 'Customer updated successfully.', 'success').then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire('Error', updateResult.message || 'Update failed.', 'error');
      }
    }

  } catch (err) {
    console.error("Edit fetch error", err);
    Swal.fire('Error', 'Could not fetch or update customer data.', 'error');
  }
};

export default function PostSummary({ className }: { className?: string }) {
  const [customers, setCustomers] = useState<CustomerDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if(typeof window === "undefined"){
      return;
    }
    const isReportsLogin = localStorage.getItem("onlyReports") === 'true';
    const access_token = sessionStorage.getItem("access_token")

     const endpoint = isReportsLogin
     ?"/api/reports/customers"
     :"/api/customers"

     const headers: Record<string, string> = {
        'Content-Type': 'application/json',
     };

     if (isReportsLogin && access_token) {
        headers['Authorization'] = ` ${access_token}`;
      }

    const fetchCustomers = async () => {
      try {
        const res = await fetch(endpoint,{
          headers,
          credentials:isReportsLogin?"omit":"include"
        });
        const data = await res.json();

        if (data.status_code === 200) {
          setCustomers(data.data.page_records);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const { table } = useTanStackTable<CustomerDataType>({
    tableData: customers,
    columnConfig: defaultCustomerColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 9,
        },
      },
      enableSorting: false,
      enableColumnResizing: false,
    },
  });

  return (
    <WidgetCard
      title={
        <span>
          <span className="hidden @lg:inline-block"></span> Customers
        </span>
      }
      className={cn('space-y-4 p-0 lg:p-0', className)}
      headerClassName="items-center px-5 pt-5 lg:px-7 lg:pt-7 flex-wrap sm:flex-nowrap gap-y-3"
      actionClassName="ml-auto"
      action={<Filters table={table} className="w-full justify-between" />}
    >
      <Table
        table={table}
        variant="modern"
        isLoading={isLoading}
        classNames={{
          cellClassName: 'first:ps-4',
          rowClassName: 'last:border-0',
          headerCellClassName: 'first:ps-4',
        }}
      />
      {/* <TablePagination table={table} className="p-4 pt-0" /> */}
    </WidgetCard>
  );
}
