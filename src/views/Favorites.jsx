import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
    favorites: state.favorites
})

const Favorites = ({ favorites }) => (
    <>

    <h3 className='mt-3 mb-4'>Favorite jobs:</h3>
    {favorites && favorites.map(job => (
        <div key={job._id} className='d-flex'>
            <h5>{job.title}</h5>
            <h6 className="mb-2 mt-1 ml-1">at <Link to={'/' + job.company_name}>{job.company_name}</Link></h6>
            <hr />
        </div>
    ))}

    </>
);

export default connect(mapStateToProps)(Favorites);