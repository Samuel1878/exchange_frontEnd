export const TradeButton = ({label, action, style="", textStyle=""}:{label:string, action:()=>void, style:string, textStyle:string}) => {
      return(
            <button onClick={action} className={`${style} flex items-center justify-center rounded-md`}>
                  <p className={`${textStyle} text-md`}>{label}</p>
            </button>
      )
}