






import React, { useState } from 'react';
import { firebase, storage } from '../../../config/firebase'; // Update the import statement for firebase configuration

import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
// import { upload } from '@testing-library/user-event/dist/upload';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';




const initialState = {
  
  fullname: '',
  email: '',
  city: '',
  country: '',
  subject: '',
  message: ''


};



export default function Students() {
  const [state, setState] = useState(initialState);
  const [isProcessing,setIsProcessing] = useState(false);
  // we set fiels here for images 

  const [file, setFile] = useState({})

  const [isFileUploading,setFileUploading] = useState(false)

  const [progress, setProgress] = useState(30)



  // we are gonna use usenavigate hook for navigate when we log in



  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let { fullname, email, city, country, subject, message } = state;

    // To avoid spacing we use trim 

    fullname = fullname.trim()
    subject = subject.trim()
    message = message.trim()


    

    if (subject.length < 3) {
      return window.toastify("Please enter your subject correctly ", "error")
    }


    if (message.length < 10) {
      return window.toastify("Please enter your message correctly ", "error")
    }


    //////

    let formData = {
      fullname, email, city, country, subject, message,
      id: window.getRandomId(),
      dateCreated: serverTimestamp()

    }


    setIsProcessing(true);




console.log(file)
    // this is we are implementing condtions on uploading a form
    if (file.name) {
      uploadFile(formData)
    }
    else {
      createDocument(formData)
    }



    createDocument(formData)


    // setIsProcessing(false);

  };

  const uploadFile = (formData) => {

    const filename = formData.id + "-" + file.name
    // we will copy code here of the update files from the 

    // const storage = getStorage();
    const storageRef = ref(storage, `images/${filename}`);
    console.log(filename)

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    setFileUploading(true)
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        console.log('Upload is ' + progress + '% done');
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }


      },
      (error) => {

        window.toastify("Something went wrong while uploading the image ", "error")
        // Handle unsuccessful uploads


        // when we face an error

        setIsProcessing(false)
      },

      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          // we need image as well in this downloadurl

          const data = { ...formData, photo: { name: file.name, url: downloadURL } }


          createDocument(data)

          // now the data will contain form data as well as filename and url  in the data  varaiable
        });
      }
    );



  }


  // this is for storage

  const createDocument = async (formData) => {


    try {
      await setDoc(doc(firebase, "messages", formData.id), formData);
      //  console.log("Document written with ID: ", docRef.id);
      window.toastify('Your message  has been successfully sent', 'success');
      setState(initialState)

      // when all files are uplaod then it will stop

    } catch (e) {
      console.error("Error adding document: ", e);
      window.toastify('Something went wrong while sending your message', 'error');
    }

    setFileUploading(false)
    setIsProcessing(false)




  }




  return (
    <div className="form py-5 ">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-4 p-md-5">
              <h2 className="text-center mb-4">Students Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">

                 

                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="fullname"
                      value={state.fullname}
                      onChange={handleChange}
                    />
                  </div>



                  <div className="col-12  col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12  col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      name="city"
                      value={state.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12  col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Country"
                      name="country"
                      value={state.country}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      name="subject"
                      value={state.subject}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="file"
                      className="form-control"

                      onChange={(e) => { setFile(e.target.files[0]) }}
                    />
                  </div>

             {isFileUploading && 
                  <div className="progress mt-2" role="progressbar"  aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar" style={{width: progress + "%"}}>{progress}%</div>
                </div>

             
             }




                </div>

            

                <div className="col-12 mb-3">
                  <textarea
                    name="message"
                    className="form-control"
                    placeholder="Message/Query"
                    value={state.message}
                    onChange={handleChange}
                  ></textarea>
                </div>



                <div className="row">

                  <div className="col-12 col-md-6 offset-md-3">
                    <button className="btn btn-primary w-100" style={{background:"#264653"}} disabled={isProcessing}>
                      {!isProcessing ? (
                        <span >Add Student</span>
                      ) : (
                        <div className="spinner spinner-grow spinner-grow-sm"></div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
