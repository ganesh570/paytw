export function InputBox({label,placeholder,onChange,ty}){
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input type={ty} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" onChange={onChange}></input>
    </div>
}