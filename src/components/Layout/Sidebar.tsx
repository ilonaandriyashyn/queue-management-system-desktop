import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Drawer } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import DashboardIcon from '@mui/icons-material/Dashboard'

const styles = {
  drawer: {
    '& .MuiDrawer-paper': {
      width: 58
    }
  }
}
export default function Sidebar() {
  return (
    <Drawer variant="permanent" open sx={styles.drawer}>
      <List>
        <ListItem key="dashboard" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem key="settings" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
