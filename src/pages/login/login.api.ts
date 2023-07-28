import axios, { AxiosResponse } from 'axios'
import Config from '../../app/config'

export const handleLogin: ({
  username,
  password,
}: {
  username: string
  password: string
}) => Promise<AxiosResponse> = ({ username, password }) => {
  const params = new URLSearchParams()
  params.append('grant_type', 'password')
  params.append('username', username)
  params.append('password', password)

  const handleLoginAdapter = axios.create({
    baseURL: Config.baseUrl,
    headers: {
      Authorization: 'Basic test=',
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': 'fa',
    },
    // auth: {
    //   username: Config.credential.username,
    //   password: Config.credential.password,
    // },
  })
  return handleLoginAdapter.post(Config.getTokenApi, params)
}

export const handleForgetPass = (data: object) => {
  return axios.post(`${Config.baseUrl}public/v2/password/forget`, data, {
    headers: {
      Accept: 'application/json',
    },
    auth: {
      username: Config.credential.username,
      password: Config.credential.password,
    },
  })
}

export const handleResetPass = (data: object) => {
  return axios.post(`${Config.baseUrl}public/v2/password/reset`, data, {
    headers: {
      Accept: 'application/json',
    },
    auth: {
      username: Config.credential.username,
      password: Config.credential.password,
    },
  })
}
