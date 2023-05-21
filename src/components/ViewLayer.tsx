//@ts-expect-error
import { PanZoom } from 'react-easy-panzoom'
import { useEffect,useRef,useState,useContext } from 'react'
import { AccountContext,addRecord,Color,getRecords,colorMap,stateContext,AppwriteContext} from '@/lib/appwriteContext'
export default function ViewLayer(){
    const account = useContext(AccountContext)
    const states = useContext(stateContext)
    const client = useContext(AppwriteContext)

    const {
        colorState: [colorState, _],
    } = states;
    const canvasRef =   useRef<HTMLCanvasElement>(null)
    const [panState,setPanState] = useState({
        x:0,
        y:0,
        scale:1,
        angle:0,
    })
    useEffect(()=>{
        const unsubscribe = client.subscribe(['databases.6469c715420054054da9.collections.6469f603252eeb749a43.documents'], (response:any) => {
            // Callback will be executed on changes for documents A and all files.
            fillPixel(response.payload.x,response.payload.y,response.payload.color)
        });
        
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext('2d')
        if(!ctx) return
        getRecords((res:Array<{
            x:number,
            y:number,
            color:Color
        }>)=>{
            console.log(res)
            res.forEach((doc)=>{
                fillPixel(doc.x,doc.y,doc.color)
            }
            )
        })

        return ()=>{
            unsubscribe()
        }
    },[])
    function fillPixel(x:number,y:number,color:Color=Color.black){
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext('2d')
        if(!ctx) return
        ctx.fillStyle = colorMap[color]
        ctx.fillRect(x,y,1,1)   
    }

    function getCursorPosition(canvas:HTMLCanvasElement, event:MouseEvent) {
        const rect = canvas.getBoundingClientRect()
        const x = Math.floor((event.clientX - rect.left) / panState.scale)
        const y = Math.floor((event.clientY - rect.top) / panState.scale)
        console.log("x: " + x + " y: " + y)
        account.get().then(()=>{
            addRecord(x,y,colorState,()=>{
                fillPixel(x,y,colorState)
            })
        })
    }
    
    return (
        <PanZoom
        className="w-screen h-screen grid place-content-center"
        style={{imageRendering: "pixelated"}}
        autoCenter={true}
        autoCenterZoomLevel={0.8}
        realPinch={true}
        onStateChange={(state:{
            x:number,
            y:number,
            scale:number,
            angle:0,
        }) => {
            setPanState(state)
        }}
        >
            <canvas className='w-full h-full -translate-x-1/2 -translate-y-1/2 outline' ref={canvasRef} onClick={
                (e)=>{
                    getCursorPosition(canvasRef.current!,e instanceof MouseEvent ? e : e.nativeEvent)
                }
            } />
        </PanZoom>
    )
}