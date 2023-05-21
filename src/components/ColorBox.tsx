import { Color,stateContext,colorMap } from "@/lib/appwriteContext"
import { useContext } from "react"
export default function ColorBox(){
    const {
        colorState: [colorState, setColorState],
    } = useContext(stateContext);

    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="flex flex-row w-screen h-[100px] bg-gray-600 rounded-t-2xl overflow-hidden" >
                {
                    Object.keys(colorMap).map((key)=>{
                        return (
                            <div className={`w-1/6 h-full ${Number(key) === colorState ? "flex-[2]" : "flex-1 transition-all"}`} key={key}>
                                <div className="w-full h-full cursor-pointer border border-black" onClick={()=>{
                                    setColorState(Number(key) as Color)
                                }} style={{backgroundColor:colorMap[Number(key) as Color]}}></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}