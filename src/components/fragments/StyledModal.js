import { Box, Button, Modal } from '@mui/material'
import React, { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  padding: '1em',
  p: 1,
}

const buttonsStyle = {
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'space-around',
}

export function StyledModal({
  open,
  setOpen,
  onClose,
  title,
  onClickNo,
  onClickYes,
}) {
  const handleNo = (event) => {
    setOpen(false)
    if (onClickNo) {
      onClickNo(event)
    }
  }

  const handleYes = (event) => {
    setOpen(false)
    if (onClickYes) {
      onClickYes(event)
    }
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        <Box>{title}</Box>
        <Box sx={buttonsStyle}>
          <Button
            sx={{ minWidth: '45%' }}
            id="yes"
            variant="contained"
            color="secondary"
            tabIndex={0}
            size="large"
            onClick={handleYes}
          >
            Yes
          </Button>
          <Button
            sx={{ minWidth: '45%' }}
            id="no"
            variant="contained"
            color="info"
            tabIndex={0}
            size="large"
            onClick={handleNo}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
