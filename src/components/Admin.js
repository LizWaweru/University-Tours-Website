import { useState, useContext, useEffect } from 'react';
import { UniversitiesContext } from './ContextProvider';

function Admin() {
  const { universitiesData, setUniversitiesData } = useContext(UniversitiesContext);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    county: "",
    academics: [],
    facilities: [],
    lecturers: [],
    gallery: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log('Universities Data Type:', typeof universitiesData);
    console.log('Universities Data:', universitiesData);
    
    // Convert to array if it's an object
    if (universitiesData && !Array.isArray(universitiesData)) {
      const dataArray = Object.values(universitiesData);
      console.log('Converted to Array:', dataArray);
    }
  }, [universitiesData]);

  useEffect(() => {
    if (selectedUniversity) {
      setFormData(selectedUniversity);
    }
  }, [selectedUniversity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(currentFormData => ({ ...currentFormData, [name]: value }));
  };

  const handleArrayInputChange = (e, field) => {
    const { value } = e.target;
    setFormData(currentFormData => ({ ...currentFormData, [field]: value.split(',').map(item => item.trim()) }));
  };

  const handleLecturerChange = (e, index, field) => {
    const newLecturers = [...formData.lecturers];
    newLecturers[index] = { ...newLecturers[index], [field]: e.target.value };
    setFormData(prevFormData => ({ ...prevFormData, lecturers: newLecturers }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      fetch(`https://universities-json-wnlq.vercel.app//${selectedUniversity.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(updatedUniversity => {
          setUniversitiesData(currentData => {
            // Ensure currentData is an array
            const dataArray = Array.isArray(currentData) 
              ? currentData 
              : currentData && typeof currentData === 'object' 
                ? Object.values(currentData) 
                : [];
            
            return dataArray.map(university => 
              university.id === updatedUniversity.id ? updatedUniversity : university
            );
          });
          resetForm();
        });
    } else {
      fetch("https://universities-json-wnlq.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(newUniversity => {
          setUniversitiesData(currentData => {
            // Ensure currentData is an array
            const dataArray = Array.isArray(currentData) 
              ? currentData 
              : currentData && typeof currentData === 'object' 
                ? Object.values(currentData) 
                : [];
            
            return [...dataArray, newUniversity];
          });
          resetForm();
        });
    }
  };

  const handleEdit = (university) => {
    setSelectedUniversity(university);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    fetch(`https://universities-json-wnlq.vercel.app/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setUniversitiesData(currentData => {
          // Ensure currentData is an array
          const dataArray = Array.isArray(currentData) 
            ? currentData 
            : currentData && typeof currentData === 'object' 
              ? Object.values(currentData) 
              : [];
          
          return dataArray.filter(university => university.id !== id);
        });
      });
  };

  const resetForm = () => {
    setSelectedUniversity(null);
    setIsEditing(false);
    setFormData({
      name: "",
      county: "",
      academics: [],
      facilities: [],
      lecturers: [],
      gallery: []
    });
  };

  // Convert universitiesData to an array
  const universitiesArray = Array.isArray(universitiesData) 
    ? universitiesData 
    : universitiesData && typeof universitiesData === 'object' 
      ? Object.values(universitiesData) 
      : [];

  // Error handling
  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4 text-center">Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name of the university" required/>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="county" value={formData.county} onChange={handleInputChange} placeholder="County" required/>
        </div>
        <div className="mb-3">
          <textarea className="form-control" name="academics" value={formData.academics.join(', ')} onChange={(e)=>handleArrayInputChange(e, 'academics')} placeholder="Academics. If they are many, separate each with a comma"/>
        </div>
        <div className="mb-3">
          <textarea className="form-control" name="facilities" value={formData.facilities.join(', ')} onChange={(e)=>handleArrayInputChange(e, 'facilities')} placeholder="Facilities. If they are many separate each with a comma" />
        </div>
        {formData.lecturers.map((lecturer, index)=>(
          <div key={index} className="mb-3 row">
            <div className="col">
              <input type="text" className="form-control" value={lecturer.name} onChange={(e)=>handleLecturerChange(e, index, 'name')} placeholder="Lecturer Name"/>
            </div>
            <div className="col">
              <input type="text" className="form-control" value={lecturer.department} onChange={(e)=>handleLecturerChange(e, index, 'department')} placeholder="Department" />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={()=>setFormData(currentFormData=>({...currentFormData, lecturers: [...currentFormData.lecturers, {name: "", department: "" }] }))}>
          Add Lecturer
        </button>
        <div className="mb-3">
          <textarea className="form-control" name="gallery" value={formData.gallery.join(', ')} onChange={(e)=>handleArrayInputChange(e, "gallery")} placeholder="Enter image urls. If they are many, put a comma after each url" />
        </div>
        <button type="submit" className="btn btn-primary me-2">{isEditing?"Update University":"Add University"}</button>
        {isEditing && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel Edit</button>}
      </form>

      <h3 className="mb-3">Universities List</h3>
      <ul className="list-group">
        {universitiesArray.map(university => (
          <li key={university.id} className="list-group-item d-flex justify-content-between align-items-center">
            {university.name}
            <div>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(university)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(university.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;