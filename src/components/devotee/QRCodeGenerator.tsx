import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, CheckCircle, ArrowLeft, QrCode } from 'lucide-react';
import QRCodeLib from 'qrcode';

interface QRCodeGeneratorProps {
  ticketData: any;
  onBack: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ ticketData, onBack }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, [ticketData]);

  const generateQRCode = async () => {
    try {
      const qrData = JSON.stringify(ticketData);
      const url = await QRCodeLib.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#800000', // Maroon
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);

      // Also create on canvas for downloading
      if (canvasRef.current) {
        await QRCodeLib.toCanvas(canvasRef.current, qrData, {
          width: 400,
          margin: 2,
          color: {
            dark: '#800000',
            light: '#FFFFFF'
          }
        });
      }
    } catch (error) {
      console.error('QR Code generation failed:', error);
    }
  };

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `temple-pass-${ticketData.bookingId}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const saveToPhone = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `temple-pass-${ticketData.bookingId}.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-sacred-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-devotion mb-2">
            Sacred Pass Generated!
          </h1>
          <p className="text-muted-foreground">Your digital temple entry pass is ready</p>
        </div>

        <Card className="temple-card">
          <CardHeader>
            <CardTitle className="font-heading text-center flex items-center justify-center">
              <QrCode className="h-5 w-5 mr-2 text-primary" />
              Temple Entry Pass
            </CardTitle>
            <CardDescription className="text-center">
              Booking ID: <span className="font-semibold text-primary">{ticketData.bookingId}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code Display */}
            <div className="flex justify-center">
              {qrCodeUrl && (
                <div className="p-4 bg-white rounded-lg shadow-inner border-2 border-primary/20">
                  <img 
                    src={qrCodeUrl} 
                    alt="Temple Entry QR Code"
                    className="w-64 h-64"
                  />
                </div>
              )}
            </div>

            {/* Hidden canvas for download */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Devotee Details */}
            <div className="space-y-3 text-sm">
              <h3 className="font-semibold text-center text-accent">Devotee Details</h3>
              {ticketData.devotees.map((devotee: any, index: number) => (
                <div key={index} className="bg-muted/50 p-3 rounded-lg">
                  <div className="font-medium">{index + 1}. {devotee.name}</div>
                  <div className="text-muted-foreground text-xs">
                    Age: {devotee.age} | Gender: {devotee.gender}
                    {devotee.specialNeeds !== 'None' && (
                      <div>Special Needs: {devotee.specialNeeds}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={downloadQR}
                className="w-full bg-temple-gradient text-white shadow-sacred hover:shadow-temple"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR Pass
              </Button>

              <Button 
                onClick={saveToPhone}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                size="lg"
              >
                Save to Phone
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-muted/30 p-4 rounded-lg text-center text-sm">
              <h4 className="font-semibold text-accent mb-2">Instructions</h4>
              <p className="text-muted-foreground">
                Present this QR code at the temple entrance gate. 
                Make sure your phone screen is bright for easy scanning.
              </p>
            </div>

            {/* Back Button */}
            <Button 
              onClick={onBack}
              variant="ghost"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Book Another Pass
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCodeGenerator;