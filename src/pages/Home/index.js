import { Fragment } from "react"
import { useDispatch } from "react-redux"
import { logout } from "redux/modules/auth"

const HomePage = props => {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <Fragment>
        <h3>List Todo</h3>
      </Fragment>
    </div>
  )
}
export default HomePage
