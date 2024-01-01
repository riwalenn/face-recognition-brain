import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'

function App() {
    return (
        <div className="App">
            <ParticlesBg color="#5c5c5c" num={100} type="cobweb" bg={true}/>
            <Navigation/>
            <Logo/>
            <Rank/>
            <ImageLinkForm/>
            {/*<FaceRecognition />*/}
        </div>
    );
}

export default App;
