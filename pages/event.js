import React, {useState, useEffect } from 'react'
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
import { AddIcon, DeleteIcon, StarIcon, ChevronDownIcon } from "@chakra-ui/icons"
import {
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
    AuthAction,
    getFirebaseAdmin,
} from 'next-firebase-auth'
import DarkModeSwitch from '../components/DarkModeSwitch'
import getAbsoluteURL from '../utils/getAbsoluteURL'
import firebase from 'firebase/app'
import 'firebase/firestore'


const Event = () => {
  const AuthUser = useAuthUser();
  const [inputEventName, setInputEventName] = useState('');
	const [inputEventLocation, setInputEventLocation] = useState('');
  const [inputEventDate, setInputEventDate] = useState('');
	const [inputEventTime, setInputEventTime] = useState('');
	const [events, setEvents] = useState([]);

  useEffect(() => {
    AuthUser.id &&
      firebase
        .firestore()
        .collection("events")
        .where( 'user', '==', AuthUser.id )
        .onSnapshot(
          snapshot => {
            setEvents(
              snapshot.docs.map(
                doc => {
                  return {
                    eventID: doc.id,
                    eventName: doc.data().title,
										eventLocation: doc.data().location,
										eventTime: doc.data().time,
                    eventDate: doc.data().date.toDate().toDateString()
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
      firebase
        .firestore()
        .collection("events") // all users will share one collection
        .add({
          user: AuthUser.id,
          title: inputEventName,
					location: inputEventLocation,
					time: inputEventTime,
          date: firebase.firestore.Timestamp.fromDate( new Date(inputEventDate) ),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(console.log('Data was successfully sent to cloud firestore!'));
      // flush out the user-entered values in the input elements onscreen
      setInputEventName('');
			setInputEventLocation('');
			setInputEventTime('');
      setInputEventDate('');

    } catch (error) {
      console.log(error)
    }
  }

  const deleteEvent = (t) => {
    try {
      firebase
        .firestore()
        .collection("events")
        .doc(t)
        .delete()
        .then(console.log('Data was successfully deleted!'))
    } catch (error) {
      console.log(error)
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
                <GridItem colSpan={2}>
                    <FormLabel>Event Name</FormLabel>
                    <Input type="text" onChange={(e) => setInputEventName(e.target.value)} placeholder="Taco Tuesday"/>
                </GridItem>
                <GridItem colSpan={2}>
                    <FormLabel>Event Location</FormLabel>
                    <Input type="text" onChange={(e) => setInputEventLocation(e.target.value)} placeholder="Abby's place"/>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Time</FormLabel>
                    <Input type="time" onChange={(e) => setInputEventTime(e.target.value)} placeholder="12:30"/>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormLabel>Date</FormLabel>
                    <Input type="date" onChange={(e) => setInputEventDate(e.target.value)} placeholder="1/1/2022"/>
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

        {events.map((item, i) => {
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
                  <Text>
                    <Link href={'/events/' + item.eventID}>
                    {item.eventName} 
                    </Link>
                    </Text>
									<Text> {item.eventLocation} </Text>
									<Text>@ {item.eventTime}</Text>
                  <Text> ... {item.eventDate}</Text>
                </Flex>
                <IconButton onClick={() => deleteEvent(item.eventID)} icon={<DeleteIcon />} />
              </Flex>
            </React.Fragment>
          )
        })}
      </Flex>

    )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  return {
    props: {
    }
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(Event)