import {Component} from "react";
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import './App.css';

const returnCarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'YOUR_PAT_HERE';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';
    const APP_ID = 'main';

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl
                    }
                }
            }
        ]
    });

    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {}
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        };
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});

        // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
        // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
        // this will default to the latest version_id
        // eslint-disable-next-line no-useless-concat
        fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnCarifaiRequestOptions(this.state.input))
            .then(response => response.json())
            .then(response => this.calculateFaceLocation(response))
            .catch(err => console.error(err));
    }

    render() {
        const { imageUrl } = this.state;
        return (
            <div className="App">
                <ParticlesBg color="#5c5c5c" num={100} type="cobweb" bg={true}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={this.state.box} imageUrl={imageUrl} />
            </div>
        )
    }
}

export default App;
