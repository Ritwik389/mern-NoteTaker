import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import api from '../lib/axios.js';
import { data } from 'react-router';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';


const HomePage = () => {
  const[isRateLimited, setIsRateLimited] = useState(false );
  const[notes, setNotes] = useState([])
  const[loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () => {
      try {
        const res = await api .get("/notes")
        console.log(res.data )
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching the data")
        if(error.response?.status == 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to fetch notes")
        } 
      }
      setLoading(false)
    }
    fetchNotes();
  }, []);
  return <div className='min-h-screen'>
    <Navbar/>
    
    {isRateLimited && <RateLimitedUI />}
    {notes.length===0 && !isRateLimited && <NotesNotFound />}
    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading &&  <div className='text-center text-primary py-10'>Loading...</div> }
      {notes.length > 0 && !isRateLimited &&(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map(note=>
          <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          )}
        </div>
      )}
    </div>
    
     </div>;
  
};

export default HomePage; 
