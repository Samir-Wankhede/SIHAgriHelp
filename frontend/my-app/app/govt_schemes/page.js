"use client"
import React, { useEffect, useState } from 'react'

export default function GovtSchemes() {
    const [state, setState]=useState()
    const [error, setError]=useState(null)
    useEffect(()=>{
        const getState=async()=>{
            try{
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;          
                    const res = await fetch(`https://apis.mappls.com/advancedmaps/v1/${process.env.GEOCODE_KEY}/rev_geocode?lat=${lat}&lng=${long}`)
                    if (res.ok){
                        const result = await res.json()
                        setState(result.results[0].state)
                    }
                    else{
                        const e = await res.json()
                        setError(e)
                    }
                })
            }
            catch(e){
                console.log(e)
                setError(e)
            }
        }
        getState()
    },[])
    if (error) {
        return <div className="text-red-500 font-semibold text-center mt-6">{error}</div>;
    }
    
  return (
    <div>page</div>
  )
}
