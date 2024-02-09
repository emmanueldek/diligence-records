// import { Mail, MapPin, PhoneCall } from 'lucide-react';

import { FaPhone } from "react-icons/fa6"
import { MdMail } from "react-icons/md"
import { PiNavigationArrow } from "react-icons/pi"


const Footer = () => {

  return (
    <footer className='bg-[#535353] text-white p-4 pt-8 tracking-wide'>
        <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
            <div>
                <h4 className='font-medium text-base md:text-lg text-white/40 mb-2'>About Us</h4>
                <p className='text-xs md:text-sm'>
                    We are on a mission to help
                    your business transform data
                    into actionable intelligence for
                    confident and informed
                    decision making in the dynamic
                    Nigerian market.
                </p>
            </div>
            <div>
                <h4 className='font-medium text-base md:text-lg text-white/40 mb-2'>Contact</h4>
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-2 items-center'>
                        <div>
                            {/* <MapPin size={18} /> */}
                            <PiNavigationArrow />
                        </div>
                        <div>
                            <p className='text-xs md:text-sm tracking-wider'>
                                3280 Peachtree Rd NE, 
                                Atlanta, GA 30305,
                                United States.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <div>
                            <MdMail size={18} />
                        </div>
                        <div>
                            <a href='mailto:innovate@diophalytics.io' className='text-xs md:text-sm tracking-wider'>
                                innovate@diophalytics.io
                            </a>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <div>
                            <FaPhone size={18} />
                        </div>
                        <div>
                            <p className='text-xs md:text-sm'>
                            +1 909-869-2797
                            </p>
                        </div>
                    </div>


                </div>
            </div>

            </div>
            <div>
            <p className='text-xs md:text-sm text-center mt-8'>
               &copy; 2024 Diophalytics
            </p>
        </div>
        </div>
        
    </footer>
  )
}

export default Footer