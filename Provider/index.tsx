"use client"
import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import NextAuthProvider from './NextAuthProvider'

const Provider = ({children, session}: {children:ReactNode, session:any}) => {
  return (
<NextAuthProvider session={session}>     <RecoilRoot> {children}</RecoilRoot></NextAuthProvider>
  )
}

export default Provider
