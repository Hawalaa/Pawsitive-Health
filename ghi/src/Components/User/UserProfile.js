import React from 'react';
import { useGetUserProfileDataQuery } from '../../Store/UserProfileApi';
import Navbar from '../Dashboard/Navbar';
import UserProfileTopNav from './UserProfileTopNav';
import UserProfileCard from '../Cards/UserProfileCard'

export default function UserProfile() {
    const { data } = useGetUserProfileDataQuery();

    if (data) {
        return (
			<>
			<div style={{ display: "flex" }}>
				<Navbar />
				<div
					style={{
						margin: 0,
						padding: 0,
						width: "100%",
						flexDirection: "column",
						display: "flex",
					}}
				>
					<UserProfileTopNav />
					<div
						style={{
							display: "grid",
							height: "100%"
						}}
					>
						<UserProfileCard />
					</div>
				</div>
			</div>
			</>
        );
    }
}
