import React, { createContext, useContext, useState} from "react";

const ReceiverContext = createContext()

export const ReceiverProvider =({ children }) => {
    const [receiverId, setReceiverId] = useState(null)

    const setReceiver=(newReceiverId) => {
        setReceiverId(newReceiverId)
    };

    return(
        <ReceiverContext.Provider value={{ receiverId, setReceiver}}>
            {children}
        </ReceiverContext.Provider>
    )
}

export const useReceiver =() => {
    return useContext(ReceiverContext)
}