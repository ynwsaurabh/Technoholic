import React from 'react'
import { redirect } from 'next/navigation'
const page = () => {
  const auth =false;
  if(!auth){
    redirect('/verify/login')
  }
  return (
    <div>
      page
    </div>
  )
}

export default page