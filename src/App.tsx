//@ts-expect-error
import { Client,Account } from 'appwrite'
import {createContext} from 'react'
import ViewLayer from '@/components/ViewLayer'
function App() {
  const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('6468e7942705cfd6a1f9') // Your project ID

  const clientContext = createContext(client)

  const account = new Account(client)

  const accountContext = createContext(account)
  return (
    <clientContext.Provider value={client}>
      <accountContext.Provider value={account}>
      <main className='w-screen h-screen overflow-hidden grid place-content-center'>
        <ViewLayer />
      </main>
      </accountContext.Provider>
    </clientContext.Provider>
  )
}

export default App
