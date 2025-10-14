
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  Users, UserPlus, Calendar as CalendarIcon, Clock, DollarSign,
  TrendingUp, Award, PhoneCall, Mail, MapPin, Star, Plus
} from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [AllStaff, setAllStaff] = useState<any[]>([]);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [newStaff, setNewStaff] = useState<NewStaff>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role_slug: "staff",
  });

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
    const position = member.position || member.designation || "Staff";
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
                <AvatarFallback className="text-black font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-600">{position}</p>
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
                <div>
                  <Calendar mode="single" className="rounded-md border" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Today's Schedule</h3>
                  {staff.filter(s => s.status === 'active').map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex space-x-1">
                          {member.shifts.map((shift, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {shift}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <h3 className="font-semibold">Today's Attendance</h3>
                  {staff.filter(s => s.status === 'active').map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex space-x-1">
                          {member.shifts.map((shift, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {shift}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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
                {staff.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        {/* <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback> */}
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${member.salary.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  </div>
                ))}
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
                {staff.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{member.performance}%</p>
                        <p className="text-xs text-gray-600">Performance Score</p>
                      </div>
                    </div>
                    <Progress value={member.performance} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                      <span className={member.performance >= 90 ? "text-green-600 font-semibold" :
                        member.performance >= 80 ? "text-yellow-600 font-semibold" : "text-red-600 font-semibold"}>
                        {member.performance >= 90 ? "Excellent" :
                          member.performance >= 80 ? "Good" : "Needs Improvement"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};