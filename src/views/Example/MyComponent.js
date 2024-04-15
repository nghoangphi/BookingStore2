// import React from 'react';

// class MyComponent extends React.Component {
//     state = {
//         firstName: '',
//         lastName: ''
//     }
//     handleChangeFirstName = (event) => {
//         this.setState({
//             firstName: event.target.value
//         }



//         );
//     }
//     handleChangeLastName = (event) => {
//         this.setState({ lastName: event.target.value })
//     };
//     handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('>>>> check data input:', this.state)


//     }
//     render() {
//         console.log('>>>>call render: ', this.state)
//         return (
//             <>
//                 <form action="/action_page.php">
//                     <label htmlFor="fname">First name:</label><br />
//                     <input
//                         onChange={(event) => this.handleChangeFirstName(event)}
//                         type="text"
//                         value={this.state.firstName} /><br />
//                     <label htmlFor="lname">Last name:</label><br />
//                     <input
//                         onChange={(event) => this.handleChangeLastName(event)}
//                         type="text"
//                         value={this.state.lastName} /><br /><br />
//                     <input
//                         onClick={(event) => this.handleSubmit(event)}
//                         type="submit" />
//                 </form>
//             </>
//         );
//     }
// }

// export default MyComponent;
