import { API } from '../../Config'
import Layout from './Layout'
const Home = () =>{
    return(
        <Layout title="Home Page" description="Welcome to Nikhil Page">
            {API}
        </Layout>
    )
}

export default Home