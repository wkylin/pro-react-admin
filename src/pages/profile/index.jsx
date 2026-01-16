import FixTabPanel from '@stateless/FixTabPanel'
import ProMdxEditor from '@stateless/MdxEditor'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const codeString = `const profile = {
  name: 'Wkylin Wang',
  title: 'Full-Stack Developer',
  skills: [
    'React', 'Vue' 'NextJS', 'Redux', 'TypeScript',
    'MySQL', 'MongoDB', 'Docker', 'Express',
    'GraphQL', 'Git',
  ],
  hobbies: ['Music', 'Travel', 'Film', 'Reading'],
  languages: ['English', 'Chinese'],
  vision: {
    life: 'Colourful',
    work: 'Successful',
    love: 'Sweet',
    family: 'Healthy',
  },
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  yearsOfExperience: 12,
};`
const Profile = () => {
  return (
    <FixTabPanel>
      <ProMdxEditor />
      <div className="code-window relative h-full w-full bg-gray-900 shadow-black">
        <div className="relative z-10 flex items-center bg-gray-800 px-4 py-2">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-4 text-sm text-gray-400">developer.js</div>
        </div>
        <div className="relative z-20 font-mono text-3xl">
          <div className="relative z-20">
            <SyntaxHighlighter
              language="javascript"
              style={dracula}
              customStyle={{
                margin: 0,
                lineHeight: '1',
                padding: '1.5rem',
                background: '#0f1117',
                borderRadius: '0',
                fontSize: 'clamp(0.7rem, 2vw, 1rem)',
              }}
              showLineNumbers={true}
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
