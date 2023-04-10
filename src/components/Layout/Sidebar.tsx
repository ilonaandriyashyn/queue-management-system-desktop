import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Drawer } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectPage, setPage } from '../../store/common/slice'
import { PAGES, type PagesType } from '../../helpers/consts'

const styles = {
  drawer: {
    '& .MuiDrawer-paper': {
      width: 58,
      overflow: 'hidden'
    }
  },
  selected: {
    backgroundColor: 'grey.300'
  }
}
export default function Sidebar() {
  const dispatch = useAppDispatch()
  const pageSelected = useAppSelector(selectPage)

  const handlePageRedirect = (page: PagesType) => {
    dispatch(setPage(page))
  }

  return (
    <Drawer variant="permanent" open sx={styles.drawer}>
      <List>
        {Object.values(PAGES).map((page) => (
          <ListItem key={page.name} disablePadding sx={pageSelected === page.name ? styles.selected : {}}>
            <ListItemButton
              onClick={() => {
                handlePageRedirect(page.name)
              }}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
