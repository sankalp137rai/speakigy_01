import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
	const [user] = useAuthState(auth);
	const userChatRef = db
		.collection("chats")
		.where("users", "array-contains", user.email);
	const [chatsSnapshot] = useCollection(userChatRef);

	const createChat = () => {
		const input = prompt(
			"Please enter the email address for the user you wish to chat with"
		);

		if (!input) return null;

		if (
			EmailValidator.validate(input) &&
			input !== user.email &&
			!chatAlreadyExists(input)
		) {
			// we need to add the chat into db chat collection
			db.collection("chats").add({
				users: [user.email, input],
			});
		}
	};

	const chatAlreadyExists = (recipientEmail) =>
		!!chatsSnapshot?.docs.find(
			(chat) =>
				chat.data().users.find((user) => user === recipientEmail)?.length > 0
		);

	return (
		<Container>
			<Header>
				<UserAvatar src= {user.photoURL} onClick={() => auth.signOut()} />
				<h5>{user.email}</h5>
				<IconContainer>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</IconContainer>
			</Header>
			<Search>
				<SearchIcon />
				<SearchInput placeholder="Search in chats"></SearchInput>
			</Search>
			<SideBarButton onClick={createChat}>START A NEW CHAT!</SideBarButton>

			{/* List of chats */}
			{chatsSnapshot?.docs.map(chat => (
				<Chat key = {chat.id} id = {chat.id} users={chat.data().users} />
			))}
		</Container>
	);
}

export default Sidebar;

const Container = styled.div`
/* background-color: #add8e6; */
flex: 0.45;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow-y: scroll;

::-webkit-scrollbar {
	display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;


const Header = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	background-color: white;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;
const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;

	padding: 2px;
`;
const SearchInput = styled.input`
	border: none;
	outline-width: 0;
	flex: 1;
`;

const SideBarButton = styled(Button)`
	width: 100%;
	&&& {
		border-top: 1px solid whitesmoke;
		border-bottom: 1px solid whitesmoke;
	}
`;

const IconContainer = styled.div``;
