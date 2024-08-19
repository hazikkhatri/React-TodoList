import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex py-3 bg-violet-600 justify-around items-center'>
            <div className="text-white font-bold text-3xl cursor-pointer">iTask</div>
            <ul className='flex gap-8 items-center'>
                <li className='text-white text-base cursor-pointer'>Home</li>
                <li className='text-white text-base cursor-pointer'>Your Task</li>
            </ul>
        </nav>
    )
}

export default Navbar
