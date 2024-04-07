import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function OAuthCallback() {
    const location = useLocation();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Extract code and other parameters from the query string
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        // Make an API call to your backend to exchange the code for user information
        fetch(`http://localhost:3001/request?code=${code}`)
            .then(response => response.json())
            .then(data => {
                // Store the user information in state
                setUserInfo(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [location.search]);

    return (
        <div>
            {/* Display user information if available */}
            {userInfo && (
                <div>
                    <h2>Welcome, {userInfo.name}</h2>
                    <img src={userInfo.image} alt="User Avatar" />
                    {/* You can display additional user information here */}
                </div>
            )}
        </div>
    );
}

export default OAuthCallback;
