import React, { useState, useEffect } from 'react';

/* global Html5QrcodeScanner, L */


        const API_BASE_URL = 'https://bpost-api-vercel-fixed.vercel.app';
        const API_ENDPOINTS = {
            login: `${API_BASE_URL}/api/auth/login`,
            register: `${API_BASE_URL}/api/auth/register`,
            verify: `${API_BASE_URL}/api/auth/verify`,
            employees: `${API_BASE_URL}/api/employees`,
            locations: `${API_BASE_URL}/api/locations`,
            timesheets: `${API_BASE_URL}/api/timesheets`,
            adjustments: `${API_BASE_URL}/api/adjustments`,
            vehicles: `${API_BASE_URL}/api/vehicles`,
            agents: `${API_BASE_URL}/api/agents`,
            agentCollections: `${API_BASE_URL}/api/agent-collections`,
                iraqPay: `${API_BASE_URL}/api/iraq-pay`,
            expenses: `${API_BASE_URL}/api/expenses`,
        };

        const getAuthToken = () => localStorage.getItem('auth_token');
        const setAuthToken = (token) => localStorage.setItem('auth_token', token);
        const clearAuthToken = () => localStorage.removeItem('auth_token');

        async function apiCall(endpoint, options = {}) {
            const token = getAuthToken();
            const headers = {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            };

            try {
                const response = await fetch(endpoint, {
                  ...options,
                  headers,
                });

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(data.error || 'API request failed');
                }

                return data;
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }

        const Clock = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
        );

        const Users = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
        );

        const Calendar = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        );

        const PoundSign = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M3 21h18M5 21V10a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v3M5 14h8"></path>
            </svg>
        );

        const BarChart3 = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
        );

        const LogIn = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
        );

        const LogOut = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
        );

        const UserPlus = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
        );

        const CheckCircle = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        );

        const XCircle = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
        );

        const Edit2 = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
        );

        const Save = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
        );

        const MapPin = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
        );

        const QrCode = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
            </svg>
        );

        const Camera = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
            </svg>
        );

        const Navigation = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
        );

        const Plus = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        );

        const X = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        );

        const Trash2 = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
        );

        const Shield = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
        );

        const ClipboardEdit = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                <path d="M12 12h.01M12 16h.01M16 12l-4 4m0-4l4 4"></path>
            </svg>
        );

        const ClipboardList = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <line x1="9" y1="12" x2="15" y2="12"></line>
                <line x1="9" y1="16" x2="15" y2="16"></line>
            </svg>
        );

        const UserCog = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <path d="M20 8v6M23 11h-6"></path>
            </svg>
        );

        const FileText = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        );

        const Download = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
        );

        const DollarSign = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        );

        const Receipt = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path>
                <path d="M16 8H8M16 12H8M12 16H8"></path>
            </svg>
        );

        const Truck = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                <path d="M16 8h4l3 5v3h-7V8z"></path>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
        );

        const Building = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M3 21h18M6 21V7l6-4 6 4v14M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01M9 17h.01M12 17h.01M15 17h.01"></path>
            </svg>
        );

        const Car = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h10l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"></path>
                <circle cx="7.5" cy="17.5" r="2.5"></circle>
                <circle cx="16.5" cy="17.5" r="2.5"></circle>
            </svg>
        );

        const Search = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        );

        const TrendingUp = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
        );

        const TrendingDown = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
            </svg>
        );

        const Gift = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="20 12 20 22 4 22 4 12"></polyline>
                <rect x="2" y="7" width="20" height="5"></rect>
                <line x1="12" y1="22" x2="12" y2="7"></line>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
        );

        const Heart = ({ className = "w-6 h-6" }) => (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        );

        export default function EmployeeTimesheetApp() {
            const [currentView, setCurrentView] = useState('login');
            const [currentUser, setCurrentUser] = useState(null);

            const getInitialEmployees = () => {
                return [
                  {
                   id: 1,
                   employeeId: 'EMP001',
                   firstName: 'John',
                   lastName: 'Smith',
                   email: 'john.smith@company.com',
                   department: 'Engineering',
                   position: 'Senior Developer',
                   password: 'employee123',
                   isAdmin: false,
                   hourlyRate: 45.00,
                   assignedLocations: [1]
                  },
                  {
                   id: 2,
                   employeeId: 'ADM001',
                   firstName: 'Sarah',
                  lastName: 'Johnson',
                  email: 'sarah.johnson@company.com',
                  department: 'Administration',
                  position: 'HR Manager',
                  password: 'admin123',
                  isAdmin: true,
                  hourlyRate: 55.00,
                  assignedLocations: [1, 2],
                  adminPermissions: {
                   canManageEmployees: true,
                   canApproveTimesheets: true,
                   canManageLocations: true,
                   canSetRates: true,
                   canCreateAdmins: true,
                   canManageAdminPermissions: true,
                   canViewPayroll: true,
                   canManageAgentCollections: true,
                   canManageAgents: true,
                   canViewCompanyAccounting: true,
                   canDeleteEmployees: true,
                   canAddEmployeeHours: true,
                   canDeleteAgentCollections: true
                  }
                }
            ];
            };

            const [employees, setEmployees] = useState(getInitialEmployees);

            useEffect(() => {
                const token = getAuthToken();
                if (token) {

                  apiCall(API_ENDPOINTS.verify, { method: 'POST' })
                   .then(data => {
                  if (data && data.success && data.user) {
                   const u = data.user;
                   setCurrentUser({
                  id: u.id || u.Id,
                  employeeId: u.employeeId || u.EmployeeId || '',
                  firstName: u.firstName || u.FirstName || '',
                  lastName: u.lastName || u.LastName || '',
                  email: u.email || u.Email || '',
                  department: u.department || u.Department || '',
                  position: u.position || u.Position || '',
                  isAdmin: u.isAdmin || u.IsAdmin || false,
                  hourlyRate: u.hourlyRate || u.HourlyRate || 0,
                  assignedLocations: u.assignedLocations || u.AssignedLocations || [],
                  adminPermissions: parsePermissions(u.adminPermissions || u.AdminPermissions)
                   });
                   const isAdmin = u.isAdmin || u.IsAdmin || false;
                   setCurrentView(isAdmin ? 'admin-dashboard' : 'employee-dashboard');
                   loadEmployeesFromAPI();
                   loadLocationsFromAPI();
                   loadTimesheetsFromAPI();
                   loadAdjustmentsFromAPI();
                   loadVehiclesFromAPI();
                   loadExpensesFromAPI();
                   loadAgentsFromAPI();
                   loadIraqPaymentsFromAPI();
                   loadAgentCollectionsFromAPI();
                   loadMyAgentsFromAPI();
                  } else {
                   clearAuthToken();
                  }
                   })
                   .catch(() => clearAuthToken());
                }
            }, []);

            useEffect(() => {
                if (currentUser && currentUser.id) {
                  loadMyAgentsFromAPI();
                }
            }, [currentUser?.id]);

            const getInitialLocations = () => {
                return [
                  {
                   id: 1,
                   name: 'Main Office',
                   address: '123 Business Park, Downtown',
                   latitude: 40.7589,
                   longitude: -73.9851,
                   qrCode: 'LOC-MAIN-001',
                   radius: 100,
                   active: true
                },
                {
                  id: 2,
                  name: 'Warehouse District',
                  address: '456 Industrial Ave, West Side',
                  latitude: 40.7489,
                  longitude: -73.9951,
                  qrCode: 'LOC-WARE-002',
                  radius: 150,
                  active: true
                }
            ];
            };

            const [workLocations, setWorkLocations] = useState(getInitialLocations);

            const loadLocationsFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.locations);
                  if (data.success) {

                   const mappedLocations = data.locations.map(loc => ({
                  id: loc.Id,
                  name: loc.Name,
                  address: loc.Address || '',
                  latitude: loc.Latitude,
                  longitude: loc.Longitude,
                  qrCode: loc.QRCode,
                  radius: loc.Radius,
                  active: loc.IsActive
                   }));
                   setWorkLocations(mappedLocations);

                  }
                } catch (error) {
                  console.error('Failed to load locations from API:', error);

                }
            };

            useEffect(() => {
                const token = getAuthToken();
                if (token) {
                  loadLocationsFromAPI();
                }
            }, []);

            useEffect(() => {

            }, [workLocations]);

            const getInitialTimesheets = () => {
                return [
                  {
                   id: 1,
                   employeeId: 1,
                   date: '2026-02-08',
                   startTime: '09:00',
                   finishTime: '17:30',
                   regularHours: 8.0,
                   overtimeHours: 0.5,
                   status: 'approved',
                   notes: 'Standard shift with project deadline overtime',
                   locationId: 1,
                   checkInLocation: { lat: 40.7589, lng: -73.9851 },
                  checkOutLocation: { lat: 40.7590, lng: -73.9850 }
                },
                {
                  id: 2,
                  employeeId: 1,
                  date: '2026-02-07',
                  startTime: '09:00',
                  finishTime: '17:00',
                  regularHours: 8.0,
                  overtimeHours: 0,
                  status: 'approved',
                  notes: 'Regular shift',
                  locationId: 1,
                  checkInLocation: { lat: 40.7589, lng: -73.9851 },
                  checkOutLocation: { lat: 40.7589, lng: -73.9852 }
                }
            ];
            };

            const [timesheets, setTimesheets] = useState(getInitialTimesheets);

            useEffect(() => {

            }, [timesheets]);

            const getInitialNewTimesheet = () => {
                const today = new Date().toISOString().split('T')[0];
                const saved = localStorage.getItem('bpost_current_timesheet');
                if (saved) {
                  try {
                   const parsed = JSON.parse(saved);
                   if (parsed.date === today) return parsed;
                  } catch(e) {}
                }
                return { date: today, startTime: '', finishTime: '', notes: '', locationId: null, checkInLocation: null, checkOutLocation: null };
            };

            const [newTimesheet, setNewTimesheet] = useState(getInitialNewTimesheet);

            useEffect(() => {
                localStorage.setItem('bpost_current_timesheet', JSON.stringify(newTimesheet));
            }, [newTimesheet]);

            const [scanningMode, setScanningMode] = useState(null);
            const [scannedQR, setScannedQR] = useState('');
            const [currentLocation, setCurrentLocation] = useState(null);
            const [showLocationManager, setShowLocationManager] = useState(false);
            const [showBreakModal, setShowBreakModal] = useState(false);
            const [pendingBreakMinutes, setPendingBreakMinutes] = useState('');
            const [isSubmittingTimesheet, setIsSubmittingTimesheet] = useState(false);
            const [vehicles, setVehicles] = useState([]);
            const [showVehicleManager, setShowVehicleManager] = useState(false);
            const [showBranchManager, setShowBranchManager] = useState(false);
            const [navOpen, setNavOpen] = useState('');
            const [agents, setAgents] = useState([]);
            const [agentCollections, setAgentCollections] = useState([]);
            const [showAgentManager, setShowAgentManager] = useState(false);
            const [showAgentReport, setShowAgentReport] = useState(false);
            const [showIraqPay, setShowIraqPay] = useState(false);
            const [iraqPayments, setIraqPayments] = useState([]);
            const [iraqPayState, setIraqPayState] = useState({ activeTab:'view', batchName:'', empId:'', filterEmp:'', filterStatus:'all', previewRows:[] });
            const [agentReportState, setAgentReportState] = useState({ fromDate: new Date().toISOString().slice(0,8)+'01', toDate: new Date().toISOString().split('T')[0], empFilter:'', branchFilter:'', countryFilter:'', reportData:null, showAddForm:false });
            const [showAgentCollectionForm, setShowAgentCollectionForm] = useState(false);
            const [showAccountCredit, setShowAccountCredit] = useState(false);
            const [accountCreditDate, setAccountCreditDate] = useState(new Date().toISOString().split('T')[0]);
            const [accountCreditSaving, setAccountCreditSaving] = useState(false);
            const accountCreditAmountRef = React.useRef(null);
            const accountCreditNoteRef = React.useRef(null);
            const [myAgents, setMyAgents] = useState([]);
            const [expenses, setExpenses] = useState([]);
            const [showExpenseManager, setShowExpenseManager] = useState(false);
            const [showExpenseReport, setShowExpenseReport] = useState(false);
            const [expReportState, setExpReportState] = useState({ fromDate: new Date().toISOString().slice(0,8)+'01', toDate: new Date().toISOString().split('T')[0], empFilter:'', branchFilter:'', reportData:null });
            const [showExpenseForm, setShowExpenseForm] = useState(false);
            const [branchList, setBranchList] = useState([]);

            useEffect(() => {

                const fromEmployees = [];
                employees.forEach(function(emp) {
                  (emp.branches || []).forEach(function(b) {
                  if (b && !fromEmployees.includes(b)) fromEmployees.push(b);
                  });
                });
                if (fromEmployees.length > 0) {
                  const merged = [...new Set([...fromEmployees, ...branchList])].sort();
                  if (merged.join(',') !== branchList.join(',')) {
                  setBranchList(merged);

                  }
                }
            }, [employees]);
            const [showAdminManager, setShowAdminManager] = useState(false);
            const [showManualEntry, setShowManualEntry] = useState(false);
            const [showEmployeeManager, setShowEmployeeManager] = useState(false);
            const [showReportGenerator, setShowReportGenerator] = useState(false);
            const [reportGenState, setReportGenState] = useState({ startDate: (() => { const d=new Date(); d.setDate(d.getDate()-7); return d.toISOString().split('T')[0]; })(), endDate: new Date().toISOString().split('T')[0], selectedDepartment:'all', selectedEmployee:'all', selectedBranch:'all', selectedCountry:'all', reportType:'summary', generatedReport:null, expandedEmp:null });
            const [showFinancialManager, setShowFinancialManager] = useState(false);
            const [financialMgrState, setFinancialMgrState] = useState({ activeTab: 'add', adjustmentType: 'bonus', adjustmentData: { employeeId:'', type:'bonus', amount:'', reason:'', date: new Date().toISOString().split('T')[0], hours:'' } });
            const [showEmployeeAccounting, setShowEmployeeAccounting] = useState(false);
            const [empAccountingState, setEmpAccountingState] = useState({ empId: '', fromDate: new Date().toISOString().slice(0,8)+'01', toDate: new Date().toISOString().split('T')[0], report: null });
            const [showCompanyAccounting, setShowCompanyAccounting] = useState(false);
            const [companyAcctState, setCompanyAcctState] = useState({ fromDate: new Date().toISOString().slice(0,8)+'01', toDate: new Date().toISOString().split('T')[0], branchFilter:'', countryFilter:'', report:null, collapsed:{collections:false,payroll:false,expenses:false,summary:false} });
            const [showPayrollSettings, setShowPayrollSettings] = useState(false);
            const [showAnnualLeave, setShowAnnualLeave] = useState(false);
            const [showChangePassword, setShowChangePassword] = useState(false);

            const getPayrollSettings = () => {
                try {
                  const saved = localStorage.getItem('bpost_payroll_settings');
                  return saved ? JSON.parse(saved) : { regularHoursThreshold: 8, overtimeMultiplier: 1.5, breakRules: [] };
                } catch(e) { return { regularHoursThreshold: 8, overtimeMultiplier: 1.5, breakRules: [] }; }
            };
            const [payrollSettings, setPayrollSettings] = useState(getPayrollSettings);
            useEffect(() => {
                localStorage.setItem('bpost_payroll_settings', JSON.stringify(payrollSettings));
            }, [payrollSettings]);

            const [financialAdjustments, setFinancialAdjustments] = useState([]);

            const loadAdjustmentsFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.adjustments);
                  if (data.success && data.adjustments) {
                   const mapped = data.adjustments.map(a => ({
                  id: a.Id || a.id,
                  employeeId: a.EmployeeId || a.employeeId,
                  employeeName: `${a.FirstName || ''} ${a.LastName || ''}`.trim(),
                  type: (a.Type || a.type || '').toLowerCase(),
                  amount: parseFloat(a.Amount || a.amount || 0),
                  reason: a.Reason || a.reason || '',
                  date: (a.Date || a.date || '').split('T')[0],
                  hours: a.Hours || a.hours || null,
                  createdBy: a.CreatedBy || a.createdBy || '',
                  createdAt: a.CreatedAt || a.createdAt || ''
                   }));
                   setFinancialAdjustments(mapped);
                  }
                } catch (error) {
                  console.error('Failed to load adjustments:', error);
                }
            };

            const loadExpensesFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.expenses);
                  if (data.success && data.expenses) {
                   const mapped = data.expenses.map(e => ({
                  id: e.Id || e.id,
                  employeeId: e.EmployeeId || e.employeeId,
                  employeeName: `${e.FirstName||''} ${e.LastName||''}`.trim(),
                  employeeCode: e.EmployeeCode || e.employeeCode || '',
                  date: (e.Date || e.date || '').split('T')[0],
                  category: e.Category || e.category || '',
                  description: e.Description || e.description || '',
                  amount: parseFloat(e.Amount || e.amount || 0),
                  currency: e.Currency || e.currency || 'GBP',
                  receiptNote: e.ReceiptNote || e.receiptNote || '',
                  receiptImage: e.ReceiptImage || e.receiptImage || null,
                  status: (e.Status || e.status || 'pending').toLowerCase(),
                  paidAt: e.PaidAt || e.paidAt || null,
                  paidBy: e.PaidBy || e.paidBy || '',
                  notes: e.Notes || e.notes || '',
                  createdAt: e.CreatedAt || e.createdAt || '',
                   }));
                   setExpenses(mapped);
                  }
                } catch (error) { console.error('Failed to load expenses:', error); }
            };

            const handleQuickExpenseAction = async (expId, status) => {
                try {
                  const data = await apiCall(`${API_ENDPOINTS.expenses}/${expId}`, {
                   method: 'PUT',
                   body: JSON.stringify({ status })
                  });
                  if (data.success) loadExpensesFromAPI();
                  else alert('Error: ' + data.error);
                } catch(e) { alert('Failed: ' + e.message); }
            };

            const loadAgentsFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.agents);
                  if (data.success) {
                   setAgents((data.agents || []).map(function(a) {
                  return {
                   id: a.Id || a.id,
                   agentCode: a.AgentCode || a.agentCode || '',
                   city: a.City || a.city || '',
                   country: a.Country || a.country || '',
                   notes: a.Notes || a.notes || '',
                   isActive: a.IsActive !== undefined ? a.IsActive : true,
                   assignedEmployees: (a.assignedEmployees || []).map(function(e) {
                  return { id: e.id, name: e.name, code: e.code };
                   })
                  };
                   }));
                  }
                } catch(e) { console.error('Failed to load agents:', e); }
            };

            const loadMyAgentsFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.agents + '/my');
                  if (data.success) {
                   setMyAgents((data.agents || []).map(function(a) {
                  return {
                   id: a.Id || a.id,
                   agentCode: a.AgentCode || a.agentCode || '',
                   city: a.City || a.city || '',
                   country: a.Country || a.country || '',
                   notes: a.Notes || a.notes || ''
                  };
                   }));
                  }
                } catch(e) { console.error('Failed to load my agents:', e); }
            };

            const loadIraqPaymentsFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.iraqPay);
                  if (data.success) setIraqPayments(data.payments.map(function(p){return{
                   id:p.Id, batchName:p.BatchName, shipmentCode:p.ShipmentCode,
                   employeeId:p.EmployeeId, employeeName:(p.FirstName?p.FirstName+' '+p.LastName:''),
                   employeeCode:p.EmployeeCode,
                   amountIQD:parseFloat(p.AmountIQD)||0, amountUSD:parseFloat(p.AmountUSD)||0,
                   amountGBP:parseFloat(p.AmountGBP)||0, amountEUR:parseFloat(p.AmountEUR)||0,
                   collectedIQD:parseFloat(p.CollectedIQD)||0, collectedUSD:parseFloat(p.CollectedUSD)||0,
                   collectedGBP:parseFloat(p.CollectedGBP)||0, collectedEUR:parseFloat(p.CollectedEUR)||0,
                   status:p.Status, notes:p.Notes, createdAt:p.CreatedAt, collectedAt:p.CollectedAt
                  };}));
                } catch(e) { console.error('loadIraqPay error:',e); }
            };

            const loadAgentCollectionsFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.agentCollections);
                  if (data.success) {
                   setAgentCollections((data.collections || []).map(function(c) {
                  return {
                   id: c.Id, employeeId: c.EmployeeId,
                   employeeName: (c.FirstName||'') + ' ' + (c.LastName||''),
                   employeeCode: c.EmployeeCode||'',
                   agentId: c.AgentId, agentCode: c.AgentCode||'', agentCity: c.City||'',
                   date: (c.Date||'').split('T')[0],
                   fromCode: c.FromCode||'', toCode: c.ToCode||'',
                   amountCollected: parseFloat(c.AmountCollected||0),
                   amountPaid: parseFloat(c.AmountPaid||0),
                   bankAmount: parseFloat(c.BankAmount||0),
                   boxesQty: parseInt(c.BoxesQty||0),
                   currency: c.Currency||'GBP',
                   notes: c.Notes||''
                  };
                   }));
                  }
                } catch(e) { console.error('Failed to load collections:', e); }
            };

            const loadVehiclesFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.vehicles);
                  if (data.success && data.vehicles) {
                   const mapped = data.vehicles.map(v => ({
                  id: v.Id || v.id,
                  plateNumber: v.PlateNumber || v.plateNumber || '',
                  mark: v.Mark || v.mark || '',
                  model: v.Model || v.model || '',
                  mileage: v.Mileage || v.mileage || 0,
                  motExpiry: (v.MOTExpiry || v.motExpiry || '').split('T')[0] || '',
                  roadTaxExpiry: (v.RoadTaxExpiry || v.roadTaxExpiry || '').split('T')[0] || '',
                  insuranceExpiry: (v.InsuranceExpiry || v.insuranceExpiry || '').split('T')[0] || '',
                  assignedDriverId: v.AssignedDriverId || v.assignedDriverId || null,
                  driverName: v.FirstName ? `${v.FirstName} ${v.LastName}` : '',
                  driverCode: v.DriverCode || '',
                  lastServiceDate: (v.LastServiceDate || v.lastServiceDate || '').split('T')[0] || '',
                  nextServiceDate: (v.NextServiceDate || v.nextServiceDate || '').split('T')[0] || '',
                  notes: v.Notes || v.notes || '',
                   }));
                   setVehicles(mapped);
                  }
                } catch (error) { console.error('Failed to load vehicles:', error); }
            };

            useEffect(() => {
                const handleVisibilityChange = () => {
                  if (document.visibilityState === 'visible' && currentUser) {
                   loadTimesheetsFromAPI();
                   loadAdjustmentsFromAPI();
                   loadIraqPaymentsFromAPI();
                  }
                };
                document.addEventListener('visibilitychange', handleVisibilityChange);
                return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
            }, [currentUser]);

            // Auto-refresh timesheets every 60s so Currently Working stays live
            useEffect(() => {
                if (!currentUser) return;
                const interval = setInterval(() => {
                  if (document.visibilityState === 'visible') {
                   loadTimesheetsFromAPI();
                   loadIraqPaymentsFromAPI();
                  }
                }, 60000);
                return () => clearInterval(interval);
            }, [currentUser]);

            const [manualEntryData, setManualEntryData] = useState({
                employeeId: '',
                date: new Date().toISOString().split('T')[0],
                startTime: '',
                finishTime: '',
                locationId: '',
                notes: '',
                status: 'approved'
            });
            const [newLocation, setNewLocation] = useState({
                name: '',
                address: '',
                latitude: '',
                longitude: '',
                radius: 100
            });

            const getCurrentPosition = () => {
                return new Promise((resolve, reject) => {
                  if (!navigator.geolocation) {
                   reject(new Error('Geolocation is not supported by your browser'));
                   return;
                  }

                  navigator.geolocation.getCurrentPosition(
                   (position) => {
                  resolve({
                   lat: position.coords.latitude,
                   lng: position.coords.longitude,
                   accuracy: position.coords.accuracy
                  });
                   },
                   (error) => {
                  reject(error);
                   },
                   {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 0
                   }
                  );
                });
            };

            const calculateDistance = (lat1, lon1, lat2, lon2) => {
                const R = 6371e3;
                const φ1 = lat1 * Math.PI / 180;
                const φ2 = lat2 * Math.PI / 180;
                const Δφ = (lat2 - lat1) * Math.PI / 180;
                const Δλ = (lon2 - lon1) * Math.PI / 180;

                const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                   Math.cos(φ1) * Math.cos(φ2) *
                   Math.sin(Δλ/2) * Math.sin(Δλ/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                return R * c;
            };

            const verifyLocation = async (qrCode) => {
                try {
                  const position = await getCurrentPosition();
                  setCurrentLocation(position);

                  const location = workLocations.find(loc => loc.qrCode === qrCode && loc.active);

                  if (!location) {
                   return { verified: false, error: 'Invalid or inactive QR code' };
                  }

                  if (currentUser && currentUser.assignedLocations && !currentUser.assignedLocations.includes(location.id)) {
                   return {
                  verified: false,
                  error: `You are not authorized to check in at ${location.name}. Please contact your administrator.`
                   };
                  }

                  const distance = calculateDistance(
                   position.lat,
                   position.lng,
                   location.latitude,
                   location.longitude
                  );

                  if (distance <= location.radius) {
                   return {
                  verified: true,
                  location: location,
                  distance: Math.round(distance),
                  position: position
                   };
                  } else {
                   return {
                  verified: false,
                  error: `You are ${Math.round(distance)}m away from ${location.name}. Please be within ${location.radius}m.`,
                  distance: Math.round(distance)
                   };
                  }
                } catch (error) {
                  return { verified: false, error: 'Unable to get your location. Please enable location services.' };
                }
            };

            const handleQRScan = async (qrCode, mode) => {
                const verification = await verifyLocation(qrCode);

                if (verification.verified) {
                  const currentTime = new Date().toTimeString().slice(0, 5);
                  const today = new Date().toISOString().split('T')[0];

                  if (mode === 'checkin') {
                   setNewTimesheet({
                  ...newTimesheet,
                  startTime: currentTime,
                  locationId: verification.location.id,
                  checkInLocation: { ...verification.position, locationName: verification.location.name }
                   });

                   try {
                  const checkInData = {
                   date: today,
                   startTime: currentTime,
                   locationId: verification.location.id,
                   checkInLat: verification.position?.lat || null,
                   checkInLng: verification.position?.lng || null,
                   checkInLocation: verification.location.name,
                   status: 'checkedin'
                  };
                  const resp = await apiCall(API_ENDPOINTS.timesheets, {
                   method: 'POST',
                   body: JSON.stringify(checkInData)
                  });
                  if (resp.success && resp.timesheet) {
                   localStorage.setItem('bpost_active_checkin_id', resp.timesheet.id || resp.timesheet.Id);
                   await loadTimesheetsFromAPI();
                  }
                   } catch(e) { console.error('Failed to save check-in:', e); }
                   alert(`✓ Check-in successful at ${verification.location.name}\nTime: ${currentTime}\nDistance: ${verification.distance}m from location center`);
                  } else {
                   setNewTimesheet({
                  ...newTimesheet,
                  finishTime: currentTime,
                  checkOutLocation: { ...verification.position, locationName: verification.location.name }
                   });

                   const activeId = localStorage.getItem('bpost_active_checkin_id');
                   if (activeId) {
                  try {
                   await apiCall(API_ENDPOINTS.timesheets + '/' + activeId, {
                    method: 'PUT',
                    body: JSON.stringify({
                     finishTime: currentTime,
                     checkOutLat: verification.position?.lat || null,
                     checkOutLng: verification.position?.lng || null,
                     checkOutLocation: verification.location.name
                    })
                   });
                   localStorage.removeItem('bpost_active_checkin_id');
                   await loadTimesheetsFromAPI();
                  } catch(e) { console.error('Failed to update checkout:', e); }
                   }
                   alert(`✓ Check-out successful at ${verification.location.name}\nTime: ${currentTime}\nDistance: ${verification.distance}m from location center`);
                  }

                  setScanningMode(null);
                  setScannedQR('');
                } else {
                  alert(`❌ Location Verification Failed\n\n${verification.error}`);
                }
            };

            const generateQRCode = (qrData) => {
                return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
            };

            const printLocationQR = (location) => {
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(location.qrCode)}`;
                const win = window.open('', '_blank');
                win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>QR Code - ${location.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .card { border: 4px solid #1e3a8a; border-radius: 20px; padding: 40px; text-align: center; max-width: 600px; width: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .logo { font-size: 48px; font-weight: 900; color: #dc2626; letter-spacing: -2px; margin-bottom: 8px; }
    .subtitle { font-size: 16px; color: #6b7280; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 2px; }
    .location-name { font-size: 32px; font-weight: 700; color: #1e3a8a; margin-bottom: 8px; }
    .address { font-size: 16px; color: #6b7280; margin-bottom: 30px; }
    img { width: 400px; height: 400px; border: 2px solid #e5e7eb; border-radius: 12px; }
    .instruction { margin-top: 24px; font-size: 20px; font-weight: 600; color: #374151; }
    .instruction-sub { margin-top: 8px; font-size: 14px; color: #9ca3af; }
    @media print {
      body { padding: 0; }
      .card { border: 4px solid #1e3a8a; box-shadow: none; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">B-post</div>
    <div class="subtitle">Brayn International Logistics Services</div>
    <div class="location-name">${location.name}</div>
    <div class="address">${location.address || ''}</div>
    <img src="${qrUrl}" alt="QR Code" />
    <div class="instruction">📱 Scan to Check In / Check Out</div>
    <div class="instruction-sub">Point your camera at this QR code when starting or finishing your shift</div>
  </div>
  <br/>
  <button class="no-print" onclick="window.print()" style="padding:12px 32px;font-size:18px;background:#1e3a8a;color:#fff;border:none;border-radius:8px;cursor:pointer;margin-top:16px;">
    🖨️ Print
  </button>
</body>
</html>`);
                win.document.close();
            };

            const handleAddLocation = async () => {
                if (!newLocation.name || !newLocation.latitude || !newLocation.longitude) {
                  alert('Please provide all required location details');
                  return;
                }

                const qrCode = `LOC-${newLocation.name.substring(0, 4).toUpperCase()}-${String(workLocations.length + 1).padStart(3, '0')}`;

                try {
                  const data = await apiCall(API_ENDPOINTS.locations, {
                   method: 'POST',
                   body: JSON.stringify({
                  name: newLocation.name,
                  address: newLocation.address || '',
                  latitude: parseFloat(newLocation.latitude),
                  longitude: parseFloat(newLocation.longitude),
                  qrCode: qrCode,
                  radius: parseInt(newLocation.radius) || 100
                   }),
                  });

                  if (data.success) {
                   await loadLocationsFromAPI();
                   setNewLocation({ name: '', address: '', latitude: '', longitude: '', radius: 100 });
                   alert(`Location "${newLocation.name}" added successfully!\nQR Code: ${qrCode}`);
                  }
                } catch (error) {
                  console.error('Failed to add location:', error);
                  alert('Failed to add location: ' + error.message);
                }
            };

            const toggleLocationStatus = async (locationId) => {
                try {
                  const location = workLocations.find(loc => loc.id === locationId);
                  if (!location) return;

                  const data = await apiCall(`${API_ENDPOINTS.locations}/${locationId}`, {
                   method: 'PUT',
                   body: JSON.stringify({
                  name: location.name,
                  address: location.address,
                  latitude: location.latitude,
                  longitude: location.longitude,
                  qrCode: location.qrCode,
                  radius: location.radius,
                  isActive: !location.active
                   }),
                  });

                  if (data.success) {
                   await loadLocationsFromAPI();
                  }
                } catch (error) {
                  console.error('Failed to update location:', error);

                  setWorkLocations(workLocations.map(loc =>
                   loc.id === locationId ? { ...loc, active: !loc.active } : loc
                  ));
                }
            };

            const deleteLocation = async (locationId) => {
                if (!window.confirm('Are you sure you want to delete this location?')) {
                  return;
                }

                try {
                  const data = await apiCall(`${API_ENDPOINTS.locations}/${locationId}`, {
                   method: 'DELETE'
                  });

                  if (data.success) {
                   await loadLocationsFromAPI();
                   alert('Location deleted successfully');
                  }
                } catch (error) {
                  console.error('Failed to delete location:', error);
                  alert('Failed to delete location: ' + error.message);
                }
            };

            const calculateHours = (startTime, finishTime, employeeId) => {
                if (!startTime || !finishTime) return { regular: 0, overtime: 0 };

                const start = new Date(`2000-01-01T${startTime}`);
                const finish = new Date(`2000-01-01T${finishTime}`);
                let totalHours = (finish - start) / (1000 * 60 * 60);

                if (totalHours < 0) totalHours += 24;

                const emp = employeeId ? employees.find(e => e.id === employeeId) : null;
                const threshold = (emp && emp.standardHours) ? emp.standardHours : payrollSettings.regularHoursThreshold;
                const regularHours = Math.min(totalHours, threshold);
                const overtimeHours = Math.max(totalHours - threshold, 0);

                return {
                  regular: parseFloat(regularHours.toFixed(2)),
                  overtime: parseFloat(overtimeHours.toFixed(2))
                };
            };

            const getAutoBreakMinutes = (totalHours) => {
                const rules = (payrollSettings.breakRules || [])
                  .filter(r => totalHours >= r.afterHours)
                  .sort((a, b) => b.afterHours - a.afterHours);
                return rules.length > 0 ? rules[0].breakMinutes : 0;
            };

            const getCurrencySymbol = (code) => {
                const symbols = { GBP: '£', USD: '$', EUR: '€', IQD: 'IQD ' };
                return symbols[code] || '£';
            };

            const getEmployeeCurrency = (employeeId) => {
                const emp = employees.find(e => e.id === employeeId);
                return emp ? getCurrencySymbol(emp.currency || 'GBP') : '£';
            };

            const extractTime = (val) => {
                if (!val) return '';
                if (val.includes('T')) return val.split('T')[1].substring(0, 5);
                return val.substring(0, 5);
            };

            const parsePermissions = (p) => {
                try { if (!p) return {}; return typeof p === "string" ? JSON.parse(p) : p; } catch(e) { return {}; }
            };

            const loadTimesheetsFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.timesheets);
                  if (data.success && data.timesheets) {
                   const mapped = data.timesheets.map(ts => ({
                  id: ts.Id || ts.id,
                  employeeId: ts.EmployeeId || ts.employeeId,
                  date: (ts.Date || ts.date || '').split('T')[0],
                  startTime: extractTime(ts.StartTime || ts.startTime || ts.CheckInTime || ts.checkInTime || ''),
                  finishTime: extractTime(ts.FinishTime || ts.finishTime || ts.CheckOutTime || ts.checkOutTime || ''),
                  regularHours: parseFloat(ts.RegularHours || ts.regularHours || 0),
                  overtimeHours: parseFloat(ts.OvertimeHours || ts.overtimeHours || 0),
                  status: (ts.Status || ts.status || 'pending').toLowerCase(),
                  notes: ts.Notes || ts.notes || '',
                  locationId: ts.LocationId || ts.locationId || null,
                  locationName: ts.LocationName || ts.locationName || null,
                  checkInLocation: ts.CheckInLocation || ts.checkInLocation || null,
                  checkOutLocation: ts.CheckOutLocation || ts.checkOutLocation || null,
                  breakMinutes: ts.BreakMinutes || ts.breakMinutes || 0,
                  manualEntry: ts.ManualEntry || ts.manualEntry || false
                   }));
                   setTimesheets(mapped);

                  }
                } catch (error) {
                  console.error('Failed to load timesheets:', error);
                }
            };

            const handleLogin = async (email, password) => {
                try {
                  const data = await apiCall(API_ENDPOINTS.login, {
                   method: 'POST',
                   body: JSON.stringify({ email, password }),
                  });

                  if (data && data.success && data.user) {
                   setAuthToken(data.token);

                   const mappedUser = {
                  id: data.user.Id || data.user.id,
                  employeeId: data.user.EmployeeId || data.user.employeeId || '',
                  firstName: data.user.FirstName || data.user.firstName || '',
                  lastName: data.user.LastName || data.user.lastName || '',
                  email: data.user.Email || data.user.email || '',
                  department: data.user.Department || data.user.department || '',
                  position: data.user.Position || data.user.position || '',
                  isAdmin: data.user.IsAdmin || data.user.isAdmin || false,
                  hourlyRate: data.user.HourlyRate || data.user.hourlyRate || 0,
                  country: data.user.Country || data.user.country || '',
                  currency: data.user.Currency || data.user.currency || 'GBP',
                  assignedLocations: data.user.AssignedLocations || data.user.assignedLocations || [],
                  adminPermissions: parsePermissions(data.user.AdminPermissions || data.user.adminPermissions)
                   };
                   setCurrentUser(mappedUser);
                   setCurrentView(mappedUser.isAdmin ? 'admin-dashboard' : 'employee-dashboard');

                   setTimeout(() => {
                  loadEmployeesFromAPI();
                  loadLocationsFromAPI();
                  loadTimesheetsFromAPI();
                  loadAdjustmentsFromAPI();
                   }, 100);

                   return true;
                  }
                  return false;
                } catch (error) {
                  console.error('Login failed:', error);
                  alert('Login failed: ' + error.message);
                  return false;
                }
            };

            const handleChangePassword = async (currentPassword, newPassword) => {
                try {
                  const data = await apiCall(`${API_ENDPOINTS.employees}/${currentUser.id}`, {
                   method: 'PUT',
                   body: JSON.stringify({ currentPassword, password: newPassword })
                  });
                  if (!data.success) throw new Error(data.error || 'Failed to change password');
                  return { success: true };
                } catch (error) {
                  return { success: false, error: error.message };
                }
            };

            const handleAdminResetPassword = async (employeeId, newPassword) => {
                try {
                  const data = await apiCall(`${API_ENDPOINTS.employees}/${employeeId}`, {
                   method: 'PUT',
                   body: JSON.stringify({ password: newPassword })
                  });
                  if (!data.success) throw new Error(data.error || 'Failed to reset password');
                  return { success: true };
                } catch (error) {
                  return { success: false, error: error.message };
                }
            };

            const handleLogout = () => {
                clearAuthToken();
                setCurrentUser(null);
                setCurrentView('login');
            };

            const handleRegisterEmployee = async (employeeData) => {
                try {
                  const data = await apiCall(API_ENDPOINTS.register, {
                   method: 'POST',
                   body: JSON.stringify({
                  firstName: employeeData.firstName,
                  lastName: employeeData.lastName,
                  email: employeeData.email,
                  password: employeeData.password,
                  department: employeeData.department || '',
                  position: employeeData.position || '',
                  country: employeeData.country || '',
                  hourlyRate: employeeData.hourlyRate || 0,
                   }),
                  });

                  if (data.success) {
                   setAuthToken(data.token);
                   const u = data.user;

                   const mappedUser = {
                  id: u.id || u.Id,
                  employeeId: u.employeeId || u.EmployeeId || '',
                  firstName: u.firstName || u.FirstName || '',
                  lastName: u.lastName || u.LastName || '',
                  email: u.email || u.Email || '',
                  department: u.department || u.Department || '',
                  position: u.position || u.Position || '',
                  isAdmin: u.isAdmin || u.IsAdmin || false,
                  hourlyRate: u.hourlyRate || u.HourlyRate || 0,
                  country: u.country || u.Country || '',
                  currency: u.currency || u.Currency || 'GBP',
                  assignedLocations: u.assignedLocations || u.AssignedLocations || [],
                  adminPermissions: parsePermissions(u.adminPermissions || u.AdminPermissions)
                   };
                   setCurrentUser(mappedUser);
                   setCurrentView('employee-dashboard');

                   await loadEmployeesFromAPI();
                   return true;
                  }
                  return false;
                } catch (error) {
                  console.error('Registration failed:', error);
                  alert('Registration failed: ' + error.message);
                  return false;
                }
            };

            const loadEmployeesFromAPI = async () => {
                try {
                  const data = await apiCall(API_ENDPOINTS.employees);
                  if (data.success) {

                   const mappedEmployees = data.employees.map(emp => ({
                  id: emp.Id,
                  employeeId: emp.EmployeeId,
                  firstName: emp.FirstName,
                  lastName: emp.LastName,
                  email: emp.Email,
                  department: emp.Department || '',
                  position: emp.Position || '',
                  isAdmin: emp.IsAdmin,
                  hourlyRate: emp.HourlyRate,
                  country: emp.Country || emp.country || '',
                  currency: emp.Currency || emp.currency || 'GBP',
                  assignedLocations: emp.AssignedLocations || [],
                  branches: (() => { try { return JSON.parse(emp.Branches || emp.branches || '[]'); } catch(e) { return []; } })(),
                  adminPermissions: parsePermissions(emp.AdminPermissions || emp.adminPermissions),
                  standardHours: emp.StandardHours || emp.standardHours || null,
                  overtimeRate: emp.OvertimeRate || emp.overtimeRate || null,
                  minimumHours: emp.MinimumHours !== undefined ? (emp.MinimumHours || emp.minimumHours || null) : (emp.minimumHours || null)
                   }));
                   setEmployees(mappedEmployees);

                  }
                } catch (error) {
                  console.error('Failed to load employees from API:', error);

                }
            };

            const handleAdminAddEmployee = async (employeeData) => {
                try {
                  const data = await apiCall(API_ENDPOINTS.employees, {
                   method: 'POST',
                   body: JSON.stringify({
                  firstName: employeeData.firstName,
                  lastName: employeeData.lastName,
                  email: employeeData.email,
                  password: employeeData.password,
                  department: employeeData.department,
                  position: employeeData.position,
                  hourlyRate: parseFloat(employeeData.hourlyRate) || 0,
                  isAdmin: employeeData.isAdmin || false,
                  assignedLocations: employeeData.assignedLocations || [],
                  adminPermissions: employeeData.adminPermissions || {}
                   }),
                  });

                  if (data.success) {
                   await loadEmployeesFromAPI();
                   alert('Employee added successfully!');
                   return true;
                  }
                  return false;
                } catch (error) {
                  console.error('Failed to add employee:', error);
                  alert('Failed to add employee: ' + error.message);
                  return false;
                }
            };

            const handleUpdateEmployee = async (employeeId, updatedData) => {
                try {

                  const payload = { ...updatedData };
                  if (Array.isArray(payload.branches)) {
                   payload.branches = JSON.stringify(payload.branches);
                  }
                  const data = await apiCall(`${API_ENDPOINTS.employees}/${employeeId}`, {
                   method: 'PUT',
                   body: JSON.stringify(payload)
                  });

                  if (data.success) {
                   await loadEmployeesFromAPI();
                   console.log('Employee updated successfully');
                  }
                } catch (error) {
                  console.error('Failed to update employee:', error);
                  alert('Failed to update employee: ' + error.message);
                }
            };

            const handleDeleteEmployee = async (employeeId) => {
                const hasTimesheets = timesheets.some(ts => ts.employeeId === employeeId);
                if (hasTimesheets) {
                  if (!window.confirm('This employee has timesheet records. Are you sure you want to delete? This action cannot be undone.')) return;
                }
                try {
                  const data = await apiCall(`${API_ENDPOINTS.employees}/${employeeId}`, { method: 'DELETE' });
                  if (!data.success) throw new Error(data.error || 'Failed to delete');
                  setEmployees(employees.filter(emp => emp.id !== employeeId));
                  setTimesheets(timesheets.filter(ts => ts.employeeId !== employeeId));
                } catch (error) {
                  alert('Failed to delete employee: ' + error.message);
                }
            };

            const handleCreateAdmin = async (adminData, permissions) => {
                try {
                  const data = await apiCall(API_ENDPOINTS.employees, {
                   method: 'POST',
                   body: JSON.stringify({
                  firstName: adminData.firstName,
                  lastName: adminData.lastName,
                  email: adminData.email,
                  password: adminData.password,
                  department: adminData.department || 'Administration',
                  position: adminData.position || '',
                  hourlyRate: parseFloat(adminData.hourlyRate) || 0,
                  isAdmin: true,
                  assignedLocations: [],
                  adminPermissions: permissions,
                   })
                  });
                  if (!data.success) throw new Error(data.error || 'Failed to create admin');

                  if (data.employee && data.employee.Id) {
                   await apiCall(`${API_ENDPOINTS.employees}/${data.employee.Id}`, {
                  method: 'PUT',
                  body: JSON.stringify({ adminPermissions: permissions })
                   });
                  }
                  await loadEmployeesFromAPI();
                } catch (error) {
                  alert('Failed to create admin: ' + error.message);
                }
            };

            const handleUpdateAdminPermissions = async (adminId, permissions) => {
                try {
                  await apiCall(`${API_ENDPOINTS.employees}/${adminId}`, {
                   method: 'PUT',
                   body: JSON.stringify({ adminPermissions: permissions })
                  });
                  await loadEmployeesFromAPI();
                } catch (error) {
                  alert('Failed to update permissions: ' + error.message);
                }
            };

            const handleRemoveAdmin = async (adminId) => {
                try {
                  await apiCall(`${API_ENDPOINTS.employees}/${adminId}`, {
                   method: 'PUT',
                   body: JSON.stringify({ isAdmin: false, adminPermissions: {} })
                  });
                  await loadEmployeesFromAPI();
                } catch (error) {
                  alert('Failed to remove admin status: ' + error.message);
                }
            };

            const hasPermission = (permission) => {
                if (!currentUser || !currentUser.isAdmin || !currentUser.adminPermissions) {
                  return false;
                }
                return currentUser.adminPermissions[permission] === true;
            };

            const calculateLeaveBalance = (employeeId) => {
                const approvedTimesheets = timesheets.filter(ts =>
                  ts.employeeId === employeeId && ts.status === 'approved'
                );
                const totalHours = approvedTimesheets.reduce((sum, ts) =>
                  sum + (ts.regularHours || 0) + (ts.overtimeHours || 0), 0
                );
                const accruedMinutes = totalHours;

                const paidOut = financialAdjustments
                  .filter(a => a.employeeId === employeeId && a.type === 'annual_leave')
                  .reduce((sum, a) => sum + (a.hours || 0), 0);
                const remainingMinutes = Math.max(accruedMinutes - paidOut, 0);
                return { accruedMinutes, paidOut, remainingMinutes, totalHours };
            };

            const notesRef = React.useRef(null);

            const handleSubmitTimesheet = async () => {
                if (!newTimesheet.startTime || !newTimesheet.finishTime) {
                  alert('Please complete check-in and check-out using QR code scanning');
                  return;
                }
                if (!newTimesheet.locationId) {
                  alert('Location verification required. Please scan QR code at your work location.');
                  return;
                }
                setPendingBreakMinutes('');
                setShowBreakModal(true);
            };

            const handleConfirmSubmitTimesheet = async (breakMins) => {
                if (isSubmittingTimesheet) return;
                setIsSubmittingTimesheet(true);
                setShowBreakModal(false);
                const { regular, overtime } = calculateHours(newTimesheet.startTime, newTimesheet.finishTime);
                const today = new Date().toISOString().split('T')[0];
                try {
                  const checkInLocStr = newTimesheet.checkInLocation
                   ? `${newTimesheet.checkInLocation.locationName} (${Number(newTimesheet.checkInLocation.lat).toFixed(5)}, ${Number(newTimesheet.checkInLocation.lng).toFixed(5)})`
                   : null;
                  const checkOutLocStr = newTimesheet.checkOutLocation
                   ? `${newTimesheet.checkOutLocation.locationName} (${Number(newTimesheet.checkOutLocation.lat).toFixed(5)}, ${Number(newTimesheet.checkOutLocation.lng).toFixed(5)})`
                   : null;


                  let activeId = localStorage.getItem('bpost_active_checkin_id');
                  if (!activeId) {
                   const existingCheckin = timesheets.find(function(ts) {
                  return ts.employeeId === currentUser.id &&
                   (ts.date === today) &&
                   ts.status === 'checkedin';
                   });
                   if (existingCheckin) activeId = existingCheckin.id;
                  }

                  let data;
                  if (activeId) {

                   data = await apiCall(API_ENDPOINTS.timesheets + '/' + activeId, {
                  method: 'PUT',
                  body: JSON.stringify({
                   finishTime: newTimesheet.finishTime,
                   regularHours: regular,
                   overtimeHours: overtime,
                   breakMinutes: parseInt(breakMins) || 0,
                   notes: (notesRef && notesRef.current ? notesRef.current.value : newTimesheet.notes) || '',
                   checkOutLocation: checkOutLocStr,
                   status: 'pending'
                  })
                   });
                  } else {
                   data = await apiCall(API_ENDPOINTS.timesheets, {
                  method: 'POST',
                  body: JSON.stringify({
                   date: newTimesheet.date,
                   startTime: newTimesheet.startTime,
                   finishTime: newTimesheet.finishTime,
                   regularHours: regular,
                   overtimeHours: overtime,
                   breakMinutes: parseInt(breakMins) || 0,
                   notes: (notesRef && notesRef.current ? notesRef.current.value : newTimesheet.notes) || '',
                   locationId: newTimesheet.locationId,
                   checkInLocation: checkInLocStr,
                   checkOutLocation: checkOutLocStr,
                  })
                   });
                  }

                  if (data.success) {
                   localStorage.removeItem('bpost_active_checkin_id');
                   await loadTimesheetsFromAPI();
                   const cleared = { date: today, startTime: '', finishTime: '', notes: '', locationId: null, checkInLocation: null, checkOutLocation: null };
                   setNewTimesheet(cleared);
                   if (notesRef && notesRef.current) notesRef.current.value = '';
                   localStorage.removeItem('bpost_current_timesheet');
                   alert('✓ Timesheet submitted successfully!');
                  } else {
                   alert('Failed to submit timesheet: ' + (data.error || 'Unknown error'));
                  }
                } catch (error) {
                  console.error('Failed to submit timesheet:', error);
                  alert('Failed to submit timesheet: ' + error.message);
                } finally {
                  setIsSubmittingTimesheet(false);
                }
            };

            const handleSubmitManualEntry = () => {
                if (!manualEntryData.employeeId || !manualEntryData.date || !manualEntryData.startTime || !manualEntryData.finishTime) {
                  alert('Please fill in all required fields');
                  return;
                }

                const { regular, overtime } = calculateHours(manualEntryData.startTime, manualEntryData.finishTime);

                const timesheet = {
                  id: timesheets.length + 1,
                  employeeId: parseInt(manualEntryData.employeeId),
                  date: manualEntryData.date,
                  startTime: manualEntryData.startTime,
                  finishTime: manualEntryData.finishTime,
                  regularHours: regular,
                  overtimeHours: overtime,
                  status: manualEntryData.status,
                  notes: manualEntryData.notes + ' (Manual Entry by Admin)',
                  locationId: parseInt(manualEntryData.locationId) || null,
                  checkInLocation: null,
                  checkOutLocation: null,
                  manualEntry: true,
                  enteredBy: currentUser.id
                };

                setTimesheets([...timesheets, timesheet]);
                setManualEntryData({
                  employeeId: '',
                  date: new Date().toISOString().split('T')[0],
                  startTime: '',
                  finishTime: '',
                  locationId: '',
                  notes: '',
                  status: 'approved'
                });

                alert('✓ Manual timesheet entry added successfully!');
                setShowManualEntry(false);
            };

            const handleManualTimesheetEntry = async (employeeId, entryData) => {
                const { regular, overtime } = calculateHours(entryData.startTime, entryData.finishTime);
                const notes = entryData.notes ? entryData.notes + ' (Added manually by admin)' : '(Added manually by admin)';
                const data = await apiCall(API_ENDPOINTS.timesheets, {
                  method: 'POST',
                  body: JSON.stringify({
                   employeeId: parseInt(employeeId),
                   date: entryData.date,
                   startTime: entryData.startTime,
                   finishTime: entryData.finishTime,
                   regularHours: regular,
                   overtimeHours: overtime,
                   status: entryData.autoApprove ? 'approved' : 'pending',
                   notes,
                   locationId: entryData.locationId || null,
                  })
                });
                if (!data.success) throw new Error(data.error || 'Failed to save timesheet');
                await loadTimesheetsFromAPI();
            };

            const handleUpdateRate = (employeeId, newRate) => {
                setEmployees(employees.map(emp =>
                  emp.id === employeeId ? { ...emp, hourlyRate: parseFloat(newRate) } : emp
                ));
            };

            const handleTimesheetStatus = async (timesheetId, status) => {
                const previousTimesheets = timesheets;
                setTimesheets(timesheets.map(ts =>
                  ts.id === timesheetId ? { ...ts, status } : ts
                ));
                try {

                  const action = status === 'approved' ? 'approve' : 'reject';
                  const endpoint = `${API_ENDPOINTS.timesheets}/${timesheetId}/${action}`;
                  const result = await apiCall(endpoint, {
                   method: 'POST',
                   body: JSON.stringify({ approvedBy: currentUser.id })
                  });
                  if (result && result.success === false) throw new Error(result.error || 'API error');
                  await loadTimesheetsFromAPI();
                } catch (error) {
                  console.error('Failed to update timesheet status:', error);
                  setTimesheets(previousTimesheets);
                  alert(`Failed to ${status} timesheet: ${error.message}`);
                }
            };

            const handleDeleteTimesheet = async (timesheetId) => {
                const ts = timesheets.find(t => t.id === timesheetId);
                const emp = employees.find(e => e.id === ts?.employeeId);
                const name = emp ? `${emp.firstName} ${emp.lastName}` : 'this employee';
                if (!window.confirm(`Delete this timesheet for ${name} on ${ts?.date}?\n\nThis is permanent and cannot be undone.`)) return;
                try {
                  const result = await apiCall(`${API_ENDPOINTS.timesheets}/${timesheetId}`, { method: 'DELETE' });
                  if (result && result.success === false) throw new Error(result.error || 'API error');
                  setTimesheets(timesheets.filter(t => t.id !== timesheetId));
                } catch (error) {
                  console.error('Failed to delete timesheet:', error);
                  alert('Failed to delete timesheet: ' + error.message);
                }
            };

            const calculatePayroll = (employeeId) => {
                const employee = employees.find(emp => emp.id === employeeId) || currentUser || { hourlyRate: 0, currency: 'GBP' };
                const employeeTimesheets = timesheets.filter(ts =>
                  ts.employeeId === employeeId && ts.status === 'approved'
                );

                const totalRegular = employeeTimesheets.reduce((sum, ts) => sum + ts.regularHours, 0);
                const totalOvertime = employeeTimesheets.reduce((sum, ts) => sum + ts.overtimeHours, 0);
                const empOvertimeRate = employee.overtimeRate || payrollSettings.overtimeMultiplier;

                let effectiveRegularHours = totalRegular;
                let minimumHoursBonus = 0;
                if (employee.minimumHours) {
                  const minH = parseFloat(employee.minimumHours);
                  employeeTimesheets.forEach(ts => {
                   const dayTotal = (ts.regularHours || 0) + (ts.overtimeHours || 0);
                   if (dayTotal > 0 && dayTotal < minH) {
                  minimumHoursBonus += (minH - dayTotal);
                   }
                  });
                  effectiveRegularHours = totalRegular + minimumHoursBonus;
                }

                const regularPay = effectiveRegularHours * (employee.hourlyRate || 0);
                const overtimePay = totalOvertime * (employee.hourlyRate || 0) * empOvertimeRate;
                const basePay = regularPay + overtimePay;

                const totalBreakMinutes = employeeTimesheets.reduce((sum, ts) => {
                  const manualBreak = ts.breakMinutes || 0;
                  const totalHours = (ts.regularHours || 0) + (ts.overtimeHours || 0);
                  const autoBreak = manualBreak === 0 ? getAutoBreakMinutes(totalHours) : 0;
                  return sum + (manualBreak > 0 ? manualBreak : autoBreak);
                }, 0);
                const breakDeduction = (totalBreakMinutes / 60) * (employee.hourlyRate || 0);

                const empAdjustments = financialAdjustments.filter(adj => adj.employeeId === employeeId);
                const bonuses = empAdjustments.filter(a => a.type === 'bonus' || a.type === 'annual_leave').reduce((sum, a) => sum + a.amount, 0);
                const penalties = empAdjustments.filter(a => a.type === 'penalty').reduce((sum, a) => sum + a.amount, 0);
                const advances = empAdjustments.filter(a => a.type === 'advance').reduce((sum, a) => sum + a.amount, 0);
                const sickPay = empAdjustments.filter(a => a.type === 'sick_pay').reduce((sum, a) => sum + a.amount, 0);
                const payments = empAdjustments.filter(a => a.type === 'payment').reduce((sum, a) => sum + a.amount, 0);

                const totalAdjustments = bonuses - penalties - advances + sickPay;
                const totalPay = basePay - breakDeduction + totalAdjustments;
                const balance = Math.max(totalPay - payments, 0);

                return {
                  regularHours: totalRegular,
                  effectiveRegularHours,
                  minimumHoursBonus,
                  overtimeHours: totalOvertime,
                  regularPay,
                  overtimePay,
                  breakDeduction,
                  totalBreakMinutes,
                  basePay,
                  bonuses,
                  penalties,
                  advances,
                  sickPay,
                  payments,
                  balance,
                  totalAdjustments,
                  totalPay
                };
            };

            const ChangePasswordModal = ({ onClose, adminReset, targetEmployee }) => {
                const [currentPassword, setCurrentPassword] = useState('');
                const [newPassword, setNewPassword] = useState('');
                const [confirmPassword, setConfirmPassword] = useState('');
                const [error, setError] = useState('');
                const [success, setSuccess] = useState('');
                const [loading, setLoading] = useState(false);

                const handleSubmit = async () => {
                  setError(''); setSuccess('');
                  if (newPassword.length < 6) return setError('New password must be at least 6 characters.');
                  if (newPassword !== confirmPassword) return setError('Passwords do not match.');
                  setLoading(true);
                  let result;
                  if (adminReset && targetEmployee) {
                   result = await handleAdminResetPassword(targetEmployee.id, newPassword);
                  } else {
                   if (!currentPassword) { setLoading(false); return setError('Please enter your current password.'); }
                   result = await handleChangePassword(currentPassword, newPassword);
                  }
                  setLoading(false);
                  if (result.success) {
                   setSuccess(adminReset ? `Password reset for ${targetEmployee.firstName} ${targetEmployee.lastName}!` : 'Password changed successfully!');
                   setTimeout(onClose, 1500);
                  } else {
                   setError(result.error || 'Failed to change password.');
                  }
                };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                   <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  {adminReset ? `Reset Password — ${targetEmployee?.firstName} ${targetEmployee?.lastName}` : 'Change Password'}
                   </h2>
                   <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                  </div>
                  <div className="p-6 space-y-4">
                   {!adminReset && (
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                   <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter current password" />
                  </div>
                   )}
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="Min. 6 characters" />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="Repeat new password" />
                   </div>
                   {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">{error}</p>}
                   {success && <p className="text-green-700 text-sm bg-green-50 border border-green-200 p-3 rounded-lg">✓ {success}</p>}
                   <button onClick={handleSubmit} disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
                  {loading ? 'Saving...' : (adminReset ? 'Reset Password' : 'Change Password')}
                   </button>
                  </div>
                   </div>
                  </div>
                );
            };

            const LoginScreen = () => {
                const [email, setEmail] = useState('');
                const [password, setPassword] = useState('');
                const [error, setError] = useState('');

                const onSubmit = async (e) => {
                  e.preventDefault();
                  setError('Logging in...');
                  const success = await handleLogin(email, password);
                  if (success) {
                   setError('');
                  } else {
                   setError('Invalid credentials. Please verify your email and password.');
                  }
                };

                return (
                  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                   <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                  <div className="text-center mb-8">
                   <img
                  src="logo.png"
                  alt="B-Post Logo"
                  className="h-20 mx-auto mb-6"
                  style={{objectFit: 'contain'}}
                   />
                   <h1 className="text-2xl font-bold text-gray-800">Employee Management System</h1>
                   <p className="text-gray-600 mt-2">GPS-Verified Attendance System</p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-6">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                   placeholder="employee@company.com"
                   required
                  />
                   </div>

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                   placeholder="Enter your password"
                   required
                  />
                   </div>

                   {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                   {error}
                  </div>
                   )}

                   <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                   >
                  <LogIn className="w-5 h-5" />
                  Sign In
                   </button>
                  </form>

                  <div className="mt-6 text-center space-y-3">
                   <button
                  onClick={() => setCurrentView('register')}
                  className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center gap-2 mx-auto"
                   >
                  <UserPlus className="w-4 h-4" />
                  Register as New Employee
                   </button>
                   <p className="text-xs text-gray-500">
                  Forgot your password? Contact your administrator to reset it.
                   </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                   <p className="text-xs text-gray-500 text-center">Demo Credentials:</p>
                   <p className="text-xs text-gray-600 text-center mt-1">Employee: john.smith@company.com / employee123</p>
                   <p className="text-xs text-gray-600 text-center">Admin: sarah.johnson@company.com / admin123</p>
                  </div>
                   </div>
                  </div>
                );
            };

            const RegistrationScreen = () => {
                const [formData, setFormData] = useState({
                  firstName: '',
                  lastName: '',
                  email: '',
                  department: '',
                  position: '',
                  country: '',
                  password: ''
                });

                const handleSubmit = async (e) => {
                  e.preventDefault();
                  const success = await handleRegisterEmployee(formData);
                  if (success) {
                   alert('Registration successful! You are now logged in.');

                  }
                };

                return (
                  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                   <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-8">
                  <div className="text-center mb-6">
                   <img
                  src="logo.png"
                  alt="B-Post Logo"
                  className="h-16 mx-auto mb-4"
                  style={{objectFit: 'contain'}}
                   />
                   <h2 className="text-3xl font-bold text-gray-800">Employee Registration</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                   <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                   />
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                   <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                   />
                  </div>
                   </div>

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                   type="email"
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   required
                  />
                   </div>

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                   value={formData.department}
                   onChange={(e) => setFormData({...formData, department: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   required
                  >
                   <option value="">Select Department</option>
                   <option value="Engineering">Engineering</option>
                   <option value="Sales">Sales</option>
                   <option value="Marketing">Marketing</option>
                   <option value="Finance">Finance</option>
                   <option value="Operations">Operations</option>
                   <option value="Human Resources">Human Resources</option>
                  </select>
                   </div>

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                  <input
                   type="text"
                   value={formData.position}
                   onChange={(e) => setFormData({...formData, position: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   required
                  />
                   </div>

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country of Operation <span className="text-red-500">*</span></label>
                  <select
                   value={formData.country}
                   onChange={(e) => setFormData({...formData, country: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   required
                  >
                   <option value="">Select Country</option>
                   <option value="United Kingdom">United Kingdom</option>
                   <option value="Iraq">Iraq</option>
                   <option value="United States">United States</option>
                   <option value="Germany">Germany</option>
                   <option value="France">France</option>
                   <option value="Netherlands">Netherlands</option>
                   <option value="Belgium">Belgium</option>
                   <option value="Turkey">Turkey</option>
                   <option value="UAE">UAE</option>
                   <option value="Other">Other</option>
                  </select>
                   </div>

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                   type="password"
                   value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   required
                   minLength={6}
                  />
                   </div>

                   <div className="flex gap-4 pt-4">
                  <button
                   type="submit"
                   className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                   Complete Registration
                  </button>
                  <button
                   type="button"
                   onClick={() => setCurrentView('login')}
                   className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                   Cancel
                  </button>
                   </div>
                  </form>
                   </div>
                  </div>
                );
            };

            const QRScannerModal = ({ mode, onClose }) => {
                const [manualQR, setManualQR] = useState('');
                const [scanMethod, setScanMethod] = useState('camera');
                const [html5QrCode, setHtml5QrCode] = useState(null);
                const [isScanning, setIsScanning] = useState(false);

                useEffect(() => {
                  if (scanMethod === 'camera' && !isScanning) {
                   startCameraScanning();
                  }
                  return () => {
                   stopCameraScanning();
                  };
                }, [scanMethod]);

                const startCameraScanning = () => {
                  if (typeof Html5Qrcode === 'undefined') {
                   alert('QR Scanner not loaded. Please try manual entry.');
                   setScanMethod('manual');
                   return;
                  }

                  const qrCodeScanner = new Html5Qrcode("qr-reader");
                  setHtml5QrCode(qrCodeScanner);

                  const config = {
                   fps: 10,
                   qrbox: { width: 250, height: 250 },
                   aspectRatio: 1.0
                  };

                  qrCodeScanner.start(
                   { facingMode: "environment" },
                   config,
                   (decodedText) => {

                  qrCodeScanner.stop().then(() => {
                   handleQRScan(decodedText, mode);
                   setManualQR('');
                  }).catch(err => console.error(err));
                   },
                   (errorMessage) => {

                   }
                  ).then(() => {
                   setIsScanning(true);
                  }).catch(err => {
                   console.error('Camera error:', err);
                   alert('Unable to access camera. Please allow camera permissions or use manual entry.');
                   setScanMethod('manual');
                  });
                };

                const stopCameraScanning = () => {
                  if (html5QrCode && isScanning) {
                   html5QrCode.stop().catch(err => console.error(err));
                   setIsScanning(false);
                  }
                };

                const handleManualScan = () => {
                  if (manualQR) {
                   handleQRScan(manualQR, mode);
                   setManualQR('');
                  }
                };

                const handleClose = () => {
                  stopCameraScanning();
                  onClose();
                };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
                  <div className="flex justify-between items-center mb-6">
                   <h3 className="text-2xl font-bold text-gray-800">
                  {mode === 'checkin' ? 'Check-In' : 'Check-Out'} Scanner
                   </h3>
                   <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                   </button>
                  </div>

                  <div className="flex gap-2 mb-6">
                   <button
                  onClick={() => {
                   stopCameraScanning();
                   setScanMethod('camera');
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                   scanMethod === 'camera'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                   >
                  <Camera className="w-5 h-5 inline mr-2" />
                  Camera Scan
                   </button>
                   <button
                  onClick={() => {
                   stopCameraScanning();
                   setScanMethod('manual');
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                   scanMethod === 'manual'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                   >
                  Manual Entry
                   </button>
                  </div>

                  {scanMethod === 'camera' ? (
                   <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                   <p className="text-sm text-blue-900">
                  <strong>Camera Scanning:</strong> Point your camera at the QR code displayed at your work location.
                   </p>
                  </div>

                  <div id="qr-reader" className="border-2 border-indigo-200 rounded-lg overflow-hidden"></div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                   <p className="text-xs text-amber-900">
                  <strong>Note:</strong> Your GPS location will be verified after scanning to ensure you are within the designated work area.
                   </p>
                  </div>
                   </div>
                  ) : (
                   <div className="space-y-4">
                  <div className="text-center mb-6">
                   <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full mb-4">
                  <QrCode className="w-12 h-12 text-indigo-600" />
                   </div>
                   <p className="text-gray-600">Enter the QR code from your work location</p>
                  </div>

                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter QR Code Manually
                   </label>
                   <input
                  type="text"
                  value={manualQR}
                  onChange={(e) => setManualQR(e.target.value)}
                  placeholder="LOC-MAIN-001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   />
                  </div>

                  <button
                   onClick={handleManualScan}
                   className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                  >
                   <Navigation className="w-5 h-5" />
                   Verify Location & {mode === 'checkin' ? 'Check-In' : 'Check-Out'}
                  </button>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                   <p className="text-sm text-blue-900 font-semibold mb-2">Demo QR Codes:</p>
                   <p className="text-xs text-blue-700">Main Office: LOC-MAIN-001</p>
                   <p className="text-xs text-blue-700">Warehouse: LOC-WARE-002</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                   <p className="text-xs text-amber-900">
                  <strong>Note:</strong> Your GPS location will be verified to ensure you are within the designated work area.
                   </p>
                  </div>
                   </div>
                  )}
                   </div>
                  </div>
                );
            };

            const EmployeeDashboard = () => {
                const myTimesheets = timesheets.filter(ts => ts.employeeId === currentUser.id);
                const payroll = calculatePayroll(currentUser.id);
                const currentLocationData = newTimesheet.locationId
                  ? workLocations.find(loc => loc.id === newTimesheet.locationId)
                  : null;

                return (
                  <div className="min-h-screen bg-gray-50">
                   {showBreakModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl px-6 py-5 text-white text-center">
                   <div className="text-3xl mb-1">☕</div>
                   <h2 className="text-xl font-bold">Break Time</h2>
                   <p className="text-orange-100 text-sm mt-1">How long was your break today?</p>
                  </div>
                  <div className="p-6">
                   <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">Enter break duration in minutes</label>
                   <div className="flex items-center gap-3 mb-3">
                  <input type="number" min="0" max="480" value={pendingBreakMinutes}
                   onChange={e => setPendingBreakMinutes(e.target.value)}
                   placeholder="e.g. 30"
                   className="flex-1 px-4 py-3 border-2 border-orange-300 rounded-xl text-center text-2xl font-bold focus:outline-none focus:border-orange-500"
                   autoFocus />
                  <span className="text-gray-500 font-semibold">min</span>
                   </div>
                   <div className="flex gap-2 mb-4 justify-center">
                  {[0,15,30,45,60].map(m => (
                   <button key={m} onClick={() => setPendingBreakMinutes(String(m))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${pendingBreakMinutes === String(m) ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300 text-gray-600 hover:border-orange-400'}`}>
                  {m === 0 ? 'None' : `${m}m`}
                   </button>
                  ))}
                   </div>
                   {pendingBreakMinutes > 0 && (
                  <p className="text-center text-sm text-amber-700 mb-4 font-medium">
                   {pendingBreakMinutes} min break = {(pendingBreakMinutes/60).toFixed(2)}h deducted from pay
                  </p>
                   )}
                   <div className="flex gap-3">
                  <button onClick={() => handleConfirmSubmitTimesheet(pendingBreakMinutes)}
                   disabled={isSubmittingTimesheet}
                   className={`flex-1 py-3 rounded-xl font-bold transition ${isSubmittingTimesheet ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
                   {isSubmittingTimesheet ? 'Submitting...' : 'Submit Timesheet'}
                  </button>
                  <button onClick={() => setShowBreakModal(false)}
                   disabled={isSubmittingTimesheet}
                   className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition">
                   Cancel
                  </button>
                   </div>
                  </div>
                   </div>
                  </div>
                   )}

                   {scanningMode && (
                  <QRScannerModal
                   mode={scanningMode}
                   onClose={() => setScanningMode(null)}
                  />
                   )}

                   {showExpenseForm && <ExpenseForm onClose={() => setShowExpenseForm(false)} />}

                   {showAgentCollectionForm && <AgentCollectionForm onClose={() => setShowAgentCollectionForm(false)} />}


                   <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-lg">
                  <div className="max-w-2xl mx-auto px-4 pt-5 pb-6">
                   <div className="flex items-center justify-between mb-4">
                  <img src="logo.png" alt="B-Post" className="h-9 bg-white px-2 py-1 rounded-lg" style={{objectFit:'contain'}} />
                  <div className="flex gap-2">
                   <button onClick={() => setShowChangePassword(true)} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition" title="Change Password">
                  <Shield className="w-5 h-5" />
                   </button>
                   <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-semibold transition flex items-center gap-1.5 text-sm">
                  <LogOut className="w-4 h-4" />Logout
                   </button>
                  </div>
                   </div>
                   <div>
                  <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider">Employee Portal</p>
                  <h1 className="text-2xl font-bold mt-0.5">{currentUser?.firstName || ""} {currentUser?.lastName || ""}</h1>
                  <p className="text-indigo-200 text-sm mt-0.5">{currentUser?.department || ""}{currentUser?.position ? ' · ' + currentUser.position : ''}</p>
                   </div>
                  </div>

                  <div className="max-w-2xl mx-auto px-4 pb-5 grid grid-cols-3 gap-3">
                   <div className="bg-white bg-opacity-15 rounded-xl p-3 text-center">
                  <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wide">Total Hours</p>
                  <p className="text-xl font-bold mt-0.5">{(payroll.regularHours + payroll.overtimeHours).toFixed(1)}</p>
                   </div>
                   <div className="bg-white bg-opacity-15 rounded-xl p-3 text-center">
                  <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wide">Overtime</p>
                  <p className="text-xl font-bold mt-0.5 text-amber-300">{payroll.overtimeHours.toFixed(1)}</p>
                   </div>
                   <div className="bg-white bg-opacity-15 rounded-xl p-3 text-center">
                  <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wide">Balance</p>
                  <p className="text-xl font-bold mt-0.5 text-green-300">{getCurrencySymbol(currentUser.currency)}{payroll.balance.toFixed(2)}</p>
                   </div>
                  </div>
                   </div>

                   {showChangePassword && (
                  <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
                   )}

                   <div className="max-w-2xl mx-auto p-4">
                  {(payroll.payments > 0 || payroll.totalAdjustments !== 0 || payroll.breakDeduction > 0) && (
                   <div className="bg-white rounded-2xl shadow p-4 mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Earnings Breakdown</p>
                  <div className="space-y-2">
                   <div className="flex justify-between text-sm"><span className="text-gray-600">Total Earnings</span><span className="font-semibold">{getCurrencySymbol(currentUser.currency)}{payroll.totalPay.toFixed(2)}</span></div>
                   {payroll.payments > 0 && <div className="flex justify-between text-sm"><span className="text-gray-600">Paid</span><span className="font-semibold text-blue-600">-{getCurrencySymbol(currentUser.currency)}{payroll.payments.toFixed(2)}</span></div>}
                   {payroll.totalAdjustments !== 0 && <div className="flex justify-between text-sm"><span className="text-gray-600">Adjustments</span><span className="font-semibold">{payroll.totalAdjustments >= 0 ? '+' : ''}{getCurrencySymbol(currentUser.currency)}{payroll.totalAdjustments.toFixed(2)}</span></div>}
                   {payroll.breakDeduction > 0 && <div className="flex justify-between text-sm"><span className="text-gray-600">Break Deduction</span><span className="font-semibold text-amber-600">-{getCurrencySymbol(currentUser.currency)}{payroll.breakDeduction.toFixed(2)}</span></div>}
                   <div className="flex justify-between text-sm font-bold border-t border-gray-100 pt-2 mt-2"><span>Balance Owed</span><span className="text-green-700">{getCurrencySymbol(currentUser.currency)}{payroll.balance.toFixed(2)}</span></div>
                  </div>
                   </div>
                  )}

                  <div className="bg-white rounded-xl shadow p-6 mb-8">
                   <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <QrCode className="w-6 h-6" />
                  GPS-Verified Time Tracking
                   </h2>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center">
                   <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Camera className="w-8 h-8 text-green-600" />
                   </div>
                   <h3 className="text-lg font-semibold mb-2">Check-In</h3>
                   <p className="text-sm text-gray-600 mb-4">Scan QR code to start your shift</p>
                   <button
                  onClick={() => setScanningMode('checkin')}
                  disabled={!!newTimesheet.startTime}
                  className={`px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 mx-auto ${
                   newTimesheet.startTime
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                   >
                  <QrCode className="w-5 h-5" />
                  {newTimesheet.startTime ? `Checked In: ${newTimesheet.startTime}` : 'Scan to Check-In'}
                   </button>
                  </div>

                  <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center">
                   <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <Camera className="w-8 h-8 text-red-600" />
                   </div>
                   <h3 className="text-lg font-semibold mb-2">Check-Out</h3>
                   <p className="text-sm text-gray-600 mb-4">Scan QR code to end your shift</p>
                   <button
                  onClick={() => setScanningMode('checkout')}
                  disabled={!newTimesheet.startTime || !!newTimesheet.finishTime}
                  className={`px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 mx-auto ${
                   !newTimesheet.startTime || newTimesheet.finishTime
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                   >
                  <QrCode className="w-5 h-5" />
                  {newTimesheet.finishTime ? `Checked Out: ${newTimesheet.finishTime}` : 'Scan to Check-Out'}
                   </button>
                  </div>
                   </div>

                   {currentLocationData && (
                  <div className="mt-6 bg-indigo-50 border border-indigo-200 p-4 rounded-lg flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
                   <div className="flex-1">
                  <p className="font-semibold text-indigo-900">{currentLocationData.name}</p>
                  <p className="text-sm text-indigo-700">{currentLocationData.address}</p>
                  {newTimesheet.startTime && newTimesheet.finishTime && (
                   <p className="text-sm text-indigo-900 mt-2">
                  <strong>Today's Hours:</strong> Regular: {calculateHours(newTimesheet.startTime, newTimesheet.finishTime).regular} hrs |
                  Overtime: {calculateHours(newTimesheet.startTime, newTimesheet.finishTime).overtime} hrs
                   </p>
                  )}
                   </div>
                  </div>
                   )}

                   <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Shift Notes (Optional)</label>
                  <textarea
                   ref={notesRef}
                   defaultValue={newTimesheet.notes}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   rows="2"
                   placeholder="Add any relevant notes about your shift"
                  />
                   </div>

                   <button
                  onClick={handleSubmitTimesheet}
                  disabled={!newTimesheet.startTime || !newTimesheet.finishTime || isSubmittingTimesheet}
                  className={`mt-4 px-6 py-3 rounded-lg font-semibold transition ${
                   newTimesheet.startTime && newTimesheet.finishTime && !isSubmittingTimesheet
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                   >
                  {isSubmittingTimesheet ? 'Submitting...' : 'Submit Timesheet'}
                   </button>

                   <button
                  onClick={() => setShowExpenseForm(true)}
                  className="mt-3 px-6 py-3 rounded-lg font-semibold transition bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-2"
                   >
                  <Receipt className="w-4 h-4" />
                  + Add New Expense
                   </button>

                   {myAgents.length > 0 && (
                  <button
                   onClick={() => setShowAgentCollectionForm(true)}
                   className="mt-3 px-6 py-3 rounded-lg font-semibold transition bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2"
                  >
                   <Truck className="w-4 h-4" />
                   Agent Collection
                  </button>
                   )}
                  </div>

                  {(() => {
                   const myIraqPay = iraqPayments.filter(function(p){ return parseInt(p.employeeId) === parseInt(currentUser.id) && (p.status === 'pending' || p.status === 'partial'); });
                   if (!myIraqPay.length) return null;
                   const sym = getCurrencySymbol(currentUser.currency || 'GBP');
                   const batches = [...new Set(myIraqPay.map(function(p){return p.batchName;}))];
                   return (
                  <IraqPaySection
                   myIraqPay={myIraqPay}
                   batches={batches}
                   sym={sym}
                   apiCall={apiCall}
                   API_ENDPOINTS={API_ENDPOINTS}
                   loadIraqPaymentsFromAPI={loadIraqPaymentsFromAPI}
                  />
                   );
                   })()}

                  {(() => {
                   const myCredits = financialAdjustments.filter(function(a){return a.employeeId===currentUser.id && a.type==='account_credit';}).sort(function(a,b){return a.date>b.date?-1:1;});
                   if (!myCredits.length) return null;
                   const sym2 = getCurrencySymbol(currentUser.currency||'GBP');
                   return (
                  <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                   <h3 className="text-sm font-bold text-indigo-700 mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4"/>My Account Credits</h3>
                   <div className="space-y-2">
                  {myCredits.map(function(a){return (
                   <div key={a.id} className="bg-white rounded-lg px-3 py-2 flex items-center justify-between text-sm">
                  <div>
                   <p className="font-semibold text-gray-800">{sym2}{parseFloat(a.amount).toFixed(2)}</p>
                   <p className="text-xs text-gray-500">{new Date(a.date).toLocaleDateString('en-GB')} · {a.reason}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Credited</span>
                   </div>
                  );})}
                   </div>
                   <p className="text-xs text-gray-500 mt-2">Total approved: <strong className="text-indigo-700">{sym2}{myCredits.filter(function(a){return a.type==='account_credit';}).reduce(function(s,a){return s+(parseFloat(a.amount)||0);},0).toFixed(2)}</strong></p>
                  </div>
                   );
                   })()}

                  {(() => {
                   const myExpenses = expenses.filter(e => e.employeeId === currentUser.id);
                   const sym = getCurrencySymbol(currentUser.currency || 'GBP');
                   const allMyExpenses = expenses.filter(e => e.employeeId === currentUser.id);
                   if (allMyExpenses.length === 0) return null;

                   const [expFromDate, setExpFromDate] = React.useState(() => {
                  const d = new Date(); d.setDate(1);
                  return d.toISOString().split('T')[0];
                   });
                   const [expToDate, setExpToDate] = React.useState(new Date().toISOString().split('T')[0]);
                   const [expStatusFilter, setExpStatusFilter] = React.useState('all');

                   const filtered = allMyExpenses.filter(e => {
                  if (e.date < expFromDate || e.date > expToDate) return false;
                  if (expStatusFilter !== 'all' && e.status !== expStatusFilter) return false;
                  return true;
                   }).sort((a,b) => b.date > a.date ? 1 : -1);

                   const totalFiltered = filtered.reduce((s,e) => s + e.amount, 0);
                   const pendingTotal = allMyExpenses.filter(e=>e.status==='pending').reduce((s,e)=>s+e.amount,0);
                   const approvedTotal = allMyExpenses.filter(e=>e.status==='approved').reduce((s,e)=>s+e.amount,0);
                   const paidTotal = allMyExpenses.filter(e=>e.status==='paid').reduce((s,e)=>s+e.amount,0);

                   const exportCSV = () => {
                  let csv = 'Date,Category,Description,Amount,Status,Receipt Ref\n';
                  filtered.forEach(e => {
                   csv += `"${e.date}","${e.category}","${e.description||''}",${e.amount.toFixed(2)},"${e.status}","${e.receiptNote||''}"\n`;
                  });
                  const blob = new Blob([csv], {type:'text/csv'});
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href=url; a.download=`my_expenses_${expFromDate}_${expToDate}.csv`; a.click();
                   };

                   const statusColors = { pending:'bg-amber-100 text-amber-700', approved:'bg-green-100 text-green-700', paid:'bg-blue-100 text-blue-700', rejected:'bg-red-100 text-red-700' };

                   return (
                  <div className="bg-white rounded-xl shadow p-5 mb-6">
                   <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <Receipt className="w-5 h-5 text-teal-600" />My Expense Claims
                  </h2>
                  <button onClick={exportCSV} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 transition">
                   Export CSV
                  </button>
                   </div>

                   <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-center">
                   <p className="text-xs text-amber-600 font-semibold">Pending</p>
                   <p className="text-lg font-bold text-amber-700">{sym}{pendingTotal.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-center">
                   <p className="text-xs text-green-600 font-semibold">Approved</p>
                   <p className="text-lg font-bold text-green-700">{sym}{approvedTotal.toFixed(2)}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-center">
                   <p className="text-xs text-blue-600 font-semibold">Paid</p>
                   <p className="text-lg font-bold text-blue-700">{sym}{paidTotal.toFixed(2)}</p>
                  </div>
                   </div>

                   <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
                  <div>
                   <label className="block text-xs text-gray-500 mb-1">From</label>
                   <input type="date" value={expFromDate} onChange={e=>setExpFromDate(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400" />
                  </div>
                  <div>
                   <label className="block text-xs text-gray-500 mb-1">To</label>
                   <input type="date" value={expToDate} onChange={e=>setExpToDate(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400" />
                  </div>
                  <div>
                   <label className="block text-xs text-gray-500 mb-1">Status</label>
                   <select value={expStatusFilter} onChange={e=>setExpStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-400">
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="paid">Paid</option>
                  <option value="rejected">Rejected</option>
                   </select>
                  </div>
                   </div>

                   {filtered.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-4">No expenses found for this period</p>
                   ) : (
                  <div>
                   <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                   <thead className="bg-gray-50">
                  <tr>{['Date','Category','Description','Amount','Status'].map(h=><th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>)}</tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                  {filtered.map(exp => (
                   <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(exp.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'})}</td>
                  <td className="px-3 py-2"><span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">{exp.category}</span></td>
                  <td className="px-3 py-2 text-gray-600 max-w-xs truncate">{exp.description||''}</td>
                  <td className="px-3 py-2 font-bold text-gray-800">{sym}{exp.amount.toFixed(2)}</td>
                  <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[exp.status]||'bg-gray-100 text-gray-600'}`}>{exp.status}</span></td>
                   </tr>
                  ))}
                   </tbody>
                   <tfoot>
                  <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold">
                   <td colSpan="3" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Total ({filtered.length} item{filtered.length!==1?'s':''})</td>
                   <td className="px-3 py-2 text-teal-700">{sym}{totalFiltered.toFixed(2)}</td>
                   <td></td>
                  </tr>
                   </tfoot>
                  </table>
                   </div>
                  </div>
                   )}
                  </div>
                   );
                  })()}

                  <div className="bg-white rounded-xl shadow p-6">
                   <h2 className="text-xl font-bold text-gray-800 mb-4">Timesheet History</h2>
                   <div className="overflow-x-auto">
                  <table className="w-full">
                   <thead className="bg-gray-50">
                  <tr>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Start</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Finish</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Regular Hrs</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Overtime</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                  {myTimesheets.sort((a, b) => new Date(b.date) - new Date(a.date)).map(ts => {
                   const location = workLocations.find(loc => loc.id === ts.locationId);
                   return (
                  <tr key={ts.id} className="hover:bg-gray-50">
                   <td className="px-4 py-3 text-sm">{new Date(ts.date).toLocaleDateString()}</td>
                   <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-1">
                   <MapPin className="w-3 h-3 text-gray-500" />
                   {location?.name || 'N/A'}
                  </div>
                   </td>
                   <td className="px-4 py-3 text-sm">{ts.startTime}</td>
                   <td className="px-4 py-3 text-sm">{ts.finishTime}</td>
                   <td className="px-4 py-3 text-sm">{ts.regularHours} hrs</td>
                   <td className="px-4 py-3 text-sm">{ts.overtimeHours} hrs</td>
                   <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                   ts.status === 'approved' ? 'bg-green-100 text-green-800' :
                   ts.status === 'rejected' ? 'bg-red-100 text-red-800' :
                   'bg-yellow-100 text-yellow-800'
                  }`}>
                   {ts.status.toUpperCase()}
                  </span>
                   </td>
                  </tr>
                   );
                  })}
                   </tbody>
                  </table>
                   </div>
                  </div>

                   </div>

                   {(() => {
                  const myCollections = agentCollections.filter(c => c.employeeId === currentUser.id);
                  if (myCollections.length === 0) return null;
                  const sym = getCurrencySymbol(currentUser.currency || 'GBP');
                  const [colFrom, setColFrom] = React.useState(() => {
                   const d = new Date(); d.setDate(1);
                   return d.toISOString().split('T')[0];
                  });
                  const [colTo, setColTo] = React.useState(new Date().toISOString().split('T')[0]);
                  const [colAgent, setColAgent] = React.useState('all');

                  const filtered = myCollections.filter(c => {
                   if (c.date < colFrom || c.date > colTo) return false;
                   if (colAgent !== 'all' && c.agentId !== parseInt(colAgent)) return false;
                   return true;
                  }).sort((a,b) => b.date > a.date ? 1 : -1);

                  const totalCollected = filtered.reduce((s,c) => s+c.amountCollected, 0);
                  const totalPaid = filtered.reduce((s,c) => s+c.amountPaid, 0);

                  const agentOptions = [...new Map(myCollections.map(c => [c.agentId, {id:c.agentId, code:c.agentCode, city:c.agentCity}])).values()];

                  const exportCSV = () => {
                   let csv = 'Date,Agent Code,City,From,To,Collected,Paid,Bank Transfer\n';
                   filtered.forEach(c => {
                  csv += `"${c.date}","${c.agentCode}","${c.agentCity}","${c.fromCode}","${c.toCode}",${c.amountCollected.toFixed(2)},${c.amountPaid.toFixed(2)},${(c.bankAmount||0).toFixed(2)}\n`;
                   });
                   const blob = new Blob([csv], {type:'text/csv'});
                   const url = URL.createObjectURL(blob);
                   const a = document.createElement('a'); a.href=url;
                   a.download=`my_collections_${colFrom}_${colTo}.csv`; a.click();
                  };

                  return (
                   <div className="bg-white rounded-xl shadow p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                   <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-orange-600" />My Agent Collections
                   </h2>
                   <button onClick={exportCSV} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-700 transition">
                  Export CSV
                   </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                   <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-green-600 font-semibold">Cash Collected</p>
                  <p className="text-lg font-bold text-green-700">{sym}{myCollections.reduce((s,c)=>s+c.amountCollected,0).toFixed(2)}</p>
                   </div>
                   <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-red-600 font-semibold">Paid Out</p>
                  <p className="text-lg font-bold text-red-700">{sym}{myCollections.reduce((s,c)=>s+c.amountPaid,0).toFixed(2)}</p>
                   </div>
                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-blue-600 font-semibold">Bank Transfer</p>
                  <p className="text-lg font-bold text-blue-700">{sym}{myCollections.reduce((s,c)=>s+(c.bankAmount||0),0).toFixed(2)}</p>
                   </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
                   <div>
                  <label className="block text-xs text-gray-500 mb-1">From</label>
                  <input type="date" value={colFrom} onChange={e=>setColFrom(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400" />
                   </div>
                   <div>
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <input type="date" value={colTo} onChange={e=>setColTo(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400" />
                   </div>
                   <div>
                  <label className="block text-xs text-gray-500 mb-1">Agent</label>
                  <select value={colAgent} onChange={e=>setColAgent(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-orange-400">
                   <option value="all">All Agents</option>
                   {agentOptions.map(a => <option key={a.id} value={a.id}>{a.code} — {a.city}</option>)}
                  </select>
                   </div>
                  </div>

                  {filtered.length === 0 ? (
                   <p className="text-center text-gray-400 text-sm py-4">No collection records found for this period</p>
                  ) : (
                   <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                   <thead className="bg-orange-50">
                  <tr>{['Date','Agent','From','To','Collected','Paid','Bank'].map(h=><th key={h} className="px-3 py-2 text-left text-xs font-bold text-orange-700 uppercase tracking-wide">{h}</th>)}</tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                  {filtered.map(col => (
                   <tr key={col.id} className="hover:bg-orange-50">
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(col.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'})}</td>
                  <td className="px-3 py-2">
                   <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">{col.agentCode}</span>
                   <div className="text-xs text-gray-400">{col.agentCity}</div>
                  </td>
                  <td className="px-3 py-2 font-semibold text-gray-700">{col.fromCode||'—'}</td>
                  <td className="px-3 py-2 font-semibold text-gray-700">{col.toCode||'—'}</td>
                  <td className="px-3 py-2 font-bold text-green-700">{sym}{col.amountCollected.toFixed(2)}</td>
                  <td className="px-3 py-2 font-bold text-red-600">{col.amountPaid > 0 ? sym+col.amountPaid.toFixed(2) : '—'}</td>
                  <td className="px-3 py-2 font-bold text-blue-600">{(col.bankAmount||0) > 0 ? sym+(col.bankAmount||0).toFixed(2) : '—'}</td>
                   </tr>
                  ))}
                   </tbody>
                   <tfoot>
                  <tr className="border-t-2 border-orange-200 bg-orange-50 font-bold">
                   <td colSpan="4" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Total ({filtered.length} record{filtered.length!==1?'s':''})</td>
                   <td className="px-3 py-2 text-green-700">{sym}{totalCollected.toFixed(2)}</td>
                   <td className="px-3 py-2 text-red-600">{sym}{totalPaid.toFixed(2)}</td>
                   <td className="px-3 py-2 text-blue-600">{sym}{filtered.reduce((s,c)=>s+(c.bankAmount||0),0).toFixed(2)}</td>
                  </tr>
                   </tfoot>
                  </table>
                   </div>
                  )}
                   </div>
                  );
                   })()}

                   {(() => {
                  const assignedVehicle = vehicles.find(v => v.assignedDriverId === currentUser.id);
                  if (!assignedVehicle) return null;
                  const today = new Date();
                  const expiryInfo = (dateStr, label) => {
                   if (!dateStr) return null;
                   const expiry = new Date(dateStr);
                   const daysUntil = Math.floor((expiry-today)/(1000*60*60*24));
                   const formatted = expiry.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
                   let color='text-green-700 bg-green-50 border-green-200', icon='✓';
                   if (daysUntil<0){color='text-red-700 bg-red-50 border-red-200';icon='✕';}
                   else if(daysUntil<=30){color='text-amber-700 bg-amber-50 border-amber-200';icon='⚠';}
                   return <div key={label} className={`flex items-center justify-between px-4 py-2.5 rounded-lg border ${color}`}><span className="text-sm font-semibold">{label}</span><div className="text-right"><span className="text-sm font-bold">{icon} {formatted}</span><div className="text-xs opacity-75">{daysUntil>=0?(daysUntil===0?'Expires today':`${daysUntil} days remaining`):`Expired ${Math.abs(daysUntil)} days ago`}</div></div></div>;
                  };
                  return (
                   <div className="max-w-md mx-auto px-4 pb-8">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
                   <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-5 py-4 flex items-center gap-3">
                  <Car className="w-6 h-6 text-blue-200" />
                  <div><p className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Assigned Vehicle</p><p className="text-white text-xl font-bold tracking-widest">{assignedVehicle.plateNumber}</p></div>
                  <div className="ml-auto text-right"><p className="text-white font-bold">{assignedVehicle.mark}</p><p className="text-blue-200 text-sm">{assignedVehicle.model}</p></div>
                   </div>
                   <div className="p-4 space-y-2">
                  {expiryInfo(assignedVehicle.motExpiry,'MOT Expiry')}
                  {expiryInfo(assignedVehicle.roadTaxExpiry,'Road Tax Expiry')}
                  {expiryInfo(assignedVehicle.insuranceExpiry,'Insurance Expiry')}
                  {expiryInfo(assignedVehicle.nextServiceDate,'Next Service Due')}
                  {assignedVehicle.mileage>0&&<div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50"><span className="text-sm font-semibold text-gray-600">Recorded Mileage</span><span className="text-sm font-bold text-gray-800">{assignedVehicle.mileage.toLocaleString()} mi</span></div>}
                  {assignedVehicle.notes&&<div className="px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50"><p className="text-xs font-semibold text-gray-500 mb-1">Notes</p><p className="text-sm text-gray-700">{assignedVehicle.notes}</p></div>}
                   </div>
                  </div>
                   </div>
                  );
                   })()}
                  </div>
                );
            };




            /* ── IraqPaySection — employee portal section with batch dropdown ─────── */
            const IraqPaySection = ({ myIraqPay, batches, sym, apiCall, API_ENDPOINTS, loadIraqPaymentsFromAPI }) => {
                const [selectedBatch, setSelectedBatch] = useState(batches[0] || '');
                const shown = selectedBatch ? myIraqPay.filter(function(p){return p.batchName === selectedBatch;}) : myIraqPay;
                return (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2"><span className="text-base">🇮🇶</span>Pay in Iraq — Pending Collections</h3>
                  {batches.length > 1 && (
                   <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Select Batch</label>
                  <select value={selectedBatch} onChange={function(e){setSelectedBatch(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                   <option value="">All Batches ({myIraqPay.length} shipments)</option>
                   {batches.map(function(b){
                  const count = myIraqPay.filter(function(p){return p.batchName===b;}).length;
                  return <option key={b} value={b}>{b} ({count} shipments)</option>;
                   })}
                  </select>
                   </div>
                  )}
                  <p className="text-xs text-gray-500 mb-3">{shown.length} shipment{shown.length!==1?'s':''} pending</p>
                  <div className="space-y-3">
                   {shown.map(function(p){
                  return <IraqPayCard key={p.id} p={p} apiCall={apiCall} API_ENDPOINTS={API_ENDPOINTS} loadIraqPaymentsFromAPI={loadIraqPaymentsFromAPI} sym={sym} />;
                   })}
                  </div>
                  </div>
                );
            };
            /* ── End IraqPaySection ───────────────────────────────────────────────── */

            /* ── IraqPayCard — employee collection card (hooks must be in component) ── */
            const IraqPayCard = ({ p, apiCall, API_ENDPOINTS, loadIraqPaymentsFromAPI, sym }) => {
                const [saving, setSaving] = useState(false);
                const [recorded, setRecorded] = useState(false);
                const collIQD = React.useRef(null);
                const collUSD = React.useRef(null);
                const collGBP = React.useRef(null);
                const collEUR = React.useRef(null);
                const saveCollection = async function() {
                  const payload = {
                   collectedIQD: parseFloat(collIQD.current?collIQD.current.value:0)||0,
                   collectedUSD: parseFloat(collUSD.current?collUSD.current.value:0)||0,
                   collectedGBP: parseFloat(collGBP.current?collGBP.current.value:0)||0,
                   collectedEUR: parseFloat(collEUR.current?collEUR.current.value:0)||0,
                  };
                  const anyCollected = payload.collectedIQD||payload.collectedUSD||payload.collectedGBP||payload.collectedEUR;
                  if (!anyCollected) { alert('Please enter at least one collected amount'); return; }
                  payload.status = (
                   (p.amountIQD>0 && payload.collectedIQD<p.amountIQD) ||
                   (p.amountUSD>0 && payload.collectedUSD<p.amountUSD) ||
                   (p.amountGBP>0 && payload.collectedGBP<p.amountGBP) ||
                   (p.amountEUR>0 && payload.collectedEUR<p.amountEUR)
                  ) ? 'partial' : 'collected';
                  setSaving(true);
                  try {
                   await apiCall(API_ENDPOINTS.iraqPay + '/' + p.id, { method:'PUT', body: JSON.stringify(payload) });
                   await loadIraqPaymentsFromAPI();
                   setRecorded(true);
                  } catch(e) { alert('Failed: ' + e.message); }
                  setSaving(false);
                };
                if (recorded) return null;
                return (
                  <div className="bg-white rounded-xl border border-blue-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                   <div>
                  <p className="font-bold text-gray-900">{p.shipmentCode}</p>
                  {p.receiver && <p className="text-xs text-gray-500">{p.receiver}</p>}
                  <p className="text-xs text-gray-400">{p.batchName}</p>
                   </div>
                   <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">{p.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                   {p.amountGBP>0 && <div className="bg-gray-50 rounded-lg px-3 py-2"><p className="text-xs text-gray-400">GBP</p><p className="font-bold text-sm">£{p.amountGBP.toFixed(2)}</p></div>}
                   {p.amountUSD>0 && <div className="bg-gray-50 rounded-lg px-3 py-2"><p className="text-xs text-gray-400">USD</p><p className="font-bold text-sm">${p.amountUSD.toFixed(2)}</p></div>}
                   {p.amountIQD>0 && <div className="bg-gray-50 rounded-lg px-3 py-2"><p className="text-xs text-gray-400">IQD</p><p className="font-bold text-sm">{p.amountIQD.toLocaleString()}</p></div>}
                   {p.amountEUR>0 && <div className="bg-gray-50 rounded-lg px-3 py-2"><p className="text-xs text-gray-400">EUR</p><p className="font-bold text-sm">€{p.amountEUR.toFixed(2)}</p></div>}
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">Enter collected amount:</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                   {p.amountGBP>0 && <div><label className="text-xs text-gray-400">GBP collected</label><input type="number" ref={collGBP} defaultValue="" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-0.5" /></div>}
                   {p.amountUSD>0 && <div><label className="text-xs text-gray-400">USD collected</label><input type="number" ref={collUSD} defaultValue="" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-0.5" /></div>}
                   {p.amountIQD>0 && <div><label className="text-xs text-gray-400">IQD collected</label><input type="number" ref={collIQD} defaultValue="" placeholder="0" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-0.5" /></div>}
                   {p.amountEUR>0 && <div><label className="text-xs text-gray-400">EUR collected</label><input type="number" ref={collEUR} defaultValue="" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-0.5" /></div>}
                  </div>
                  <button onClick={saveCollection} disabled={saving} className="w-full py-2 bg-blue-700 text-white rounded-lg font-semibold text-sm hover:bg-blue-800 disabled:opacity-50">
                   {saving ? 'Saving...' : 'Mark Collected'}
                  </button>
                  </div>
                );
            };
            /* ── End IraqPayCard ──────────────────────────────────────────────────────── */

            /* ── IraqPay Admin Manager ─────────────────────────────────────────────── */
            const IraqPayManager = ({ onClose, visibleEmployees: visEmp, iraqPayments, loadIraqPaymentsFromAPI, apiCall, API_ENDPOINTS, persistedState, onStateChange }) => {
                const mk = (k) => (v) => onStateChange && onStateChange(function(s){return{...s,[k]:typeof v==='function'?v(s[k]):v};});
                const activeTab = persistedState ? persistedState.activeTab : 'view'; const setActiveTab = mk('activeTab');
                const filterEmp = persistedState ? persistedState.filterEmp : ''; const setFilterEmp = mk('filterEmp');
                const filterStatus = persistedState ? persistedState.filterStatus : 'all'; const setFilterStatus = mk('filterStatus');

                const [batchName, setBatchName] = useState('');
                const [empId, setEmpId] = useState('');
                const [previewRows, setPreviewRows] = useState([]);
                const [uploading, setUploading] = useState(false);
                const [editingId, setEditingId] = useState(null);
                const [editVals, setEditVals] = useState({});

                const currencies = ['IQD','USD','GBP','EUR'];

                const handleFile = function(e) {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = function(ev) {
                   try {
                  const wb = window.XLSX.read(ev.target.result, { type: 'binary' });
                  const ws = wb.Sheets[wb.SheetNames[0]];
                  const raw = window.XLSX.utils.sheet_to_json(ws, { header:1, defval:'' });
                  // Find header row: must contain BOTH a shipment-like term AND a currency term
                  let headerRowIdx = -1;
                  for (let i = 0; i < Math.min(raw.length, 30); i++) {
                   const rowStr = raw[i].join(' ').toLowerCase();
                   const hasShipment = rowStr.includes('shipment code') || (rowStr.includes('shipment') && !rowStr.includes('shipments'));
                   const hasCurrency = rowStr.includes(' iqd') || rowStr.includes('usd') || rowStr.includes('total') || rowStr.includes('gbp');
                   if (hasShipment && hasCurrency) { headerRowIdx = i; break; }
                  }
                  if (headerRowIdx < 0) {
                   // Fallback: find row where first non-empty cell looks like a column header (text, not a number)
                   for (let i = 0; i < Math.min(raw.length, 30); i++) {
                    const first = String(raw[i][0]||'').trim();
                    if (first && isNaN(first) && !/^\d{2}\//.test(first) && raw[i].length > 3) {
                     const rowStr = raw[i].join(' ').toLowerCase();
                     if (rowStr.includes('iqd') || rowStr.includes('usd') || rowStr.includes('total')) {
                      headerRowIdx = i; break;
                     }
                    }
                   }
                  }
                  if (headerRowIdx < 0) headerRowIdx = 0;
                  const headerRow = raw[headerRowIdx].map(function(h){ return String(h||'').toLowerCase().replace(/[^a-z0-9£$]/g,''); });
                  const getColIdx = function(...pats) {
                   for (const pat of pats) {
                    const idx = headerRow.findIndex(function(h){ return h.includes(pat); });
                    if (idx >= 0) return idx;
                   }
                   return -1;
                  };
                  // Column detection — "Total (£)" normalises to "total" so check £ first, then total
                  const shipIdx = getColIdx('shipmentcode', 'shipment', 'code');
                  const iqdIdx  = getColIdx('iqd');
                  const usdIdx  = getColIdx('usd$', 'usd', 'dollar', '$');
                  const gbpIdx  = getColIdx('£', 'gbp', 'total', 'pound');
                  const eurIdx  = getColIdx('eur', 'euro');
                  const recvIdx   = getColIdx('receiver', 'recipient', 'customer');
                  const officeIdx = getColIdx('tooffice', 'office', 'destination', 'city');
                  const noteIdx = getColIdx('note', 'status', 'desc');
                  const pn = function(v){ return parseFloat(String(v||'').replace(/,/g,'').replace(/[^0-9.]/g,'')) || 0; };
                  const mapped = raw.slice(headerRowIdx + 1).map(function(row) {
                   const code = String(row[shipIdx >= 0 ? shipIdx : 0]||'').trim();
                   const toOffice = officeIdx >= 0 ? String(row[officeIdx]||'').trim() : '';
                   const receiver = recvIdx >= 0 ? String(row[recvIdx]||'').trim() : '';
                   const excelNote = noteIdx >= 0 ? String(row[noteIdx]||'').trim() : '';
                   // Always store office in notes field prefixed with "Office: "
                   const combinedNotes = (toOffice ? 'Office: '+toOffice : '') + (excelNote ? (toOffice ? ' | ' : '') + excelNote : '');
                   return {
                    shipmentCode: code,
                    receiver: receiver,
                    toOffice: toOffice,
                    amountIQD: iqdIdx >= 0 ? pn(row[iqdIdx]) : 0,
                    amountUSD: usdIdx >= 0 ? pn(row[usdIdx]) : 0,
                    amountGBP: gbpIdx >= 0 ? pn(row[gbpIdx]) : 0,
                    amountEUR: eurIdx >= 0 ? pn(row[eurIdx]) : 0,
                    notes: combinedNotes,
                   };
                  }).filter(function(r){
                   // Only keep rows where shipment code matches pattern: 1-5 letters followed by 2+ digits
                   // e.g. B230, GM207, JF376, LM159, BK1234 — NOT receiver names like "hsain", "Aran Marewan"
                   return r.shipmentCode && /^[A-Za-z]{1,5}[0-9]{2,}/.test(r.shipmentCode.trim());
                  });
                  setPreviewRows(mapped);
                   } catch(err) { alert('Could not parse file: ' + err.message); }
                  };
                  reader.readAsBinaryString(file);
                };

                const handleUpload = async function() {
                  if (!batchName.trim()) { alert('Please enter a batch name'); return; }
                  if (!empId) { alert('Please select an employee'); return; }
                  if (!previewRows.length) { alert('No records to upload'); return; }
                  setUploading(true);
                  try {
                   await apiCall(API_ENDPOINTS.iraqPay + '/batch', { method:'POST', body: JSON.stringify({ batchName: batchName.trim(), employeeId: parseInt(empId), records: previewRows }) });
                   await loadIraqPaymentsFromAPI();
                   setBatchName(''); setEmpId(''); setPreviewRows([]);
                   setActiveTab('view');
                   alert('Batch uploaded successfully!');
                  } catch(e) { alert('Upload failed: ' + e.message); }
                  setUploading(false);
                };

                const handleSaveEdit = async function(p) {
                  try {
                   await apiCall(API_ENDPOINTS.iraqPay + '/' + p.id, { method:'PUT', body: JSON.stringify(editVals) });
                   await loadIraqPaymentsFromAPI();
                   setEditingId(null); setEditVals({});
                  } catch(e) { alert('Failed: ' + e.message); }
                };

                const handleDelete = async function(p) {
                  if (!window.confirm('Delete shipment ' + p.shipmentCode + '?')) return;
                  try { await apiCall(API_ENDPOINTS.iraqPay + '/' + p.id, { method:'DELETE' }); await loadIraqPaymentsFromAPI(); }
                  catch(e) { alert('Failed: ' + e.message); }
                };

                const [filterBatch, setFilterBatch] = useState('');
                const [deletingBatch, setDeletingBatch] = useState(false);

                const handleDeleteBatch = async function() {
                  const batchToDelete = filterBatch;
                  if (!batchToDelete) { alert('Select a batch to delete'); return; }
                  const batchRecords = iraqPayments.filter(function(p){ return p.batchName === batchToDelete; });
                  if (!window.confirm('Delete ALL ' + batchRecords.length + ' records in batch "' + batchToDelete + '"? This cannot be undone.')) return;
                  setDeletingBatch(true);
                  try {
                   for (const p of batchRecords) {
                  await apiCall(API_ENDPOINTS.iraqPay + '/' + p.id, { method: 'DELETE' });
                   }
                   await loadIraqPaymentsFromAPI();
                   setFilterBatch('');
                   alert('Batch "' + batchToDelete + '" deleted — ' + batchRecords.length + ' records removed.');
                  } catch(e) { alert('Failed: ' + e.message); }
                  setDeletingBatch(false);
                };

                const filtered = iraqPayments.filter(function(p){
                  if (filterEmp && p.employeeId !== parseInt(filterEmp)) return false;
                  if (filterStatus !== 'all' && p.status !== filterStatus) return false;
                  if (filterBatch && p.batchName !== filterBatch) return false;
                  return true;
                });

                const statusColor = {pending:'bg-yellow-100 text-yellow-800', partial:'bg-blue-100 text-blue-700', collected:'bg-green-100 text-green-700'};

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                   <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-t-2xl px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                   <span className="text-2xl">🇮🇶</span>
                   <h2 className="text-xl font-bold text-white">Pay in Iraq</h2>
                  </div>
                  <button onClick={onClose} className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"><X className="w-4 h-4"/>Close</button>
                   </div>

                   {/* Tabs */}
                   <div className="flex border-b border-gray-200">
                  {[['view','📋 View Payments'],['upload','📤 Upload Batch']].map(function([t,l]){return(
                   <button key={t} onClick={function(){setActiveTab(t);}} className={'px-6 py-3 font-semibold text-sm transition ' + (activeTab===t?'border-b-2 border-blue-600 text-blue-600':'text-gray-500 hover:text-gray-700')}>{l}</button>
                  );})}
                   </div>

                   <div className="p-6">

                  {/* ── View Payments Tab ── */}
                  {activeTab === 'view' && (
                   <div>
                  <div className="flex gap-3 mb-4 flex-wrap items-center">
                   <select value={filterEmp} onChange={function(e){setFilterEmp(e.target.value);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">All Employees</option>
                  {[...new Set(iraqPayments.map(function(p){return p.employeeId;}))].map(function(id){
                   const p = iraqPayments.find(function(x){return x.employeeId===id;});
                   return <option key={id} value={id}>{p?p.employeeName:id}</option>;
                  })}
                   </select>
                   <select value={filterStatus} onChange={function(e){setFilterStatus(e.target.value);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="partial">Partial</option>
                  <option value="collected">Collected</option>
                   </select>
                   <select value={filterBatch} onChange={function(e){setFilterBatch(e.target.value);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">All Batches</option>
                  {[...new Set(iraqPayments.map(function(p){return p.batchName;}))].sort().map(function(b){
                   return <option key={b} value={b}>{b} ({iraqPayments.filter(function(p){return p.batchName===b;}).length})</option>;
                  })}
                   </select>
                   {filterBatch && (
                  <button onClick={handleDeleteBatch} disabled={deletingBatch} className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center gap-1">
                   {deletingBatch ? 'Deleting...' : '🗑 Delete Batch'}
                  </button>
                   )}
                   <span className="text-sm text-gray-500 self-center">{filtered.length} record{filtered.length!==1?'s':''}</span>
                  </div>

                  <div className="overflow-x-auto">
                   <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-blue-50">
                   {['Employee','Batch','Shipment Code','To Office','IQD','USD','GBP','EUR','Collected','Status','Actions'].map(function(h){return <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-blue-700 border-b border-blue-100">{h}</th>;})}
                  </tr></thead>
                  <tbody className="divide-y divide-gray-100">
                  {filtered.length === 0 && <tr><td colSpan="11" className="text-center py-8 text-gray-400">No records found</td></tr>}
                  {filtered.map(function(p){
                   const isEditing = editingId === p.id;
                   const inp = function(field, val) {
                  return <input type="number" min="0" step="0.01" defaultValue={val} onChange={function(e){setEditVals(Object.assign({},editVals,{[field]:parseFloat(e.target.value)||0}));}} className="w-20 border border-gray-300 rounded px-1 py-0.5 text-xs" />;
                   };
                   return (
                  <tr key={p.id} className={'hover:bg-gray-50 ' + (p.status==='collected'?'opacity-70':'')}>
                   <td className="px-3 py-2 font-semibold text-gray-800 text-xs">{p.employeeName}<br/><span className="text-gray-400 font-normal">{p.employeeCode}</span></td>
                   <td className="px-3 py-2 text-xs text-gray-500">{p.batchName}</td>
                   <td className="px-3 py-2 font-bold text-gray-900">{p.shipmentCode}</td>
                   <td className="px-3 py-2 text-xs text-gray-500">{p.notes && p.notes.startsWith('Office:') ? p.notes.replace('Office:','').trim() : (p.notes||'—')}</td>
                   <td className="px-3 py-2 text-xs">{isEditing ? inp('amountIQD',p.amountIQD) : (p.amountIQD>0?<span className="font-semibold">{p.amountIQD.toLocaleString()}</span>:'—')}</td>
                   <td className="px-3 py-2 text-xs">{isEditing ? inp('amountUSD',p.amountUSD) : (p.amountUSD>0?<span className="font-semibold">${p.amountUSD.toFixed(2)}</span>:'—')}</td>
                   <td className="px-3 py-2 text-xs">{isEditing ? inp('amountGBP',p.amountGBP) : (p.amountGBP>0?<span className="font-semibold">£{p.amountGBP.toFixed(2)}</span>:'—')}</td>
                   <td className="px-3 py-2 text-xs">{isEditing ? inp('amountEUR',p.amountEUR) : (p.amountEUR>0?<span className="font-semibold">€{p.amountEUR.toFixed(2)}</span>:'—')}</td>
                   <td className="px-3 py-2 text-xs">
                  {p.collectedIQD>0 && <div className="text-green-700 font-semibold">IQD {p.collectedIQD.toLocaleString()}</div>}
                  {p.collectedUSD>0 && <div className="text-green-700 font-semibold">${p.collectedUSD.toFixed(2)}</div>}
                  {p.collectedGBP>0 && <div className="text-green-700 font-semibold">£{p.collectedGBP.toFixed(2)}</div>}
                  {p.collectedEUR>0 && <div className="text-green-700 font-semibold">€{p.collectedEUR.toFixed(2)}</div>}
                  {!p.collectedIQD&&!p.collectedUSD&&!p.collectedGBP&&!p.collectedEUR && <span className="text-gray-300">—</span>}
                   </td>
                   <td className="px-3 py-2"><span className={'px-2 py-0.5 rounded-full text-xs font-semibold ' + (statusColor[p.status]||'bg-gray-100 text-gray-600')}>{p.status}</span></td>
                   <td className="px-3 py-2">
                  {isEditing ? (
                   <div className="flex gap-1">
                  <button onClick={function(){handleSaveEdit(p);}} className="px-2 py-1 bg-green-600 text-white rounded text-xs">Save</button>
                  <button onClick={function(){setEditingId(null);setEditVals({});}} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Cancel</button>
                   </div>
                  ) : (
                   <div className="flex gap-1">
                  <button onClick={function(){setEditingId(p.id);setEditVals({amountIQD:p.amountIQD,amountUSD:p.amountUSD,amountGBP:p.amountGBP,amountEUR:p.amountEUR});}} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Edit</button>
                  <button onClick={function(){handleDelete(p);}} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Delete</button>
                   </div>
                  )}
                   </td>
                  </tr>
                   );})}
                  {filtered.length > 0 && (() => {
                  const totIQD = filtered.reduce(function(s,p){return s+(p.amountIQD||0);},0);
                  const totUSD = filtered.reduce(function(s,p){return s+(p.amountUSD||0);},0);
                  const totGBP = filtered.reduce(function(s,p){return s+(p.amountGBP||0);},0);
                  const totEUR = filtered.reduce(function(s,p){return s+(p.amountEUR||0);},0);
                  const colIQD = filtered.reduce(function(s,p){return s+(p.collectedIQD||0);},0);
                  const colUSD = filtered.reduce(function(s,p){return s+(p.collectedUSD||0);},0);
                  const colGBP = filtered.reduce(function(s,p){return s+(p.collectedGBP||0);},0);
                  const colEUR = filtered.reduce(function(s,p){return s+(p.collectedEUR||0);},0);
                  return (
                   <tr className="bg-blue-50 font-bold border-t-2 border-blue-200 text-xs">
                  <td className="px-3 py-2 text-blue-700" colSpan="3">TOTAL ({filtered.length} records)</td>
                  <td className="px-3 py-2 text-blue-600"></td>
                  <td className="px-3 py-2 text-blue-700">{totIQD>0?totIQD.toLocaleString():'—'}</td>
                  <td className="px-3 py-2 text-blue-700">{totUSD>0?'$'+totUSD.toFixed(2):'—'}</td>
                  <td className="px-3 py-2 text-blue-700">{totGBP>0?'£'+totGBP.toFixed(2):'—'}</td>
                  <td className="px-3 py-2 text-blue-700">{totEUR>0?'€'+totEUR.toFixed(2):'—'}</td>
                  <td className="px-3 py-2">
                   {colIQD>0 && <div className="text-green-700">IQD {colIQD.toLocaleString()}</div>}
                   {colUSD>0 && <div className="text-green-700">${colUSD.toFixed(2)}</div>}
                   {colGBP>0 && <div className="text-green-700">£{colGBP.toFixed(2)}</div>}
                   {colEUR>0 && <div className="text-green-700">€{colEUR.toFixed(2)}</div>}
                   {!colIQD&&!colUSD&&!colGBP&&!colEUR && <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-3 py-2 text-blue-600">{filtered.filter(function(p){return p.status==='collected';}).length} collected</td>
                  <td className="px-3 py-2"></td>
                   </tr>
                  );
                  })()}
                  </tbody>
                   </table>
                  </div>
                   </div>
                  )}

                  {/* ── Upload Batch Tab ── */}
                  {activeTab === 'upload' && (
                   <div className="space-y-5 max-w-2xl">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                   <strong>Excel/CSV format:</strong> First column = Shipment Code, then columns named IQD, USD, GBP, EUR (any order). Column names are flexible — the system auto-detects them.
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Batch Name *</label>
                  <input type="text" value={batchName} onChange={function(e){setBatchName(e.target.value);}} placeholder="e.g. May 2026 Batch 1" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Assign to Employee *</label>
                  <select value={empId} onChange={function(e){setEmpId(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                   <option value="">Select employee...</option>
                   {[...visEmp].filter(function(e){return !e.isAdmin;}).sort(function(a,b){return (a.firstName+a.lastName).localeCompare(b.firstName+b.lastName);}).map(function(e){return <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.employeeId})</option>;})}
                  </select>
                   </div>
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Upload Excel / CSV File</label>
                   <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  {previewRows.length > 0 && (
                   <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Preview — {previewRows.length} records</p>
                  <div className="overflow-x-auto max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                   <table className="w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0"><tr>
                   {['Shipment Code','Receiver','To Office','IQD','USD','GBP','EUR','Notes'].map(function(h){return <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>;})}
                  </tr></thead>
                  <tbody className="divide-y divide-gray-100">
                  {previewRows.map(function(r,i){return(
                   <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-1.5 font-semibold">{r.shipmentCode}</td>
                  <td className="px-3 py-1.5 text-gray-500">{r.receiver||'—'}</td>
                  <td className="px-3 py-1.5 text-gray-500">{r.toOffice||'—'}</td>
                  <td className="px-3 py-1.5">{r.amountIQD>0?r.amountIQD.toLocaleString():'—'}</td>
                  <td className="px-3 py-1.5">{r.amountUSD>0?'$'+r.amountUSD.toFixed(2):'—'}</td>
                  <td className="px-3 py-1.5">{r.amountGBP>0?'£'+r.amountGBP.toFixed(2):'—'}</td>
                  <td className="px-3 py-1.5">{r.amountEUR>0?'€'+r.amountEUR.toFixed(2):'—'}</td>
                  <td className="px-3 py-1.5 text-gray-400">{r.notes||'—'}</td>
                   </tr>
                  );})}
                  </tbody>
                   </table>
                  </div>
                  <button onClick={handleUpload} disabled={uploading} className="mt-3 px-6 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50">
                   {uploading ? 'Uploading...' : 'Upload ' + previewRows.length + ' Records'}
                  </button>
                   </div>
                  )}
                   </div>
                  )}

                   </div>
                  </div>
                  </div>
                );
            };
            /* ── End IraqPayManager ─────────────────────────────────────────────────── */

            const AccountCreditsTab = ({ visEmp, financialAdjustments, visibleEmpIds, loadAdjustmentsFromAPI, apiCall, API_ENDPOINTS, getCurrencySymbol }) => {
                const allCredits = financialAdjustments.filter(function(a){return a.type==='account_credit' && visibleEmpIds.has(a.employeeId);});
                const [filterEmpId, setFilterEmpId] = useState('');
                const [filterFrom, setFilterFrom] = useState('');
                const [filterTo, setFilterTo] = useState('');
                const filteredCredits = allCredits.filter(function(a) {
                  if (filterEmpId && a.employeeId !== parseInt(filterEmpId)) return false;
                  if (filterFrom && a.date < filterFrom) return false;
                  if (filterTo && a.date > filterTo) return false;
                  return true;
                });
                const filteredTotal = filteredCredits.reduce(function(s,a){return s+(parseFloat(a.amount)||0);},0);
                const [addingCredit, setAddingCredit] = useState(false);
                const [creditEmpId, setCreditEmpId] = useState('');
                const [creditAmt, setCreditAmt] = useState('');
                const [creditNote, setCreditNote] = useState('');
                const [creditDate, setCreditDate] = useState(new Date().toISOString().split('T')[0]);
                const [creditSaving, setCreditSaving] = useState(false);
                const handleAddCredit = async function() {
                  const amt = parseFloat(creditAmt);
                  if (!creditEmpId) { alert('Please select an employee'); return; }
                  if (!amt || amt <= 0) { alert('Please enter a valid amount'); return; }
                  setCreditSaving(true);
                  try {
                   await apiCall(API_ENDPOINTS.adjustments, { method: 'POST', body: JSON.stringify({ employeeId: parseInt(creditEmpId), type: 'account_credit', amount: amt, reason: creditNote || 'Account credit', date: creditDate }) });
                   await loadAdjustmentsFromAPI();
                   setCreditEmpId(''); setCreditAmt(''); setCreditNote(''); setAddingCredit(false);
                  } catch(e) { alert('Failed: ' + e.message); }
                  setCreditSaving(false);
                };
                const handleDeleteCredit = async function(a) {
                  if (!window.confirm('Delete credit of £' + parseFloat(a.amount).toFixed(2) + ' for ' + a.employeeName + '?')) return;
                  try { await apiCall(API_ENDPOINTS.adjustments + '/' + a.id, { method: 'DELETE' }); await loadAdjustmentsFromAPI(); }
                  catch(e) { alert('Failed: ' + e.message); }
                };
                return (
                  <div className="space-y-4">
                   <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-gray-700">Account Credits</h3>
                  <button onClick={function(){setAddingCredit(!addingCredit);}} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2">
                   <DollarSign className="w-4 h-4" /> Add Credit
                  </button>
                   </div>
                   {addingCredit && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-3">
                   <div className="grid grid-cols-2 gap-3">
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Employee *</label>
                   <select value={creditEmpId} onChange={function(e){setCreditEmpId(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select employee...</option>
                  {[...visEmp].filter(function(e){return !e.isAdmin;}).sort(function(a,b){return (a.firstName+a.lastName).localeCompare(b.firstName+b.lastName);}).map(function(e){return <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.employeeId})</option>;})}
                   </select>
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                   <input type="date" value={creditDate} onChange={function(e){setCreditDate(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Amount *</label>
                   <input type="number" min="0.01" step="0.01" value={creditAmt} onChange={function(e){setCreditAmt(e.target.value);}} placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Note</label>
                   <input type="text" value={creditNote} onChange={function(e){setCreditNote(e.target.value);}} placeholder="e.g. Cash received from agent" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                   </div>
                   <div className="flex gap-2">
                  <button onClick={handleAddCredit} disabled={creditSaving} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">{creditSaving?'Saving...':'Save Credit'}</button>
                  <button onClick={function(){setAddingCredit(false);}} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200">Cancel</button>
                   </div>
                  </div>
                   )}
                   <div className="mb-3 grid grid-cols-1 gap-2">
                  <select value={filterEmpId} onChange={function(e){setFilterEmpId(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                   <option value="">All Employees</option>
                   {[...new Set(allCredits.map(function(a){return a.employeeId;}))].map(function(id){
                  const emp = allCredits.find(function(a){return a.employeeId===id;});
                  return <option key={id} value={id}>{emp ? emp.employeeName : id}</option>;
                   })}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                   <div>
                  <label className="block text-xs text-gray-500 mb-1">From Date</label>
                  <input type="date" value={filterFrom} onChange={function(e){setFilterFrom(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                   </div>
                   <div>
                  <label className="block text-xs text-gray-500 mb-1">To Date</label>
                  <input type="date" value={filterTo} onChange={function(e){setFilterTo(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                   </div>
                  </div>
                  {(filterEmpId || filterFrom || filterTo) && (
                  <button onClick={function(){setFilterEmpId('');setFilterFrom('');setFilterTo('');}} className="text-xs text-indigo-600 hover:underline text-left">✕ Clear filters</button>
                  )}
                  </div>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredCredits.length === 0 && <p className="text-gray-400 text-sm py-4">No account credits found.</p>}
                  {[...filteredCredits].reverse().map(function(a) { return (
                   <div key={a.id} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                  <div>
                   <p className="text-sm font-semibold text-gray-800">{a.employeeName}</p>
                   <p className="text-xs text-gray-500">{new Date(a.date).toLocaleDateString('en-GB')} · {a.reason}</p>
                  </div>
                  <div className="flex items-center gap-3">
                   <span className="font-bold text-indigo-700">{getCurrencySymbol('GBP')}{parseFloat(a.amount).toFixed(2)}</span>
                   <button onClick={function(){handleDeleteCredit(a);}} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200">Delete</button>
                  </div>
                   </div>
                  ); })}
                   </div>
                  {filteredCredits.length > 0 && (
                  <div className="mt-3 flex justify-between items-center bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
                   <span className="text-sm font-semibold text-gray-700">{(filterEmpId || filterFrom || filterTo) ? 'Filtered Total' : 'Grand Total'} ({filteredCredits.length} record{filteredCredits.length!==1?'s':''})</span>
                   <span className="text-lg font-bold text-indigo-700">{getCurrencySymbol('GBP')}{filteredTotal.toFixed(2)}</span>
                  </div>
                  )}
                  </div>
                );
            };

            const FinancialManager = ({ onClose, visibleEmployees: visEmp, persistedState, onStateChange }) => {
                const filteredByCountry = (visEmp || employees).filter(e => !e.isAdmin);
                const visibleEmpIds = new Set(filteredByCountry.map(e => e.id));
                const visibleAdjustments = financialAdjustments.filter(a => visibleEmpIds.has(a.employeeId));
                const mk = (k) => (v) => onStateChange && onStateChange(function(s){return{...s,[k]:typeof v==='function'?v(s[k]):v};});
                const adjAmountRef = React.useRef(null);
                const adjHoursRef = React.useRef(null);
                const adjReasonRef = React.useRef(null);
                const activeTab = persistedState ? persistedState.activeTab : 'add'; const setActiveTab = mk('activeTab');
                const adjustmentType = persistedState ? persistedState.adjustmentType : 'bonus'; const setAdjustmentType = mk('adjustmentType');
                const adjustmentData = persistedState ? persistedState.adjustmentData : { employeeId:'', type:'bonus', amount:'', reason:'', date: new Date().toISOString().split('T')[0], hours:'' };
                const setAdjustmentData = (v) => onStateChange && onStateChange(function(s){return{...s,adjustmentData:typeof v==='function'?v(s.adjustmentData):v};});
                // Credits state stays local (inside AccountCreditsTab component)
                const [addingCredit, setAddingCredit] = useState(false);
                const [creditEmpId, setCreditEmpId] = useState('');
                const [creditAmt, setCreditAmt] = useState('');
                const [creditNote, setCreditNote] = useState('');
                const [creditDate, setCreditDate] = useState(new Date().toISOString().split('T')[0]);
                const [creditSaving, setCreditSaving] = useState(false);

                const handleAddAdjustment = async () => {
                  const amt = adjAmountRef.current ? adjAmountRef.current.value : adjustmentData.amount;
                  const hrs = adjHoursRef.current ? adjHoursRef.current.value : adjustmentData.hours;
                  const rsn = adjReasonRef.current ? adjReasonRef.current.value : adjustmentData.reason;
                  if (!adjustmentData.employeeId || !amt) {
                   alert('Please select an employee and enter an amount');
                   return;
                  }

                  if (adjustmentData.type === 'sick_pay' && !hrs) {
                   alert('Please enter hours for sick pay');
                   return;
                  }

                  const employee = employees.find(e => e.id === parseInt(adjustmentData.employeeId));
                  if (!employee) return;

                  try {
                   const result = await apiCall(API_ENDPOINTS.adjustments, {
                  method: 'POST',
                  body: JSON.stringify({
                   employeeId: parseInt(adjustmentData.employeeId),
                   type: adjustmentData.type,
                   amount: parseFloat(amt),
                   reason: rsn,
                   date: adjustmentData.date,
                   hours: hrs ? parseFloat(hrs) : null
                  })
                   });
                   if (!result.success) throw new Error(result.error || 'API error');
                   await loadAdjustmentsFromAPI();

                   if (adjustmentData.type === 'expense_pay') {
                  const empApprovedExpenses = expenses.filter(e =>
                   e.employeeId === parseInt(adjustmentData.employeeId) && e.status === 'approved'
                  );
                  for (const exp of empApprovedExpenses) {
                   await apiCall(`${API_ENDPOINTS.expenses}/${exp.id}`, {
                  method: 'PUT',
                  body: JSON.stringify({ status: 'paid', paidBy: currentUser.firstName + ' ' + currentUser.lastName })
                   });
                  }
                  if (empApprovedExpenses.length > 0) await loadExpensesFromAPI();
                   }
                  } catch (error) {
                   alert('Failed to save adjustment: ' + error.message);
                   return;
                  }

                  if (adjustmentData.type === 'sick_pay' && hrs) {
                   const sickTimesheet = {
                  id: timesheets.length + 1,
                  employeeId: parseInt(adjustmentData.employeeId),
                  date: adjustmentData.date,
                  startTime: '09:00',
                  finishTime: '17:00',
                  regularHours: parseFloat(hrs),
                  overtimeHours: 0,
                  status: 'approved',
                  notes: `Sick Pay: ${rsn || 'Sick leave'}`,
                  locationId: null,
                  isSickPay: true,
                  checkInLocation: null,
                  checkOutLocation: null
                   };
                   setTimesheets([...timesheets, sickTimesheet]);
                  }

                  if (adjAmountRef.current) adjAmountRef.current.value = '';
                  if (adjHoursRef.current) adjHoursRef.current.value = '';
                  if (adjReasonRef.current) adjReasonRef.current.value = '';
                  setAdjustmentData({
                   employeeId: '',
                   type: 'bonus',
                   amount: '',
                   reason: '',
                   date: new Date().toISOString().split('T')[0],
                   hours: ''
                  });

                  alert(`${adjustmentData.type.replace('_', ' ').toUpperCase()} added successfully!`);
                };

                const handleDeleteAdjustment = async (id) => {
                  if (confirm('Are you sure you want to delete this adjustment?')) {
                   try {
                  const result = await apiCall(`${API_ENDPOINTS.adjustments}/${id}`, { method: 'DELETE' });
                  if (!result.success) throw new Error(result.error || 'API error');
                  await loadAdjustmentsFromAPI();
                   } catch (error) {
                  alert('Failed to delete adjustment: ' + error.message);
                   }
                  }
                };

                const getAdjustmentIcon = (type) => {
                  switch(type) {
                   case 'bonus': return <Gift className="w-5 h-5 text-green-600" />;
                   case 'penalty': return <TrendingDown className="w-5 h-5 text-red-600" />;
                   case 'advance': return <DollarSign className="w-5 h-5 text-blue-600" />;
                   case 'sick_pay': return <Heart className="w-5 h-5 text-purple-600" />;
                   case 'annual_leave': return <Calendar className="w-5 h-5 text-emerald-600" />;
                   default: return <DollarSign className="w-5 h-5" />;
                  }
                };

                const getAdjustmentColor = (type) => {
                  switch(type) {
                   case 'bonus': return 'bg-green-100 text-green-800';
                   case 'penalty': return 'bg-red-100 text-red-800';
                   case 'advance': return 'bg-blue-100 text-blue-800';
                   case 'sick_pay': return 'bg-purple-100 text-purple-800';
                   case 'annual_leave': return 'bg-emerald-100 text-emerald-800';
                   case 'payment': return 'bg-teal-100 text-teal-800';
                   case 'expense_pay': return 'bg-teal-100 text-teal-800';
                  case 'acct_settle': return 'bg-indigo-100 text-indigo-800';
                   default: return 'bg-gray-100 text-gray-800';
                  }
                };

                const employeeAdjustments = filteredByCountry.map(employee => {
                  const empAdjustments = financialAdjustments.filter(adj => adj.employeeId === employee.id);
                  const bonuses = empAdjustments.filter(a => a.type === 'bonus' || a.type === 'annual_leave').reduce((sum, a) => sum + a.amount, 0);
                  const penalties = empAdjustments.filter(a => a.type === 'penalty').reduce((sum, a) => sum + a.amount, 0);
                  const advances = empAdjustments.filter(a => a.type === 'advance').reduce((sum, a) => sum + a.amount, 0);
                  const sickPay = empAdjustments.filter(a => a.type === 'sick_pay').reduce((sum, a) => sum + a.amount, 0);

                  return {
                   employee,
                   adjustments: empAdjustments,
                   bonuses,
                   penalties,
                   advances,
                   sickPay,
                   netAdjustment: bonuses - penalties - advances + sickPay
                  };
                });

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <DollarSign className="w-7 h-7 text-green-600" />
                  Financial Adjustments Manager
                   </h2>
                   <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                   </button>
                  </div>

                  <div className="flex border-b border-gray-200">
                   <button
                  onClick={() => setActiveTab('add')}
                  className={`flex-1 px-6 py-3 font-semibold transition ${
                   activeTab === 'add'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
                   >
                  Add Adjustment
                   </button>
                   <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 px-6 py-3 font-semibold transition ${
                   activeTab === 'history'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
                   >
                  History
                   </button>
                   <button
                  onClick={() => setActiveTab('credits')}
                  className={`flex-1 px-6 py-3 font-semibold transition relative ${
                   activeTab === 'credits'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
                   >
                  Account Credits

                   </button>
                   <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex-1 px-6 py-3 font-semibold transition ${
                   activeTab === 'summary'
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
                   >
                  Summary
                   </button>
                  </div>

                  <div className="p-6">

                   {activeTab === 'add' && (
                  <div className="space-y-6">
                   <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                   <strong>Financial Adjustments:</strong> Add bonuses, penalties, advance payments, or sick pay for employees. All adjustments are tracked and reflected in payroll calculations.
                  </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Employee *</label>
                   <select
                  value={adjustmentData.employeeId}
                  onChange={(e) => setAdjustmentData({...adjustmentData, employeeId: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   >
                  <option value="">Select Employee</option>
                  {filteredByCountry.map(emp => (
                   <option key={emp.id} value={emp.id}>
                  {emp?.firstName || ""} {emp?.lastName || ""} ({emp.employeeId})
                   </option>
                  ))}
                   </select>
                  </div>

                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                   <select
                  value={adjustmentData.type}
                  onChange={(e) => setAdjustmentData({...adjustmentData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   >
                  <option value="bonus">Bonus (Add Money)</option>
                  <option value="penalty">Penalty (Deduct Money)</option>
                  <option value="advance">Advance Payment (Deduct from Wages)</option>
                  <option value="sick_pay">Sick Pay (Add Hours + Payment)</option>
                  <option value="payment">Pay Employee (Debit Balance)</option>
                  <option value="expense_pay">Expense Reimbursement (Pay Expenses)</option>
                   </select>
                  </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Amount ({adjustmentData.employeeId ? getEmployeeCurrency(parseInt(adjustmentData.employeeId)) : "£"}) *</label>
                   <input
                  type="number"
                  step="0.01"
                  ref={adjAmountRef}
                  defaultValue={adjustmentData.amount}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   />
                  </div>

                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                   <input
                  type="date"
                  value={adjustmentData.date}
                  onChange={(e) => setAdjustmentData({...adjustmentData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   />
                  </div>
                   </div>

                   {adjustmentData.type === 'sick_pay' && (
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Hours (for sick pay) *</label>
                   <input
                  type="number"
                  step="0.5"
                  ref={adjHoursRef}
                  defaultValue={adjustmentData.hours}
                  placeholder="8.0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   />
                   <p className="text-sm text-gray-500 mt-1">These hours will be added to the employee's timesheet</p>
                  </div>
                   )}

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reason / Notes *</label>
                  <textarea
                   ref={adjReasonRef}
                   defaultValue={adjustmentData.reason}
                   placeholder="Enter reason for this adjustment..."
                   rows="3"
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                   </div>

                   {adjustmentData.employeeId && (adjAmountRef.current ? adjAmountRef.current.value : adjustmentData.amount) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                   <h3 className="font-semibold text-gray-700 mb-2">Preview:</h3>
                   <div className="flex items-center justify-between">
                  <span>
                   {employees.find(e => e.id === parseInt(adjustmentData.employeeId))?.firstName}{' '}
                   {employees.find(e => e.id === parseInt(adjustmentData.employeeId))?.lastName}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getAdjustmentColor(adjustmentData.type)}`}>
                   {adjustmentData.type === 'bonus' && '+'}
                   {adjustmentData.type === 'penalty' && '-'}
                   {adjustmentData.type === 'advance' && '-'}
                   {adjustmentData.type === 'sick_pay' && '+'}
                   {(adjustmentData.type === 'payment' || adjustmentData.type === 'expense_pay') && '-'}
                   {getEmployeeCurrency(parseInt(adjustmentData.employeeId))}{adjAmountRef.current ? adjAmountRef.current.value : adjustmentData.amount}
                   {adjustmentData.type === 'sick_pay' && adjustmentData.hours && ` (${adjustmentData.hours}h)`}
                  </span>
                   </div>
                  </div>
                   )}

                   <button
                  onClick={handleAddAdjustment}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                   >
                  Add Financial Adjustment
                   </button>
                  </div>
                   )}

                   {activeTab === 'credits' && <AccountCreditsTab visEmp={visEmp} financialAdjustments={financialAdjustments} visibleEmpIds={visibleEmpIds} loadAdjustmentsFromAPI={loadAdjustmentsFromAPI} apiCall={apiCall} API_ENDPOINTS={API_ENDPOINTS} getCurrencySymbol={getCurrencySymbol} />}

                   {activeTab === 'history' && (
                  <div>
                   <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">All Adjustments ({visibleAdjustments.length})</h3>
                   </div>

                   {visibleAdjustments.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                   <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                   <p className="text-gray-600">No financial adjustments yet</p>
                  </div>
                   ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                   {[...visibleAdjustments].reverse().map(adjustment => (
                  <div key={adjustment.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                   <div className="flex justify-between items-start">
                  <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                  {getAdjustmentIcon(adjustment.type)}
                  <div>
                   <h4 className="font-semibold text-gray-800">{adjustment.employeeName}</h4>
                   <p className="text-sm text-gray-600">{new Date(adjustment.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAdjustmentColor(adjustment.type)}`}>
                   {adjustment.type.replace('_', ' ').toUpperCase()}
                  </span>
                   </div>
                   <p className="text-sm text-gray-600 mb-2">{adjustment.reason}</p>
                   <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-semibold text-lg">
                   {adjustment.type === 'bonus' || adjustment.type === 'sick_pay' ? '+' : '-'}
                   {getEmployeeCurrency(adjustment.employeeId)}{adjustment.amount.toFixed(2)}
                  </span>
                  {adjustment.hours && (
                   <span className="text-purple-600">({adjustment.hours}h added)</span>
                  )}
                  <span>• Added by: {adjustment.createdBy}</span>
                   </div>
                  </div>
                  <button
                   onClick={() => handleDeleteAdjustment(adjustment.id)}
                   className="ml-4 text-red-600 hover:text-red-700"
                  >
                   <X className="w-5 h-5" />
                  </button>
                   </div>
                  </div>
                   ))}
                  </div>
                   )}
                  </div>
                   )}

                   {activeTab === 'summary' && (
                  <div>
                   <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                   <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-600 font-semibold">Total Bonuses</p>
                   </div>
                   <p className="text-2xl font-bold text-green-700">
                  {visibleAdjustments.filter(a => a.type === 'bonus').reduce((sum, a) => sum + a.amount, 0).toFixed(2)}
                   </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                   <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-600 font-semibold">Total Penalties</p>
                   </div>
                   <p className="text-2xl font-bold text-red-700">
                  {visibleAdjustments.filter(a => a.type === 'penalty').reduce((sum, a) => sum + a.amount, 0).toFixed(2)}
                   </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                   <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-blue-600 font-semibold">Total Advances</p>
                   </div>
                   <p className="text-2xl font-bold text-blue-700">
                  {visibleAdjustments.filter(a => a.type === 'advance').reduce((sum, a) => sum + a.amount, 0).toFixed(2)}
                   </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                   <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <p className="text-sm text-purple-600 font-semibold">Total Sick Pay</p>
                   </div>
                   <p className="text-2xl font-bold text-purple-700">
                  {visibleAdjustments.filter(a => a.type === 'sick_pay').reduce((sum, a) => sum + a.amount, 0).toFixed(2)}
                   </p>
                  </div>
                   </div>

                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Employee Summary</h3>
                   <div className="overflow-x-auto">
                  <table className="w-full">
                   <thead className="bg-gray-50">
                  <tr>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Employee</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bonuses</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Penalties</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Advances</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sick Pay</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Net Adjustment</th>
                  </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                  {employeeAdjustments.filter(ea => ea.adjustments.length > 0).map(empAdj => (
                   <tr key={empAdj.employee.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                   <p className="font-medium text-gray-900">
                  {empAdj.employee.firstName} {empAdj.employee.lastName}
                   </p>
                   <p className="text-xs text-gray-500">{empAdj.employee.employeeId}</p>
                  </td>
                  <td className="px-4 py-3 text-green-700 font-semibold">+{getCurrencySymbol(empAdj.employee.currency || 'GBP')}{empAdj.bonuses.toFixed(2)}</td>
                  <td className="px-4 py-3 text-red-700 font-semibold">-{getCurrencySymbol(empAdj.employee.currency || 'GBP')}{empAdj.penalties.toFixed(2)}</td>
                  <td className="px-4 py-3 text-blue-700 font-semibold">-{getCurrencySymbol(empAdj.employee.currency || 'GBP')}{empAdj.advances.toFixed(2)}</td>
                  <td className="px-4 py-3 text-purple-700 font-semibold">+{getCurrencySymbol(empAdj.employee.currency || 'GBP')}{empAdj.sickPay.toFixed(2)}</td>
                  <td className={`px-4 py-3 font-bold ${empAdj.netAdjustment >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                   {empAdj.netAdjustment >= 0 ? '+' : ''}{getCurrencySymbol(empAdj.employee.currency || 'GBP')}{empAdj.netAdjustment.toFixed(2)}
                  </td>
                   </tr>
                  ))}
                   </tbody>
                  </table>
                  {employeeAdjustments.filter(ea => ea.adjustments.length > 0).length === 0 && (
                   <div className="text-center py-8 text-gray-500">
                  No adjustments to display
                   </div>
                  )}
                   </div>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const ReportGenerator = ({ onClose, visibleEmployees: visEmp, persistedState, onStateChange }) => {
                const filteredByCountry = visEmp || employees;
                const mk = (k) => (v) => onStateChange && onStateChange(function(s){return{...s,[k]:typeof v==='function'?v(s[k]):v};});
                const adjAmountRef = React.useRef(null);
                const adjHoursRef = React.useRef(null);
                const adjReasonRef = React.useRef(null);
                const expandedEmp = persistedState ? persistedState.expandedEmp : null; const setExpandedEmp = mk('expandedEmp');
                const reportType = persistedState ? persistedState.reportType : 'summary'; const setReportType = mk('reportType');
                const startDate = persistedState ? persistedState.startDate : (() => { const d=new Date(); d.setDate(d.getDate()-7); return d.toISOString().split('T')[0]; })();
                const setStartDate = mk('startDate');
                const endDate = persistedState ? persistedState.endDate : new Date().toISOString().split('T')[0]; const setEndDate = mk('endDate');
                const selectedDepartment = persistedState ? persistedState.selectedDepartment : 'all'; const setSelectedDepartment = mk('selectedDepartment');
                const selectedEmployee = persistedState ? persistedState.selectedEmployee : 'all'; const setSelectedEmployee = mk('selectedEmployee');
                const selectedBranch = persistedState ? persistedState.selectedBranch : 'all'; const setSelectedBranch = mk('selectedBranch');
                const selectedCountry = persistedState ? persistedState.selectedCountry : 'all'; const setSelectedCountry = mk('selectedCountry');
                const generatedReport = persistedState ? persistedState.generatedReport : null; const setGeneratedReport = mk('generatedReport');

                const generateReport = () => {
                  if (!startDate || !endDate) {
                   alert('Please select both start and end dates');
                   return;
                  }

                  if (new Date(startDate) > new Date(endDate)) {
                   alert('Start date must be before end date');
                   return;
                  }

                  const filteredTimesheets = (() => {
                   // Deduplicate: if a date has both checkedin + pending/approved, keep only the pending/approved
                   const inRange = timesheets.filter(ts => {
                  const tsDate = new Date(ts.date);
                  return tsDate >= new Date(startDate) && tsDate <= new Date(endDate);
                   });
                   const betterExists = (ts) => ts.status === 'checkedin' && inRange.some(function(t) {
                  return t.employeeId === ts.employeeId && t.date === ts.date && (t.status === 'pending' || t.status === 'approved');
                   });
                   return inRange.filter(function(ts) { return !betterExists(ts); });
                  })();

                  let relevantEmployees = filteredByCountry.filter(emp => !emp.isAdmin);
                  if (selectedDepartment !== 'all') {
                   relevantEmployees = relevantEmployees.filter(emp => emp.department === selectedDepartment);
                  }
                  if (selectedBranch !== 'all') {
                   relevantEmployees = relevantEmployees.filter(emp => (emp.branches || []).includes(selectedBranch));
                  }
                  if (selectedCountry !== 'all') {
                   relevantEmployees = relevantEmployees.filter(emp => emp.country === selectedCountry);
                  }
                  if (selectedEmployee !== 'all') {
                   relevantEmployees = relevantEmployees.filter(emp => emp.id === parseInt(selectedEmployee));
                  }

                  const reportData = relevantEmployees.map(employee => {
                   const empTimesheets = filteredTimesheets.filter(ts => ts.employeeId === employee.id);

                   const totalRegular = empTimesheets.reduce((sum, ts) => sum + (ts.regularHours || 0), 0);
                   const totalOvertime = empTimesheets.reduce((sum, ts) => sum + (ts.overtimeHours || 0), 0);
                   const totalHours = totalRegular + totalOvertime;

                   const empOtMult = (employee.overtimeRate != null && employee.overtimeRate !== '') ? parseFloat(employee.overtimeRate) : (payrollSettings.overtimeMultiplier || 1.5);
                   const regularPay = totalRegular * employee.hourlyRate;
                   const overtimePay = totalOvertime * employee.hourlyRate * empOtMult;
                   const basePay = regularPay + overtimePay;

                   const empAdjustments = financialAdjustments.filter(adj => {
                  const adjDate = new Date(adj.date);
                  const start = new Date(startDate);
                  const end = new Date(endDate);
                  return adj.employeeId === employee.id && adjDate >= start && adjDate <= end;
                   });
                   const bonuses = empAdjustments.filter(a => a.type === 'bonus' || a.type === 'annual_leave').reduce((sum, a) => sum + a.amount, 0);
                   const penalties = empAdjustments.filter(a => a.type === 'penalty').reduce((sum, a) => sum + a.amount, 0);
                   const advances = empAdjustments.filter(a => a.type === 'advance').reduce((sum, a) => sum + a.amount, 0);
                   const sickPay = empAdjustments.filter(a => a.type === 'sick_pay').reduce((sum, a) => sum + a.amount, 0);
                   const totalAdjustments = bonuses - penalties - advances + sickPay;

                   const totalPay = basePay + totalAdjustments;

                   const approvedShifts = empTimesheets.filter(ts => ts.status === 'approved').length;
                   const pendingShifts = empTimesheets.filter(ts => ts.status === 'pending').length;
                   const rejectedShifts = empTimesheets.filter(ts => ts.status === 'rejected').length;

                   return {
                  employee,
                  timesheets: empTimesheets,
                  totalRegular,
                  totalOvertime,
                  totalHours,
                  regularPay,
                  overtimePay,
                  basePay,
                  bonuses,
                  penalties,
                  advances,
                  sickPay,
                  totalAdjustments,
                  totalPay,
                  approvedShifts,
                  pendingShifts,
                  rejectedShifts,
                  shiftsCount: empTimesheets.length
                   };
                  }).filter(data => data.shiftsCount > 0);

                  setGeneratedReport({
                   startDate,
                   endDate,
                   department: selectedDepartment,
                   employeeId: selectedEmployee,
                   data: reportData,
                   totalEmployees: reportData.length,
                   grandTotalHours: reportData.reduce((sum, d) => sum + d.totalHours, 0),
                   grandTotalPay: reportData.reduce((sum, d) => sum + d.totalPay, 0),
                   payByCurrency: reportData.reduce((acc, d) => {
                   const sym = getCurrencySymbol(d.employee.currency || 'GBP');
                   acc[sym] = (acc[sym] || 0) + d.totalPay;
                   return acc;
                   }, {})
                  });
                };

                const exportToCSV = () => {
                  if (!generatedReport) return;

                  let csv = 'Employee ID,Name,Department,Position,Total Hours,Regular Hours,Overtime Hours,Hourly Rate,Regular Pay,Overtime Pay,Total Pay,Approved Shifts,Pending Shifts,Rejected Shifts\n';

                  generatedReport.data.forEach(row => {
                   csv += `${row.employee.employeeId},`;
                   csv += `"${row.employee.firstName} ${row.employee.lastName}",`;
                   csv += `${row.employee.department},`;
                   csv += `${row.employee.position},`;
                   csv += `${row.totalHours.toFixed(2)},`;
                   csv += `${row.totalRegular.toFixed(2)},`;
                   csv += `${row.totalOvertime.toFixed(2)},`;
                   csv += `${row.employee.hourlyRate.toFixed(2)},`;
                   csv += `${row.regularPay.toFixed(2)},`;
                   csv += `${row.overtimePay.toFixed(2)},`;
                   csv += `${row.totalPay.toFixed(2)},`;
                   csv += `${row.approvedShifts},`;
                   csv += `${row.pendingShifts},`;
                   csv += `${row.rejectedShifts}\n`;
                  });

                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `payroll-report-${startDate}-to-${endDate}.csv`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                };

                const printReport = () => {
                  window.print();
                };

                const departments = [...new Set(filteredByCountry.filter(e => !e.isAdmin).map(e => e.department))];

                React.useEffect(() => {
                  const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
                  window.addEventListener('keydown', handleEsc);
                  return () => window.removeEventListener('keydown', handleEsc);
                }, []);

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl my-8">
                  <div className="sticky top-0 z-10 bg-white p-6 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="w-7 h-7 text-indigo-600" />
                  Payroll & Hours Report Generator
                   </h2>
                   <button onClick={onClose} className="bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-lg px-4 py-2 flex items-center gap-2 font-semibold transition">
                  <X className="w-5 h-5" /> Close
                   </button>
                  </div>

                  <div className="p-6">
                   <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-900">
                   <strong>Generate Reports:</strong> Select a date range and filters to generate comprehensive payroll and hours reports for your employees.
                  </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                   <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   />
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">End Date *</label>
                   <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   />
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                   <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option value="all">All Departments</option>
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                   </select>
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                   <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option value="all">All Branches</option>
                  {branchList.map(b => <option key={b} value={b}>{b}</option>)}
                   </select>
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                   <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option value="all">All Countries</option>
                  {[...new Set(filteredByCountry.filter(e => !e.isAdmin && e.country).map(e => e.country))].sort().map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Employee</label>
                   <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option value="all">All Employees</option>
                  {filteredByCountry.filter(e => !e.isAdmin
                  && (selectedDepartment === 'all' || e.department === selectedDepartment)
                  && (selectedBranch === 'all' || (e.branches||[]).includes(selectedBranch))
                  && (selectedCountry === 'all' || e.country === selectedCountry)
                  ).map(emp => (
                   <option key={emp.id} value={emp.id}>{emp?.firstName || ""} {emp?.lastName || ""}</option>
                  ))}
                   </select>
                  </div>
                   </div>

                   <div className="flex gap-4 mb-6">
                  <button
                   onClick={generateReport}
                   className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                   <FileText className="w-5 h-5" />
                   Generate Report
                  </button>
                  {generatedReport && (
                   <>
                  <button
                   onClick={exportToCSV}
                   className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                  >
                   <Download className="w-5 h-5" />
                   Export to CSV
                  </button>
                  <button
                   onClick={printReport}
                   className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition flex items-center gap-2"
                  >
                   <FileText className="w-5 h-5" />
                   Print Report
                  </button>
                   </>
                  )}
                   </div>

                   {generatedReport && (
                  <div className="border-t border-gray-200 pt-6">
                   <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                   <p className="text-sm text-indigo-600 font-semibold">Report Period</p>
                   <p className="text-lg font-bold text-indigo-900">
                  {new Date(generatedReport.startDate).toLocaleDateString()} - {new Date(generatedReport.endDate).toLocaleDateString()}
                   </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                   <p className="text-sm text-blue-600 font-semibold">Employees Worked</p>
                   <p className="text-lg font-bold text-blue-900">{generatedReport.totalEmployees}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                   <p className="text-sm text-green-600 font-semibold">Total Payroll</p>
                   {Object.entries(generatedReport.payByCurrency).map(function(entry) {
                   return <p key={entry[0]} className="text-lg font-bold text-green-900">{entry[0]}{entry[1].toFixed(2)}</p>;
                   })}
                  </div>
                   </div>

                   <div className="overflow-x-auto max-h-screen overflow-y-auto">
                  <table className="w-full">
                   <thead className="bg-gray-50 sticky top-0">
                  <tr>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Employee</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Shifts</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Regular Hrs</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Overtime Hrs</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Hrs</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rate</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Pay</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Details</th>
                  </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                  {generatedReport.data.map(row => (
                   <React.Fragment key={row.employee.id}>
                   <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedEmp(expandedEmp === row.employee.id ? null : row.employee.id)}>
                  <td className="px-4 py-3">
                   <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">{expandedEmp === row.employee.id ? '▼' : '▶'}</span>
                  <div>
                   <p className="font-medium text-gray-900">{row.employee.firstName} {row.employee.lastName}</p>
                   <p className="text-xs text-gray-500">{row.employee.employeeId}</p>
                  </div>
                   </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{row.employee.department}</td>
                  <td className="px-4 py-3 text-sm">
                   <div className="text-xs">
                  <span className="text-green-600">{row.approvedShifts} approved</span>
                  {row.pendingShifts > 0 && <span className="text-yellow-600 ml-1">{row.pendingShifts} pending</span>}
                  {row.rejectedShifts > 0 && <span className="text-red-600 ml-1">{row.rejectedShifts} rejected</span>}
                   </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{row.totalRegular.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-amber-600">{row.totalOvertime.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm font-bold">{row.totalHours.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm">{getCurrencySymbol(row.employee.currency || "GBP")}{row.employee.hourlyRate.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm font-bold text-green-700">{getCurrencySymbol(row.employee.currency || "GBP")}{row.totalPay.toFixed(2)}</td>
                  <td className="px-4 py-3 text-xs text-indigo-600 font-medium">{expandedEmp === row.employee.id ? 'Hide ▲' : 'Show ▼'}</td>
                   </tr>
                   {expandedEmp === row.employee.id && (
                  <tr>
                   <td colSpan="9" className="bg-indigo-50 px-6 py-3">
                  <table className="w-full text-sm">
                   <thead>
                  <tr className="text-indigo-700 text-xs font-semibold border-b border-indigo-200">
                   <th className="py-2 text-left">Date</th>
                   <th className="py-2 text-left">Start</th>
                   <th className="py-2 text-left">Finish</th>
                   <th className="py-2 text-left">Regular</th>
                   <th className="py-2 text-left">Overtime</th>
                   <th className="py-2 text-left">Total</th>
                   <th className="py-2 text-left">Pay</th>
                   <th className="py-2 text-left">Status</th>
                  </tr>
                   </thead>
                   <tbody>
                  {row.timesheets.sort((a,b) => new Date(a.date)-new Date(b.date)).map(ts => {
                   const shiftPay = ((ts.regularHours||0) + (ts.overtimeHours||0)) * (row.employee.hourlyRate||0);
                   const sym = getCurrencySymbol(row.employee.currency||'GBP');
                   return (
                   <tr key={ts.id} className="border-b border-indigo-100 last:border-0">
                  <td className="py-1.5 font-medium">{new Date(ts.date+'T12:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</td>
                  <td className="py-1.5 text-blue-700 font-semibold">
                   {ts.startTime}
                   {ts.checkInLocation && (
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{ts.checkInLocation}</div>
                   )}
                  </td>
                  <td className="py-1.5 text-blue-700 font-semibold">
                   {ts.finishTime}
                   {ts.checkOutLocation && (
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{ts.checkOutLocation}</div>
                   )}
                  </td>
                  <td className="py-1.5">{(ts.regularHours||0).toFixed(1)}h</td>
                  <td className="py-1.5 text-amber-600">{(ts.overtimeHours||0).toFixed(1)}h</td>
                  <td className="py-1.5 font-semibold">{((ts.regularHours||0)+(ts.overtimeHours||0)).toFixed(1)}h</td>
                  <td className="py-1.5 text-green-700 font-semibold">{sym}{shiftPay.toFixed(2)}</td>
                  <td className="py-1.5">
                   <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ts.status==='approved'?'bg-green-100 text-green-700':ts.status==='rejected'?'bg-red-100 text-red-700':'bg-yellow-100 text-yellow-700'}`}>
                  {ts.status}
                   </span>
                  </td>
                   </tr>
                   );
                  })}
                   </tbody>
                  </table>
                   </td>
                  </tr>
                   )}
                   </React.Fragment>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                   <td className="px-4 py-3" colSpan="5">TOTAL</td>
                   <td className="px-4 py-3 text-sm">{generatedReport.grandTotalHours.toFixed(1)}</td>
                   <td className="px-4 py-3 text-sm"></td>
                   <td className="px-4 py-3 text-sm text-green-700">
                   {Object.entries(generatedReport.payByCurrency).map(function(entry) {
                   return <div key={entry[0]}>{entry[0]}{entry[1].toFixed(2)}</div>;
                   })}
                   </td>
                   <td className="px-4 py-3"></td>
                  </tr>
                   </tbody>
                  </table>
                   </div>
                  </div>
                   )}

                   {generatedReport && generatedReport.data.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                   <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                   <p className="text-gray-600">No timesheet data found for the selected criteria</p>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const EmployeeManager = ({ onClose, visibleEmployees: visEmp }) => {
                const [activeTab, setActiveTab] = useState('list');
                const [resetPasswordFor, setResetPasswordFor] = useState(null);
                const [newEmployeeData, setNewEmployeeData] = useState({
                  firstName: '',
                  lastName: '',
                  email: '',
                  department: '',
                  position: '',
                  password: '',
                  hourlyRate: '0.00',
                  country: '',
                  currency: 'GBP'
                });
                const [editingEmployee, setEditingEmployee] = useState(null);
                const [editData, setEditData] = useState(null);

                const nonAdminEmployees = (visEmp || employees).filter(emp => !emp.isAdmin);

                const handleAddNewEmployee = () => {
                  if (!newEmployeeData.firstName || !newEmployeeData.lastName || !newEmployeeData.email || !newEmployeeData.password) {
                   alert('Please fill in all required fields');
                   return;
                  }

                  if (employees.find(e => e.email === newEmployeeData.email)) {
                   alert('An account with this email already exists');
                   return;
                  }

                  if (newEmployeeData.password.length < 6) {
                   alert('Password must be at least 6 characters');
                   return;
                  }

                  handleAdminAddEmployee(newEmployeeData);
                  setNewEmployeeData({
                   firstName: '',
                   lastName: '',
                   email: '',
                   department: '',
                   position: '',
                   password: '',
                   hourlyRate: '0.00',
                   country: '',
                   currency: 'GBP'
                  });
                  alert('Employee account created successfully!');
                  setActiveTab('list');
                };

                const startEditEmployee = (employee) => {
                  setEditingEmployee(employee.id);
                  setEditData({
                   firstName: employee.firstName,
                   lastName: employee.lastName,
                   email: employee.email,
                   department: employee.department,
                   position: employee.position,
                   hourlyRate: employee.hourlyRate.toString(),
                   assignedLocations: employee.assignedLocations || [],
                   branches: employee.branches || [],
                   country: employee.country || '',
                   currency: employee.currency || 'GBP',
                   standardHours: employee.standardHours !== null && employee.standardHours !== undefined ? employee.standardHours.toString() : '',
                   overtimeRate: employee.overtimeRate !== null && employee.overtimeRate !== undefined ? employee.overtimeRate.toString() : '',
                   minimumHoursEnabled: !!(employee.minimumHours),
                   minimumHours: employee.minimumHours !== null && employee.minimumHours !== undefined ? employee.minimumHours.toString() : '10'
                  });
                };

                const saveEmployeeChanges = async (employeeId) => {
                  await handleUpdateEmployee(employeeId, {
                   ...editData,
                   hourlyRate: parseFloat(editData.hourlyRate),
                   standardHours: editData.standardHours !== '' ? parseFloat(editData.standardHours) : null,
                   overtimeRate: editData.overtimeRate !== '' ? parseFloat(editData.overtimeRate) : null,
                   minimumHours: editData.minimumHoursEnabled ? (parseFloat(editData.minimumHours) || 10) : null
                  });
                  setEditingEmployee(null);
                  setEditData(null);
                  alert('Employee details updated successfully!');
                };

                const cancelEdit = () => {
                  setEditingEmployee(null);
                  setEditData(null);
                };

                const deleteEmployee = async (employeeId) => {
                  const employee = employees.find(e => e.id === employeeId);
                  if (window.confirm(`Are you sure you want to delete ${employee?.firstName || ""} ${employee?.lastName || ""}?`)) {
                   await handleDeleteEmployee(employeeId);
                   alert('Employee deleted successfully!');
                  }
                };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <UserCog className="w-7 h-7 text-indigo-600" />
                  Employee Management
                   </h2>
                   <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                   </button>
                  </div>

                  <div className="p-6">
                   <div className="flex gap-4 mb-6">
                  <button
                   onClick={() => setActiveTab('list')}
                   className={`px-6 py-2 rounded-lg font-semibold transition ${
                  activeTab === 'list'
                   ? 'bg-indigo-600 text-white'
                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                   }`}
                  >
                   Employee List ({nonAdminEmployees.length})
                  </button>
                  <button
                   onClick={() => setActiveTab('add')}
                   className={`px-6 py-2 rounded-lg font-semibold transition ${
                  activeTab === 'add'
                   ? 'bg-indigo-600 text-white'
                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                   }`}
                  >
                   Add New Employee
                  </button>
                   </div>

                   {activeTab === 'list' && (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                   {nonAdminEmployees.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                   <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                   <p className="text-gray-600">No employees added yet</p>
                   <button
                  onClick={() => setActiveTab('add')}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                   >
                  Add First Employee
                   </button>
                  </div>
                   ) : (
                  nonAdminEmployees.map(employee => (
                   <div key={employee.id} className="border border-gray-200 rounded-xl p-6">
                  {editingEmployee === employee.id ? (
                   <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                   type="text"
                   value={editData.firstName}
                   onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                   type="text"
                   value={editData.lastName}
                   onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                   </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                   value={editData.department}
                   onChange={(e) => setEditData({...editData, department: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                   <option value="Engineering">Engineering</option>
                   <option value="Sales">Sales</option>
                   <option value="Marketing">Marketing</option>
                   <option value="Finance">Finance</option>
                   <option value="Operations">Operations</option>
                   <option value="Human Resources">Human Resources</option>
                  </select>
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                  <input
                   type="text"
                   value={editData.position}
                   onChange={(e) => setEditData({...editData, position: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                   </div>
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate (£)</label>
                   <input
                  type="number"
                  step="0.01"
                  value={editData.hourlyRate}
                  onChange={(e) => setEditData({...editData, hourlyRate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                   />
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Assigned Locations</label>
                   <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg p-3">
                  {workLocations.filter(loc => loc.active).map(location => (
                   <label key={location.id} className="flex items-center gap-2 text-sm">
                  <input
                   type="checkbox"
                   checked={editData.assignedLocations?.includes(location.id)}
                   onChange={(e) => {
                  const current = editData.assignedLocations || [];
                  if (e.target.checked) {
                   setEditData({...editData, assignedLocations: [...current, location.id]});
                  } else {
                   setEditData({...editData, assignedLocations: current.filter(id => id !== location.id)});
                  }
                   }}
                   className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span>{location.name}</span>
                   </label>
                  ))}
                  {workLocations.filter(loc => loc.active).length === 0 && (
                   <p className="text-sm text-gray-500 col-span-2">No active locations available</p>
                  )}
                   </div>
                  </div>

                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">🏢 Assigned Branches</label>
                   <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg p-3">
                  {branchList.map(branch => (
                   <label key={branch} className="flex items-center gap-2 text-sm">
                  <input
                   type="checkbox"
                   checked={(editData.branches || []).includes(branch)}
                   onChange={(e) => {
                  const current = editData.branches || [];
                  if (e.target.checked) {
                   setEditData({...editData, branches: [...current, branch]});
                  } else {
                   setEditData({...editData, branches: current.filter(b => b !== branch)});
                  }
                   }}
                   className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>{branch}</span>
                   </label>
                  ))}
                  {branchList.length === 0 && (
                   <p className="text-sm text-gray-500 col-span-2">No branches defined yet. Use the "Branches" button in the top nav to create branches.</p>
                  )}
                   </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                  <input
                   type="text"
                   value={editData.country || ''}
                   onChange={(e) => setEditData({...editData, country: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                   placeholder="e.g. United Kingdom"
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Currency</label>
                  <select
                   value={editData.currency || 'GBP'}
                   onChange={(e) => setEditData({...editData, currency: e.target.value})}
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                   <option value="GBP">£ GBP</option>
                   <option value="USD">$ USD</option>
                   <option value="EUR">€ EUR</option>
                   <option value="IQD">IQD</option>
                  </select>
                   </div>
                  </div>
                  <div className="border border-indigo-100 bg-indigo-50 rounded-lg p-3">
                   <p className="text-xs font-semibold text-indigo-700 mb-2 uppercase tracking-wide">⏱ Working Hours & Overtime</p>
                   <div className="grid grid-cols-2 gap-3">
                  <div>
                   <label className="block text-xs font-semibold text-gray-700 mb-1">Standard Hours/Day</label>
                   <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="24"
                  value={editData.standardHours}
                  onChange={(e) => setEditData({...editData, standardHours: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder={`Default: ${payrollSettings.regularHoursThreshold}h`}
                   />
                   <p className="text-xs text-gray-400 mt-1">Leave blank to use global default ({payrollSettings.regularHoursThreshold}h)</p>
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-700 mb-1">Overtime Rate (×)</label>
                   <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={editData.overtimeRate}
                  onChange={(e) => setEditData({...editData, overtimeRate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder={`Default: ${payrollSettings.overtimeMultiplier}×`}
                   />
                   <p className="text-xs text-gray-400 mt-1">Leave blank to use global default ({payrollSettings.overtimeMultiplier}×)</p>
                  </div>
                   </div>
                  </div>
                  <div className="border border-amber-200 bg-amber-50 rounded-lg p-3">
                   <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">💰 Minimum Guaranteed Hours</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                   <input
                  type="checkbox"
                  checked={editData.minimumHoursEnabled || false}
                  onChange={(e) => setEditData({...editData, minimumHoursEnabled: e.target.checked})}
                  className="w-4 h-4 text-amber-600 rounded"
                   />
                   <span className="text-xs font-semibold text-amber-800">Enable</span>
                  </label>
                   </div>
                   {editData.minimumHoursEnabled ? (
                  <div>
                   <label className="block text-xs font-semibold text-gray-700 mb-1">Minimum Hours Per Day</label>
                   <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="24"
                  value={editData.minimumHours}
                  onChange={(e) => setEditData({...editData, minimumHours: e.target.value})}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg text-sm"
                  placeholder="e.g. 10"
                   />
                   <p className="text-xs text-amber-700 mt-1">
                  If employee works fewer than <strong>{editData.minimumHours || 10}h</strong> in a day, pay will be calculated as <strong>{editData.minimumHours || 10}h × {getCurrencySymbol(editData.currency || 'GBP')}{parseFloat(editData.hourlyRate || 0).toFixed(2)}/hr = {getCurrencySymbol(editData.currency || 'GBP')}{((editData.minimumHours || 10) * parseFloat(editData.hourlyRate || 0)).toFixed(2)}</strong> minimum per day.
                   </p>
                  </div>
                   ) : (
                  <p className="text-xs text-amber-700">When enabled, employees will be paid for a minimum number of hours per day even if they work less.</p>
                   )}
                  </div>
                  <div className="flex gap-2 pt-2">
                   <button
                  onClick={() => saveEmployeeChanges(employee.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                   >
                  Save Changes
                   </button>
                   <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                   >
                  Cancel
                   </button>
                  </div>
                   </div>
                  ) : (
                   <div className="flex justify-between items-start">
                  <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">
                   {employee?.firstName || ""} {employee?.lastName || ""}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                   {employee.employeeId}
                  </span>
                   </div>
                   <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div>
                   <span className="text-gray-600">Email:</span>
                   <span className="ml-2 font-medium">{employee.email}</span>
                  </div>
                  <div>
                   <span className="text-gray-600">Department:</span>
                   <span className="ml-2 font-medium">{employee.department}</span>
                  </div>
                  <div>
                   <span className="text-gray-600">Position:</span>
                   <span className="ml-2 font-medium">{employee.position}</span>
                  </div>
                  <div>
                   <span className="text-gray-600">Hourly Rate:</span>
                   <span className="ml-2 font-medium text-green-700">{getCurrencySymbol(employee.currency || "GBP")}{employee.hourlyRate.toFixed(2)}</span>
                  </div>
                  <div className="col-span-2">
                   <span className="text-gray-600">Assigned Locations:</span>
                   <div className="ml-2 inline-flex flex-wrap gap-1">
                  {employee.assignedLocations && employee.assignedLocations.length > 0 ? (
                   employee.assignedLocations.map(locId => {
                  const loc = workLocations.find(l => l.id === locId);
                  return loc ? (
                   <span key={locId} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                  {loc.name}
                   </span>
                  ) : null;
                   })
                  ) : (
                   <span className="text-amber-600 text-xs">No locations assigned</span>
                  )}
                   </div>
                  </div>
                  {(employee.standardHours || employee.overtimeRate || employee.minimumHours) && (
                   <div className="col-span-2 flex gap-2 mt-1 flex-wrap">
                  {employee.standardHours && (
                   <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-medium">
                  ⏱ {employee.standardHours}h/day
                   </span>
                  )}
                  {employee.overtimeRate && (
                   <span className="px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-200 rounded text-xs font-medium">
                  OT: {employee.overtimeRate}×
                   </span>
                  )}
                  {employee.minimumHours && (
                   <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs font-medium">
                  Min: {employee.minimumHours}h guaranteed
                   </span>
                  )}
                   </div>
                  )}
                   </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                   <button
                  onClick={() => startEditEmployee(employee)}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm font-semibold flex items-center gap-2"
                   >
                  <Edit2 className="w-4 h-4" />
                  Edit
                   </button>
                   <button
                  onClick={() => setResetPasswordFor(employee)}
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-sm font-semibold flex items-center gap-2"
                   >
                  <Shield className="w-4 h-4" />
                  Reset PW
                   </button>
                   {hasPermission('canDeleteEmployees') && (
                  <button
                   onClick={() => deleteEmployee(employee.id)}
                   className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-semibold flex items-center gap-2"
                  >
                   <Trash2 className="w-4 h-4" />
                   Delete
                  </button>
                   )}
                  </div>
                   </div>
                  )}
                   </div>
                  ))
                   )}
                  </div>
                   )}

                   {resetPasswordFor && (
                  <ChangePasswordModal
                   onClose={() => setResetPasswordFor(null)}
                   adminReset={true}
                   targetEmployee={resetPasswordFor}
                  />
                   )}
                   {activeTab === 'add' && (
                  <div className="space-y-6">
                   <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                   <strong>Add Employee:</strong> Create a new employee account with login credentials and hourly rate. The employee will be able to log in immediately.
                  </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                   <input
                  type="text"
                  value={newEmployeeData.firstName}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="John"
                   />
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                   <input
                  type="text"
                  value={newEmployeeData.lastName}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Doe"
                   />
                  </div>
                   </div>

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                   type="email"
                   value={newEmployeeData.email}
                   onChange={(e) => setNewEmployeeData({...newEmployeeData, email: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="employee@company.com"
                  />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                   <select
                  value={newEmployeeData.department}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, department: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Human Resources">Human Resources</option>
                   </select>
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Position *</label>
                   <input
                  type="text"
                  value={newEmployeeData.position}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, position: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Software Developer"
                   />
                  </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                   <input
                  type="password"
                  value={newEmployeeData.password}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Minimum 6 characters"
                  minLength={6}
                   />
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate (£) *</label>
                   <input
                  type="number"
                  step="0.01"
                  value={newEmployeeData.hourlyRate}
                  onChange={(e) => setNewEmployeeData({...newEmployeeData, hourlyRate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="25.00"
                   />
                  </div>
                   </div>

                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <input
                   type="text"
                   value={newEmployeeData.country}
                   onChange={(e) => setNewEmployeeData({...newEmployeeData, country: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="e.g. United Kingdom"
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                  <select
                   value={newEmployeeData.currency}
                   onChange={(e) => setNewEmployeeData({...newEmployeeData, currency: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                   <option value="GBP">£ GBP - British Pound</option>
                   <option value="USD">$ USD - US Dollar</option>
                   <option value="EUR">€ EUR - Euro</option>
                   <option value="IQD">IQD - Iraqi Dinar</option>
                  </select>
                   </div>
                  </div>
                   <div className="flex gap-4 pt-4">
                  <button
                   onClick={handleAddNewEmployee}
                   className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                  >
                   <UserPlus className="w-5 h-5" />
                   Add Employee
                  </button>
                  <button
                   onClick={() => setActiveTab('list')}
                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                   Cancel
                  </button>
                   </div>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const EXPENSE_CATEGORIES = ['Fuel', 'Parking', 'Travel', 'Accommodation', 'Food & Meals', 'Tools & Equipment', 'Uniform', 'Communication', 'Other'];

            const ExpenseForm = ({ onClose }) => {
                const today = new Date().toISOString().split('T')[0];
                const emptyForm = { date: today, category: '', receiptImage: null };
                const [form, setForm] = useState(() => {
                  try {
                   const saved = JSON.parse(localStorage.getItem('bpost_pending_form') || 'null');
                   return { date: saved ? saved.date || today : today, category: saved ? saved.category || '' : '', receiptImage: null };
                  } catch(e) { return emptyForm; }
                });
                // Text inputs as uncontrolled refs — no re-render on keystroke
                const descriptionRef = React.useRef(null);
                const amountRef = React.useRef(null);
                const receiptNoteRef = React.useRef(null);
                const [items, setItems] = useState(() => {
                  try { return JSON.parse(localStorage.getItem('bpost_pending_expenses') || '[]'); }
                  catch(e) { return []; }
                });
                const [saving, setSaving] = useState(false);
                const [capturing, setCapturing] = useState(false);

                React.useEffect(() => {
                  localStorage.setItem('bpost_pending_form', JSON.stringify(form));
                }, [form]);

                React.useEffect(() => {
                  localStorage.setItem('bpost_pending_expenses', JSON.stringify(items));
                }, [items]);

                const handleImageCapture = (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setCapturing(true);
                  const reader = new FileReader();
                  reader.onload = function(evt) {
                   const img = new Image();
                   img.onload = function() {
                  const canvas = document.createElement('canvas');
                  const MAX = 800;
                  let w = img.width, h = img.height;
                  if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
                  if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
                  canvas.width = w; canvas.height = h;
                  canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                  const compressed = canvas.toDataURL('image/jpeg', 0.7);
                  setForm(prev => ({...prev, receiptImage: compressed}));
                  setCapturing(false);
                   };
                   img.src = evt.target.result;
                  };
                  reader.readAsDataURL(file);
                };

                const addItem = () => {
                  const desc = descriptionRef.current ? descriptionRef.current.value : '';
                  const amt = amountRef.current ? amountRef.current.value : '';
                  const rNote = receiptNoteRef.current ? receiptNoteRef.current.value : '';
                  if (!form.category || !amt) { alert('Category and amount are required'); return; }
                  const isDuplicate = items.some(i => i.category === form.category && i.date === form.date && parseFloat(i.amount) === parseFloat(amt) && i.description === desc);
                  if (isDuplicate) { alert('An identical item is already in your list.'); return; }
                  setItems([...items, { date: form.date, category: form.category, description: desc, amount: parseFloat(amt), receiptNote: rNote, receiptImage: form.receiptImage, id: Date.now() }]);
                  // Clear refs and reset category/image
                  if (descriptionRef.current) descriptionRef.current.value = '';
                  if (amountRef.current) amountRef.current.value = '';
                  if (receiptNoteRef.current) receiptNoteRef.current.value = '';
                  const cleared = { date: form.date, category: '', receiptImage: null };
                  setForm(cleared);
                  localStorage.setItem('bpost_pending_form', JSON.stringify(cleared));
                };

                const removeItem = (id) => setItems(items.filter(i => i.id !== id));

                const _submitGuard = React.useRef(false);
                const submitAll = async () => {
                  if (_submitGuard.current || saving) return;
                  if (items.length === 0) { alert('Add at least one expense item'); return; }
                  _submitGuard.current = true;
                  setSaving(true);
                  const countToSubmit = items.length;
                  try {
                   for (const item of items) {
                  await apiCall(API_ENDPOINTS.expenses, {
                   method: 'POST',
                   body: JSON.stringify({ date: item.date, category: item.category, description: item.description, amount: item.amount, currency: currentUser.currency || 'GBP', receiptNote: item.receiptNote || '', receiptImage: item.receiptImage || null })
                  });
                   }
                   await loadExpensesFromAPI();
                   setItems([]);
                   const emptyF = { date: today, category: '', description: '', amount: '', receiptNote: '', receiptImage: null };
                   setForm(emptyF);
                   localStorage.removeItem('bpost_pending_expenses');
                   localStorage.removeItem('bpost_pending_form');
                   alert(`✓ ${countToSubmit} expense${countToSubmit > 1 ? 's' : ''} submitted for approval`);
                   onClose();
                  } catch(e) { alert('Failed to submit: ' + e.message); }
                  setSaving(false);
                  _submitGuard.current = false;
                };

                const sym = getCurrencySymbol(currentUser.currency || 'GBP');
                const total = items.reduce((s, i) => s + i.amount, 0);

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-50 p-4 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-8">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-t-2xl px-6 py-5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                  <Receipt className="w-6 h-6 text-white" />
                  <div>
                   <h2 className="text-xl font-bold text-white">Submit Expenses</h2>
                   {items.length > 0 && <p className="text-teal-200 text-xs mt-0.5">📋 {items.length} saved item{items.length!==1?'s':''} — your list is preserved</p>}
                  </div>
                   </div>
                   <button onClick={onClose} className="text-teal-200 hover:text-white text-2xl font-bold">✕</button>
                  </div>
                  <div className="p-6">
                   <p className="text-sm text-gray-600 mb-4">Add each expense item below, then submit all at once for approval.</p>
                   <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
                  <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                  <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none bg-white">
                   <option value="">Select...</option>
                   {EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                   </div>
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                   <input ref={descriptionRef} defaultValue="" placeholder="e.g. Fuel to Birmingham warehouse" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Amount ({getCurrencySymbol(currentUser.currency || 'GBP')}) *</label>
                  <input type="number" min="0.01" step="0.01" ref={amountRef} defaultValue="" placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Receipt Photo</label>
                  {form.receiptImage ? (
                   <div className="relative">
                  <img src={form.receiptImage} alt="Receipt" className="w-full h-24 object-cover rounded-lg border border-teal-300" />
                  <button onClick={() => setForm({...form, receiptImage: null})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-600">X</button>
                   </div>
                  ) : (
                   <label className={'flex flex-col items-center justify-center h-24 rounded-lg border-2 border-dashed cursor-pointer transition ' + (capturing ? 'border-teal-400 bg-teal-50' : 'border-gray-300 bg-gray-50 hover:border-teal-400 hover:bg-teal-50')}>
                  {capturing ? (
                   <span className="text-teal-600 text-xs font-semibold">Processing...</span>
                  ) : (
                   <>
                  <svg className="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">Tap to take photo or upload</span>
                  <span className="text-xs text-gray-400 mt-0.5">Opens camera on mobile</span>
                   </>
                  )}
                  <input type="file" accept="image/*" capture="environment" onChange={handleImageCapture} className="hidden" />
                   </label>
                  )}
                   </div>
                  </div>
                  <button onClick={addItem} className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm">+ Add to List</button>
                   </div>
                   {items.length > 0 && (
                  <div className="mb-4">
                   <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Items to Submit ({items.length})</div>
                  <button onClick={() => { if(window.confirm('Clear all saved items?')) { setItems([]); localStorage.removeItem('bpost_pending_expenses'); } }} className="text-xs text-red-400 hover:text-red-600 font-semibold">Clear All</button>
                   </div>
                   <div className="space-y-2">
                  {items.map(item => (
                   <div key={item.id} className="flex items-center justify-between bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                   {item.receiptImage && (
                  <img src={item.receiptImage} alt="Receipt" className="w-10 h-10 object-cover rounded border border-teal-300 flex-shrink-0" />
                   )}
                   <div>
                  <span className="text-sm font-semibold text-teal-800">{item.category}</span>
                  {item.description && <span className="text-xs text-gray-500 ml-2">— {item.description}</span>}
                  <div className="text-xs text-gray-500">{item.date}</div>
                   </div>
                  </div>
                  <div className="flex items-center gap-3">
                   <span className="font-bold text-teal-700">{sym}{item.amount.toFixed(2)}</span>
                   <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 font-bold text-lg leading-none">✕</button>
                  </div>
                   </div>
                  ))}
                   </div>
                   <div className="flex items-center justify-between mt-3 px-3 py-2 bg-gray-100 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700">Total</span>
                  <span className="text-lg font-bold text-teal-700">{sym}{total.toFixed(2)}</span>
                   </div>
                  </div>
                   )}
                   <div className="flex gap-3">
                  <button onClick={submitAll} disabled={saving||items.length===0} className={`flex-1 py-3 rounded-xl font-bold transition ${saving||items.length===0?'bg-gray-200 text-gray-500 cursor-not-allowed':'bg-teal-600 text-white hover:bg-teal-700'}`}>
                   {saving ? 'Submitting...' : `Submit ${items.length > 0 ? items.length + ' Item' + (items.length>1?'s':'') : 'Expenses'}`}
                  </button>
                  <button onClick={onClose} className="px-5 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition">Cancel</button>
                   </div>
                  </div>
                   </div>
                  </div>
                );
            };

            const ExpenseManager = ({ onClose, visibleEmployees: visEmp }) => {
                const [activeTab, setActiveTab] = useState('all');
                const [expBranchFilter, setExpBranchFilter] = useState('');
                const [expEmpFilter, setExpEmpFilter] = useState('');
                const [showAddForm, setShowAddForm] = useState(false);
                const [lightboxImage, setLightboxImage] = useState(null);
                const today = new Date().toISOString().split('T')[0];
                const [addForm, setAddForm] = useState({ employeeId: '', date: today, category: '', description: '', amount: '', receiptNote: '', status: 'approved' });
                const [addSaving, setAddSaving] = useState(false);

                const handleAdminAdd = async () => {
                  if (!addForm.employeeId || !addForm.category || !addForm.amount) {
                   alert('Employee, category and amount are required');
                   return;
                  }
                  setAddSaving(true);
                  try {
                   const data = await apiCall(API_ENDPOINTS.expenses, {
                  method: 'POST',
                  body: JSON.stringify({
                   employeeId: parseInt(addForm.employeeId),
                   date: addForm.date,
                   category: addForm.category,
                   description: addForm.description,
                   amount: parseFloat(addForm.amount),
                   currency: (visEmp.find(function(e) { return e.id === parseInt(addForm.employeeId); }) || {}).currency || 'GBP',
                   receiptNote: addForm.receiptNote,
                  })
                   });
                   if (data.success) {
                  if (addForm.status !== 'pending') {
                   await apiCall(API_ENDPOINTS.expenses + '/' + data.expense.Id, {
                  method: 'PUT',
                  body: JSON.stringify({ status: addForm.status })
                   });
                  }
                  await loadExpensesFromAPI();
                  setAddForm({ employeeId: '', date: today, category: '', description: '', amount: '', receiptNote: '', status: 'approved' });
                  setShowAddForm(false);
                  setActiveTab(addForm.status);
                  alert('Expense added successfully');
                   } else { alert('Error: ' + data.error); }
                  } catch(e) { alert('Failed: ' + e.message); }
                  setAddSaving(false);
                };

                const allFiltered = expenses.filter(function(exp) {
                  if (!visEmp.some(function(e) { return e.id === exp.employeeId; })) return false;
                  if (expEmpFilter && exp.employeeId !== parseInt(expEmpFilter)) return false;
                  if (expBranchFilter) {
                   const emp = employees.find(function(e) { return e.id === exp.employeeId; });
                   if (!emp || !(emp.branches||[]).includes(expBranchFilter)) return false;
                  }
                  return activeTab === 'all' ? true : exp.status === activeTab;
                });

                const totalBalance = expenses.filter(function(exp) {
                  return visEmp.some(function(e) { return e.id === exp.employeeId; }) && exp.status === 'approved';
                }).reduce(function(s,e) { return s+e.amount; }, 0);

                const totalPaid = expenses.filter(function(exp) {
                  return visEmp.some(function(e) { return e.id === exp.employeeId; }) && exp.status === 'paid';
                }).reduce(function(s,e) { return s+e.amount; }, 0);

                const totalPending = expenses.filter(function(exp) {
                  return visEmp.some(function(e) { return e.id === exp.employeeId; }) && exp.status === 'pending';
                }).reduce(function(s,e) { return s+e.amount; }, 0);

                const handleAction = async (id, status, extra) => {
                  const payload = Object.assign({ status: status }, extra || {});
                  try {
                   const data = await apiCall(API_ENDPOINTS.expenses + '/' + id, { method: 'PUT', body: JSON.stringify(payload) });
                   if (data.success) { await loadExpensesFromAPI(); setActiveTab(status); }
                   else alert('Error: ' + data.error);
                  } catch(e) { alert('Failed: ' + e.message); }
                };

                const handleDelete = async (id) => {
                  if (!window.confirm('Delete this expense claim?')) return;
                  try {
                   await apiCall(API_ENDPOINTS.expenses + '/' + id, { method: 'DELETE' });
                   await loadExpensesFromAPI();
                  } catch(e) { alert('Failed: ' + e.message); }
                };

                const tabs = ['all', 'pending', 'approved', 'paid', 'rejected'];
                const tabColors = { all: 'text-gray-700 bg-gray-200 border-gray-400', pending: 'text-amber-700 bg-amber-100 border-amber-300', approved: 'text-green-700 bg-green-100 border-green-300', paid: 'text-blue-700 bg-blue-100 border-blue-300', rejected: 'text-red-700 bg-red-100 border-red-300' };

                const getStatusBadgeClass = (status) => {
                  if (status === 'pending') return 'bg-amber-100 text-amber-700';
                  if (status === 'approved') return 'bg-green-100 text-green-700';
                  if (status === 'paid') return 'bg-blue-100 text-blue-700';
                  return 'bg-red-100 text-red-700';
                };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                   {lightboxImage && (
                  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4" onClick={() => setLightboxImage(null)}>
                   <div className="relative max-w-2xl w-full">
                  <img src={lightboxImage} alt="Receipt" className="w-full rounded-xl shadow-2xl" />
                  <button onClick={() => setLightboxImage(null)} className="absolute top-2 right-2 bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg hover:bg-gray-100 shadow">✕</button>
                  <p className="text-center text-gray-400 text-xs mt-2">Click anywhere to close</p>
                   </div>
                  </div>
                   )}
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                  <div className="sticky top-0 z-10 bg-gradient-to-r from-teal-600 to-teal-800 rounded-t-2xl px-6 py-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                  <Receipt className="w-7 h-7 text-white" />
                  <h2 className="text-xl font-bold text-white">Expense Claims Manager</h2>
                   </div>
                   <div className="flex items-center gap-2">
                  <button onClick={() => setShowAddForm(!showAddForm)} className="bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition flex items-center gap-2 text-sm">
                   <Receipt className="w-4 h-4" />+ Add Expense
                  </button>
                  <button onClick={onClose} className="bg-teal-700 hover:bg-teal-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition">
                   <X className="w-4 h-4" />Close
                  </button>
                   </div>
                  </div>

                  {showAddForm && (
                   <div className="bg-teal-50 border-b border-teal-200 p-6">
                  <h3 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-4">Add Expense on Behalf of Employee</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Employee *</label>
                  <select value={addForm.employeeId} onChange={e => setAddForm(Object.assign({}, addForm, {employeeId: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400">
                   <option value="">Select Employee</option>
                   {visEmp.filter(function(e) { return !e.isAdmin; }).map(function(e) { return <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>; })}
                  </select>
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
                  <input type="date" value={addForm.date} onChange={e => setAddForm(Object.assign({}, addForm, {date: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                  <select value={addForm.category} onChange={e => setAddForm(Object.assign({}, addForm, {category: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400">
                   <option value="">Select...</option>
                   {EXPENSE_CATEGORIES.map(function(cat) { return <option key={cat} value={cat}>{cat}</option>; })}
                  </select>
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Amount *</label>
                  <input type="number" min="0.01" step="0.01" value={addForm.amount} onChange={e => setAddForm(Object.assign({}, addForm, {amount: e.target.value}))} placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                  <input value={addForm.description} onChange={e => setAddForm(Object.assign({}, addForm, {description: e.target.value}))} placeholder="e.g. Fuel receipt" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Receipt Ref</label>
                  <input value={addForm.receiptNote} onChange={e => setAddForm(Object.assign({}, addForm, {receiptNote: e.target.value}))} placeholder="e.g. Receipt #1234" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                  <select value={addForm.status} onChange={e => setAddForm(Object.assign({}, addForm, {status: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400">
                   <option value="pending">Pending</option>
                   <option value="approved">Approved</option>
                   <option value="paid">Paid</option>
                  </select>
                   </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                   <button onClick={handleAdminAdd} disabled={addSaving} className={'px-5 py-2 rounded-lg font-semibold text-sm transition ' + (addSaving ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700')}>
                  {addSaving ? 'Saving...' : 'Save Expense'}
                   </button>
                   <button onClick={() => setShowAddForm(false)} className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300 transition">Cancel</button>
                  </div>
                   </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-200">
                   <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Awaiting Approval</p>
                  <p className="text-2xl font-bold text-amber-700 mt-1">{getCurrencySymbol("GBP")}{totalPending.toFixed(2)}</p>
                   </div>
                   <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Approved - Unpaid Balance</p>
                  <p className="text-2xl font-bold text-green-700 mt-1">{getCurrencySymbol("GBP")}{totalBalance.toFixed(2)}</p>
                   </div>
                   <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Total Paid Out</p>
                  <p className="text-2xl font-bold text-blue-700 mt-1">{getCurrencySymbol("GBP")}{totalPaid.toFixed(2)}</p>
                   </div>
                  </div>

                  <div className="px-6 pt-4 pb-4 flex items-center gap-4 flex-wrap border-b border-gray-100">
                   <div className="flex gap-2">
                  {tabs.map(function(tab) {
                   const count = expenses.filter(function(e) {
                  return visEmp.some(function(v) { return v.id === e.employeeId; }) && (tab === 'all' ? true : e.status === tab);
                   }).length;
                   const isActive = activeTab === tab;
                   return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                   className={'px-4 py-1.5 rounded-full text-sm font-semibold border capitalize transition ' + (isActive ? tabColors[tab] : 'text-gray-500 bg-gray-100 border-gray-200 hover:bg-gray-200')}>
                   {tab} ({count})
                  </button>
                   );
                  })}
                   </div>
                   <div className="ml-auto flex items-center gap-2 flex-wrap">
                  <select value={expEmpFilter} onChange={e => setExpEmpFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none">
                   <option value="">All Employees</option>
                   {visEmp.filter(function(e) { return !e.isAdmin; }).map(function(e) {
                  return <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>;
                   })}
                  </select>
                  {branchList.length > 0 && (
                   <select value={expBranchFilter} onChange={e => setExpBranchFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none">
                  <option value="">All Branches</option>
                  {branchList.map(function(b) { return <option key={b} value={b}>{b}</option>; })}
                   </select>
                  )}
                   </div>
                  </div>

                  <div className="p-6">
                   {allFiltered.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                   <Receipt className="w-12 h-12 mx-auto mb-3 opacity-40" />
                   <p>No {activeTab} expense claims</p>
                  </div>
                   ) : (
                  <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                   <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Employee</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Date</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Description</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Amount</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Receipt</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                   </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                   {allFiltered.map(function(exp) {
                  return (
                   <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3">
                   <div className="font-medium text-gray-800">{exp.employeeName}</div>
                   <div className="text-xs text-gray-500">{exp.employeeCode}</div>
                  </td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{new Date(exp.date).toLocaleDateString('en-GB')}</td>
                  <td className="px-3 py-3">
                   <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">{exp.category}</span>
                  </td>
                  <td className="px-3 py-3 text-gray-600 max-w-xs truncate">{exp.description || ''}</td>
                  <td className="px-3 py-3 font-bold text-gray-800 whitespace-nowrap">{getCurrencySymbol(exp.currency)}{exp.amount.toFixed(2)}</td>
                  <td className="px-3 py-3">
                   {exp.receiptImage ? (
                  <img src={exp.receiptImage} alt="Receipt"
                   onClick={() => setLightboxImage(exp.receiptImage)}
                   className="w-12 h-12 object-cover rounded-lg border border-gray-300 hover:opacity-80 transition cursor-zoom-in" title="Click to view full size" />
                   ) : (
                  <span className="text-gray-400 text-xs">{exp.receiptNote || '—'}</span>
                   )}
                  </td>
                  <td className="px-3 py-3">
                   <div className="flex gap-1.5 flex-wrap">
                  {exp.status === 'pending' && (
                   <button onClick={() => handleAction(exp.id, 'approved')} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200">Approve</button>
                  )}
                  {exp.status === 'pending' && (
                   <button onClick={() => handleAction(exp.id, 'rejected')} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200">Reject</button>
                  )}
                  {exp.status === 'approved' && (
                   <button onClick={() => handleAction(exp.id, 'paid', { paidBy: currentUser.firstName + ' ' + currentUser.lastName })} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200">Mark Paid</button>
                  )}
                  {hasPermission('canDeleteAgentCollections') && (
                   <button onClick={() => handleDelete(exp.id)} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200">Delete</button>
                  )}
                   </div>
                  </td>
                   </tr>
                  );
                   })}
                  </tbody>
                   </table>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const ExpenseReport = ({ onClose, visibleEmployees: visEmp, persistedState, onStateChange }) => {
                const today = new Date().toISOString().split('T')[0];
                const mk = (k) => (v) => onStateChange && onStateChange(function(s){return{...s,[k]:typeof v==='function'?v(s[k]):v};});
                const adjAmountRef = React.useRef(null);
                const adjHoursRef = React.useRef(null);
                const adjReasonRef = React.useRef(null);
                const fromDate = persistedState ? persistedState.fromDate : today.slice(0,8)+'01'; const setFromDate = mk('fromDate');
                const toDate = persistedState ? persistedState.toDate : today; const setToDate = mk('toDate');
                const empFilter = persistedState ? persistedState.empFilter : ''; const setEmpFilter = mk('empFilter');
                const branchFilter = persistedState ? persistedState.branchFilter : ''; const setBranchFilter = mk('branchFilter');
                const reportData = persistedState ? persistedState.reportData : null; const setReportData = mk('reportData');

                React.useEffect(function() {
                  const handleEsc = function(e) { if (e.key === 'Escape') onClose(); };
                  window.addEventListener('keydown', handleEsc);
                  return function() { window.removeEventListener('keydown', handleEsc); };
                }, []);

                const generateReport = () => {
                  const filtered = expenses.filter(function(exp) {
                   if (!visEmp.some(function(e) { return e.id === exp.employeeId; })) return false;
                   if (empFilter && exp.employeeId !== parseInt(empFilter)) return false;
                   if (branchFilter) {
                  const emp = employees.find(function(e) { return e.id === exp.employeeId; });
                  if (!emp || !(emp.branches||[]).includes(branchFilter)) return false;
                   }
                   return exp.date >= fromDate && exp.date <= toDate;
                  });
                  const byEmployee = {};
                  filtered.forEach(function(exp) {
                   if (!byEmployee[exp.employeeId]) {
                  byEmployee[exp.employeeId] = { employeeName: exp.employeeName, employeeCode: exp.employeeCode, items: [], totalPending: 0, totalApproved: 0, totalPaid: 0, totalRejected: 0 };
                   }
                   byEmployee[exp.employeeId].items.push(exp);
                   if (exp.status === 'pending') byEmployee[exp.employeeId].totalPending += exp.amount;
                   else if (exp.status === 'approved') byEmployee[exp.employeeId].totalApproved += exp.amount;
                   else if (exp.status === 'paid') byEmployee[exp.employeeId].totalPaid += exp.amount;
                   else if (exp.status === 'rejected') byEmployee[exp.employeeId].totalRejected += exp.amount;
                  });
                  setReportData(Object.values(byEmployee));
                };

                const exportCSV = () => {
                  if (!reportData) return;
                  let csv = 'Employee,ID,Date,Category,Description,Amount,Currency,Status,Receipt Ref\n';
                  reportData.forEach(function(row) {
                   row.items.forEach(function(exp) {
                  csv += '"' + row.employeeName + '","' + row.employeeCode + '","' + exp.date + '","' + exp.category + '","' + (exp.description||'') + '",' + exp.amount.toFixed(2) + ',"' + exp.currency + '","' + exp.status + '","' + (exp.receiptNote||'') + '"\n';
                   });
                  });
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = 'expense_report_' + fromDate + '_' + toDate + '.csv'; a.click();
                };

                const getStatusBadgeClass = function(status) {
                  if (status === 'pending') return 'bg-amber-100 text-amber-700';
                  if (status === 'approved') return 'bg-green-100 text-green-700';
                  if (status === 'paid') return 'bg-blue-100 text-blue-700';
                  return 'bg-red-100 text-red-700';
                };

                const grandTotal = reportData ? reportData.reduce(function(s,r) {
                  return s + r.items.filter(function(e) { return e.status !== 'rejected'; }).reduce(function(ss,e) { return ss+e.amount; }, 0);
                }, 0) : 0;

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                  <div className="sticky top-0 z-10 bg-white rounded-t-2xl p-6 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Receipt className="w-7 h-7 text-teal-600" />
                  Expense Report
                   </h2>
                   <button onClick={onClose} className="bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition">
                  <X className="w-4 h-4" />Close
                   </button>
                  </div>
                  <div className="p-6 border-b border-gray-200 flex flex-wrap gap-3 items-end">
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label>
                  <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">End Date</label>
                  <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Branch</label>
                  <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                   <option value="">All Branches</option>
                   {branchList.map(function(b) { return <option key={b} value={b}>{b}</option>; })}
                  </select>
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Employee</label>
                  <select value={empFilter} onChange={e => setEmpFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                   <option value="">All Employees</option>
                   {visEmp.filter(function(e) {
                   return !e.isAdmin && (!branchFilter || (e.branches||[]).includes(branchFilter));
                   }).map(function(e) {
                  return <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>;
                   })}
                  </select>
                   </div>
                   <button onClick={generateReport} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm">Generate Report</button>
                   {reportData && (
                  <button onClick={exportCSV} className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm">Export CSV</button>
                   )}
                  </div>
                  <div className="p-6">
                   {!reportData ? (
                  <div className="text-center py-16 text-gray-400">
                   <Receipt className="w-16 h-16 mx-auto mb-4 opacity-30" />
                   <p>Select a date range and click Generate Report</p>
                  </div>
                   ) : reportData.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                   <p>No expenses found for this period</p>
                  </div>
                   ) : (
                  <div className="space-y-6">
                   <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center mb-6">
                  <p className="text-xs text-teal-600 font-semibold uppercase">Total Expenses ({fromDate} to {toDate})</p>
                  <p className="text-3xl font-bold text-teal-700 mt-1">{getCurrencySymbol("GBP")}{grandTotal.toFixed(2)}</p>
                   </div>
                   {reportData.map(function(row, idx) {
                  const rowTotal = row.items.filter(function(e) { return e.status !== 'rejected'; }).reduce(function(s,e) { return s+e.amount; }, 0);
                  return (
                   <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 flex justify-between items-center flex-wrap gap-2">
                   <div>
                  <span className="font-bold text-gray-800">{row.employeeName}</span>
                  <span className="text-gray-500 text-sm ml-2">{row.employeeCode}</span>
                   </div>
                   <div className="flex gap-4 text-xs flex-wrap">
                  {row.totalPending > 0 && <span className="text-amber-600 font-semibold">Pending: {getCurrencySymbol("GBP")}{row.totalPending.toFixed(2)}</span>}
                  {row.totalApproved > 0 && <span className="text-green-600 font-semibold">Approved: {getCurrencySymbol("GBP")}{row.totalApproved.toFixed(2)}</span>}
                  {row.totalPaid > 0 && <span className="text-blue-600 font-semibold">Paid: {getCurrencySymbol("GBP")}{row.totalPaid.toFixed(2)}</span>}
                  {row.totalRejected > 0 && <span className="text-red-400 font-semibold">Rejected: {getCurrencySymbol("GBP")}{row.totalRejected.toFixed(2)}</span>}
                   </div>
                  </div>
                  <table className="w-full text-sm">
                   <thead>
                  <tr className="bg-gray-50 border-t border-gray-200">
                   <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Date</th>
                   <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Category</th>
                   <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Description</th>
                   <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Amount</th>
                   <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Status</th>
                  </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                  {row.items.map(function(exp) {
                   return (
                  <tr key={exp.id} className="hover:bg-gray-50">
                   <td className="px-4 py-2 text-gray-600 whitespace-nowrap">{new Date(exp.date).toLocaleDateString('en-GB')}</td>
                   <td className="px-4 py-2">
                  <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">{exp.category}</span>
                   </td>
                   <td className="px-4 py-2 text-gray-600">{exp.description || ''}</td>
                   <td className="px-4 py-2 font-bold text-gray-800">{getCurrencySymbol(exp.currency)}{exp.amount.toFixed(2)}</td>
                   <td className="px-4 py-2">
                  <span className={'px-2 py-0.5 rounded-full text-xs font-semibold capitalize ' + getStatusBadgeClass(exp.status)}>{exp.status}</span>
                   </td>
                  </tr>
                   );
                  })}
                  <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                   <td colSpan="3" className="px-4 py-2 text-right text-gray-700">TOTAL</td>
                   <td className="px-4 py-2 text-gray-800">{getCurrencySymbol("GBP")}{rowTotal.toFixed(2)}</td>
                   <td></td>
                  </tr>
                   </tbody>
                  </table>
                   </div>
                  );
                   })}
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const AgentManager = ({ onClose, visibleEmployees: visEmp }) => {
                const drivers = (visEmp || employees).filter(function(e) { return !e.isAdmin; });
                const [tab, setTab] = useState('list');
                const [editAgent, setEditAgent] = useState(null);
                const [saving, setSaving] = useState(false);
                const emptyForm = { agentCode: '', city: '', country: '', notes: '' };
                const [form, setForm] = useState(emptyForm);
                const [assignAgent, setAssignAgent] = useState(null);
                const [assignedIds, setAssignedIds] = useState([]);
                const [search, setSearch] = useState('');

                const filteredAgents = agents.filter(function(a) {
                  if (!search.trim()) return true;
                  const q = search.toLowerCase();
                  return a.agentCode.toLowerCase().includes(q) || a.city.toLowerCase().includes(q);
                });

                const startEdit = function(a) {
                  setForm({ agentCode: a.agentCode, city: a.city, country: a.country||'', notes: a.notes||'' });
                  setEditAgent(a);
                  setTab('form');
                };

                const handleSave = async function() {
                  if (!form.agentCode.trim() || !form.city.trim()) { alert('Agent code and city are required'); return; }
                  setSaving(true);
                  try {
                   const url = editAgent ? API_ENDPOINTS.agents + '/' + editAgent.id : API_ENDPOINTS.agents;
                   const method = editAgent ? 'PUT' : 'POST';
                   const data = await apiCall(url, { method: method, body: JSON.stringify(form) });
                   if (data.success) { await loadAgentsFromAPI(); setTab('list'); setForm(emptyForm); setEditAgent(null); }
                   else alert('Error: ' + data.error);
                  } catch(e) { alert('Failed: ' + e.message); }
                  setSaving(false);
                };

                const handleDelete = async function(a) {
                  if (!window.confirm('Remove agent ' + a.agentCode + '?')) return;
                  try {
                   await apiCall(API_ENDPOINTS.agents + '/' + a.id, { method: 'DELETE' });
                   await loadAgentsFromAPI();
                  } catch(e) { alert('Failed: ' + e.message); }
                };

                const openAssign = function(a) {
                  setAssignAgent(a);
                  setAssignedIds((a.assignedEmployees || []).map(function(e) { return e.id; }));
                };

                const saveAssign = async function() {
                  try {
                   await apiCall(API_ENDPOINTS.agents + '/' + assignAgent.id + '/assign', { method: 'POST', body: JSON.stringify({ employeeIds: assignedIds }) });
                   await loadAgentsFromAPI();
                   setAssignAgent(null);
                   alert('Assignments saved');
                  } catch(e) { alert('Failed: ' + e.message); }
                };

                const fc = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400';

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8">
                  <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-600 to-amber-600 rounded-t-2xl px-6 py-4 flex items-center justify-between">
                   <div className="flex items-center gap-3"><Truck className="w-7 h-7 text-white" /><h2 className="text-xl font-bold text-white">Agent Management</h2></div>
                   <button onClick={onClose} className="bg-orange-700 hover:bg-orange-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition"><X className="w-4 h-4" />Close</button>
                  </div>

                  {assignAgent && (
                   <div className="bg-amber-50 border-b border-amber-200 p-6">
                  <h3 className="font-bold text-amber-800 mb-3">Assign Employees to: <span className="text-orange-600">{assignAgent.agentCode} — {assignAgent.city}</span></h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 max-h-40 overflow-y-auto">
                   {drivers.map(function(emp) {
                  return (
                   <label key={emp.id} className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-amber-50">
                  <input type="checkbox" checked={assignedIds.includes(emp.id)}
                   onChange={function(e) { setAssignedIds(e.target.checked ? [...assignedIds, emp.id] : assignedIds.filter(function(i) { return i !== emp.id; })); }}
                   className="w-4 h-4 text-orange-500" />
                  <span>{emp.firstName} {emp.lastName}</span>
                   </label>
                  );
                   })}
                  </div>
                  <div className="flex gap-3">
                   <button onClick={saveAssign} className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-orange-700">Save Assignments</button>
                   <button onClick={function() { setAssignAgent(null); }} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-300">Cancel</button>
                  </div>
                   </div>
                  )}

                  <div className="flex border-b border-gray-200 px-6 pt-4 gap-4">
                   <button onClick={function() { setTab('list'); setForm(emptyForm); setEditAgent(null); }} className={'pb-3 text-sm font-semibold border-b-2 transition ' + (tab==='list'?'border-orange-500 text-orange-700':'border-transparent text-gray-500 hover:text-gray-700')}>
                  Agents ({agents.length})
                   </button>
                   <button onClick={function() { setForm(emptyForm); setEditAgent(null); setTab('form'); }} className={'pb-3 text-sm font-semibold border-b-2 transition ' + (tab==='form'&&!editAgent?'border-orange-500 text-orange-700':'border-transparent text-gray-500 hover:text-gray-700')}>
                  + Add Agent
                   </button>
                  </div>

                  <div className="p-6">
                   {tab === 'list' && (
                  <div>
                   <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-1 max-w-sm">
                   <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input value={search} onChange={function(e) { setSearch(e.target.value); }} placeholder="Search by code or city..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none w-full" />
                  </div>
                   </div>
                   {agents.length === 0 ? (
                  <div className="text-center py-12 text-gray-400"><Truck className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No agents added yet</p></div>
                   ) : (
                  <table className="w-full text-sm">
                   <thead className="bg-orange-50"><tr>{['Agent Code','City','Country','Assigned Employees','Actions'].map(function(h) { return <th key={h} className="px-4 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wide">{h}</th>; })}</tr></thead>
                   <tbody className="divide-y divide-gray-100">
                  {filteredAgents.map(function(a) {
                   return (
                  <tr key={a.id} className="hover:bg-orange-50 transition">
                   <td className="px-4 py-3 font-bold text-orange-700">{a.agentCode}</td>
                   <td className="px-4 py-3 text-gray-800">{a.city}</td>
                   <td className="px-4 py-3 text-gray-500">{a.country||'—'}</td>
                   <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                   {(a.assignedEmployees||[]).length === 0 ? (
                  <span className="text-gray-400 text-xs">None</span>
                   ) : (
                  (a.assignedEmployees||[]).map(function(emp) {
                   return <span key={emp.id} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">{emp.name}</span>;
                  })
                   )}
                  </div>
                   </td>
                   <td className="px-4 py-3">
                  <div className="flex gap-2">
                   <button onClick={function() { openAssign(a); }} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200">Assign</button>
                   <button onClick={function() { startEdit(a); }} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold hover:bg-orange-200">Edit</button>
                   <button onClick={function() { handleDelete(a); }} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200">Delete</button>
                  </div>
                   </td>
                  </tr>
                   );
                  })}
                   </tbody>
                  </table>
                   )}
                  </div>
                   )}
                   {tab === 'form' && (
                  <div>
                   <h3 className="font-bold text-gray-800 mb-4 text-lg">{editAgent ? 'Edit Agent — ' + editAgent.agentCode : 'Register New Agent'}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Agent Code *</label><input value={form.agentCode} onChange={function(e) { setForm(Object.assign({}, form, {agentCode: e.target.value.toUpperCase()})); }} className={fc} placeholder="e.g. PA, BH, KM" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">City *</label><input value={form.city} onChange={function(e) { setForm(Object.assign({}, form, {city: e.target.value})); }} className={fc} placeholder="e.g. Birmingham" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Country</label><input value={form.country} onChange={function(e) { setForm(Object.assign({}, form, {country: e.target.value})); }} className={fc} placeholder="e.g. United Kingdom" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label><input value={form.notes} onChange={function(e) { setForm(Object.assign({}, form, {notes: e.target.value})); }} className={fc} /></div>
                   </div>
                   <div className="flex gap-3 mt-5">
                  <button onClick={handleSave} disabled={saving} className={'px-6 py-2.5 rounded-lg font-semibold text-sm transition ' + (saving ? 'bg-gray-300 text-gray-500' : 'bg-orange-600 text-white hover:bg-orange-700')}>{saving ? 'Saving...' : (editAgent ? 'Update Agent' : 'Register Agent')}</button>
                  <button onClick={function() { setTab('list'); setForm(emptyForm); setEditAgent(null); }} className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300">Cancel</button>
                   </div>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const AgentCollectionForm = ({ onClose }) => {
                const today = new Date().toISOString().split('T')[0];
                // Dropdowns/date as controlled (selection events only); text/number as uncontrolled refs
                const [agentId, setAgentId] = useState('');
                const [date, setDate] = useState(today);
                const fromSuffixRef = React.useRef(null);
                const toSuffixRef = React.useRef(null);
                const amountCollectedRef = React.useRef(null);
                const amountPaidRef = React.useRef(null);
                const bankAmountRef = React.useRef(null);
                const notesRef = React.useRef(null);
                const [saving, setSaving] = useState(false);
                const sym = getCurrencySymbol(currentUser.currency || 'GBP');

                const selectedAgent = myAgents.find(function(a) { return a.id === parseInt(agentId); });

                const todayCollections = agentCollections.filter(function(c) {
                  return c.employeeId === currentUser.id && c.date === date;
                });

                const handleSubmit = async function() {
                  const collected = amountCollectedRef.current ? amountCollectedRef.current.value : '';
                  if (!agentId || !collected) { alert('Agent and amount collected are required'); return; }
                  setSaving(true);
                  try {
                   const fromSuffix = fromSuffixRef.current ? fromSuffixRef.current.value : '';
                   const toSuffix = toSuffixRef.current ? toSuffixRef.current.value : '';
                   const fromCode = selectedAgent ? selectedAgent.agentCode + fromSuffix : fromSuffix;
                   const toCode = selectedAgent ? selectedAgent.agentCode + toSuffix : toSuffix;
                   const data = await apiCall(API_ENDPOINTS.agentCollections, {
                  method: 'POST',
                  body: JSON.stringify({
                   agentId: parseInt(agentId),
                   date: date,
                   fromCode: fromCode,
                   toCode: toCode,
                   amountCollected: parseFloat(collected) || 0,
                   amountPaid: parseFloat(amountPaidRef.current ? amountPaidRef.current.value : '') || 0,
                   bankAmount: parseFloat(bankAmountRef.current ? bankAmountRef.current.value : '') || 0,
                   boxesQty: 0,
                   currency: currentUser.currency || 'GBP',
                   notes: notesRef.current ? notesRef.current.value : ''
                  })
                   });
                   if (data.success) {
                  await loadAgentCollectionsFromAPI();
                  if (fromSuffixRef.current) fromSuffixRef.current.value = '';
                  if (toSuffixRef.current) toSuffixRef.current.value = '';
                  if (amountCollectedRef.current) amountCollectedRef.current.value = '';
                  if (amountPaidRef.current) amountPaidRef.current.value = '';
                  if (bankAmountRef.current) bankAmountRef.current.value = '';
                  if (notesRef.current) notesRef.current.value = '';
                  alert('Collection record saved');
                   } else alert('Error: ' + data.error);
                  } catch(e) { alert('Failed: ' + e.message); }
                  setSaving(false);
                };

                const handleDelete = async function(id) {
                  if (!window.confirm('Delete this record?')) return;
                  try {
                   await apiCall(API_ENDPOINTS.agentCollections + '/' + id, { method: 'DELETE' });
                   await loadAgentCollectionsFromAPI();
                  } catch(e) { alert('Failed: ' + e.message); }
                };

                const fc = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400';

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-50 p-4 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
                  <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-t-2xl px-6 py-5 flex items-center justify-between">
                   <div className="flex items-center gap-3"><Truck className="w-6 h-6 text-white" /><h2 className="text-xl font-bold text-white">Agent Collection</h2></div>
                   <button onClick={onClose} className="text-orange-200 hover:text-white text-2xl font-bold">X</button>
                  </div>
                  <div className="p-6">
                   <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Agent *</label>
                  <select value={agentId} onChange={function(e) { setAgentId(e.target.value); }} className={fc + ' bg-white'}>
                   <option value="">Select Agent</option>
                   {myAgents.map(function(a) { return <option key={a.id} value={a.id}>{a.agentCode} — {a.city}</option>; })}
                  </select>
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
                  <input type="date" value={date} onChange={function(e) { setDate(e.target.value); }} className={fc} />
                   </div>
                  </div>
                  {selectedAgent && (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">From Code</label>
                   <div className="flex items-center">
                  <span className="px-3 py-2 bg-orange-100 text-orange-700 font-bold rounded-l-lg border border-r-0 border-gray-300 text-sm whitespace-nowrap">{selectedAgent.agentCode}</span>
                  <input ref={fromSuffixRef} defaultValue="" placeholder="33" className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                   </div>
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">To Code</label>
                   <div className="flex items-center">
                  <span className="px-3 py-2 bg-orange-100 text-orange-700 font-bold rounded-l-lg border border-r-0 border-gray-300 text-sm whitespace-nowrap">{selectedAgent.agentCode}</span>
                  <input ref={toSuffixRef} defaultValue="" placeholder="38" className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                   </div>
                  </div>
                   </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Collected Cash ({sym}) *</label>
                  <input type="number" min="0" step="0.01" ref={amountCollectedRef} defaultValue="" placeholder="0.00" className={fc} />
                   </div>
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Paid to Agent ({sym})</label>
                  <input type="number" min="0" step="0.01" ref={amountPaidRef} defaultValue="" placeholder="0.00" className={fc} />
                   </div>
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Bank Transfer ({sym})
                  <span className="ml-1 text-blue-500 font-normal text-xs">— paid directly to company bank, not included in your cash accounting</span>
                   </label>
                   <input type="number" min="0" step="0.01" ref={bankAmountRef} defaultValue="" placeholder="0.00" className={fc} />
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label>
                   <input ref={notesRef} defaultValue="" className={fc} placeholder="Optional notes..." />
                  </div>
                   </div>
                   <button onClick={handleSubmit} disabled={saving} className={'w-full py-3 rounded-xl font-bold transition mb-6 ' + (saving ? 'bg-gray-300 text-gray-500' : 'bg-orange-600 text-white hover:bg-orange-700')}>
                  {saving ? 'Saving...' : 'Save Collection Record'}
                   </button>

                   {todayCollections.length > 0 && (
                  <div>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Today's Records</p>
                   <div className="space-y-2">
                  {todayCollections.map(function(col) {
                   return (
                  <div key={col.id} className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2.5 flex items-center justify-between">
                   <div>
                  <span className="font-bold text-orange-700">{col.agentCode}</span>
                  <span className="text-gray-500 text-xs ml-2">{col.fromCode} to {col.toCode}</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm">
                  <span className="text-green-600 font-bold">+{sym}{col.amountCollected.toFixed(2)}</span>
                  {col.amountPaid > 0 && <span className="text-red-500 font-semibold">-{sym}{col.amountPaid.toFixed(2)}</span>}
                  {col.bankAmount > 0 && <span className="text-blue-600 font-semibold">Bank:{sym}{col.bankAmount.toFixed(2)}</span>}
                  <button onClick={function() { handleDelete(col.id); }} className="text-red-400 hover:text-red-600 font-bold">X</button>
                   </div>
                  </div>
                   );
                  })}
                  <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold">
                   <span>Today's Total</span>
                   <span className="text-green-700">
                   {sym}{todayCollections.reduce(function(s,c) { return s+c.amountCollected; }, 0).toFixed(2)} cash
                   {todayCollections.some(function(c){return c.bankAmount>0;}) && <span className="text-blue-600 ml-2">+ {sym}{todayCollections.reduce(function(s,c) { return s+c.bankAmount; }, 0).toFixed(2)} bank</span>}
                   </span>
                  </div>
                   </div>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const AgentReport = ({ onClose, visibleEmployees: visEmp, onRefresh, persistedState, onStateChange }) => {
                const today = new Date().toISOString().split('T')[0];
                const mk = (k) => (v) => onStateChange && onStateChange(function(s){return{...s,[k]:typeof v==='function'?v(s[k]):v};});
                const adjAmountRef = React.useRef(null);
                const adjHoursRef = React.useRef(null);
                const adjReasonRef = React.useRef(null);
                const fromDate = persistedState ? persistedState.fromDate : today.slice(0,8)+'01'; const setFromDate = mk('fromDate');
                const toDate = persistedState ? persistedState.toDate : today; const setToDate = mk('toDate');
                const empFilter = persistedState ? persistedState.empFilter : ''; const setEmpFilter = mk('empFilter');
                const branchFilter = persistedState ? persistedState.branchFilter : ''; const setBranchFilter = mk('branchFilter');
                const countryFilter = persistedState ? persistedState.countryFilter : ''; const setCountryFilter = mk('countryFilter');
                const reportData = persistedState ? persistedState.reportData : null; const setReportData = mk('reportData');
                const [editingId, setEditingId] = useState(null);
                const [editVals, setEditVals] = useState({});
                const [savingId, setSavingId] = useState(null);
                const showAddForm = persistedState ? persistedState.showAddForm : false;
                const setShowAddForm = mk('showAddForm');
                // addForm is LOCAL state — not persisted — so typing doesn't re-render parent
                // Only dropdowns/date as controlled state — text/number as refs to avoid re-renders on keystroke
                const [addEmpId, setAddEmpId] = useState('');
                const [addAgentId, setAddAgentId] = useState('');
                const [addDate, setAddDate] = useState(new Date().toISOString().split('T')[0]);
                const addFromRef = React.useRef(null);
                const addToRef = React.useRef(null);
                const addCollectedRef = React.useRef(null);
                const addPaidRef = React.useRef(null);
                const addBankRef = React.useRef(null);
                const addNotesRef = React.useRef(null);
                const [addSaving, setAddSaving] = useState(false);

                React.useEffect(function() {
                  const handleEsc = function(e) { if (e.key === 'Escape') onClose(); };
                  window.addEventListener('keydown', handleEsc);
                  return function() { window.removeEventListener('keydown', handleEsc); };
                }, []);

                const handleDeleteCollection = async function(col) {
                  if (!window.confirm('Delete this collection record for ' + col.employeeName + ' on ' + col.date + '? This cannot be undone.')) return;
                  try {
                   await apiCall(API_ENDPOINTS.agentCollections + '/' + col.id, { method: 'DELETE' });
                   // Remove from local report view immediately
                   setReportData(function(prev) { return prev ? prev.filter(function(c) { return c.id !== col.id; }) : prev; });
                   // Sync parent agentCollections state so report stays correct on re-open
                   if (onRefresh) await onRefresh();
                  } catch(e) { alert('Failed to delete: ' + e.message); }
                };

                const handleAddCollection = async function() {
                  if (!addEmpId || !addAgentId) { alert('Please select an employee and an agent'); return; }
                  if (!addDate) { alert('Please select a date'); return; }
                  setAddSaving(true);
                  try {
                   const payload = {
                  employeeId: parseInt(addEmpId),
                  agentId: parseInt(addAgentId),
                  date: addDate,
                  fromCode: addFromRef.current ? addFromRef.current.value : '',
                  toCode: addToRef.current ? addToRef.current.value : '',
                  amountCollected: parseFloat(addCollectedRef.current ? addCollectedRef.current.value : '') || 0,
                  amountPaid: parseFloat(addPaidRef.current ? addPaidRef.current.value : '') || 0,
                  bankAmount: parseFloat(addBankRef.current ? addBankRef.current.value : '') || 0,
                  boxesQty: 0,
                  notes: addNotesRef.current ? addNotesRef.current.value : ''
                   };
                   await apiCall(API_ENDPOINTS.agentCollections, { method: 'POST', body: JSON.stringify(payload) });
                   if (onRefresh) await onRefresh();
                   // Reset controlled fields
                   setAddEmpId(''); setAddAgentId(''); setAddDate(new Date().toISOString().split('T')[0]);
                   // Clear refs
                   [addFromRef, addToRef, addCollectedRef, addPaidRef, addBankRef, addNotesRef].forEach(function(r){ if(r.current) r.current.value = ''; });
                   setShowAddForm(false);
                   generateReport();
                  } catch(e) { alert('Failed to add: ' + e.message); }
                  setAddSaving(false);
                };

                const startEdit = function(col) {
                  setEditingId(col.id);
                  setEditVals({ fromCode: col.fromCode, toCode: col.toCode, amountCollected: col.amountCollected, amountPaid: col.amountPaid, bankAmount: col.bankAmount || 0, boxesQty: col.boxesQty });
                };

                const saveEdit = async function(col) {
                  setSavingId(col.id);
                  try {
                   const data = await apiCall(API_ENDPOINTS.agentCollections + '/' + col.id, {
                  method: 'PUT',
                  body: JSON.stringify({
                   fromCode: editVals.fromCode,
                   toCode: editVals.toCode,
                   amountCollected: parseFloat(editVals.amountCollected) || 0,
                   amountPaid: parseFloat(editVals.amountPaid) || 0,
                   bankAmount: parseFloat(editVals.bankAmount) || 0,
                   boxesQty: parseInt(editVals.boxesQty) || 0,
                   notes: col.notes
                  })
                   });
                   if (data.success) {
                  await loadAgentCollectionsFromAPI();
                  setEditingId(null);
                  setReportData(null);
                   } else alert('Error: ' + data.error);
                  } catch(e) { alert('Failed: ' + e.message); }
                  setSavingId(null);
                };

                const generateReport = function() {
                  const filtered = agentCollections.filter(function(c) {
                   const emp = visEmp.find(function(e) { return e.id === c.employeeId; });
                   if (!emp) return false;
                   if (empFilter && c.employeeId !== parseInt(empFilter)) return false;
                   if (branchFilter && !(emp.branches||[]).includes(branchFilter)) return false;
                   if (countryFilter && emp.country !== countryFilter) return false;
                   return c.date >= fromDate && c.date <= toDate;
                  }).sort(function(a,b) { return a.date < b.date ? -1 : 1; });
                  setReportData(filtered);
                };

                const exportCSV = function() {
                  if (!reportData) return;
                  let csv = 'Employee ID,Employee Name,Date,Agent Code,City,From Code,To Code,Amount Collected,Amount Paid,Currency\n';
                  reportData.forEach(function(c) {
                   csv += '"'+c.employeeCode+'","'+c.employeeName+'","'+c.date+'","'+c.agentCode+'","'+c.agentCity+'","'+c.fromCode+'","'+c.toCode+'",'+c.amountCollected.toFixed(2)+','+c.amountPaid.toFixed(2)+','+c.boxesQty+',"'+c.currency+'"\n';
                  });
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = 'agent_collection_report_' + fromDate + '_' + toDate + '.csv'; a.click();
                };

                const totalCollected = reportData ? reportData.reduce(function(s,c) { return s+c.amountCollected; }, 0) : 0;
                const totalPaid = reportData ? reportData.reduce(function(s,c) { return s+c.amountPaid; }, 0) : 0;

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                  <div className="sticky top-0 z-10 bg-white rounded-t-2xl p-6 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Truck className="w-7 h-7 text-orange-600" />Agent Collection Report</h2>
                   <button onClick={onClose} className="bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition"><X className="w-4 h-4" />Close</button>
                  </div>
                  <div className="p-6 border-b border-gray-100 flex flex-wrap gap-3 items-end">
                   <div><label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label><input type="date" value={fromDate} onChange={function(e) { setFromDate(e.target.value); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
                   <div><label className="block text-xs font-semibold text-gray-600 mb-1">End Date</label><input type="date" value={toDate} onChange={function(e) { setToDate(e.target.value); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
                   {branchList.length > 0 && (
                   <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Branch</label>
                   <select value={branchFilter} onChange={function(e) { setBranchFilter(e.target.value); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                   <option value="">All Branches</option>
                   {branchList.map(function(b) { return <option key={b} value={b}>{b}</option>; })}
                   </select>
                   </div>
                   )}
                   {[...new Set(visEmp.filter(function(e){return !e.isAdmin&&e.country;}).map(function(e){return e.country;}))].length > 0 && (
                   <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Country</label>
                   <select value={countryFilter} onChange={function(e) { setCountryFilter(e.target.value); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                   <option value="">All Countries</option>
                   {[...new Set(visEmp.filter(function(e){return !e.isAdmin&&e.country;}).map(function(e){return e.country;}))].sort().map(function(c) { return <option key={c} value={c}>{c}</option>; })}
                   </select>
                   </div>
                   )}
                   <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Employee</label>
                  <select value={empFilter} onChange={function(e) { setEmpFilter(e.target.value); }} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                   <option value="">All Employees</option>
                   {visEmp.filter(function(e) {
                   return !e.isAdmin
                   && agentCollections.some(function(c) { return c.employeeId === e.id; })
                   && (!branchFilter || (e.branches||[]).includes(branchFilter))
                   && (!countryFilter || e.country === countryFilter);
                   }).map(function(e) { return <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>; })}
                  </select>
                   </div>
                   <button onClick={generateReport} className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-700 text-sm">Generate Report</button>
                   {reportData && <button onClick={exportCSV} className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 text-sm">Export CSV</button>}
                   <button onClick={function(){setShowAddForm(!showAddForm);}} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 text-sm flex items-center gap-2">
                  <span className="text-lg leading-none">+</span> Add Collection
                   </button>
                  </div>

                  {showAddForm && (
                  <div className="mx-6 mb-4 bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                   <h3 className="text-sm font-bold text-indigo-800 mb-4">Manually Add Collection Record</h3>
                   <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Employee *</label>
                   <select value={addEmpId} onChange={function(e){setAddEmpId(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select employee...</option>
                  {[...visEmp].filter(function(e){return !e.isAdmin;}).sort(function(a,b){return (a.firstName+a.lastName).localeCompare(b.firstName+b.lastName);}).map(function(e){return <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>;})}
                   </select>
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Agent *</label>
                   <select value={addAgentId} onChange={function(e){setAddAgentId(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">Select agent...</option>
                  {agents.map(function(a){return <option key={a.Id||a.id} value={a.Id||a.id}>{a.AgentCode||a.agentCode} — {a.City||a.city}</option>;})}
                   </select>
                  </div>
                   </div>
                   <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                   <input type="date" value={addDate} onChange={function(e){setAddDate(e.target.value);}} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">From Code</label>
                   <input type="text" ref={addFromRef} defaultValue="" placeholder="e.g. OX79" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">To Code</label>
                   <input type="text" ref={addToRef} defaultValue="" placeholder="e.g. OX91" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                   </div>
                   <div className="grid grid-cols-4 gap-3 mb-4">
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Cash Collected</label>
                   <input type="number" min="0" step="0.01" ref={addCollectedRef} defaultValue="" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Paid to Agent</label>
                   <input type="number" min="0" step="0.01" ref={addPaidRef} defaultValue="" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Bank Transfer</label>
                   <input type="number" min="0" step="0.01" ref={addBankRef} defaultValue="" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                   <label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label>
                   <input type="text" ref={addNotesRef} defaultValue="" placeholder="Optional" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                   </div>
                   <div className="flex gap-2">
                  <button onClick={handleAddCollection} disabled={addSaving} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">{addSaving?'Saving...':'Save Collection'}</button>
                  <button onClick={function(){setShowAddForm(false);}} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200">Cancel</button>
                   </div>
                  </div>
                  )}

                  <div className="p-6">
                   {!reportData ? (
                  <div className="text-center py-16 text-gray-400"><Truck className="w-16 h-16 mx-auto mb-4 opacity-30" /><p>Select a date range and click Generate Report</p></div>
                   ) : reportData.length === 0 ? (
                  <div className="text-center py-16 text-gray-400"><p>No collection records found for this period</p></div>
                   ) : (
                  <div>
                   <div className="grid grid-cols-2 gap-4 mb-6 max-w-lg">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><p className="text-xs text-green-600 font-semibold uppercase">Total Collected</p><p className="text-2xl font-bold text-green-700 mt-1">{getCurrencySymbol('GBP')}{totalCollected.toFixed(2)}</p></div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><p className="text-xs text-red-600 font-semibold uppercase">Total Paid</p><p className="text-2xl font-bold text-red-700 mt-1">{getCurrencySymbol('GBP')}{totalPaid.toFixed(2)}</p></div>
                   </div>
                   <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                   <thead className="bg-orange-50">
                  <tr>{['Employee','Date','Agent','From','To','Cash Collected','Paid to Agent','Bank Transfer', hasPermission('canManageAgentCollections') ? 'Edit' : ''].filter(Boolean).map(function(h) { return <th key={h} className="px-4 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wide">{h}</th>; })}</tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                  {reportData.map(function(col) {
                   const sym = getCurrencySymbol(col.currency);
                   const isEditing = editingId === col.id;
                   const ic = 'w-20 px-2 py-1 border border-orange-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-orange-400';
                   return (
                  <tr key={col.id} className={'hover:bg-orange-50 ' + (isEditing ? 'bg-amber-50' : '')}>
                   <td className="px-4 py-3"><div className="font-medium text-gray-800">{col.employeeName}</div><div className="text-xs text-gray-500">{col.employeeCode}</div></td>
                   <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{new Date(col.date).toLocaleDateString('en-GB')}</td>
                   <td className="px-4 py-3"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">{col.agentCode}</span><div className="text-xs text-gray-400">{col.agentCity}</div></td>
                   <td className="px-4 py-3 font-semibold text-gray-700">
                  {isEditing ? <input value={editVals.fromCode} onChange={function(e){setEditVals(Object.assign({},editVals,{fromCode:e.target.value}));}} className={ic} /> : (col.fromCode||'—')}
                   </td>
                   <td className="px-4 py-3 font-semibold text-gray-700">
                  {isEditing ? <input value={editVals.toCode} onChange={function(e){setEditVals(Object.assign({},editVals,{toCode:e.target.value}));}} className={ic} /> : (col.toCode||'—')}
                   </td>
                   <td className="px-4 py-3 font-bold text-green-700">
                  {isEditing ? <input type="number" value={editVals.amountCollected} onChange={function(e){setEditVals(Object.assign({},editVals,{amountCollected:e.target.value}));}} className={ic} /> : sym+col.amountCollected.toFixed(2)}
                   </td>
                   <td className="px-4 py-3 font-bold text-red-600">
                  {isEditing ? <input type="number" value={editVals.amountPaid} onChange={function(e){setEditVals(Object.assign({},editVals,{amountPaid:e.target.value}));}} className={ic} /> : (col.amountPaid > 0 ? sym+col.amountPaid.toFixed(2) : '—')}
                   </td>
                   <td className="px-4 py-3 font-bold text-blue-600">
                  {isEditing ? <input type="number" min="0" step="0.01" value={editVals.bankAmount} onChange={function(e){setEditVals(Object.assign({},editVals,{bankAmount:e.target.value}));}} className={ic} /> : (col.bankAmount > 0 ? <span className="flex items-center gap-1"><span className="text-xs">🏦</span>{sym}{(col.bankAmount||0).toFixed(2)}</span> : <span className="text-gray-300">—</span>)}
                   </td>
                   {hasPermission('canManageAgentCollections') && (
                  <td className="px-4 py-3">
                   {isEditing ? (
                  <div className="flex gap-1">
                   <button onClick={function(){saveEdit(col);}} disabled={savingId===col.id} className="px-2 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700 disabled:opacity-50">{savingId===col.id?'...':'Save'}</button>
                   <button onClick={function(){setEditingId(null);}} className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs font-semibold hover:bg-gray-300">Cancel</button>
                  </div>
                   ) : (
                  <div className="flex gap-1">
                   <button onClick={function(){startEdit(col);}} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold hover:bg-orange-200">Edit</button>
                   {hasPermission('canDeleteAgentCollections') && (
                  <button onClick={function(){handleDeleteCollection(col);}} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200">Delete</button>
                   )}
                  </div>
                   )}
                  </td>
                   )}
                  </tr>
                   );
                  })}
                  <tr className="bg-orange-50 font-bold border-t-2 border-orange-200">
                   <td colSpan="5" className="px-4 py-3 text-right text-gray-700 uppercase text-xs tracking-wide">TOTAL</td>
                   <td className="px-4 py-3 text-green-700">{getCurrencySymbol('GBP')}{totalCollected.toFixed(2)}</td>
                   <td className="px-4 py-3 text-red-600">{getCurrencySymbol('GBP')}{totalPaid.toFixed(2)}</td>
                   <td className="px-4 py-3 text-blue-600">{getCurrencySymbol('GBP')}{(reportData.reduce(function(s,c){return s+(c.bankAmount||0);},0)).toFixed(2)}</td>
                   {hasPermission('canManageAgentCollections') && <td></td>}
                  </tr>
                   </tbody>
                  </table>
                   </div>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const EmployeeAccounting = ({ onClose, visibleEmployees: visEmp, persistedState, onStateChange }) => {
                const today = new Date().toISOString().split('T')[0];
                // Use persisted state from parent so remounts don't wipe the report
                const empId = persistedState ? persistedState.empId : '';
                const setEmpId = (v) => onStateChange && onStateChange(function(s) { return {...s, empId: typeof v === 'function' ? v(s.empId) : v}; });
                const fromDate = persistedState ? persistedState.fromDate : today.slice(0,8)+'01';
                const setFromDate = (v) => onStateChange && onStateChange(function(s) { return {...s, fromDate: typeof v === 'function' ? v(s.fromDate) : v}; });
                const toDate = persistedState ? persistedState.toDate : today;
                const setToDate = (v) => onStateChange && onStateChange(function(s) { return {...s, toDate: typeof v === 'function' ? v(s.toDate) : v}; });
                const report = persistedState ? persistedState.report : null;
                const setReport = (v) => onStateChange && onStateChange(function(s) { return {...s, report: typeof v === 'function' ? v(s.report) : v}; });
                const [settling, setSettling] = useState(false);
                const [settleNote, setSettleNote] = useState('');
                const [settleAmount, setSettleAmount] = useState('');

                React.useEffect(function() {
                  if (report) setSettleAmount(Math.abs(report.balance).toFixed(2));
                  else setSettleAmount('');
                }, [report]);

                const emp = visEmp.find(function(e) { return e.id === parseInt(empId); });
                const sym = emp ? getCurrencySymbol(emp.currency) : getCurrencySymbol('GBP');

                const generateReport = function() {
                  if (!empId) { alert('Please select an employee'); return; }
                  const empTimesheets = timesheets.filter(function(ts) {
                  return ts.employeeId === parseInt(empId) && ts.status === 'approved' && ts.date >= fromDate && ts.date <= toDate;
                  }).sort(function(a,b) { return a.date > b.date ? 1 : -1; });

                  const empExpenses = expenses.filter(function(ex) {
                  return ex.employeeId === parseInt(empId) && (ex.status === 'approved' || ex.status === 'paid') && ex.date >= fromDate && ex.date <= toDate;
                  }).sort(function(a,b) { return a.date > b.date ? 1 : -1; });

                  const empCollections = agentCollections.filter(function(c) {
                  return c.employeeId === parseInt(empId) && c.date >= fromDate && c.date <= toDate;
                  }).sort(function(a,b) { return a.date > b.date ? 1 : -1; });

                  const hourlyRate = parseFloat(emp.hourlyRate) || 0;
                  const overtimeMultiplier = (emp.overtimeRate != null && emp.overtimeRate !== '') ? parseFloat(emp.overtimeRate) : (payrollSettings.overtimeMultiplier || 1.5);

                  const empAdjustments = financialAdjustments.filter(function(a) {
                  return a.employeeId === parseInt(empId) && a.date >= fromDate && a.date <= toDate;
                  });

                  const previousPayments = financialAdjustments.filter(function(a) {
                  return a.employeeId === parseInt(empId) && a.type === 'acct_settle' && a.date <= toDate;
                  }).reduce(function(s,a) { return s + (parseFloat(a.amount)||0); }, 0);
                  const accountCredits = financialAdjustments.filter(function(a) {
                  return a.employeeId === parseInt(empId) && a.type === 'account_credit' && a.date >= fromDate && a.date <= toDate;
                  });
                  const approvedCredits = accountCredits;
                  const totalAccountCredits = approvedCredits.reduce(function(s,a) { return s + (parseFloat(a.amount)||0); }, 0);
                  const pendingCreditsTotal = 0; // deprecated — credits now admin-only
                  const previousBonuses = 0;
                  const previousPenalties = 0;

                  const tsRows = empTimesheets.map(function(ts) {
                  const reg = parseFloat(ts.regularHours) || 0;
                  const ot = parseFloat(ts.overtimeHours) || 0;
                  const earned = (reg * hourlyRate) + (ot * hourlyRate * overtimeMultiplier);
                  return { date: ts.date, regularHours: reg, overtimeHours: ot, earned: earned };
                  });

                  const totalEarned = tsRows.reduce(function(s,r) { return s+r.earned; }, 0);
                  const totalExpenses = empExpenses.reduce(function(s,e) { return s+e.amount; }, 0);
                  const totalCollected = empCollections.reduce(function(s,c) { return s+c.amountCollected; }, 0);
                  const totalPaidToAgents = empCollections.reduce(function(s,c) { return s+c.amountPaid; }, 0);

                  const grossBalance = totalCollected - totalPaidToAgents - totalEarned - totalExpenses;
                  const balance = grossBalance - previousPayments - totalAccountCredits;

                  setReport({ tsRows, empExpenses, empCollections, empAdjustments, accountCredits, totalEarned, totalExpenses, totalCollected, totalPaidToAgents, grossBalance, previousPayments, previousBonuses, previousPenalties, totalAccountCredits, pendingCreditsTotal, balance, hourlyRate });
                };

                const handleSettle = async function() {
                  if (!report) return;
                  const amount = parseFloat(settleAmount);
                  if (!amount || amount <= 0) { alert('Please enter a valid amount'); return; }
                  if (amount > Math.abs(report.balance)) { alert('Amount cannot exceed the balance of ' + sym + Math.abs(report.balance).toFixed(2)); return; }
                  const isPartial = amount < Math.abs(report.balance);
                  const confirmMsg = isPartial
                  ? 'Record partial settlement of ' + sym + amount.toFixed(2) + '?\nRemaining balance: ' + sym + (Math.abs(report.balance) - amount).toFixed(2) + ' will carry forward.'
                  : 'Record full settlement of ' + sym + amount.toFixed(2) + '?';
                  if (!window.confirm(confirmMsg)) return;
                  setSettling(true);
                  try {
                  const reason = settleNote || ((isPartial ? 'Partial accounting settlement' : 'Full accounting settlement') + ' ' + fromDate + ' to ' + toDate);
                  const data = await apiCall(API_ENDPOINTS.adjustments, {
                  method: 'POST',
                  body: JSON.stringify({ employeeId: parseInt(empId), type: 'acct_settle', amount: amount, reason: reason, date: today })
                  });
                  if (data.success) {
                  await loadAdjustmentsFromAPI();
                  alert(isPartial
                  ? 'Partial settlement of ' + sym + amount.toFixed(2) + ' recorded. Remaining ' + sym + (Math.abs(report.balance) - amount).toFixed(2) + ' carries forward.'
                  : 'Full settlement recorded successfully.'
                  );
                  setReport(null);
                  setSettleNote('');
                  setSettleAmount('');
                  } else alert('Error: ' + data.error);
                  } catch(e) { alert('Failed: ' + e.message); }
                  setSettling(false);
                };

                const printReport = function() {
                  if (!report || !emp) return;
                  const periodStr = new Date(fromDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) + ' — ' + new Date(toDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
                  const balanceLabel = report.balance > 0 ? 'Employee Owes Company' : report.balance < 0 ? 'Company Owes Employee' : 'Balance Clear';
                  const balanceColor = report.balance > 0 ? '#dc2626' : report.balance < 0 ? '#16a34a' : '#6b7280';
                  const tsRows = report.tsRows.map(function(r) {
                  return '<tr><td>'+new Date(r.date).toLocaleDateString('en-GB')+'</td><td>'+r.regularHours.toFixed(1)+'h</td><td>'+(r.overtimeHours>0?r.overtimeHours.toFixed(1)+'h':'—')+'</td><td>'+sym+report.hourlyRate.toFixed(2)+'/hr</td><td><b>'+sym+r.earned.toFixed(2)+'</b></td></tr>';
                  }).join('');
                  const collRows = report.empCollections.map(function(c) {
                  return '<tr><td>'+new Date(c.date).toLocaleDateString('en-GB')+'</td><td>'+c.agentCode+' – '+c.agentCity+'</td><td>'+c.fromCode+'</td><td>'+c.toCode+'</td><td><b>'+sym+c.amountCollected.toFixed(2)+'</b></td><td>'+(c.amountPaid>0?'-'+sym+c.amountPaid.toFixed(2):'—')+'</td></tr>';
                  }).join('');
                  const expRows = report.empExpenses.map(function(e) {
                  return '<tr><td>'+new Date(e.date).toLocaleDateString('en-GB')+'</td><td>'+e.category+'</td><td>'+(e.description||'—')+'</td><td>'+e.status+'</td><td><b>'+sym+e.amount.toFixed(2)+'</b></td></tr>';
                  }).join('');
                  const css = '<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Arial,sans-serif;font-size:10px;color:#1f2937;padding:16px;}h1{font-size:16px;color:#4338ca;margin-bottom:3px;}.meta{display:flex;justify-content:space-between;padding:8px 12px;background:#f3f4f6;border-radius:6px;margin:8px 0 14px;}.sec-title{font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;color:#374151;margin-bottom:4px;padding-bottom:3px;border-bottom:2px solid #e5e7eb;display:flex;justify-content:space-between;}.sec{margin-bottom:12px;}table{width:100%;border-collapse:collapse;font-size:9px;}th{background:#f9fafb;text-align:left;padding:3px 6px;font-size:8px;text-transform:uppercase;color:#6b7280;border-bottom:1px solid #e5e7eb;}td{padding:3px 6px;border-bottom:1px solid #f3f4f6;}.sum{background:#fef2f2;border:2px solid #fecaca;border-radius:6px;padding:10px;margin-top:12px;}.srow{display:flex;justify-content:space-between;padding:2px 0;font-size:10px;}.stotal{display:flex;justify-content:space-between;padding-top:7px;margin-top:6px;border-top:2px solid #e5e7eb;font-size:13px;font-weight:bold;}.footer{margin-top:14px;text-align:center;font-size:8px;color:#9ca3af;}@page{size:A4 portrait;margin:10mm;}@media print{html,body{height:100%;width:100%;}body{padding:8px;font-size:9px;}h1{font-size:14px;}.meta{padding:6px 10px;margin:6px 0 10px;}.sec{margin-bottom:8px;}.sum{padding:8px;margin-top:8px;}.footer{margin-top:8px;}}</style>';
                  const body = '<h1>Employee Accounting Report</h1><p style="color:#6b7280;font-size:11px;margin-bottom:4px;">Generated: '+new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'})+'</p>'
                  +'<div class="meta"><div><b style="font-size:15px;">'+emp.firstName+' '+emp.lastName+'</b><br><span style="color:#6b7280;">'+emp.employeeId+' · '+emp.department+' · '+sym+(parseFloat(emp.hourlyRate)||0).toFixed(2)+'/hr</span></div><div style="text-align:right;"><span style="font-size:10px;color:#6b7280;text-transform:uppercase;">Period</span><br><b>'+periodStr+'</b></div></div>'
                  +(report.empCollections.length>0?'<div class="sec"><div class="sec-title"><span>Agent Collections</span><span>'+sym+report.totalCollected.toFixed(2)+'</span></div><table><thead><tr><th>Date</th><th>Agent</th><th>From</th><th>To</th><th>Collected</th><th>Paid to Agent</th></tr></thead><tbody>'+collRows+'<tr style="background:#f0fdf4;font-weight:bold;"><td colspan="4" style="text-align:right;padding-right:8px;">Net</td><td>'+sym+report.totalCollected.toFixed(2)+'</td><td style="color:#dc2626;">-'+sym+report.totalPaidToAgents.toFixed(2)+'</td></tr></tbody></table></div>':'')
                  +(report.tsRows.length>0?'<div class="sec"><div class="sec-title"><span>Earnings from Timesheets</span><span>'+sym+report.totalEarned.toFixed(2)+'</span></div><table><thead><tr><th>Date</th><th>Regular</th><th>Overtime</th><th>Rate</th><th>Earned</th></tr></thead><tbody>'+tsRows+'<tr style="background:#eff6ff;font-weight:bold;"><td colspan="4" style="text-align:right;padding-right:8px;">Total</td><td>'+sym+report.totalEarned.toFixed(2)+'</td></tr></tbody></table></div>':'')
                  +(report.empExpenses.length>0?'<div class="sec"><div class="sec-title"><span>Approved Expenses</span><span>'+sym+report.totalExpenses.toFixed(2)+'</span></div><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Status</th><th>Amount</th></tr></thead><tbody>'+expRows+'<tr style="background:#f0fdfa;font-weight:bold;"><td colspan="4" style="text-align:right;padding-right:8px;">Total</td><td>'+sym+report.totalExpenses.toFixed(2)+'</td></tr></tbody></table></div>':'')
                  +'<div class="sum"><div style="font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin-bottom:10px;">Final Balance Summary</div>'
                  +'<div class="srow"><span>Agent Collections Received</span><span style="color:#16a34a;font-weight:600;">+'+sym+report.totalCollected.toFixed(2)+'</span></div>'
                  +(report.totalPaidToAgents>0?'<div class="srow"><span>Paid to Agents</span><span style="color:#dc2626;font-weight:600;">-'+sym+report.totalPaidToAgents.toFixed(2)+'</span></div>':'')
                  +'<div class="srow"><span>Earnings (timesheets)</span><span style="color:#dc2626;font-weight:600;">-'+sym+report.totalEarned.toFixed(2)+'</span></div>'
                  +'<div class="srow"><span>Approved Expenses</span><span style="color:#dc2626;font-weight:600;">-'+sym+report.totalExpenses.toFixed(2)+'</span></div>'
                  +(report.previousPayments>0?'<div class="srow" style="border-top:1px dashed #e5e7eb;padding-top:5px;margin-top:3px;"><span>Previously Settled</span><span style="color:#2563eb;font-weight:600;">-'+sym+report.previousPayments.toFixed(2)+'</span></div>':'')
                  +'<div class="stotal"><span style="color:'+balanceColor+'">'+balanceLabel+'</span><span style="color:'+balanceColor+';">'+(report.balance>0?'+':'')+sym+Math.abs(report.balance).toFixed(2)+'</span></div></div>'
                  +'<div class="footer">B-Post Employee Management System &nbsp;·&nbsp; Printed '+new Date().toLocaleString('en-GB')+'</div>';
                  const w = window.open('','_blank','width=860,height=1100');
                  if (!w) { alert('Please allow pop-ups for this site to use the print feature.'); return; }
                  w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Accounting — '+emp.firstName+' '+emp.lastName+'</title>'+css+'</head><body>'+body+'</body></html>');
                  w.document.close();
                  w.focus();
                  setTimeout(function() { w.print(); }, 500);
                };

                const exportCSV = function() {
                  if (!report) return;
                  let csv = 'Section,Date,Description,Amount\n';
                  report.tsRows.forEach(function(r) { csv += '"Timesheet","'+r.date+'","'+r.regularHours+'h reg + '+r.overtimeHours+'h OT",'+r.earned.toFixed(2)+'\n'; });
                  report.empExpenses.forEach(function(e) { csv += '"Expense","'+e.date+'","'+e.category+(e.description?' - '+e.description:'')+'",'+e.amount.toFixed(2)+'\n'; });
                  report.empCollections.forEach(function(c) { csv += '"Collection","'+c.date+'","'+c.agentCode+' '+c.agentCity+' ('+c.fromCode+'-'+c.toCode+')",'+c.amountCollected.toFixed(2)+'\n'; });
                  csv += '"","","FINAL BALANCE",'+report.balance.toFixed(2)+'\n';
                  const blob = new Blob([csv], {type:'text/csv'});
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href=url; a.download='accounting_'+(emp?emp.firstName+'_'+emp.lastName:'')+'_'+fromDate+'_'+toDate+'.csv'; a.click();
                };

                const Section = function(props) {
                  return (
                  <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className={'w-2 h-2 rounded-full inline-block ' + props.color}></span>{props.title}
                  <span className="ml-auto font-bold text-base">{props.total}</span>
                  </h3>
                  {props.children}
                  </div>
                  );
                };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8">
                  <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-t-2xl px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                  <FileText className="w-7 h-7 text-white" />
                  <h2 className="text-xl font-bold text-white">Employee Accounting</h2>
                  </div>
                  <button onClick={onClose} className="bg-indigo-800 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition">
                  <X className="w-4 h-4" />Close
                  </button>
                  </div>

                  <div className="p-6 border-b border-gray-200 flex flex-wrap gap-3 items-end">
                  <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Employee *</label>
                  <select value={empId} onChange={function(e){setEmpId(e.target.value);setReport(null);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 min-w-48">
                  <option value="">Select Employee</option>
                  {visEmp.filter(function(e){return !e.isAdmin;}).map(function(e){ return <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.employeeId})</option>; })}
                  </select>
                  </div>
                  <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">From Date</label>
                  <input type="date" value={fromDate} onChange={function(e){setFromDate(e.target.value);setReport(null);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">To Date</label>
                  <input type="date" value={toDate} onChange={function(e){setToDate(e.target.value);setReport(null);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <button onClick={generateReport} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm">Generate Report</button>
                  {report && <button onClick={exportCSV} className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm">Export CSV</button>}
                  {report && <button onClick={printReport} className="bg-gray-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/></svg>
                  Print / PDF
                  </button>}
                  </div>

                  {!report ? (
                  <div className="text-center py-16 text-gray-400">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Select an employee and date range, then click Generate Report</p>
                  </div>
                  ) : (
                  <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {(emp.firstName||'')[0]}{(emp.lastName||'')[0]}
                  </div>
                  <div>
                  <p className="font-bold text-gray-900 text-lg">{emp.firstName} {emp.lastName}</p>
                  <p className="text-gray-500 text-sm">{emp.employeeId} · {emp.department} · {sym}{(parseFloat(emp.hourlyRate)||0).toFixed(2)}/hr</p>
                  </div>
                  <div className="ml-auto text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Period</p>
                  <p className="text-sm font-semibold text-gray-700">{new Date(fromDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})} — {new Date(toDate).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</p>
                  </div>
                  </div>

                  <Section title="Agent Collections" color="bg-green-500" total={sym + report.totalCollected.toFixed(2)}>
                  {report.empCollections.length === 0 ? <p className="text-gray-400 text-sm">No collections in this period</p> : (
                  <table className="w-full text-sm">
                  <thead><tr className="bg-green-50">{['Date','Agent','From','To','Collected','Paid to Agent','Bank Transfer (→ Company)'].map(function(h){return <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-green-700">{h}</th>;})}</tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {report.empCollections.map(function(c){return (
                    <tr key={c.id} className="hover:bg-green-50">
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(c.date).toLocaleDateString('en-GB')}</td>
                    <td className="px-3 py-2"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">{c.agentCode}</span><span className="text-gray-400 text-xs ml-1">{c.agentCity}</span></td>
                    <td className="px-3 py-2 font-semibold">{c.fromCode||'—'}</td>
                    <td className="px-3 py-2 font-semibold">{c.toCode||'—'}</td>
                    <td className="px-3 py-2 font-bold text-green-700">{sym}{c.amountCollected.toFixed(2)}</td>
                    <td className="px-3 py-2 text-red-600 font-semibold">{c.amountPaid>0?'-'+sym+c.amountPaid.toFixed(2):'—'}</td>
                    <td className="px-3 py-2 text-blue-600 font-semibold">{(c.bankAmount||0)>0?<span className="flex items-center gap-1"><span className="text-xs">🏦</span>{sym}{(c.bankAmount||0).toFixed(2)}</span>:'—'}</td>
                    </tr>
                    );})}
                    <tr className="bg-green-50 font-bold border-t-2 border-green-200">
                    <td colSpan="4" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Net Collections</td>
                    <td className="px-3 py-2 text-green-700">{sym}{report.totalCollected.toFixed(2)}</td>
                    <td className="px-3 py-2 text-red-600">-{sym}{report.totalPaidToAgents.toFixed(2)}</td>
                    <td className="px-3 py-2 text-blue-600">{sym}{report.empCollections.reduce(function(s,c){return s+(c.bankAmount||0);},0).toFixed(2)}<span className="text-xs text-gray-400 ml-1">(co.)</span></td>
                    </tr>
                  </tbody>
                  </table>
                  )}
                  </Section>

                  <Section title="Earnings from Approved Timesheets" color="bg-blue-500" total={sym + report.totalEarned.toFixed(2)}>
                  {report.tsRows.length === 0 ? <p className="text-gray-400 text-sm">No approved timesheets in this period</p> : (
                  <table className="w-full text-sm">
                  <thead><tr className="bg-blue-50">{['Date','Regular Hrs','Overtime Hrs','Rate','Earned'].map(function(h){return <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-blue-700">{h}</th>;})}</tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {report.tsRows.map(function(r,i){return (
                    <tr key={i} className="hover:bg-blue-50">
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(r.date).toLocaleDateString('en-GB')}</td>
                    <td className="px-3 py-2 text-gray-700">{r.regularHours.toFixed(1)}h</td>
                    <td className="px-3 py-2 text-amber-600 font-semibold">{r.overtimeHours > 0 ? r.overtimeHours.toFixed(1)+'h' : '—'}</td>
                    <td className="px-3 py-2 text-gray-500">{sym}{report.hourlyRate.toFixed(2)}/hr</td>
                    <td className="px-3 py-2 font-bold text-blue-700">{sym}{r.earned.toFixed(2)}</td>
                    </tr>
                    );})}
                    <tr className="bg-blue-50 font-bold border-t-2 border-blue-200">
                    <td colSpan="4" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Total Earned</td>
                    <td className="px-3 py-2 text-blue-700">{sym}{report.totalEarned.toFixed(2)}</td>
                    </tr>
                  </tbody>
                  </table>
                  )}
                  </Section>

                  {report.accountCredits && report.accountCredits.length > 0 && (
                  <Section title="Account Credits" color="bg-indigo-500" total={'-' + sym + (report.totalAccountCredits||0).toFixed(2)}>
                  <table className="w-full text-sm">
                  <thead><tr className="bg-indigo-50">{['Date','Note','Amount'].map(function(h){return <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-indigo-700">{h}</th>;})}</tr></thead>
                  <tbody className="divide-y divide-gray-100">
                  {report.accountCredits.map(function(a){return (
                   <tr key={a.id} className="hover:bg-indigo-50">
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(a.date).toLocaleDateString('en-GB')}</td>
                  <td className="px-3 py-2 text-gray-700">{a.reason || 'Cash to accountant'}</td>
                  <td className="px-3 py-2 font-bold text-indigo-700">-{sym}{(parseFloat(a.amount)||0).toFixed(2)}</td>
                   </tr>
                  );})}
                  <tr className="bg-indigo-50 font-bold border-t-2 border-indigo-200">
                  <td colSpan="2" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Total Credits</td>
                  <td className="px-3 py-2 text-indigo-700">-{sym}{(report.totalAccountCredits||0).toFixed(2)}</td>
                  </tr>
                  </tbody>
                  </table>
                  </Section>
                  )}

                  <Section title="Approved Expenses" color="bg-teal-500" total={sym + report.totalExpenses.toFixed(2)}>
                  {report.empExpenses.length === 0 ? <p className="text-gray-400 text-sm">No approved expenses in this period</p> : (
                  <table className="w-full text-sm">
                  <thead><tr className="bg-teal-50">{['Date','Category','Description','Status','Amount'].map(function(h){return <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-teal-700">{h}</th>;})}</tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {report.empExpenses.map(function(e){return (
                    <tr key={e.id} className="hover:bg-teal-50">
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(e.date).toLocaleDateString('en-GB')}</td>
                    <td className="px-3 py-2"><span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">{e.category}</span></td>
                    <td className="px-3 py-2 text-gray-600">{e.description||'—'}</td>
                    <td className="px-3 py-2"><span className={'px-2 py-0.5 rounded-full text-xs font-semibold capitalize ' + (e.status==='paid'?'bg-blue-100 text-blue-700':'bg-green-100 text-green-700')}>{e.status}</span></td>
                    <td className="px-3 py-2 font-bold text-teal-700">{sym}{e.amount.toFixed(2)}</td>
                    </tr>
                    );})}
                    <tr className="bg-teal-50 font-bold border-t-2 border-teal-200">
                    <td colSpan="4" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Total Expenses</td>
                    <td className="px-3 py-2 text-teal-700">{sym}{report.totalExpenses.toFixed(2)}</td>
                    </tr>
                  </tbody>
                  </table>
                  )}
                  </Section>

                  <div className={'rounded-2xl border-2 p-6 mb-6 ' + (report.balance > 0 ? 'bg-red-50 border-red-300' : report.balance < 0 ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300')}>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Final Balance Summary</p>
                  <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Agent Collections Received</span>
                  <span className="font-semibold text-green-700">+{sym}{report.totalCollected.toFixed(2)}</span>
                  </div>
                  {report.totalPaidToAgents > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paid to Agents</span>
                    <span className="font-semibold text-red-600">-{sym}{report.totalPaidToAgents.toFixed(2)}</span>
                  </div>
                  )}
                  {(report.totalAccountCredits||0) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Account Credits (Cash to Accountant)</span>
                    <span className="font-semibold text-indigo-600">-{sym}{(report.totalAccountCredits||0).toFixed(2)}</span>
                  </div>
                  )}
                  <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Earnings (timesheets)</span>
                  <span className="font-semibold text-red-600">-{sym}{report.totalEarned.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Approved Expenses</span>
                  <span className="font-semibold text-red-600">-{sym}{report.totalExpenses.toFixed(2)}</span>
                  </div>
                  {report.previousPayments > 0 && (
                  <div className="flex justify-between text-sm border-t border-dashed border-gray-300 pt-2">
                    <span className="text-gray-600">Previously Settled</span>
                    <span className="font-semibold text-blue-600">-{sym}{report.previousPayments.toFixed(2)}</span>
                  </div>
                  )}
                  {report.previousBonuses > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bonuses / Sick Pay</span>
                    <span className="font-semibold text-red-600">-{sym}{report.previousBonuses.toFixed(2)}</span>
                  </div>
                  )}
                  {report.previousPenalties > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Penalties / Advances</span>
                    <span className="font-semibold text-green-600">+{sym}{report.previousPenalties.toFixed(2)}</span>
                  </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t-2 border-gray-300 pt-3 mt-2">
                  <span className="text-gray-800">
                    {report.balance > 0 ? 'Employee Owes Company' : report.balance < 0 ? 'Company Owes Employee' : 'Balance Clear'}
                  </span>
                  <span className={report.balance > 0 ? 'text-red-700' : report.balance < 0 ? 'text-green-700' : 'text-gray-500'}>
                    {report.balance > 0 ? '+' : ''}{sym}{Math.abs(report.balance).toFixed(2)}
                  </span>
                  </div>
                  </div>

                  {report.balance !== 0 && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Settle Balance</p>
                  <div className="flex gap-3 items-end flex-wrap mb-2">
                    <div>
                    <label className="block text-xs text-gray-500 mb-1">Amount to Settle ({sym})</label>
                    <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    max={Math.abs(report.balance).toFixed(2)}
                    value={settleAmount}
                    onChange={function(e){setSettleAmount(e.target.value);}}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold"
                    />
                    </div>
                    <div className="flex-1 min-w-48">
                    <label className="block text-xs text-gray-500 mb-1">Settlement Note (optional)</label>
                    <input value={settleNote} onChange={function(e){setSettleNote(e.target.value);}} placeholder="e.g. Cash collected on 06/05/2026" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <button onClick={handleSettle} disabled={settling || !settleAmount || parseFloat(settleAmount) <= 0} className={'px-5 py-2 rounded-lg font-bold text-sm transition whitespace-nowrap ' + (settling || !settleAmount || parseFloat(settleAmount) <= 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : report.balance > 0 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-green-600 text-white hover:bg-green-700')}>
                    {settling ? 'Processing...' : report.balance > 0 ? 'Collect ' + sym + (parseFloat(settleAmount)||0).toFixed(2) : 'Pay ' + sym + (parseFloat(settleAmount)||0).toFixed(2)}
                    </button>
                  </div>
                  {settleAmount && parseFloat(settleAmount) > 0 && parseFloat(settleAmount) < Math.abs(report.balance) && (
                    <p className="text-xs text-amber-600 font-semibold mt-1">
                    Remaining balance after settlement: {sym}{(Math.abs(report.balance) - parseFloat(settleAmount)).toFixed(2)} — will carry forward to next period
                    </p>
                  )}
                  {settleAmount && parseFloat(settleAmount) >= Math.abs(report.balance) && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                    Full balance will be cleared
                    </p>
                  )}
                  </div>
                  )}
                  {report.balance === 0 && (
                  <div className="flex items-center gap-2 text-green-700 font-semibold mt-2">
                  <span className="text-2xl">✓</span> All accounts balanced
                  </div>
                  )}
                  </div>
                  </div>
                  )}
                  </div>
                  </div>
                );
            };

            const CompanyAccounting = ({ onClose, visibleEmployees: visEmp, persistedState, onStateChange }) => {
                const today = new Date().toISOString().split('T')[0];
                const mk = (k) => (v) => onStateChange && onStateChange(function(s){return{...s,[k]:typeof v==='function'?v(s[k]):v};});
                const adjAmountRef = React.useRef(null);
                const adjHoursRef = React.useRef(null);
                const adjReasonRef = React.useRef(null);
                const fromDate = persistedState ? persistedState.fromDate : today.slice(0,8)+'01'; const setFromDate = mk('fromDate');
                const toDate = persistedState ? persistedState.toDate : today; const setToDate = mk('toDate');
                const branchFilter = persistedState ? persistedState.branchFilter : ''; const setBranchFilter = mk('branchFilter');
                const countryFilter = persistedState ? persistedState.countryFilter : ''; const setCountryFilter = mk('countryFilter');
                const report = persistedState ? persistedState.report : null; const setReport = mk('report');
                const collapsed = persistedState ? persistedState.collapsed : {collections:false,payroll:false,expenses:false,summary:false};
                const setCollapsed = mk('collapsed');
                const toggleSection = function(key) { setCollapsed(function(prev) { return Object.assign({}, prev, {[key]: !prev[key]}); }); };

                const countryList = [...new Set(visEmp.filter(function(e) { return !e.isAdmin && e.country; }).map(function(e) { return e.country; }))].sort();

                const handleAddCredit = async function() {
                  const amt = parseFloat(creditAmt);
                  if (!creditEmpId) { alert('Please select an employee'); return; }
                  if (!amt || amt <= 0) { alert('Please enter a valid amount'); return; }
                  setCreditSaving(true);
                  try {
                   await apiCall(API_ENDPOINTS.adjustments, { method: 'POST', body: JSON.stringify({ employeeId: parseInt(creditEmpId), type: 'account_credit', amount: amt, reason: creditNote || 'Account credit', date: creditDate }) });
                   await loadAdjustmentsFromAPI();
                   setCreditEmpId(''); setCreditAmt(''); setCreditNote(''); setAddingCredit(false);
                  } catch(e) { alert('Failed: ' + e.message); }
                  setCreditSaving(false);
                };
                const handleDeleteCredit = async function(a) {
                  if (!window.confirm('Delete credit of £' + parseFloat(a.amount).toFixed(2) + ' for ' + a.employeeName + '?')) return;
                  try { await apiCall(API_ENDPOINTS.adjustments + '/' + a.id, { method: 'DELETE' }); await loadAdjustmentsFromAPI(); }
                  catch(e) { alert('Failed: ' + e.message); }
                };

                const filteredEmp = visEmp.filter(function(e) {
                  if (e.isAdmin) return false;
                  if (branchFilter && !(e.branches||[]).includes(branchFilter)) return false;
                  if (countryFilter && e.country !== countryFilter) return false;
                  return true;
                });

                const generateReport = function() {
                  const cols = agentCollections.filter(function(c) {
                  return filteredEmp.some(function(e) { return e.id === c.employeeId; }) && c.date >= fromDate && c.date <= toDate;
                  });
                  const totalCashCollected = cols.reduce(function(s,c) { return s + c.amountCollected; }, 0);
                  const totalBankCollected = cols.reduce(function(s,c) { return s + (c.bankAmount||0); }, 0);
                  const totalPaidToAgents = cols.reduce(function(s,c) { return s + c.amountPaid; }, 0);
                  const totalCollections = totalCashCollected + totalBankCollected;
                  const netCollections = totalCollections - totalPaidToAgents;

                  const exps = expenses.filter(function(e) {
                  return filteredEmp.some(function(v) { return v.id === e.employeeId; }) && (e.status === 'approved' || e.status === 'paid') && e.date >= fromDate && e.date <= toDate;
                  });
                  const totalExpenses = exps.reduce(function(s,e) { return s + e.amount; }, 0);

                  const empPayroll = [];
                  filteredEmp.forEach(function(emp) {
                  const empTs = timesheets.filter(function(ts) {
                  return ts.employeeId === emp.id && ts.status === 'approved' && ts.date >= fromDate && ts.date <= toDate;
                  });
                  if (empTs.length === 0) return;
                  const rate = parseFloat(emp.hourlyRate) || 0;
                  const otMult = (emp.overtimeRate != null && emp.overtimeRate !== '') ? parseFloat(emp.overtimeRate) : (payrollSettings.overtimeMultiplier || 1.5);
                  let pay = 0;
                  empTs.forEach(function(ts) {
                  pay += (parseFloat(ts.regularHours)||0) * rate + (parseFloat(ts.overtimeHours)||0) * rate * otMult;
                  });
                  if (pay > 0) empPayroll.push({ name: emp.firstName + ' ' + emp.lastName, code: emp.employeeId, currency: getCurrencySymbol(emp.currency), pay: pay });
                  });
                  const totalPayroll = empPayroll.reduce(function(s,e) { return s + e.pay; }, 0);

                  const byAgent = {};
                  cols.forEach(function(c) {
                  const key = c.agentCode + '|' + c.agentCity;
                  if (!byAgent[key]) byAgent[key] = { code: c.agentCode, city: c.agentCity, cash: 0, bank: 0, paid: 0, count: 0 };
                  byAgent[key].cash += c.amountCollected;
                  byAgent[key].bank += (c.bankAmount||0);
                  byAgent[key].paid += c.amountPaid;
                  byAgent[key].count++;
                  });

                  const margin = netCollections - totalExpenses - totalPayroll;

                  setReport({ totalCashCollected, totalBankCollected, totalCollections, totalPaidToAgents, netCollections, totalExpenses, totalPayroll, empPayroll, margin, byAgent: Object.values(byAgent), exps, periodStart: fromDate, periodEnd: toDate });
                };

                const exportCSV = function() {
                  if (!report) return;
                  let csv = 'COMPANY ACCOUNTING REPORT\n';
                  csv += 'Period,' + report.periodStart + ' to ' + report.periodEnd + '\n\n';
                  csv += 'COLLECTIONS\n';
                  csv += 'Cash Collected,' + report.totalCashCollected.toFixed(2) + '\n';
                  csv += 'Bank Transfers,' + report.totalBankCollected.toFixed(2) + '\n';
                  csv += 'Paid to Agents,-' + report.totalPaidToAgents.toFixed(2) + '\n';
                  csv += 'Net Collections,' + report.netCollections.toFixed(2) + '\n\n';
                  csv += 'PAYROLL\n';
                  report.empPayroll.forEach(function(e) { csv += '"'+e.name+'",'+e.pay.toFixed(2)+'\n'; });
                  csv += 'Total Payroll,-' + report.totalPayroll.toFixed(2) + '\n\n';
                  csv += 'EXPENSES\n';
                  csv += 'Total Expenses,-' + report.totalExpenses.toFixed(2) + '\n\n';
                  csv += 'NET MARGIN,' + report.margin.toFixed(2) + '\n';
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = 'company_accounting_' + fromDate + '_' + toDate + '.csv'; a.click();
                };

                const printReport = function() {
                  if (!report) return;
                  const marginColor = report.margin >= 0 ? '#16a34a' : '#dc2626';
                  const agentRows = report.byAgent.map(function(a) {
                  return '<tr><td>'+a.code+'</td><td>'+a.city+'</td><td>'+a.count+'</td><td>£'+a.cash.toFixed(2)+'</td><td>'+(a.bank>0?'£'+a.bank.toFixed(2):'—')+'</td><td>'+(a.paid>0?'-£'+a.paid.toFixed(2):'—')+'</td><td><b>£'+(a.cash+a.bank-a.paid).toFixed(2)+'</b></td></tr>';
                  }).join('');
                  const payRows = report.empPayroll.map(function(e) {
                  return '<tr><td>'+e.name+'</td><td>'+e.code+'</td><td><b>'+e.currency+e.pay.toFixed(2)+'</b></td></tr>';
                  }).join('');
                  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Company Accounting</title>'
                  +'<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Arial,sans-serif;font-size:11px;padding:20px;color:#1f2937;}h1{font-size:18px;color:#4338ca;margin-bottom:2px;}.sub{color:#6b7280;font-size:11px;margin-bottom:16px;}.sec{margin-bottom:16px;}.sec-title{font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;color:#374151;padding-bottom:3px;border-bottom:2px solid #e5e7eb;margin-bottom:6px;display:flex;justify-content:space-between;}table{width:100%;border-collapse:collapse;font-size:10px;margin-bottom:4px;}th{background:#f9fafb;text-align:left;padding:4px 6px;font-size:9px;text-transform:uppercase;color:#6b7280;border-bottom:1px solid #e5e7eb;}td{padding:4px 6px;border-bottom:1px solid #f3f4f6;}.sum{background:#f0fdf4;border:2px solid #bbf7d0;border-radius:6px;padding:12px;margin-top:12px;}.srow{display:flex;justify-content:space-between;padding:2px 0;font-size:11px;}.stotal{display:flex;justify-content:space-between;padding-top:8px;margin-top:6px;border-top:2px solid #e5e7eb;font-size:15px;font-weight:bold;}.footer{margin-top:20px;text-align:center;font-size:9px;color:#9ca3af;}@page{size:A4 portrait;margin:10mm;}@media print{body{padding:8px;}}</style>'
                  +'</head><body>'
                  +'<h1>Company Accounting Report</h1>'
                  +'<div class="sub">Period: '+new Date(report.periodStart).toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'})+' — '+new Date(report.periodEnd).toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'})+'</div>'
                  +'<div class="sec"><div class="sec-title"><span>Agent Collections</span><span>Net: £'+report.netCollections.toFixed(2)+'</span></div>'
                  +'<table><thead><tr><th>Code</th><th>City</th><th>Records</th><th>Cash</th><th>Bank</th><th>Paid to Agent</th><th>Net</th></tr></thead><tbody>'+agentRows
                  +'<tr style="background:#f0fdf4;font-weight:bold;"><td colspan="3" style="text-align:right;">TOTAL</td><td>£'+report.totalCashCollected.toFixed(2)+'</td><td>£'+report.totalBankCollected.toFixed(2)+'</td><td>-£'+report.totalPaidToAgents.toFixed(2)+'</td><td>£'+report.netCollections.toFixed(2)+'</td></tr>'
                  +'</tbody></table></div>'
                  +'<div class="sec"><div class="sec-title"><span>Employee Payroll</span><span>Total: £'+report.totalPayroll.toFixed(2)+'</span></div>'
                  +'<table><thead><tr><th>Employee</th><th>ID</th><th>Pay</th></tr></thead><tbody>'+payRows
                  +'<tr style="background:#eff6ff;font-weight:bold;"><td colspan="2" style="text-align:right;">TOTAL PAYROLL</td><td>£'+report.totalPayroll.toFixed(2)+'</td></tr>'
                  +'</tbody></table></div>'
                  +'<div class="sec"><div class="sec-title"><span>Approved Expenses</span><span>Total: £'+report.totalExpenses.toFixed(2)+'</span></div>'
                  +'<table><thead><tr><th>Date</th><th>Employee</th><th>Category</th><th>Description</th><th>Amount</th></tr></thead><tbody>'
                  +report.exps.map(function(e){return '<tr><td>'+new Date(e.date).toLocaleDateString('en-GB')+'</td><td>'+e.employeeName+'</td><td>'+e.category+'</td><td>'+(e.description||'')+'</td><td>£'+e.amount.toFixed(2)+'</td></tr>';}).join('')
                  +'<tr style="background:#f0fdfa;font-weight:bold;"><td colspan="4" style="text-align:right;">TOTAL EXPENSES</td><td>£'+report.totalExpenses.toFixed(2)+'</td></tr>'
                  +'</tbody></table></div>'
                  +'<div class="sum"><div style="font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;color:#374151;margin-bottom:8px;">Profit & Loss Summary</div>'
                  +'<div class="srow"><span>Net Agent Collections</span><span style="color:#16a34a;font-weight:600;">+£'+report.netCollections.toFixed(2)+'</span></div>'
                  +'<div class="srow"><span>Total Payroll</span><span style="color:#dc2626;font-weight:600;">-£'+report.totalPayroll.toFixed(2)+'</span></div>'
                  +'<div class="srow"><span>Total Expenses</span><span style="color:#dc2626;font-weight:600;">-£'+report.totalExpenses.toFixed(2)+'</span></div>'
                  +'<div class="stotal"><span style="color:'+marginColor+';">'+(report.margin>=0?'Net Profit':'Net Loss')+'</span><span style="color:'+marginColor+';">'+(report.margin>=0?'+':'')+'£'+report.margin.toFixed(2)+'</span></div>'
                  +'</div>'
                  +'<div class="footer">B-Post Employee Management System &nbsp;·&nbsp; Generated '+new Date().toLocaleString('en-GB')+'</div>'
                  +'</body></html>';
                  const w = window.open('','_blank','width=860,height=1100');
                  if (!w) { alert('Please allow pop-ups to use the print feature.'); return; }
                  w.document.write(html);
                  w.document.close();
                  w.focus();
                  setTimeout(function() { w.print(); }, 500);
                };

                const sym = '£';

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                  <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-t-2xl px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-7 h-7 text-white" />
                    <h2 className="text-xl font-bold text-white">Company Accounting</h2>
                  </div>
                  <button onClick={onClose} className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition">
                    <X className="w-4 h-4" />Close
                  </button>
                  </div>

                  <div className="p-6 border-b border-gray-200 flex flex-wrap gap-3 items-end">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label>
                    <input type="date" value={fromDate} onChange={function(e){setFromDate(e.target.value);setReport(null);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">End Date</label>
                    <input type="date" value={toDate} onChange={function(e){setToDate(e.target.value);setReport(null);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  {branchList.length > 0 && (
                    <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Branch</label>
                    <select value={branchFilter} onChange={function(e){setBranchFilter(e.target.value);setReport(null);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                    <option value="">All Branches</option>
                    {branchList.map(function(b){return <option key={b} value={b}>{b}</option>;})}
                    </select>
                    </div>
                  )}
                  {countryList.length > 0 && (
                    <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Country</label>
                    <select value={countryFilter} onChange={function(e){setCountryFilter(e.target.value);setReport(null);}} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                    <option value="">All Countries</option>
                    {countryList.map(function(c){return <option key={c} value={c}>{c}</option>;})}
                    </select>
                    </div>
                  )}
                  <button onClick={generateReport} className="bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-800 transition text-sm">Generate Report</button>
                  {report && <button onClick={exportCSV} className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm">Export CSV</button>}
                  {report && <button onClick={printReport} className="bg-gray-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/></svg>
                    Print / PDF
                  </button>}
                  </div>

                  {!report ? (
                  <div className="text-center py-16 text-gray-400">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Select a date range and click Generate Report</p>
                  </div>
                  ) : (
                  <div className="p-6 space-y-6">

                    {/* Summary tiles */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-xs text-green-600 font-semibold uppercase">Cash Collected</p>
                    <p className="text-xl font-bold text-green-700 mt-1">{sym}{report.totalCashCollected.toFixed(2)}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="text-xs text-blue-600 font-semibold uppercase">Bank Transfer</p>
                    <p className="text-xl font-bold text-blue-700 mt-1">{sym}{report.totalBankCollected.toFixed(2)}</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                    <p className="text-xs text-red-600 font-semibold uppercase">Payroll + Expenses</p>
                    <p className="text-xl font-bold text-red-700 mt-1">{sym}{(report.totalPayroll + report.totalExpenses).toFixed(2)}</p>
                    </div>
                    <div className={'border-2 rounded-xl p-4 text-center ' + (report.margin >= 0 ? 'bg-emerald-50 border-emerald-400' : 'bg-red-50 border-red-400')}>
                    <p className={'text-xs font-bold uppercase ' + (report.margin >= 0 ? 'text-emerald-600' : 'text-red-600')}>{report.margin >= 0 ? 'Net Profit' : 'Net Loss'}</p>
                    <p className={'text-2xl font-bold mt-1 ' + (report.margin >= 0 ? 'text-emerald-700' : 'text-red-700')}>{report.margin >= 0 ? '+' : ''}{sym}{Math.abs(report.margin).toFixed(2)}</p>
                    </div>
                    </div>

                    {/* Agent Collections */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-green-50 cursor-pointer select-none" onClick={() => toggleSection('collections')}>
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>Agent Collections</h3>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-green-700">Net: {sym}{report.netCollections.toFixed(2)}</span>
                      <span className="text-gray-400 text-xs px-2 py-0.5 bg-white rounded border border-gray-200">{collapsed.collections ? '▼ Show' : '▲ Hide'}</span>
                    </div>
                    </div>
                    {!collapsed.collections && (
                    <table className="w-full text-sm">
                    <thead><tr className="bg-green-50 border-t border-gray-100">{['Agent','City','Records','Cash','Bank','Paid to Agent','Net'].map(function(h){return <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-green-700">{h}</th>;})}</tr></thead>
                    <tbody className="divide-y divide-gray-100">
                    {report.byAgent.map(function(a, i) {
                      return (
                      <tr key={i} className="hover:bg-green-50">
                      <td className="px-3 py-2"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">{a.code}</span></td>
                      <td className="px-3 py-2 text-gray-600">{a.city}</td>
                      <td className="px-3 py-2 text-gray-500">{a.count}</td>
                      <td className="px-3 py-2 font-semibold text-green-700">{sym}{a.cash.toFixed(2)}</td>
                      <td className="px-3 py-2 font-semibold text-blue-600">{a.bank > 0 ? sym+a.bank.toFixed(2) : '—'}</td>
                      <td className="px-3 py-2 text-red-500">{a.paid > 0 ? '-'+sym+a.paid.toFixed(2) : '—'}</td>
                      <td className="px-3 py-2 font-bold text-gray-800">{sym}{(a.cash+a.bank-a.paid).toFixed(2)}</td>
                      </tr>
                      );
                    })}
                    <tr className="bg-green-50 font-bold border-t-2 border-green-200">
                      <td colSpan="3" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Total</td>
                      <td className="px-3 py-2 text-green-700">{sym}{report.totalCashCollected.toFixed(2)}</td>
                      <td className="px-3 py-2 text-blue-600">{sym}{report.totalBankCollected.toFixed(2)}</td>
                      <td className="px-3 py-2 text-red-600">-{sym}{report.totalPaidToAgents.toFixed(2)}</td>
                      <td className="px-3 py-2 text-gray-800">{sym}{report.netCollections.toFixed(2)}</td>
                    </tr>
                    </tbody>
                    </table>
                    )}
                    </div>

                    {/* Payroll */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-blue-50 cursor-pointer select-none" onClick={() => toggleSection('payroll')}>
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Employee Payroll (Approved Timesheets)</h3>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-red-600">-{sym}{report.totalPayroll.toFixed(2)}</span>
                      <span className="text-gray-400 text-xs px-2 py-0.5 bg-white rounded border border-gray-200">{collapsed.payroll ? '▼ Show' : '▲ Hide'}</span>
                    </div>
                    </div>
                    {!collapsed.payroll && (
                    report.empPayroll.length === 0 ? <p className="text-gray-400 text-sm p-4">No approved timesheets in this period</p> : (
                    <table className="w-full text-sm">
                    <thead><tr className="bg-blue-50 border-t border-gray-100">{['Employee','ID','Earned'].map(function(h){return <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-blue-700">{h}</th>;})}</tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {report.empPayroll.map(function(e, i) {
                      return <tr key={i} className="hover:bg-blue-50"><td className="px-3 py-2 font-medium text-gray-800">{e.name}</td><td className="px-3 py-2 text-gray-500">{e.code}</td><td className="px-3 py-2 font-bold text-blue-700">{e.currency}{e.pay.toFixed(2)}</td></tr>;
                      })}
                      <tr className="bg-blue-50 font-bold border-t-2 border-blue-200">
                      <td colSpan="2" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Total Payroll</td>
                      <td className="px-3 py-2 text-red-600">-{sym}{report.totalPayroll.toFixed(2)}</td>
                      </tr>
                    </tbody>
                    </table>
                    )
                    )}
                    </div>

                    {/* Expenses */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-teal-50 cursor-pointer select-none" onClick={() => toggleSection('expenses')}>
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>Approved Expenses</h3>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-red-600">-{sym}{report.totalExpenses.toFixed(2)}</span>
                      <span className="text-gray-400 text-xs px-2 py-0.5 bg-white rounded border border-gray-200">{collapsed.expenses ? '▼ Show' : '▲ Hide'}</span>
                    </div>
                    </div>
                    {!collapsed.expenses && (
                    report.exps.length === 0 ? <p className="text-gray-400 text-sm p-4">No approved expenses in this period</p> : (
                    <table className="w-full text-sm">
                    <thead><tr className="bg-teal-50 border-t border-gray-100">{['Date','Employee','Category','Description','Amount'].map(function(h){return <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-teal-700">{h}</th>;})}</tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {report.exps.map(function(e) {
                      return <tr key={e.id} className="hover:bg-teal-50"><td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(e.date).toLocaleDateString('en-GB')}</td><td className="px-3 py-2 text-gray-700">{e.employeeName}</td><td className="px-3 py-2"><span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">{e.category}</span></td><td className="px-3 py-2 text-gray-600">{e.description||'—'}</td><td className="px-3 py-2 font-bold text-teal-700">{sym}{e.amount.toFixed(2)}</td></tr>;
                      })}
                      <tr className="bg-teal-50 font-bold border-t-2 border-teal-200">
                      <td colSpan="4" className="px-3 py-2 text-right text-gray-700 text-xs uppercase">Total Expenses</td>
                      <td className="px-3 py-2 text-red-600">-{sym}{report.totalExpenses.toFixed(2)}</td>
                      </tr>
                    </tbody>
                    </table>
                    )
                    )}
                    </div>

                    {/* P&L Summary */}
                    <div className={'rounded-2xl border-2 overflow-hidden ' + (report.margin >= 0 ? 'border-emerald-300' : 'border-red-300')}>
                    <div className={'flex items-center justify-between px-4 py-3 cursor-pointer select-none ' + (report.margin >= 0 ? 'bg-emerald-50' : 'bg-red-50')} onClick={() => toggleSection('summary')}>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Profit & Loss Summary</p>
                    <div className="flex items-center gap-3">
                      <span className={'text-lg font-bold ' + (report.margin >= 0 ? 'text-emerald-700' : 'text-red-700')}>{report.margin >= 0 ? '+' : ''}{sym}{Math.abs(report.margin).toFixed(2)}</span>
                      <span className="text-gray-400 text-xs px-2 py-0.5 bg-white rounded border border-gray-200">{collapsed.summary ? '▼ Show' : '▲ Hide'}</span>
                    </div>
                    </div>
                    {!collapsed.summary && (
                    <div className={'p-6 ' + (report.margin >= 0 ? 'bg-emerald-50' : 'bg-red-50')}>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm"><span className="text-gray-600">Cash Collected</span><span className="font-semibold text-green-700">+{sym}{report.totalCashCollected.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-600">Bank Transfers</span><span className="font-semibold text-green-700">+{sym}{report.totalBankCollected.toFixed(2)}</span></div>
                      {report.totalPaidToAgents > 0 && <div className="flex justify-between text-sm"><span className="text-gray-600">Paid to Agents</span><span className="font-semibold text-red-600">-{sym}{report.totalPaidToAgents.toFixed(2)}</span></div>}
                      <div className="flex justify-between text-sm"><span className="text-gray-600">Total Payroll</span><span className="font-semibold text-red-600">-{sym}{report.totalPayroll.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-600">Total Expenses</span><span className="font-semibold text-red-600">-{sym}{report.totalExpenses.toFixed(2)}</span></div>
                      <div className={'flex justify-between font-bold text-xl border-t-2 border-gray-300 pt-3 mt-2 ' + (report.margin >= 0 ? 'text-emerald-700' : 'text-red-700')}>
                      <span>{report.margin >= 0 ? 'Net Profit' : 'Net Loss'}</span>
                      <span>{report.margin >= 0 ? '+' : ''}{sym}{Math.abs(report.margin).toFixed(2)}</span>
                      </div>
                    </div>
                    </div>
                    )}
                    </div>
                  </div>
                  )}
                  </div>
                  </div>
                );
            };

            const BranchManager = ({ onClose }) => {
                const [newBranch, setNewBranch] = useState('');
                const [editingIdx, setEditingIdx] = useState(null);
                const [editValue, setEditValue] = useState('');

                const addBranch = () => {
                  const name = newBranch.trim();
                  if (!name) {
                   alert('Please enter a branch name first');
                   return;
                  }
                  if (branchList.some(b => b.toLowerCase() === name.toLowerCase())) {
                   alert('A branch with this name already exists');
                   return;
                  }
                  setBranchList([...branchList, name].sort());
                  setNewBranch('');
                };

                const saveEdit = (idx) => {
                  const name = editValue.trim();
                  if (!name) return;
                  const oldName = branchList[idx];
                  if (branchList.some((b, i) => i !== idx && b.toLowerCase() === name.toLowerCase())) {
                   alert('A branch with this name already exists');
                   return;
                  }
                  const updated = [...branchList];
                  updated[idx] = name;
                  setBranchList(updated.sort());
                  setEditingIdx(null);
                  if (oldName !== name) {
                   alert(`Branch renamed from "${oldName}" to "${name}". Remember to reassign employees who had the old branch.`);
                  }
                };

                const deleteBranch = (branch) => {
                  const assignedCount = employees.filter(e => (e.branches || []).includes(branch)).length;
                  if (assignedCount > 0) {
                   if (!confirm(`${assignedCount} employee(s) are currently assigned to "${branch}". Removing this branch will not unassign them automatically. Continue?`)) return;
                  } else if (!confirm(`Remove branch "${branch}"?`)) return;
                  setBranchList(branchList.filter(b => b !== branch));
                };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl">
                   <div className="flex items-center gap-3">
                  <Building className="w-7 h-7 text-white" />
                  <h2 className="text-xl font-bold text-white">Branch Management</h2>
                   </div>
                   <button onClick={onClose} className="text-blue-200 hover:text-white text-2xl font-bold">✕</button>
                  </div>
                  <div className="p-6">
                   <p className="text-sm text-gray-600 mb-4">Branches organise employees into operational units. Restricted admins can be limited to seeing only employees from specific branches.</p>

                   <div className="flex gap-2 mb-6">
                  <input
                   type="text"
                   value={newBranch}
                   onChange={e => setNewBranch(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && addBranch()}
                   placeholder="e.g. London HQ, Manchester, Baghdad"
                   className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button onClick={addBranch} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm whitespace-nowrap">
                   + Add Branch
                  </button>
                   </div>

                   {branchList.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                   <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                   <p className="text-gray-500 text-sm">No branches defined yet</p>
                   <p className="text-gray-400 text-xs mt-1">Add your first branch above to get started</p>
                  </div>
                   ) : (
                  <div className="space-y-2">
                   <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 pb-1">
                  {branchList.length} Branch{branchList.length !== 1 ? 'es' : ''}
                   </div>
                   {branchList.map((branch, idx) => {
                  const assignedCount = employees.filter(e => (e.branches || []).includes(branch)).length;
                  return (
                   <div key={idx} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:bg-blue-50 transition">
                  <Building className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  {editingIdx === idx ? (
                   <>
                  <input
                   type="text"
                   value={editValue}
                   onChange={e => setEditValue(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && saveEdit(idx)}
                   className="flex-1 px-3 py-1.5 border border-blue-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                   autoFocus
                  />
                  <button onClick={() => saveEdit(idx)} className="text-green-600 hover:text-green-700 font-bold text-lg">✓</button>
                  <button onClick={() => setEditingIdx(null)} className="text-red-400 hover:text-red-600 font-bold text-lg">✕</button>
                   </>
                  ) : (
                   <>
                  <span className="flex-1 font-medium text-gray-800">{branch}</span>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                   {assignedCount} employee{assignedCount !== 1 ? 's' : ''}
                  </span>
                  <button onClick={() => { setEditingIdx(idx); setEditValue(branch); }} className="text-blue-600 hover:text-blue-700 text-xs font-semibold px-2 py-1 rounded hover:bg-blue-100 transition">Edit</button>
                  <button onClick={() => deleteBranch(branch)} className="text-red-600 hover:text-red-700 text-xs font-semibold px-2 py-1 rounded hover:bg-red-100 transition">Delete</button>
                   </>
                  )}
                   </div>
                  );
                   })}
                  </div>
                   )}

                   <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <strong>💡 Tip:</strong> To assign employees to branches, open the Employees manager, edit any employee, and select their branches from the 🏢 Assigned Branches list.
                   </div>
                  </div>
                   </div>
                  </div>
                );
            };

            const VehicleManager = ({ onClose, visibleEmployees: visEmp }) => {
                const drivers = (visEmp || employees).filter(e => !e.isAdmin);
                const [activeTab, setActiveTab] = useState('list');
                const [editingVehicle, setEditingVehicle] = useState(null);
                const [saving, setSaving] = useState(false);
                const emptyForm = { plateNumber: '', mark: '', model: '', mileage: '', motExpiry: '', roadTaxExpiry: '', insuranceExpiry: '', assignedDriverId: '', lastServiceDate: '', nextServiceDate: '', notes: '' };
                const [form, setForm] = useState(emptyForm);
                const today = new Date();
                const getExpiryStatus = (dateStr) => {
                  if (!dateStr) return 'unknown';
                  const daysUntil = Math.floor((new Date(dateStr) - today) / (1000*60*60*24));
                  if (daysUntil < 0) return 'expired';
                  if (daysUntil <= 30) return 'warning';
                  return 'ok';
                };
                const statusBadge = (dateStr) => {
                  if (!dateStr) return <span className="text-gray-400 text-xs">—</span>;
                  const status = getExpiryStatus(dateStr);
                  const formatted = new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                  const colors = { ok: 'bg-green-100 text-green-700', warning: 'bg-amber-100 text-amber-700', expired: 'bg-red-100 text-red-700' };
                  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[status]}`}>{formatted}</span>;
                };
                const startEdit = (v) => {
                  setForm({ plateNumber: v.plateNumber, mark: v.mark, model: v.model, mileage: v.mileage||'', motExpiry: v.motExpiry||'', roadTaxExpiry: v.roadTaxExpiry||'', insuranceExpiry: v.insuranceExpiry||'', assignedDriverId: v.assignedDriverId||'', lastServiceDate: v.lastServiceDate||'', nextServiceDate: v.nextServiceDate||'', notes: v.notes||'' });
                  setEditingVehicle(v); setActiveTab('form');
                };
                const handleSave = async () => {
                  if (!form.plateNumber.trim()) { alert('Plate number is required'); return; }
                  setSaving(true);
                  try {
                   const payload = { ...form, mileage: parseInt(form.mileage)||0, assignedDriverId: form.assignedDriverId ? parseInt(form.assignedDriverId) : null, motExpiry: form.motExpiry||null, roadTaxExpiry: form.roadTaxExpiry||null, insuranceExpiry: form.insuranceExpiry||null, lastServiceDate: form.lastServiceDate||null, nextServiceDate: form.nextServiceDate||null };
                   const data = editingVehicle
                  ? await apiCall(`${API_ENDPOINTS.vehicles}/${editingVehicle.id}`, { method: 'PUT', body: JSON.stringify(payload) })
                  : await apiCall(API_ENDPOINTS.vehicles, { method: 'POST', body: JSON.stringify(payload) });
                   if (data.success) { await loadVehiclesFromAPI(); setActiveTab('list'); setForm(emptyForm); setEditingVehicle(null); alert(editingVehicle ? '✓ Vehicle updated' : '✓ Vehicle added'); }
                   else alert('Error: ' + (data.error || 'Unknown error'));
                  } catch(e) { alert('Failed: ' + e.message); }
                  setSaving(false);
                };
                const handleDelete = async (v) => {
                  if (!confirm(`Remove vehicle ${v.plateNumber}?`)) return;
                  try {
                   const data = await apiCall(`${API_ENDPOINTS.vehicles}/${v.id}`, { method: 'DELETE' });
                   if (data.success) { await loadVehiclesFromAPI(); } else alert('Error: ' + data.error);
                  } catch(e) { alert('Failed: ' + e.message); }
                };
                const fc = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";
                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-4">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-blue-900 rounded-t-2xl">
                   <div className="flex items-center gap-3"><Car className="w-7 h-7 text-white" /><h2 className="text-xl font-bold text-white">Vehicle Management</h2></div>
                   <button onClick={onClose} className="text-blue-200 hover:text-white text-2xl font-bold">✕</button>
                  </div>
                  <div className="flex border-b border-gray-200 px-6 pt-4 gap-4">
                   <button onClick={() => { setActiveTab('list'); setForm(emptyForm); setEditingVehicle(null); }} className={`pb-3 text-sm font-semibold border-b-2 transition ${activeTab==='list'?'border-blue-600 text-blue-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>Fleet Overview ({vehicles.length})</button>
                   <button onClick={() => { setForm(emptyForm); setEditingVehicle(null); setActiveTab('form'); }} className={`pb-3 text-sm font-semibold border-b-2 transition ${activeTab==='form'&&!editingVehicle?'border-blue-600 text-blue-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>+ Add Vehicle</button>
                  </div>
                  <div className="p-6">
                   {activeTab==='list' && (vehicles.length===0 ? (
                  <div className="text-center py-16"><Car className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No vehicles added yet</p><button onClick={()=>setActiveTab('form')} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm">Add First Vehicle</button></div>
                   ) : (
                  <div className="overflow-x-auto"><table className="w-full text-sm">
                   <thead className="bg-gray-50"><tr>{['Plate','Make / Model','Mileage','MOT Expiry','Road Tax','Insurance','Driver','Next Service','Actions'].map(h=><th key={h} className="px-3 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr></thead>
                   <tbody className="divide-y divide-gray-100">{vehicles.map(v=>(
                  <tr key={v.id} className="hover:bg-blue-50">
                   <td className="px-3 py-3 font-bold text-blue-800">{v.plateNumber}</td>
                   <td className="px-3 py-3"><div className="font-medium">{v.mark}</div><div className="text-xs text-gray-500">{v.model}</div></td>
                   <td className="px-3 py-3">{v.mileage?v.mileage.toLocaleString()+' mi':'—'}</td>
                   <td className="px-3 py-3">{statusBadge(v.motExpiry)}</td>
                   <td className="px-3 py-3">{statusBadge(v.roadTaxExpiry)}</td>
                   <td className="px-3 py-3">{statusBadge(v.insuranceExpiry)}</td>
                   <td className="px-3 py-3">{v.driverName?<div><div className="font-medium">{v.driverName}</div><div className="text-xs text-gray-500">{v.driverCode}</div></div>:<span className="text-gray-400 text-xs">Unassigned</span>}</td>
                   <td className="px-3 py-3">{statusBadge(v.nextServiceDate)}</td>
                   <td className="px-3 py-3"><div className="flex gap-2"><button onClick={()=>startEdit(v)} className="text-blue-600 text-xs font-semibold px-2 py-1 rounded bg-blue-50 hover:bg-blue-100">Edit</button><button onClick={()=>handleDelete(v)} className="text-red-600 text-xs font-semibold px-2 py-1 rounded bg-red-50 hover:bg-red-100">Remove</button></div></td>
                  </tr>
                   ))}</tbody>
                  </table></div>
                   ))}
                   {activeTab==='form' && (
                  <div>
                   <h3 className="text-lg font-bold text-gray-800 mb-5">{editingVehicle?`Edit — ${editingVehicle.plateNumber}`:'Register New Vehicle'}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Plate Number *</label><input value={form.plateNumber} onChange={e=>setForm({...form,plateNumber:e.target.value.toUpperCase()})} className={fc} placeholder="e.g. AB12 CDE" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Make (Brand)</label><input value={form.mark} onChange={e=>setForm({...form,mark:e.target.value})} className={fc} placeholder="e.g. Ford" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Model</label><input value={form.model} onChange={e=>setForm({...form,model:e.target.value})} className={fc} placeholder="e.g. Transit" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Current Mileage</label><input type="number" value={form.mileage} onChange={e=>setForm({...form,mileage:e.target.value})} className={fc} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Assigned Driver</label><select value={form.assignedDriverId} onChange={e=>setForm({...form,assignedDriverId:e.target.value})} className={fc}><option value="">— Unassigned —</option>{drivers.map(d=><option key={d.id} value={d.id}>{d.firstName} {d.lastName} ({d.employeeId})</option>)}</select></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">MOT Expiry</label><input type="date" value={form.motExpiry} onChange={e=>setForm({...form,motExpiry:e.target.value})} className={fc} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Road Tax Expiry</label><input type="date" value={form.roadTaxExpiry} onChange={e=>setForm({...form,roadTaxExpiry:e.target.value})} className={fc} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Insurance Expiry</label><input type="date" value={form.insuranceExpiry} onChange={e=>setForm({...form,insuranceExpiry:e.target.value})} className={fc} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Last Service</label><input type="date" value={form.lastServiceDate} onChange={e=>setForm({...form,lastServiceDate:e.target.value})} className={fc} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Next Service</label><input type="date" value={form.nextServiceDate} onChange={e=>setForm({...form,nextServiceDate:e.target.value})} className={fc} /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label><input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className={fc} /></div>
                   </div>
                   <div className="flex gap-3 mt-6">
                  <button onClick={handleSave} disabled={saving} className="bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition text-sm disabled:opacity-50">{saving?'Saving...':(editingVehicle?'Update Vehicle':'Register Vehicle')}</button>
                  <button onClick={()=>{setActiveTab('list');setForm(emptyForm);setEditingVehicle(null);}} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition text-sm">Cancel</button>
                   </div>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const ManualTimesheetEntry = ({ onClose, visibleEmployees: visEmp }) => {
                const filteredByCountry = (visEmp || employees).filter(e => !e.isAdmin);
                const [manualEntry, setManualEntry] = useState({
                  employeeId: '',
                  date: new Date().toISOString().split('T')[0],
                  startTime: '',
                  finishTime: '',
                  locationId: '',
                  notes: '',
                  autoApprove: true
                });

                const handleSubmitManualEntry = async () => {
                  if (!manualEntry.employeeId || !manualEntry.date || !manualEntry.startTime || !manualEntry.finishTime) {
                   alert('Please fill in all required fields');
                   return;
                  }

                  const employee = employees.find(e => e.id === parseInt(manualEntry.employeeId));
                  if (!employee) {
                   alert('Employee not found');
                   return;
                  }

                  try {
                   await handleManualTimesheetEntry(manualEntry.employeeId, manualEntry);
                   alert(`✓ Timesheet added successfully for ${employee?.firstName || ""} ${employee?.lastName || ""}`);
                   setManualEntry({
                  employeeId: '',
                  date: new Date().toISOString().split('T')[0],
                  startTime: '',
                  finishTime: '',
                  locationId: '',
                  notes: '',
                  autoApprove: true
                   });
                  } catch (error) {
                   alert('Failed to save timesheet: ' + error.message);
                  }
                };

                const selectedEmployee = manualEntry.employeeId
                  ? employees.find(e => e.id === parseInt(manualEntry.employeeId))
                  : null;

                const calculatedHours = manualEntry.startTime && manualEntry.finishTime
                  ? calculateHours(manualEntry.startTime, manualEntry.finishTime)
                  : { regular: 0, overtime: 0 };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <ClipboardList className="w-7 h-7 text-indigo-600" />
                  Manual Timesheet Entry
                   </h2>
                   <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                   </button>
                  </div>

                  <div className="p-6">
                   <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                  <p className="text-sm text-amber-900">
                   <strong>Administrator Override:</strong> You are manually adding hours for an employee. This entry will be marked as admin-added and does not require GPS verification.
                  </p>
                   </div>

                   <div className="space-y-6">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Select Employee *</label>
                   <select
                  value={manualEntry.employeeId}
                  onChange={(e) => setManualEntry({...manualEntry, employeeId: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   >
                  <option value="">-- Select Employee --</option>
                  {filteredByCountry.map(emp => (
                   <option key={emp.id} value={emp.id}>
                  {emp.employeeId} - {emp?.firstName || ""} {emp?.lastName || ""} ({emp.department})
                   </option>
                  ))}
                   </select>
                   {selectedEmployee && (
                  <div className="mt-2 text-sm text-gray-600">
                   <p><strong>Position:</strong> {selectedEmployee.position}</p>
                   <p><strong>Hourly Rate:</strong> {getCurrencySymbol(selectedEmployee.currency || 'GBP')}{selectedEmployee.hourlyRate.toFixed(2)}</p>
                  </div>
                   )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                   type="date"
                   value={manualEntry.date}
                   onChange={(e) => setManualEntry({...manualEntry, date: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location (Optional)</label>
                  <select
                   value={manualEntry.locationId}
                   onChange={(e) => setManualEntry({...manualEntry, locationId: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                   <option value="">-- Not Specified --</option>
                   {workLocations.filter(loc => loc.active).map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                   ))}
                  </select>
                   </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time *</label>
                  <input
                   type="time"
                   value={manualEntry.startTime}
                   onChange={(e) => setManualEntry({...manualEntry, startTime: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Finish Time *</label>
                  <input
                   type="time"
                   value={manualEntry.finishTime}
                   onChange={(e) => setManualEntry({...manualEntry, finishTime: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                   </div>
                  </div>

                  {calculatedHours.regular > 0 && (
                   <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                   <div>
                  <p className="text-sm text-gray-600">Regular Hours</p>
                  <p className="text-2xl font-bold text-blue-900">{calculatedHours.regular}</p>
                   </div>
                   <div>
                  <p className="text-sm text-gray-600">Overtime Hours</p>
                  <p className="text-2xl font-bold text-amber-900">{calculatedHours.overtime}</p>
                   </div>
                   <div>
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold text-indigo-900">
                   {(calculatedHours.regular + calculatedHours.overtime).toFixed(2)}
                  </p>
                   </div>
                  </div>
                  {selectedEmployee && (
                   <div className="mt-3 pt-3 border-t border-blue-300 text-center">
                  <p className="text-sm text-gray-600">Estimated Pay</p>
                  <p className="text-xl font-bold text-green-700">
                   {getCurrencySymbol(selectedEmployee.currency || 'GBP')}{(
                  (calculatedHours.regular * selectedEmployee.hourlyRate) +
                  (calculatedHours.overtime * selectedEmployee.hourlyRate * payrollSettings.overtimeMultiplier)
                   ).toFixed(2)}
                  </p>
                   </div>
                  )}
                   </div>
                  )}

                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                   <textarea
                  value={manualEntry.notes}
                  onChange={(e) => setManualEntry({...manualEntry, notes: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Reason for manual entry (e.g., System error, Forgot to clock in, etc.)"
                   />
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                   <label className="flex items-start gap-3 cursor-pointer">
                  <input
                   type="checkbox"
                   checked={manualEntry.autoApprove}
                   onChange={(e) => setManualEntry({...manualEntry, autoApprove: e.target.checked})}
                   className="w-5 h-5 text-indigo-600 rounded mt-0.5"
                  />
                  <div>
                   <span className="font-semibold text-gray-800 block">Auto-Approve Timesheet</span>
                   <span className="text-sm text-gray-600">
                  Automatically approve this entry instead of requiring manual approval
                   </span>
                  </div>
                   </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                   <button
                  onClick={handleSubmitManualEntry}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                   >
                  <CheckCircle className="w-5 h-5" />
                  Add Timesheet Entry
                   </button>
                   <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                   >
                  Cancel
                   </button>
                  </div>
                   </div>
                  </div>
                   </div>
                  </div>
                );
            };

            const AdminManager = ({ onClose }) => {
                const [activeTab, setActiveTab] = useState('list');
                const [newAdminData, setNewAdminData] = useState({
                  firstName: '',
                  lastName: '',
                  email: '',
                  department: 'Administration',
                  position: '',
                  password: '',
                  hourlyRate: '0'
                });
                const [newAdminPermissions, setNewAdminPermissions] = useState({
                  canManageEmployees: false,
                  canApproveTimesheets: false,
                  canManageLocations: false,
                  canSetRates: false,
                  canCreateAdmins: false,
                  canManageAdminPermissions: false,
                  canViewPayroll: false,
                  canDeleteEmployees: false,
                  canAddEmployeeHours: false,
                  canManageAgentCollections: false,
                  canManageAgents: false,
                  canViewCompanyAccounting: false,
                  canDeleteAgentCollections: false,
                  canViewCountryOnly: false,
                  canViewBranchOnly: false,
                  restrictedBranches: []
                });
                const [editingPermissions, setEditingPermissions] = useState(null);
                const [tempPermissions, setTempPermissions] = useState(null);

                const adminList = employees.filter(emp => emp.isAdmin);

                const handleCreateNewAdmin = async () => {
                  if (!newAdminData.firstName || !newAdminData.lastName || !newAdminData.email || !newAdminData.password) {
                   alert('Please fill in all required fields');
                   return;
                  }
                  if (employees.find(e => e.email === newAdminData.email)) {
                   alert('An account with this email already exists');
                   return;
                  }
                  await handleCreateAdmin(newAdminData, newAdminPermissions);
                  setNewAdminData({ firstName: '', lastName: '', email: '', department: 'Administration', position: '', password: '', hourlyRate: '0' });
                  setNewAdminPermissions({ canManageEmployees: false, canApproveTimesheets: false, canManageLocations: false, canSetRates: false, canCreateAdmins: false, canManageAdminPermissions: false, canViewPayroll: false, canDeleteEmployees: false, canAddEmployeeHours: false, canViewCountryOnly: false, canViewBranchOnly: false, canDeleteAgentCollections: false });
                  alert('Admin account created successfully!');
                  setActiveTab('list');
                };

                const startEditPermissions = (admin) => {
                  setEditingPermissions(admin.id);
                  setTempPermissions({...admin.adminPermissions});
                };

                const savePermissions = async (adminId) => {
                  if (tempPermissions.canViewCountryOnly && !tempPermissions.restrictedCountry) {
                   alert('Please select a country for the "Restrict to Own Country Only" permission before saving.');
                   return;
                  }
                  await handleUpdateAdminPermissions(adminId, tempPermissions);
                  setEditingPermissions(null);
                  setTempPermissions(null);
                  alert('Permissions updated successfully!');
                };

                const cancelEditPermissions = () => {
                  setEditingPermissions(null);
                  setTempPermissions(null);
                };

                const handleRemoveAdminStatus = async (adminId) => {
                  if (adminId === currentUser.id) {
                   alert('You cannot remove your own admin status');
                   return;
                  }
                  if (window.confirm('Are you sure you want to remove admin privileges from this user?')) {
                   await handleRemoveAdmin(adminId);
                   alert('Admin privileges removed');
                  }
                };

                const permissionLabels = {
                  canManageEmployees: 'Manage Employees',
                  canApproveTimesheets: 'Approve Timesheets',
                  canManageLocations: 'Manage Locations',
                  canSetRates: 'Set Hourly Rates',
                  canCreateAdmins: 'Create Admin Accounts',
                  canManageAdminPermissions: 'Manage Admin Permissions',
                  canViewPayroll: 'View Payroll Data',
                  canDeleteEmployees: 'Delete Employees',
                  canDeleteAgentCollections: 'Delete Agent Collections',
                  canAddEmployeeHours: 'Manually Add Employee Hours',
                  canManageAgentCollections: 'Edit Agent Collection Records',
                  canManageAgents: 'Manage Agents',
                  canViewCompanyAccounting: 'View Company Accounting',
                  canViewCountryOnly: 'Restrict to Own Country Only',
                  canViewBranchOnly: 'Restrict to Specific Branches'
                };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Shield className="w-7 h-7 text-indigo-600" />
                  Administrator Management
                   </h2>
                   <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                   </button>
                  </div>

                  <div className="p-6">
                   <div className="flex gap-4 mb-6">
                  <button
                   onClick={() => setActiveTab('list')}
                   className={`px-6 py-2 rounded-lg font-semibold transition ${
                  activeTab === 'list'
                   ? 'bg-indigo-600 text-white'
                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                   }`}
                  >
                   Admin List
                  </button>
                  {hasPermission('canCreateAdmins') && (
                   <button
                  onClick={() => setActiveTab('create')}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                   activeTab === 'create'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                   >
                  Create New Admin
                   </button>
                  )}
                   </div>

                   {activeTab === 'list' && (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                   {adminList.map(admin => (
                  <div key={admin.id} className="border border-gray-200 rounded-xl p-6">
                   <div className="flex justify-between items-start mb-4">
                  <div>
                   <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-bold text-gray-800">
                   {admin.firstName} {admin.lastName}
                  </h3>
                  {admin.id === currentUser.id && (
                   <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  YOU
                   </span>
                  )}
                   </div>
                   <p className="text-sm text-gray-600">{admin.email}</p>
                   <p className="text-sm text-gray-600">{admin.position} - {admin.department}</p>
                   <p className="text-sm text-gray-600 mt-1">ID: {admin.employeeId}</p>
                  </div>
                  {hasPermission('canManageAdminPermissions') && admin.id !== currentUser.id && (
                   <button
                  onClick={() => handleRemoveAdminStatus(admin.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-semibold"
                   >
                  Remove Admin
                   </button>
                  )}
                   </div>

                   <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-3">
                   <h4 className="font-semibold text-gray-800">Permissions</h4>
                   {hasPermission('canManageAdminPermissions') && editingPermissions !== admin.id && (
                  <button
                   onClick={() => startEditPermissions(admin)}
                   className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                  >
                   <Edit2 className="w-4 h-4" />
                   Edit Permissions
                  </button>
                   )}
                  </div>

                  {editingPermissions === admin.id ? (
                   <div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                   {Object.keys(permissionLabels).map(key => (
                  <label key={key} className="flex items-center gap-2 text-sm">
                   <input
                  type="checkbox"
                  checked={tempPermissions[key] || false}
                  onChange={(e) => setTempPermissions({
                   ...tempPermissions,
                   [key]: e.target.checked
                  })}
                  className="w-4 h-4 text-indigo-600 rounded"
                   />
                   <span className="text-gray-700">{permissionLabels[key]}</span>
                  </label>
                   ))}
                  </div>
                  {tempPermissions.canViewCountryOnly && (
                   <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <label className="block text-sm font-semibold text-amber-800 mb-2">🌍 Restricted Country</label>
                  <p className="text-xs text-amber-700 mb-2">This admin will only see employees assigned to this country.</p>
                  <select
                   value={tempPermissions.restrictedCountry || ''}
                   onChange={e => setTempPermissions({...tempPermissions, restrictedCountry: e.target.value})}
                   className="w-full px-3 py-2 border border-amber-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400"
                  >
                   <option value="">-- Select Country --</option>
                   {[...new Set(employees.filter(e => e.country).map(e => e.country))].sort().map(c => (
                  <option key={c} value={c}>{c}</option>
                   ))}
                  </select>
                  {!tempPermissions.restrictedCountry && (
                   <p className="text-xs text-red-600 mt-1">⚠️ You must select a country for this restriction to work.</p>
                  )}
                   </div>
                  )}
                  {tempPermissions.canViewBranchOnly && (
                   <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <label className="block text-sm font-semibold text-blue-800 mb-2">🏢 Restricted Branches</label>
                  <p className="text-xs text-blue-700 mb-2">This admin will only see employees assigned to the selected branches.</p>
                  {branchList.length === 0 ? (
                   <p className="text-xs text-red-600">No branches defined yet. Use the "Branches" button in the top nav to create branches first.</p>
                  ) : (
                   <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {branchList.map(b => (
                   <label key={b} className="flex items-center gap-2 text-sm text-blue-900">
                  <input type="checkbox"
                   checked={(tempPermissions.restrictedBranches || []).includes(b)}
                   onChange={e => {
                  const current = tempPermissions.restrictedBranches || [];
                  const updated = e.target.checked ? [...current, b] : current.filter(x => x !== b);
                  setTempPermissions({...tempPermissions, restrictedBranches: updated});
                   }}
                   className="w-4 h-4" />
                  {b}
                   </label>
                  ))}
                   </div>
                  )}
                  {(!tempPermissions.restrictedBranches || tempPermissions.restrictedBranches.length === 0) && branchList.length > 0 && (
                   <p className="text-xs text-red-600 mt-2">⚠️ Select at least one branch for this restriction to work.</p>
                  )}
                   </div>
                  )}
                  <div className="flex gap-2">
                   <button
                  onClick={() => savePermissions(admin.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                   >
                  Save Changes
                   </button>
                   <button
                  onClick={cancelEditPermissions}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-semibold"
                   >
                  Cancel
                   </button>
                  </div>
                   </div>
                  ) : (
                   <div>
                  <div className="grid grid-cols-2 gap-2">
                   {Object.keys(permissionLabels).map(key => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                   {admin.adminPermissions && admin.adminPermissions[key] ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                   ) : (
                  <XCircle className="w-4 h-4 text-gray-300" />
                   )}
                   <span className={admin.adminPermissions && admin.adminPermissions[key] ? 'text-gray-800' : 'text-gray-400'}>
                  {permissionLabels[key]}
                   </span>
                  </div>
                   ))}
                  </div>
                  {admin.adminPermissions?.canViewCountryOnly && (
                   <div className="mt-2 flex items-center gap-2">
                  {admin.adminPermissions.restrictedCountry ? (
                   <span className="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-semibold">
                  🌍 Restricted to: {admin.adminPermissions.restrictedCountry}
                   </span>
                  ) : (
                   <span className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-lg text-xs font-semibold">
                  ⚠️ No country set — restriction inactive
                   </span>
                  )}
                   </div>
                  )}
                  {admin.adminPermissions?.canViewBranchOnly && (
                   <div className="mt-2 flex items-center gap-2 flex-wrap">
                  {(admin.adminPermissions.restrictedBranches || []).length > 0 ? (
                   (admin.adminPermissions.restrictedBranches || []).map(b => (
                  <span key={b} className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-300 rounded-lg text-xs font-semibold">
                   🏢 {b}
                  </span>
                   ))
                  ) : (
                   <span className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-lg text-xs font-semibold">
                  ⚠️ No branches set — restriction inactive
                   </span>
                  )}
                   </div>
                  )}
                   </div>
                  )}
                   </div>
                  </div>
                   ))}
                  </div>
                   )}

                   {activeTab === 'create' && (
                  <div className="space-y-6">
                   <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                   <strong>Create Administrator Account:</strong> New admin will have login access and permissions based on your configuration below.
                  </p>
                   </div>

                   <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Account Information</h3>

                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input
                   type="text"
                   value={newAdminData.firstName}
                   onChange={(e) => setNewAdminData({...newAdminData, firstName: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="John"
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                  <input
                   type="text"
                   value={newAdminData.lastName}
                   onChange={(e) => setNewAdminData({...newAdminData, lastName: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="Doe"
                  />
                   </div>
                  </div>

                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                   <input
                  type="email"
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="admin@company.com"
                   />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position *</label>
                  <input
                   type="text"
                   value={newAdminData.position}
                   onChange={(e) => setNewAdminData({...newAdminData, position: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="HR Manager"
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                   value={newAdminData.department}
                   onChange={(e) => setNewAdminData({...newAdminData, department: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                   <option value="Administration">Administration</option>
                   <option value="Human Resources">Human Resources</option>
                   <option value="Operations">Operations</option>
                   <option value="Finance">Finance</option>
                   <option value="Management">Management</option>
                  </select>
                   </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                  <input
                   type="password"
                   value={newAdminData.password}
                   onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="Minimum 6 characters"
                   minLength={6}
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate (£)</label>
                  <input
                   type="number"
                   step="0.01"
                   value={newAdminData.hourlyRate}
                   onChange={(e) => setNewAdminData({...newAdminData, hourlyRate: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   placeholder="0.00"
                  />
                   </div>
                  </div>
                   </div>

                   <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Administrator Permissions</h3>
                  <div className="grid grid-cols-2 gap-4">
                   {Object.keys(permissionLabels).map(key => (
                  <label key={key} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                   <input
                  type="checkbox"
                  checked={newAdminPermissions[key] || false}
                  onChange={(e) => setNewAdminPermissions({
                   ...newAdminPermissions,
                   [key]: e.target.checked
                  })}
                  className="w-5 h-5 text-indigo-600 rounded mt-0.5"
                   />
                   <div>
                  <span className="font-semibold text-gray-800 block">{permissionLabels[key]}</span>
                   </div>
                  </label>
                   ))}
                  </div>
                   </div>

                   <div className="flex gap-4 pt-4">
                  <button
                   onClick={handleCreateNewAdmin}
                   className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                   <Shield className="w-5 h-5" />
                   Create Administrator Account
                  </button>
                  <button
                   onClick={() => setActiveTab('list')}
                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                   Cancel
                  </button>
                   </div>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const ManualHoursEntry = ({ onClose }) => {
                const regularEmployees = employees.filter(emp => !emp.isAdmin);
                const selectedEmployee = manualEntryData.employeeId
                  ? employees.find(emp => emp.id === parseInt(manualEntryData.employeeId))
                  : null;

                const hoursCalculation = manualEntryData.startTime && manualEntryData.finishTime
                  ? calculateHours(manualEntryData.startTime, manualEntryData.finishTime)
                  : { regular: 0, overtime: 0 };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <ClipboardEdit className="w-7 h-7 text-indigo-600" />
                  Manual Timesheet Entry
                   </h2>
                   <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                   </button>
                  </div>

                  <div className="p-6">
                   <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                  <p className="text-sm text-amber-900">
                   <strong>Administrator Override:</strong> Manually add timesheet entries for employees. This bypasses GPS verification requirements.
                  </p>
                   </div>

                   <div className="space-y-6">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Select Employee *</label>
                   <select
                  value={manualEntryData.employeeId}
                  onChange={(e) => setManualEntryData({...manualEntryData, employeeId: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                   >
                  <option value="">Choose an employee...</option>
                  {regularEmployees.map(emp => (
                   <option key={emp.id} value={emp.id}>
                  {emp?.firstName || ""} {emp?.lastName || ""} ({emp.employeeId}) - {emp.department}
                   </option>
                  ))}
                   </select>
                   {selectedEmployee && (
                  <p className="text-sm text-gray-600 mt-2">
                   Position: {selectedEmployee.position} | Rate: {getCurrencySymbol(selectedEmployee.currency || 'GBP')}{selectedEmployee.hourlyRate.toFixed(2)}/hr
                  </p>
                   )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                   type="date"
                   value={manualEntryData.date}
                   onChange={(e) => setManualEntryData({...manualEntryData, date: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   required
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <select
                   value={manualEntryData.locationId}
                   onChange={(e) => setManualEntryData({...manualEntryData, locationId: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                   <option value="">Not specified</option>
                   {workLocations.filter(loc => loc.active).map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                   ))}
                  </select>
                   </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time *</label>
                  <input
                   type="time"
                   value={manualEntryData.startTime}
                   onChange={(e) => setManualEntryData({...manualEntryData, startTime: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   required
                  />
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Finish Time *</label>
                  <input
                   type="time"
                   value={manualEntryData.finishTime}
                   onChange={(e) => setManualEntryData({...manualEntryData, finishTime: e.target.value})}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   required
                  />
                   </div>
                  </div>

                  {manualEntryData.startTime && manualEntryData.finishTime && (
                   <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                   <div>
                  <p className="text-sm text-indigo-700 font-semibold">Regular Hours</p>
                  <p className="text-2xl font-bold text-indigo-900">{hoursCalculation.regular}</p>
                   </div>
                   <div>
                  <p className="text-sm text-indigo-700 font-semibold">Overtime Hours</p>
                  <p className="text-2xl font-bold text-indigo-900">{hoursCalculation.overtime}</p>
                   </div>
                   <div>
                  <p className="text-sm text-indigo-700 font-semibold">Total Hours</p>
                  <p className="text-2xl font-bold text-indigo-900">
                   {(hoursCalculation.regular + hoursCalculation.overtime).toFixed(2)}
                  </p>
                   </div>
                  </div>
                  {selectedEmployee && (
                   <div className="mt-3 pt-3 border-t border-indigo-200">
                  <p className="text-sm text-indigo-900 text-center">
                   <strong>Estimated Pay:</strong> {getCurrencySymbol(selectedEmployee.currency || 'GBP')}{(
                  (hoursCalculation.regular * selectedEmployee.hourlyRate) +
                  (hoursCalculation.overtime * selectedEmployee.hourlyRate * payrollSettings.overtimeMultiplier)
                   ).toFixed(2)}
                  </p>
                   </div>
                  )}
                   </div>
                  )}

                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                   <select
                  value={manualEntryData.status}
                  onChange={(e) => setManualEntryData({...manualEntryData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                   >
                  <option value="approved">Approved (Pre-approved)</option>
                  <option value="pending">Pending (Requires approval)</option>
                   </select>
                  </div>

                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                   <textarea
                  value={manualEntryData.notes}
                  onChange={(e) => setManualEntryData({...manualEntryData, notes: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Reason for manual entry, special circumstances, etc."
                   />
                  </div>

                  <div className="flex gap-4 pt-4">
                   <button
                  onClick={handleSubmitManualEntry}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                   >
                  <CheckCircle className="w-5 h-5" />
                  Add Timesheet Entry
                   </button>
                   <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                   >
                  Cancel
                   </button>
                  </div>
                   </div>
                  </div>
                   </div>
                  </div>
                );
            };

            const LocationManager = ({ onClose, visibleEmployees: visEmp }) => {
                const filteredLocations = workLocations;
                const [activeTab, setActiveTab] = useState('list');
                const [newLocation, setNewLocation] = useState({
                  name: '',
                  address: '',
                  latitude: '',
                  longitude: '',
                  radius: 100
                });
                const [map, setMap] = useState(null);
                const [marker, setMarker] = useState(null);
                const [circle, setCircle] = useState(null);

                useEffect(() => {
                  if (activeTab === 'add' && !map) {

                   setTimeout(() => {
                  const mapContainer = document.getElementById('location-map');
                  if (mapContainer && !mapContainer._leaflet_id) {

                   const defaultLat = newLocation.latitude || 51.5074;
                   const defaultLng = newLocation.longitude || -0.1278;

                   const newMap = window.L.map('location-map').setView([defaultLat, defaultLng], 13);

                   window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '© OpenStreetMap contributors',
                  maxZoom: 19
                   }).addTo(newMap);

                   newMap.on('click', (e) => {
                  const { lat, lng } = e.latlng;
                  setNewLocation(prevLocation => ({
                   ...prevLocation,
                   latitude: lat.toFixed(6),
                   longitude: lng.toFixed(6)
                  }));
                   });

                   setMap(newMap);
                  }
                   }, 100);
                  }

                  return () => {
                   if (map && activeTab !== 'add') {
                  map.remove();
                  setMap(null);
                  setMarker(null);
                  setCircle(null);
                   }
                  };
                }, [activeTab]);

                useEffect(() => {
                  if (map && newLocation.latitude && newLocation.longitude) {
                   const lat = parseFloat(newLocation.latitude);
                   const lng = parseFloat(newLocation.longitude);
                   const radius = parseInt(newLocation.radius) || 100;

                   if (marker) marker.remove();
                   if (circle) circle.remove();

                   const newMarker = window.L.marker([lat, lng], {
                  draggable: true
                   }).addTo(map);

                   newMarker.bindPopup(`<b>${newLocation.name || 'New Location'}</b><br>Lat: ${lat}<br>Lng: ${lng}`).openPopup();

                   newMarker.on('dragend', (e) => {
                  const position = e.target.getLatLng();
                  setNewLocation({
                   ...newLocation,
                   latitude: position.lat.toFixed(6),
                   longitude: position.lng.toFixed(6)
                  });
                   });

                   const newCircle = window.L.circle([lat, lng], {
                  color: '#6366f1',
                  fillColor: '#818cf8',
                  fillOpacity: 0.2,
                  radius: radius
                   }).addTo(map);

                   setMarker(newMarker);
                   setCircle(newCircle);

                   map.setView([lat, lng], 15);
                  }
                }, [newLocation.latitude, newLocation.longitude, newLocation.radius, newLocation.name, map]);

                const handleAddLocationLocal = async () => {
                  if (!newLocation.name || !newLocation.latitude || !newLocation.longitude) {
                   alert('Please provide all required location details');
                   return;
                  }

                  const qrCode = `LOC-${newLocation.name.substring(0, 4).toUpperCase()}-${String(workLocations.length + 1).padStart(3, '0')}`;

                  try {
                   const data = await apiCall(API_ENDPOINTS.locations, {
                  method: 'POST',
                  body: JSON.stringify({
                   name: newLocation.name,
                   address: newLocation.address || '',
                   latitude: parseFloat(newLocation.latitude),
                   longitude: parseFloat(newLocation.longitude),
                   qrCode: qrCode,
                   radius: parseInt(newLocation.radius) || 100
                  }),
                   });

                   if (data.success) {
                  await loadLocationsFromAPI();
                  setNewLocation({ name: '', address: '', latitude: '', longitude: '', radius: 100 });
                  alert(`Location "${newLocation.name}" added successfully!\nQR Code: ${qrCode}`);

                  if (marker) marker.remove();
                  if (circle) circle.remove();
                  setMarker(null);
                  setCircle(null);
                   }
                  } catch (error) {
                   console.error('Failed to add location:', error);
                   alert('Failed to add location: ' + error.message);
                  }
                };

                const useMyLocation = () => {
                  if (!navigator.geolocation) {
                   alert('Geolocation is not supported by your browser');
                   return;
                  }

                  navigator.geolocation.getCurrentPosition(
                   (position) => {
                  setNewLocation(prev => ({
                   ...prev,
                   latitude: position.coords.latitude.toFixed(6),
                   longitude: position.coords.longitude.toFixed(6)
                  }));
                   },
                   (error) => {
                  alert('Unable to retrieve your location. Please enable location services.');
                   }
                  );
                };

                const searchAddress = async () => {
                  if (!newLocation.address) {
                   alert('Please enter an address to search');
                   return;
                  }

                  try {

                   const response = await fetch(
                  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(newLocation.address)}`
                   );
                   const data = await response.json();

                   if (data && data.length > 0) {
                  const result = data[0];
                  setNewLocation({
                   ...newLocation,
                   latitude: parseFloat(result.lat).toFixed(6),
                   longitude: parseFloat(result.lon).toFixed(6)
                  });
                   } else {
                  alert('Address not found. Please try a different search or click on the map.');
                   }
                  } catch (error) {
                   alert('Error searching for address. Please try again.');
                  }
                };

                return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8">
                  <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-7 h-7 text-indigo-600" />
                  Work Location Management
                   </h2>
                   <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                   </button>
                  </div>

                  <div className="p-6">
                   <div className="flex gap-4 mb-6">
                  <button
                   onClick={() => setActiveTab('list')}
                   className={`px-6 py-2 rounded-lg font-semibold transition ${
                  activeTab === 'list'
                   ? 'bg-indigo-600 text-white'
                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                   }`}
                  >
                   Location List
                  </button>
                  <button
                   onClick={() => setActiveTab('add')}
                   className={`px-6 py-2 rounded-lg font-semibold transition ${
                  activeTab === 'add'
                   ? 'bg-indigo-600 text-white'
                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                   }`}
                  >
                   Add New Location
                  </button>
                   </div>

                   {activeTab === 'list' && (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                   {filteredLocations.map(location => (
                  <div key={location.id} className="border border-gray-200 rounded-xl p-6">
                   <div className="flex justify-between items-start">
                  <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{location.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                   location.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                  }`}>
                   {location.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                   </div>
                   <p className="text-sm text-gray-600 mb-3">{location.address}</p>
                   <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                   <span className="text-gray-600">QR Code:</span>
                   <span className="font-mono font-semibold ml-2">{location.qrCode}</span>
                  </div>
                  <div>
                   <span className="text-gray-600">Radius:</span>
                   <span className="font-semibold ml-2">{location.radius}m</span>
                  </div>
                  <div>
                   <span className="text-gray-600">Coordinates:</span>
                   <span className="font-mono text-xs ml-2">{location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
                  </div>
                   </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                   <img
                  src={generateQRCode(location.qrCode)}
                  alt={`QR Code for ${location.name}`}
                  className="w-32 h-32 border-2 border-gray-200 rounded-lg"
                   />
                   <button
                  onClick={() => printLocationQR(location)}
                  className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition font-semibold"
                   >
                  🖨️ Print QR
                   </button>
                   <button
                  onClick={() => toggleLocationStatus(location.id)}
                  className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
                   >
                  {location.active ? 'Deactivate' : 'Activate'}
                   </button>
                   <button
                  onClick={() => deleteLocation(location.id)}
                  className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                   >
                  Delete
                   </button>
                  </div>
                   </div>
                  </div>
                   ))}
                  </div>
                   )}

                   {activeTab === 'add' && (
                  <div className="space-y-6">
                   <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                   <strong>Interactive Map:</strong> Click anywhere on the map to set the location, or drag the marker to adjust. You can also search by address or use your current location.
                  </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Location Name *</label>
                   <input
                  type="text"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation(prev => ({...prev, name: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Main Office"
                   />
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Radius (meters)</label>
                   <input
                  type="number"
                  value={newLocation.radius}
                  onChange={(e) => setNewLocation(prev => ({...prev, radius: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="100"
                   />
                  </div>
                   </div>

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address (Optional)</label>
                  <div className="flex gap-2">
                   <input
                  type="text"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation(prev => ({...prev, address: e.target.value}))}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="123 Business Park, Downtown or City Name"
                   />
                   <button
                  onClick={searchAddress}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                   >
                  Search
                   </button>
                   <button
                  onClick={useMyLocation}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                   >
                  <Navigation className="w-4 h-4" />
                  My Location
                   </button>
                  </div>
                   </div>

                   <div className="border-2 border-gray-300 rounded-xl overflow-hidden">
                  <div id="location-map"></div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Latitude</label>
                   <input
                  type="number"
                  step="0.000001"
                  value={newLocation.latitude}
                  onChange={(e) => setNewLocation(prev => ({...prev, latitude: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                  placeholder="Click map or enter manually"
                   />
                  </div>
                  <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Longitude</label>
                   <input
                  type="number"
                  step="0.000001"
                  value={newLocation.longitude}
                  onChange={(e) => setNewLocation(prev => ({...prev, longitude: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                  placeholder="Click map or enter manually"
                   />
                  </div>
                   </div>

                   {newLocation.latitude && newLocation.longitude && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                   <p className="text-sm text-green-900">
                  <strong>✓ Location Set:</strong> {newLocation.name || 'Unnamed location'} at coordinates {newLocation.latitude}, {newLocation.longitude} with {newLocation.radius}m radius
                   </p>
                  </div>
                   )}

                   <div className="flex gap-4 pt-4">
                  <button
                   onClick={handleAddLocationLocal}
                   className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                  >
                   <Plus className="w-5 h-5" />
                   Add Location
                  </button>
                  <button
                   onClick={() => {
                  setNewLocation({ name: '', address: '', latitude: '', longitude: '', radius: 100 });
                  if (marker) marker.remove();
                  if (circle) circle.remove();
                   }}
                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                   Clear
                  </button>
                   </div>
                  </div>
                   )}
                  </div>
                   </div>
                  </div>
                );
            };

            const TimesheetQueue = ({ visibleEmployees }) => {
                const [tsTab, setTsTab] = useState('pending');

                const BreakEditor = ({ ts, effectiveBreak, autoBreak, employee }) => {
                  const [editing, setEditing] = useState(false);
                  const [val, setVal] = useState(String(ts.breakMinutes||''));
                  const [saving, setSaving] = useState(false);
                  const sym = getCurrencySymbol(employee?.currency||'GBP');
                  const rate = employee?.hourlyRate||0;
                  const saveBreak = async () => {
                   setSaving(true);
                   try {
                  const data = await apiCall(`${API_ENDPOINTS.timesheets}/${ts.id}`,{method:'PUT',body:JSON.stringify({breakMinutes:parseInt(val)||0})});
                  if (data.success){await loadTimesheetsFromAPI();setEditing(false);}
                  else alert('Failed: '+data.error);
                   } catch(e){alert('Error: '+e.message);}
                   setSaving(false);
                  };
                  if (editing) return (
                   <div className="flex items-center gap-1">
                  <input type="number" min="0" max="480" value={val} onChange={e=>setVal(e.target.value)}
                   className="w-16 px-2 py-1 border border-amber-400 rounded text-sm text-center font-semibold focus:outline-none" autoFocus />
                  <span className="text-xs text-gray-500">min</span>
                  <button onClick={saveBreak} disabled={saving} className="text-green-600 hover:text-green-700 font-bold text-lg">✓</button>
                  <button onClick={()=>{setEditing(false);setVal(String(ts.breakMinutes||''));}} className="text-red-400 hover:text-red-600 font-bold text-lg">✕</button>
                   </div>
                  );
                  return (
                   <button onClick={()=>setEditing(true)} className="group flex items-center gap-1 hover:text-amber-700">
                  <span className={effectiveBreak>0?'text-amber-600 font-semibold':'text-gray-400'}>{effectiveBreak>0?`${effectiveBreak}m`:'—'}</span>
                  {autoBreak>0&&ts.breakMinutes===0&&<span className="text-xs text-gray-400">(auto)</span>}
                  {effectiveBreak>0&&<span className="text-xs text-amber-600">-{sym}{((effectiveBreak/60)*rate).toFixed(2)}</span>}
                  <span className="text-gray-300 group-hover:text-amber-500 text-xs">✎</span>
                   </button>
                  );
                };
                const [tsFrom, setTsFrom] = useState(() => {
                  const d = new Date();
                  d.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1));
                  return d.toISOString().split('T')[0];
                });
                const [tsTo, setTsTo] = useState(new Date().toISOString().split('T')[0]);
                const [tsBranchFilter, setTsBranchFilter] = useState('');
                const tsFiltered = timesheets
                  .filter(ts => visibleEmployees.some(e => e.id === ts.employeeId))
                  .filter(ts => {
                   if (!tsBranchFilter) return true;
                   const emp = employees.find(e => e.id === ts.employeeId);
                   return emp && (emp.branches || []).includes(tsBranchFilter);
                  })
                  .filter(ts => ts.status === tsTab)
                  .filter(ts => { const d = ts.date; return d >= tsFrom && d <= tsTo; })
                  .sort((a, b) => new Date(b.date) - new Date(a.date));
                return (
                  <div className="bg-white rounded-xl shadow">
                   <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3 items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Timesheet Queue</h2>
                  <div className="flex flex-wrap gap-2 items-center">
                   <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                  {['pending','approved','rejected'].map(tab => (
                   <button key={tab} onClick={() => setTsTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition capitalize ${tsTab === tab
                   ? tab === 'pending' ? 'bg-yellow-500 text-white'
                   : tab === 'approved' ? 'bg-green-600 text-white'
                   : 'bg-red-500 text-white'
                   : 'text-gray-600 hover:bg-gray-200'}`}>
                  {tab.charAt(0).toUpperCase()+tab.slice(1)}&nbsp;
                  <span className="opacity-80">
                   ({timesheets.filter(ts => {
                  if (!visibleEmployees.some(e=>e.id===ts.employeeId)) return false;
                  if (tsBranchFilter) {
                   const emp = employees.find(e => e.id === ts.employeeId);
                   if (!emp || !(emp.branches || []).includes(tsBranchFilter)) return false;
                  }
                  return ts.status===tab && ts.date>=tsFrom && ts.date<=tsTo;
                   }).length})
                  </span>
                   </button>
                  ))}
                   </div>
                   {branchList.length > 0 && (
                  <div className="relative">
                   <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                   <select value={tsBranchFilter} onChange={e => setTsBranchFilter(e.target.value)}
                  className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">All Branches</option>
                  {branchList.map(b => <option key={b} value={b}>{b}</option>)}
                   </select>
                  </div>
                   )}
                   <div className="flex items-center gap-2 text-sm">
                  <input type="date" value={tsFrom} onChange={e=>setTsFrom(e.target.value)}
                   className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm" />
                  <span className="text-gray-400">–</span>
                  <input type="date" value={tsTo} onChange={e=>setTsTo(e.target.value)}
                   className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm" />
                   </div>
                  </div>
                   </div>
                   <div className="overflow-x-auto">
                  <table className="w-full">
                   <thead className="bg-gray-50">
                  <tr>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Employee</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Start</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Finish</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Regular</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Overtime</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Break</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">GPS</th>
                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                  {tsFiltered.length === 0 && (
                   <tr><td colSpan="10" className="px-4 py-10 text-center text-gray-400">No {tsTab} timesheets for this period</td></tr>
                  )}
                  {tsFiltered.map(ts => {
                   const employee = employees.find(e => e.id === ts.employeeId);
                   const location = workLocations.find(loc => loc.id === ts.locationId);
                   const totalHours = (ts.regularHours||0)+(ts.overtimeHours||0);
                   const autoBreak = getAutoBreakMinutes(totalHours);
                   const effectiveBreak = ts.breakMinutes>0?ts.breakMinutes:autoBreak;
                   return (
                  <tr key={ts.id} className="hover:bg-gray-50">
                   <td className="px-4 py-3 text-sm font-medium">
                  <div className="flex items-center gap-2">
                   <span>{employee?.firstName || ""} {employee?.lastName || ""}</span>
                   {ts.manualEntry && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">MANUAL</span>
                   )}
                  </div>
                   </td>
                   <td className="px-4 py-3 text-sm">{new Date(ts.date).toLocaleDateString()}</td>
                   <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-1">
                   <MapPin className="w-3 h-3 text-gray-500" />
                   {location?.name || 'N/A'}
                  </div>
                   </td>
                   <td className="px-4 py-3 text-sm">{ts.startTime}</td>
                   <td className="px-4 py-3 text-sm">{ts.finishTime}</td>
                   <td className="px-4 py-3 text-sm">{ts.regularHours} hrs</td>
                   <td className="px-4 py-3 text-sm">{ts.overtimeHours} hrs</td>
                   <td className="px-4 py-3 text-sm">
                  {ts.status==='pending'&&hasPermission('canApproveTimesheets') ? (
                   <BreakEditor ts={ts} effectiveBreak={effectiveBreak} autoBreak={autoBreak} employee={employee} />
                  ) : (
                   <span className={effectiveBreak>0?'text-amber-600 font-semibold':'text-gray-400'}>
                  {effectiveBreak>0?`${effectiveBreak}m`:'—'}{autoBreak>0&&ts.breakMinutes===0&&<span className="text-xs text-gray-400 ml-1">(auto)</span>}
                   </span>
                  )}
                   </td>
                   <td className="px-4 py-3">
                  {ts.manualEntry ? (
                   <span className="text-purple-600 text-sm flex items-center gap-1"><ClipboardList className="w-4 h-4" />Manual</span>
                  ) : ts.checkInLocation && ts.checkOutLocation ? (
                   <span className="text-green-600 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" />✓</span>
                  ) : (
                   <span className="text-gray-400 text-sm">-</span>
                  )}
                   </td>
                   <td className="px-4 py-3">
                  <div className="flex gap-2 items-center">
                   {ts.status === 'pending' && hasPermission('canApproveTimesheets') && (
                  <>
                   <button onClick={() => handleTimesheetStatus(ts.id, 'approved')} className="text-green-600 hover:text-green-700" title="Approve"><CheckCircle className="w-5 h-5" /></button>
                   <button onClick={() => handleTimesheetStatus(ts.id, 'rejected')} className="text-red-600 hover:text-red-700" title="Reject"><XCircle className="w-5 h-5" /></button>
                  </>
                   )}
                   {(ts.status === 'approved' || ts.status === 'rejected') && hasPermission('canApproveTimesheets') && (
                  <button onClick={() => handleDeleteTimesheet(ts.id)} className="text-red-400 hover:text-red-600 transition" title="Delete"><Trash2 className="w-4 h-4" /></button>
                   )}
                  </div>
                   </td>
                  </tr>
                   );
                  })}
                   </tbody>
                  </table>
                   </div>
                  </div>
                );
            };

            const AdminDashboard = () => {
                const [editingRate, setEditingRate] = useState(null);
                const [rateValue, setRateValue] = useState('');
                const [employeeSearchQuery, setEmployeeSearchQuery] = useState('');
                const [employeeBranchFilter, setEmployeeBranchFilter] = useState('');

                const visibleEmployees = (() => {
                  if (!currentUser.adminPermissions) return employees;
                  const perms = currentUser.adminPermissions;
                  let filtered = employees;
                  if (perms.canViewCountryOnly) {
                   const country = (perms.restrictedCountry || currentUser.country || '').toLowerCase().trim();
                   if (country) {
                  filtered = filtered.filter(emp =>
                   emp.isAdmin ||
                   (emp.country && emp.country.toLowerCase().trim() === country)
                  );
                   }
                  }
                  if (perms.canViewBranchOnly) {
                   const allowedBranches = perms.restrictedBranches || [];
                   if (allowedBranches.length > 0) {
                  filtered = filtered.filter(emp =>
                   emp.isAdmin ||
                   ((emp.branches || []).some(b => allowedBranches.includes(b)))
                  );
                   }
                  }
                  return filtered;
                })();

                const startEditRate = (emp) => {
                  setEditingRate(emp.id);
                  setRateValue(emp.hourlyRate.toString());
                };

                const saveRate = (empId) => {
                  handleUpdateRate(empId, rateValue);
                  setEditingRate(null);
                };

                return (
                  <div className="min-h-screen bg-gray-50">

                {showAnnualLeave && (() => {
                  const AnnualLeaveModal = () => {
                   const [selectedEmpId, setSelectedEmpId] = React.useState('');
                   const [payoutMinutes, setPayoutMinutes] = React.useState('');
                   const [payoutError, setPayoutError] = React.useState('');
                   const [successMsg, setSuccessMsg] = React.useState('');

                   const nonAdminEmployees = visibleEmployees.filter(e => !e.isAdmin && e.id);
                   const selectedEmp = nonAdminEmployees.find(e => e.id === parseInt(selectedEmpId));
                   const leave = selectedEmp ? calculateLeaveBalance(selectedEmp.id) : null;

                   const minutesToDisplay = (mins) => {
                  if (mins < 60) return `${mins.toFixed(1)} mins`;
                  const h = Math.floor(mins / 60);
                  const m = (mins % 60).toFixed(0);
                  return `${h}h ${m}m`;
                   };

                   const handlePayout = async () => {
                  setPayoutError('');
                  setSuccessMsg('');
                  const mins = parseFloat(payoutMinutes);
                  if (!selectedEmp) return setPayoutError('Please select an employee');
                  if (isNaN(mins) || mins <= 0) return setPayoutError('Enter a valid number of minutes');
                  if (mins > leave.remainingMinutes) return setPayoutError(`Only ${leave.remainingMinutes.toFixed(1)} minutes available`);

                  const hoursEquivalent = mins / 60;
                  const payAmount = hoursEquivalent * (selectedEmp.hourlyRate || 0);
                  const currSym = getCurrencySymbol(selectedEmp.currency || 'GBP');

                  const confirmed = window.confirm(
                   `Pay out ${minutesToDisplay(mins)} of annual leave for ${selectedEmp.firstName} ${selectedEmp.lastName}?\n\n` +
                   `= ${currSym}${payAmount.toFixed(2)} (${hoursEquivalent.toFixed(2)}h × ${currSym}${selectedEmp.hourlyRate}/hr)\n\nThis will be added as a bonus payment.`
                  );
                  if (!confirmed) return;

                  try {
                   const data = await apiCall(API_ENDPOINTS.adjustments, {
                  method: 'POST',
                  body: JSON.stringify({
                   employeeId: selectedEmp.id,
                   type: 'annual_leave',
                   amount: parseFloat(payAmount.toFixed(2)),
                   reason: `Annual leave payout: ${minutesToDisplay(mins)} (${hoursEquivalent.toFixed(2)} hrs)`,
                   date: new Date().toISOString().split('T')[0],
                   hours: mins,
                  })
                   });
                   if (data.success) {
                  await loadAdjustmentsFromAPI();
                  setSuccessMsg(`✓ Paid out ${minutesToDisplay(mins)} = ${currSym}${payAmount.toFixed(2)} for ${selectedEmp.firstName}`);
                  setPayoutMinutes('');
                   } else {
                  setPayoutError(data.error || 'Failed to process payout');
                   }
                  } catch (err) {
                   setPayoutError(err.message);
                  }
                   };

                   return (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                   <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Annual Leave Manager
                   </h2>
                   <button onClick={() => setShowAnnualLeave(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                   </button>
                  </div>

                  <div className="p-6 space-y-6">
                   <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800">
                  <strong>Accrual Rule:</strong> Every approved hour worked earns 1 minute of annual leave, which can be paid out as a bonus at the employee's hourly rate.
                   </div>

                   {/* All employees leave summary */}
                   <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Leave Balances — All Employees</h3>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                   <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                   <tr>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Employee</th>
                  <th className="px-4 py-3 text-right text-gray-600 font-semibold">Hours Worked</th>
                  <th className="px-4 py-3 text-right text-gray-600 font-semibold">Accrued</th>
                  <th className="px-4 py-3 text-right text-gray-600 font-semibold">Used</th>
                  <th className="px-4 py-3 text-right text-emerald-700 font-semibold">Balance</th>
                  <th className="px-4 py-3 text-right text-gray-600 font-semibold">Pay Value</th>
                   </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                   {nonAdminEmployees.map(emp => {
                  const lb = calculateLeaveBalance(emp.id);
                  const payVal = (lb.remainingMinutes / 60) * (emp.hourlyRate || 0);
                  const sym = getCurrencySymbol(emp.currency || 'GBP');
                  return (
                   <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                   <p className="font-medium text-gray-900">{emp.firstName} {emp.lastName}</p>
                   <p className="text-xs text-gray-500">{emp.employeeId}</p>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">{lb.totalHours.toFixed(1)}h</td>
                  <td className="px-4 py-3 text-right text-blue-700">{minutesToDisplay(lb.accruedMinutes)}</td>
                  <td className="px-4 py-3 text-right text-red-600">{lb.paidOut > 0 ? minutesToDisplay(lb.paidOut) : '—'}</td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-700">{minutesToDisplay(lb.remainingMinutes)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">{sym}{payVal.toFixed(2)}</td>
                   </tr>
                  );
                   })}
                  </tbody>
                   </table>
                  </div>
                   </div>

                   {/* Payout section */}
                   <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-700 mb-4">Process Leave Payout</h3>
                  <div className="space-y-4">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Employee</label>
                  <select
                   value={selectedEmpId}
                   onChange={e => { setSelectedEmpId(e.target.value); setPayoutError(''); setSuccessMsg(''); }}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                   <option value="">-- Select Employee --</option>
                   {nonAdminEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                   {emp.firstName} {emp.lastName} ({emp.employeeId})
                  </option>
                   ))}
                  </select>
                   </div>

                   {leave && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 grid grid-cols-3 gap-4 text-center">
                   <div>
                  <p className="text-xs text-gray-500 mb-1">Accrued</p>
                  <p className="font-bold text-blue-700">{minutesToDisplay(leave.accruedMinutes)}</p>
                   </div>
                   <div>
                  <p className="text-xs text-gray-500 mb-1">Used</p>
                  <p className="font-bold text-red-600">{minutesToDisplay(leave.paidOut)}</p>
                   </div>
                   <div>
                  <p className="text-xs text-gray-500 mb-1">Available Balance</p>
                  <p className="font-bold text-emerald-700 text-lg">{minutesToDisplay(leave.remainingMinutes)}</p>
                   </div>
                  </div>
                   )}

                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Minutes to Pay Out</label>
                  <input
                   type="number"
                   min="1"
                   step="0.5"
                   value={payoutMinutes}
                   onChange={e => setPayoutMinutes(e.target.value)}
                   placeholder={leave ? `Max ${leave.remainingMinutes.toFixed(1)} mins` : "Select employee first"}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                  {selectedEmp && payoutMinutes > 0 && (
                   <p className="mt-2 text-sm text-gray-600">
                  = {getCurrencySymbol(selectedEmp.currency || 'GBP')}{((parseFloat(payoutMinutes) / 60) * (selectedEmp.hourlyRate || 0)).toFixed(2)} bonus payment
                  &nbsp;({(parseFloat(payoutMinutes)/60).toFixed(2)}h × {getCurrencySymbol(selectedEmp.currency || 'GBP')}{selectedEmp.hourlyRate}/hr)
                   </p>
                  )}
                   </div>

                   {payoutError && <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">{payoutError}</p>}
                   {successMsg && <p className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 p-3 rounded-lg">{successMsg}</p>}

                   <button
                  onClick={handlePayout}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
                   >
                  💳 Process Leave Payout as Bonus
                   </button>
                  </div>
                   </div>
                  </div>
                   </div>
                  </div>
                   );
                  };
                  return <AnnualLeaveModal />;
                })()}

                   {showChangePassword && (
                  <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
                   )}
                   {showPayrollSettings && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                   <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <ClipboardEdit className="w-5 h-5 text-indigo-600" />
                  Payroll Settings
                   </h2>
                   <button onClick={() => setShowPayrollSettings(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                   </button>
                  </div>
                  <div className="p-6 space-y-6">
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                   Standard Working Hours (per day)
                  </label>
                  <p className="text-xs text-gray-500 mb-3">Hours worked beyond this threshold count as overtime.</p>
                  <div className="flex items-center gap-3">
                   <input
                  type="number"
                  min="1"
                  max="24"
                  step="0.5"
                  value={payrollSettings.regularHoursThreshold}
                  onChange={(e) => setPayrollSettings(prev => ({...prev, regularHoursThreshold: parseFloat(e.target.value) || 8}))}
                  className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg font-semibold"
                   />
                   <span className="text-gray-600 font-medium">hours / day</span>
                  </div>
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                   Overtime Pay Multiplier
                  </label>
                  <p className="text-xs text-gray-500 mb-3">Overtime hours are paid at this multiple of the hourly rate. (e.g. 1.5 = time and a half)</p>
                  <div className="flex items-center gap-3">
                   <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.25"
                  value={payrollSettings.overtimeMultiplier}
                  onChange={(e) => setPayrollSettings(prev => ({...prev, overtimeMultiplier: parseFloat(e.target.value) || 1.5}))}
                  className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg font-semibold"
                   />
                   <span className="text-gray-600 font-medium">× hourly rate</span>
                  </div>
                   </div>
                   <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-indigo-800 font-semibold mb-1">Current Settings</p>
                  <p className="text-sm text-indigo-700">Regular hours: up to <strong>{payrollSettings.regularHoursThreshold}h/day</strong></p>
                  <p className="text-sm text-indigo-700">Overtime rate: <strong>{payrollSettings.overtimeMultiplier}× hourly rate</strong></p>
                   </div>
                   <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Automatic Break Rules</label>
                  <p className="text-xs text-gray-500 mb-3">Break minutes are automatically deducted when hours exceed the threshold. Only applies when no manual break is entered.</p>
                  <div className="space-y-2 mb-3">
                   {(payrollSettings.breakRules||[]).map((rule,idx)=>(
                  <div key={idx} className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                   <span className="text-sm text-amber-800">After</span>
                   <input type="number" min="1" max="24" step="0.5" value={rule.afterHours}
                  onChange={e=>{const u=[...payrollSettings.breakRules];u[idx]={...u[idx],afterHours:parseFloat(e.target.value)||0};setPayrollSettings(p=>({...p,breakRules:u}));}}
                  className="w-16 px-2 py-1 border border-amber-300 rounded text-sm text-center font-semibold focus:outline-none" />
                   <span className="text-sm text-amber-800">hrs → deduct</span>
                   <input type="number" min="1" max="480" value={rule.breakMinutes}
                  onChange={e=>{const u=[...payrollSettings.breakRules];u[idx]={...u[idx],breakMinutes:parseInt(e.target.value)||0};setPayrollSettings(p=>({...p,breakRules:u}));}}
                  className="w-16 px-2 py-1 border border-amber-300 rounded text-sm text-center font-semibold focus:outline-none" />
                   <span className="text-sm text-amber-800">min</span>
                   <button onClick={()=>{const u=(payrollSettings.breakRules||[]).filter((_,i)=>i!==idx);setPayrollSettings(p=>({...p,breakRules:u}));}} className="ml-auto text-red-400 hover:text-red-600 font-bold text-lg leading-none">✕</button>
                  </div>
                   ))}
                   {(payrollSettings.breakRules||[]).length===0&&<p className="text-xs text-gray-400 italic text-center py-2">No automatic rules. Breaks deducted only when manually entered.</p>}
                  </div>
                  <button onClick={()=>setPayrollSettings(p=>({...p,breakRules:[...(p.breakRules||[]),{afterHours:5,breakMinutes:30}]}))}
                   className="w-full border-2 border-dashed border-amber-300 text-amber-600 py-2 rounded-lg text-sm font-semibold hover:border-amber-500 hover:bg-amber-50 transition">
                   + Add Break Rule
                  </button>
                   </div>
                   <button
                  onClick={() => { setShowPayrollSettings(false); alert('Payroll settings saved!'); }}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                   >
                  Save Settings
                   </button>
                  </div>
                   </div>
                  </div>
                )}

                {showLocationManager && (
                  <LocationManager onClose={() => setShowLocationManager(false)} visibleEmployees={visibleEmployees} />
                   )}

                   {showAdminManager && (
                  <AdminManager onClose={() => setShowAdminManager(false)} />
                   )}

                   {showManualEntry && (
                  <ManualTimesheetEntry onClose={() => setShowManualEntry(false)} visibleEmployees={visibleEmployees} />
                   )}

                   {showEmployeeManager && (
                  <EmployeeManager onClose={() => setShowEmployeeManager(false)} visibleEmployees={visibleEmployees} />
                   )}

                   {showReportGenerator && (
                  <ReportGenerator onClose={() => setShowReportGenerator(false)} visibleEmployees={visibleEmployees} persistedState={reportGenState} onStateChange={setReportGenState} />
                   )}

                   {showFinancialManager && (
                  <FinancialManager onClose={() => setShowFinancialManager(false)} visibleEmployees={visibleEmployees} persistedState={financialMgrState} onStateChange={setFinancialMgrState} />
                   )}

                   {showExpenseManager && (
                  <ExpenseManager onClose={() => setShowExpenseManager(false)} visibleEmployees={visibleEmployees} />
                   )}

                   {showExpenseReport && (
                  <ExpenseReport onClose={() => setShowExpenseReport(false)} visibleEmployees={visibleEmployees} persistedState={expReportState} onStateChange={setExpReportState} />
                   )}

                   {showEmployeeAccounting && (
                  <EmployeeAccounting onClose={() => setShowEmployeeAccounting(false)} visibleEmployees={visibleEmployees} persistedState={empAccountingState} onStateChange={setEmpAccountingState} />
                   )}

                   {showCompanyAccounting && (
                  <CompanyAccounting onClose={() => setShowCompanyAccounting(false)} visibleEmployees={visibleEmployees} persistedState={companyAcctState} onStateChange={setCompanyAcctState} />
                   )}

                   {showVehicleManager && (
                  <VehicleManager onClose={() => setShowVehicleManager(false)} visibleEmployees={visibleEmployees} />
                   )}

                   {showBranchManager && (
                  <BranchManager onClose={() => setShowBranchManager(false)} />
                   )}

                   {showAgentManager && (
                  <AgentManager onClose={() => setShowAgentManager(false)} visibleEmployees={visibleEmployees} />
                   )}

                   {showIraqPay && (
                  <IraqPayManager
                   onClose={() => setShowIraqPay(false)}
                   visibleEmployees={visibleEmployees}
                   iraqPayments={iraqPayments}
                   loadIraqPaymentsFromAPI={loadIraqPaymentsFromAPI}
                   apiCall={apiCall}
                   API_ENDPOINTS={API_ENDPOINTS}
                   persistedState={iraqPayState}
                   onStateChange={setIraqPayState}
                  />
                   )}

                   {showAgentReport && (
                  <AgentReport onClose={() => setShowAgentReport(false)} visibleEmployees={visibleEmployees} onRefresh={loadAgentCollectionsFromAPI} persistedState={agentReportState} onStateChange={setAgentReportState} />
                   )}

                   <div className="bg-indigo-600 text-white p-6 shadow-lg">
                  <div className="max-w-7xl mx-auto">
                   <div className="flex items-center gap-4 mb-4">
                  <img
                   src="logo.png"
                   alt="B-Post Logo"
                   className="h-12 bg-white px-2 py-1 rounded"
                   style={{objectFit: 'contain'}}
                  />
                  <div>
                   <h1 className="text-2xl font-bold">Administrative Dashboard</h1>
                   <p className="text-indigo-100">Welcome, {currentUser?.firstName || ""} {currentUser?.lastName || ""}</p>
                  </div>
                   </div>
                   <div className="flex flex-wrap gap-2 items-center">

                  {/* Finance & Accounting */}
                  {hasPermission('canViewPayroll') && (
                  <div className="relative">
                  <button onClick={() => setNavOpen(navOpen === 'finance' ? '' : 'finance')} className="bg-teal-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center gap-2 text-sm whitespace-nowrap">
                  <DollarSign className="w-4 h-4" />Finance & Accounting
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {navOpen === 'finance' && (
                  <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 min-w-52 overflow-hidden">
                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50">Finance & Accounting</div>
                  <button onClick={() => { setShowExpenseManager(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-teal-50 flex items-center gap-3 text-gray-700"><Receipt className="w-4 h-4 text-teal-600" />Expenses</button>
                  <button onClick={() => { setShowEmployeeAccounting(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-teal-50 flex items-center gap-3 text-gray-700"><FileText className="w-4 h-4 text-indigo-600" />Employee Accounting</button>
                  {hasPermission('canViewCompanyAccounting') && <button onClick={() => { setShowCompanyAccounting(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-teal-50 flex items-center gap-3 text-gray-700"><BarChart3 className="w-4 h-4 text-purple-600" />Company Accounting</button>}
                  <button onClick={() => { setShowFinancialManager(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-teal-50 flex items-center gap-3 text-gray-700"><DollarSign className="w-4 h-4 text-green-600" />Financial Manager</button>
                  </div>
                  )}
                  </div>
                  )}

                  {/* Reports */}
                  {hasPermission('canViewPayroll') && (
                  <div className="relative">
                  <button onClick={() => setNavOpen(navOpen === 'reports' ? '' : 'reports')} className="bg-amber-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center gap-2 text-sm whitespace-nowrap">
                  <FileText className="w-4 h-4" />Reports
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {navOpen === 'reports' && (
                  <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 min-w-52 overflow-hidden">
                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50">Reports</div>
                  <button onClick={() => { setShowReportGenerator(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-amber-50 flex items-center gap-3 text-gray-700"><FileText className="w-4 h-4 text-amber-600" />Payroll Report</button>
                  <button onClick={() => { setShowExpenseReport(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-amber-50 flex items-center gap-3 text-gray-700"><Receipt className="w-4 h-4 text-teal-600" />Expense Report</button>
                  <button onClick={() => { setShowIraqPay(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 flex items-center gap-3 text-gray-700"><span className="text-base">🇮🇶</span>Pay in Iraq</button>
                  <button onClick={() => { setShowAgentReport(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-amber-50 flex items-center gap-3 text-gray-700"><Truck className="w-4 h-4 text-orange-600" />Collection Report</button>
                  </div>
                  )}
                  </div>
                  )}

                  {/* HR */}
                  <div className="relative">
                  <button onClick={() => setNavOpen(navOpen === 'hr' ? '' : 'hr')} className="bg-indigo-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center gap-2 text-sm whitespace-nowrap">
                  <UserCog className="w-4 h-4" />HR
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {navOpen === 'hr' && (
                  <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 min-w-52 overflow-hidden">
                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50">HR</div>
                  {hasPermission('canManageEmployees') && <button onClick={() => { setShowEmployeeManager(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 flex items-center gap-3 text-gray-700"><UserCog className="w-4 h-4 text-indigo-600" />Employees</button>}
                  {hasPermission('canAddEmployeeHours') && <button onClick={() => { setShowManualEntry(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 flex items-center gap-3 text-gray-700"><ClipboardList className="w-4 h-4 text-green-600" />Add Hours</button>}
                  <button onClick={() => { setShowAnnualLeave(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 flex items-center gap-3 text-gray-700"><Calendar className="w-4 h-4 text-emerald-600" />Annual Leave</button>
                  {hasPermission('canManageAdminPermissions') && <button onClick={() => { setShowBranchManager(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 flex items-center gap-3 text-gray-700"><Building className="w-4 h-4 text-blue-600" />Branches</button>}
                  </div>
                  )}
                  </div>

                  {/* Operations */}
                  <div className="relative">
                  <button onClick={() => setNavOpen(navOpen === 'ops' ? '' : 'ops')} className="bg-orange-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-orange-700 transition flex items-center gap-2 text-sm whitespace-nowrap">
                  <Truck className="w-4 h-4" />Operations
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {navOpen === 'ops' && (
                  <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 min-w-52 overflow-hidden">
                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50">Operations</div>
                  {hasPermission('canManageAgents') && <button onClick={() => { setShowAgentManager(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 flex items-center gap-3 text-gray-700"><Truck className="w-4 h-4 text-orange-600" />Agents</button>}
                  <button onClick={() => { setShowVehicleManager(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 flex items-center gap-3 text-gray-700"><Car className="w-4 h-4 text-blue-600" />Vehicles</button>
                  {hasPermission('canManageLocations') && <button onClick={() => { setShowLocationManager(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 flex items-center gap-3 text-gray-700"><MapPin className="w-4 h-4 text-red-500" />Manage Locations</button>}
                  </div>
                  )}
                  </div>

                  {/* Settings */}
                  <div className="relative">
                  <button onClick={() => setNavOpen(navOpen === 'settings' ? '' : 'settings')} className="bg-gray-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center gap-2 text-sm whitespace-nowrap">
                  <Shield className="w-4 h-4" />Settings
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {navOpen === 'settings' && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 min-w-52 overflow-hidden">
                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50">Settings</div>
                  {hasPermission('canCreateAdmins') && <button onClick={() => { setShowAdminManager(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"><Shield className="w-4 h-4 text-indigo-600" />Manage Admins</button>}
                  <button onClick={() => { setShowPayrollSettings(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"><ClipboardEdit className="w-4 h-4 text-indigo-600" />Pay Settings</button>
                  <button onClick={() => { setShowChangePassword(true); setNavOpen(''); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"><Shield className="w-4 h-4 text-gray-500" />Change Password</button>
                  </div>
                  )}
                  </div>

                  <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center gap-2 text-sm whitespace-nowrap">
                  <LogOut className="w-4 h-4" />Logout
                  </button>
                   </div>
                  </div>
                   </div>

                   <div className="max-w-7xl mx-auto p-6">
                  {currentUser.adminPermissions?.canViewCountryOnly && (
                   <div className="mb-4 bg-amber-50 border border-amber-300 rounded-xl px-5 py-3 flex items-center gap-3 text-amber-800 text-sm">
                  <span className="text-lg">🌍</span>
                  {(currentUser.adminPermissions.restrictedCountry || currentUser.country) ? (
                   <span>You are viewing employees in <strong>{currentUser.adminPermissions.restrictedCountry || currentUser.country}</strong> only.</span>
                  ) : (
                   <span className="text-red-700">⚠️ Country restriction is enabled but no country is set. Contact your super-admin to assign a country.</span>
                  )}
                   </div>
                  )}
                  {currentUser.adminPermissions?.canViewBranchOnly && (
                   <div className="mb-4 bg-blue-50 border border-blue-300 rounded-xl px-5 py-3 flex items-center gap-3 text-blue-800 text-sm">
                  <span className="text-lg">🏢</span>
                  {(currentUser.adminPermissions.restrictedBranches || []).length > 0 ? (
                   <span>You are viewing employees assigned to: <strong>{(currentUser.adminPermissions.restrictedBranches || []).join(', ')}</strong>.</span>
                  ) : (
                   <span className="text-red-700">⚠️ Branch restriction is enabled but no branches are assigned. Contact your super-admin.</span>
                  )}
                   </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                   <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center gap-4">
                   <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                   </div>
                   <div>
                  <p className="text-sm text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold">{visibleEmployees.filter(e => !e.isAdmin).length}</p>
                   </div>
                  </div>
                   </div>

                   <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center gap-4">
                   <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                   </div>
                   <div>
                  <p className="text-sm text-gray-600">Pending Timesheets</p>
                  <p className="text-2xl font-bold">
                   {timesheets.filter(ts => ts.status === 'pending' && visibleEmployees.some(e => e.id === ts.employeeId)).length}
                  </p>
                   </div>
                  </div>
                   </div>

                   {/* Currently Working card */}
                   {(() => {
                  const todayStr = new Date().toISOString().split('T')[0];
                  const today = new Date().toLocaleDateString('en-CA');
                  const activeNow = visibleEmployees.filter(function(emp) {
                   if (emp.isAdmin) return false;
                   const todayTs = timesheets.find(function(ts) {
                  return ts.employeeId === emp.id && (ts.date === todayStr || ts.date === today) && ts.startTime && ts.startTime !== '' && ts.status === 'checkedin';
                   });
                   return !!todayTs;
                  });
                  return (
                   <div className="bg-green-50 border-2 border-green-200 rounded-xl shadow p-4" style={{alignSelf:'start', overflow:'hidden'}}>
                  <div className="flex items-center gap-3 mb-2">
                   <div className="bg-green-500 p-2 rounded-lg relative flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                   </div>
                   <div>
                  <p className="text-xs text-gray-600 font-medium">Currently Working</p>
                  <p className="text-xl font-bold text-green-700">{activeNow.length}</p>
                   </div>
                  </div>
                  {activeNow.length > 0 ? (
                   <div style={{maxHeight:'160px', overflowY:'auto'}}>
                  {activeNow.map(function(emp) {
                   const ts = timesheets.find(function(t) { return t.employeeId === emp.id && (t.date === todayStr || t.date === today) && t.startTime && t.status === 'checkedin'; });
                   const startTime = ts ? ts.startTime : '';
                   const startParts = startTime ? startTime.split(':') : [];
                   let elapsed = '';
                   if (startParts.length >= 2) {
                  const now = new Date();
                  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(startParts[0]), parseInt(startParts[1]));
                  const mins = Math.floor((now - start) / 60000);
                  const hrs = Math.floor(mins / 60);
                  const rem = mins % 60;
                  elapsed = hrs > 0 ? hrs + 'h ' + rem + 'm' : rem + 'm';
                   }
                   return (
                  <div key={emp.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'white', borderRadius:'6px', padding:'3px 8px', marginBottom:'3px'}}>
                   <div style={{display:'flex', alignItems:'center', gap:'6px', minWidth:0}}>
                  <span style={{width:'6px', height:'6px', background:'#22c55e', borderRadius:'50%', flexShrink:0}}></span>
                  <span style={{fontSize:'11px', fontWeight:600, color:'#1f2937', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{emp.firstName} {emp.lastName}</span>
                   </div>
                   <span style={{fontSize:'11px', fontWeight:700, color:'#15803d', flexShrink:0, marginLeft:'6px'}}>{startTime}{elapsed ? ' ('+elapsed+')' : ''}</span>
                  </div>
                   );
                  })}
                   </div>
                  ) : (
                   <p className="text-xs text-gray-400">No employees currently clocked in</p>
                  )}
                   </div>
                  );
                   })()}

                   <div className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition" onClick={() => setShowExpenseManager(true)}>
                  <div className="flex items-center gap-4">
                   <div className="bg-teal-100 p-3 rounded-lg">
                  <Receipt className="w-6 h-6 text-teal-600" />
                   </div>
                   <div>
                  <p className="text-sm text-gray-600">Pending Expenses</p>
                  <p className="text-2xl font-bold text-teal-700">
                   {expenses.filter(e => e.status === 'pending' && visibleEmployees.some(v => v.id === e.employeeId)).length}
                  </p>
                  <p className="text-xs text-teal-600 font-semibold">
                   £{expenses.filter(e => e.status === 'pending' && visibleEmployees.some(v => v.id === e.employeeId)).reduce((s,e)=>s+e.amount,0).toFixed(2)} awaiting
                  </p>
                   </div>
                  </div>
                   </div>

                   <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center gap-4">
                   <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600" />
                   </div>
                   <div>
                  <p className="text-sm text-gray-600">Active Locations</p>
                  <p className="text-2xl font-bold">
                   {workLocations.filter(loc => loc.active).length}
                  </p>
                   </div>
                  </div>
                   </div>

                   <div className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center gap-4">
                   <div className="bg-amber-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                   </div>
                   <div>
                  <p className="text-sm text-gray-600">Total Payroll</p>
                  <div className="text-lg font-bold leading-tight">
                   {(() => {
                  const byCurrency = {};
                  visibleEmployees.filter(e => !e.isAdmin).forEach(emp => {
                   const sym = getCurrencySymbol(emp.currency || 'GBP');
                   const bal = calculatePayroll(emp.id).balance;
                   byCurrency[sym] = (byCurrency[sym] || 0) + bal;
                  });
                  return Object.entries(byCurrency).map(([sym, total]) => (
                   <div key={sym}>{sym}{total.toFixed(2)}</div>
                  ));
                   })()}
                  </div>
                   </div>
                  </div>
                   </div>
                  </div>

                  <div className="bg-white rounded-xl shadow mb-8">
                   <div className="p-6 border-b border-gray-200 flex justify-between items-center gap-4 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-800">Employee Management & Payroll</h2>
                  <div className="flex items-center gap-3 flex-wrap">
                   <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                   type="text"
                   placeholder="Search by name, ID or department..."
                   value={employeeSearchQuery}
                   onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                   className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-64"
                  />
                   </div>
                   {branchList.length > 0 && (
                  <div className="relative">
                   <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                   <select
                  value={employeeBranchFilter}
                  onChange={(e) => setEmployeeBranchFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                   >
                  <option value="">All Branches</option>
                  {branchList.map(b => (
                   <option key={b} value={b}>{b}</option>
                  ))}
                   </select>
                  </div>
                   )}
                   {hasPermission('canAddEmployeeHours') && (
                  <button
                   onClick={() => setShowManualEntry(true)}
                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                   <ClipboardEdit className="w-4 h-4" />
                   Add Manual Hours
                  </button>
                   )}
                  </div>
                   </div>
                   <div className="overflow-x-auto">
                  {(() => {
                   const filteredEmps = visibleEmployees.filter(emp => {
                  if (!emp || !emp.id || !emp.firstName || emp.isAdmin) return false;
                  if (employeeBranchFilter && !(emp.branches || []).includes(employeeBranchFilter)) return false;
                  if (!employeeSearchQuery.trim()) return true;
                  const q = employeeSearchQuery.toLowerCase();
                  return (
                   `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(q) ||
                   (emp.employeeId || '').toLowerCase().includes(q) ||
                   (emp.department || '').toLowerCase().includes(q)
                  );
                   });
                   const maxHours = Math.max(...filteredEmps.map(emp => {
                  const p = calculatePayroll(emp.id);
                  return (p.regularHours + p.overtimeHours) || 0;
                   }), 1);
                   return (
                  <table className="w-full">
                   <thead>
                  <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-100">
                   <th className="px-5 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Employee</th>
                   <th className="px-5 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Department</th>
                   <th className="px-5 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Rate</th>
                   <th className="px-5 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider w-48">Hours Worked</th>
                   <th className="px-5 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Overtime</th>
                   <th className="px-5 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Balance Owed</th>
                  </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                  {filteredEmps.map(emp => {
                   const payroll = calculatePayroll(emp.id);
                   const totalHours = payroll.regularHours + payroll.overtimeHours;
                   const hoursPercent = maxHours > 0 ? Math.round((totalHours / maxHours) * 100) : 0;
                   const hasBalance = payroll.balance > 0;
                   const sym = getCurrencySymbol(emp.currency);
                   return (
                  <tr key={emp.id} className="hover:bg-indigo-50 transition-colors group">
                   <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {(emp.firstName||'')[0]}{(emp.lastName||'')[0]}
                   </div>
                   <div>
                  <div className="font-semibold text-gray-900">{emp.firstName} {emp.lastName}</div>
                  <div className="text-xs text-gray-400">{emp.employeeId}</div>
                   </div>
                  </div>
                   </td>
                   <td className="px-5 py-4">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">{emp.department || 'N/A'}</span>
                   </td>
                   <td className="px-5 py-4">
                  {editingRate === emp.id ? (
                   <div className="flex items-center gap-2">
                  <input type="number" value={rateValue} onChange={(e) => setRateValue(e.target.value)} className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" step="0.01" />
                  <button onClick={() => saveRate(emp.id)} className="text-green-600 hover:text-green-700"><Save className="w-4 h-4" /></button>
                   </div>
                  ) : (
                   <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-gray-800">{sym}{(emp.hourlyRate || 0).toFixed(2)}</span>
                  <span className="text-xs text-gray-400">/hr</span>
                  {hasPermission('canSetRates') && (
                   <button onClick={() => startEditRate(emp)} className="text-indigo-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                  <Edit2 className="w-3.5 h-3.5" />
                   </button>
                  )}
                   </div>
                  )}
                   </td>
                   <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                   <div className="flex-1 bg-gray-100 rounded-full h-2 w-24">
                  <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{width: hoursPercent + '%'}}></div>
                   </div>
                   <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{totalHours.toFixed(1)}h</span>
                  </div>
                  {payroll.minimumHoursBonus > 0 && (
                   <div className="text-xs text-amber-600 font-medium mt-0.5">+{payroll.minimumHoursBonus.toFixed(1)}h guarantee</div>
                  )}
                   </td>
                   <td className="px-5 py-4">
                  {payroll.overtimeHours > 0 ? (
                   <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">{payroll.overtimeHours.toFixed(1)}h OT</span>
                  ) : (
                   <span className="text-gray-300 text-sm">—</span>
                  )}
                   </td>
                   <td className="px-5 py-4">
                  <div className={'text-base font-bold ' + (hasBalance ? 'text-green-600' : 'text-gray-400')}>
                   {sym}{payroll.balance.toFixed(2)}
                  </div>
                  {payroll.payments > 0 && (
                   <div className="text-xs text-gray-500 mt-0.5">
                  Earned: {sym}{payroll.totalPay.toFixed(2)} | Paid: {sym}{payroll.payments.toFixed(2)}
                   </div>
                  )}
                   </td>
                  </tr>
                   );
                  })}
                   </tbody>
                   <tfoot>
                  <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-t-2 border-indigo-100">
                   <td colSpan="3" className="px-5 py-3 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  {filteredEmps.length} Employee{filteredEmps.length !== 1 ? 's' : ''}
                   </td>
                   <td className="px-5 py-3 text-sm font-bold text-indigo-700">
                  {filteredEmps.reduce((s, emp) => {
                   const p = calculatePayroll(emp.id);
                   return s + p.regularHours + p.overtimeHours;
                  }, 0).toFixed(1)}h total
                   </td>
                   <td className="px-5 py-3 text-sm font-bold text-amber-600">
                  {filteredEmps.reduce((s, emp) => s + calculatePayroll(emp.id).overtimeHours, 0).toFixed(1)}h OT
                   </td>
                   <td className="px-5 py-3 text-sm font-bold text-green-700">
                  {(() => {
                   const byCurrency = {};
                   filteredEmps.forEach(emp => {
                  const sym = getCurrencySymbol(emp.currency);
                  byCurrency[sym] = (byCurrency[sym] || 0) + calculatePayroll(emp.id).balance;
                   });
                   return Object.entries(byCurrency).map(([sym, total]) => (
                  <span key={sym} className="block">{sym}{total.toFixed(2)}</span>
                   ));
                  })()}
                   </td>
                  </tr>
                   </tfoot>
                  </table>
                   );
                  })()}
                   </div>
                  </div>

                  <TimesheetQueue visibleEmployees={visibleEmployees} />

                  {(() => {
                   const pendingExp = expenses.filter(e => e.status === 'pending' && visibleEmployees.some(v => v.id === e.employeeId));
                   if (pendingExp.length === 0) return null;
                   return (
                  <div className="bg-white rounded-xl shadow mb-8 mt-8">
                   <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   <Receipt className="w-6 h-6 text-teal-600" />
                   Pending Expense Claims
                   <span className="ml-2 px-2.5 py-0.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">{pendingExp.length}</span>
                  </h2>
                  <button onClick={() => setShowExpenseManager(true)} className="text-teal-600 hover:text-teal-800 text-sm font-semibold">View All →</button>
                   </div>
                   <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                   <thead className="bg-gray-50">
                  <tr>{['Employee','Date','Category','Description','Amount','Receipt Ref','Actions'].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>)}</tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                  {pendingExp.map(exp => (
                   <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                   <div className="font-medium text-gray-800">{exp.employeeName}</div>
                   <div className="text-xs text-gray-500">{exp.employeeCode}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{new Date(exp.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">{exp.category}</span></td>
                  <td className="px-4 py-3 text-gray-600">{exp.description|| ''}</td>
                  <td className="px-4 py-3 font-bold text-gray-800">{getCurrencySymbol(exp.currency)}{exp.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{exp.receiptNote|| ''}</td>
                  <td className="px-4 py-3">
                   <div className="flex gap-2">
                  <button onClick={() => handleQuickExpenseAction(exp.id, 'approved')} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200">Approve</button>
                  <button onClick={() => handleQuickExpenseAction(exp.id, 'rejected')} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200">Reject</button>
                   </div>
                  </td>
                   </tr>
                  ))}
                   </tbody>
                  </table>
                   </div>
                  </div>
                   );
                  })()}
                   </div>
                  </div>
                );
            };

            return (
                <div className="font-sans">
                  {currentView === 'login' && <LoginScreen />}
                  {currentView === 'register' && <RegistrationScreen />}
                  {currentView === 'employee-dashboard' && <EmployeeDashboard />}
                  {currentView === 'admin-dashboard' && <AdminDashboard />}
                </div>
            );
        }