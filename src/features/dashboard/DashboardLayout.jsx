import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { bookings, isLoading: isLoading1 } = useRecentBookings();
	const { stays, confirmedStays, isLoading: isLoading2 } = useRecentStays();
	if (isLoading1 || isLoading2) return <Spinner />;

	console.log(bookings);
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
