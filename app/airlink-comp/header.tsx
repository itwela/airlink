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
            className='w-screen bg-neutral-900 text-white p-10 h-full flex place-items-center place-content-center justify-between'
            >
                <span className='w-max flex gap-5 place-items-center place-content-center'>
                    <a href="/"><span>Airlink</span></a>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='hover:scale-105 hover:bg-gray-500/25 rounded-md p-1'> 
                        {isMenuOpen ? <SquareArrowDown size={20} /> : <SquareArrowUp size={20} />}
                    </button>
                </span>
                <span></span>
            </motion.header>        
        </>
    )
}