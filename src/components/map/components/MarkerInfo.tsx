import React, { useState } from 'react'
import { Descriptions, Image, Modal } from 'antd'
import { Marker } from 'react-google-maps'
import { MarkerInfoPropsTypes } from './markerInfo.types'
import { getDateString } from '../../../app/util'

const MarkerInfo: React.FC<MarkerInfoPropsTypes> = (props) => {
  const { location } = props

  const [thisLocation, setThisLocation] = useState<any | boolean>(false)

  return (
    <>
      <Marker position={{ lat: location.lat, lng: location.lng }} onClick={() => setThisLocation(location)} />

      <Modal
        title='جزییات'
        visible={!!thisLocation}
        onOk={() => setThisLocation(false)}
        onCancel={() => setThisLocation(false)}
        okButtonProps={{ hidden: true }}
        className='flex-Center'
        width={500}
      >
        <Descriptions size='small' bordered>
          <Descriptions.Item label='نام' span={3}>
            {location.title}
          </Descriptions.Item>
          <Descriptions.Item label='نوع' span={3}>
            {location.type}
          </Descriptions.Item>
          <Descriptions.Item label='توضیحات' span={3}>
            {location.description}
          </Descriptions.Item>
          <Descriptions.Item label='بنر' span={3}>
            {location && location.banner
              ? location.banner.map((field: string, index: number) => {
                  return <Image src={field} key={index} alt='banners' width={100} />
                })
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label='وب سایت' span={3}>
            {location && location.metaData && location.metaData.website}
          </Descriptions.Item>
          <Descriptions.Item label='تلفن' span={3}>
            {location && location.metaData && location.metaData.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label='ساعت کار' span={3}>
            {`${(location && location.metaData && location.metaData.workingFrom) || ''}-${
              (location && location.metaData && location.metaData.workingTo) || ''
            }`}
          </Descriptions.Item>
          <Descriptions.Item label='وضعیت' span={3}>
            {/* {PublishStatusTypes[location.status].title} */}
          </Descriptions.Item>
          <Descriptions.Item label='تاریخ انتشار' span={3}>
            {getDateString(location.publishDate)}
          </Descriptions.Item>
          <Descriptions.Item label='آدرس' span={3}>
            {(location && location.address && location.address.route) || '-'}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}

export default MarkerInfo
