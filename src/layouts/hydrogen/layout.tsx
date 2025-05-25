import Header from "@/layouts/hydrogen/header";
import Sidebar from "@/layouts/hydrogen/sidebar";
import Footer from "./footer";


export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar className="fixed hidden xl:block  dark:bg-gray-50" /> 
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-2px)]">
        <Header />
        <div className="flex flex-grow flex-col px-4 pb-20 pt-2 md:px-5 lg:px-6 lg:pb-24 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-28">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}
