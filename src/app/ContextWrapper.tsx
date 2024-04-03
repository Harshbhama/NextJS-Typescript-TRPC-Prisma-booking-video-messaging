'use client'

import { createContext, useReducer } from 'react';

export const UserContext = createContext<any>(null);
const ContextWrapper = ({children}: {
  children: React.ReactNode;
}) => {
  const reducer = (state: any, action: any) => {
    if(action.type == 'UPDATE_FRIENDS'){
     return {
      allFriends: action.allFriends
     }
    }else{
     return null
    }
   }
   
  const [state, dispatch] = useReducer(reducer, { allFriends: [] });
  return (
    <div className="">
      <UserContext.Provider value={{allFriends: state?.allFriends, dispatch: dispatch}}>
        {children} 
      </UserContext.Provider>
      
    </div>
  )
}
export default ContextWrapper;