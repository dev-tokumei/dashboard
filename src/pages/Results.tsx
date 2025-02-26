import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

export const Result: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="container">
      <div className="box">
        <div>
          <h1 className="title">Results</h1>
          <p className="description">Order basket redesing</p>
        </div>
        <div className="back-btn" onClick={() => navigate('/')}>
          <IoIosArrowBack size={25} /> <p>Back</p>
        </div>
      </div>
    </div>
  )
}
