

import React, { useState } from 'react';
import { firebase, storage } from '../../../config/firebase'; 

import { doc, serverTimestamp, setDoc } from 'firebase/firestore';


import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';




const initialState = {

  courseCode: '',
  course: '',
  duration: '',
  description: ''


};



export default function Courses() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);


  const [file, setFile] = useState({})

  const [isFileUploading, setFileUploading] = useState(false)

  const [progress, setProgress] = useState(30)







  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let { courseCode, course, duration, description} = state;



    courseCode = courseCode.trim()
    course = course.trim()
    description = description.trim()

console.log("working")


    if (course.length < 3) {
      return window.toastify("Please enter your subject correctly ", "error")
    }

    console.log("second working")


    if (description.length < 10) {
      console.log("fourth working")
      return window.toastify("Please enter your message correctly ", "error")
    }

    console.log("thired working")


    //////

    let formData = {
      courseCode, course, duration, description,
      id: window.getRandomId(),
      dateCreated: serverTimestamp()

    }


    setIsProcessing(true);




    console.log(file)
    if (file.name) {
      uploadFile(formData)
    }
    else {
      createDocument(formData)
    }



    createDocument(formData)



  };

  const uploadFile = (formData) => {

    const filename = formData.id + "-" + file.name
   
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
      


        setIsProcessing(false)
      },

      () => {
      

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);


          const data = { ...formData, photo: { name: file.name, url: downloadURL } }


          createDocument(data)


        });
      }
    );



  }



  const createDocument = async (formData) => {
    console.log("working")

    try {
      console.log("try")
      await setDoc(doc(firebase, "courses", formData.id), formData);

      window.toastify('Your message  has been successfully sent', 'success');
      setState(initialState)


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
              <h2 className="text-center mb-4">Available Courses</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">



                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Course Code"
                      name="courseCode"
                      value={state.courseCode}
                      onChange={handleChange}
                    />
                  </div>



                  <div className="col-12  col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Courses"
                      name="course"
                      value={state.course}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12  col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Duration"
                      name="duration"
                      value={state.duration}
                      onChange={handleChange}
                    />
                  </div>

                 

                  {isFileUploading &&
                    <div className="progress mt-2" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                      <div className="progress-bar" style={{ width: progress + "%" }}>{progress}%</div>
                    </div>


                  }




                </div>



                <div className="col-12 mb-3">
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="description"
                    value={state.message}
                    onChange={handleChange}
                  ></textarea>
                </div>



                <div className="row">

                  <div className="col-12 col-md-6 offset-md-3">
                    <button className="btn btn-primary w-100"  style={{background:"#264653"}}  disabled={isProcessing}>
                      {!isProcessing ? (
                        <span>Add Course</span>
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
