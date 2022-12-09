import React, {PropsWithChildren, ReactNode, useState} from "react";
import {KlikTransaction} from "../../model/klikTransaction";


type KlikTransactionContextObj = {
    klikTransaction: KlikTransaction | null;
    setKlikTransaction: (klikTransaction: KlikTransaction) => void;
    clearKlikTransaction: () => void;
};

export const KlikTransactionContext = React.createContext<KlikTransactionContextObj>({
    klikTransaction: null,
    setKlikTransaction: () => {},
    clearKlikTransaction: () => {}
});

const KlikTransactionContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [klikTransaction, setKlikTransaction] = useState<KlikTransaction | null>(null);

    const clearKlikTransaction = () => {
        setKlikTransaction(null);
    };

    const klikTransactionValue: KlikTransactionContextObj = {
        klikTransaction,
        setKlikTransaction,
        clearKlikTransaction
    };

    return (
        <KlikTransactionContext.Provider value={klikTransactionValue}>
            {children}
        </KlikTransactionContext.Provider>
    );
};

export default KlikTransactionContextProvider;