import { BodyRequest } from "../Interfaces/interface"

export const fetchApiLogin = (body: BodyRequest, setState: React.Dispatch<React.SetStateAction<any>>, method: string, url: string): void => {
  setState({ data: '', loading: true, error: false })
  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(async response => {
      const res = await response.json()
      return {
        data: res,
        status: response.status
      }
    })
    .then(res => {
      res.status === 200 ?
        setState({ data: res.data.token, loading: false, error: false })
        : setState({ data: res.data.message, loading: false, error: true })
    })
    .catch (() => setState({ data: 'Serviço indisponível favor tentar mais tarde!', loading: false, error: true }))
}

export const fetchApiUpdate = (body: BodyRequest, setState: React.Dispatch<React.SetStateAction<any>>, method: string, url: string, token: string): void => {
  setState({ data: '', loading: true, error: false })
  body.value = Number(body.value)
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify(body),
  })
    .then(async response => {
      const res = await response.json()
      return {
        data: res,
        status: response.status
      }
    })
    .then(res => {
      setState({ data: res.data.message, loading: false, error: false })
    })
    .catch(() => {
      setState({ data: 'Serviço indisponível favor tentar mais tarde!', loading: false, error: true })
    })
}

