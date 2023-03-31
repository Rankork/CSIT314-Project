import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Students = () => {
    const [students, setStudents] = useState([]);

useEffect(() => { 
   const fetchAllStudents = async () => {
      try{
        const res = await axios.get("http://localhost:8800/students");
        setStudents(res.data);
      }
      catch(err)
      {
        console.log(err);
      }
   };
   fetchAllStudents();
}, []);

console.log(students);

return (
    <div>
      <h1>Nosam University Students</h1>
      <div className="students" key={students.ID}>
        {students.map((students) => (
          <div key={students.ID} className="students">
            <h3>{students.Name}</h3>
            <p>Age {students.Age}</p>
            <p>{students.Programme}</p>
            <p>WAM {students.WAM}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;