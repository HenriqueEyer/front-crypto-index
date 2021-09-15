import { useContext } from 'react'
import { CurrencyContext } from '../context/index'

const ButtonLogout: React.FC = () => {
  const { logout } = useContext(CurrencyContext)

  return (
      <button type="button" onClick={logout} className="button-purple">
        Sair
      </button>
  )
}

export default ButtonLogout
