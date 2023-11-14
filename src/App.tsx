import AccountInfo from "./components/AccountInfo";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { NewAccountForm } from "./components/AccountForm";
import { DialogContextProvider } from "./contexts/dialogContext";
import useAccountsMapContext from "./contexts/accountsMapContext";
import { useMemo } from "react";

export default function App() {
  const { accountsMap } = useAccountsMapContext();

  const accountsArray = useMemo(() => {
    const arr = Array.from(accountsMap.values());
    return arr;
  }, [accountsMap]);

  return (
    <div className="flex flex-col h-full min-h-[100vh]">
      <DialogContextProvider>
        <Header></Header>
        <NewAccountForm />
      </DialogContextProvider>

      {/* <Dialog> */}
      {/* </Dialog> */}

      <section className="container mx-auto p-4 flex-1">
        <h1 className="text-slate-600 font-bold mb-8">
          {accountsMap.size > 0 ? accountsMap.size : "No"} saved account(s)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accountsArray.map((accountProperties) => {
            return (
              <AccountInfo key={accountProperties.id} {...accountProperties} />
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
