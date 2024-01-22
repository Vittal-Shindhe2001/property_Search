import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import { startGetSearchedProperties, startGetfilterProperty, startGetfilterPurchase } from '../action/property_action';
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux';

export default function Filters() {
    const [search, setSearch] = useState('')
    const [purchaseType, setPurchaseType] = useState('')
    const [property, setPropertyType] = useState('')
    console.log(purchaseType);
    const options = ['Buy', 'Rent', 'PG/Co-Living']
    const propertyType = ['Flat', 'Apartment', 'Independent House', 'Pent House', 'Villa', 'Office Space', 'Warehouse', 'Commercial Land', 'Commercial Space']
    const dispatch = useDispatch()
    //search
    const handleSearch = (e) => {
        setSearch(e.target.value)
        debouncedChangeHandler(e.target.value);
    }
    //debouncing
    const debouncedChangeHandler = useCallback(
        debounce((newValue) => {
            dispatch(startGetSearchedProperties(newValue))
        }, 3000), // The wait time in milliseconds
        [])
    useEffect(() => {
        dispatch(startGetfilterPurchase(purchaseType))
    }, [purchaseType])
    useEffect(() => {
        dispatch(startGetfilterProperty(property, purchaseType))
    }, [property])

    return (

        <div className='container-fuild' id='scrollBar'>
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Filters</h3>
                </div>
                <div className='col-md-6'></div>
                <div className='col-md-4'>
                    <h5 style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faSync} />Reset</h5>
                </div>
            </div>

            <hr />
            <form>
                <div className="mb-3">
                    <label htmlFor="locationInput" className="form-label">Location</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </span>
                        </div>
                        <input value={search} onChange={handleSearch} type="text" className="form-control" id="location" placeholder='Enter Location, Project or Landmark' />
                    </div>
                </div>
            </form>
            <hr />
            <div className='container-fuild'>
                <label><h5>I Want To</h5></label>
                <div className='row'>
                    {options.map((type, index) => (
                        <div className='col-md-3' key={index}>
                            <button value={type} onClick={(e) => { setPurchaseType(e.target.value) }} type="radio" className="btn btn-outline-secondary btn-block btn-rectangular">{type}</button>
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <div className='container-fluid'>
                <label><h5>Property Type</h5></label>
                <div className='row mb-4'>
                    {propertyType.map((type, index) => (
                        <div className='col-md-4 mb-4' key={index}>
                            <button value={type} onClick={(e) => { setPropertyType(e.target.value) }} type="radio" className="btn btn-outline-secondary btn-block btn-rectangular">{type}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

