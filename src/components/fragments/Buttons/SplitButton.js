import React, { useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { Grid } from '@mui/material'

export default function SplitButton({ options, onClick }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [selected, setSelected] = useState()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (options?.length) {
      setSelected(options[0])
      setItems(options.filter((option) => option !== options[0]))
    }
  }, [options?.length])

  const handleClick = () => {
    onClick(selected)
  }

  const handleMenuItemClick = (event, index) => {
    const newlySelected = items[index]
    setItems(options.filter((option) => option !== newlySelected))
    setSelected(newlySelected)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      {!!selected?.name && (
        <Grid item xs={12}>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
          >
            <Button onClick={handleClick}>{`Add: ${selected.name}`}</Button>
            {items?.length > 0 && (
              <Button
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            )}
          </ButtonGroup>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                      {items.map((item, index) => (
                        <MenuItem
                          key={`item-${item.id}`}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      )}
    </>
  )
}
