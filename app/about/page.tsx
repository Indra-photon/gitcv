import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Paragraph } from '@/components/Paragraph'
import React from 'react'

function page() {
  return (
    <Container className='py-16'>
      <Heading className='text-neutral-900'>About Us</Heading>
      <Paragraph className='mt-4 text-lg text-gray-600'>Welcome to our resume builder! We are passionate about helping job seekers create tailored resumes that stand out. Our platform uses AI to transform your GitHub data into polished resume content, saving you time and effort. Whether you're applying for internships, full-time roles, or bootcamps, we've got you covered. Join us on this journey to land your dream job with a resume that truly represents your skills and experience.</Paragraph>
    </Container>
  )
}

export default page