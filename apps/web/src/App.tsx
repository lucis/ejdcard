import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

export default function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background:
          'radial-gradient(ellipse at top left, rgba(27, 77, 62, 0.12), transparent 55%), radial-gradient(ellipse at bottom right, rgba(196, 163, 90, 0.18), transparent 50%), #F7F5F0',
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <Chip label="EJDCard" color="primary" sx={{ alignSelf: 'flex-start' }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            ok
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Scaffold monorepo no ar — Vite, React, TypeScript, Material UI e DM Sans.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
