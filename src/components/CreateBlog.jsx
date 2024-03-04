const CreateBlog = ({ createBlog, title, setTitle, link, setLink }) => {

    return (
        <>
        <form onSubmit={createBlog}>
            <div>
                title:         
                <input 
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => 
                    {
                        setTitle(target.value)
                        console.log(target.value)
                    }}
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