//@ts-expect-error
import {Client,Account,Databases} from 'appwrite'
import {createContext,Dispatch,SetStateAction} from 'react'
//@ts-expect-error
import { ID,Query } from 'appwrite'
export const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
.setProject('6468e7942705cfd6a1f9') // Your project ID

export const account = new Account(client)

export const AppwriteContext = createContext(client)
export const AccountContext = createContext(account)
const databases = new Databases(client);

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
//databaseId: 6469c715420054054da9
//collectionId: 6469f603252eeb749a43

export function getAllPages(collectionId:string,Callback?:Function){
    let records:any[] = []
    let page = 0

    function getRecords(){
        databases.listDocuments('6469c715420054054da9', collectionId, [
            Query.limit(100),
            Query.offset(page*100)
        ]).then((response:any) => {
            records = records.concat(response.documents)
            if(response.total > (page+1)*100){
                page++
                getRecords()
            }else{
                if(Callback){
                    Callback(records)
                }
            }
        }).catch((error:any) => {
            console.log(error);
        });
    }
    getRecords()
}



export function getRecords(Callback?:Function){
    getAllPages("6469f603252eeb749a43",Callback)
}


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
