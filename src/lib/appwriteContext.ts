//@ts-expect-error
import {Client,Account} from 'appwrite'
import {createContext,Dispatch,SetStateAction} from 'react'
export const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
.setProject('6468e7942705cfd6a1f9') // Your project ID

export const account = new Account(client)

export const AppwriteContext = createContext(client)
export const AccountContext = createContext(account)

export const enum Color {
    red,
    blue,
    green,
    yellow,
    orange,
    purple,
    pink,
    teal,
    indigo,
    gray,
    black,
    white
}
export const colorMap = {
    [Color.red]: "red",
    [Color.blue]: "blue",
    [Color.green]: "green",
    [Color.yellow]: "yellow",
    [Color.orange]: "orange",
    [Color.purple]: "purple",
    [Color.pink]: "pink",
    [Color.teal]: "teal",
    [Color.indigo]: "indigo",
    [Color.gray]: "gray",
    [Color.black]: "black",
    [Color.white]: "white"
}

export const stateContext = createContext<{
    colorState: [
        Color,
        Dispatch<SetStateAction<Color>>
    ]
}>({
    colorState: [0, () => {}]
})
