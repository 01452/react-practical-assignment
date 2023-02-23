import {Accordion} from 'react-bootstrap'

export default function AccordionSection({likes, dislikes}) {
    return (
        <Accordion>
            <Accordion.Item eventKey="0" className='border rounded'>
                <Accordion.Header><span className='text-success'>Likes </span> {likes.length}</Accordion.Header>
                <Accordion.Body>
                    <p>{likes.join(', ')}</p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header><span className='text-danger'>Dislikes </span> {dislikes.length}</Accordion.Header>
                <Accordion.Body>
                    <p>{dislikes.join(', ')}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}