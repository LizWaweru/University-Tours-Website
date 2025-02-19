function Lecturers({lecturers}){
    return (
        <>
            <h3 className="display-3">Lecturers</h3>
            <ul className="list-group list-group-flush">
                {lecturers.map((eachLecturer, index)=>(
                    <li key={index.toString()} className="list-group-item list-group-item-action">{eachLecturer.name} {eachLecturer.department}</li>
                ))}
            </ul>
        </>
    );
}
export default Lecturers;