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
  phone: string;
  address: string;
  tin_number: string;
  credit_type: string;
  credit: number;
  max_credit: number;
  discount: number;
  erp: string;
  is_active: boolean;
  station_serial: string[];
  card_count: number;
  created_at: string;
  updated_at: string;
}

// 1. Define new columns matching the fetched data
const columnHelper = createColumnHelper<CustomerDataType>();

const defaultCustomerColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    size: 120,
    cell: info => info.getValue(),
  }),

  columnHelper.accessor("email", {
    header: "Email",
    size: 160,
    cell: info => info.getValue() || "-",
  }),

  columnHelper.accessor("phone", {
    header: "Phone",
    size: 120,
    cell: info => info.getValue() || "-",
  }),

  columnHelper.accessor("address", {
    header: "Address",
    size: 150,
    cell: info => info.getValue() || "-",
  }),

  columnHelper.accessor("tin_number", {
    header: "TIN",
    size: 120,
    cell: info => info.getValue() || "-",
  }),

  columnHelper.accessor("credit_type", {
    header: "Credit Type",
    size: 120,
    cell: info => info.getValue(),
  }),

  columnHelper.accessor("credit", {
    header: "Credit",
    size: 100,
    cell: info => Number(info.getValue()).toLocaleString(),
  }),

  columnHelper.accessor("max_credit", {
    header: "Max Credit",
    size: 120,
    cell: info => Number(info.getValue()).toLocaleString(),
  }),

  columnHelper.accessor("discount", {
    header: "Discount",
    size: 100,
    cell: info => `${info.getValue()} %`,
  }),

  columnHelper.accessor("card_count", {
    header: "Cards",
    size: 80,
    cell: info => info.getValue(),
  }),

  columnHelper.accessor("is_active", {
    header: "Status",
    size: 80,
    cell: info => (
      <span
        className={`px-2 py-1 rounded text-white text-xs ${
          info.getValue() ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {info.getValue() ? "Active" : "Inactive"}
      </span>
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    size: 60,
    cell: ({ row }) => (
      <button
        onClick={() => handleEditClick(row.original.id)}
        className="text-primary hover:text-blue-600"
      >
        <Pencil className="h-4 w-4" />
      </button>
    ),
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
    const access_token = sessionStorage.getItem("access_token")
    const backend = localStorage.getItem("backend_url") || "";

     const headers: Record<string, string> = {
        // 'Content-Type': 'application/json',
     };

     if (access_token) {
        headers['Authorization'] = ` ${access_token}`;
        headers['x-backend-url'] = ` ${backend}`;
      }

    const fetchCustomers = async () => {
  try {
    const res = await fetch("/api/customers", {
      method: "GET",
      headers,
    });

    const data = await res.json();

    console.log(data);

    if (Array.isArray(data.data)) {
      setCustomers(data.data);
    } else {
      setCustomers([]);
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
