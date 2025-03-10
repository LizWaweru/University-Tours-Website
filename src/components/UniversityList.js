import { useContext, useState, useEffect } from "react";
import { UniversitiesContext } from "./ContextProvider";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function UniversityList() {
    const { universitiesData } = useContext(UniversitiesContext);
    const [selectedCounty, setSelectedCounty] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        // Log the type and value of universitiesData
        console.log('Universities Data Type:', typeof universitiesData);
        console.log('Universities Data:', universitiesData);

        // Extract universities from the nested structure
        const extractedUniversities = universitiesData?.['universities-list'] || 
                                      (Array.isArray(universitiesData) ? universitiesData : 
                                       (typeof universitiesData === 'object' ? Object.values(universitiesData)[0] : []));

        console.log('Extracted Universities:', extractedUniversities);

        if (extractedUniversities && extractedUniversities.length > 0) {
            setUniversities(extractedUniversities);
            setIsLoading(false);
        } else {
            setError('No universities data available');
            setIsLoading(false);
        }
    }, [universitiesData]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const filteredUniversities = selectedCounty 
        ? universities.filter((eachUniversity) => eachUniversity.county === selectedCounty)
        : universities;
        
    return (
        <>
            <div className="container my-4">
                <h1 style={{ color: "#333" }} className="text-center mb-4 display-1">
                    Universities {selectedCounty ? `in ${selectedCounty}` : "in Kenya"}
                </h1>
                <div className="text-center mb-4">
                    <select onChange={(e) => setSelectedCounty(e.target.value)} value={selectedCounty} className="form-select w-50 mx-auto">
                        <option value="">All</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Uasin Gishu">Uasin Gishu</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Kiambu">Kiambu</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Nyeri">Nyeri</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Machakos">Machakos</option>
                    </select>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredUniversities.map((eachUniversity) => {
                    const imagesToDisplay = Array.isArray(eachUniversity.gallery) 
                        ? eachUniversity.gallery.slice(0, 3) 
                        : [];
                    
                    const carouselId = `carousel-${eachUniversity.id}`;
                    
                    return (
                        <div key={eachUniversity.id} className="col">
                            <div className="card mt-4 shadow-sm hover-effect" style={{ width: "32rem" }}>
                                <div id={carouselId} className="carousel slide">
                                    <div className="carousel-indicators">
                                        {imagesToDisplay.map((_, index) => (
                                            <button key={`indicator-${eachUniversity.id}-${index}`}
                                                type="button" 
                                                data-bs-target={`#${carouselId}`} 
                                                data-bs-slide-to={index} 
                                                className={index === 0 ? "active" : ""} 
                                                aria-current={index === 0 ? "true" : "false"} 
                                                aria-label={`Slide ${index + 1}`}
                                            ></button>
                                        ))}
                                    </div>
                                    <div className="carousel-inner">
                                        {imagesToDisplay.map((image, index) => (
                                            <div 
                                                key={`slide-${eachUniversity.id}-${index}`} 
                                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                            >
                                                <img 
                                                    src={image} 
                                                    className="d-block w-100" 
                                                    alt={`Gallery item ${index + 1} for ${eachUniversity.name}`}
                                                    style={{height: "200px", objectFit: "cover"}}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title h4 mb-3 text-primary">{eachUniversity.name}</h2>
                                    <p className="card-text mb-2">Location: {eachUniversity.county + " county"}</p>
                                    <p className="card-text">Number of programmes: {eachUniversity.academics?.length || 0}</p>
                                    <Link to={`/university/${eachUniversity.id}`} className="btn btn-outline-primary btn-sm mt-2">Learn More</Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default UniversityList;