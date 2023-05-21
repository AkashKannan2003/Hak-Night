//@ts-expect-error
import { PanZoom } from 'react-easy-panzoom'
import { useEffect,useRef } from 'react'
export default function ViewLayer(){
    const canvasRef =   useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext('2d')
        if(!ctx) return
        ctx.fillStyle = 'red'
        ctx.fillRect(0,0,100,100)
    },[])


    return (
        <PanZoom
        className="w-screen h-screen grid place-content-center"
        >
            <canvas className='w-full h-full' ref={canvasRef} />
        </PanZoom>
    )
}