import React, { useEffect } from 'react'

function MyHome() {

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/authen', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token
            },
          })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'ok') {
            //   alert('Authen success') 
            } else {
              alert('Authen failed')
              localStorage.removeItem('token')
              window.location = '/MyLogin'
            }
          })
          .catch((error) => {
            console.log('Error:', error);
          })
    }, [])

  return (
    <div>MyHome</div>
  )
}

export default MyHome