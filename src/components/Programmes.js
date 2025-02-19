function Programmes({programmes}){
    return (
        <>
            <h3 className="display-3">Programmes</h3>
            <ul className="list-group list-group-flush">
                {programmes.map((eachProgram, index)=>(
                    <li key={index.toString()} className="list-group-item list-group-item-action">{eachProgram}</li>
                ))}
            </ul>
        </>
    );
}
export default Programmes;