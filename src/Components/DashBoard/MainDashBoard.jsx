import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Dashboard from "./DashBoard";
import Navbar from "./Navbar";

// import Students from '../Pages/StudentPage/Students'
import AdmissionForm from "../Pages/StudentPage/AdmissionForm";
import AllStudents from "../Pages/StudentPage/AllStudents";
import PromoteStudent from "../Pages/StudentPage/PromoteStudent";
// import IdCard from '../Pages/StudentPage/IdCard';

// import Employees from '../Pages/EmployeePage/Employees';
import AddEmployee from "../Pages/EmployeePage/AddEmployee";
import AllEmployee from "../Pages/EmployeePage/AllEmployee";
// import EmpID from '../Pages/EmployeePage/EmpID';

// import Accounts from '../Pages/AccountPage/Accounts';
import ChartAccount from "../Pages/AccountPage/ChartAccount";
import AddIncome from "../Pages/AccountPage/AddIncome";
import Statement from "../Pages/AccountPage/Statement";
import AddExpenses from "../Pages/AccountPage/AddExpenses";

// import Attendance from '../Pages/AttendencePage/Attendance';
import MarkStudent from "../Pages/AttendencePage/MarkStudent";
import MarkEmployee from "../Pages/AttendencePage/MarkEmployee";
import StudentReport from "../Pages/AttendencePage/StudentReport";
import EmployeeReport from "../Pages/AttendencePage/EmployeeReport";

// import Exam from '../Pages/ExamPage/Exam';
import CreateExam from "../Pages/ExamPage/CreateExam";
import EditDeleteExam from "../Pages/ExamPage/EditDeleteExam";
import Edit from "../Pages/ExamPage/OnclickPages/Edit";
import UpdateMarks from "../Pages/ExamPage/UpdateMarks";
import Search from "../Pages/ExamPage/OnclickPages/Search";
import Result from "../Pages/ExamPage/Result";
import StudentResult from "../Pages/ExamPage/ResultPages/StudentResult";
import StdResSearch from "../Pages/ExamPage/OnclickPages/StdResSearch";
import ClassResult from "../Pages/ExamPage/ResultPages/ClassResult";
import ClsResSearch from "../Pages/ExamPage/OnclickPages/ClsResSearch";
import IndividualRes from "../Pages/ExamPage/OnclickPages/IndividualRes";

// import Fees from '../Pages/FeePage/Fees';
import FeeReceipt from "../Pages/FeePage/FeeReceipt";
import FeeReport from "../Pages/FeePage/FeeReport";
import FeeDefaulter from "../Pages/FeePage/FeeDefaulter";

// import Configuration from '../Pages/ConfigurationPage/Configuration';
import Classes from "../Pages/ConfigurationPage/Classes";
import CreateSubject from "../Pages/ConfigurationPage/CreateSubject";
import AssignSubject from "../Pages/ConfigurationPage/AssignSubject";

import Profile from "./Profile/Profile";
import AccountSetting from "./Profile/AccountSetting";
import AddWholeClsData from "../Pages/ExamPage/OnclickPages/AddWholeClsData";
import AddSingleStdData from "../Pages/ExamPage/OnclickPages/AddSingleStdData";
import EditPage from "../Pages/ConfigurationPage/EditPage";
// import Dougnut from '../DashBoard/Dougnut';
// import AdminDetails from '../Pages/SignUp&SignIn/AdminDetails';
import SignIn from "../Pages/SignUp&SignIn/SignIn";

import { AuthContext } from "../../context/AuthContext";

function MainDashBoard() {

  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/"); //navigate to login page
    }
  }, [auth, navigate]);

  return auth.isAuthenticated ? (
      <div className="flex ">
      <div className="sticky top-0 h-screen z-10">
        <Sidebar className="h-full overflow-hidden" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10">
          <Navbar />{" "}
        </div>
        <div className="flex-1  bg-gray-100">
          <Routes>
            {/* <Route path='/signup' element={<SignUpDetails/>} />
                <Route path='/adminDetails' element={<AdminDetails/>} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}

            <Route path="/profile" element={<Profile />} />
            <Route path="/accountSetting" element={<AccountSetting />} />

            {/* <Route path="/students" element={<Students />} /> */}
            <Route path="/students/admissionForm" element={<AdmissionForm />} />
            <Route path="/students/allStudents" element={<AllStudents />} />
            <Route
              path="/students/promoteStudents"
              element={<PromoteStudent />}
            />
            {/* <Route path="/students/idCard" element={<IdCard />} />  */}

            {/* <Route path="/employees" element={<Employees />} /> */}
            <Route path="/employees/employeeForm" element={<AddEmployee />} />
            <Route path="/employees/allEmployees" element={<AllEmployee />} />
            {/* <Route path="/employees/eId" element={<EmpID />} /> */}

            {/* <Route path="/accounts" element={<Accounts />} /> */}
            <Route path="/accounts/chart" element={<ChartAccount />} />
            <Route path="/accounts/addIncome" element={<AddIncome />} />
            <Route path="/accounts/addExpenses" element={<AddExpenses />} />
            <Route path="/accounts/statements" element={<Statement />} />

            {/* <Route path="/fees" element={<Fees/>} /> */}
            <Route path="/fees/feeReceipt" element={<FeeReceipt />} />
            <Route path="/fees/feeReport" element={<FeeReport />} />
            <Route path="/fees/feeDefaulter" element={<FeeDefaulter />} />

            {/* <Route path="/attendance" element={<Attendance />} /> */}
            <Route path="/attendance/markStudent" element={<MarkStudent />} />
            <Route
              path="/attendance/studentReport"
              element={<StudentReport />}
            />
            <Route path="/attendance/markEmployee" element={<MarkEmployee />} />
            <Route
              path="/attendance/EmployeeReport"
              element={<EmployeeReport />}
            />

            {/* <Route path="/exam" element={<Exam />} /> */}
            <Route path="/exam/createExam" element={<CreateExam />} />
            <Route path="/exam/updateExam" element={<EditDeleteExam />} />
            <Route path="/exam/updateExam/edit" element={<Edit />} />
            <Route path="/exam/updateExamMarks" element={<UpdateMarks />} />
            <Route path="/exam/search" element={<Search />} />
            <Route
              path="/exam/search/addWholeClsData"
              element={<AddWholeClsData />}
            />
            <Route
              path="/exam/search/addSingleStdData"
              element={<AddSingleStdData />}
            />
            <Route path="/exam/result" element={<Result />} />
            <Route path="/exam/studentReport" element={<StudentResult />} />
            <Route path="/exam/studentResult" element={<StdResSearch />} />
            <Route path="/exam/classResult" element={<ClsResSearch />} />
            <Route
              path="/exam/classReport/search/individualRes"
              element={<IndividualRes />}
            />
            <Route path="/exam/classReport" element={<ClassResult />} />

            {/* <Route path="/config" element={<Configuration />} /> */}
            <Route path="/config/classes" element={<Classes />} />
            <Route path="/config/createSub" element={<CreateSubject />} />
            <Route path="/config/assignSub" element={<AssignSubject />} />
            <Route path="/config/assignSubject/edit" element={<EditPage />} />
          </Routes>
        </div>
      </div>
    </div>
    ) : (
      <SignIn />
    )
  
  
  
}

export default MainDashBoard;
