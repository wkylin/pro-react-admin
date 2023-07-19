import React from 'react'
import MermaidHooks from '@stateful/mermaidHooks'
import FixTabPanel from '@stateless/FixTabPanel'

const gitChart = `gitGraph
  commit
  commit
  branch develop
  commit
  commit
  commit
  checkout main
  commit
  commit
`

const diagramChart = `
---
title: Animal example
---
classDiagram
    note "From Duck till Zebra"
    Animal <|-- Duck
    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }
`

const Mermaid = () => (
  <>
    <FixTabPanel>
      <h2>Meraid: http://https://mermaid.js.org/</h2>

      <h3>演示1:Git Diagram </h3>
      <MermaidHooks chart={gitChart} />

      <h3>演示2:Class Diagram</h3>
      <MermaidHooks chart={diagramChart} />
    </FixTabPanel>
  </>
)

export default Mermaid
