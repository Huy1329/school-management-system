"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "vi";

export const translations = {
  en: {
    // Navbar (navigation.tsx)
    home: "Home",
    library: "Library",
    pricing: "Pricing",
    support: "Support",

    // User menu part one
    accountSetting: "Account Setting",
    dashboard: "DashBoard",
    supportMenu: "Support",

    text_support: "Support Center",
    languages: "Languages",

    // User menu part two
    homePage: "Home Page",
    libraryMenu: "Library",
    pricingMenu: "Pricing",
    logout: "Logout",

    // Language popover
    selectLanguage: "Select language",
    english: "English",
    vietnamese: "Vietnamese",

    // Library page
    filterPlaceholder: "Filter file name...",
    date: "Date",
    email: "Email",
    fileName: "File Name",
    class : "Class",
    subject: "Subject",
    file_Size: "File Size",
    file_Type: "File Type",
    columns: "Columns",
    actions: "Actions",
    no_subjects_found: "No subject found.!",
    upload : "Upload",

    all_subjects: "All Subjects",
    math: "Math",
    physics: "Physics",
    chemistry: "Chemistry",
    s_english: "English",
    computer_science: "Computer Science",

    //Home page
    new: "New",
    new_1: "Introduction Upload",
    main_title: "A Complete Learning Resource for Students",
    description: "Discover a rich collection of learning resources, study materials, and inspirational content designed to guide you through every step of your educational journey — helping you achieve your academic goals, develop critical thinking, and grow into a lifelong learner.",
    get_started: "Get Started",

    rowsSelected: (n: number) => `${n} of 8 row(s) selected.`,
    all_classes: "All Classes",
    class1: "Class 1",
    class2: "Class 2", 
    class3: "Class 3",
    class4: "Class 4",
    class5: "Class 5",
    class6: "Class 6",
    class7: "Class 7",
    class8: "Class 8",
    class9: "Class 9",
    class10: "Class 10",
    class11: "Class 11",
    class12: "Class 12",

    download: "Download",
    view_file: "View file",
    copy_download_url: "Copy download url",
    No_results: "No results",

    // Auth buttons
    signIn: "Sign In",
    createAccount: "Create Account",

    // Pricing page
    pricing_title: "Pricing that Scales with You",
    pricing_description: "We provide the infrastructure for storing learning materials. Upgrade now to enjoy the benefits.",
    free_vr: "Per editor",
    free_price: "0 VND / Month",
    pro_vr: "Per editor",
    pro_price: "20.000 VND / Month",
    get_started_pricing: "Get Started",
    pay:"Donate via QR code",
    thank_you: "THANK YOU ❤️",
    bank: "Bank",
    account_name: "Account name",
    account_holder: "NGUYEN QUANG HUY",
    account_number: "Account number",
    pro_text:"Everything in Free, plus:",

    //support page
    t_support: "Support Center",
    support_desc: "Need help? Contact support or send us a message.",
    email_support: "Email Support",
    phone: "Phone",
    school: "School",
    button_support: "Contact Support",
    tb_support:"Message Sent!",
    support_desc_success: "Your message has been sent to nguyenhuy2k9ktm@gmail.com",
    tb_support_desc: "Send Another",
    error_support: "Failed to send message. Please try again or email us directly.",
    support_loading: "Sending message...",
    button_sp : "Send Message",

    your_name: "Your Name",
    your_email: "Your Email",
    subject_sp: "Subject",
    message: "Describe your problem",

    mot:"Please select a file to upload.",
    hai:"Please select label for all file before upload.",
    ba:"Please select file before upload.",
    dang_tai:"Uploading...",
    login_upload:" You need to login before uploading file.",
    error_upload: "Error uploading file, Please try again!",
    login_del_file:"Please log in to delete the file.",
    error_rena_file:"Error renaming file.",
    error_server: "Cannot connect to server!",
    no_del_file:"Unable to delete file.",
    login_rename_file:"Please log in to rename the file.",
  },
  vi: {
    // Navbar
    home: "Trang chủ",
    library: "Thư viện",
    pricing: "Bảng giá",
    support: "Hỗ trợ",

    // User menu part one
    accountSetting: "Cài đặt tài khoản",
    dashboard: "Bảng điều khiển",
    supportMenu: "Hỗ trợ",
    languages: "Ngôn ngữ",

    // User menu part two
    homePage: "Trang chủ",
    libraryMenu: "Thư viện",
    pricingMenu: "Bảng giá",
    logout: "Đăng xuất",

    // Language popover
    selectLanguage: "Chọn ngôn ngữ",
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",

    // Library page
    filterPlaceholder: "Lọc tên file...",
    date: "Ngày",
    email: "Email",
    fileName: "Tên file",
    class: "Lớp",
    subject: "Môn học",
    file_Size: "Kích thước",
    file_Type: "Loại file",
    columns: "Cột",
    actions: "Hành động",

    upload : "Tải lên",
    all_subjects: "Tất cả môn học",
    no_subjects_found: "Không tìm thấy môn học nào.!",
    math: "Toán",
    physics: "Lý",
    chemistry: "Hóa",
    s_english: "Anh",
    computer_science: "Tin học",
    rowsSelected: (n: number) => `Đã chọn ${n} / 8 hàng.`,
    all_classes: "Tất cả lớp",
    class1: "Lớp 1",
    class2: "Lớp 2",
    class3: "Lớp 3",
    class4: "Lớp 4",
    class5: "Lớp 5",
    class6: "Lớp 6",
    class7: "Lớp 7",
    class8: "Lớp 8",
    class9: "Lớp 9",
    class10: "Lớp 10",
    class11: "Lớp 11",
    class12: "Lớp 12",

    download: "Tải xuống",
    view_file: "Xem file",
    copy_download_url: "Sao chép đường dẫn tải xuống",
    No_results: "Không có kết quả",

    // Auth buttons
    signIn: "Đăng nhập",
    createAccount: "Tạo tài khoản",

    //Home page
    new: "Mới",
    new_1: "Giới thiệu về Upload",
    main_title: "Tài nguyên học tập hoàn chỉnh cho học sinh",
    description: "Khám phá bộ sưu tập phong phú các tài nguyên học tập, tài liệu học tập và nội dung truyền cảm hứng được thiết kế để hướng dẫn bạn qua từng bước của hành trình giáo dục của bạn - giúp bạn đạt được mục tiêu học tập, phát triển tư duy phản biện và trở thành một người học suốt đời.",
    get_started: "Bắt đầu ngay",

    // Pricing page
    pricing_title: "Bảng giá phù hợp với bạn",
    pricing_description: "Chúng tôi cung cấp cơ sở hạ tầng để lưu trữ tài liệu học tập. Nâng cấp ngay để tận hưởng những lợi ích.",
    free_vr: "Mỗi biên tập viên",
    free_price: "0 VND / Tháng",
    pro_vr: "Mỗi biên tập viên",
    pro_price: "20.000 VND / Tháng",
    get_started_pricing: "Bắt đầu ngay",
    pay: "Quyên góp qua mã QR",
    thank_you: "CẢM ƠN BẠN ❤️",
    bank: "Ngân hàng",
    mb_bank: "MB Bank",
    account_name: "Tên tài khoản",
    account_holder: "NGUYEN QUANG HUY",
    account_number: "Số tài khoản",
    pro_text: "Mọi thứ trong Free, cộng với:",

    // Support page
    t_support: "Trung tâm hỗ trợ",
    support_desc: "Cần giúp đỡ? Liên hệ hỗ trợ hoặc gửi cho chúng tôi một tin nhắn.",
    email_support: "Hỗ trợ qua email",
    phone: "Điện thoại",
    school: "Trường học",
    button_support: "Liên hệ hỗ trợ",
    tb_support: "Tin nhắn đã được gửi!",
    support_desc_success: "Tin nhắn của bạn đã được gửi đến nguyenhuy2k9ktm@gmail.com",
    tb_support_desc: "Gửi lại",
    error_support: "Gửi tin nhắn thất bại. Vui lòng thử lại hoặc gửi email trực tiếp cho chúng tôi.",
    support_loading: "Đang gửi tin nhắn...",
    button_sp : "Gửi tin nhắn",

    your_name: "Tên của bạn",
    your_email: "Email của bạn",
    subject_sp: "Chủ đề",
    message: "Hãy mô tả vấn đề của bạn...",

    //upload
    mot:"Vui lòng chọn một file để tải lên.",
    hai:"Vui lòng chọn label cho tất cả  file trước khi upload.",
    ba:"Vui lòng chọn file trước khi tải lên.",
    dang_tai:"Đang tải lên...",
    error_upload: "Lỗi khi tải file, Vui lòng thử lại!",
    login_upload:" Bạn cần đăng nhập trước khi tải file.",
    login_del_file:"Vui lòng đăng nhập để xóa file.",
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations["en"];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "vi") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as any }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}