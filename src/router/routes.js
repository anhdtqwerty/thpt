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
import ClassStudents from '@/views/class/ClassStudents'
import ClassMark from '@/views/class/ClassMark'
import ClassSlots from '@/views/class/ClassSlots'

import Generations from '@/views/generation/Generations'
// ---------------- STUDENT -------------------------------
import Students from '@/views/student/Students'
import Reservation from '@/views/student/Reservation.vue'
import StudentDashboard from '@/views/student/Dashboard'
import Student from '@/views/student/Student'
import StudentClasses from '@/views/student/Classes'
import StudentImporter from '@/views/student/StudentImporter.vue'
// ---------------- DEPARTMENT -------------------------------
import Department from '@/views/department/Department'
import DashBoard from '@/views/dashboard/Dashboard.vue'
// ---------------- LEARNING -----------------------------
import Schedule from '@/views/schedule/Schedule.vue'
// -----------------HIGH SCHOOL---------------------------
import HighSchoolClass from '@/views/highSchool/HighSchoolClass'
// ---------------- LAYOUT -------------------------------
import GuestLayout from '../components/layout/GuestLayout'
import MainLayout from '../components/layout/MainLayout'
import Page404 from '@/views/Page404'
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
        path: 'class/students/:id',
        name: 'class-student',
        component: ClassStudents,
        meta: {
          title: 'Học viên',
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
        path: 'department/:id',
        name: 'Department',
        component: Department,
        meta: {
          title: 'Department',
          auth: true
        }
      },
      {
        path: 'classes',
        name: 'Danh sách lớp',
        component: HighSchoolClass,
        meta: {
          title: 'Lớp học',
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
