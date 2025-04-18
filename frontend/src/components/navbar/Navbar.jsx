import Bottombar from "./Bottombar"
import Topbar from "./Topbar"

const Navbar = () => {
  return (
    <div className="w-full sticky top-0 bg-white z-50">
        <Topbar/>
        <Bottombar/>
    </div>
  )
}

export default Navbar