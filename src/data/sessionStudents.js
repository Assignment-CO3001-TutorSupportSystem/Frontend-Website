// Mock mapping of session group -> list of student objects
// Keys match `group` values in `mockSessionData.js` (e.g. "MT01", "MT02", ...)
// Each student object: { id, name, dept }

const sessionStudents = {
  MT01: [
    { id: 'u101', name: 'Nguyễn Văn A', dept: 'MT' },
    { id: 'u102', name: 'Trần Thị B', dept: 'MT' },
    { id: 'u103', name: 'Lê Văn C', dept: 'MT' },
  ],
  MT02: [
    { id: 'u104', name: 'Phạm Thị D', dept: 'KT' },
    { id: 'u105', name: 'Hoàng Văn E', dept: 'KT' },
  ],
  MT03: [
    { id: 'u106', name: 'Vũ Thị F', dept: 'CN' },
    { id: 'u107', name: 'Đỗ Văn G', dept: 'CN' },
    { id: 'u108', name: 'Trịnh Thị H', dept: 'CN' },
    { id: 'u109', name: 'Bùi Văn I', dept: 'CN' },
  ],
  MT04: [
    { id: 'u110', name: 'Lương Thị J', dept: 'MT' },
    { id: 'u111', name: 'Ngô Văn K', dept: 'MT' },
  ],
  MT05: [
    { id: 'u112', name: 'Đặng Thị L', dept: 'MT' },
    { id: 'u113', name: 'Phan Văn M', dept: 'MT' },
  ],
  MT06: [
    { id: 'u114', name: 'Trần Thị N', dept: 'KT' },
  ],
  MT07: [
    { id: 'u115', name: 'Lê Thị O', dept: 'KT' },
    { id: 'u116', name: 'Võ Văn P', dept: 'KT' },
  ],
  MT08: [
    { id: 'u117', name: 'Hoàng Thị Q', dept: 'CN' },
    { id: 'u118', name: 'Nguyễn Văn R', dept: 'CN' },
    { id: 'u119', name: 'Phùng Thị S', dept: 'CN' },
  ],
  MT09: [
    { id: 'u120', name: 'Trần Văn T', dept: 'MT' },
  ],
  MT10: [
    { id: 'u121', name: 'Lý Thị U', dept: 'MT' },
    { id: 'u122', name: 'Mai Văn V', dept: 'MT' },
  ],
};

export default sessionStudents;
