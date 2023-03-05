import React, { type PropsWithChildren } from 'react'
import Sidebar from './Sidebar'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    marginLeft: '5rem',
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    alignSelf: 'flex-end'
  }
} as const

function Layout({ children }: PropsWithChildren) {
  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.name}>{'My Name'}</div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
