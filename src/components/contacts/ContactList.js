import React from "react";
import ContactItem from "./ContactItem";
import ContactDelete from "./ContactDelete";
import ContactUpdate from "./ContactUpdate";
import "../../App.css";

export default class ContactList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            contacts: [],
        };
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onCreateContact = this.onCreateContact.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
    }

    static API = "https://620e3315585fbc3359d9e5af.mockapi.io/contacts";

    getContacts() {
        return fetch(`${ContactList.API}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .catch((e) => {
                alert("Check your internet connection and try again");
            });
    }

    componentDidMount() {
        this.getContacts().then((response) => {
            this.setState({
                contacts: response,
                loading: false,
            });
        });
    }

    deleteContacts(id) {
        return fetch(`${ContactList.API}/${id}`, {
            method: "DELETE",
        }).then((resp) => resp.json());
    }

    onDeleteClick(id) {
        this.deleteContacts(id);
        const newArrayofContacts = this.state.contacts.filter(
            (element) => element.id !== id
        );
        this.setState({
            contacts: newArrayofContacts,
        });
    }

    onCreateContact() {
        this.props.onCreateContact("add contact");
    }

    updateContacts(id, contact) {
        return fetch(`${ContactList.API}/${id}`, {
            method: "PUT",
            body: JSON.stringify(contact),
        }).then((response) => response.json());
    }

    onUpdateClick(id) {
        const contact = this.state.contacts.find(
            (contact) => contact.id === id
        );
        this.props.onUpdateContact(contact);
        this.props.onUpdateClick("add contact");
    }

    renderLoading() {
        return <h1>Loading...</h1>;
    }

    renderPostItems() {
        return this.state.contacts.map((contact) => {
            return (
                <div className="contact-item" key={contact.id}>
                    <ContactItem
                        name={contact.name}
                        lastName={contact.lastName}
                        phone={contact.phone}
                    />
                    <div className="update-delete">
                        <ContactUpdate
                            id={contact.id}
                            onUpdateClick={this.onUpdateClick}
                        />
                        <ContactDelete
                            id={contact.id}
                            onDeleteClick={this.onDeleteClick}
                        />
                    </div>
                </div>
            );
        });
    }

    render() {
        if (this.state.loading) {
            return this.renderLoading();
        } else {
            return (
                <div className="contact-list">
                    <div className="tabhead">
                        <div className="firstName">First Name</div>
                        <div className="lastName">Last Name</div>
                        <div className="tel">Phone number</div>
                    </div>
                    {this.renderPostItems()}
                    <div className="add-button">
                        <button className="add-contact" onClick={this.onCreateContact}> Add new contact </button>
                    </div>
                </div>
            );
        }
    }
}
