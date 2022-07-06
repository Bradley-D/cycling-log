import React, { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState({})

  // TODO: Move the API request responsibility to Express and then React can just handle the display
  // of data from the backend endpoint.
  // Strava Credentials
  let clientID = process.env.REACT_APP_CLIENT_ID;
  let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  // refresh token and call address
  // TODO: Will need to extract the refreshToken from the url with an athlete
  // authorises Strava to play nice with the app.
  const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`

  // endpoint for read-all activities. temporary token is added in getActivities()
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`

  // Use refresh token to get current access token
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const fetchData = await fetch(callRefresh, {
          method: 'POST'
        })
        const fetchJson = await fetchData.json()
        getActivities(fetchJson.access_token)
      } catch(e) {
        console.log(e)
      }
    }
    fetchAccessToken()
  }, [callRefresh])

  // use current access token to call all activities
  async function getActivities(access) {
      try {
        const response = await fetch(callActivities + access);
        const data = await response.json();
        setActivities(data)
        setIsLoading(false)
      } catch(e){
        console.log(e)
      }
  }

  function showActivities() {
    if (isLoading) return <>LOADING</>

    return (
      <>
        <p>Last Strava activities: {activities.length}</p>
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity.name}</li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className="App">
      {showActivities()}
    </div>
  );
}

export default App;