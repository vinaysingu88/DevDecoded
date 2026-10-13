import React from 'react'
import MainNavbar from '../components/LandingPageComponents/Navbar'
import Hero from '../components/LandingPageComponents/Hero'
import FeaturedBlog from '../components/LandingPageComponents/FeaturedBlog'
import LatestArticles from '../components/LandingPageComponents/LatestArticles'
import WhyDevDecoded from '../components/LandingPageComponents/WhyDevDecoded'
import Footer from '../components/LandingPageComponents/Footer'
const LandingPage = () => {
  return (
    
    <div>
      <MainNavbar/>
      <Hero/>
      <FeaturedBlog/>
      <LatestArticles/>
      <WhyDevDecoded/>
      <Footer/>
    </div>
  )
}

export default LandingPage
