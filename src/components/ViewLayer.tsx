//@ts-expect-error
import { PanZoom } from 'react-easy-panzoom'
import { useEffect,useRef,useState,useContext } from 'react'
import { AccountContext,addRecord,Color,getRecords,colorMap,stateContext} from '@/lib/appwriteContext'
export default function ViewLayer(){
    const account = useContext(AccountContext)
    const states = useContext(stateContext)
    const {
        colorState: [colorState, setColorState],
    } = states;
    const canvasRef =   useRef<HTMLCanvasElement>(null)
    const [panState,setPanState] = useState({
        x:0,
        y:0,
        scale:1,
        angle:0,
    })
    useEffect(()=>{
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext('2d')
        if(!ctx) return
        getRecords((res:{
            documents: [
                {
                    x:number,
                    y:number,
                    color:Color
                }
            ]
        })=>{
            res.documents.forEach((doc)=>{
                fillPixel(doc.x,doc.y,doc.color)
            }
            )
        })
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
        account.get().then((res:any)=>{
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
        autoCenterZoomLevel={1}
        onStateChange={(state:{
            x:number,
            y:number,
            scale:number,
            angle:0,
        }) => {
            setPanState(state)
        }}
        >
            <canvas className='w-full h-full translate-x-1/3 outline' ref={canvasRef} onClick={
                (e)=>{
                    getCursorPosition(canvasRef.current!,e instanceof MouseEvent ? e : e.nativeEvent)
                }
            } />
        </PanZoom>
    )
}