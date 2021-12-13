import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Flex,
    Heading,
    InputLeftElement,
    Input,
    Button,
    Text,
    IconButton,
    Divider,
	SimpleGrid,
	GridItem,
	FormControl,
	FormLabel,
} from "@chakra-ui/react"
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
  } from "@chakra-ui/react"
import PagesMenu from '../components/PagesMenu'
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


const Contact = () => {
	const AuthUser = useAuthUser();
	const [inputFirstName, setInputFirstName] = useState('');
	const [inputLastName, setInputLastName] = useState('');
	const [inputEmail, setInputEmail] = useState('');
	const [inputPhoneNumber, setInputPhoneNumber] = useState('');
	const [contacts, setContact] = useState([]);

	useEffect(() => {
		AuthUser.id &&
			firebase
				.firestore()
				.collection("contacts")
				.where( 'user', '==', AuthUser.id )
				.onSnapshot(
					snapshot => {
						setContact(
							snapshot.docs.map(
								doc => {
									return {
										contactID: doc.id,
										contactFirstName: doc.data().firstName,
										contactLastName: doc.data().lastName,
										contactPhoneNumber: doc.data().phoneNumber,
										contactEmail: doc.data().email
									}
								}
							)
						);
					}
				)
			}
		)

	const sendData = () => {
		try {
			// try to update doc
			firebase
				.firestore()
				.collection("contacts") // all users share one collection
				.add({
					user: AuthUser.id,
					firstName: inputFirstName,
					lastName: inputLastName,
					email: inputEmail,
					phoneNumber: inputPhoneNumber,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				})
				.then(console.log('Data was successfully sent to cloud firestore!'));
				setInputFirstName('');
				setInputLastName('');
				setInputEmail('');
				setInputPhoneNumber('');
		} catch (error) {
			console.log(error)
		}
	}

	const deleteContact = (t) => {
		try {
			firebase
				.firestore()
				.collection("contacts")
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
		
		<SimpleGrid columns={2} columnGap={2} rowGap={6}>
			<FormControl>
				<InputLeftElement
					pointerEvents="none"
					children={<AddIcon color="gray.300" />}
				/>
				<GridItem colSpan={1}>
					<FormLabel>First Name </FormLabel>
					<Input type="text" onChange={(e) => setInputFirstName(e.target.value)} placeholder="First Name" />
				</GridItem>
				<GridItem colSpan={1}>
					<FormLabel>Last Name</FormLabel>
					<Input type="text" onChange={(e) => setInputLastName(e.target.value)} placeholder="Last Name" />
				</GridItem>
				<GridItem colSpan={2}>
				<FormLabel>Email</FormLabel>
					<Input type="email" onChange={(e) => setInputEmail(e.target.value)} placeholder="Email address"/>
				</GridItem>
				<GridItem colSpan={2}>
				<FormLabel>Phone Number</FormLabel>
					<Input type="phone" onChange={(e) => setInputPhoneNumber(e.target.value)} placeholder="123-555-4444"/>
				</GridItem>
				<Button
					boxShadow="base"
					m={[2, 3]}
					onClick={() => sendData()}
					>
					Add
				</Button>
			</FormControl>
    	</SimpleGrid>

		{contacts.map((item, i) => {
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
								<Text>{item.firstName}</Text>
								<Text>{item.lastName}</Text>
								<Text>{item.email}</Text>
								<Text>{item.phoneNumber}</Text>
						</Flex>
						<IconButton onClick={() => deleteContact(item.contactID)} icon={<DeleteIcon />} />
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
})(Contact)