import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Drawer } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { useAppDispatch } from '../../store/hooks'
import { setPage } from '../../store/common/slice'
import { Pages } from '../../helpers/consts'

const styles = {
  drawer: {
    '& .MuiDrawer-paper': {
      width: 58
    }
  }
}
export default function Sidebar() {
  const dispatch = useAppDispatch()

  const handlePageRedirect = (page: Pages) => {
    dispatch(setPage(page))
  }
  return (
    <Drawer variant="permanent" open sx={styles.drawer}>
      <List>
        <ListItem key="dashboard" disablePadding>
          <ListItemButton
            onClick={() => {
              handlePageRedirect(Pages.dashboard)
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem key="settings" disablePadding>
          <ListItemButton
            onClick={() => {
              handlePageRedirect(Pages.settings)
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
