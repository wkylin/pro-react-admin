import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const codeString = `const profile = {
  name: 'wkylin.w',
  title: 'Full-Stack Developer',
  skills: [
    'React', 'Vue' 'NextJS', 'Redux', 'TypeScript',
    'MySQL', 'MongoDB', 'Docker', 'Express',
    'GraphQL', 'Git',
  ],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  yearsOfExperience: 12,
};`
const Profile = () => {
  const scrollRef = useRef(null)
  return (
    <FixTabPanel>
      <div className='code-window relative h-full w-full bg-gray-900 shadow-black'>
        <div className='relative z-10 flex items-center bg-gray-800 px-4 py-2'>
          <div className='flex space-x-2'>
            <div className='h-3 w-3 rounded-full bg-red-500' />
            <div className='h-3 w-3 rounded-full bg-yellow-500' />
            <div className='h-3 w-3 rounded-full bg-green-500' />
          </div>
          <div className='ml-4 text-sm text-gray-400'>developer.js</div>
        </div>
        <div className='relative z-20 font-mono text-3xl'>
          <div className='relative z-20'>
            <SyntaxHighlighter
              language='javascript'
              style={dracula}
              customStyle={{
                margin: 0,
                lineHeight: '1',
                padding: '1.5rem',
                background: '#0f1117',
                borderRadius: '0',
                fontSize: 'clamp(0.7rem, 2vw, 1rem)'
              }}
              showLineNumbers
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </FixTabPanel>
  )
}

export default Profile
