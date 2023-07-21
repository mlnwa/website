import React, { useEffect } from "react"

const Blog = function (){
    useEffect(()=>{
        // console.log("blog");
        return ()=>{
            // console.log("destory");
        }
    })
    return <div>
        blog
    </div>
    
}

export default Blog