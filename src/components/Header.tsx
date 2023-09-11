import { TodoStatusType } from "../models"

interface Props{
    status:string,
    count:number,
    bg:string
}
export const Header=({status,count,bg}:Props)=>{

    return (
        
        <div className={`${status===TodoStatusType.done?'done':status===TodoStatusType.incompleted?'not-done':'progress'}`} style={{ borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',height:50,paddingLeft:14,color:'black',marginBottom:20} }>
        {status}
        <div style={{marginLeft:20}}>{count}</div>
        </div>
        
    )
}