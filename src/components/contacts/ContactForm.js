import React from "react";

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.contact ? this.props.contact.name : "",
            lastName: this.props.contact ? this.props.contact.lastName : "",
            phone: this.props.contact ? this.props.contact.phone : "",
            errors: {
                name: "",
                lastName: "",
                phone: "",
            },
        };

        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSaveClick(event) {
        event.preventDefault();

        const errors = validateForm(this.state);
        this.setState({ errors: errors });
        if (Object.keys(errors).length) {
            return;
        }

        this.props.onSaveClick(this.state);
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
    }

    onCancelClick() {
        this.props.onCancelClick("contacts");
    }

    render() {
        let errorFirstName, errorLastName, errorPhone;

        if (this.state.errors.name) {
            errorFirstName = (
                <div className="error">{this.state.errors.name}</div>
            );
        }

        if (this.state.errors.lastName) {
            errorLastName = (
                <div className="error">{this.state.errors.lastName}</div>
            );
        }

        if (this.state.errors.phone) {
            errorPhone = (
                <div className="error">{this.state.errors.phone}</div>
            );
        }

        return (
            <div id="create-form">
                <form onSubmit={this.onSaveClick}>
                    <label htmlFor="firstName"> First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    ></input>
                    {errorFirstName}

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    ></input>
                    {errorLastName}

                    <label htmlFor="tel">Phone number</label>
                    <input
                        id="tel"
                        type="tel"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                    ></input>
                    {errorPhone}

                    <button id="save-contact" onClick={this.onSaveClick}> Save </button>
                    <button id="cancel" onClick={this.onCancelClick}> Cancel </button>
                </form>
            </div>
        );
    }
}

function validateForm(formDataObj) {
    const errors = {};

    if (!formDataObj.name) {
        errors.name = "Enter your first name, please!";
    } else if (formDataObj.name.length < 1) {
        errors.name = "The first name should consist of at least 1 sign!";
    } else if (formDataObj.name.length > 25) {
        errors.name = "The first name shouldn't consist of more than 25 signs!";
    }

    if (!formDataObj.lastName) {
        errors.lastName = "Enter your last name, please!";
    } else if (
        formDataObj.lastName.length < 1) {
        errors.lastName = "The last name should consist of at least 1 sign!";
    }  else if (formDataObj.lastName.length > 25) {
        errors.lastName = "The last name shouldn't consist of more than 25 signs!";
    }

    if (!formDataObj.phone) {
        errors.phone = "Enter your phone number, please!";
    } else if (!formDataObj.phone.match(/\+?([0-9-() ]+)/)) {
        errors.phone = "The wrong type of phone number!";
    } else if (formDataObj.phone.length < 10) {
        errors.phone = "The phone number should consist of at least 10 signs!";
    } else if (formDataObj.phone.length > 25) {
        errors.phone = "The phone number shouldn't consist of more than 25 signs!";
    }

    return errors;
}
