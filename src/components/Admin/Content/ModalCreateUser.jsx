import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiServices';
import { getAllUsers } from '../../../services/apiServices';
const ModalCreateUser = (props) => {
    const { show, setListUsers, setShow } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [credit, setCredit] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('USER');
    const [date, setDate] = useState('');
    // const [image, setImage] = useState(null); // Use null instead of empty string
    // const [previewImage, setPreviewImage] = useState('');
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };



    const handleSubmitCreateUser = async () => {
        // Validate email
        if (!validateEmail(email)) {
            toast.error('Invalid email');
            return;
        }

        // Submit data to server
        try {

            await postCreateNewUser(name, email, credit, phone, role, date); // Call API service to create new user

            toast.success('User created successfully');
            const abc = await getAllUsers();
            setListUsers(abc)

            handleClose();

        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Failed to create user');
        }
    };


    const handleClose = () => {
        setShow(false);
        resetForm(); // Reset form fields when modal is closed
    };


    // const handleUploadImage = (event) => {
    //     const selectedFile = event.target.files[0];
    //     if (selectedFile) {
    //         setImage(selectedFile);

    //         // Preview the selected image
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreviewImage(reader.result);
    //         };
    //         reader.readAsDataURL(selectedFile);
    //     } else {
    //         setImage(null);
    //         setPreviewImage("");
    //     }
    // };

    const resetForm = () => {
        setName('');
        setEmail('');
        setCredit('');
        setPhone('');
        setRole('USER');
        setDate('');
        // setImage(null);
        // setPreviewImage('');
    };

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add new user
            </Button> */}

            <Modal
                backdrop="static"
                show={show}
                onHide={handleClose}
                className='modal-add-user'
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Ex: nguyenvana@gmail.com"

                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Credit</label>
                            <input
                                type="text"
                                className="form-control"
                                value={credit}
                                onChange={(event) => setCredit(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="+84"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                            />
                        </div>
                        {/* <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='id-upload'>
                                <FcPlus /> Upload Image
                            </label>
                            <input
                                id='id-upload'
                                type="file"
                                className="form-control"
                                onChange={handleUploadImage}
                                hidden
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage && (
                                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />

                            )}
                            Preview Image</div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateUser;
