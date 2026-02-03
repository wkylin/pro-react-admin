import Phase01 from './phases/Phase01_Code'
import Phase02 from './phases/Phase02_CICD'
import Phase03 from './phases/Phase03_Env'
import Phase04 from './phases/Phase04_Strategy'
import Phase05 from './phases/Phase05_Ops'
import TimelineDot from './shared/TimelineDot'
import KnowledgeSummary from './shared/KnowledgeSummary'
import styles from './index.module.less'

const phases = [
  { id: 'phase-01', component: Phase01, type: 'git' as const },
  { id: 'phase-02', component: Phase02, type: 'ci' as const },
  { id: 'phase-03', component: Phase03, type: 'env' as const },
  { id: 'phase-04', component: Phase04, type: 'strategy' as const },
  { id: 'phase-05', component: Phase05, type: 'ops' as const },
]

interface Props {
  scrollContainerRef?: React.RefObject<HTMLElement>
}

const DeploymentFlow: React.FC<Props> = ({ scrollContainerRef }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.timelineLine}></div>

        {phases.map((phase, index) => {
          const isLeft = index % 2 === 0
          const PhaseComponent = phase.component

          return (
            <div key={phase.id} className={`${styles.node} ${styles[phase.type]}`}>
              <TimelineDot type={phase.type} />
              <div className={`${styles.cardWrapper} ${isLeft ? styles.left : styles.right}`}>
                <PhaseComponent isLeft={isLeft} scrollContainerRef={scrollContainerRef} />
              </div>
            </div>
          )
        })}
      </div>
      <KnowledgeSummary />
    </>
  )
}

export default DeploymentFlow
