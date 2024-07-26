import styled from "styled-components";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	return (
		<StyledDashboardLayout>
			<div className="">Statistics</div>
			<div className="">Activity of today</div>
			<div className="">Stay durations</div>
			<div className="">chart of sales</div>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
