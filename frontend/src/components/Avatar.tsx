
export const Avatar=({name,size="small"}:{name:string,size?:string})=>{
    return <div className={`inline-flex items-center justify-center ${size=="small" ? "w-6 h-6" : "w-8 h-8"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size=="small" ? "text-xs" : "text-md" } text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>
}