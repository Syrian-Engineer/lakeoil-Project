'use client'

import { useEffect, useState } from "react";
import PostSummary from "./past-summary";
import Link from "next/link";

export default function Page(){
    return(
        <div className="flex flex-col gap-5">
            <div>
                <PostSummary className="order-8 col-span-full @7xl:order-10 @7xl:col-span-8 @7xl:row-span-3" />
            </div>
            
                <Link 
                className="w-full text-center bg-gray-800 text-white p-5 rounded-xl hover:bg-gray-900 hover:cursor-pointer hover:scale-95 transition duration-300" 
                href={`/customers/new-customer`}>New Customer</Link>
        </div>
    )
}