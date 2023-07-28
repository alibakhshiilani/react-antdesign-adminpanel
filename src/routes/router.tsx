import React, { Suspense } from 'react'
import { Spin } from 'antd'
import { BrowserRouter, Route } from 'react-router-dom'
import AppContainer from '../components/appContainer/AppContainer'
import PrivateRoute from '../components/privateRoute/PrivateRoute'
import { DashboardRoutes } from '../pages/dashboard/dashboard.route'
import { LoginRoutes } from '../pages/login/login.routes'
import { ContainerRoute } from './containerRoutes.types'
import getContainerRoutes from './containerRoutes'

export const appRoutes: ContainerRoute[] = [...DashboardRoutes, ...LoginRoutes]

export const adminRoutes = getContainerRoutes(appRoutes)

export const haveAccess = (data: any) => {
  // check access
  return true
}

const App = () => {
  return (
    <AppContainer>
      <Suspense fallback={<Spin spinning />}>
        <BrowserRouter>
          {adminRoutes.map((item, index) => {
            return (
              <React.Fragment key={`route-wrapper-${index}`}>
                {item.isPublicRoute ? (
                  <Route exact={item.exact} path={item.path || ''} component={item.component} key={`route-${index}`} />
                ) : (
                  <PrivateRoute
                    exact={item.exact}
                    path={item.path}
                    component={item.component}
                    item={{ ...item }}
                    key={`route-private-${index}`}
                  />
                )}
                {item.children &&
                  item.children.length > 0 &&
                  item.children.map((child, indexChild) => {
                    const access = child.permissions ? haveAccess(child.permissions) : true
                    if (!access) {
                      return <React.Fragment key={`route-wrapper-child-${indexChild}`} />
                    }
                    return (
                      <React.Fragment key={`route-wrapper-child-${indexChild}`}>
                        {item.isPublicRoute ? (
                          <Route
                            exact={child.exact}
                            path={child.path || ''}
                            component={child.component}
                            key={`route-child-${indexChild}`}
                          />
                        ) : (
                          <PrivateRoute
                            exact={child.exact}
                            path={child.path}
                            component={child.component}
                            key={`route-child-private-${indexChild}`}
                            item={{ ...child }}
                          />
                        )}
                        {child.children &&
                          child.children.length > 0 &&
                          child.children.map((nested, indexChild) => {
                            const access = nested.permissions ? haveAccess(nested.permissions) : true
                            if (!access) {
                              return <React.Fragment key={`route-wrapper-child-${indexChild}`} />
                            }
                            return (
                              <React.Fragment key={`route-wrapper-child-${indexChild}`}>
                                {item.isPublicRoute ? (
                                  <Route
                                    exact={nested.exact}
                                    path={nested.path || ''}
                                    component={nested.component}
                                    key={`route-child-${indexChild}`}
                                  />
                                ) : (
                                  <PrivateRoute
                                    exact={nested.exact}
                                    path={nested.path}
                                    component={nested.component}
                                    key={`route-child-private-${indexChild}`}
                                    item={{ ...nested }}
                                  />
                                )}
                              </React.Fragment>
                            )
                          })}
                      </React.Fragment>
                    )
                  })}
              </React.Fragment>
            )
          })}
        </BrowserRouter>
      </Suspense>
    </AppContainer>
  )
}

export default App
