import React, {PropsWithChildren, ReactNode, useState} from "react";
import {KlikTransaction} from "../../model/klikTransaction";


type KlikTransactionContextObj = {
    klikTransaction: KlikTransaction | null;
    setKlikTransaction: (klikTransaction: KlikTransaction) => void;
    invalidateKlikTransaction: () => void;
};

export const KlikTransactionContext = React.createContext<KlikTransactionContextObj>({
    klikTransaction: null,
    setKlikTransaction: () => {},
    invalidateKlikTransaction: () => {}
});

const KlikTransactionContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [klikTransaction, setKlikTransaction] = useState<KlikTransaction | null>(null);

    const invalidateKlikTransaction = () => {
        setKlikTransaction(null);
    };

    const klikTransactionValue: KlikTransactionContextObj = {
        klikTransaction,
        setKlikTransaction,
        invalidateKlikTransaction
    };

    return (
        <KlikTransactionContext.Provider value={klikTransactionValue}>
            {children}
        </KlikTransactionContext.Provider>
    );
};

export default KlikTransactionContextProvider;