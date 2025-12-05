import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  theme,
  Typography,
  Button,
  Card,
  Tag,
  Row,
  Col,
  Timeline,
  Avatar,
  Space,
  Anchor,
  Divider,
  Tooltip,
  Grid,
  Drawer,
  FloatButton
} from 'antd'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  GithubOutlined,
  MailOutlined,
  LinkedinOutlined,
  RocketOutlined,
  CodeOutlined,
  ProjectOutlined,
  UserOutlined,
  CheckCircleOutlined,
  LaptopOutlined,
  ToolOutlined,
  ArrowLeftOutlined,
  XOutlined,
  MenuOutlined
} from '@ant-design/icons'
import avatarPng from '@assets/images/w.png'

const { Title, Paragraph, Text } = Typography
const { useToken } = theme
const { useBreakpoint } = Grid

const Section = ({ id, children, className = '' }) => {
  return (
    <section
      id={id}
      className={`flex min-h-screen flex-col justify-center py-20 ${className}`}
      style={{ scrollMarginTop: 80 }}
    >
      {children}
    </section>
  )
}

const AnimatedCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
  >
    {children}
  </motion.div>
)

const MyPortfilo = () => {
  const navigate = useNavigate()
  const { token } = useToken()
  const screens = useBreakpoint()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [targetOffset, setTargetOffset] = useState(80)

  useEffect(() => {
    // 动态计算偏移量，保持在视口顶部附近但留有呼吸空间
    setTargetOffset(window.innerHeight * 0.1)
  }, [])

  const navItems = [
    { key: 'home', href: '#home', title: <span style={{ fontSize: 12 }}>Home</span> },
    { key: 'about', href: '#about', title: <span style={{ fontSize: 12 }}>About</span> },
    { key: 'skills', href: '#skills', title: <span style={{ fontSize: 12 }}>Skills</span> },
    { key: 'projects', href: '#projects', title: <span style={{ fontSize: 12 }}>Work</span> },
    { key: 'experience', href: '#experience', title: <span style={{ fontSize: 12 }}>Exp</span> },
    { key: 'contact', href: '#contact', title: <span style={{ fontSize: 12 }}>Contact</span> }
  ]

  const handleAnchorClick = (e, link) => {
    e.preventDefault()
    const targetId = link.href.split('#')[1]
    if (targetId) {
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }

  const skills = [
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Ant Design', color: '#1890FF' },
    { name: 'Tailwind CSS', color: '#38B2AC' },
    { name: 'Next.js', color: '#000000' },
    { name: 'GraphQL', color: '#E10098' },
    { name: 'Docker', color: '#2496ED' }
  ]

  const projects = [
    {
      title: 'Pro React Admin',
      desc: 'A comprehensive enterprise-level admin dashboard template based on React, Ant Design, and Vite.',
      tags: ['React', 'Ant Design', 'Vite'],
      icon: <LaptopOutlined />
    },
    {
      title: 'E-Commerce Platform',
      desc: 'A full-stack e-commerce solution with real-time inventory management and payment integration.',
      tags: ['Next.js', 'Node.js', 'Stripe'],
      icon: <RocketOutlined />
    },
    {
      title: 'Data Visualization Dashboard',
      desc: 'Interactive dashboard for visualizing complex datasets using D3.js and ECharts.',
      tags: ['Vue', 'D3.js', 'ECharts'],
      icon: <CodeOutlined />
    }
  ]

  const experiences = [
    {
      year: '2023 - Present',
      title: 'Senior Frontend Engineer',
      company: 'Tech Corp',
      desc: 'Leading the frontend team, architecting scalable solutions, and mentoring junior developers.'
    },
    {
      year: '2021 - 2023',
      title: 'Full Stack Developer',
      company: 'StartUp Inc',
      desc: 'Developed and maintained multiple web applications using React and Node.js.'
    },
    {
      year: '2019 - 2021',
      title: 'Frontend Developer',
      company: 'Web Solutions',
      desc: 'Collaborated with designers to implement responsive and accessible user interfaces.'
    }
  ]

  return (
    <div
      id='portfolio-container'
      style={{
        backgroundColor: token.colorBgContainer,
        color: token.colorText,
        position: 'relative',
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        backgroundImage:
          theme.useToken().theme.id === 1 // Dark mode check approximation or use token
            ? `radial-gradient(circle at 50% 50%, ${token.colorPrimaryBg} 0%, transparent 50%), radial-gradient(circle at 0% 0%, ${token.colorFill} 0%, transparent 30%), radial-gradient(circle at 100% 100%, ${token.colorFill} 0%, transparent 30%)`
            : `radial-gradient(circle at 50% 50%, ${token.colorPrimaryBg} 0%, transparent 60%), radial-gradient(circle at 100% 0%, ${token.colorFill} 0%, transparent 40%)`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      {/* Floating Shapes Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: token.colorPrimary,
            filter: 'blur(100px)',
            opacity: 0.1
          }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: token.colorSuccess,
            filter: 'blur(120px)',
            opacity: 0.08
          }}
        />
      </div>
      {/* Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: token.colorPrimary,
          transformOrigin: '0%',
          zIndex: 1000
        }}
      />

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: 'fixed',
          top: 24,
          left: 24,
          zIndex: 100
        }}
      >
        <Tooltip title='Return to Dashboard'>
          <Button
            shape='circle'
            size='large'
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            style={{
              color: token.colorText,
              background: token.colorBgElevated,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${token.colorBorderSecondary}`,
              boxShadow: token.boxShadowSecondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </Tooltip>
      </motion.div>

      {/* Navigation */}
      {!screens.md
        ? (
          <>
            <FloatButton
              icon={<MenuOutlined />}
              type='primary'
              onClick={() => setMobileMenuOpen(true)}
              style={{ right: 24, bottom: 24 }}
            />
            <Drawer
              title='Navigation'
              placement='right'
              onClose={() => setMobileMenuOpen(false)}
              open={mobileMenuOpen}
              size={200}
              styles={{ body: { padding: 0 } }}
            >
              <Anchor
                targetOffset={targetOffset}
                getContainer={() => document.getElementById('portfolio-container')}
                direction='vertical'
                onClick={handleAnchorClick}
                items={navItems}
                style={{ padding: 20 }}
              />
            </Drawer>
          </>
          )
        : (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              right: 24,
              transform: 'translateY(-50%)',
              zIndex: 100,
              backgroundColor: token.colorBgElevated,
              borderRadius: token.borderRadiusLG,
              padding: '16px 12px',
              boxShadow: token.boxShadowSecondary,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${token.colorBorderSecondary}`
            }}
          >
            <Anchor
              targetOffset={targetOffset}
              getContainer={() => document.getElementById('portfolio-container')}
              direction='vertical'
              onClick={handleAnchorClick}
              items={navItems}
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Home Section */}
        <Section id='home' className='flex flex-col items-center justify-center text-center'>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Avatar
              size={160}
              src={avatarPng}
              style={{ border: `4px solid ${token.colorPrimary}`, marginBottom: 32 }}
            />
          </motion.div>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Title level={1} style={{ fontSize: '4rem', marginBottom: 16 }}>
              Hi, I'm <span style={{ color: token.colorPrimary }}>Wkylin</span>
            </Title>
            <Title level={3} type='secondary' style={{ fontWeight: 300 }}>
              Building Digital Experiences with Passion & Code
            </Title>
            <Space size='large' style={{ marginTop: 32 }}>
              <Button
                type='primary'
                size='large'
                shape='round'
                icon={<RocketOutlined />}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Work
              </Button>
              <Button
                size='large'
                shape='round'
                icon={<UserOutlined />}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
              </Button>
            </Space>
          </motion.div>
        </Section>

        {/* About Section */}
        <Section id='about'>
          <Divider titlePlacement='left'>
            <Title level={2}>About Me</Title>
          </Divider>
          <Row gutter={[48, 48]} align='middle'>
            <Col xs={24} md={12}>
              <AnimatedCard>
                <Paragraph style={{ fontSize: 18, lineHeight: 1.8 }}>
                  I am a passionate <strong>Full Stack Developer</strong> with a keen eye for detail and a drive for
                  excellence. I specialize in building scalable, high-performance web applications using modern
                  technologies.
                </Paragraph>
                <Paragraph style={{ fontSize: 18, lineHeight: 1.8 }}>
                  With a strong foundation in both frontend and backend development, I enjoy solving complex problems
                  and turning ideas into reality. I am constantly learning and exploring new technologies to stay ahead
                  in the ever-evolving tech landscape.
                </Paragraph>
              </AnimatedCard>
            </Col>
            <Col xs={24} md={12}>
              <Row gutter={[16, 16]}>
                {[
                  { title: 'Fast Learner', icon: <RocketOutlined /> },
                  { title: 'Team Player', icon: <UserOutlined /> },
                  { title: 'Problem Solver', icon: <ToolOutlined /> },
                  { title: 'Detail Oriented', icon: <CheckCircleOutlined /> }
                ].map((item, index) => (
                  <Col span={12} key={index}>
                    <AnimatedCard delay={index * 0.1}>
                      <Card
                        variant='borderless'
                        style={{
                          textAlign: 'center',
                          background: token.colorFillAlter,
                          borderRadius: token.borderRadiusLG
                        }}
                      >
                        <div style={{ fontSize: 32, color: token.colorPrimary, marginBottom: 8 }}>{item.icon}</div>
                        <Text strong>{item.title}</Text>
                      </Card>
                    </AnimatedCard>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Section>

        {/* Skills Section */}
        <Section id='skills'>
          <Divider titlePlacement='left'>
            <Title level={2}>Tech Stack</Title>
          </Divider>
          <Row gutter={[16, 16]}>
            {skills.map((skill, index) => (
              <Col key={skill.name}>
                <AnimatedCard delay={index * 0.05}>
                  <Tag
                    color={skill.color}
                    style={{
                      padding: '8px 16px',
                      fontSize: 16,
                      borderRadius: 20,
                      border: 'none',
                      marginBottom: 8
                    }}
                  >
                    {skill.name}
                  </Tag>
                </AnimatedCard>
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: 48 }}>
            <Title level={3}>Capabilities</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <AnimatedCard>
                  <Card title='Frontend Development' variant='borderless' className='shadow-sm'>
                    <Paragraph>
                      Expertise in building responsive, interactive, and accessible user interfaces using React, Vue,
                      and modern CSS frameworks.
                    </Paragraph>
                  </Card>
                </AnimatedCard>
              </Col>
              <Col xs={24} md={8}>
                <AnimatedCard delay={0.2}>
                  <Card title='Backend Development' variant='borderless' className='shadow-sm'>
                    <Paragraph>
                      Experience in designing and implementing RESTful APIs, microservices, and database schemas using
                      Node.js and Python.
                    </Paragraph>
                  </Card>
                </AnimatedCard>
              </Col>
              <Col xs={24} md={8}>
                <AnimatedCard delay={0.4}>
                  <Card title='DevOps & Tools' variant='borderless' className='shadow-sm'>
                    <Paragraph>
                      Proficient in using Git, Docker, CI/CD pipelines, and cloud platforms to ensure smooth deployment
                      and operation.
                    </Paragraph>
                  </Card>
                </AnimatedCard>
              </Col>
            </Row>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id='projects'>
          <Divider titlePlacement='left'>
            <Title level={2}>Featured Projects</Title>
          </Divider>
          <Row gutter={[24, 24]}>
            {projects.map((project, index) => (
              <Col xs={24} md={8} key={index}>
                <AnimatedCard delay={index * 0.2}>
                  <Card
                    hoverable
                    style={{ height: '100%' }}
                    cover={
                      <div
                        style={{
                          height: 200,
                          background: token.colorPrimaryBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 64,
                          color: token.colorPrimary
                        }}
                      >
                        {project.icon}
                      </div>
                    }
                    actions={[
                      <GithubOutlined key='github' />,
                      <RocketOutlined key='demo' />,
                      <ProjectOutlined key='detail' />
                    ]}
                  >
                    <Card.Meta
                      title={project.title}
                      description={
                        <>
                          <Paragraph ellipsis={{ rows: 2 }}>{project.desc}</Paragraph>
                          <Space wrap>
                            {project.tags.map((tag) => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </Space>
                        </>
                      }
                    />
                  </Card>
                </AnimatedCard>
              </Col>
            ))}
          </Row>
        </Section>

        {/* Experience Section */}
        <Section id='experience'>
          <Divider titlePlacement='left'>
            <Title level={2}>Experience</Title>
          </Divider>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Timeline
              mode='alternate'
              items={experiences.map((exp, index) => ({
                title: (
                  <div style={{ marginTop: 8 }}>
                    <Tag color='blue'>{exp.year}</Tag>
                  </div>
                ),
                content: (
                  <AnimatedCard delay={index * 0.2}>
                    <Card variant='borderless' style={{ background: token.colorFillAlter }}>
                      <Title level={5} style={{ margin: 0 }}>
                        {exp.title}
                      </Title>
                      <Text type='secondary'>{exp.company}</Text>
                      <Paragraph style={{ marginTop: 16 }}>{exp.desc}</Paragraph>
                    </Card>
                  </AnimatedCard>
                ),
                color: token.colorPrimary
              }))}
            />
          </div>
        </Section>

        {/* Contact Section */}
        <Section id='contact' className='flex flex-col items-center justify-center'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <Title level={2}>Get In Touch</Title>
            <Paragraph style={{ fontSize: 18, maxWidth: 600, margin: '0 auto 32px' }}>
              I'm currently open to new opportunities and collaborations. Whether you have a question or just want to
              say hi, feel free to reach out!
            </Paragraph>
            <Space size='large'>
              <Button type='primary' size='large' icon={<MailOutlined />} onClick={() => navigate('/contact')}>
                Email Me
              </Button>
              <Button size='large' icon={<GithubOutlined />} href='https://github.com/wkylin' target='_blank'>
                GitHub
              </Button>
              <Button size='large' icon={<XOutlined />} href='https://x.com/home' target='_blank'>
                X
              </Button>
            </Space>
          </motion.div>
          <div style={{ marginTop: 64, color: token.colorTextSecondary }}>
            © {new Date().getFullYear()} Wkylin. All Rights Reserved.
          </div>
        </Section>
      </div>
    </div>
  )
}

export default MyPortfilo
