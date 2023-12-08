import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
// to style app, style the div

const StyledApp = styled.div`
	background-color: orangered;
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Heading as="h1">The Wild Oasis</Heading>
				<Heading as="h2">Th</Heading>
				<Button>Check in</Button>
				<Button>Check out</Button>
				<Heading as="h3">Form</Heading>
				<Input type="number" placeholder="number of guests" />
			</StyledApp>
		</>
	);
}

export default App;
