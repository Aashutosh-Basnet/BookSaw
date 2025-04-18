import MainBook from "./MainBook"

const LandingPage = () => {
  return (
    <div className="min-h-[85vh] w-screen flex justify-center p-4 sm:p-8 md:p-12 lg:p-20">
      <div className="w-full md:w-[80%] lg:w-[60%]">
        <MainBook/>
      </div>
    </div>
  )
}

export default LandingPage