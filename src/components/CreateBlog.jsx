import { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
    const [title, setTitle] = useState('New Title')
    const [link, setLink] = useState('')

    const newBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            url: link
        })
    }
    return (
        <>
        <form onSubmit={newBlog}>
            <div>
                title:         
                <input 
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>            
            <div>
                link:         
                <input 
                    type="link"
                    value={link}
                    name="link"
                    onChange={({ target }) => setLink(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
        </>
  )
}
  
  export default CreateBlog