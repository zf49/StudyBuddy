import TopBar from '../component/SandBox/TopBar'
import Content from '../component/SandBox/Content';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


export default function SandBox() {
  
    return (

        
        <Grid container spacing={2}>
        <Grid item xs={12} sx={{height:"10vh"}}>
          <TopBar/>
        </Grid>
        <Grid item xs={12} >
        <Container maxWidth="lg" sx={{height:"100vh"}}>
          <Content />
        </Container>
        </Grid>
      </Grid>
    
    

          
    )
}
