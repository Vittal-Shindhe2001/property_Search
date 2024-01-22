import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetProperties, startGetSortedProperty } from '../action/property_action'
import { faComment, faHeart, faPhone, faPlus, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Apartments(props) {
    const data = props?.data || []
    const [purchaseType, property] = data
    const [location, setLocation] = useState('')
    const [sorting, setSorting] = useState('')
    console.log(sorting);
    const dispatch = useDispatch()
    const sort = ['Amount-Low to High', 'Amount-High to Low']
    const properties = useSelector(state => state.property.data)
    console.table(properties)
    useEffect(() => {
        dispatch(startGetProperties())
    }, [dispatch])

    const handleSort = (e) => {
        setSorting(e.target.value)
    }
    useEffect(() => {
        dispatch(startGetSortedProperty(sorting))
    }, [sorting])
    return (
        <>
            <div className='container-fuild mt-4'>
                <div className="card" style={{ height: "3.5rem" }}>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-6'>
                                {data ? <h5>{purchaseType} for {property} in {location}</h5> : ""}
                            </div>
                            <div className='col-md-2'></div>
                            <div className='mx-auto  col-md-2'>
                                <select value={sorting} onChange={handleSort} className="form-select" aria-label="Default select example">
                                    <option value='' selecte='true'>Sort By</option>
                                    {sort.map((ele, index) => {
                                        return <option key={index} value={ele._id}>{ele}</option>
                                    })}
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {properties.map(ele => (
                <div className='container mt-1' key={ele._id}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="card">
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <img src={`http://127.0.0.1:3056/${ele.image}`} className="card-img-top" alt={ele.propertyType} />
                                        </div>
                                        <div className='col-md-8'>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5 className="card-title">₹{ele.amount}</h5>
                                                    <div className="d-flex justify-content-end align-items-center">
                                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} />
                                                        <FontAwesomeIcon icon={faShare} />
                                                    </div>
                                                </div>
                                                <i >{ele.location}</i>
                                                <hr />
                                                <div className='d-flex justify-content-between align-items-center'>

                                                    <i>{ele.project}</i>
                                                    <div className='d-flex justify-content-end align-items-center'>
                                                        <FontAwesomeIcon icon={faHeart} style={{ marginRight: '10px' }} />
                                                        <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px' }} />
                                                        <FontAwesomeIcon icon={faComment} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
