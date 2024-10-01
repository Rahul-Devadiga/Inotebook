import React from 'react'
import Notes from './Notes'
import Addnote from './Addnote'






function Home() {
  

  return (
    <div className='my-3' style={{textAlign: 'left'}}>
     <Addnote/>
     
     <Notes/>
     
   
    </div>
  )
}

export default Home