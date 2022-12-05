'use strict';

const SERVER_URL =  "https://wishlist-server.herokuapp.com"
const div_wishlist = document.querySelector('.wishlist-container');
const listOfEditButtons = document.querySelectorAll('.button-edit')
const listOfDeleteButtons = document.querySelectorAll('.button-rm')

const appendListenersToEditButtons = ( list ) => {
    list.forEach( buttonElement => {
        buttonElement.addEventListener("click", ( e ) => {
    
            const id = e.currentTarget.parentElement.getAttribute("id")
            const updatedDestination = prompt("Enter new name")
            const updatedLocation = prompt("Enter new location")
            const updatedDescription = prompt("Enter new description")
            const document = {
                destination: updatedDestination,
                location: updatedLocation,
                description: updatedDescription,
            }
            fetch(`${SERVER_URL}/destination/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(document)
            })
            .then( res => res )
            .then( () => location.reload() )
            .catch( err => console.log( err ) )
        })
    })
}

const appendListenersToDeleteButtons = ( list ) => {
    list.forEach( buttonElement => {
        buttonElement.addEventListener("click", (e)=> {
            e.preventDefault();
            const id = e.currentTarget.parentElement.getAttribute("id")
            fetch(`${SERVER_URL}/destination/${id}`,{
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
            })
                .then( () => window.location.reload() )
                .catch( err => console.log( err ) )
        })
    })

}

if( div_wishlist.childElementCount ) {

    appendListenersToEditButtons( listOfEditButtons )
    appendListenersToDeleteButtons( listOfDeleteButtons )
    
}
