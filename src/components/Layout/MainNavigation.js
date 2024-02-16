import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const MainNavigation = () => {
  return (
    <header>
         <Navbar className='navbar-brand navbar-expand '>
      <Container>
      {/* <NavLink to='/signin' className='nav-link mx-3'>
              Login
            </NavLink>  */}
   
      </Container>
      </Navbar>
    </header>
  )
}

export default MainNavigation
