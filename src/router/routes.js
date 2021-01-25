import SignIn from '@/views/auth/SignIn'
import SignUp from '@/views/auth/SignUp'
import ForgotPassword from '@/views/auth/ForgotPassword'
import ResetPassword from '@/views/auth/ResetPassword'
import ComfirmEmail from '@/views/auth/ComfirmEmail'
import Staffs from '@/views/staff/Staffs'
import Staff from '@/views/staff/Staff'
// ---------------- TEACHER -------------------------------
import Teachers from '@/views/teacher/Teachers'
import TeacherDashboard from '@/views/teacher/Dashboard'
import TeacherAttendance from '@/views/teacher/Attendances'
import TeacherClasses from '@/views/teacher/Classes'
import Teacher from '@/views/teacher/Teacher'
// ---------------- CLASSES -------------------------------

import ClassDetail from '@/views/class/ClassDetail'
import ClassMark from '@/views/class/ClassMark'
import ClassSlots from '@/views/class/ClassSlots'

import Generations from '@/views/generation/Generations'
// ---------------- STUDENT -------------------------------
import Students from '@/views/student/Students'
import Attendances from '@/views/student/Attendences.vue'
import Attendance from '@/views/student/Attendance'
import Reservation from '@/views/student/Reservation.vue'
import StudentDashboard from '@/views/student/Dashboard'
import Student from '@/views/student/Student'
import StudentClasses from '@/views/student/Classes'
import StudentImporter from '@/views/student/StudentImporter.vue'
import Violation from '@/views/violation/Violations.vue'
import ContactBook from '@/views/account/ContactBook.vue'
import ContactBookDetail from '@/views/account/ContactBookDetail.vue'

// ---------------- DEPARTMENT -------------------------------
import Department from '@/views/department/Department'
// ---------------- Score -------------------------------
import InputScore from '@/views/score/InputScore.vue'
import ViewScore from '@/views/score/ViewScore.vue'

import DashBoard from '@/views/dashboard/Dashboard.vue'
// ---------------- LEARNING -----------------------------
import Schedule from '@/views/schedule/Schedule.vue'

// ---------------- LAYOUT -------------------------------
import GuestLayout from '../components/layout/GuestLayout'
import MainLayout from '../components/layout/MainLayout'
import Page404 from '@/views/Page404'
// -----------------------Advanced Setting---------------------------------
import Divisions from '@/views/division/Divisions.vue'
import Semesters from '@/views/semester/Semesters.vue'
import Grades from '@/views/grade/Grades.vue'
import Subjects from '@/views/subject/Subjects.vue'
import Subject from '@/views/subject/Subject.vue'
import Classes from '@/views/class/Classes'
import TimeTableConfig from '@/views/timetable/TimeTableConfig.vue'

const routes = [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
        path: 'signin',
        name: 'signIn',
        component: SignIn,
        meta: {
          title: 'Sign In',
          auth: false
        }
      },
      {
        path: 'signup',
        name: 'signUp',
        component: SignUp,
        meta: {
          title: 'Sign Up',
          auth: false
        }
      },
      {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgotPassword,
        meta: {
          title: 'Quên mật khẩu',
          auth: false
        }
      },
      {
        path: '/confirm-email',
        name: 'confirmEmail',
        component: ComfirmEmail,
        meta: {
          title: 'Xác nhận email',
          auth: false
        }
      },
      {
        path: '/reset-password',
        name: 'resetPassword',
        component: ResetPassword,
        meta: {
          title: 'Tạo lại mật khẩu',
          auth: false
        }
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    meta: {
      title: 'Trang chủ'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashBoard,
        meta: {
          title: 'Dashboard',
          auth: true
        }
      },
      {
        path: 'attendances',
        name: 'attendances',
        component: Attendances,
        meta: {
          title: 'Attendances',
          auth: true
        }
      },
      {
        path: 'attendance/:id',
        name: 'attendance',
        component: Attendance,
        meta: {
          title: 'Attendance',
          auth: true
        }
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: Schedule,
        meta: {
          title: 'Thời Khóa Biểu',
          auth: true
        }
      },
      {
        path: 'generations',
        component: Generations,
        name: 'Generations',
        meta: {
          title: 'Niên khóa',
          auth: true
        }
      },
      {
        path: 'divisions',
        component: Divisions,
        name: 'Division',
        meta: {
          title: 'Quản lý phân ban',
          auth: true
        }
      },
      {
        path: 'classes',
        component: Classes,
        name: 'Lớp Học',
        meta: {
          title: 'Quản lý lớp',
          auth: true
        }
      },
      {
        path: 'grades',
        component: Grades,
        name: 'Grade',
        meta: {
          title: 'Quản lý khối',
          auth: true
        }
      },
      {
        path: 'subjects',
        component: Subjects,
        name: 'Subjects',
        meta: {
          title: 'Quản Môn Học',
          auth: true
        }
      },
      {
        path: 'subject/:id',
        component: Subject,
        name: 'Subject',
        meta: {
          title: 'Môn Học',
          auth: true
        }
      },
      {
        path: 'title-table/config',
        component: TimeTableConfig,
        name: 'timetable',
        meta: {
          title: 'Cấu Hình Thời Khóa Biểu',
          auth: true
        }
      },
      {
        path: 'complimented',
        component: Violation,
        name: 'Violation',
        meta: {
          title: 'Khen thưởng kỷ luật',
          auth: true
        }
      },
      {
        path: 'semesters',
        component: Semesters,
        name: 'Semesters',
        meta: {
          title: 'Quản lý học kỳ',
          auth: true
        }
      },
      {
        path: 'staffs',
        name: 'staffs',
        component: Staffs,
        props: { role: 'staffs' },
        meta: {
          title: 'Nhân Viên',
          auth: true
        }
      },
      {
        path: 'staff/:id',
        name: 'staff',
        component: Staff,
        meta: {
          title: 'Nhân Viên',
          auth: true
        }
      },
      {
        path: 'teachers',
        name: 'teachers',
        component: Teachers,
        props: { role: 'teacher' },
        meta: {
          title: 'Giáo Viên',
          auth: true
        }
      },
      {
        path: 'teacher-dashboard',
        name: 'TeacherDashboard',
        component: TeacherDashboard,
        meta: {
          title: 'Dashboard',
          auth: true
        }
      },
      {
        path: '/teacher-classes',
        name: 'TeacherClasses',
        component: TeacherClasses,
        meta: {
          title: 'Danh Sách Lớp Của Tôi',
          auth: true
        }
      },
      {
        path: '/teacher-attendance',
        name: 'TeacherAttendance',
        component: TeacherAttendance,
        meta: {
          title: 'Điểm Danh Của Tôi',
          auth: true
        }
      },
      {
        path: 'teacher/:id',
        name: 'teacher',
        component: Teacher,
        meta: {
          title: 'Teacher',
          auth: true
        }
      },
      {
        path: 'student-dashboard',
        name: 'StudentDashboard',
        component: StudentDashboard,
        meta: {
          title: 'Dashboard',
          auth: true
        }
      },
      {
        path: 'student-classes',
        name: 'StudentClasses',
        component: StudentClasses,
        meta: {
          title: 'Lớp Của Tôi',
          auth: true
        }
      },
      {
        path: 'students',
        name: 'students',
        component: Students,
        props: { role: 'student' },
        meta: {
          title: 'Students',
          auth: true
        }
      },
      {
        path: 'reservation',
        name: 'Reservation',
        component: Reservation,
        props: { role: 'student' },
        meta: {
          title: 'Quản lý bảo lưu',
          auth: true
        }
      },
      {
        path: 'student/:id',
        name: 'studentInfor',
        component: Student,
        props: { role: 'student' },
        meta: {
          title: 'Student',
          auth: true
        }
      },
      {
        path: 'student-import',
        name: 'studentImport',
        component: StudentImporter,
        props: { role: 'student' },
        meta: {
          title: 'Student Importer',
          auth: true
        }
      },
      {
        path: 'class/:id',
        name: 'class',
        component: ClassDetail,
        meta: {
          title: 'Lớp học',
          auth: true
        }
      },
      {
        path: 'class/mark/:id',
        name: 'class-mark',
        component: ClassMark,
        meta: {
          title: 'Điểm số',
          auth: true
        }
      },
      {
        path: 'class/schedule/:id',
        name: 'class-slot',
        component: ClassSlots,
        meta: {
          title: 'Điểm danh',
          auth: true
        }
      },
      {
        path: 'marks-input',
        name: 'Nhập điểm',
        component: InputScore,
        meta: {
          title: 'Nhâp điểm',
          auth: true
        }
      },
      {
        path: 'marks',
        name: 'Sổ điểm',
        component: ViewScore,
        meta: {
          title: 'Sổ điểm',
          auth: true
        }
      },
      {
        path: 'contact-book',
        name: 'Sổ liên lạc',
        component: ContactBook,
        meta: {
          title: 'Sổ liên lạc',
          auth: true
        }
      },
      {
        path: 'contact-book/:id',
        name: 'Chi tiết sổ liên lạc',
        component: ContactBookDetail,
        meta: {
          title: 'Sổ liên lạc',
          auth: true
        }
      },
      {
        path: '*',
        name: 'page404',
        component: Page404,
        meta: {
          title: 'Page not found'
        }
      }
    ]
  }
]
export default routes
