import { useState } from "react";
import "./Gallery.css";
import CloseIcon from '@mui/icons-material/Close';

function Gallery ({images}) {
    const [model, setModel]=useState(false);
    const [tempImgSrc, setTempImgSrc]=useState("");
    function getImage(eachImage){
        setTempImgSrc(eachImage);
        setModel(true);
    }
    return (
        <>
        <div className={model?"model open":"model"}>
            <img src={tempImgSrc} alt=""/>
            <CloseIcon onClick={()=>setModel(false)}/>
        </div>
        <h2>Gallery</h2>
        <div>
            <div className="gallery-images">
                {images.map((eachImage, index) => (
                    <div className="pics" key={index.toString()} onClick={()=>getImage(eachImage)}>
                        <img src={eachImage} alt={`Gallery item ${index+1}`} style={{width:"100%"}} />
                    </div>
                ))}
            </div>
        </div>
        </>
    )

}
export default Gallery;