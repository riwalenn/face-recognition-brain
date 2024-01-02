import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import {Component} from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

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
        }
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
        fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnCarifaiRequestOptions(this.state.input))
            .then(response => response.json())
            .then(response => {
                console.log('hi', response.outputs[0].data.regions[0].region_info.bounding_box)
                // if (response) {
                //     fetch('http://localhost:3000/image', {
                //         method: 'put',
                //         headers: {'Content-Type': 'application/json'},
                //         body: JSON.stringify({
                //             id: this.state.user.id
                //         })
                //     })
                //         .then(response => response.json())
                //         .then(count => {
                //
                //         })
                // }
            })
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
                <FaceRecognition imageUrl={imageUrl} />
            </div>
        )
    }
}

export default App;
