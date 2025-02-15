import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props){  //export default byt3mlha export mra whda bs`

    const [userLogin, setuserLogin] = useState(
        localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
    );




    return <UserContext.Provider value={{userLogin, setuserLogin}}>
            {props.children}
    </UserContext.Provider>

}