import { Link } from "react-router-dom";
// Import the university image directly
import universityImage from "../assets/universityPic2.jpg";

function HomePage() {

    return (
        <div className="container my-10">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card border-0 shadow-lg">
                        <img 
                            src={universityImage} 
                            className="card-img-top" 
                            alt="Kenyan University Campus" 
                            style={{height: "400px", objectFit: "cover"}}
                        />
                        <div className="card-body p-5">
                            <h1 className="card-title text-center mb-4">Higher Education in Kenya</h1>
                            
                            <p className="lead">
                                Kenya has a number of universities and other institutions of higher learning. It boasts a rich landscape of higher education institutions that are shaping the future of East Africa through innovation, research, and academic excellence.
                            </p>
                            
                            <h3 className="mt-4">Education System Overview</h3>
                            <p>
                                Kenya's university system consists of public and private institutions offering diverse programs across multiple disciplines. The higher education sector has grown significantly since the establishment of the first university in 1970, now serving over 500,000 students nationwide.
                            </p>
                            
                            <h3 className="mt-4">Academic Excellence</h3>
                            <p>
                                Kenyan universities are known for their strong programs in Research, Technology, Medicine, and Business. Many institutions have established international partnerships to enhance research capabilities and provide students with global perspectives and opportunities.
                            </p>
                            
                            <h3 className="mt-4">University Categories</h3>
                            <ul>
                                <li><strong>Public Universities</strong> - Government-funded institutions with extensive research facilities</li>
                                <li><strong>Private Universities</strong> - Independently run institutions with specialized programs</li>
                                <li><strong>Technical Universities</strong> - Focus on applied sciences and technological innovation</li>
                            </ul>
                            
                            <div className="text-center mt-5">
                                <Link to="/about" className="btn btn-primary btn-lg">
                                    Explore Kenyan Universities
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;