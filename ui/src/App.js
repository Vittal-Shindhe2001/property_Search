import React, { useEffect, useState } from 'react'
import "./App.css"
import Filters from './components/Filters'
import Apartments from './components/Apartments'
import "./style.css"
import ErrorBoundary from './components/Error_boundary'
import { useDispatch } from 'react-redux'
import { startGetfilterProperty, startGetfilterPurchase } from './action/property_action'

export default function App() {
  const [purchaseType, setPurchaseType] = useState('')
  const [property, setPropertyType] = useState('')

  const dispatch = useDispatch()
  const handlePurchaseType = (e) => {
    setPurchaseType(e)
  }
  const handleProperty = (e) => {
    setPropertyType(e)
  }

  useEffect(() => {
    dispatch(startGetfilterPurchase(purchaseType))
  }, [purchaseType])
  useEffect(() => {
    dispatch(startGetfilterProperty(property, purchaseType))
  }, [property, purchaseType])


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <ErrorBoundary>
            <Filters handlePurchaseType={handlePurchaseType} handleProperty={handleProperty} />
          </ErrorBoundary>
        </div>
        <div className='col-md-1'></div>
        <div className="col-md-7">
          <ErrorBoundary>
            <Apartments data={[purchaseType, property]} />
          </ErrorBoundary>
        </div>
      </div>
    </div>

  )
}
