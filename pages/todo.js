import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Flex,
    Heading,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    Text,
    IconButton,
    Divider,
} from "@chakra-ui/react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react"
import DarkModeSwitch from '../components/DarkModeSwitch'
import { AddIcon, DeleteIcon, StarIcon, ChevronDownIcon } from "@chakra-ui/icons"
import {
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
    AuthAction,
} from 'next-firebase-auth'
import firebase from 'firebase/app'
import 'firebase/firestore'


const Todo = () => {

	const AuthUser = useAuthUser();
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		AuthUser.id &&
			firebase
				.firestore()
				.collection(AuthUser.id)
				.orderBy('timestamp', 'desc')
				.onSnapshot(snapshot => {
					setTodos(snapshot.docs.map(doc => doc.data().todo))
				})
	})

	const sendData = () => {
		try {
			// try to update doc
			firebase
				.firestore()
				.collection(AuthUser.id) // each user will have their own collection
				.doc(input) // set the collection name to the input so that we can easily delete it later on
				.set({
					todo: input,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				})
				.then(console.log('Data was successfully sent to cloud firestore!'))
		} catch (error) {
				console.log(error)
		}
	}

	const deleteTodo = (t) => {
		try {
			firebase
				.firestore()
				.collection(AuthUser.id)
				.doc(t)
				.delete()
				.then(console.log('Data was successfully deleted!'));
		} catch (error) {
			console.log(error);
		}
	}

  return (
<Flex flexDir="column" maxW={800} align="center" justify="center" minH="100vh" m="auto" px={4}>		
	<Flex justify="space-between" w="100%" align="center">
		<Heading mb={4}>Welcome, 
			<Text
			bgGradient="linear(to-l, #7928CA, #FF0080)"
			bgClip="text"
			fontSize="4xl"
			fontWeight="extrabold"
			>
			{AuthUser.email}
			</Text>
		</Heading>
		<Flex>
		<Menu>
              <MenuButton mr={[1,2]} as={Button} rightIcon={<ChevronDownIcon />}>
                Menu
              </MenuButton>
              <MenuList>
                <Link href='/todo'>
                  <MenuItem>Todo</MenuItem>
                </Link>
                <Link href='/event'>
                  <MenuItem>Events</MenuItem>
                </Link>
                <Link href='/contact'>
                  <MenuItem>Contacts</MenuItem>
                </Link>
                <MenuDivider />
                <Link href='../'>
                  <MenuItem>Home</MenuItem>
                </Link>
              </MenuList>
            </Menu>
            <DarkModeSwitch />
            <IconButton ml={2} onClick={AuthUser.signOut} icon={ <StarIcon/>} />
          </Flex>
		</Flex>
		<InputGroup>
			<InputLeftElement
				pointerEvents="none"
				children={<AddIcon color="gray.300" />}
				/>
			<Input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Add items to your Todo list" />
			<Button
				boxShadow="base"
				m={[2, 3]}
				onClick={() => sendData()}
				>
				Add Todo
			</Button>
		</InputGroup>
		{todos.map((item, i) => {
			return (
				<React.Fragment key={i}>
					{i > 0 && <Divider />}
					<Flex
						w="100%"
						p={5}
						my={2}
						align="center"
						borderRadius={5}
						justifyContent="space-between"
					>
					<Flex align="center">
						<Text fontSize="xl" mr={4}>{i + 1}.</Text>
						<Text>{item}</Text>
					</Flex>
					<IconButton onClick={() => deleteTodo(item)} icon={<DeleteIcon />} />
				</Flex>
			</React.Fragment>
			)
		})}
	</Flex>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({AuthUser, req}) => {
	return {
		props: {
		}
	}
})

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN
})(Todo)