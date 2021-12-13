import React from 'react'
import Link from 'next/link'
import {
  Flex,
  Container,
  Button,
  Text,
} from "@chakra-ui/react"
const nfaDependencyVersion =
  require('../package.json').dependencies['next-firebase-auth']
const nextDependencyVersion = require('../package.json').dependencies.next
const firebaseDependencyVersion =
  require('../package.json').dependencies.firebase

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  versionsContainer: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  button: {
    marginLeft: 16,
    cursor: 'pointer',
  },
}

const Header = ({ email, signOut }) => (
  <Container style={styles.container}>
    <div style={styles.versionsContainer} pr='4'>
      <Text fontSize='xl'>Powered by</Text>
      <Text pr='4'>Next-Firebase-Auth v{nfaDependencyVersion},</Text>
      <Text>Next.js v{nextDependencyVersion},</Text>
      <Text>Firebase v{firebaseDependencyVersion}</Text>
    </div>
    {email ? (
      <>
        <Text pr='6'>Signed in as <Text fontSize="2xl">{email}</Text>
        </Text>
        <Button
          type="button"
          boxShadow="base"
          onClick={() => {
            signOut()
          }}
          style={styles.button}
        >
          Sign out
        </Button>
      </>
    ) : (
      <>
        <p>You are not signed in.</p>
        <Link href="/auth">
          <a>
            <button type="button" style={styles.button}>
              Sign in
            </button>
          </a>
        </Link>
      </>
    )}
  </Container>
)

export default Header
