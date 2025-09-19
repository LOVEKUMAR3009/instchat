import React from 'react'
import {Menu} from 'lucide-react'
const Header = ({sideBarOpen,setSideBarOpen}) => {
  return (
    <div className={`sm:hidden flex fixed top-0  bg-white w-full h-max  z-5 px-6 py-3 items-center justify-between`}>
     
      <div>
          <Menu
          // className="p-2  rounded-md shadow w-10 h-10 text-gray-600 cursor-pointer z-50"
          onClick={() => setSideBarOpen(true)}
        />
      </div>
       <div>
        ping up 
      </div>
    </div>
  )
}

export default Header
