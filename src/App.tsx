import ViewLayer from '@/components/ViewLayer'
import UILayer from './components/UILayer'
import { AppwriteContext,AccountContext,client,account,stateContext,Color } from './lib/appwriteContext'
import { useState } from 'react'
function App() {
  const [colorState,setColorState] = useState(Color.black);
  return (
      <AppwriteContext.Provider value={client}>
      <AccountContext.Provider value={account}>
      <stateContext.Provider value={{
          colorState: [colorState,setColorState]
      }}>
      <main className='w-screen h-screen overflow-hidden grid place-content-center'>
        <ViewLayer />
        <UILayer />
      </main>
      </stateContext.Provider>
      </AccountContext.Provider>
      </AppwriteContext.Provider>
  )
}

export default App
