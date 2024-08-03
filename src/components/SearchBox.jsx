import { useContext, useEffect, useState } from "react"

export default function SearchBox(prop) {
    
    function inputHandler(e) {
        const lowerCase = e.target.value.toLowerCase()
        console.log(lowerCase)
        // search.setInputText(lowerCase)
        prop.setInputText(lowerCase)
    }

    return (
        <>
            <input className="rounded-lg p-1" onChange={inputHandler}></input>
        </>
    )

}