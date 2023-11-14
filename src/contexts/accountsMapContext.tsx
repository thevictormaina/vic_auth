import { createContext, useContext } from "react";
import {
  AccountPropertiesType,
  AccountsMapType,
  EditableAccountPropertiesType,
} from "../types/accounts";
import { generateMapID } from "../utility";
import useLocalStorage from "../hooks/useLocalStorage";

type AccountMapContextType = {
  accountsMap: AccountsMapType;

  getAccount: (id: string) => AccountPropertiesType | undefined;

  createAccount: (
    properties: EditableAccountPropertiesType
  ) => AccountPropertiesType;

  updateAccount: (
    id: string,
    updatedProperties: EditableAccountPropertiesType
  ) => AccountPropertiesType | undefined;

  removeAccount: (id: string) => AccountPropertiesType | undefined;
};

export const AccountsMapContext = createContext<AccountMapContextType | null>(
  null
);

export function AccountsMapTypeProvider({ children }: React.PropsWithChildren) {
  const [accountsMap, setAccountsMap] = useLocalStorage<AccountsMapType>(
    "accounts",
    new Map()
  );

  // console.log(accountsMap);

  function getAccount(id: string) {
    return accountsMap.get(id);
  }

  function removeAccount(id: string) {
    const account = accountsMap.get(id);

    if (account !== undefined) {
      setAccountsMap((prevMap) => {
        prevMap.delete(id);
        return prevMap;
      });
    }

    return account;
  }

  function createAccount(properties: EditableAccountPropertiesType) {
    const id = generateMapID(accountsMap);

    const newAccount: AccountPropertiesType = {
      ...properties,
      id,
      dateAdded: new Date(Date.now()),
    };

    setAccountsMap((prevMap) => {
      const newMapArr = [...prevMap.set(id, newAccount)];
      return new Map(newMapArr);
    });

    return newAccount;
  }

  function updateAccount(
    id: string,
    updatedProperties: EditableAccountPropertiesType
  ) {
    const account = accountsMap.get(id);

    if (account) {
      const updatedAccount: AccountPropertiesType = {
        ...account,
        ...updatedProperties,
      };
      setAccountsMap((prevMap) => prevMap.set(id, updatedAccount));

      return updatedAccount;
    }

    return account;
  }

  const ctx: AccountMapContextType = {
    accountsMap,
    getAccount,
    removeAccount,
    createAccount,
    updateAccount,
  };

  return (
    <AccountsMapContext.Provider value={ctx}>
      {children}
    </AccountsMapContext.Provider>
  );
}

export default function useAccountsMapContext() {
  return useContext(AccountsMapContext)!;
}
