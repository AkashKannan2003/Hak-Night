//@ts-expect-error
import {Client,Account,Databases} from 'appwrite'
import {createContext,Dispatch,SetStateAction} from 'react'
//@ts-expect-error
import { ID } from 'appwrite'
export const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
.setProject('6468e7942705cfd6a1f9') // Your project ID

export const account = new Account(client)

export const AppwriteContext = createContext(client)
export const AccountContext = createContext(account)
const databases = new Databases(client);

export const database = databases.listDocuments('6469c715420054054da9', '6469f603252eeb749a43');

export function addRecord(x:number,y:number,color:Color,Callback?:Function){
    databases.createDocument('6469c715420054054da9', '6469f603252eeb749a43',ID.unique(), {
        x:x,
        y:y,
        color:color
    }
    ).then((response:any) => {
        console.log(response);
        if(Callback){
            Callback()
        }
    }
    ).catch((error:any) => {
        console.log(error);
    }
    );
}


export function getRecords(Callback?:Function){
    databases.listDocuments('6469c715420054054da9', '6469f603252eeb749a43').then((response:any) => {
        console.log(response);
        if(Callback){
            Callback(response)
        }
    }
    ).catch((error:any) => {
        console.log(error);
    }
    );
}

export const DatabaseContext = createContext(database);


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
    colorState: [Color.black, () => {}]
})
