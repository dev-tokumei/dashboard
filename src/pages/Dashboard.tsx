// Dashboard.tsx
import React, { useState, useEffect } from 'react'
import { fetchTests, Test } from '../api/api'

import '../styles/table.css'
import { Table } from '../components/Table'

export const Dashboard: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([])
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<keyof Test | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    fetchTests().then(setTests)
  }, [])

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleReset = () => {
    setSearch('')
  }

  const handleSort = (key: keyof Test) => {
    const newOrder = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortKey(key)
    setSortOrder(newOrder)
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 What test are you looking for?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="test-count">{filteredTests.length} tests</span>
      </div>

      {filteredTests.length === 0 ? (
        <div className="no-results">
          <p>Your search did not match any results.</p>
          <button className="reset-button button" onClick={handleReset}>
            Reset
          </button>
        </div>
      ) : (
        <Table
          data={filteredTests}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}
    </div>
  )
}
