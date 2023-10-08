






import React, { useState } from 'react';
import { firebase, storage } from '../../../config/firebase'; // Update the import statement for firebase configuration


// antd 




import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
// import { upload } from '@testing-library/user-event/dist/upload';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';










const initialState = {
  
  studentId: '',
  courseId: '',
  date: '',
  status: '',
  
 


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


    let { studentId, courseId, date, status} = state;

    // To avoid spacing we use trim 

    courseId = courseId.trim()
    
  


    

    // if (subject.length < 3) {
    //   return window.toastify("Please enter your subject correctly ", "error")
    // }


    // if (message.length < 10) {
    //   return window.toastify("Please enter your message correctly ", "error")
    // }


    //////

    let formData = {
      studentId, courseId, date, status,
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


    setFileUploading(true)
    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        console.log('Upload is ' + progress + '% done');
        


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
      await setDoc(doc(firebase, "attendance", formData.id), formData);
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
              <h2 className="text-center mb-4">Students Attendance</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">

                 

                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Student ID"
                      name="studentId"
                      value={state.studentId}
                      onChange={handleChange}
                    />
                  </div>



                  <div className="col-12  col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Course ID"
                      name="courseId"
                      value={state.courseId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12  col-md-6 mb-3">
                    <input
                      type="date"
                      className="form-control"
                     
                      name="date"
                      value={state.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12  col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Status"
                      name="status"
                      value={state.status}
                      onChange={handleChange}
                    />
                  </div>

                 
            



                </div>

            



                <div className="row">

                  <div className="col-12 col-md-6 offset-md-3">
                    <button className="btn btn-primary w-100" style={{background:"#264653"}} disabled={isProcessing}>
                      {!isProcessing ? (
                        <span >Add Attendance</span>
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
