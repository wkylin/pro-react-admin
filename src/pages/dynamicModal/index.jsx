import React, { useState } from 'react'
import { Button, Modal } from 'antd'

const ModalContent1 = () => <div>Modal 1 Content</div>

const ModalContent2 = () => <div>Modal 2 Content</div>

const App = () => {
  const [currentModal, setCurrentModal] = useState(null)

  const handleModalOpen = (modal) => {
    if (currentModal) {
      currentModal.destroy()
    }
    setCurrentModal(modal)
    modal.update({ visible: true })
  }

  const handleClose = () => {
    if (currentModal) {
      currentModal.destroy()
      setCurrentModal(null)
    }
  }

  return (
    <div>
      <Button
        onClick={() =>
          handleModalOpen(
            Modal.info({
              content: <ModalContent1 />,
              onCancel: handleClose,
              maskClosable: false, // 设置 maskClosable 为 false
            })
          )
        }
      >
        Open Modal 1
      </Button>
      <Button
        onClick={() =>
          handleModalOpen(
            Modal.info({
              content: <ModalContent2 />,
              onCancel: handleClose,
              maskClosable: false, // 设置 maskClosable 为 false
            })
          )
        }
      >
        Open Modal 2
      </Button>
    </div>
  )
}

export default App
