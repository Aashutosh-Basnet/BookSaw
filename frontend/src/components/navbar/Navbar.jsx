import Bottombar from "./Bottombar"
import Topbar from "./Topbar"

const Navbar = () => {
  return (
    <div className="absolute top-0">
        <Topbar/>
        <Bottombar/>
    </div>
  )
}

export default Navbar