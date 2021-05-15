import { useEffect, useState } from 'react';

export const useFetch = (url, token, setCallBack, needFetch, setNeedFetch) => {
  const [state, setState] = useState({ loading: true, error: false });

  useEffect(() => {
    if (token && needFetch) {
      setState({ loading: true, error: false });
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
          if(res.status === 200){
            setCallBack(res.data.data.bpi);
            setNeedFetch(false);
            setState({ loading: false, error: {status: '' , message: '', isExist: false} });
          } else {
            setState({ loading: false, error: {status: res.status, message: res.data.message, isExist: true}  });
            setNeedFetch(false);
          } 
        }).catch(() => {
          setState({ loading: false, error: {status: 500, message: 'Serviço indisponível, tentar novamente ou outro horário!', isExist: true} });
          setNeedFetch(false);
        })
    }
  }, [url, token, setCallBack, needFetch, setNeedFetch]);

  return state;
}
