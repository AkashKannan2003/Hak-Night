//@ts-expect-error
import { PanZoom } from 'react-easy-panzoom'
import { useEffect,useRef,useState,useContext } from 'react'
import { AccountContext } from '@/lib/appwriteContext'
export default function ViewLayer(){
    const account = useContext(AccountContext)
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
        ctx.strokeStyle = 'black'
        ctx.strokeRect(0,0,canvas.width,canvas.height)
    },[])
    function fillPixel(x:number,y:number){
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext('2d')
        if(!ctx) return
        ctx.fillStyle = 'black'
        ctx.fillRect(x,y,1,1)   
    }

    function getCursorPosition(canvas:HTMLCanvasElement, event:MouseEvent) {
        const rect = canvas.getBoundingClientRect()
        const x = Math.floor((event.clientX - rect.left) / panState.scale)
        const y = Math.floor((event.clientY - rect.top) / panState.scale)
        console.log("x: " + x + " y: " + y)
        account.get().then((res:any)=>{
            fillPixel(x,y)
        }).catch((err:any)=>{
            
        }
        )
    }
    
    return (
        <PanZoom
        className="w-screen h-screen grid place-content-center"
        style={{imageRendering: "pixelated"}}
        autoCenter={true}
        autoCenterZoomLevel={8}
        onStateChange={(state:{
            x:number,
            y:number,
            scale:number,
            angle:0,
        }) => {
            setPanState(state)
        }}
        >
            <canvas className='w-full h-full translate-x-1/3' ref={canvasRef} onClick={
                (e)=>{
                    getCursorPosition(canvasRef.current!,e instanceof MouseEvent ? e : e.nativeEvent)
                }
            } />
        </PanZoom>
    )
}