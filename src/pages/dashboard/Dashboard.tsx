import React from 'react'
import './dashboard.style.scss'
import Container from '../../components/container/Container'

const Dashboard = () => {
  const locationPathName = window.location.pathname

  return (
    <Container classNames='Dashboard'>
      <div className='site-card-wrapper'>
        <p>Admin Dashboard Contents</p>
      </div>
    </Container>
  )
}

export default Dashboard
