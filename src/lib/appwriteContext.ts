//@ts-expect-error
import {Client,Account} from 'appwrite'
import {createContext} from 'react'
export const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
.setProject('6468e7942705cfd6a1f9') // Your project ID

export const account = new Account(client)

export const AppwriteContext = createContext(client)
export const AccountContext = createContext(account)