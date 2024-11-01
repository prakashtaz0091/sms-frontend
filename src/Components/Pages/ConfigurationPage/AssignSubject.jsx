import React, { useState, useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import ClassSubjects from "./ClassSubjects";
import { AuthContext } from "../../../context/AuthContext";
import { set } from "date-fns";

const Classes = () => {
 
  const initialClasses = [
    
  ];


  const {api} = useContext(AuthContext);





  const [classes, setClasses] = useState(initialClasses); // To hold the assigned subjects for each class

  const [selectedClass, setSelectedClass] = useState("");
  const [subjectList, setSubjectList] = useState([
    // { subject: "", teacher: "" },
    // { subject: "" },
  ]);
  const [teachers, setTeachers] = useState([]);


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

    



  }, [api]);




  const handleAddMore = () => {
    setSubjectList([...subjectList, { subject: "", teacher: "" }]);
  };

  const handleAssign = () => {
    if (selectedClass && subjectList.length > 0) {
      const updatedClasses = classes.map((cls) =>
        cls.className === selectedClass
          ? { ...cls, subjects: [...cls.subjects, ...subjectList] }
          : cls
      );

      const classExists = classes.some(
        (cls) => cls.className === selectedClass
      );

      if (!classExists) {
        setClasses([
          ...classes,
          { className: selectedClass, subjects: subjectList },
        ]);
      } else {
        setClasses(updatedClasses);
      }

      // Reset state after assigning
      setSelectedClass("");
      setSubjectList([{ subject: "", teacher: "" }]);
    }
  };

  const handleRemove = (index) => {
    setSubjectList(subjectList.filter((_, i) => i !== index)); // Remove the selected subject and teacher input
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    setClasses(
      initialClasses.filter((cls) =>
        cls.className.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleRefresh = () => {
    setSearchTerm(""); // Clear the search term
    setSubjectList([{ subject: "", teacher: "" }]); // Reset the subjectList to its initial state
    
  };


  const handleClassChange = (e) => {

    setSelectedClass(e.target.value);

    const id =  classes.find((item) => item.className === e.target.value).id
        // console.log(id);


    if (localStorage.getItem(`subjectList${id}`)) {
      console.log("subjectList already exists in local storage");
      setSubjectList(JSON.parse(localStorage.getItem(`subjectList${id}`)));
    }else{
      api.get(`get_subjects/${id}/`).then((response) => {
        console.log(response.data);
        setSubjectList(response.data);
        localStorage.setItem(`subjectList${id}`, JSON.stringify(response.data));
  
      }).catch((error) => {
        console.log(error);
        
      })

    }
      
        
  }

  return (
    <div className="p-8 bg-pink-100 min-h-screen">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FcSettings className="text-gray-700 " />
          <span className="text-gray-700 font-medium">Configuration</span>
        </div>

        <div className="border-l border-gray-700 h-6"></div>

        <div>
          <span className="text-gray-700 font-medium">Subjects</span>
        </div>

        <div className="border-l border-gray-700 h-6"></div>

        <div>
          <span className="text-gray-700 font-medium">Assign Subjects</span>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="w-2/3 mt-10 flex flex-col bg-white shadow-md rounded-2xl items-center h-2/3">
          <h3 className="mb-8 text-2xl font-semibold flex mt-10">
            Assign Subjects to Class
          </h3>
          <div className="px-6">
            <select
              name="class"
              value={selectedClass}
              onChange={handleClassChange }
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
            {subjectList.map((item, index) => (
              <div className="flex justify-between gap-4 mb-4" key={index}>
                <select
                  name="subject"
                  value={item.subject}
                  onChange={(e) => {
                    const newSubjectList = [...subjectList];
                    newSubjectList[index].subject = e.target.value;
                    setSubjectList(newSubjectList);
                  }}
                  className="p-3 px-4 rounded-3xl bg-white border border-blue-500 w-full"
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  {subjectList && subjectList.map((item, index) => (
                    <option key={index} value={item.subject_name}>
                      {item.subject_name}
                    </option>
                  ))}
                </select>
                <select
                  name="teacher"
                  value={item.teacher}
                  onChange={(e) => {
                    const newSubjectList = [...subjectList];
                    newSubjectList[index].teacher = e.target.value;
                    setSubjectList(newSubjectList);
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
            ))}
          </div>
          <div className="flex justify-around gap-4">
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
          </div>

          <button
            className="mt-16 bg-pink-500 rounded-3xl text-white p-2 px-8 font-bold mb-16"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4 py-10 justify-end">
            <div className=" ">
              <div className="flex items-center bg-white rounded-full ">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none ml-3"
                />
                <IoSearch
                  className="text-gray-600 mr-4 cursor-pointer"
                  size={24}
                  onClick={handleSearch}
                />
              </div>
            </div>
            <div
              className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
              onClick={handleRefresh}
            >
              <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180" />
            </div>
          </div>
          {/* <ClassSubjects classes={classes} /> */}
        </div>
      </div>
    </div>
  );
};

export default Classes;
