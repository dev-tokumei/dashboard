import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { Test } from '../api/api'
import { fetchSites } from '../api/api'
import '../styles/table.css'

interface Site {
  id: number
  url: string
}

interface TableRowProps {
  test: Test
}

export const TableRow: React.FC<TableRowProps> = ({ test }) => {
  const [hovered, setHovered] = useState(false)
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const statusColors: Record<string, string> = {
    Online: '#1BDA9D',
    Paused: '#FF8346',
    Stopped: '#FE4848',
    Draft: '#5C5C5C',
  }

  const formattedStatus =
    test.status.charAt(0).toUpperCase() + test.status.slice(1).toLowerCase()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const siteData = await fetchSites()
        setSites(siteData)
        setLoading(false)
      } catch (error) {
        setError('Error loading sites')
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const site = sites.find((site) => Number(site.id) === Number(test.siteId))
  const siteUrl = site
    ? site.url.replace(/https?:\/\/(www\.)?/, '')
    : 'Unknown site'

  if (loading) {
    return (
      <tr>
        <td colSpan={5}>
          <div className="loading-container">
            <div className="spinner"></div> Loading...
          </div>
        </td>
      </tr>
    )
  }

  if (error) {
    return (
      <tr>
        <td colSpan={5} className="error-message">
          {error}
        </td>
      </tr>
    )
  }

  return (
    <tr
      className={classNames('table-row', {
        'table-row-hover': hovered,
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td
        className="name-text"
        style={{
          borderLeft: `3px solid ${
            test.siteId % 3 === 0
              ? '#E14165'
              : test.siteId % 2 === 0
                ? '#C2C2FF'
                : '#8686FF'
          }`,
        }}
      >
        {test.name}
      </td>
      <td className="type-text">{test.type}</td>
      <td>
        <span
          className="status-text"
          style={{ color: statusColors[formattedStatus] || '#000000' }}
        >
          {formattedStatus}
        </span>
      </td>
      <td className="status-text">{siteUrl}</td>
      <td>
        {formattedStatus === 'Draft' ? (
          <button
            className="button button-finalize"
            onClick={() => navigate(`/finalize/${test.id}`)}
          >
            Finalize
          </button>
        ) : (
          <button
            className="button button-results"
            onClick={() => navigate(`/result/${test.id}`)}
          >
            Results
          </button>
        )}
      </td>
    </tr>
  )
}
