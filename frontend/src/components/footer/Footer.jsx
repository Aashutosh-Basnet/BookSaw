import Bottom from "./Bottom"
import Top from "./Top"


const Footer = () => {
  return (
    <div className="w-screen flex flex-col items-center">
        <div className="w-[70%]">
            <Top/>
        </div>
        <div className="w-[70%]">
          <Bottom/>
        </div>
    </div>
  )
}

export default Footer