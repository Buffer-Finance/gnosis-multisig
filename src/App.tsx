import { useCallback } from "react";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import counterABI from "./TestABis/counter.json";
import messageABI from "./TestABis/message.json";
import { ethers } from "ethers";

const SafeApp = () => {
  const { sdk, safe } = useSafeAppsSDK();

  const submitTx = useCallback(async () => {
    const providerUrl =
      "https://eth-goerli.g.alchemy.com/v2/Dn8U2J-wzWwQM3EqLryCVFloK9H8OY5q";
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    function generateTransactionData(
      contractAddress: string,
      contractABI: any[],
      functionName: string,
      functionParameters: any[]
    ) {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      return contract.interface.encodeFunctionData(
        functionName,
        functionParameters
      );

      // Encode the function call with the provided parameters
    }
    const random = Math.random().toFixed(3);

    try {
      const { safeTxHash } = await sdk.txs.send({
        txs: [
          {
            to: "0x9ebC361a753Ab4e265fC77cD88940e3f39c5c67B",
            value: "0",
            data: generateTransactionData(
              "0x9ebC361a753Ab4e265fC77cD88940e3f39c5c67B",
              counterABI,
              "update",
              [5]
            ),
          },
          {
            to: "0x611D11d216B8cA76B3eab3A2f62D8706d8d1e865",
            value: "0",
            data: generateTransactionData(
              "0x611D11d216B8cA76B3eab3A2f62D8706d8d1e865",
              messageABI,
              "updateMessage",
              ["Hey dddd" + random]
            ),
          },
        ],
      });
      console.log({ safeTxHash });
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
      console.log({ safeTx });
    } catch (e) {
      console.error(e);
    }
  }, [safe, sdk]);

  return (
    <div>
      {safe.safeAddress}
      <button onClick={submitTx}>Click to send a test transaction</button>
    </div>
  );
};

export { SafeApp };
