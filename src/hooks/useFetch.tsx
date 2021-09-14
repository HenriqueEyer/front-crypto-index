import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { StatusFetch } from '../Interfaces/interface'

export const useFetch =
  (url: string, token: string | null, setCallBack: Dispatch<SetStateAction<any>>, needFetch: boolean, setNeedFetch: Dispatch<SetStateAction<boolean>>) => {
    
    const [state, setState] = useState<StatusFetch>({ loading: true, error: false })

    useEffect(() => {
      if (token && needFetch) {
        setState({ loading: true, error: false })
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          }
        })
          .then(async response => {
            const res = await response.json()
            return {
              data: res,
              status: response.status
            }
          })
          .then((res) => {
            if (res.status === 200) {
              setCallBack(res.data.bpi)
              setNeedFetch(false)
              setState({ loading: false, error: { status: '', message: '', isExist: false } })
            } else {
              setState({ loading: false, error: { status: res.status, message: res.data.message, isExist: true } })
              setNeedFetch(false)
            }
          }).catch(() => {
            setState({ loading: false, error: { status: 500, message: 'Serviço indisponível, tentar novamente ou outro horário!', isExist: true } })
            setNeedFetch(false)
          })
      }
    }, [url, token, setCallBack, needFetch, setNeedFetch])

    return state
  }
