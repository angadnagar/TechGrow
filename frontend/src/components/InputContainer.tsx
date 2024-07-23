
 
 interface inputProps{
    label:string,
    placeholder:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void,
    type?:string
 }

 export const InputContainer=({label,placeholder,onChange,type}:inputProps)=>{
     return <div>
        <div>
            <label  className="pt-2 block mb-2 text-sm font-medium text-black ">{label}</label>
            <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={onChange} placeholder={placeholder} required />
        </div>
     </div>
 }