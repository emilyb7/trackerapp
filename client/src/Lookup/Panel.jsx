import React from 'react'

const Panel = ({ children, }) => (
  <div className="fixed bottom-0 z-999 pa3 bg-light-green w-100 tc">
    {children}
  </div>
)

export default Panel
