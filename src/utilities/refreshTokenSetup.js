const getRefreshTiming = (expiresIn) => {
  const refreshTiming = (expiresIn || 3600 - 5 * 60) * 1000
  console.log({ expiresIn, refreshTiming })
  return refreshTiming
}

export const refreshTokenSetup = (res) => {
  // Timing to renew access token
  let refreshTiming = getRefreshTiming(
    res.tokenObj.expires_at,
    res.tokenObj.expires_in
  )

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse()
    refreshTiming = getRefreshTiming(newAuthRes.expires_in)
    console.log('newAuthRes:', newAuthRes)
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem('authToken', newAuthRes.id_token)

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming)
  }

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming)
}
