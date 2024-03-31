// "use client";
// import { formatBalance, formatChainAsNum } from "@/utils";
// import detectEthereumProvider from "@metamask/detect-provider";
// import React, { useEffect, useState } from "react";
// let injectedProvider = false;
// interface Window {
//   ethereum: any;
// }
// if (typeof window.ethereum !== "undefined") {
//   injectedProvider = true;
//   console.log(window.ethereum);
// }

// const MetamaskConnect = () => {
//   const [hasProvider, setHasProvider] = useState<boolean | null>(null);
//   const initialState = { accounts: [], balance: "", chainId: "" };
//   const [wallet, setWallet] = useState(initialState);

//   const [isConnecting, setIsConnecting] = useState(false); /* New */
//   const [error, setError] = useState(false); /* New */
//   const [errorMessage, setErrorMessage] = useState(""); /* New */

//   useEffect(() => {
//     const refreshAccounts = (accounts: any) => {
//       if (accounts.length > 0) {
//         updateWallet(accounts);
//       } else {
//         // if length 0, user is disconnected
//         setWallet(initialState);
//       }
//     };

//     const refreshChain = (chainId: any) => {
//       setWallet((wallet) => ({ ...wallet, chainId }));
//     };

//     const getProvider = async () => {
//       const provider = await detectEthereumProvider({ silent: true });
//       setHasProvider(Boolean(provider));

//       if (provider) {
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
//         refreshAccounts(accounts);
//         window.ethereum.on("accountsChanged", refreshAccounts);
//         window.ethereum.on("chainChanged", refreshChain);
//       }
//     };

//     getProvider();

//     return () => {
//       window.ethereum?.removeListener("accountsChanged", refreshAccounts);
//       window.ethereum?.removeListener("chainChanged", refreshChain);
//     };
//   }, []);

//   const updateWallet = async (accounts: any) => {
//     const balance = formatBalance(
//       await window.ethereum!.request({
//         method: "eth_getBalance",
//         params: [accounts[0], "latest"],
//       }),
//     );
//     const chainId = await window.ethereum!.request({
//       method: "eth_chainId",
//     });
//     setWallet({ accounts, balance, chainId });
//   };

//   const handleConnect = async () => {
//     /* Updated */
//     setIsConnecting(true); /* New */
//     await window.ethereum
//       .request({
//         /* Updated */ method: "eth_requestAccounts",
//       })
//       .then((accounts: []) => {
//         /* New */
//         setError(false); /* New */
//         updateWallet(accounts); /* New */
//       }) /* New */
//       .catch((err: any) => {
//         /* New */
//         setError(true); /* New */
//         setErrorMessage(err.message); /* New */
//       }); /* New */
//     setIsConnecting(false); /* New */
//   };

//   const disableConnect = Boolean(wallet) && isConnecting;

//   return (
//     <div className="flex items-center gap-5">
//       {!hasProvider && (
//         <div>Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist</div>
//       )}
//       {window.ethereum?.isMetaMask &&
//         wallet.accounts.length < 1 /* Updated */ && (
//           <button
//             disabled={disableConnect}
//             onClick={handleConnect}
//             type="button"
//             className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Connect Wallet
//           </button>
//         )}
//       <div>
//         {wallet.accounts.length > 0 && (
//           <>
//             <div>Wallet Accounts: {wallet.accounts[0]}</div>
//             <div>Wallet Balance: {wallet.balance}</div>
//             <div>Hex ChainId: {wallet.chainId}</div>
//             <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
//           </>
//         )}
//         {error /* New code block */ && (
//           <div onClick={() => setError(false)}>
//             <strong>Error:</strong> {errorMessage}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MetamaskConnect;
