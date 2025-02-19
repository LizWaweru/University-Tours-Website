import React from 'react';

const Facilities = ({ facilities}) => {
    return (
        <div className="facility">
            <h3 className='display-3'>Facilities</h3>
            <ul className='list-group list-group-flush'>
                {facilities.map((eachFacility, index) => (
                    <li key={index} className='list-group-item list-group-item-action'>{eachFacility}</li>
                ))}
            </ul>
        </div>
    );
}

export default Facilities;