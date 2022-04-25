import React from "react";

export default class ContactUpdate extends React.Component {
    constructor(props) {
        super(props);
        
        this.onUpdateClick = this.onUpdateClick.bind(this);
    }

    onUpdateClick() {
        this.props.onUpdateClick(this.props.id);
    }

    render() {
        return (
            <button className="update" onClick={this.onUpdateClick}> Update </button>
        );
    }
}
