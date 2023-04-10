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
  }
} as const

function Layout({ children }: PropsWithChildren) {
  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <div style={styles.content}>{children}</div>
    </div>
  )
}

export default Layout
