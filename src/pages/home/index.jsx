import React, { version, useState, useRef } from 'react'
import { Input, Flex, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { Atom, Merge, GitMerge, GitPullRequestArrow } from 'lucide-react'
import CountUp from 'react-countup'
// import { PinInput } from 'react-input-pin-code'
import SpotlightCard from '@stateless/Spotlight'
import Typewriter from 'typewriter-effect'
import Marquee from 'react-fast-marquee'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useDetectScroll, { Direction } from '@smakss/react-scroll-direction'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'
import ReMarkdown from '@stateless/ReMarkdown'
// import LinearWrap from '@stateless/LinearWrap'
import AlternatingText from '@stateless/AlternatingText'
import AutoLink from '@stateless/AutoLink'
import LazyLoadImage from '@stateless/LazyLoadImage'
import IsometricCard from '@stateless/IsometricCard'
import AvatarCard from '@stateless/AvatarCard'
import LineBordered from '@stateless/LineBordered'
import GradientTracking from '@stateless/GradientTracking'
import ShiftingCard from '@stateless/ShiftingCard'
import BreatheText from '@stateless/BreatheText'
import ScrollAnimation from '@stateless/ScrollAnimation'
import AnimateOnScreen from '@stateless/AnimateOnScreen'
import AnimateRipple from '@stateless/AnimateRipple'
import AnimateWave from '@stateless/AnimateWave'
import NumberFlowFix from '@stateless/NumberFlowFix'
import MeshGradientBackground from '@stateless/MeshGradientBackground'
import useRect from '@hooks/useRect'
import TagCloud from '@stateless/TagCloud'
import ShiCode from '@stateless/ShiCode'
// import SlideLinear from '@stateless/SlideLinear'
// import Masonry from '@container/masonryContainer'
import DynamicBackground from '@stateless/DynamicBackground'
import ContentPlaceholder from '@stateless/ContentPlaceholder'
import SkeletonFix from '@stateless/SkeletonFix'
import { ReactSignature } from '@stateless/ReactSignature'
// import AdvancedCodeBlock from '@stateless/AdvancedCodeBlock'
import ShinyText from '@stateless/ShinyText'
import BlurText from '@stateless/BlurText'

import Meteors from '@stateless/Meteors'
import { oneApiChat, prettyObject, randomNum } from '@utils/aidFn'
import { fireConfetti } from '@utils/confetti'

import styles from './index.module.less'

const boxCount = Array.apply(null, Array(10))

const code = {
  fileName: './explanations.ts',
  code: `export const = explanations = {
main : "This component needs more than the default code block to be displayed"
detailed : "For now, if you want the exact same behaviour, please check the github"
}`,
  lang: 'typescript',
}

const preCode = `
  const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  };
`.trim()

const Home = () => {
  const [aiText, setAiText] = useState('')
  const aiTextRef = useRef(null)
  // const [loading, setLoading] = useState(false)
  const [isStream, setIsStream] = useState(false)
  const [dateTime, setDateTime] = useState('')
  const curController = useRef(null)

  const [apiKey, setApiKey] = useState(() => '')
  const [chatText, setChatText] = useState('')
  const textareaRef = useRef(null)

  const changeApiKey = (event) => {
    setApiKey(event.target.value)
  }

  const changeChatText = (event) => {
    setChatText(event.target.value)
  }

  const onInputKeyDown = (event) => {
    if (event.metaKey && event.key === 'Enter') {
      onSubmit()
      event.preventDefault()
    }
  }

  // const [pinValues, setPinValues] = useState(['', '', '', '', '', '', ''])

  const onSubmit = () => {
    if (chatText.trim() === '') {
      return
    }
    const controller = new AbortController()
    curController.current = controller
    fetchAi(chatText, apiKey, controller)
  }

  const onStop = () => {
    curController.current.abort()
    // setLoading(false)
    setIsStream(false)
  }

  const fetchAi = (text, key, controller) => {
    aiTextRef.current = ''
    setAiText(aiTextRef.current)
    const { signal } = controller
    setIsStream(true)
    oneApiChat(
      [
        {
          content: text,
          role: 'user',
        },
      ],
      key,
      signal
    )
      .then((response) => {
        const contentType = response.headers.get('content-type')
        if (!response.ok || !contentType?.startsWith('text/event-stream') || response.status !== 200) {
          if (contentType?.startsWith('text/html') || contentType?.startsWith('text/plain')) {
            const textPlain = response.clone().text()
            textPlain.then((plainText) => {
              setAiText(plainText)
            })
          } else if (contentType?.startsWith('application/json')) {
            const resJson = response.clone().json()
            resJson.then((res) => {
              setAiText(prettyObject(res))
            })
          } else {
            setAiText(response.statusText)
          }
          setIsStream(false)
        } else {
          const reader = response?.body?.getReader()
          const delimiter = '\n\n'
          let buffer = ''
          let lastText = ''
          const readStream = () => {
            reader
              .read()
              .then(({ done, value }) => {
                if (done) {
                  setIsStream(false)
                  return
                }
                buffer += new TextDecoder().decode(value)
                while (buffer.includes(delimiter)) {
                  const ind = buffer.indexOf(delimiter)
                  const message = buffer.slice(0, ind)

                  const dataList = message.split('data: ')

                  // eslint-disable-next-line no-restricted-syntax
                  for (const index in dataList) {
                    if (dataList[index] !== '' && dataList[index] !== '[DONE]') {
                      try {
                        const json = JSON.parse(dataList[index])
                        const delta = json.choices[0]?.delta?.content ?? ''
                        lastText += delta
                        setDateTime(new Date().toLocaleString())
                        aiTextRef.current = lastText
                        setAiText(aiTextRef.current)
                      } catch (error) {
                        console.log(error)
                      }
                    }
                  }
                  // 从缓冲区中移除已处理的消息和分隔符
                  buffer = buffer.slice(ind + delimiter.length)
                }
                readStream()
              })
              .catch((error) => {
                console.log('read stream error', error)
              })
          }
          readStream()
        }
      })
      .catch((error) => {
        setIsStream(false)
        setAiText(error.message)
      })
  }

  const scrollRef = useRef(null)
  const { scrollDir, scrollPosition } = useDetectScroll({ target: scrollRef.current })

  const [barRect, barRef] = useRect()

  return (
    <FixTabPanel ref={scrollRef}>
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        <TypedText>Cool! Hi, React & Ant Design!</TypedText>
      </section>

      <section className={styles.avatar} style={{ marginBottom: 15, fontSize: 24 }}>
        React version: {version}
      </section>

      <section style={{ marginBottom: 15, fontSize: 20 }}>
        I love coding in <AlternatingText alternateText={['javascript', 'typescript', 'rect', 'vue']} />.
      </section>
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        <AutoLink text="foo bar baz http://example.org bar https://github.com/wkylin/pro-react-admin" />
      </section>
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        <ShinyText text="Just some shiny text!" disabled={false} speed={3} />
      </section>
      <section style={{ marginBottom: 15, fontSize: 20 }}>
        <BlurText text="Isn't this so cool?!" delay={50} />
      </section>
      <section
        style={{
          marginBottom: 15,
          fontSize: 20,
          height: 200,
          width: 360,
          background: '#111827',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Meteors number={40} />
      </section>
      <section className={styles.line} />
      <section>
        <AvatarCard avatar="https://picsum.photos/seed/picsum/300/160" text="Hi, I'm a developer." />
      </section>
      <section>
        <IsometricCard text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellat, consequuntur doloribus voluptate esse iure?" />
      </section>
      <LineBordered text="A line bordered text." />
      <section style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 40 }}>
        <Atom /> <Merge /> <GitMerge /> <GitPullRequestArrow />
      </section>
      <section style={{ marginBottom: 40, fontSize: 16 }}>
        <h2>Scroll direction: {`${scrollDir}`}</h2>
        <p>
          Scroll position - Top: {scrollPosition.top}, Bottom: {scrollPosition.bottom}
        </p>
      </section>
      <section style={{ marginBottom: 40, fontSize: 16 }}>
        <h3>React Animate On Scroll.</h3>
        <h3>
          <AutoLink text="https://motion.dev/ https://gsap.com/ https://www.react-spring.dev/ https://use-gesture.netlify.app/" />
        </h3>
        <h3 style={{ marginBottom: 40 }}>
          <AutoLink text="https://www.npmjs.com/package/react-animate-on-scroll https://www.npmjs.com/package/react-scroll https://github.com/wellyshen/react-cool-inview" />
        </h3>
        <ScrollAnimation>
          <LazyLoadImage src="https://picsum.photos/seed/picsum/300/160" alt="Strawberries" />
        </ScrollAnimation>
      </section>
      <section style={{ marginBottom: 40, fontSize: 36 }}>
        <Typewriter
          options={{
            strings: ['Software Developer.', 'Full Stack Developer.', 'Open Source Contributor.'],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
          }}
        />
      </section>
      <section>
        <GradientTracking />
      </section>

      <section style={{ margin: 40 }}>
        <BreatheText />
      </section>

      <section style={{ margin: '60px 0 40px 40px' }}>
        <div className={styles['video-box']}>
          <div className={styles['video-btn']}>b</div>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <ShiftingCard />
      </section>
      {/* <section style={{ marginBottom: 40 }}>
        <PinInput onChange={(value, index, values) => setPinValues(values)} values={pinValues} />
      </section> */}
      <section style={{ marginBottom: 40 }}>
        <AnimateOnScreen.FadeIn>
          <AvatarCard avatar="https://picsum.photos/seed/picsum/300/160" text="Hi, I'm a developer." />
        </AnimateOnScreen.FadeIn>
      </section>
      <section style={{ marginBottom: 40 }}>
        <AnimateOnScreen.FadeUp>
          <img src="https://picsum.photos/360/200.jpg" alt="" />
        </AnimateOnScreen.FadeUp>
      </section>
      <section style={{ marginBottom: 40, width: 360, height: 200 }}>
        <AnimateOnScreen.ScaleIn triggerOnce={false}>
          <>
            <img src="https://picsum.photos/360/200/?blur=2" alt="" />
            <section className={styles['blend-me']}>Mix Blend Mode</section>
          </>
        </AnimateOnScreen.ScaleIn>
      </section>
      <section style={{ marginBottom: 40, width: 360, height: 200 }}>
        <AnimateOnScreen.DiyAnimation
          from={{ opacity: 0, transform: 'translate(-100%, 0)' }}
          to={{ opacity: 1, transform: 'translate(0, 0)' }}
          triggerOnce
        >
          <img src="https://picsum.photos/360/200.jpg" alt="" />
        </AnimateOnScreen.DiyAnimation>
      </section>
      <section style={{ marginBottom: 40, display: 'flex' }}>
        <SpotlightCard className="my-spot" style={{ width: 360, height: 200, color: '#fff' }}>
          <section />
        </SpotlightCard>
      </section>
      <section style={{ margin: '20px 0' }}>
        <ContentPlaceholder />
      </section>
      <section
        className={styles.box}
        style={{
          marginBottom: 10,
          width: 360,
          height: 200,
          position: 'relative',
          backgroundColor: 'rgba(0, 0,0, 0.9)',
          borderRadius: 8,
        }}
      >
        <section className={styles.dotMask} ref={barRef}>
          dot mask
        </section>
      </section>
      <section style={{ marginBottom: 40, fontSize: 18 }}>
        <section>RectResult.</section>
        width: {parseInt(barRect?.width)} height: {parseInt(barRect?.height)} top: {parseInt(barRect?.top)} bottom:{' '}
        {parseInt(barRect?.bottom)} right: {parseInt(barRect?.right)} left: {parseInt(barRect?.left)}
      </section>
      <section style={{ marginBottom: 40, height: 200, width: 360, overflow: 'hidden' }}>
        <MeshGradientBackground />
      </section>
      <section style={{ marginBottom: 40 }}>
        <AnimateRipple>Click Me</AnimateRipple>
      </section>

      <section style={{ marginBottom: 40 }}>
        <section className={styles.effect}> Hello CSS</section>
      </section>
      <section style={{ marginBottom: 40 }} className={styles.maskBox}>
        <section className={styles.watermark}>water mark</section>
        mask
      </section>
      <section style={{ marginBottom: 40 }}>
        <button className={styles.button} onClick={fireConfetti}>
          <span className={styles['button-label']}>Click Me</span>
        </button>
      </section>

      <section style={{ position: 'relative', margin: '80px 0 160px 100px' }}>
        <div className={styles['circle-1']} />
        <div className={styles['circle-2']} />
        <div className={styles['circle-3']} />
        <div className={styles['circle-4']} />
      </section>

      <section style={{ margin: 20 }} className={styles.eHElAY}>
        Hi, React!
      </section>

      <section>
        <div className={styles.stages}>
          <div className={styles.cubeSpinner}>
            <span className={styles.face1}>Web Services</span>
            <span className={styles.face2}>Blockchain</span>
            <span className={styles.face3}>Mobile Apps</span>
          </div>
        </div>
      </section>
      <section style={{ margin: '20px 0', fontSize: 40 }}>
        <CountUp start={20} end={10000} duration={10} enableScrollSpy />
      </section>
      <section style={{ margin: '20px 0', fontSize: 40 }}>
        <NumberFlowFix />
      </section>
      <section style={{ width: 600, margin: '30px 0' }}>
        <Input defaultValue={apiKey} placeholder="api key" onChange={changeApiKey} style={{ marginBottom: 20 }} />
        <Flex align="center">
          <Input.TextArea
            ref={textareaRef}
            defaultValue={chatText}
            placeholder="来，说点什么呗...Meta + Enter发送"
            onChange={changeChatText}
            onKeyDown={onInputKeyDown}
            autoSize
            style={{ width: 300, height: 30, caretColor: '#ff0000' }}
          />
          <Button
            style={{ margin: '0 10px' }}
            icon={<SendOutlined rotate={-60} />}
            type="primary"
            disabled={isStream}
            onClick={onSubmit}
          >
            发送
          </Button>
          <Button icon={<SendOutlined rotate={-60} />} type="primary" disabled={!isStream} onClick={onStop}>
            停止
          </Button>
        </Flex>
      </section>
      <section>
        {isStream && <div>正在输入...</div>}
        <section style={{ textAlign: 'right', color: '#666' }}>{dateTime}</section>
        <ReMarkdown markdownText={aiText} isLoading={isStream} />
      </section>

      <section style={{ position: 'relative' }}>
        <AnimateWave />
      </section>
      {/* <section style={{ margin: 20 }}>
        <AdvancedCodeBlock code={code.code} fileName={code.fileName} lang={code.lang} />
      </section> */}
      <section style={{ margin: 20 }}>
        <ReactSignature />
      </section>
      <section style={{ margin: 20 }}>
        <SkeletonFix />
      </section>
      <section style={{ margin: 20 }}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 6 }}>
          <Masonry gutter="10px">
            <section style={{ height: 100, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 200, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 150, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 150, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 200, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 100, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 200, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 150, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 100, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 150, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 100, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 200, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 150, border: '1px solid #ccc', background: '#aaa' }} />
            <section style={{ height: 150, border: '1px solid #ccc', background: '#aaa' }} />
          </Masonry>
        </ResponsiveMasonry>
      </section>
      <section style={{ margin: 20 }}>
        <TagCloud />
      </section>
      <section style={{ margin: 20 }}>
        <Marquee autoFill direction="left" gradient gradientColor="rgba(255, 255, 255, 0.8)">
          <div
            style={{
              width: 200,
              height: 40,
              lineHeight: '40px',
              textAlign: 'center',
              background: '#aaa',
              margin: '0 10px',
              borderRadius: 4,
            }}
          >
            React
          </div>
        </Marquee>
      </section>
      <section style={{ margin: 20 }}>
        <Marquee autoFill direction="right" gradient gradientColor="rgba(255, 255, 255, 0.8)">
          <div
            style={{
              width: 200,
              height: 40,
              lineHeight: '40px',
              textAlign: 'center',
              background: '#aaa',
              margin: '0 10px',
              borderRadius: 4,
            }}
          >
            Vue
          </div>
        </Marquee>
      </section>
      <section style={{ margin: 20 }}>
        <ShiCode preCode={preCode} />
      </section>
      <section style={{ margin: 20 }}>
        <DynamicBackground />
      </section>
    </FixTabPanel>
  )
}

export default Home
