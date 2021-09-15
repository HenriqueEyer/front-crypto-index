import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ReturnStatus, StatusFetch } from '../Interfaces/interface'

export const useFetch =
  (url: string, token: string | null, setCallBack: Dispatch<SetStateAction<any>>, needFetch: boolean, setNeedFetch: Dispatch<SetStateAction<boolean>>)
    : StatusFetch => {

    const [loading, setLoading] = useState<boolean>(false)
    const [status, setStatus] = useState<ReturnStatus>({ code: null, message: '' })

    useEffect(() => {
      if (token && needFetch) {
        setLoading(true)
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
            }
            setStatus({ code: res.status, message: res.data.message })
          }).catch(() => {
            setStatus({ code: 500, message: 'Serviço indisponível, tentar novamente ou outro horário!' })
          }).finally(() => {
            setNeedFetch(false)
            setLoading(false)
          })
      }
    }, [url, token, setCallBack, needFetch, setNeedFetch])

    return { loading, status }
  }
