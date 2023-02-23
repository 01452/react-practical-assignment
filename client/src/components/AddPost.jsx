import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createPost} from '../utils/mainPostFuncs'
import {rerender} from '../utils/postSlice'
import '../css/Posts.css'

class AddPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
        }
    }

    handleAddPost = () => {
        const {dispatch, closeModal, user} = this.props
        const {title} = this.state

        dispatch(createPost({title, username: user}))
        dispatch(rerender())
        closeModal(false)
    }

    handleInputChange = (event) => {
        this.setState({
            title: event.target.value,
        })
    }

    render() {
        const {title} = this.state
        return (
            <div className='posts_add-post'>
                <input
                    className='post_input'
                    value={title}
                    onChange={this.handleInputChange}
                    type='text'
                    placeholder='Input Title'
                />
                <button className='custom-button' onClick={this.handleAddPost}>
                    Add Post
                </button>
            </div>
        )
    }
}

const mapStateToProps = ({account}) => ({
    user: account.user,
})

export default connect(mapStateToProps)(AddPost)
