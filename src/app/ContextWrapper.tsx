'use client'

import { createContext, useEffect, useReducer } from 'react';
import useOnlineUser from '@/hooks/useOnlineUser';
import { trpc } from './_trpc/client';
export const UserContext = createContext<any>(null);
const ContextWrapper = ({children, userId}: {
  children: React.ReactNode
  userId: string
}) => {
  // console.log("userId",userId)
  const {flagForTrigger} = useOnlineUser(userId)
  const { data: currentFriends} = trpc.getFriends.useQuery()
  const utils = trpc.useContext()
  console.log("refresh data for friends", currentFriends)
  useEffect(() => {
    utils.getFriends.invalidate()
    utils.getAllUsers.invalidate()
  },[flagForTrigger])
  const reducer = (state: any, action: any) => {
    if(action.type == 'UPDATE_FRIENDS'){
     return {
      allFriends: action.allFriends
     }
    }else{
     return null
    }
  }
  const [state, dispatch] = useReducer(reducer, {allFriends: currentFriends});
  return (
    <div className="">
      <UserContext.Provider value={{allFriends: state?.allFriends, dispatch: dispatch}}>
          {children} 
      </UserContext.Provider>
      
    </div>
  )
}
export default ContextWrapper;