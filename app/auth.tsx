'use client'


import { usePathname } from "@/node_modules/next/navigation";
import Login from "./page"
import SobrePage from "./sobre/page";

export default function Auth({ 
    children,
  }: {
    children: React.ReactNode
  })  {
    const currentPage = usePathname();
   if(localStorage && localStorage.getItem("token")){
    return (<div>{children}</div>)
   } else{
    return currentPage == 'sobre' ?  <SobrePage /> : <Login/>
   }
}