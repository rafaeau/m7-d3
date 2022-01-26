import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const fetchJobs = async () => {
    const resp = await fetch('https://strive-jobs-api.herokuapp.com/jobs?limit=500')
    if (resp.ok) {
        let jobs = await resp.json();
        return jobs;
    }
}

const fetchCategoriesNames = async () => {
    let resp = await fetch('https://strive-jobs-api.herokuapp.com/jobs/categories');
    if (resp.ok) {
        let categories = await resp.json();
        return categories;
    }
}

const fetchCategory = async (category) => {
    let resp = await fetch(`https://strive-jobs-api.herokuapp.com/jobs?category=${category}&limit=10`);
    if (resp.ok) {
        let categoryContent = await resp.json();
        return categoryContent
    }
}

export default function Homepage() {

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoriesNames, setCategoriesNames] = useState([]);

    useEffect(() => {
        fetchJobs().then((res) => setJobs(res));
        fetchCategory().then((res) => setCategory(res));
        fetchCategoriesNames().then((res) => setCategoriesNames(res));
    }, []);

    return (
        <>
            <h3 className='my-3'>Tech jobs search</h3>
            <FormControl
                className='my-3'
                placeholder="Search jobs"
                value={search.value}
                onChange={(e) => setSearch({ search: e.currentTarget.value.toLowerCase() })}
            />

            <div className='btn-wrap'>
                {categoriesNames && categoriesNames.map(category =>
                    <span key={category}>
                        <Button className='button' onClick={() => {
                            fetchCategory(category);
                        }}>{category}</Button>
                    </span>
                )}
            </div>

            {jobs.data && jobs.data.filter(job => job.title.toLowerCase().indexOf(search) !== -1).map(job =>
                <div key={job._id}>
                    <h5>{job.title}</h5>
                    <h6 className="mb-2">at <Link to={'/' + job.company_name}>{job.company_name}</Link></h6>
                    <hr />
                </div>
            )}
            
        </>
    );

}