import { createContext, useEffect, useState } from "react";
export const UniversitiesContext = createContext();

function ContextProvider({children}) {
    const [universitiesData, setUniversitiesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUniversitiesData();
    }, []);

    function fetchUniversitiesData() {
        setIsLoading(true);
        fetch("https://universities-json-wnlq.vercel.app/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Normalize the data to ensure it's an array
            console.log('Raw fetched data:', data);
            
            const normalizedData = Array.isArray(data) 
                ? data 
                : data['universities-list'] 
                  ? data['universities-list'] 
                  : typeof data === 'object' 
                    ? Object.values(data)[0] 
                    : [];

            console.log('Normalized data:', normalizedData);
            
            setUniversitiesData(normalizedData);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setError(error.message);
            setIsLoading(false);
        });
    }

    // Add a method to refresh data
    const refreshUniversitiesData = () => {
        fetchUniversitiesData();
    };

    return (
        <UniversitiesContext.Provider value={{
            universitiesData, 
            setUniversitiesData, 
            isLoading, 
            error, 
            refreshUniversitiesData
        }}>
            {children}
        </UniversitiesContext.Provider>
    );
}

export default ContextProvider;