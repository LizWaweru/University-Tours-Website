import { createContext, useEffect, useState } from "react";
export const UniversitiesContext=createContext();

function ContextProvider({children}){
    const [universitiesData, setUniversitiesData]=useState([]);
    useEffect(()=>{
        fetchUniversitiesData();
    }, []);
    function fetchUniversitiesData(){
        fetch("https://universities-json-wnlq.vercel.app/")
        .then(response=>response.json())
        .then(data=>setUniversitiesData(data))
        .catch(error=>console.error("Error fetching data:",error));
    }
    return (
        <>
            <UniversitiesContext.Provider value={{universitiesData, setUniversitiesData}}>
                {children}
            </UniversitiesContext.Provider>
        </>
    );
}

export default ContextProvider;