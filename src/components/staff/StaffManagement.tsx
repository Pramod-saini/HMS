import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  Users, UserPlus, Calendar as CalendarIcon, Clock, DollarSign,
  TrendingUp, Award, PhoneCall, Mail, MapPin, Star, Plus, User, UserPen, Settings2, Save, X,
  Lock, Briefcase, Building, Image, Phone, ArrowLeft, ArrowRight, Activity, Camera, Banknote, CheckSquare, XCircle,
  IndianRupee
} from "lucide-react";

// 🆕 Add these for searchable dropdown UI
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";


interface NewStaff {
  email: string;
  phone: string;
  fullname: string;
  password: string;
  role_slug: string;
}


interface Staff {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  salary: number;
  status: "active" | "leave" | "training";
  performance: number;
  joinDate: string;
  shifts: string[];
}

export const StaffManagement = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    // Convert time format for shift_start and shift_end
    if (field === 'shift_start' || field === 'shift_end') {
      // Only add ':00' when the value is in HH:mm format (e.g. '09:00')
      if (typeof value === 'string') {
        const parts = value.split(':');
        if (parts.length === 2) {
          value = value + ':00';
        }
      }
    }

    setCurrentMember(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save staff member data

  // const [editScore, setEditScore] = useState(0);

  const [newStaff, setNewStaff] = useState<NewStaff>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role_slug: "staff",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const isStep1Valid = () => {

    return (
      newStaff.fullname.trim() !== '' &&
      newStaff.email.trim() !== '' &&
      newStaff.phone.trim() !== '' &&
      newStaff.password.trim() !== ''
    );
  };

  const handleNextStep = () => {
    if (isStep1Valid()) {
      setCurrentStep(2);
    } else {

      alert("Please fill all required fields in Step 1 before proceeding.");
    }
  };
  const handlePrevStep = () => {
    setCurrentStep(1);
    // State data clear nahi hoga kyunki woh newStaff/staffDetails mein stored hai
  };

  // const [isShiftDialogOpen, setIsShiftDialogOpen] = useState(false);
  // const [currentMemberForShift, setCurrentMemberForShift] = useState(null);
  // const [shiftTimes, setShiftTimes] = useState({
  //   shift_start: '09:00',
  //   shift_end: '18:00'
  // });



  // const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  // const [currentStaffToTimeIn, setCurrentStaffToTimeIn] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(
  //   new Date().toTimeString().split(' ')[0].substring(0, 5)
  // );

  const [selectedDate, setSelectedDate] = useState(
    () => {
      const now = new Date();
      // Format as YYYY-MM-DD in local timezone
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
  );

  // const [isCheckOutDialogOpen, setIsCheckOutDialogOpen] = useState(false);
  // const [currentStaffToTimeOut, setCurrentStaffToTimeOut] = useState(null);
  // const [selectedCheckOutTime, setSelectedCheckOutTime] = useState(
  //   new Date().toTimeString().split(' ')[0].substring(0, 5) // (HH:MM)
  // );

  // State for salary edit
  // const [isEditSalaryDialogOpen, setIsEditSalaryDialogOpen] = useState(false);
  // const [currentStaffForSalaryEdit, setCurrentStaffForSalaryEdit] = useState<any>(null);
  // const [editedSalary, setEditedSalary] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(null);
  const displayImage = selectedImage || currentMember?.profile_image;
  const [fileToUpload, setFileToUpload] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {

      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      setFileToUpload(file);


      setStaffDetails(prevDetails => ({
        ...prevDetails,
        profile_image: file
      }));

      event.target.value = null;
    }
  };

  const fileInputRef = useRef(null);
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Error state for invalid shift time ranges (start > end)
  const [shiftTimeError, setShiftTimeError] = useState<string | null>(null);

  // Log current member data when detail drawer opens
  useEffect(() => {
    if (isDetailOpen && currentMember) {
      console.log('Current Member Data:', currentMember);
    }
  }, [isDetailOpen, currentMember]);

  // Validate shift times whenever they change on the current member
  useEffect(() => {
    if (!currentMember) {
      setShiftTimeError(null);
      return;
    }

    const normalizeToMinutes = (t?: string | null) => {
      if (!t) return null;
      // Accept 'HH:MM' or 'HH:MM:SS' and convert to minutes since midnight
      const parts = t.split(':').map(p => parseInt(p, 10));
      if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
      }
      if (parts.length >= 3) {
        return parts[0] * 60 + parts[1];
      }
      return null;
    };

    const startMin = normalizeToMinutes(currentMember.shift_start);
    const endMin = normalizeToMinutes(currentMember.shift_end);

    // If either is missing we don't show an error
    if (startMin == null || endMin == null) {
      setShiftTimeError(null);
      return;
    }

    if (startMin >= endMin) {
      setShiftTimeError('Shift start time must be before shift end time.');
    } else {
      setShiftTimeError(null);
    }
  }, [currentMember?.shift_start, currentMember?.shift_end]);

  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [search, setSearch] = useState("");
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const [AllStaff, setAllStaff] = useState<any[]>([]);
  const [showAddStaff, setShowAddStaff] = useState(false);
  // const [showAddAttendance, setShowAddAttendance] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    staff_slug: "",
    date: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
    check_in: "",
    check_out: "",
    status: "present",
  });
  const [activeTab, setActiveTab] = useState("overview");



  const [staffDetails, setStaffDetails] = useState({
    user_slug: "",
    designation: "",
    department: "",
    joining_date: new Date().toISOString().split('T')[0],
    shift_start: "09:00",
    shift_end: "18:00",
    monthly_salary: "",
    profile_image: null as File | null
  });

  // Check if shift times are valid (start < end)
  const isShiftTimeValid = staffDetails.shift_start < staffDetails.shift_end;
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/staff/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();
      setAllStaff(result);
      console.log("Fetched staff data :", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  // const saveShiftTimes = async (slug: string, times: { shift_start: string, shift_end: string }) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BACKEND_URL}/api/staff/${slug}/`,
  //       {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${accessToken}`,
  //         },
  //         body: JSON.stringify(times),
  //       }
  //     );
  //     console.log(slug)

  //     if (!response.ok) {
  //       throw new Error('Failed to save shift times');
  //     }

  //     const data = await response.json();
  //     console.log('Shift times saved successfully:', data);


  //     setAllStaff(prevStaff =>
  //       prevStaff.map(staff =>
  //         staff.slug === slug
  //           ? { ...staff, shift_start: times.shift_start, shift_end: times.shift_end }
  //           : staff
  //       )
  //     );

  //     return data;
  //   } catch (error) {
  //     console.error('Error saving shift times:', error);
  //     throw error;
  //   }
  // };

  // const updateSalary = async (staffSlug: string, newSalary: string) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BACKEND_URL}/api/staff/${staffSlug}/`,
  //       {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${accessToken}`,
  //         },
  //         body: JSON.stringify({
  //           monthly_salary: newSalary
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({}));
  //       throw new Error(errorData.detail || 'Failed to update salary');
  //     }

  //     const data = await response.json();
  //     console.log('Salary updated successfully:', data);
  //     return data;
  //   } catch (error) {
  //     console.error('Error updating salary:', error);
  //     throw error;
  //   }
  // };

  // const logShiftTimes = (times: { shift_start: string, shift_end: string }) => {
  //   console.log('Shift Times:', times);
  // };


  // const formatTime12Hour = (timeString: string) => {
  //   // Handle both 'HH:MM:SS' and 'HH:MM' formats
  //   const timePart = timeString.split('.')[0];
  //   const [hours, minutes] = timePart.split(':');
  //   const hour = parseInt(hours, 10);
  //   const ampm = hour >= 12 ? 'PM' : 'AM';
  //   const hour12 = hour % 12 || 12;
  //   return `${hour12}:${minutes} ${ampm}`;
  // };

  const getShiftLabel = (start: string | null, end: string | null) => {
    if (!start || !end) return "No Shift";

    const startHour = parseInt(start.split(":")[0], 10);

    if (startHour >= 6 && startHour < 12) return "Morning";
    if (startHour >= 12 && startHour < 16) return "Afternoon";
    if (startHour >= 16 && startHour < 20) return "Evening";
    return "Night";
  };

  // ---------------  Get staff data On re render --------------- 

  useEffect(() => {


    fetchData();
  }, [accessToken]);

  // ----------  Adding staff api calls --------------

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // prevent double clicks
    setLoading(true);




    const staffData = {
      full_name: newStaff.fullname.trim(),
      email: newStaff.email.trim(),
      phone: newStaff.phone.trim(),
      password: newStaff.password,
      role_slug: newStaff.role_slug,
    };

    try {
      // -------------------- ADD USER --------------------


      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/users/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(staffData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail ? JSON.stringify(data.detail) : "Failed to add staff"
        );
      }



      // -------------------- FETCH USERS --------------------


      const usersResponse = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/users/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!usersResponse.ok) {
        console.error("Failed to fetch users after staff addition");
        return;
      }

      const usersData = await usersResponse.json();
      console.log("Users data after adding staff:", usersData);



      // -------------------- FILTER STAFF --------------------


      const searchName = newStaff.fullname.trim();
      const filteredStaff = Array.isArray(usersData)
        ? usersData.filter(
          (user: any) =>
            user.role === "Staff" &&
            user.full_name.includes(searchName)
        )
        : [];

      console.log("Filtered staff by name:", filteredStaff);

      if (filteredStaff.length === 0) {
        console.error("No matching staff found after addition");
        return;
      }

      // -------------------- CREATE STAFF ENTRY --------------------
      const updatedStaffDetails = { ...staffDetails, user_slug: filteredStaff[0].slug };
      console.log("Creating staff entry with details:", updatedStaffDetails);

      // Update the state
      setStaffDetails(updatedStaffDetails);

      console.log("Staff details to be saved:", updatedStaffDetails);


      const formData = new FormData();
      for (const key in updatedStaffDetails) {
        if (key === "profile_image" && updatedStaffDetails.profile_image) {
          formData.append(key, updatedStaffDetails.profile_image);
        } else {
          formData.append(key, updatedStaffDetails[key]);
        }
      }

      // Log FormData entries
      console.log('Form Data Contents:');
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1] instanceof File ? `File - ${pair[1].name}` : pair[1]}`);
      }


      const staffResponse = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/staff/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!staffResponse.ok) {
        console.error("Failed to create staff entry");
        return;
      }

      const staffCreatedData = await staffResponse.json();
      console.log("Staff created successfully:", staffCreatedData);
      fetchData();
      alert("Staff added successfully!");

      // reset form and step
      setNewStaff({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        role_slug: "staff",
      });

      setStaffDetails({
        user_slug: "",
        designation: "",
        department: "",
        joining_date: new Date().toISOString().split('T')[0],
        shift_start: "09:00",
        shift_end: "18:00",
        monthly_salary: "",
        profile_image: null,
      });

      // Reset to first step
      setCurrentStep(1);

    } catch (error) {
      console.error("Error in handleAddUser:", error);
      alert("An error occurred while adding staff. Please try again!");
    } finally {
      setLoading(false);
    }
    setShowAddStaff(false);


  };
  // --------------- Edit Staff Member Function ---------------
  const saveStaffMember = async () => {
    if (!currentMember) return;

    setIsSaving(true);
    try {
      // Create FormData object
      const formData = new FormData();

      // Add all the regular fields
      formData.append('user_slug', currentMember.slug);
      formData.append('performance_score', String(currentMember.performance_score));
      formData.append('department', currentMember.department);
      formData.append('designation', currentMember.designation);
      formData.append('monthly_salary', currentMember.monthly_salary);
      formData.append('performance_score', currentMember.performance_score);
      formData.append('joining_date', currentMember.joining_date);
      formData.append('shift_start', currentMember.shift_start);
      formData.append('shift_end', currentMember.shift_end);
      formData.append('status', currentMember.status);
      formData.append('email', currentMember.user_email);
      formData.append('phone', currentMember.user_phone);
      formData.append('full_name', currentMember.user_full_name);

      // Add profile image if it exists in fileToUpload
      if (fileToUpload) {
        formData.append('profile_image', fileToUpload);
      }

      // Log FormData contents
      console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }

      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/staff/${currentMember.slug}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`
          // Don't set Content-Type header, it will be set automatically with boundary for FormData
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update staff member');
      }

      // Reset the fileToUpload after successful upload
      setFileToUpload(null);

      // Refresh the staff list to show updated image
      // const updatedResponse = await fetch(
      //   `${import.meta.env.VITE_API_BACKEND_URL}/api/staff/`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );

      // if (updatedResponse.ok) {
      //   const result = await updatedResponse.json();
      //   setAllStaff(result);
      // }

      fetchData();
      alert('Staff member updated successfully!');

    } catch (error) {
      console.error('Error updating staff member:', error);
      alert('Failed to update staff member. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const setCurrentStaffMember = (staff) => {
    if (!staff) {
      setCurrentMember(null);
      return;
    }

    const { created_at, updated_at, ...staffData } = staff;
    setCurrentMember({
      ...staffData,
      attendance_records: staff.attendance_records,
      department: staff.department,
      designation: staff.designation,
      hotel: staff.hotel,
      id: staff.id,
      joining_date: staff.joining_date,
      monthly_salary: staff.monthly_salary,
      performance_score: staff.performance_score,
      profile_image: staff.profile_image,
      shift_start: staff.shift_start,
      shift_end: staff.shift_end,
      slug: staff.slug,
      status: staff.status,
      user: staff.user,
      user_email: staff.user_email,
      user_full_name: staff.user_full_name,
      user_phone: staff.user_phone
    });
  };



  // const toShiftLabel = (t?: string) => {
  //   if (!t) return "";
  //   return getShiftLabel(t, t).toLowerCase();
  // };

  // const handleTimeChange = (field: "check_in" | "check_out", value: string) => setAttendanceForm(prev => ({ ...prev, [field]: value }));



  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "on_leave": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  const StaffCard = ({ member }: { member: any }) => {

    const name = member.name || member.user_full_name || "Unknown";
    const designation = member.position || member.designation || "Staff";
    const profileImage = member.profile_image || null;
    const department = member.department || "General";
    const email = member.email || member.user_email || "";
    const phone = member.phone || member.user_phone || "";
    const salary = parseFloat(member.monthly_salary || "0");
    const performance = Math.round(parseFloat(member.performance_score || "0"));
    const joinDate = member.joining_date || member.created_at || "";
    const shifts = member.shifts && member.shifts.length ? member.shifts : ((member.shift_start || member.shift_end) ? [
      member.shift_start ? member.shift_start : "",
      member.shift_end ? `- ${member.shift_end}` : "",
    ] : []);

    // const initials = name.split(" ").map((n: string) => n[0]).slice(0, 2).join("");



    return (
      <>
        <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100 relative">
          <div
            onClick={() => {
              setCurrentMember(member);
              setIsDetailOpen(true);
            }}
            className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer">
            <UserPen className="w-5 h-5" />
            <span>Edit</span>
          </div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600">
                  {member.profile_image ? (
                    <img
                      src={member.profile_image}

                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <AvatarFallback className="text-black font-semibold flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{name}</h3>
                  <p className="text-sm text-gray-600">{designation}</p>
                  <p className="text-xs text-gray-500">{department}</p>
                </div>
              </div>
              <div className="mt-10">
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Performance</span>
                <span className="font-semibold">{performance}%</span>
              </div>
              <Progress value={performance} className="h-2" />

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">- {email || "-"}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <PhoneCall className="w-4 h-4" />
                  <span>- {phone || "-"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-green-600">₹ {salary.toLocaleString()}/month</span>
                <div className="flex space-x-1">
                  {member.shift_start && member.shift_end ? (
                    <div className="flex items-center space-x-1">
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        {getShiftLabel(member.shift_start, member.shift_end)}
                      </Badge>
                      <span className="text-gray-400 text-sm">-</span>
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        {getShiftLabel(member.shift_end, member.shift_end)}
                      </Badge>
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 px-2 py-1">
                      No Shift Set
                    </Badge>
                  )}
                </div>

              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };


  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Staff</p>
                <p className="text-3xl font-bold">{AllStaff.length}</p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Staff</p>
                <p className="text-3xl font-bold">{AllStaff.filter(s => s.status === 'active').length}</p>
              </div>
              <Award className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg Performance</p>
                <p className="text-3xl font-bold">
                  {AllStaff.length > 0
                    ? (
                      AllStaff.reduce(
                        (acc, s) => acc + parseFloat(s.performance_score || "0"),
                        0
                      ) / AllStaff.length
                    ).toFixed(2)
                    : "0.00"}
                  %
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Monthly Payroll</p>
                <p className="text-3xl font-bold">
                  ₹{AllStaff
                    .reduce((acc, s) => acc + parseFloat(s.monthly_salary || "0"), 0)
                    .toLocaleString()}
                </p>
              </div>
              <IndianRupee className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>


      {/*Add Employee Dialog */}
      <Dialog open={showAddStaff} onOpenChange={setShowAddStaff}>
        <DialogContent className="sm:max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Add Staff Member - Step {currentStep} of 2</DialogTitle>
          </DialogHeader>

          <div className="flex w-full h-2 rounded-full bg-gray-200 overflow-hidden mb-0">
            <div
              className={`h-full rounded-full bg-blue-600 transition-all duration-500 ease-in-out`}
              style={{ width: currentStep === 1 ? '50%' : '100%' }}
            ></div>
          </div>
          <form className="space-y-3 p-2 sm:p-4" onSubmit={handleAddUser}>

            {currentStep === 1 && (
              <>
                {/* Full Name with User Icon */}
                <div>
                  <Label htmlFor="fullname">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullname"
                      value={newStaff.fullname}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, fullname: e.target.value })
                      }
                      placeholder="Enter full name"
                      required
                      className="pl-10" // Add padding to make space for the icon
                    />
                  </div>
                </div>

                {/* Email with Mail Icon */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={newStaff.email}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, email: e.target.value })
                      }
                      placeholder="Enter email"
                      required
                      className="pl-10" // Add padding to make space for the icon
                    />
                  </div>
                </div>

                {/* Phone with Phone Icon */}
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={newStaff.phone}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, phone: e.target.value })
                      }
                      placeholder="Enter phone number"
                      required
                      className="pl-10" // Add padding to make space for the icon
                    />
                  </div>
                </div>

                {/* Password with Lock Icon */}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={newStaff.password}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, password: e.target.value })
                      }
                      placeholder="Enter password"
                      required
                      className="pl-10" // Add padding to make space for the icon
                    />
                  </div>
                </div>
              </>
            )}

            <input type="hidden" value="staff" />

            {currentStep === 2 && (
              <div className="mt-0">


                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  {/* Designation with Briefcase Icon */}
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="designation"
                        type="text"
                        value={staffDetails.designation}
                        onChange={(e) => setStaffDetails({ ...staffDetails, designation: e.target.value })}
                        placeholder="Enter designation"
                        required
                        className="pl-10" // Add padding for icon
                      />
                    </div>
                  </div>

                  {/* Department with Building Icon */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="department"
                        type="text"
                        value={staffDetails.department}
                        onChange={(e) => setStaffDetails({ ...staffDetails, department: e.target.value })}
                        placeholder="Enter department"
                        required
                        className="pl-10" // Add padding for icon
                      />
                    </div>
                  </div>

                  {/* Joining Date with Calendar Icon (Standard input doesn't need icon inside) */}
                  <div className="space-y-2">
                    <Label htmlFor="joining_date">Joining Date</Label>
                    <Input
                      id="joining_date"
                      type="date"
                      value={staffDetails.joining_date}
                      onChange={(e) => setStaffDetails({ ...staffDetails, joining_date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shift_start">Shift Start Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="shift_start"
                        type="time"
                        value={staffDetails.shift_start}
                        onChange={(e) => {
                          const newStart = e.target.value;
                          setStaffDetails({ ...staffDetails, shift_start: newStart });
                          if (newStart >= staffDetails.shift_end) {
                            alert('Shift start time must be before end time');
                          }
                        }}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shift_end">Shift End Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="shift_end"
                        type="time"
                        value={staffDetails.shift_end}
                        onChange={(e) => {
                          const newEnd = e.target.value;
                          setStaffDetails({ ...staffDetails, shift_end: newEnd });
                          if (staffDetails.shift_start >= newEnd) {
                            alert('Shift end time must be after start time');
                          }
                        }}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly_salary">Monthly Salary (₹)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="monthly_salary"
                        type="number"
                        min="0"
                        step="0.01"
                        value={staffDetails.monthly_salary}
                        onChange={(e) => setStaffDetails({ ...staffDetails, monthly_salary: e.target.value })}
                        placeholder="0.00"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile_image">Profile Image</Label>

                    <div className="flex items-start space-x-4">

                      <div className="w-48 flex-shrink-0 relative">
                        <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <Input
                          ref={fileInputRef}
                          id="profile_image"
                          type="file"
                          accept="image/*"
                          className="cursor-pointer text-transparent pl-10" // Adding pl-10 for visual consistency
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setStaffDetails({ ...staffDetails, profile_image: e.target.files[0] });
                            }
                          }}

                        />
                      </div>

                      {staffDetails.profile_image && (
                        <div className="relative w-24 h-24 flex-shrink-0" style={{ marginTop: -32 }}>
                          <img
                            src={URL.createObjectURL(staffDetails.profile_image)}
                            alt="Profile preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            onClick={() => {
                              setStaffDetails({ ...staffDetails, profile_image: null });
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between">

              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="outline"
                  // Back Button में Icon
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}

              {currentStep < 2 && (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isStep1Valid()}

                  className="flex items-center bg-blue-600  hover:bg-blue-700 disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}

              {currentStep === 2 && (
                <Button
                  type="submit"
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading || !isShiftTimeValid}
                  onClick={(e) => {
                    if (!isShiftTimeValid) {
                      e.preventDefault();
                      alert('Shift end time must be after start time');
                    }
                  }}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Staff
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>



      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 items-stretch bg-white/90 shadow-sm z-50">
          <TabsTrigger value="overview" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Staff Overview</TabsTrigger>
          <TabsTrigger value="schedule" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Schedule</TabsTrigger>
          <TabsTrigger value="payroll" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Payroll</TabsTrigger>
          <TabsTrigger value="performance" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Performance</TabsTrigger>
          <TabsTrigger value="attendance" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Attendance</TabsTrigger>
        </TabsList>

        <div className="h-20 md:h-12" aria-hidden />

        <TabsContent value="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Staff Directory</h2>
              <p className="text-gray-600">Manage your team members</p>
            </div>
            <Button onClick={() => setShowAddStaff(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"

            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AllStaff.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </div>

          {isDetailOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center z-50 p-4 overflow-auto pt-24">
              <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-2xl max-w-4xl w-full border-l-8 border-indigo-600 transform transition-all duration-300 scale-100">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start pb-6 mb-6 border-b border-gray-200">
                  <div className="flex items-center flex-wrap">
                    <div className="relative mr-6 mb-4 sm:mb-0 mt-4 sm:mt-0">

                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={currentMember?.user_full_name || 'Staff Profile'}
                          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow-md"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-indigo-200 flex items-center justify-center">
                          <User className="w-12 h-12 text-indigo-500" />
                        </div>
                      )}

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />

                      <button
                        type="button"
                        title="Select Image"
                        onClick={handleCameraClick}
                        className="absolute bottom-0 right-0 p-1 bg-indigo-600 text-white rounded-full border-2 border-white shadow-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="w-full sm:w-auto">
                      <div>
                        <input
                          type="text"
                          value={currentMember?.user_full_name || ''}
                          onChange={(e) => handleInputChange('user_full_name', e.target.value)}
                          className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight w-full bg-transparent border-b border-transparent focus:border-indigo-200 focus:outline-none"
                          placeholder="Enter Full Name"
                        />
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          value={currentMember?.designation || ''}
                          onChange={(e) => handleInputChange('designation', e.target.value)}
                          className="text-lg sm:text-xl text-indigo-600 font-semibold w-full bg-transparent border-b border-indigo-200 focus:border-indigo-500 focus:outline-none hover:border-indigo-400 transition-colors"
                          placeholder="Enter Designation"
                        />
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className={getStatusColor(currentMember?.status)}>
                          {currentMember?.status ? currentMember.status.charAt(0).toUpperCase() + currentMember.status.slice(1) : 'Inactive'}
                        </Badge>
                        {currentMember?.department && (
                          <span className="ml-2 text-sm text-gray-600">
                            {currentMember.department}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="text-gray-400 hover:text-red-600 text-3xl font-light p-1 transition-colors ml-auto"
                  >
                    <XCircle className="w-8 h-8" />
                  </button>
                </div>


                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">

                  {/* Department */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    <div className="w-full">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department</p>
                      <input
                        type="text"
                        value={currentMember.department || ''}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="text-base font-semibold text-gray-800 w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
                        placeholder="Enter Department"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Activity className="w-5 h-5 text-green-500" />
                    <div className="w-full">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
                      <select
                        value={currentMember.status || 'active'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="text-base font-semibold w-full bg-transparent focus:ring-0 focus:outline-none"
                      >
                        <option value="active" className="text-green-700 font-bold">Active</option>
                        <option value="on_leave" className="text-yellow-600 font-bold">On Leave</option>

                      </select>
                    </div>
                  </div>

                  {/* Shift Time */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Clock className="w-5 h-5 text-pink-500" />
                    <div className="w-full">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Shift Time</p>
                      <div className="flex space-x-2">
                        <input
                          type="time"
                          value={(currentMember.shift_start || '09:00:00').slice(0, 5)}
                          onChange={(e) => handleInputChange('shift_start', e.target.value)}
                          className="text-base font-semibold text-gray-800 w-1/2 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
                        />
                        <span className="text-gray-500 font-bold">-</span>
                        <input
                          type="time"
                          value={(currentMember.shift_end || '18:00:00').slice(0, 5)}
                          onChange={(e) => handleInputChange('shift_end', e.target.value)}
                          className="text-base font-semibold text-gray-800 w-1/2 bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      {shiftTimeError && (
                        <p className="text-sm text-red-600 mt-2">{shiftTimeError}</p>
                      )}
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Activity className="w-5 h-5 text-yellow-600" />
                    <div className="w-full">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Performance (%)</p>
                      <input
                        type="number"
                        value={currentMember.performance_score || 0}
                        onChange={(e) => handleInputChange('performance_score', e.target.value)}
                        className="text-base font-semibold text-gray-800 w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div className="w-full">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
                      <input
                        type="email"
                        value={currentMember.user_email || ''}
                        onChange={(e) => handleInputChange('user_email', e.target.value)}
                        className="text-base text-blue-600 w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone No */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Phone className="w-5 h-5 text-teal-500" />
                    <div className="w-full">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No.</p>
                      <input
                        type="tel"
                        value={currentMember.user_phone || ''}
                        onChange={(e) => handleInputChange('user_phone', e.target.value)}
                        className="text-base text-teal-600 w-full bg-transparent border-b border-gray-300 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Monthly Salary */}
                  <div className="col-span-2 sm:col-span-2 md:col-span-3 bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex items-center space-x-3">
                      <Banknote className="w-6 h-6 text-indigo-700" />
                      <p className="text-sm font-medium text-indigo-700 uppercase tracking-wider">Monthly Salary</p>
                    </div>
                    <div className="flex items-center w-full sm:w-1/3">
                      <IndianRupee className="w-5 h-5 text-indigo-800 mr-1" />
                      <input
                        type="text"
                        value={currentMember.monthly_salary || ''}
                        onChange={(e) => handleInputChange('monthly_salary', e.target.value)}
                        className="font-extrabold text-indigo-800 text-3xl bg-transparent border-b-2 border-indigo-400 focus:border-indigo-600 outline-none text-right w-full"
                      />
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-center items-center">
                    <button
                      onClick={() => setIsDetailOpen(false)}
                      className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors text-lg font-semibold shadow-md"
                    >
                      CANCEL
                    </button>
                  </div>

                  <div className="col-span-1 flex justify-center items-center">
                    <button
                      onClick={saveStaffMember}
                      disabled={isSaving || !!shiftTimeError}
                      title={shiftTimeError ?? undefined}
                      className={`w-full flex items-center justify-center space-x-2 ${isSaving || shiftTimeError ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-3 px-6 rounded-xl transition-colors text-lg font-semibold shadow-lg`}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>SAVING...</span>
                        </>
                      ) : (
                        <>
                          <CheckSquare className="w-6 h-6" />
                          <span>SAVE CHANGES</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </TabsContent>

        {/* <--------------------- Staff Schedule Tab Content ---------------------> */}

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Staff Schedule
              </CardTitle>
              <CardDescription>Manage work schedules and shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <Calendar mode="single" className="rounded-md border" />
                </div>

                {/* Staff List */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Today's Schedule</h3>
                  <div className="overflow-y-auto max-h-96 space-y-3">
                    {AllStaff.filter(s => s.status === 'active').map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            {member.profile_image ? (
                              <img
                                src={member.profile_image}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <AvatarFallback className="flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-400" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{member.user_full_name}</p>
                            <p className="text-xs text-gray-600">{member.designation || "Staff"}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {member.shift_start && member.shift_end ? (
                              <div className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs">
                                  {getShiftLabel(member.shift_start, member.shift_start)}  </Badge>
                                <span className="text-gray-400">-</span>
                                <Badge variant="outline" className="text-xs">
                                  {getShiftLabel(member.shift_end, member.shift_end)}
                                </Badge>
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                                No Shift Set
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* <--------------------- Attendance Tab Content ---------------------> */}

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Attendance
              </CardTitle>
              <CardDescription>Manage work schedules and shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Calendar
                    mode="single"
                    selected={new Date(selectedDate)}
                    onSelect={(date) => {
                      if (date) {
                        // Format the date in local timezone as YYYY-MM-DD
                        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                        setSelectedDate(formattedDate);
                        console.log(formattedDate)
                      }
                    }}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">Attendance for {selectedDate}</h3>

                  </div>
                  {/* Add Attendance Dialog (opened from this tab) */}

                  <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Staff</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {AllStaff.filter(s => s.status === 'active').map((staff) => {
                          const attendance = staff.attendance_records?.find(record => record.date === selectedDate);

                          return (
                            <tr
                              key={staff.id}
                              className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-16"
                            >
                              <td className="px-6 py-4 flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                  {staff.profile_image ? (
                                    <img
                                      src={staff.profile_image}
                                      className="w-full h-full object-cover"
                                      alt={staff.slug}
                                    />
                                  ) : (
                                    <User className="w-6 h-6 text-gray-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{staff.user_full_name}</div>
                                  <div className="text-xs text-gray-500">
                                    {staff.attendance_records && staff.attendance_records.length > 0
                                      ? (() => {
                                        const record = staff.attendance_records?.find(r => r.date === selectedDate);
                                        if (!record) return "—";

                                        if (record.status !== "present") {
                                          return record.status.charAt(0).toUpperCase() + record.status.slice(1);
                                        }

                                        const getShift = (time: string) => {
                                          if (!time) return "—";
                                          const hour = parseInt(time.split(":")[0]);
                                          if (hour >= 6 && hour < 12) return "Morning";
                                          if (hour >= 12 && hour < 17) return "Afternoon";
                                          if (hour >= 17 && hour < 21) return "Evening";
                                          return "Night";
                                        };

                                        const checkInShift = getShift(record.check_in);
                                        let checkOutShift = getShift(record.check_out);

                                        if (record.check_in && record.check_out) {
                                          const checkInHour = parseInt(record.check_in.split(":")[0]);
                                          const checkOutHour = parseInt(record.check_out.split(":")[0]);
                                          if (checkOutHour < checkInHour) checkOutShift = "Night";
                                        }

                                        return `${checkInShift} - ${checkOutShift}`;
                                      })()
                                      : "—"}
                                  </div>
                                  <div className="text-xs text-gray-500">{staff.designation}</div>
                                </div>
                              </td>

                              <td className="px-6 py-4 text-center">
                                {attendance ? (
                                  <div className="flex items-center justify-start gap-2">
                                    <input
                                      type="radio"
                                      checked
                                      readOnly
                                      className={`w-4 h-4 ${attendance.status === "present" ? "accent-green-600" : "accent-red-600"}`}
                                    />
                                    <span className={attendance.status === "present" ? "text-green-600" : "text-red-600"}>
                                      {attendance.status === "present"
                                        ? "Present"
                                        : attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}
                                    </span>
                                  </div>
                                ) : "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <--------------------- Payroll Tab Content ---------------------> */}

        <TabsContent value="payroll" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Payroll Management
              </CardTitle>
              <CardDescription>Manage salaries and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-y-auto max-h-96 space-y-4">
                  {AllStaff.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-8 h-8">
                          {member.profile_image ? (
                            <img
                              src={member.profile_image}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <AvatarFallback className="flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-400" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-sm">{member.user_full_name}</h3>
                          <p className="text-xs text-gray-600">{member.designation || "Staff"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">

                        <div className="text-right">
                          <p className="font-semibold text-lg flex items-center justify-end">
                            {/* The 'flex' and 'items-center' on the parent <p> ensures alignment */}
                            <IndianRupee />
                            {member.monthly_salary.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">per month</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

          </Card>
        </TabsContent>

        {/* <--------------------- Performance Tab Content ---------------------> */}

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Performance Analytics
              </CardTitle>
              <CardDescription>Track and analyze staff performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-y-auto max-h-96 space-y-4">
                  {AllStaff.map((member) => (
                    <div key={member.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            {member.profile_image ? (
                              <img
                                src={member.profile_image}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <AvatarFallback>
                                <User className="w-5 h-5 text-gray-400" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{member.user_full_name}</h3>
                            <p className="text-sm text-gray-600">{member.designation}</p>
                          </div>
                        </div>

                        <div className="text-right flex items-center space-x-2">
                          <div>
                            <p className="text-lg font-bold">{member.performance_score}%</p>
                            <p className="text-xs text-gray-600">Performance Score</p>
                          </div>
                        </div>
                      </div>

                      <Progress value={member.performance_score} className="h-3" />

                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>
                          Joined:{" "}
                          {member.joining_date &&
                            new Date(member.joining_date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                        </span>

                        <span
                          className={
                            member.performance_score >= 90
                              ? "text-green-600 font-semibold"
                              : member.performance_score >= 80
                                ? "text-yellow-600 font-semibold"
                                : "text-red-600 font-semibold"
                          }
                        >
                          {member.performance_score >= 90
                            ? "Excellent"
                            : member.performance_score >= 80
                              ? "Good"
                              : "Needs Improvement"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>


          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

}

export default StaffManagement;