'use client'

import Header from "../airlink-comp/header"
import { motion, AnimatePresence } from 'framer-motion'
import { X } from "lucide-react"
import { useAirLink } from '../airlinkContext';
import { useEffect, useRef, useState } from "react";
import { ads } from '../ads'

export default function ChatClient() {

    // 🌳🌳🌳 Starting the initial consts --------------------------------------------------------------------------------------

    // initial consts
    const { isMenuOpen, setIsMenuOpen } = useAirLink()
    
    // 🪦🪦🪦 initial consts ends here -----------------------------------------------------------------------



    // 🌳🌳🌳 Starting the animations --------------------------------------------------------------------------------------

    // animations
    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }

    // 🪦🪦🪦 animations ends here -----------------------------------------------------------------------



    // 🌳🌳🌳 Starting the textarea controller stuff --------------------------------------------------------------------------------------

    // textarea controller stuff
    // Updates the height of a <textarea> when the value changes.
    const useAutosizeTextArea = (
        textAreaRef: HTMLTextAreaElement | null,
        value: string
    ) => {
        useEffect(() => {
        if (textAreaRef) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;
    
            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            textAreaRef.style.height = scrollHeight + "px";
        }
        }, [textAreaRef, value]);
    };

    const [value, setValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
    useAutosizeTextArea(textAreaRef.current, value);
  
    const handleTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target?.value;
  
      setValue(val);
    };

    // 🪦🪦🪦 textarea controller stuff ends here -----------------------------------------------------------------------
    
    
    
    // 🌳🌳🌳 Starting the data fetching functions --------------------------------------------------------------------------------------
    
    
    
    // 🪦🪦🪦 data fetching functions ends here -----------------------------------------------------------------------
    return (
    <>

            <main className="bg-neutral-900 text-white flex w-screen h-screen flex-col">
                
                <div className="h-[10%]">
                <Header />
                </div>

                <section className="bg-neutral-900 text-white flex w-full h-[90%] flex-col place-items-center">
                    
                    <div className="max-w-[900px] rounded-xl  w-full h-full flex relative  place-items-center place-content-center">
                    
                        <div className="w-full h-full flex flex-col place-items-center place-content-center">
                            
                            {/* chat and add container */}
                            <div className="w-full relative h-full flex flex-col place-items-center place-content-center">
                                
                                {/* ad block */}
                                {/* I could even make this a moving component at one point so I can show different ads */}
                                <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2 }}
                                className="w-full h-[100px] rounded-xl flex place-items-center place-content-center bg-gray-500 bg-opacity-20 absolute top-0">
                                    <img src={ads[0].image} alt={ads[0].alt} className="w-full h-full object-cover" />
                                    <a className="absolute text-xs top-2 right-2 cursor-pointer bg-neutral-800 rounded-full p-1 hover:bg-neutral-700 hover:scale-105"><X size={20} /></a>
                                    <a href="bid" className="absolute select-none text-[12px] text-muted-foreground bottom-[-20%] hover:text-white right-2 cursor-pointer">Want your ad here?</a>
                                </motion.div>


                                <motion.div 
                                className="w-full place-content-center flex select-none h-max absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <p>Welcome to Airlink!</p>
                                </motion.div>

                                
                                {/* the actual chat */}
                                <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2 }}
                                className="outline rounded-xl flex place-items-end p-5 place-content-center outline-neutral-800 w-full h-full ">
                                    
                                    {/* chat bubble */}
                                    <div className="text-[12px] w-full h-max flex flex-col gap-3">
                                        <div className="p-2 px-4 h-max cursor-pointer outline outline-1 outline-white rounded-lg bg-gray-500 bg-opacity-20">
                                            The dynamic flight data will be here. Some basic Information, and a direct link to book.
                                        </div>                                    
                                    </div>  

                                </motion.div>
                                
                            </div>

                            {/* input and small text container */}
                            <div className="w-full md:w-[50%] relative h-[20%] flex flex-col-reverse gap-4 place-items-center place-content-center">
                                <form className="w-full absolute bottom-[40%]" action="">
                                <motion.textarea           
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 2.2 }}
                                    placeholder="Message" 
                                    onChange={handleTextareaChange}
                                    ref={textAreaRef}
                                    rows={1}
                                    value={value}
                                    className="w-full text-[12px] no-scrollbar p-2 px-6 rounded-xl bg-neutral-900 outline outline-neutral-800"/>
                                </form>
                                <div className="w-full absolute bottom-5  h-max place-items-center place-content-center">
                                    <motion.p 
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 2 }}
                                    className="text-center text-[10px] text-muted-foreground">
                                        Travel made easy.
                                    </motion.p>

                                    

                                </div>
                            </div>
                    
                        </div>  

                    </div>

                    {/* menu */}
                    <AnimatePresence  mode="wait">
                        <motion.div 
                        initial="closed"
                        animate={isMenuOpen ? "open" : "closed"}
                        variants={variants}
                        className="w-[75%] py-8 text-[12px] absolute z-10 left-0 bg-neutral-900 bottom-0 sm:w-[50%] md:w-[20%] h-full">
                        <motion.div
                            className="flex gap-3 px-5 py-8 flex-col w-full h-full">
                                
                                <div className="py-8 px-8 text-xl absolute top-0 left-0"><span className='select-none'>Airlink</span></div>

                                <div className="w-full my-8 h-max flex flex-col gap-3">

                                    <div className="w-full cursor-pointer hover:scale-[102%] hover:bg-neutral-700  h-max bg-neutral-800  p-3 rounded-md">
                                        <p>My Flights</p>
                                    </div>
                                
                                    <div className="w-full cursor-pointer hover:scale-[102%] hover:bg-neutral-700  h-max bg-neutral-800  p-3 rounded-md">
                                        <p>My Profile</p>
                                    </div>

                                </div>

                            </motion.div>
                        </motion.div>
                    </AnimatePresence>


                </section>
            </main>
    </>
    )
    }