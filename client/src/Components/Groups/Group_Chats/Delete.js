import React from "react";

function Delete({ id, onDelete }) {
    function handleClick() {
        const confirmDeletion = window.confirm('Are you sure you want to delete this chat?');
        if (confirmDeletion) {
            fetch(`/api/group-chat/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    console.log('Chat deleted successfully');
                    onDelete(id)
                } else {
                    console.error('Failed to delete chat:', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }

    return (
        <button onClick={handleClick}>remove</button>
    );
}

export default Delete;