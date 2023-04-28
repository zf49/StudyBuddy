import TopBar from '../component/SandBox/TopBar'
import Content from '../component/SandBox/Content';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dogPic from './../ICON/dog.png' 
import Divider from '@mui/material/Divider';

export default function SandBox() {
  
    return (

        <Grid container spacing={2} style={{
          backgroundImage: `url(${dogPic})`,
          backgroundColor: '#ADD8E6',
          backgroundSize: '5em',
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1,
        }}>
        <Grid item xs={12}>
          <TopBar/>
        </Grid>
        <Divider />

        <Grid item xs={12} className="asdasdasd" >
        <Container maxWidth="lg" sx={{height:"100vh"}} style={{ flexGrow: 1, overflowY: 'auto',paddingTop:'10vh' }}>
            <Content />
        </Container>
        </Grid>
        </Grid>
    
    

          
    )
}
