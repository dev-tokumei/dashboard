import React, { useState } from 'react'

interface FilterProps {
  onFilter: (query: string) => void
}

export const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [query, setQuery] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)
    onFilter(value)
  }

  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={query}
      onChange={handleChange}
    />
  )
}
