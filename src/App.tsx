import ViewLayer from '@/components/ViewLayer'
import UILayer from './components/UILayer'
import { AppwriteContext,AccountContext,client,account } from './lib/appwriteContext'
function App() {
  return (
      <AppwriteContext.Provider value={client}>
      <AccountContext.Provider value={account}>
      <main className='w-screen h-screen overflow-hidden grid place-content-center'>
        <ViewLayer />
        <UILayer />
      </main>
      </AccountContext.Provider>
      </AppwriteContext.Provider>
  )
}

export default App
