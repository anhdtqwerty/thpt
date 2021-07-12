export default {
  namespaced: true,
  state: {
    leadStatus: [
      {
        title: 'Đã xác nhận',
        status: 'running'
      },
      {
        title: 'Đã Thu Tiền',
        status: 'paid'
      },
      {
        title: 'Đã xếp lớp',
        status: 'Done'
      },
      {
        title: 'Còn Nợ',
        status: 'liabilities'
      },
      {
        title: 'Đã Hủy',
        status: 'canceled'
      }
    ],
    leadState: [
      {
        title: 'Chưa Duyệt',
        status: 'under-approval'
      },
      {
        title: 'Đã Duyệt',
        status: 'approved'
      }
    ],
    leadTypes: [
      {
        title: 'Học Phí',
        status: 'tuition'
      },
      {
        title: 'Thu nợ',
        status: 'other'
      },
      {
        title: 'Khác',
        status: 'other'
      },
      {
        title: 'Dịch Vụ',
        status: 'services'
      }
    ],
    billStatus: [
      {
        title: 'Đã Thu Tiền',
        status: 'paid'
      },
      {
        title: 'Bị Từ Chối',
        status: 'rejected'
      },
      {
        title: 'Còn Nợ',
        status: 'liabilities'
      },
      {
        title: 'Đã Hủy',
        status: 'canceled'
      }
    ],
    facilityStatus: [
      {
        title: 'Quá Hạn',
        status: 'over-due'
      },
      {
        title: 'Hỏng',
        status: 'broken'
      },
      {
        title: 'Đã Bán',
        status: 'paid'
      },
      {
        title: 'Đang Mượn',
        status: 'using'
      },
      {
        title: 'Trong Kho',
        status: 'inventory'
      }
    ],
    bookStatus: [
      {
        title: 'Quá Hạn',
        status: 'over-due'
      },
      {
        title: 'Hỏng',
        status: 'broken'
      },
      {
        title: 'Đã Bán',
        status: 'paid'
      },
      {
        title: 'Đang Mượn',
        status: 'using'
      },
      {
        title: 'Trong Kho',
        status: 'inventory'
      }
    ],
    facilityTypes: [
      {
        title: 'Sách',
        status: 'book'
      },
      {
        title: 'Trang Thiết Bị',
        status: 'device'
      },
      {
        title: 'CSVC Cố Định',
        status: 'fixed-facility'
      },
      {
        title: 'Học Liệu',
        status: 'material'
      }
    ],
    bookTypes: [
      {
        title: 'Sách',
        status: 'book'
      },
      {
        title: 'Trang Thiết Bị',
        status: 'device'
      },
      {
        title: 'CSVC Cố Định',
        status: 'fixed-facility'
      },
      {
        title: 'Học Liệu',
        status: 'material'
      }
    ],
    productStatus: [
      {
        title: 'Hết Hàng',
        status: 'out-of-stock'
      },
      {
        title: 'Đang Kinh Doanh',
        status: 'active'
      },
      {
        title: 'Ngừng Kinh Doanh',
        status: 'block'
      }
    ],
    paymentTypes: [
      {
        title: 'Tiền mặt',
        status: 'cash'
      },
      {
        title: 'Chuyển Khoản',
        status: 'bank'
      },
      {
        title: 'Trả Góp',
        status: 'installment'
      },
      {
        title: 'Quẹt thẻ',
        status: 'card'
      }
    ],
    productTypes: [
      {
        title: 'Tiền mặt',
        status: 'cash'
      },
      {
        title: 'Chuyển Khoản',
        status: 'bank'
      },
      {
        title: 'Trả Góp',
        status: 'installment'
      },
      {
        title: 'Quẹt thẻ',
        status: 'card'
      }
    ],
    slotStatus: [
      {
        title: 'Chờ điểm danh',
        status: 'opened'
      },
      {
        title: 'Đã điểm danh',
        status: 'running'
      },
      {
        title: 'Kết thúc',
        status: 'Done'
      },
      {
        title: 'Bị Từ Chối',
        status: 'rejected'
      },
      {
        title: 'Đã Hủy',
        status: 'canceled'
      }
    ],
    slotTypes: [
      {
        title: 'Lớp Học',
        status: 'class-slot'
        // },{
        //   'title': 'Sự Kiện',
        //   'status': 'event-slot'
        // },{
        //   'title': 'Trực Cơ Sở',
        //   'status': 'monitoring-slot'
      },
      {
        title: 'Dạy Bù',
        status: 'recovery-slot'
        // },{
        //   'title': 'Giám Khảo',
        //   'status': 'examiner-slot'
        // },{
        //   'title': 'Thuyết Trình',
        //   'status': 'presentation-slot'
        // },{
        //   'title': 'Hackathon',
        //   'status': 'hackathon-slot'
      }
    ],
    attendanceStatus: [
      {
        title: 'Chưa điểm danh',
        status: 'absent'
      },
      {
        title: 'Có mặt',
        status: 'attendance'
      }
      // {
      //   title: 'Đi Muộn',
      //   status: 'late'
      // },
      // {
      //   title: 'Đúng giờ',
      //   status: 'onTime'
      // }
    ],
    diligenceStatus: [
      {
        title: 'Có phép',
        status: 'yes'
      },
      {
        title: 'Không phép',
        status: 'no'
      }
    ],

    attendanceStates: [
      {
        title: 'Từ Chối',
        status: 'rejected'
      },
      {
        title: 'Chờ Xác Nhận',
        status: 'wait'
      },
      {
        title: 'Chờ Xác Nhận',
        status: ''
      },
      {
        title: 'Xác Nhận',
        status: 'confirmed'
      },
      {
        title: 'Đã Trả Lương',
        status: 'paid'
      }
    ],
    attendanceTypes: [
      {
        title: 'Giáo Viên',
        status: 'teacher-attendance'
      },
      {
        title: 'Trợ Giảng',
        status: 'mentor-attendance'
      },
      {
        title: 'Học Sinh',
        status: 'student-attendance'
      }
    ],
    classStatus: [
      {
        title: 'Đang chờ',
        status: 'opened'
      },
      {
        title: 'Đang chạy',
        status: 'running'
      },
      {
        title: 'Kết Thúc',
        status: 'done'
      }
    ],
    studentStatus: [
      {
        title: 'Đang học',
        status: 'active'
      },
      {
        title: 'Bảo lưu',
        status: 'reserved'
      },
      {
        title: 'Đã tốt nghiệp',
        status: 'graduated'
      },
      {
        title: 'Đã nghỉ',
        status: 'left'
      }
    ],
    billTypes: [
      {
        title: 'Học Phí',
        status: 'tuition'
      },
      {
        title: 'Thu nợ',
        status: 'liability'
      },
      {
        title: 'Bán Hàng',
        status: 'product'
      },
      {
        title: 'Khác',
        status: 'other'
      }
    ],
    showcasePositions: [
      {
        title: 'Đầu trang',
        status: 'home-page'
      },
      {
        title: 'Ảnh đại diện',
        status: 'highlight'
      }
    ],
    postTypes: [
      {
        title: 'Thông báo',
        value: 'notification'
      },
      {
        title: 'Điểm số',
        value: 'mark'
      },
      {
        title: 'KTKL',
        value: 'violation'
      },
      {
        title: 'Học phí',
        value: 'tuitionFee'
      },
      {
        title: 'Chuyên cần',
        value: 'diligence'
      },
      {
        title: 'Thời khóa biểu',
        value: 'schedule'
      },
      {
        title: 'Học tập online',
        value: 'onlineStudy'
      },
      {
        title: 'Khác',
        value: 'other'
      }
    ],
    smsStatuses: [
      {
        title: 'Thành công',
        value: 'success'
      },
      {
        title: 'Gửi lỗi',
        value: 'error'
      }
    ],
    postToTypes: [
      {
        title: 'Toàn trường',
        value: 'department'
      },
      {
        title: 'Khối',
        value: 'grade'
      },
      {
        title: 'Lớp',
        value: 'class'
      },
      {
        title: 'Học sinh',
        value: 'student'
      }
    ],
    postConfigs: [
      {
        title: 'Soạn riêng',
        value: 'immediately'
      },
      {
        title: 'Tự động',
        value: 'auto'
      }
    ]
  },
  getters: {
    slotStatus: state => filter => {
      return state.slotStatus.filter(filter)
    },
    billStatus: state => state.billStatus,
    paymentTypes: state => state.paymentTypes,
    productTypes: state => state.productTypes,
    productStatus: state => state.productStatus,
    showcasePositions: state => state.showcasePositions,
    postTypes: state => state.postTypes,
    smsStatuses: state => state.smsStatuses,
    postToTypes: state => state.postToTypes,
    postConfigs: state => state.postConfigs
  }
}
