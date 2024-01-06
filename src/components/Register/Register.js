import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ registerName: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value });
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
           method: 'post',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
               name: this.state.registerName,
               email: this.state.registerEmail,
               password: this.state.registerPassword
           })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    console.error("Error on registering");
                    this.props.onRouteChange('register');
                }
            });
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <article className="form br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input
                                        onChange={this.onNameChange}
                                        className="pa2 input-reset ba bg-transparent w-100"
                                        style={{backgroundColor: '#cfd8dc'}}
                                        type="text" name="name" id="name"
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent w-100"
                                        style={{backgroundColor: '#cfd8dc'}}
                                        type="email" name="email-address" id="email-address"
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent w-100"
                                        style={{backgroundColor: '#cfd8dc'}}
                                        type="password" name="password" id="password"
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
                                    type="submit" value="Register" onClick={this.onSubmitRegister}
                                    style={{color: '#cfd8dc', borderColor: '#cfd8dc'}}/>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default Register;