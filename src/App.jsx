import React, { useCallback } from 'react'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import Web3 from 'web3'
import counterABI from './TestABis/counter.json'
import messageABI from './TestABis/message.json'
const provider = new Web3.providers.HttpProvider('https://eth-goerli.g.alchemy.com/v2/Dn8U2J-wzWwQM3EqLryCVFloK9H8OY5q')
const web3 = new Web3(provider)
const SafeApp = () => {
  const { sdk, safe } = useSafeAppsSDK()

  const submitTx = useCallback(async () => {
    function generateTransactionData(contractAddress, contractABI, functionName, functionParameters) {
      const contract = new web3.eth.Contract(contractABI, contractAddress)

      const functionObject = contract.methods[functionName]

      // Check if the function exists in the contract ABI
      if (!functionObject) {
        throw new Error(`Function '${functionName}' not found in the contract ABI.`)
      }

      // Encode the function call with the provided parameters
      const functionCallData = functionObject(...functionParameters).encodeABI()

      return functionCallData
    }

    try {
      const { safeTxHash } = await sdk.txs.send({
        txs: [
          {
            to: '0x9ebC361a753Ab4e265fC77cD88940e3f39c5c67B',
            value: '0',
            data: generateTransactionData('0x9ebC361a753Ab4e265fC77cD88940e3f39c5c67B', counterABI, 'update', [0]),
          },
          {
            to: '0x611D11d216B8cA76B3eab3A2f62D8706d8d1e865',
            value: '0',
            data: generateTransactionData('0x611D11d216B8cA76B3eab3A2f62D8706d8d1e865', messageABI, 'updateMessage', [
              'Hey Ken',
            ]),
          },
        ],
      })
      console.log({ safeTxHash })
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash)
      console.log({ safeTx })
    } catch (e) {
      console.error(e)
    }
  }, [safe, sdk])

  return (
    <div>
      {safe.safeAddress}

      <button onClick={submitTx}>Click to send a test transaction</button>

      {/* <Link href="https://github.com/safe-global/safe-apps-sdk" target="_blank" rel="noreferrer">
        Documentation
      </Link> */}
    </div>
  )
}

export default SafeApp
