import axios from 'axios'
import { message } from 'antd'
import Config from './config'

const HttpService = axios.create({
  baseURL: Config.baseUrl + Config.prefix,
  headers: {
    Authorization:
      window.localStorage.getItem('access_token') !== undefined
        ? `Bearer ${localStorage.getItem('access_token')}`
        : 'Bearer null',
    'Cache-Control': 'no-cache',
    'Cross-Domain': 'true',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'fa',
  },
})

const logoutMechanism = () => {
  sessionStorage.clear()
  localStorage.clear()
  if (window.location.pathname.search('/login') < 0) {
    window.location.pathname = '/login'
  }
}

HttpService.interceptors.request.use(
  (config) => {
    const { headers } = config

    const auth = headers?.Authorization

    if (headers && localStorage.getItem('access_token')) {
      headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    }

    if (!auth || (auth && auth === 'Bearer null')) {
      return Promise.reject(config)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

HttpService.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (!error || !error.response) {
      return Promise.reject(error)
    }

    const originalRequest = error.config

    // if (error.response.status === 403) {
    //   logoutMechanism();
    // }

    if (error.response.status === 401) {
      const ref_token = localStorage.getItem('refresh_token')
      const token_request = sessionStorage.getItem('token_request')

      if (!ref_token && !token_request) {
        logoutMechanism()
        return Promise.reject(error)
      }

      if (!token_request) {
        const timer = setTimeout(() => {
          sessionStorage.setItem('token_request', '1')
        }, 2000)
        const params = new URLSearchParams()
        params.append('grant_type', 'refresh_token')
        if (ref_token != null) {
          params.append('refresh_token', ref_token)
        }
        if (!ref_token) {
          logoutMechanism()
        }

        const refreshRetry = await new Promise((resolve, reject) => {
          axios
            .post(Config.baseUrl + Config.getTokenApi, params, {
              headers: {
                Accept: 'application/json;utf-8',
                'Content-Type': 'application/x-www-form-urlencoded;utf-8',
                Authorization: 'Basic test=',
              },
            })
            .then((resp) => {
              clearTimeout(timer)
              sessionStorage.removeItem('token_request')

              const { access_token, refresh_token, expires_in } = resp.data

              if (!access_token && !refresh_token) {
                logoutMechanism()
              }

              if (access_token) {
                localStorage.setItem('access_token', access_token)
              }

              if (refresh_token) {
                localStorage.setItem('refresh_token', refresh_token)
              }

              if (expires_in) {
                localStorage.setItem('expires_in', expires_in)
              }

              axios.defaults.headers.common.Authorization = `Bearer ${access_token}`

              originalRequest.headers.Authorization = `Bearer ${access_token}`

              resolve(axios(originalRequest))
            })
            .catch((err) => {
              logoutMechanism()
              reject(Promise.reject(err))
            })
        })

        return refreshRetry
      }
    }

    // 500
    if (error.response.status === 500) {
      const lastError = localStorage.getItem('500')
      const t = new Date().getTime()

      if (lastError) {
        if (t - Number(lastError) > 60000) {
          localStorage.setItem('500', t.toString())
          message.error('Error in network')
        }
      } else {
        localStorage.setItem('500', t.toString())
        message.error('Error in network')
      }
      return Promise.reject(error)
    }

    if (error.response.data && (error.response.data.errors || error.response.data.message)) {
      const { errors, message: messageServer } = error.response.data

      // errors
      if (errors && errors.length > 0) {
        errors.forEach((error: { field: string; message: string }) => {
          const { field, message: eMassage } = error
          message.error(`${field}: ${eMassage}`)
        })
      }
      if (messageServer && messageServer !== 'Bid not found.') {
        message.error(messageServer)
      }

      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)

export default HttpService
