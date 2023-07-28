import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.less'
import '../../assets/styles/lightApp.scss'

const AppContainer = (props: any) => {
  const { children } = props
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchPermissions())
    // dispatch(fetchRoles());
    // dispatch(fetchProfile())
    // dispatch(fetchRoles())
    // sample permission with redux
  }, [])

  return <div>{children}</div>
}

export default AppContainer
