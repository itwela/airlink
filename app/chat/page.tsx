'use client'

import Header from "../airlink-comp/header"
import { motion, AnimatePresence } from 'framer-motion'
import { X } from "lucide-react"
import { useAirLink } from '../airlinkContext';

export default function ChatClient() {

    const { isMenuOpen, setIsMenuOpen } = useAirLink()
    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }

    return (
    <>

            <main className="bg-neutral-900 text-white flex w-screen h-screen flex-col">
                
                <div className="h-[10%]">
                <Header />
                </div>

                <section className="bg-neutral-900 text-white flex w-full h-[90%] flex-col place-items-center">
                    
                    <div className="w-full h-full flex relative  place-items-center place-content-center">
                    
                    <AnimatePresence  mode="wait">
                        <motion.div 
                        initial="closed"
                        animate={isMenuOpen ? "open" : "closed"}
                        variants={variants}
                        className="w-[50%] absolute z-10 left-0 bg-neutral-900 top-0 md:w-[20%] h-full">
                        <motion.div
                            className="flex px-5 py-3 flex-col w-full h-full">
                                <div className="w-full h-max bg-gray-500 bg-opacity-20 p-3 rounded-md">
                                    <p>My Flights</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>


                        <div className="w-full h-full flex flex-col place-items-center place-content-center">
                            
                            <div className="w-full relative h-full flex flex-col place-items-center place-content-center">
                                
                                {/* ad block */}
                                {/* I could even make this a moving component at one point so I can show different ads */}
                                <div className="w-full h-[100px] flex place-items-center place-content-center bg-gray-500 bg-opacity-20 absolute top-0">
                                    <p className="text-center">Ad will go here $$</p>
                                    <a className="absolute text-xs top-2 right-2 cursor-pointer"><X size={20} /></a>
                                    <a href="bid" className="absolute text-xs text-muted-foreground bottom-2 right-2 cursor-pointer">Want your ad here?</a>
                                </div>
                                
                                <motion.div 
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="outline flex place-items-end p-5 place-content-center outline-neutral-800 w-full h-full ">
                                    
                                    <div className="w-full h-max flex flex-col gap-3">
                                        <div className="p-2 px-4 h-max cursor-pointer outline outline-1 outline-white rounded-lg bg-gray-500 bg-opacity-20">
                                            The dynamic flight data will be here. Some basic Information, and a direct link to book.
                                        </div>                                    
                                    </div>     
                                </motion.div>
                                
                            </div>

                            <motion.div 
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                            className="w-full  md:w-[50%] h-[10%] p-4 flex flex-col gap-2 place-items-center place-content-center">
                            <form className="w-full" action="">
                                    <input type="text" 
                                    placeholder="Message" 
                                    className="w-full h-max p-2 px-6 rounded-full bg-neutral-900 outline outline-neutral-800"/>
                            </form>
                            <p className="text-center text-[10px] text-muted-foreground">Travel made easy.</p>
                            </motion.div>
                    
                        </div>

                    </div>

                </section>
            </main>
    </>
    )
    }