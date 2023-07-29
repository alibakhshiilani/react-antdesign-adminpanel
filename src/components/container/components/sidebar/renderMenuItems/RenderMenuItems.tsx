import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { getActivePath } from '../components/getActivePath'
import { MenuItemsTypes } from './renderMenuItem.types'
import { ActivePathTypes } from '../../breadcrumb/breadcrumb.types'
import { haveAccess } from '../../../../../routes/router'

const RenderMenuItems: React.FC<MenuItemsTypes> = (props) => {
  const { routes } = props
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<any>('')
  const [openKeys, setOpenKeys] = useState<any>([])
  // const { data: profile } = useSelector((state: any) => state.profileReducer);

  useEffect(() => {
    setActivePath()
    // eslint-disable-next-line
  }, [])

  const setActivePath = () => {
    const activePath: ActivePathTypes | any = getActivePath(routes, location)
    if (activePath && activePath.currentMenu && activePath.currentMenu.id && activePath.currentMenu.id !== openKeys) {
      if (activePath.hasChildren) {
        setOpenKeys([activePath.item.id.toString()])
      } else {
        setOpenKeys([])
      }

      setSelectedKeys(activePath.currentMenu.id)
    }
  }

  return (
    <Menu
      theme='light'
      mode='inline'
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys)}
      defaultSelectedKeys={['2']}
      defaultOpenKeys={['']}
      onSelect={({ key }) => {
        setSelectedKeys(key)
      }}
      selectedKeys={selectedKeys.toString()}
    >
      {routes &&
        routes.map((item, index) => {
          let {
            // eslint-disable-next-line prefer-const
            titleFa,
            // eslint-disable-next-line prefer-const
            title,
            // eslint-disable-next-line prefer-const
            icon,
            path,
            // eslint-disable-next-line prefer-const
            showInSideBar,
            // eslint-disable-next-line prefer-const
            id,
            // eslint-disable-next-line prefer-const
            children,
            // eslint-disable-next-line prefer-const
            sidebarPathParams,
          } = item

          if (sidebarPathParams && typeof sidebarPathParams === 'object') {
            for (const key in sidebarPathParams) {
              // eslint-disable-next-line no-prototype-builtins
              if (sidebarPathParams.hasOwnProperty(key)) {
                const val = sidebarPathParams[key]
                path = path && path.replace(`:${key}`, val)
              }
            }
          }

          let access: string | boolean = false
          if (item.children && item.children.length > 0) {
            item.children.forEach((child) => {
              if (access === false && haveAccess(child.permissions)) {
                access = true
              }
            })
          } else {
            access = true
          }

          if (access && item.permissions && item.permissions.length > 0) {
            access = haveAccess(item.permissions)
          }

          if ((typeof showInSideBar !== 'undefined' && !showInSideBar) || !access) {
            return <span key={`sidebar-${index}`} />
          }

          if (children) {
            return (
              <Menu.SubMenu key={`${id}`} icon={icon} title={title || titleFa}>
                {children.map((child, index) => {
                  const access = child.permissions ? haveAccess(child.permissions) : true

                  if ((typeof child.showInSideBar !== 'undefined' && !child.showInSideBar) || !access) {
                    return <span key={`sidebar-children-${index}`} />
                  }

                  if (child && child.sidebarPathParams && typeof child.sidebarPathParams === 'object') {
                    for (const key in child.sidebarPathParams) {
                      // eslint-disable-next-line no-prototype-builtins
                      if (child.sidebarPathParams.hasOwnProperty(key)) {
                        const val = child.sidebarPathParams[key]
                        // @ts-ignore
                        child.path = child.path.replace(`:${key}`, val)
                      }
                    }
                  }

                  //= =========================================

                  if (child.children) {
                    return (
                      <Menu.SubMenu key={`${child.id}`} icon={child.icon} title={child.title || child.titleFa}>
                        {child.children.map((nested, nestedIndex) => {
                          const access = nested.permissions ? haveAccess(nested.permissions) : true

                          if ((typeof nested.showInSideBar !== 'undefined' && !nested.showInSideBar) || !access) {
                            return <span key={`sidebar-children-${nestedIndex}`} />
                          }

                          if (
                            child.children &&
                            nested.sidebarPathParams &&
                            typeof nested.sidebarPathParams === 'object'
                          ) {
                            for (const key in nested.sidebarPathParams) {
                              if (
                                // eslint-disable-next-line no-prototype-builtins
                                nested.sidebarPathParams.hasOwnProperty(key)
                              ) {
                                const val = nested.sidebarPathParams[key]
                                // @ts-ignore
                                nested.path = nested.path.replace(`:${key}`, val)
                              }
                            }
                          }

                          return (
                            <Menu.Item key={nested.id} icon={nested.icon}>
                              <Link to={(child && nested.path) || '/'}>
                                {nested.title ? nested.title : nested.titleFa}
                              </Link>
                            </Menu.Item>
                          )
                        })}
                      </Menu.SubMenu>
                    )
                  }
                  //= ==========================================================

                  return (
                    <Menu.Item key={child.id} icon={child.icon}>
                      <Link to={(child && child.path) || '/'}>{child.title ? child.title : child.titleFa}</Link>
                    </Menu.Item>
                  )
                })}
              </Menu.SubMenu>
            )
          }

          return (
            <Menu.Item key={`${id}`} icon={icon}>
              <Link to={path || '/'}>{title || titleFa}</Link>
            </Menu.Item>
          )
        })}
    </Menu>
  )
}

export default RenderMenuItems
