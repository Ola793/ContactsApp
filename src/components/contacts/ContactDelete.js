import React from "react";

export default class ContactDelete extends React.Component {
    constructor(props) {
        super(props);
        
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick() {
        this.props.onDeleteClick(this.props.id);
    }

    render() {
        return (
            <button className="delete" onClick={this.onDeleteClick}> Delete </button>
        );
    }
}
