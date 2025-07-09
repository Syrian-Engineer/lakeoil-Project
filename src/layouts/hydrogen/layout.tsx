import Header from "@/layouts/hydrogen/header";
import Sidebar from "@/layouts/hydrogen/sidebar";
import Footer from "./footer";
import { usePathname } from "next/navigation";


export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  // check if i am in the signin page
  const isAuthPage = pathname.startsWith("/signin")


  return (
    <main className="flex min-h-screen flex-grow">
      {!isAuthPage && (
        <Sidebar className="fixed hidden xl:block  dark:bg-gray-50" /> 
      )}
      <div className="flex w-full flex-col xl:ms-[190px] xl:w-[calc(100%-270px)] 2xl:ms-52 2xl:w-[calc(100%-2px)]">
        {!isAuthPage && (
          <Header />
        )}
        <div className="flex flex-col px-4 pb-20 pt-2 md:px-5 lg:px-6 lg:pb-24 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-28">
          {children}
        </div>
        {!isAuthPage && (
          <Footer />
        )}
      </div>
    </main>
  );
}
