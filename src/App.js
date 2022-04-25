import React from "react";
import "./App.css";
import ContactList from "./components/contacts/ContactList";
import ContactForm from "./components/contacts/ContactForm";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nameOfPage: "contacts",
            contact: null, 
        };

        this.changePage = this.changePage.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.onUpdateContact = this.onUpdateContact.bind(this);
    }

    changePage(newNameOfPage) {
        this.setState({ nameOfPage: newNameOfPage });
    }

    async saveContact(contact) {
        
        await fetch(`${ContactList.API}`, {
            method: "POST",
            body: JSON.stringify(contact),
        });
        this.changePage("contacts");
        this.setState({
            contact: null,
        });
    }

    onUpdateContact(contact) {
        this.setState({
            contact: contact,
        });
    }

    render() {
        let pageName = this.state.nameOfPage;
        if (pageName === "contacts") {
            return (
                <div className="App">
                    <ContactList
                        onCreateContact={this.changePage}
                        onUpdateClick={this.changePage}
                        onUpdateContact={this.onUpdateContact}
                    />
                </div>
            );
        }
        
        if (pageName === "add contact") {
            return (
                <div className="App">
                    <ContactForm
                        onCancelClick={this.changePage}
                        onSaveClick={this.saveContact}
                        contact={this.state.contact}
                    />
                </div>
            );
        }
    }
}

export default App;
