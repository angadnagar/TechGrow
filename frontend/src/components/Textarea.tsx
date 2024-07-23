import { ChangeEvent } from "react"

export const Textarea=({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>) => void})=>{
    return <div className="pt-2">
        <textarea onChange={onChange}  rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Content"></textarea>
        
    </div>
}