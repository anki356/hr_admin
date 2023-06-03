import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import AddEmployee from './Pages/AddEmployee/AddEmployee';
import Advance from './Pages/Advance/Advance';
import AdvanceApprovals from './Pages/Advance/AdvanceApprovals/AdvanceApprovals';
import AttendenceApproval from './Pages/AttendenceApprovals/AttendenceApproval/AttendenceApproval';
import AttendenceApprovals from './Pages/AttendenceApprovals/AttendenceApprovals';
import AttendenceHistory from './Pages/AttendenceApprovals/AttendenceHistory/AttendenceHistory';
import AttendenceCorrection from './Pages/AttendenceCorrection/AttendenceCorrection';
import CorrectionDetails from './Pages/AttendenceCorrection/CorrectionDetails/CorrectionDetails';
import Bonus from './Pages/Bonus/Bonus';
import BonusApprovals from './Pages/Bonus/BonusApprovals/BonusApprovals';
import EmployeeProfile from './Pages/EmployeeProfile/EmployeeProfile';
import EmployeeTransfer from './Pages/EmployeeTransfer/EmployeeTransfer';
import AddExpense from './Pages/ExpenseApprovals/AddExpense/AddExpense';
import ExpenseApprovals from './Pages/ExpenseApprovals/ExpenseApprovals';
import ExpenseDetails from './Pages/ExpenseApprovals/ExpenseDetails/ExpenseDetails';
import EmployeeDetails from './Pages/ExployeeDetails/EmployeeDetails';
import FineDetails from './Pages/ExtraPages/FineDetails/FineDetails';
import TotalCommission from './Pages/ExtraPages/TotalCommission/TotalCommission';
import FineApprovals from './Pages/FineManagement/FineApprovals/FineApprovals';
import FineManagement from './Pages/FineManagement/FineManagement';
import AddInterview from './Pages/Interviews/AddInterview/AddInterview';
import Interviews from './Pages/Interviews/Interviews';
import LeaveApprovals from './Pages/LeaveManagement/LeaveApprovals/LeaveApprovals';
import LeaveManagement from './Pages/LeaveManagement/LeaveManagement';
import LoanApprovals from './Pages/LoanEmi/LoanApprovals/LoanApprovals';
import LoanEmi from './Pages/LoanEmi/LoanEmi';
import Report from './Pages/Report/Report';
import AddRoles from './Pages/Roles/AddRoles/AddRoles';
import EditRoles from './Pages/Roles/EditRole/EditRoles';
import DeleteRoles from './Pages/Roles/EditRole/EditRoles';
import Roles from './Pages/Roles/Roles';
import OverallSalaryDetails from './Pages/SalaryDetails/OverallSalaryDetails/OverallSalaryDetails';
import SalaryCertificate from './Pages/SalaryDetails/SalaryCertificate/SalaryCertificate';
import SalaryDetails from './Pages/SalaryDetails/SalaryDetails';
import SalarySlip from './Pages/SalaryDetails/SalarySlip/SalarySlip';
import SalarySummary from './Pages/SalarySummary/SalarySummary';
import SalarySummaryDetails from './Pages/SalarySummary/SalarySummaryDetails/SalarySummaryDetails';
import TimingApprovals from './Pages/TimingApprovals/TimingApprovals';
import TimingApprove from './Pages/TimingApprovals/TimingApprove/TimingApprove';
import Layout from './UI/Layout/Layout';
import ExpenseApproval from './Pages/ExpenseApprovals/ExpenseApproval/ExpenseApproval';
import Correction from './Pages/AttendenceCorrection/Correction/Correction';
import HierarchyPage from './Pages/HierarchyPage/HierarchyPage';
import Grade from './Pages/Grade/Grade';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AllAttendence from "./Pages/AllAttendence/AllAttendence";
import AddLoan from './Pages/LoanEmi/AddLoan/AddLoan';
import AddFine from './Pages/FineManagement/AddFine/AddFine'
// We have to diffrentiate between Login page and other Pages, so we are using useLocation
import AddAdvance from './Pages/Advance/AddAdvance/AddAdvance'
import AddLeave from './Pages/LeaveManagement/AddLeave/AddLeave';
import Emp_Transfer from './Pages/EmployeeTransfer/Emp_Transfer/Emp_Transfer';
import AddTransfer from './Pages/EmployeeTransfer/AddTransfer/AddTransfer';
import View_Grade from './Pages/Grade/View_Grade/View_Grade';
import AddBonus from './Pages/Bonus/AddBonus/AddBonus';
import Add_Grade from './Pages/Grade/Add_Grade/Add_Grade';
import Document from "./Pages/SalarySummary/SalarySummaryDetails/document"
const App = () => {

  const urlPath = useLocation()
  const logPath = urlPath.pathname.includes('/admin_login');
  
  return (

    <React.Fragment>
      {logPath === true ?
        <Routes>
          <Route exact path='/admin_login' element={<AdminLogin />} />
        </Routes >
        :
        <Layout>
          <main className='main_container'>
            <Routes>

              <Route exact path="/" element={<AttendenceApprovals />} />
              <Route exact path='/all_attendence' element={<AllAttendence/>}  />
              <Route exact path='/attendence_history/:id' element={<AttendenceHistory />} />
              <Route exact path='/attendence_approval/:attendance_id/:employee_id' element={<AttendenceApproval />} />
              <Route exact path='/add_leave' element={<AddLeave />} />
              <Route exact path='/add_fine' element={<AddFine />} />

              <Route exact path="/attendence_corrections" element={<AttendenceCorrection />} />
              <Route exact path="/attendence_corrections_details" element={<CorrectionDetails />} />
              <Route exact path="/attendence_corrections_check" element={<Correction />} />
              <Route exact path="/advance" element={<Advance />} />
              <Route exact path="/advance_approvals/:id/:employee_id" element={<AdvanceApprovals />} />
              <Route exact path="/add_advance" element={<AddAdvance />} />

              <Route exact path="/expense_approvals" element={<ExpenseApprovals />} />
              <Route exact path="/expense_approval/:id/:employee_id" element={<ExpenseApproval />} />
              <Route exact path="/expense_details/:id/:employee_id" element={<ExpenseDetails />} />
              <Route exact path="/add_expense" element={<AddExpense />} />


              <Route exact path="/employee_details" element={<EmployeeDetails />} />
              <Route exact path="/add_employee" element={<AddEmployee />} />
              <Route exact path="/employee_profile/:id" element={<EmployeeProfile />} />


              <Route exact path="/fine_management" element={<FineManagement />} />
              <Route exact path="/fine_approvals/:id/:employee_id" element={<FineApprovals />} />

              <Route exact path="/leave_management" element={<LeaveManagement />} />
              <Route exact path="/leave_approvals/:id/:employee_id" element={<LeaveApprovals />} />

              <Route exact path="/loan_emi" element={<LoanEmi />} />
              <Route exact path="/add_loan" element={<AddLoan />} />
              <Route exact path="/loan_approvals/:id/:employee_id" element={<LoanApprovals />} />

              <Route exact path="/salary_details" element={<SalaryDetails />} />
              <Route exact path="/salary_slip" element={<SalarySlip />} />
              <Route exact path="/salary_certificate" element={<SalaryCertificate />} />
              <Route exact path="/overall_salary_details/:id" element={<OverallSalaryDetails />} />

              <Route exact path="/employee_transfer" element={<EmployeeTransfer />} />
              <Route exact path="/emp_transfer/:id/:employee_id" element={<Emp_Transfer />} />

              <Route exact path="/interviews" element={<Interviews />} />
              <Route exact path="/add_interview" element={<AddInterview />} />
              <Route exact path="/add_transfer" element={<AddTransfer />} />


              <Route exact path="/timing_approvals" element={<TimingApprovals />} />
              <Route exact path="/timing_approve/:attendance_id/:employee_id" element={<TimingApprove />} />

              <Route exact path="/roles" element={<Roles />} />
              <Route exact path="/add_roles" element={<AddRoles />} />
              <Route exact path="/edit_roles/:id" element={<EditRoles />} />


              <Route exact path="/salary_summary" element={<SalarySummary />} />
              <Route exact path="/salary_summary_details/:id" element={<SalarySummaryDetails />} />


              <Route exact path="/report" element={<Report />} />

              <Route exact path="/bonus" element={<Bonus />} />
              <Route exact path="/bonus_approvals" element={<BonusApprovals />} />
              <Route exact path="/add_bonus" element={<AddBonus />} />

              <Route exact path='/hierarchy' element={<HierarchyPage />} />

              <Route exact path='/grade' element={<Grade />} />
              <Route exact path='/view_grade/:id' element={<View_Grade />} />
              <Route exact path='/add_grade' element={<Add_Grade />} />
              <Route exact path='/download/:id' element={<Document />} />

              {/* Extra Pages */}
              <Route exact path="/fine_details" element={<FineDetails />} />
              <Route exact path="/total_commission" element={<TotalCommission />} />
            </Routes>
          </main>
        </Layout>
      }
    </React.Fragment>
  )
}

export default App