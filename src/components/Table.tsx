import React from 'react'
import { TableRow } from './TableRow'
import { Test } from '../api/api'
import { sortTests } from '../utils/sorting'
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa'

interface TableProps {
  data: Test[]
  sortKey: keyof Test | null
  sortOrder: 'asc' | 'desc'
  onSort: (key: keyof Test) => void
}

export const Table: React.FC<TableProps> = ({
  data,
  sortKey,
  sortOrder,
  onSort,
}) => {
  const sortedData = sortTests(data, sortKey ?? 'name', sortOrder) // Если sortKey null, по умолчанию сортируем по "name"

  const renderSortIcon = (key: keyof Test) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
    }
    return <FaSort />
  }

  const handleSort = (key: keyof Test) => {
    if (sortKey !== key) {
      onSort(key)
    } else {
      onSort(key)
    }
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>
            Name {sortKey === 'name' && renderSortIcon('name')}
          </th>
          <th onClick={() => handleSort('type')}>
            Type {sortKey === 'type' && renderSortIcon('type')}
          </th>
          <th onClick={() => handleSort('status')}>
            Status {sortKey === 'status' && renderSortIcon('status')}
          </th>
          <th onClick={() => handleSort('site')}>
            Site {sortKey === 'site' && renderSortIcon('site')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((test) => (
          <TableRow key={test.id} test={test} />
        ))}
      </tbody>
    </table>
  )
}
