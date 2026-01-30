import { BusinessCategory } from './types';

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: 'ceo_strategy',
    name: 'Chiến Lược CEO',
    description: 'Xây dựng tầm nhìn, sứ mệnh và bản đồ chiến lược 5 năm.',
    systemPromptAddon: 'Đóng vai chuyên gia tư vấn chiến lược McKinsey. Tập trung vào Tầm nhìn, Sứ mệnh, Giá trị cốt lõi, SWOT và Roadmap thực thi.'
  },
  {
    id: 'corporate_culture',
    name: 'Văn Hóa Doanh Nghiệp',
    description: 'Thiết kế DNA văn hóa, quy tắc ứng xử và gắn kết đội ngũ.',
    systemPromptAddon: 'Đóng vai chuyên gia nhân sự cấp cao. Tập trung vào Giá trị cốt lõi, Nghi thức doanh nghiệp, Truyền thông nội bộ.'
  },
  {
    id: 'automation_process',
    name: 'Quy Trình Tự Động',
    description: 'Tối ưu hóa vận hành, giảm thiểu con người, tăng hiệu suất.',
    systemPromptAddon: 'Đóng vai kiến trúc sư hệ thống. Tập trung vào SOP, Công cụ (Tools), Luồng công việc (Workflows) và Loại bỏ điểm nghẽn.'
  },
  {
    id: 'kpi_hr',
    name: 'KPI & Nhân Sự',
    description: 'Xây dựng từ điển năng lực, khung lương thưởng và chỉ số KPI/OKRs.',
    systemPromptAddon: 'Đóng vai Giám đốc Nhân sự (CHRO). Tập trung vào Khung năng lực, BSC (Balanced Scorecard), Chính sách giữ chân nhân tài.'
  },
  {
    id: 'financial_report',
    name: 'Báo Cáo Tài Chính',
    description: 'Phân tích dòng tiền, P&L và dự phóng tài chính.',
    systemPromptAddon: 'Đóng vai CFO. Tập trung vào Dòng tiền (Cashflow), Tỷ suất lợi nhuận, Điểm hòa vốn và Kiểm soát rủi ro.'
  },
  {
    id: 'pitch_deck',
    name: 'Pitch Deck Gọi Vốn',
    description: 'Kịch bản gọi vốn triệu đô thuyết phục nhà đầu tư.',
    systemPromptAddon: 'Đóng vai Shark Tank Mentor. Tập trung vào Market Size, Business Model, Traction và Ask.'
  },
  {
    id: 'crisis_management',
    name: 'Xử Lý Khủng Hoảng',
    description: 'Quy trình ứng phó rủi ro truyền thông và vận hành.',
    systemPromptAddon: 'Đóng vai Chuyên gia xử lý khủng hoảng. Tập trung vào Thông cáo báo chí, Quy trình leo thang (Escalation), Giữ niềm tin khách hàng.'
  },
  {
    id: 'restructuring',
    name: 'Tái Cấu Trúc',
    description: 'Sắp xếp lại bộ máy, cắt giảm chi phí, tăng hiệu quả.',
    systemPromptAddon: 'Đóng vai "Turnaround Manager". Tập trung vào Tinh gọn bộ máy, Cắt lỗ, Tái định vị.'
  },
  {
    id: 'franchise_model',
    name: 'Mô Hình Franchise',
    description: 'Đóng gói mô hình kinh doanh để nhượng quyền.',
    systemPromptAddon: 'Đóng vai Chuyên gia nhượng quyền. Tập trung vào Đóng gói quy trình, Pháp lý nhượng quyền, Kiểm soát chất lượng.'
  },
  {
    id: 'conscious_leadership',
    name: 'Lãnh Đạo Tỉnh Thức',
    description: 'Phát triển năng lực lãnh đạo dựa trên sự thấu hiểu và EQ.',
    systemPromptAddon: 'Đóng vai Executive Coach. Tập trung vào EQ, Mindfulness trong quản trị, Ra quyết định sáng suốt.'
  }
];

export const INDUSTRIES = [
  'Bất động sản & Xây dựng',
  'Công nghệ & SaaS',
  'Bán lẻ & F&B',
  'Giáo dục & Đào tạo',
  'Y tế & Sức khỏe',
  'Sản xuất & Xuất khẩu',
  'Thời trang & Làm đẹp',
  'Logistics & Vận tải',
  'Tài chính & Đầu tư',
  'Dịch vụ Marketing/Agency'
];

export const SCALES = [
  'Startup (Giai đoạn ý tưởng/MVP)',
  'SME (10 - 50 nhân sự)',
  'Scale-up (50 - 200 nhân sự)',
  'Corporation (Trên 200 nhân sự)',
  'Tập đoàn đa quốc gia'
];

export const TONES = [
  'Chiến lược & Tầm nhìn (Strategic)',
  'Quyết liệt & Hành động (Aggressive)',
  'Chuyên nghiệp & Sang trọng (Professional)',
  'Truyền cảm hứng & Thấu cảm (Inspiring)',
  'Thực tế & Chi tiết (Pragmatic)'
];

export const AUDIENCES = [
  'Nhà đầu tư (Investors)',
  'Hội đồng quản trị (Board of Directors)',
  'Toàn thể nhân viên (All-hands)',
  'Khách hàng VIP',
  'Đối tác chiến lược'
];
