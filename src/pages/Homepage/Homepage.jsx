import React from 'react'
import Hero from '../../components/Hero'
import Navbar from '../../components/Navbar'
import Works from '../../components/Works'
import LatestReports from '../../components/LatestReports'
import Footer from '../../components/footer'


const Homepage = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Works />
      <LatestReports />
      <Footer />
    </div>
  )
}

export default Homepage
