import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import AddPost from "./AddPost";
import AddComment from "./AddComment";
import AllComments from "./AllComments";
import EditPost from "./EditPost";
import {useCallback} from "react";
import {ADD_COMMENT, ADD_POST, ALL_COMMENTS, EDIT} from "../utils/constants";


export default function Model({type: typeToRender, disabled, postId}) {
    const [show, setShow] = useState(false);
    const [type, setType] = useState('')

    const typeMap = {
        [ADD_POST]: ADD_POST,
        [ADD_COMMENT]: ADD_COMMENT,
        [EDIT]: EDIT,
        [ALL_COMMENTS]: ALL_COMMENTS,
    };
    useEffect(() => {
        setType(typeMap[typeToRender]);
    }, [typeToRender, typeMap]);


    const handleClose = useCallback(() => setShow(false), [])
    const handleShow = useCallback(() => setShow(true), [])

    return (
        <>
            <button
                className={disabled ? "disabled-button" : "custom-button"}
                onClick={() => setShow(true)}
                disabled={disabled}
            >
                {type}
            </button>
            <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
                <Modal.Body>
                    <div>
                        {type === ADD_POST && <AddPost closeModal={setShow}/>}
                        {type === ADD_COMMENT && (
                            <AddComment postId={postId} closeModal={setShow}/>
                        )}
                        {type === EDIT && (
                            <EditPost postId={postId} closeModal={setShow}/>
                        )}
                        {type === ALL_COMMENTS && <AllComments postId={postId}/>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}