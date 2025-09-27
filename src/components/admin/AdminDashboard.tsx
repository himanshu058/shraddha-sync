import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  AlertTriangle, 
  Video, 
  Activity, 
  TrendingUp, 
  Shield,
  Home,
  Bell,
  Phone,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [liveCount, setLiveCount] = useState(247);
  const [emergencyActive, setEmergencyActive] = useState(false);

  // Simulate live counter updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyAlert = () => {
    setEmergencyActive(!emergencyActive);
    if (!emergencyActive) {
      alert('🚨 Emergency Alert Triggered! All security personnel have been notified.');
    }
  };

  const zones = [
    { name: 'Main Darshan Hall', count: 89, capacity: 150, status: 'normal' },
    { name: 'Prayer Courtyard', count: 67, capacity: 100, status: 'moderate' },
    { name: 'Entry Gate', count: 45, capacity: 80, status: 'normal' },
    { name: 'Prasad Counter', count: 78, capacity: 80, status: 'high' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-devotion-gradient text-white shadow-temple">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="font-heading text-2xl font-bold">
                Temple Management Portal
              </h1>
              <p className="text-white/80 text-sm">Real-time Crowd & Safety Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {emergencyActive && (
              <Badge className="bg-red-500 text-white animate-pulse">
                <AlertTriangle className="h-3 w-3 mr-1" />
                EMERGENCY ACTIVE
              </Badge>
            )}
            <Link to="/">
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-accent">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Live Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="temple-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Live Devotee Count</p>
                  <p className="text-3xl font-bold text-primary">{liveCount}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-600">
                  <Activity className="h-3 w-3 mr-1" />
                  Live Update
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="temple-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Today's Entries</p>
                  <p className="text-3xl font-bold text-secondary">1,247</p>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">+12% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="temple-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Zones</p>
                  <p className="text-3xl font-bold text-accent">4/4</p>
                </div>
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-2">
                <Badge className="bg-blue-100 text-blue-600">All Operational</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="temple-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Security Status</p>
                  <p className="text-3xl font-bold text-green-600">SAFE</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-600">All Clear</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Zone-wise Heatmap */}
          <Card className="temple-card">
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Zone-wise Crowd Density
              </CardTitle>
              <CardDescription>Real-time occupancy by temple zones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {zones.map((zone, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{zone.name}</span>
                    <Badge className={getStatusColor(zone.status)}>
                      {Math.round((zone.count / zone.capacity) * 100)}%
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        zone.status === 'high' ? 'bg-red-500' :
                        zone.status === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(zone.count / zone.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {zone.count} / {zone.capacity} devotees
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Live Camera Feeds */}
          <Card className="temple-card">
            <CardHeader>
              <CardTitle className="font-heading flex items-center">
                <Video className="h-5 w-5 mr-2 text-secondary" />
                Live Camera Feeds
              </CardTitle>
              <CardDescription>CCTV monitoring across temple premises</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {['Main Gate', 'Darshan Hall', 'Courtyard', 'Exit Point'].map((location, index) => (
                  <div key={index} className="space-y-2">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                      <Video className="h-8 w-8 text-muted-foreground" />
                      <div className="absolute top-2 left-2 bg-green-500 w-2 h-2 rounded-full animate-pulse"></div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white text-xs">
                        LIVE
                      </Badge>
                    </div>
                    <p className="text-sm text-center font-medium">{location}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Screen Monitoring
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Protocols */}
        <Card className="temple-card">
          <CardHeader>
            <CardTitle className="font-heading flex items-center text-accent">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency Protocols & Safety
            </CardTitle>
            <CardDescription>
              Immediate response systems and emergency contact points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Emergency Alert */}
              <div className="space-y-4">
                <h3 className="font-semibold">Emergency Alert System</h3>
                <Button 
                  onClick={handleEmergencyAlert}
                  className={`w-full ${emergencyActive ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                  size="lg"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  {emergencyActive ? 'EMERGENCY ACTIVE' : 'TRIGGER EMERGENCY'}
                </Button>
                {emergencyActive && (
                  <Button 
                    onClick={() => setEmergencyActive(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Emergency
                  </Button>
                )}
              </div>

              {/* Medical Contacts */}
              <div className="space-y-4">
                <h3 className="font-semibold">Medical Emergency</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Temple Medical: 108
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Nearest Hospital: +91-XX-XXXX
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Ambulance: 102
                  </Button>
                </div>
              </div>

              {/* Security Contacts */}
              <div className="space-y-4">
                <h3 className="font-semibold">Security & Police</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Temple Security: +91-XX-XXXX
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Local Police: 100
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Fire Department: 101
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;