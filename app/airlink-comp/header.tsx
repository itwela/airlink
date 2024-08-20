'use client'

import {motion} from 'framer-motion'
import { SquareArrowUp } from 'lucide-react';
import { SquareArrowDown } from 'lucide-react';
import { useAirLink } from '../airlinkContext';

export default function Header() {

    const { isMenuOpen, setIsMenuOpen } = useAirLink();

    return (
        <>
            <motion.header
            className='w-screen bg-neutral-900 text-white p-4 md:p-10 h-full flex place-items-center place-content-center justify-between'
            >
                <span className='w-max flex gap-5 place-items-center place-content-center'>
                    <a href="/"><span className='select-none'>Airlink</span></a>
                    
                    {/* desktop button */}
                    <button onMouseEnter={() => setIsMenuOpen(!isMenuOpen)} className='absolute hidden md:block md:bottom-10 md:left-5 z-50 hover:scale-105 hover:bg-gray-500/25 rounded-md p-1'> 
                        {isMenuOpen ? <SquareArrowDown className='text-gray-500' size={20} /> : <SquareArrowUp  size={20} />}
                    </button>
                 
                    {/* mobile button */}
                    <button onMouseEnter={() => setIsMenuOpen(!isMenuOpen)} className='absolute top-4 right-5 md:hidden z-50 hover:scale-105 hover:bg-gray-500/25 rounded-md p-1'> 
                        {isMenuOpen ? <SquareArrowDown className='text-gray-500' size={20} /> : <SquareArrowUp  size={20} />}
                    </button>
                </span>
                <span></span>
            </motion.header>        
        </>
    )
}