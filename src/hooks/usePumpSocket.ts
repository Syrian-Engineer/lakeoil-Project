"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"

export  function usePumpSocket(){
    const dispatch  = useDispatch

    useEffect(()=>{
        const sockect = new WebSocket("ws://fursan.oktin.ak4tek.com:8080")

        sockect.onopen = ()=>{
            console.log("✅ WebSocket connected")
        }

        sockect.onmessage = ()=>{
            
        }
    })
}