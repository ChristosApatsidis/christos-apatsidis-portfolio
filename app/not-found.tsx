export const metadata = {
  title: "404 Not Found | Christos Apatsidis",
  description: "The page you are looking for does not exist.",
};

import React from 'react'
import Link from 'next/link'


export default function NotFound() {
  return (
    <div className="flex-1 h-full w-full rounded-xl border border-black/[0.1] dark:border-white/[0.2] bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-lg p-6 md:p-8">
      <h2 className='text-3xl font-semibold'>Not Found 😶‍🌫️</h2>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link href="/" className='border border-blue-600 rounded px-4 py-2 hover:bg-blue-600 hover:text-white transition'>
        Go back to Home
      </Link>

    </div>
  )
}