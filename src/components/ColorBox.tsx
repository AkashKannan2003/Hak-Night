import { Color,stateContext,colorMap } from "@/lib/appwriteContext"
import { useContext } from "react"
export default function ColorBox(){
    const {
        colorState: [_, setColorState],
    } = useContext(stateContext);

    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="flex flex-row w-[400px] h-[100px] bg-gray-600 rounded-t-2xl overflow-hidden" >
                {
                    Object.keys(colorMap).map((key)=>{
                        return (
                            <div className="w-1/6 h-full" key={key}>
                                <div className={`w-full h-full cursor-pointer`} onClick={()=>{
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