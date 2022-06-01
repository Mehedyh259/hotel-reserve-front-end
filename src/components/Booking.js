import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './Booking.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';



const Booking = () => {

    const [error, setError] = useState('');
    const [bookedEvents, setBookedEvents] = useState([]);

    const { data: bookings, isLoading, refetch } = useQuery('bookings', async () => await axios.get('https://hotel-reserve-1542.herokuapp.com/booking'));

    if (isLoading) {
        return "loading";
    }


    const handleBooking = async (event) => {
        event.preventDefault();
        setError('');
        const name = event.target.name.value;
        const checkIn = event.target.checkIn.value;
        const checkOut = event.target.checkOut.value;
        if (!name || !checkIn || !checkOut) {
            setError('Error: Every Input Must Be given !!');
        }
        else if (checkOut < checkIn) {
            setError('Error: Check-Out Date Must be greater than Check-In Date !!')
        } else {
            const booking = {
                title: name,
                start: checkIn,
                end: checkOut
            }

            const newBooked = [...bookedEvents, booking];

            setBookedEvents(newBooked);

            const { data } = await axios.post('https://hotel-reserve-1542.herokuapp.com/booking', booking);
            if (data) {
                toast.success('booking added successfully..!!');
                refetch();
                event.target.reset();
            }

        }
    }


    return (
        <section className='booking'>
            <h1 className="title">Hotel Booking App</h1>

            <form onSubmit={handleBooking}>
                <div className="inputFields">
                    <div>
                        <p>Name</p>
                        <input type="text" name='name' required placeholder='Event Name' />
                    </div>
                    <div>
                        <p>Check-In</p>
                        <input type="date" name="checkIn" required />
                    </div>
                    <div>
                        <p>Check-Out</p>
                        <input type="date" name="checkOut" required />
                    </div>
                </div>
                <div className='submit-button'>
                    <div>
                        {
                            error ? <p className='error'>{error}</p> : ''
                        }
                        <button type='submit'>Book Now</button>
                    </div>
                </div>
            </form>



            <div className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={bookings?.data}
                // events={[
                //     { title: 'event 1', start: '2022-06-01', end: '2022-06-03' },
                //     { title: 'event 2', start: '2022-06-01', end: '2022-06-02' },
                //     // { title: 'event 1', date: '2022-06-05' }
                // ]}
                />
            </div>

        </section>
    );
};

export default Booking;