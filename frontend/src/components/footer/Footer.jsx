import Bottom from "./Bottom"
import Top from "./Top"

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center bg-white">
        <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <Top/>
        </div>
        <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <Bottom/>
        </div>
    </div>
  )
}

export default Footer