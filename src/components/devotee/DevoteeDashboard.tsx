import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { QrCode, Download, Users, Heart, Home } from 'lucide-react';
import QRCodeGenerator from '@/components/devotee/QRCodeGenerator';
import { Link } from 'react-router-dom';

interface Devotee {
  name: string;
  age: string;
  gender: string;
  specialNeeds: string;
}

const DevoteeDashboard = () => {
  const [devoteeCount, setDevoteeCount] = useState(1);
  const [devotees, setDevotees] = useState<Devotee[]>([
    { name: '', age: '', gender: '', specialNeeds: '' }
  ]);
  const [showQR, setShowQR] = useState(false);
  const [bookingId] = useState(`TMP${Date.now()}`);

  const handleDevoteeCountChange = (count: number) => {
    setDevoteeCount(count);
    const newDevotees = Array.from({ length: count }, (_, i) => 
      devotees[i] || { name: '', age: '', gender: '', specialNeeds: '' }
    );
    setDevotees(newDevotees);
  };

  const updateDevotee = (index: number, field: keyof Devotee, value: string) => {
    const updated = [...devotees];
    updated[index] = { ...updated[index], [field]: value };
    setDevotees(updated);
  };

  const generateTicket = () => {
    // Simple validation
    const allValid = devotees.every(d => d.name && d.age && d.gender);
    if (!allValid) {
      alert('Please fill all required fields for all devotees');
      return;
    }
    setShowQR(true);
  };

  const ticketData = {
    bookingId,
    devotees: devotees.map(d => ({
      name: d.name,
      age: d.age,
      gender: d.gender,
      specialNeeds: d.specialNeeds || 'None'
    })),
    timestamp: new Date().toISOString(),
    templeId: 'SHRI_MANDIR_001'
  };

  if (showQR) {
    return <QRCodeGenerator ticketData={ticketData} onBack={() => setShowQR(false)} />;
  }

  return (
    <div className="min-h-screen bg-sacred-gradient">
      {/* Header */}
      <header className="bg-white shadow-sacred border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Heart className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-heading text-2xl font-bold text-devotion">
                श्री मंदिर Devotee Portal
              </h1>
              <p className="text-sm text-muted-foreground">Sacred Journey Begins</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="temple-card">
          <CardHeader>
            <CardTitle className="font-heading text-center text-2xl text-devotion">
              Book Your Sacred Darshan
            </CardTitle>
            <CardDescription className="text-center">
              Enter devotee details to generate your digital temple pass
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Devotee Count Selection */}
            <div className="space-y-2">
              <Label>Number of Devotees</Label>
              <Select 
                value={devoteeCount.toString()} 
                onValueChange={(value) => handleDevoteeCountChange(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of devotees" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Devotee' : 'Devotees'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Devotee Details */}
            <div className="space-y-6">
              {devotees.map((devotee, index) => (
                <Card key={index} className="bg-muted/30 border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Devotee {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input
                          placeholder="Enter full name"
                          value={devotee.name}
                          onChange={(e) => updateDevotee(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Age *</Label>
                        <Input
                          type="number"
                          placeholder="Age"
                          value={devotee.age}
                          onChange={(e) => updateDevotee(index, 'age', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Gender *</Label>
                      <Select 
                        value={devotee.gender} 
                        onValueChange={(value) => updateDevotee(index, 'gender', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Special Needs (Optional)</Label>
                      <Textarea
                        placeholder="Any special assistance required..."
                        value={devotee.specialNeeds}
                        onChange={(e) => updateDevotee(index, 'specialNeeds', e.target.value)}
                        className="resize-none"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Generate Button */}
            <Button 
              onClick={generateTicket}
              className="w-full bg-temple-gradient text-white shadow-sacred hover:shadow-temple transition-sacred"
              size="lg"
            >
              <QrCode className="h-5 w-5 mr-2" />
              Generate Sacred Pass
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevoteeDashboard;