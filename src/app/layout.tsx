// 'use client'

// import type { Metadata } from "next";
// import { inter, lexendDeca } from "./fonts";
// import cn from "@/utils/class-names";
// import NextProgress from "@/components/next-progress";
// import HydrogenLayout from "@/layouts/hydrogen/layout";
// import { ThemeProvider, JotaiProvider } from "./shared/theme-provider";
// import GlobalDrawer from "./shared/drawer-views/container";
// import GlobalModal from "./shared/modal-views/container";
// import { Provider } from "react-redux";
// import { store } from "@/store"; 
// import { RootState } from "@/store";
// import { useSelector } from "react-redux";
// import "@/app/globals.css";

// // export const metadata: Metadata = {
// //   title: "App Name",
// //   description: "Write your app description",
// // };

// type Props = {
//   children: React.ReactNode;
// };

// export default  function RootLayout({ children}: Props) {

//   const language = useSelector((state:RootState)=>state.language.language)
//   const direction  = language === "ar"?'rtl':"ltr";

//   return (
//     <html lang={language} dir={direction}> 
//       <body
//         suppressHydrationWarning
//         className={cn(inter.variable, lexendDeca.variable, "font-inter")}
//       >
//         <Provider store={store}>
//           <ThemeProvider>
//               <NextProgress />
//               <JotaiProvider>
//                 <HydrogenLayout>{children}</HydrogenLayout>
//                 <GlobalDrawer />
//                 <GlobalModal />
//               </JotaiProvider>
//             </ThemeProvider>
//         </Provider>       
//       </body>
//     </html>
//   );
// }


'use client'
import type { Metadata } from "next";
import { inter, lexendDeca } from "./fonts";
import cn from "@/utils/class-names";
import NextProgress from "@/components/next-progress";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import { ThemeProvider, JotaiProvider } from "./shared/theme-provider";
import GlobalDrawer from "./shared/drawer-views/container";
import GlobalModal from "./shared/modal-views/container";
import { Provider } from "react-redux";
import { store } from "@/store";
import LanguageEffect from "@/components/language-effect"; // 👇 You'll create this
import "@/app/globals.css";

// export const metadata: Metadata = {
//   title: "App Name",
//   description: "Your app description",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <Provider store={store}>
          <ThemeProvider>
            <LanguageEffect /> {/* 👈 Dynamically update <html> dir/lang */}
            <NextProgress />
            <JotaiProvider>
              <HydrogenLayout>{children}</HydrogenLayout>
              <GlobalDrawer />
              <GlobalModal />
            </JotaiProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
