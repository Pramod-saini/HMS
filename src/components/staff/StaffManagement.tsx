import { useState, useEffect } from "react";
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
  TrendingUp, Award, PhoneCall, Mail, MapPin, Star, Plus, User, UserPen, Settings2, Save
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
  const [editScore, setEditScore] = useState(0);



  const [isShiftDialogOpen, setIsShiftDialogOpen] = useState(false);
  const [currentMemberForShift, setCurrentMemberForShift] = useState(null);
  const [shiftTimes, setShiftTimes] = useState({
    shift_start: '09:00',
    shift_end: '18:00'
  });

  const saveShiftTimes = async (slug: string, times: { shift_start: string, shift_end: string }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/staff/${slug}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(times),
        }
      );
      console.log(slug)

      if (!response.ok) {
        throw new Error('Failed to save shift times');
      }

      const data = await response.json();
      console.log('Shift times saved successfully:', data);
      
      // Update the local state with the new shift times
      setAllStaff(prevStaff => 
        prevStaff.map(staff => 
          staff.slug === slug 
            ? { ...staff, shift_start: times.shift_start, shift_end: times.shift_end } 
            : staff
        )
      );
      
      return data;
    } catch (error) {
      console.error('Error saving shift times:', error);
      throw error;
    }
  };

  const updateSalary = async (staffSlug: string, newSalary: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/staff/${staffSlug}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            monthly_salary: newSalary
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to update salary');
      }

      const data = await response.json();
      console.log('Salary updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error updating salary:', error);
      throw error;
    }
  };

  const logShiftTimes = (times: { shift_start: string, shift_end: string }) => {
    console.log('Shift Times:', times);
  };

  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [salaryValue, setSalaryValue] = useState<string>("");

  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [currentStaffToTimeIn, setCurrentStaffToTimeIn] = useState(null);
  const [selectedTime, setSelectedTime] = useState(
    new Date().toTimeString().split(' ')[0].substring(0, 5)
  );

  const [isCheckOutDialogOpen, setIsCheckOutDialogOpen] = useState(false);
  const [currentStaffToTimeOut, setCurrentStaffToTimeOut] = useState(null);
  const [selectedCheckOutTime, setSelectedCheckOutTime] = useState(
    new Date().toTimeString().split(' ')[0].substring(0, 5) // (HH:MM)
  );

  // State for salary edit
  const [isEditSalaryDialogOpen, setIsEditSalaryDialogOpen] = useState(false);
  const [currentStaffForSalaryEdit, setCurrentStaffForSalaryEdit] = useState<any>(null);
  const [editedSalary, setEditedSalary] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const [AllStaff, setAllStaff] = useState<any[]>([]);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showAddAttendance, setShowAddAttendance] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState({
    staff_slug: "",
    date: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
    check_in: "",
    check_out: "",
    status: "present",
  });
  const [activeTab, setActiveTab] = useState("overview");

  const [newStaff, setNewStaff] = useState<NewStaff>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role_slug: "staff",
  });

  const formatTime12Hour = (timeString: string) => {
    // Handle both 'HH:MM:SS' and 'HH:MM' formats
    const timePart = timeString.split('.')[0]; // Remove milliseconds if present
    const [hours, minutes] = timePart.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getShiftLabel = (start: string | null, end: string | null) => {
    if (!start || !end) return "No Shift";

    const startHour = parseInt(start.split(":")[0], 10);

    if (startHour >= 6 && startHour < 12) return "Morning";
    if (startHour >= 12 && startHour < 16) return "Afternoon";
    if (startHour >= 16 && startHour < 20) return "Evening";
    return "Night"; // 20:00 - 06:00
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BACKEND_URL}/api/staff/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,  // add your token
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

    fetchData();
  }, [accessToken]);



  {/*Adding Staff */ }
  const handleAddAttendance = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // prevent multiple submissions
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/attendance/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(attendanceForm),
        }
      );

      const data = await response.json();
      console.log(attendanceForm)

      if (response.ok) {
        console.log("✅ Attendance Saved:", data);
        alert("Attendance saved successfully!");

        // ✅ Reset form to initial state
        setAttendanceForm({
          staff_slug: "",
          date: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
          check_in: "",
          check_out: "",
          status: "present",
        });

        setShowAddAttendance(false); // close dialog (optional)

      } else {
        throw new Error(
          data.detail ? JSON.stringify(data.detail) : JSON.stringify(data)
        );
      }
    } catch (error) {
      console.error("❌ Error saving attendance:", error);
      alert("Error saving attendance. Please try again!");
    } finally {
      setLoading(false);
    }
  };


  const handleAddStaff = async (e: React.FormEvent) => {
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
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/users/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // add your token
          },
          body: JSON.stringify(staffData),
        }
      );

      // Read response once
      const data = await response.json();

      if (response.ok) {
        alert("Staff added successfully!");
        setNewStaff({
          fullname: "",
          email: "",
          phone: "",
          password: "",
          role_slug: "staff",
        });
        setShowAddStaff(false);
      } else {
        throw new Error(
          data.detail ? JSON.stringify(data.detail) : JSON.stringify(data)
        );
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      alert("Error adding staff. Please try again!");
    } finally {
      setLoading(false); // stop loading spinner
    }
  };

  {/*Adding Attendance */ }


  // For storing form field data
  const [newEmployee, setNewEmployee] = useState({
    user: "",
    hotel: "",
    designation: "",
    department: "",
    joining_date: "",
    status: "active",
    shift_start: "",
    shift_end: "",
    monthly_salary: "",
  });

  const toTitle = (s?: string) =>
    s
      ? s
        .split(/[-_\s]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
      : "Unknown";

  // Helper to convert HH:MM time into a label (morning/afternoon/evening)
  const toShiftLabel = (t?: string) => {
    if (!t) return "";
    const h = Number(t.split(":")[0]);
    if (Number.isNaN(h)) return "";
    if (h >= 5 && h < 12) return "morning";
    if (h >= 12 && h < 17) return "afternoon";
    return "evening";
  };

  const handleTimeChange = (field: "check_in" | "check_out", value: string) => setAttendanceForm(prev => ({ ...prev, [field]: value }));

  const [staff] = useState<Staff[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Front Desk Manager",
      department: "Reception",
      email: "sarah@hotel.com",
      phone: "+1-555-0123",
      salary: 4500,
      status: "active",
      performance: 92,
      joinDate: "2023-01-15",
      shifts: ["Morning", "Evening"]
    },
    {
      id: "2",
      name: "Mike Chen",
      position: "Head Chef",
      department: "Restaurant",
      email: "mike@hotel.com",
      phone: "+1-555-0124",
      salary: 5500,
      status: "active",
      performance: 88,
      joinDate: "2022-08-20",
      shifts: ["Afternoon", "Evening"]
    },
    {
      id: "3",
      name: "Emma Davis",
      position: "Housekeeping Supervisor",
      department: "Housekeeping",
      email: "emma@hotel.com",
      phone: "+1-555-0125",
      salary: 3800,
      status: "leave",
      performance: 85,
      joinDate: "2023-03-10",
      shifts: ["Morning"]
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      position: "Maintenance Technician",
      department: "Maintenance",
      email: "alex@hotel.com",
      phone: "+1-555-0126",
      salary: 4200,
      status: "active",
      performance: 90,
      joinDate: "2022-11-05",
      shifts: ["Morning", "Afternoon"]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "leave": return "bg-yellow-100 text-yellow-800";
      case "training": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  const StaffCard = ({ member }: { member: any }) => {
    // map backend shape to UI-friendly fields with safe fallbacks
    const toTitle = (s?: string) =>
      s
        ? s
          .split(/[-_\s]+/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
        : "Unknown";

    const name = member.name || toTitle(member.slug) || "Unknown";
    const designation = member.position || member.designation || "Staff";

    const profileImage = member.profile_image || null;

    const department = member.department || "General";
    const email = member.email || member.user_email || "";
    const phone = member.phone || "";
    const salary = parseFloat(member.monthly_salary || "0");
    const performance = Math.round(parseFloat(member.performance_score || "0"));
    const joinDate = member.joining_date || member.created_at || "";
    const shifts = member.shifts && member.shifts.length ? member.shifts : ((member.shift_start || member.shift_end) ? [
      member.shift_start ? member.shift_start : "",
      member.shift_end ? `- ${member.shift_end}` : "",
    ] : []);

    const initials = name.split(" ").map((n: string) => n[0]).slice(0, 2).join("");

    return (
      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
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
            <Badge className={getStatusColor(member.status)}>
              {member.status}
            </Badge>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Performance</span>
              <span className="font-semibold">{performance}%</span>
            </div>
            <Progress value={performance} className="h-2" />

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{email || "-"}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <PhoneCall className="w-4 h-4" />
                <span>{phone || "-"}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-semibold text-green-600">${salary.toLocaleString()}/month</span>
              <div className="flex space-x-1">
                {shifts.map((shift: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">{shift}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
                  ${AllStaff
                    .reduce((acc, s) => acc + parseFloat(s.monthly_salary || "0"), 0)
                    .toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>
      {/*Add Employee Dialog */}
      <Dialog open={showAddStaff} onOpenChange={setShowAddStaff}>
        <DialogContent className="sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Staff Member</DialogTitle>
          </DialogHeader>

          <form className="space-y-4 p-2 sm:p-4" onSubmit={handleAddStaff}>
            {/* Full Name */}
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                value={newStaff.fullname}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, fullname: e.target.value })
                }
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newStaff.email}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, email: e.target.value })
                }
                placeholder="Enter email"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={newStaff.phone}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, phone: e.target.value })
                }
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newStaff.password}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, password: e.target.value })
                }
                placeholder="Enter password"
                required
              />
            </div>

            {/* Hidden Role Slug */}
            <input type="hidden" value="staff" />

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button
                type="submit"
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  // Spinner
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
                    <Plus className="w-4 h-4 mr-2" />
                    Add Staff
                  </>
                )}
              </Button>

            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>



      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/*
          Wrapper reserves vertical space so content below doesn't touch the tabs.
          - small screens: reserve space for 2 rows (h-20)
          - md+: reserve space for 1 row (h-12)
          The TabsList inside is positioned absolute so it can wrap within the reserved area.
        */}
        {/* Tabs in-flow to avoid being covered by fixed headers. */}
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 items-stretch bg-white/90 shadow-sm z-50">
          <TabsTrigger value="overview" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Staff Overview</TabsTrigger>
          <TabsTrigger value="schedule" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Schedule</TabsTrigger>
          <TabsTrigger value="payroll" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Payroll</TabsTrigger>
          <TabsTrigger value="performance" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Performance</TabsTrigger>
          <TabsTrigger value="attendance" className="w-full text-sm text-center py-2 px-2 whitespace-normal">Attendance</TabsTrigger>
        </TabsList>
        {/* spacer to reserve vertical space for tabs when they wrap to 2 rows on small screens */}
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
        </TabsContent>

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
                  <>
                    {AllStaff.filter(s => s.status === 'active').map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        {/* Avatar + Name + Designation */}
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
                            <p className="font-medium text-sm">{toTitle(member.slug)}</p>
                            <p className="text-xs text-gray-600">{member.designation || "Staff"}</p>
                          </div>
                        </div>


                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {member.shift_start && member.shift_end ? (
                              <div className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs">
                                  {getShiftLabel(member.shift_start, member.shift_start)}                                 </Badge>
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
                          <button
                            className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            onClick={() => {
                              setCurrentMemberForShift(member);
                              setIsShiftDialogOpen(true);
                              // Default values set to current shift times or default if not set
                              const currentShift = member.shifts && member.shifts.length > 0 ? member.shifts[0] : {};
                              setShiftTimes({
                                shift_start: currentShift.shift_start || '09:00',
                                shift_end: currentShift.shift_end || '18:00'
                              });
                            }}
                          >
                            <UserPen className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Shift Edit Modal UI*/}
                    {currentMemberForShift && (
                      <Dialog open={isShiftDialogOpen} onOpenChange={setIsShiftDialogOpen}>
                        <DialogContent className="sm:max-w-[400px] p-0">
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
                              <Clock className="w-5 h-5 mr-2 text-blue-500" /> Set Shift Time
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                              Adjust the daily shift hours for {toTitle(currentMemberForShift.slug)}.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                              {/* Shift Start Time Input */}
                              <div>
                                <label htmlFor="shift-start" className="block text-sm font-medium text-gray-700 mb-2">
                                  Shift Start
                                </label>
                                <input
                                  id="shift-start"
                                  type="time"
                                  value={shiftTimes.shift_start}
                                  onChange={(e) => setShiftTimes(prev => ({ ...prev, shift_start: e.target.value }))}
                                  className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                              </div>

                              {/* Shift End Time Input */}
                              <div>
                                <label htmlFor="shift-end" className="block text-sm font-medium text-gray-700 mb-2">
                                  Shift End
                                </label>
                                <input
                                  id="shift-end"
                                  type="time"
                                  value={shiftTimes.shift_end}
                                  onChange={(e) => setShiftTimes(prev => ({ ...prev, shift_end: e.target.value }))}
                                  className="w-full p-3 border border-gray-300 rounded-lg text-lg font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                              <button
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                onClick={() => {
                                  setIsShiftDialogOpen(false);
                                  setCurrentMemberForShift(null);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                                onClick={async () => {
                                  try {
                                    await saveShiftTimes(currentMemberForShift.slug, shiftTimes);
                                    console.log(`Shift saved for ${currentMemberForShift.slug}:`, shiftTimes);
                                    setIsShiftDialogOpen(false);
                                    setCurrentMemberForShift(null);
                                  } catch (error) {
                                    console.error('Error saving shift:', error);
                                    // You can add error handling UI here if needed
                                  }
                                }}
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Save Shift
                              </button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>




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
                  <Calendar mode="single" className="rounded-md border" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">Today's Attendance</h3>

                  </div>
                  {/* Add Attendance Dialog (opened from this tab) */}

                  {AllStaff.filter(s => s.status === 'active').map((member) => {
                    const attendance = member.attendance_records?.[0];
                    let shiftStart = "";
                    let shiftEnd = "";

                    if (attendance) {
                      const checkInHour = parseInt(attendance.check_in.split(":")[0], 10);
                      const checkOutHour = parseInt(attendance.check_out.split(":")[0], 10);

                      if (checkInHour >= 5 && checkInHour < 12) {
                        shiftStart = "Morning";
                      } else if (checkInHour >= 12 && checkInHour < 18) {
                        shiftStart = "Afternoon";
                      } else {
                        shiftStart = "Evening";
                      }

                      if (checkOutHour >= 5 && checkOutHour < 12) {
                        shiftEnd = "Morning";
                      } else if (checkOutHour >= 12 && checkOutHour < 18) {
                        shiftEnd = "Afternoon";
                      } else {
                        shiftEnd = "Evening";
                      }
                    }

                    return (
                      <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50 sticky top-0">
                            <tr>
                              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Staff</th>
                              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Check In</th>
                              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Check Out</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <>
                              {AllStaff.map((AllStaff) => (
                                <tr
                                  key={AllStaff.id}
                                  className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-16"
                                >
                                  <td className="px-6 py-4 flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                      {AllStaff.profile_image ? (
                                        <img
                                          src={AllStaff.profile_image}
                                          alt={AllStaff.slug}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <User className="w-6 h-6 text-gray-400" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{toTitle(AllStaff.slug)}</div>

                                      <div className="text-xs text-gray-500">
                                        {AllStaff.attendance_records && AllStaff.attendance_records.length > 0
                                          ? (() => {
                                            const today = new Date().toISOString().split("T")[0];
                                            const todayRecord = AllStaff.attendance_records.find(
                                              (r) => r.date === today
                                            );
                                            if (!todayRecord) return "—";

                                            const getShift = (time) => {
                                              if (!time) return "—";
                                              const hour = parseInt(time.split(":")[0]);
                                              if (hour >= 6 && hour < 12) return "Morning";
                                              if (hour >= 12 && hour < 17) return "Afternoon";
                                              if (hour >= 17 && hour < 21) return "Evening";
                                              return "Night";
                                            };

                                            const checkInShift = getShift(todayRecord.check_in);
                                            let checkOutShift = getShift(todayRecord.check_out);

                                            const checkInHour = parseInt(todayRecord.check_in.split(":")[0]);
                                            const checkOutHour = parseInt(todayRecord.check_out.split(":")[0]);
                                            if (checkOutHour < checkInHour) checkOutShift = "Night";

                                            return `${checkInShift} - ${checkOutShift}`;
                                          })()
                                          : "—"}
                                      </div>

                                      <div className="text-xs text-gray-500">{AllStaff.designation}</div>
                                    </div>
                                  </td>

                                  <td className="px-6 py-4">
                                    <button
                                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                     
                                    >
                                      Check In
                                    </button>
                                  </td>

                                  <td className="px-6 py-4">
                                    <button
                                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                     
                                    >
                                      Check Out
                                    </button>
                                  </td>
                                </tr>
                              ))}

                              

                              
                             
                            </>
                          </tbody>


                        </table>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


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
                        <h3 className="font-semibold text-sm">{toTitle(member.slug)}</h3>
                        <p className="text-xs text-gray-600">{member.designation || "Staff"}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        onClick={() => {
                          setEditingMemberId(member.id);
                          setSalaryValue(member.monthly_salary);
                        }}
                      >
                        <UserPen className="w-5 h-5" />
                      </button>

                      <div className="text-right">
                        <p className="font-semibold text-lg">${member.monthly_salary.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">per month</p>
                      </div>
                    </div>
                  </div>
                ))}

                {editingMemberId && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all">
                      <h3 className="text-xl font-bold mb-6 text-gray-800">Edit Monthly Salary</h3>

                      <div className="mb-6">
                        <label htmlFor="salary-input" className="block text-sm font-medium text-gray-700 mb-2">
                          New Salary Amount
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                          </div>

                          <input
                            id="salary-input"
                            type="number"
                            min={0}
                            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-10 pr-3 py-3 rounded-lg text-lg font-medium transition-colors"
                            value={salaryValue}
                            onChange={(e) => setSalaryValue(e.target.value)}
                            autoFocus
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                          onClick={() => setEditingMemberId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                          onClick={async () => {
                            const staffMember = AllStaff.find(m => m.id === editingMemberId);
                            if (!staffMember) {
                              console.error('Staff member not found');
                              return;
                            }

                            try {
                              await updateSalary(staffMember.slug, salaryValue);
                              // Update the local state with the new salary
                              setAllStaff(prevStaff => 
                                prevStaff.map(s => 
                                  s.slug === staffMember.slug 
                                    ? { ...s, monthly_salary: salaryValue } 
                                    : s
                                )
                              );
                              setEditingMemberId(null);
                            } catch (error) {
                              console.error('Error updating salary:', error);
                            }
                          }}
                        >
                          {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

          </Card>
        </TabsContent>

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
                          <h3 className="font-semibold">{toTitle(member.slug)}</h3>
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
            </CardContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Edit Performance for {currentMember ? toTitle(currentMember.slug) : ''}
                  </DialogTitle>
                  <DialogDescription>
                    Update the performance score below.
                  </DialogDescription>
                </DialogHeader>

                {currentMember && (
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="score" className="text-right">
                        Score (%)
                      </label>
                      <input
                        id="score"
                        type="number"
                        min={0}
                        max={100}
                        value={editScore}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setEditScore(isNaN(value) ? 0 : Math.max(0, Math.min(100, value)));
                        }}
                        className="col-span-3 p-2 border rounded-md text-base focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      if (currentMember) {
                        const updatedStaff = AllStaff.map(m =>
                          m.id === currentMember.id
                            ? { ...m, performance_score: editScore }
                            : m
                        );
                        setAllStaff(updatedStaff);
                      }
                      setIsDialogOpen(false);
                    }}
                    disabled={editScore < 0 || editScore > 100}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};