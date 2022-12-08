import React, {PropsWithChildren, useState} from "react";

type PushTokenContextObj = {
    pushToken: string | null;
    setPushToken: (pushToken: string) => void;
    clearPushToken: () => void;
};

export const PushTokenContext = React.createContext<PushTokenContextObj>({
    pushToken: null,
    setPushToken: () => {},
    clearPushToken: () => {}
});

const PushTokenContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [pushToken, setPushToken] = useState<string | null>(null);

    const clearPushToken = () => {
        setPushToken(null);
    };

    const pushTokenValue: PushTokenContextObj = {
        pushToken,
        setPushToken,
        clearPushToken
    };

    return (
        <PushTokenContext.Provider value={pushTokenValue}>
            {children}
        </PushTokenContext.Provider>
    );
};

export default PushTokenContextProvider;