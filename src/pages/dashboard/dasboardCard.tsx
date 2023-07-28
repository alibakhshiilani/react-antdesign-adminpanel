import React from 'react'
import { Card, Typography } from 'antd'
import { DashboardCardInterface } from './dashboard.types'
// import LoginLogo from '../../assets/react antdesign-logo.svg'
import './dashboard.style.scss'

const { Text, Link } = Typography

const DashboardCard: React.FC<DashboardCardInterface> = (props) => {
  const { title, content, value, icons, hrefUrl } = props

  return (
    <Card className='dashboard-card-style'>
      <div className='dashboard-card'>
        <div className='cart-Top'>
          {/* <Image width={30} height={30} src={LoginLogo} /> */}
          <Text strong>{title}</Text>
        </div>

        <div className='card-content'>
          <div className='contentHeight'>{content}</div>
        </div>

        <div className='card-footer'>
          <Link className='footer' href={hrefUrl} target='_blank'>
            نمایش همه
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default DashboardCard
