import React, { useState, useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { AuthContext } from "../../../context/AuthContext";

const EditPage = () => {

  const {api} = useContext(AuthContext);
  const [classes, setClasses] = useState([]); // To hold the assigned subjects for each class
  const [subjectList, setSubjectList] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [selectedClass, setSelectedClass] = useState({
    className: "",
    id : ""
  });
  const [selectedSubject, setSelectedSubject] = useState({
    subjectName: "",
    id : ""
  });
  const [selectedTeacher, setSelectedTeacher] = useState({
    teacherName: "",
    id : ""
  });


  React.useEffect(() => {


    // load classes from database
    api.get('get_classes/').then((response) => {
      // console.log(response.data);
      setClasses(response.data);
    }).catch((error) => {
      console.log(error);
    })


   
    //load teachers from database
    api.get(`get_teachers/`).then((response) => {
      console.log(response.data);
      setTeachers(response.data);

    }).catch((error) => {
      console.log(error);
      
    })


    //load subjects from database
    api.get('/subject/').then((response) => {
      // console.log(response.data);
      setSubjectList(response.data);
    }).catch((error) => {
      console.log(error);
    })
    



  }, [api]);

  const handleAssign = () => {
    if (selectedClass && selectedSubject && selectedTeacher) {
     
      console.log(selectedClass, selectedSubject, selectedTeacher);
      const formData = new FormData();
      formData.append("class_name", selectedClass.id);      
      formData.append("subject", selectedSubject.id);      
      formData.append("subject_teacher", selectedTeacher.id);      

      api.patch('/class_subject/', formData).then((response) => {
        // console.log(response.data);
        console.log("updated successfully");
      }).catch((error) => {
        console.log(error);
        // alert(error.response.data);
      })
     
    }
  };



  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4  bg-white  rounded-3xl p-2 ">
        <div className="flex items-center space-x-2">
          <FcSettings className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Configuration</span>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Subjects</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Assign Subjects</span>
        </div>
        <div className="border-l border-gray-700 h-6"></div>

        {/* "Add New" text */}
        <div>
          <span className="text-gray-700 font-medium">Edit</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  mt-8">
        <div className="w-2/3 mt-10 flex flex-col bg-white shadow-md rounded-2xl items-center h-2/3">
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">
            Update Subject And Class
          </h3>
          <div className="px-6">
            <select
              name="class"
              value={selectedClass.className}
              onChange={(e) => {
                setSelectedClass(
                  {
                    className: e.target.value,
                    id : classes.find((item) => item.className === e.target.value).id
                  }
                )
              }}
              className="p-3 px-4 mb-4 rounded-3xl bg-white border border-blue-500 w-96"
            >
              <option value="" disabled>
                Select Class
              </option>
              
              {classes && classes.map((item, index) => (
                <option key={index} value={item.className}>
                  {item.className}
                </option>
              ))}
            </select>
              <div className="flex justify-between gap-4 mb-4" >
                <select
                  name="subject"
                  value={selectedSubject.subjectName}
                  onChange={(e) => {
                    setSelectedSubject({
                      subjectName: e.target.value,
                      id : subjectList.find((item) => item.subjectName === e.target.value).id
                    });
                  
                    
                  }}
                  className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  {subjectList && subjectList.map((item, index) => (
                    <option key={index} value={item.subjectName}>
                      {item.subjectName}
                    </option>
                  ))}
                </select>
                <select
                  name="teacher"
                  value={selectedTeacher.teacherName}
                  onChange={(e) => {
                    setSelectedTeacher(
                      {
                        teacherName: e.target.value,
                        id : teachers.find((item) => item.full_name === e.target.value).id
                      }
                    );
                  
                  }}
                  className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
                >
                  <option value="" disabled>
                    Select Teacher
                  </option>
                  {teachers && teachers.map((item, index) => (
                    <option key={index} value={item.full_name}>
                      {item.full_name}
                    </option>
                  ))}
                </select>
              </div>
            {/* ))} */}
          </div>
          {/* <div className="flex justify-around gap-4">
            <button
              className="mt-10 bg-red-500 rounded-3xl text-white p-1 px-4 font-bold"
              onClick={() => handleRemove(subjectList.length - 1)} // Remove the last subject entry
            >
              Remove
            </button>
            <button
              className="mt-10 bg-blue-800 rounded-3xl text-white p-1 px-4 font-bold mb-"
              onClick={handleAddMore}
            >
              Add More
            </button>
          </div> */}

          <button
            className="mt-16 bg-pink-500 rounded-3xl text-white p-2 px-8 font-bold mb-16"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>

        
      </div>
      {/* <div className="flex flex-col items-center justify-center  mt-8">
        <div className="bg-white p-8 rounded-lg shadow-[4px_4px_4px_0px_#00000040] w-full max-w-md">
          <h2 className="text-center text-2xl font-bold mb-6">
            Update Subjects
          </h2>
          <select
              name=""
              id=""
              className="p-3 px-4 mb-4 rounded-3xl bg-white  border border-blue-500 w-96"
            >
              <option value="" disabled selected>
                Select Class
              </option>
              <option value="">Class Nursery</option>
              <option value="">Class LKG</option>
              <option value="">Class UKG</option>
              <option value="">Class 01</option>
              <option value="">Class 02</option>
              <option value="">Class 03</option>
              <option value="">Class 04</option>
              <option value="">Class 05</option>
              <option value="">Class 06</option>
              <option value="">Class 07</option>
              <option value="">Class 08</option>
              <option value="">Class 09</option>
              <option value="">Class 10</option>
            </select>
          {subjects.map((subject, index) => (
            <div key={index} className="flex justify-between mb-4">
              <select
                className="w-1/2 border-2 border-purple-300 rounded-full py-2 px-4 mr-2 focus:outline-none focus:border-purple-500 bg-white"
                value={subject.subject}
                onChange={(e) => {
                  const newSubjects = [...subjects];
                  newSubjects[index].subject = e.target.value;
                  setSubjects(newSubjects);
                }}
              >
                <option>Select Subject</option>
                <option>Math</option>
                <option>Science</option>
                <option>English</option>
              </select>
              <select
                className="w-1/2 border-2 border-purple-300 rounded-full py-2 px-4 ml-2 focus:outline-none focus:border-purple-500 bg-white"
                value={subject.teacher}
                onChange={(e) => {
                  const newSubjects = [...subjects];
                  newSubjects[index].teacher = e.target.value;
                  setSubjects(newSubjects);
                }}
              >
                <option>Select Teacher</option>
                <option>Teacher A</option>
                <option>Teacher B</option>
                <option>Teacher C</option>
              </select>
            </div>
          ))}

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleAddMore}
              className="bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Add More
            </button>
            <button
              onClick={() => handleRemove(subjects.length - 1)}
              className="bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Remove
            </button>
          </div> 

          <div className="flex justify-center">
            <button className="bg-pink-500 text-white py-2 px-8 rounded-full mt-12  focus:outline-none focus:ring-2 focus:ring-pink-600">
              Update
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EditPage;
