import React from 'react'
import "./App.css"
import Filters from './components/Filters'
import Apartments from './components/Apartments'
import "./style.css"
import ErrorBoundary from './components/Error_boundary'

export default function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <ErrorBoundary>
            <Filters />
          </ErrorBoundary>
        </div>
        <div className='col-md-1'></div>
        <div className="col-md-7">
          <ErrorBoundary>
            <Apartments />
          </ErrorBoundary>
        </div>
      </div>
    </div>

  )
}
