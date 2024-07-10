import { Divider, Stack, Typography } from '@mui/material'
import { MainCard } from 'components'

const HomePage = () => {
  return (
    <>
      <Stack sx={{ mt: 1, mb: 2.5 }}>
        <Typography variant="h3">Home</Typography>
      </Stack>
      <Divider />
      <MainCard
        content={false}
        sx={{ mt: 3, p: 5 }}>
        <Typography
          align="center"
          variant="h5">
          Welcome to the react template. <br />
          This is a template for a react application with some features and
          components.
          <br />
          You can use this template to create your own react application.
          <br />
          For more information, please check the README.md
          <br />
        </Typography>
      </MainCard>
    </>
  )
}

export default HomePage
