import React from 'react'
import { redirect } from 'next/navigation'
const page = () => {
    const auth =false;
  if(!auth){
    redirect('/registration/form')
  }
  return (
    <div>page</div>
  )
}

export default page