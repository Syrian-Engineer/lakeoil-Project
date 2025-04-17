import { getAuth } from "../_lib/data-services";
import MessageList from "./message-list";

export default function Page(){


    return(
        <div className="w-full felx flex-col gap-12">
           <div className="w-full">
               <MessageList />
           </div>
        </div>
    )
}