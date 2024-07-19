import styled from "styled-components";

const StyledFromRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 1.2rem 0;
`;

const Label = styled.label`
	font-weight: 500;
`;
const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function FormRowVertical({ children, label, error }) {
	return (
		<StyledFromRow>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFromRow>
	);
}

export default FormRowVertical;
