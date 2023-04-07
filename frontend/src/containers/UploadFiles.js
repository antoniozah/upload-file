import React, { useState } from 'react'

const UploadFiles = () => {
    const [file, setFile] = useState(null)
    const baseUrl = process.env.REACT_APP_BASE_URL

    const handleFileSelect = (event) => {
        console.log('event', event)
        setFile(event.target.files[0]);
    }

    const submitForm = (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append('image', file);
        console.log('image', file)
        console.log('formData', formData)

        fetch(`${baseUrl}/uploads`, {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            //   }
        }).then(response => {
           return response.json()
          }).then((data) => {
            if(data.status !== 200) {
                throw new Error(data.message)
            }
            alert(data.message)
          })
          .catch(error => {
            console.error(error);
            alert(error.message)
          });
    }
  return (
    <div>
      <form method="POST" onSubmit={submitForm}>
        <div>
            <p>Upload file</p>
            <input type='file' name='image' onChange={handleFileSelect}/>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default UploadFiles
