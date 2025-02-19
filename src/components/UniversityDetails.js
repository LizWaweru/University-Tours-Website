import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { UniversitiesContext } from "./ContextProvider";
import Programmes from "./Programmes";
import Facilities from "./Facilities";
import Lecturers from "./Lecturers";
import Gallery from "./Gallery";

function UniversityDetails(){
    const { id }=useParams();
    const { universitiesData }=useContext(UniversitiesContext);
    const [universityInfoDisplaying, setUniversityInfoDisplaying]=useState("programmes");
    if(!universitiesData){
        return <p className="text-center mt-5 spinner-border">Loading</p>;
    }
    const university=universitiesData.find(university=>university.id.toString()===id);
    return (
        <div className="container-fluid p-0">
            <header className="bg-info text-white py-4">
                <div className="container">
                    <Link to="/" className="mb-3 text-white">Back to University List</Link>
                    <h1 className="display-4 mb-4">{university.name}</h1>
                </div>
            </header>
            <main className="container my-4">
            <p className="lead mb-4">
                <strong>Location:</strong> {university.county+" county"}
            </p>
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item"><button onClick={()=>setUniversityInfoDisplaying("programmes")} className={`nav-link ${universityInfoDisplaying==="programmes"?"active":""}`}>Programmes</button></li>
                <li className="nav-item"><button onClick={()=>setUniversityInfoDisplaying("facilities")} className={`nav-link ${universityInfoDisplaying==="facilities"?"active":""}`}>Facilities</button></li>
                <li className="nav-item"><button onClick={()=>setUniversityInfoDisplaying("lecturers")} className={`nav-link ${universityInfoDisplaying==="lecturers"?"active":""}`}>Lecturers</button></li>
                <li className="nav-item"><button onClick={()=>setUniversityInfoDisplaying("gallery")} className={`nav-link ${universityInfoDisplaying==="gallery"?"active":""}`}>Gallery</button></li>
            </ul>
            <div className="card">
                <div className="card-body">
                    {universityInfoDisplaying==="programmes"&&<Programmes programmes={university.academics}/>}
                    {universityInfoDisplaying==="facilities"&&<Facilities facilities={university.facilities}/>}
                    {universityInfoDisplaying==="lecturers"&&<Lecturers lecturers={university.lecturers}/>}
                    {universityInfoDisplaying==="gallery"&&<Gallery images={university.gallery}/>}
                </div>
            </div>
            </main>
            <footer className="bg-light text-center py-3 mt-5">
                <p className="mb-0">&copy; 2024 {university.name}. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default UniversityDetails;