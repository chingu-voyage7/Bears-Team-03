import React from 'react'

export default function ErrorNotification(props) {
  return (
    <div style={{width: '300px', margin: ' 1rem auto', border:'2px solid #e35364', borderRadius: '10px', textAlign: 'center'}}>
      <p style={{margin: '0', padding: '0.5rem', color: '#e35364'}} >{props.message}</p>
    </div>
  )
}
