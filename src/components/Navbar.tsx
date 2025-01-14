"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

useSession

const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar