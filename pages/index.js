import React from 'react'
import Link from 'next/link'
import Waves from '../components/Waves'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Header from '../components/Header'
import DemoPageLinks from '../components/DemoPageLinks'
import {
    Container,
    Flex,
    Button,
    Text,
} from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

const styles = {
	buttonMargin: {
		margin: 32,
	},
}

const Demo = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <Header size="2xl" email={AuthUser.email} signOut={AuthUser.signOut} />
      <Container maxWidth="container.2xl" bgGradient="linear(to-r, #7928CA, #FF0080)">
        <Waves />
        <Flex height="100vh" py={20}>
            <Text color="white" fontSize={{ base: "24px", md: "32px", lg: "48px" }}>Welcome to the Home page!
              <Text color="white" fontSize={{ base: "16px", md: "24px", lg: "32px" }}>Please login to continue</Text>
            </Text>
                <Button boxShadow="base" style={styles.buttonMargin}>
                    <Link href='/todo'>
                        <Text>Todo</Text>
                    </Link>
                </Button>
                <Button boxShadow="base" style={styles.buttonMargin}>
                    <Link href='/event'>
                        <Text>Events</Text>
                    </Link>
                </Button>
                <Button boxShadow="base" style={styles.buttonMargin}>
                    <Link href='/contact'>
                        <Text>Contacts</Text>
                    </Link>
                </Button>
            </Flex>
        <DemoPageLinks />
      </Container>
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Demo)
