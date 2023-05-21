import { Button } from "./ui/button";
import {useContext} from 'react'
import { AccountContext } from "@/lib/appwriteContext";
export default function UILayer() {
    const account = useContext(AccountContext);
    
  return (
    <div className="">
        {
            account.user ? <Button variant='outline' className="absolute bottom-10 right-1/2" onClick={()=>account.logout()}>Logout</Button> : <Button variant='outline' className="absolute bottom-10 right-1/2" onClick={()=>account.createOAuth2Session('github')}>Login</Button>
        }
    </div>
  )
}