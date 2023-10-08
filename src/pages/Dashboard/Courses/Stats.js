




import { collection, deleteDoc, doc, getDocs,  updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { firebase } from '../../../config/firebase';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function Stats() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const readDocuments = async () => {
    setIsLoading(true);

    const querySnapshot = await getDocs(collection(firebase, 'messages'));

    let array = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data);
    });
    setDocuments(array);
    setIsLoading(false);
  };

  useEffect(() => {
    readDocuments();
  }, []);

  const handleUpdate = async (message) => {
    try {
      await updateDoc(doc(firebase, 'messages', message.id), { fullname: 'ali' });
      window.toastify('Your message has been successfully updated', 'success');
    } catch (e) {
      console.error('Error adding document: ', e);
      window.toastify('Something went wrong while updating your message', 'error');
    }
  };






  const handleDelete = async (message) => {
    try {
      await deleteDoc(doc(firebase, 'messages', message.id));
      window.toastify('Your message has been successfully deleted', 'success');
    } catch (e) {
      console.error('Error adding document: ', e);
      window.toastify('Something went wrong while deleting your message', 'error');
    }
  };



  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];





  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Statistics </h1>
          </div>
          <div className="row mt-5">
            <div className="col">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Country</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <th>{doc.id}</th>
                        <th>
                          {doc.photo ? (
                            <img src={doc.photo?.url} alt={doc.fullname} className="img-fluid rounded-circle" style={{ maxHeight: 40 }} />
                          ) : (
                            ''
                          )}
                        </th>
                        <td>{doc.fullname}</td>
                        <td>{doc.email}</td>
                        <td>{doc.city}</td>
                        <td>{doc.country}</td>
                        <td>{doc.subject}</td>
                        <td>{doc.message}</td>
                        <td>
                          {/* <button className="btn btn-sm btn-info" onClick={() => handleUpdate(doc)}>
                            Edit
                          </button> */}

<button className="btn btn-sm btn-info" onClick={() => handleUpdate(doc)}>
                            Update
                          </button>
                          <button className="btn btn-sm btn-danger mt-2 " onClick={() => handleDelete(doc)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>




{/*   this us for graph */}




<div className='App'>
      <h1>Social Media Users</h1>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>











    </>
  );
}
