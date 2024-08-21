'use client'

import Header from "../airlink-comp/header"
import { motion, AnimatePresence } from 'framer-motion'
import { Circle, Inbox, SendHorizonal, X } from "lucide-react"
import { useAirLink } from '../airlinkContext';
import { useEffect, useRef, useState } from "react";
import { ads } from '../ads'
import { callGemini } from "../gemini";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { offerRequest } from "../actions";

export default function ChatClient() {

    // 🌳🌳🌳 Starting the initial consts --------------------------------------------------------------------------------------

    // initial consts
    const { isMenuOpen, setIsMenuOpen } = useAirLink()
    const { toast } = useToast()
    const [userInput, setUserInput] = useState("")
    const [goodName, setGoodName] = useState(false)
    const [goodEmail, setGoodEmail] = useState(false)
    const [goodOrigin, setGoodOrigin] = useState(false)
    const [goodDestination, setGoodDestination] = useState(false)
    const [readyToSubmit, setReadyToSubmit] = useState(true)
    
    // 🪦🪦🪦 initial consts ends here -------------------------------------------------------------------------------



    // 🌳🌳🌳 Starting the animations --------------------------------------------------------------------------------

    // animations
    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }

    // 🪦🪦🪦 animations ends here ------------------------------------------------------------------------------------



    // 🌳🌳🌳 Starting the textarea controller stuff -------------------------------------------------------------------

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

      if (val.length > 5) {
        setGoodName(true);
      } else {
        setGoodName(false);
      }
    
      if (val.length > 7) {
        setGoodEmail(true);
      } else {
        setGoodEmail(false);
      }

      if (val.length > 9) {
        setGoodOrigin(true);
      } else {
        setGoodOrigin(false);
      }

      if (val.length > 11) {
        setGoodDestination(true);
      } else {
        setGoodDestination(false);
      }

      if (goodName && goodEmail && goodOrigin && goodDestination) {
        setReadyToSubmit(true)
      } else {
        setReadyToSubmit(false)
      }

    };

    

    // 🪦🪦🪦 textarea controller stuff ends here -----------------------------------------------------------------------
    

    const handleBookingFlights = async () => {
        await callGemini(userInput);
    }
    
    
    // 🌳🌳🌳 Starting the data fetching functions -----------------------------------------------------------------------
    // const SubmitButton = () => {
    
    //     const status = useFormStatus()
    
    //     if (status.pending !== true) {
    //         return (
    //             <button className="-rotate-90 p-2 hover:scale-105 text-muted-foreground bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full"><SendHorizonal size={20}/></button>
    //         )
    //     }
    
    //     if (status.pending === true) {
    //         return (
    //         <>
    //             <button className="-rotate-90 p-2 hover:scale-105 text-muted-foreground bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full"><Circle size={20}/></button>
    //         </>
    //         )
    //     }
    
    // }
    
    // type FormState = {
    //     message: string;
    // };
    
    // const formAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    //     // await in this sense means it will wait until the promise is resolved before continuing to the next line
    //     await callGemini(formData, formState);
    //     console.log('gemini has been called');
    //     toast({ title: '✅ Success', description: 'Airlink has been submitted', itemID: 'success' });
    //     return { message: 'Submission successful!' };
    // };
    
    // const [formState, action] = useFormState(formAction, {
    //     message: '',
    // });
    
    // 🪦🪦🪦 data fetching functions ends here --------------------------------------------------------------------------
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
                            <div className="w-full relative h-full flex gap-2 flex-col place-items-center place-content-center justify-between">
                                
                                <div></div>

                                {/* ad block */}
                                {/* I could even make this a moving component at one point so I can show different ads */}
                                <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 8 }}
                                className="w-full h-[100px] rounded-xl flex place-items-center place-content-center bg-gray-500 bg-opacity-20 absolute top-0">
                                    {/* <img src={ads[0].image} alt={ads[0].alt} className="w-full h-full object-cover" /> */}
                                    {/* <img src='' alt='' className="w-full h-full object-cover" /> */}
                                    <a className="absolute text-xs top-2 right-2 cursor-pointer bg-neutral-800 rounded-full p-1 hover:bg-neutral-700 hover:scale-105"><X size={20} /></a>
                                    <a href="bid" className="absolute select-none text-[12px] text-muted-foreground bottom-[-20%] hover:text-white right-2 cursor-pointer">Want your ad here?</a>
                                </motion.div>


                                {/* welcome and checklist */}
                                <motion.div 
                                // className="w-full place-content-center flex select-none h-max absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                className="w-full pt-[10vh] flex text-center gap-2  flex-col place-self-center place-content-center flex select-none h-max">
                                    <p>Welcome to Airlink!</p>
                                    <p className="text-[12px] text-muted-foreground">To get an instant flight booking link, please make sure these details are included in your flight details:</p>
                                    <div className="w-full place-content-center h-max gap-2 flex text-muted-foreground text-[12px]">
                                        <p className={`text-[12px] ${goodName ? 'text-green-500' : ''}`}>Name</p>,
                                        <p className={`text-[12px] ${goodEmail ? 'text-green-500' : ''}`}>Email</p>,
                                        <p className={`text-[12px] ${goodOrigin ? 'text-green-500' : ''}`}>Your Origin</p>,
                                        <p className={`text-[12px] ${goodDestination ? 'text-green-500' : ''}`}>Your Destination</p>,
                                    </div>
                                    {readyToSubmit && (
                                        <>
                                         <p className="text-[12px] md:py-8 place-content-center place-items-center w-full flex gap-2" >Press the <SendHorizonal className="w-[20px] p-1 outline outline-[1px] outline-white rounded-full h-[20px] -rotate-90"/> button to get your flight link instantly!</p>
                                        </>
                                    )}
                                </motion.div>

                                
                                {/* the the responses */}
                                <div className=" rounded-xl flex place-items-end p-5 place-content-center outline-neutral-800 w-full h-m ">                                    
                                    {/* chat bubble */}
                                    <motion.div 
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 4 }}
                                    className="text-[12px] w-full h-max flex flex-col gap-3">
                                        <div className="p-2 px-4 h-max cursor-pointer outline outline-1 outline-white rounded-lg bg-gray-500 bg-opacity-20">
                                            The dynamic flight data will be here. Some basic Information, and a direct link to book.
                                        </div>                                    
                                    </motion.div>  

                                </div>
                                
                            </div>

                            {/* input and small text container */}
                            <div className="w-full md:w-[50%] relative h-[20%] flex flex-col-reverse gap-4 place-items-center place-content-center">
                                <motion.form 
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 2.2 }}
                                    // action={action}
                                    className="w-full px-4 md:px-0 flex place-items-center place-content-center h-max gap-8 absolute bottom-[40%]">
                                <motion.textarea           
                                    placeholder="Where would you like to fly?" 
                                    onChange={handleTextareaChange}
                                    ref={textAreaRef}
                                    rows={1}
                                    value={value}
                                    className="w-full text-[12px] no-scrollbar p-2 px-6 rounded-xl bg-neutral-900 outline outline-neutral-800"/>                                    
                                    {/* you have to make buttons a component to track the status of the form */}
                                    {/* <button className="-rotate-90 p-2 hover:scale-105 text-muted-foreground bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full"><SendHorizonal size={20}/></button> */}
                                    {/* <span onClick={() => callGemini('')} className="-rotate-90 p-2 hover:scale-105 text-muted-foreground bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full"><SendHorizonal size={20}/></span> */}
                                    <span onClick={() => offerRequest()} className="-rotate-90 p-2 hover:scale-105 text-muted-foreground bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-full"><SendHorizonal size={20}/></span>
                                    {/* <SubmitButton/> */}
                                
                                </motion.form>
                               
                                <motion.div 
                                 initial={{ opacity: 0}}
                                 animate={{ opacity: 1 }}
                                 transition={{ duration: 9 }}
                                 className="w-full flex gap-2 absolute bottom-2  h-max place-items-center place-content-center">
                                    <p 
                                    className="text-center select-none text-[10px] text-muted-foreground">
                                        Travel made easy.
                                    </p>
                                    <Inbox className="cursor-pointer hover:scale-105 text-muted-foreground" size={20} />
                                </motion.div>
                           
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
                                        <p>My Trips</p>
                                    </div>

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