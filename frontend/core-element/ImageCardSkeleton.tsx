//https://delba.dev/blog/animated-loading-skeletons-with-tailwind
export default function ImageCardSkeleton() {

    return (<div className="
                space-y-5 rounded-2xl bg-white/5 p-4
                bg-gradient-to-r from-transparent via-rose-100/10 to-transparent
                -translate-x-full animate-[shimmer_2s_infinite]
                relative 
                before:absolute before:inset-0
                before:-translate-x-full
                before:animate-[shimmer_2s_infinite]
                before:bg-gradient-to-r
                before:from-transparent before:via-rose-100/10 before:to-transparent 
                "
    >
        <div className="h-24 rounded-lg bg-rose-100 /10"></div>
        < div className="space-y-3" >
            <div className="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
            <div className="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
            <div className="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
        </div >
    </div >
    )
}