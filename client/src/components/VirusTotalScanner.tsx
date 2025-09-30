import { useState, useRef } from "react";
import { Upload, Link, Shield, AlertTriangle, CheckCircle, XCircle, Loader2, FileText, Globe } from "lucide-react";
import { Button } from "./ui/button";

interface VirusTotalScannerProps {
  onClose: () => void;
}

interface ScanResult {
  malicious: boolean;
  harmless: boolean;
  suspicious: boolean;
  undetected: boolean;
  timeout: boolean;
  total: number;
  positives: number;
  detectionRate: string;
  scanDate: string;
  permalink: string;
  sha256?: string;
  fileName?: string;
  url?: string;
}

const VirusTotalScanner = ({ onClose }: VirusTotalScannerProps) => {
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const VIRUSTOTAL_API_KEY = 'a8911bad83fff7cf35ba5351367ff9a4517ea6d764257f5876170b19b2c8361b' || 'demo-key';

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setScanResult(null);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(urlInput);
      scanUrl(urlInput);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  const scanFile = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // For demo purposes, we'll simulate the response
      await simulateVirusTotalScan(file.name, 'file');

    } catch (err) {
      setError('Failed to scan file. Please try again.');
      console.error('File scan error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const scanUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll simulate the response
      await simulateVirusTotalScan(url, 'url');

    } catch (err) {
      setError('Failed to scan URL. Please try again.');
      console.error('URL scan error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateVirusTotalScan = async (target: string, type: 'file' | 'url') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate different scan results for demo purposes
    const results = [
      {
        malicious: false,
        harmless: true,
        suspicious: false,
        undetected: false,
        timeout: false,
        total: 74,
        positives: 0,
        detectionRate: "0/74",
        scanDate: new Date().toISOString(),
        permalink: `https://virustotal.com/gui/${type}/${type === 'file' ? 'sample' : 'url'}/demo`,
        fileName: type === 'file' ? target : undefined,
        url: type === 'url' ? target : undefined
      },
      {
        malicious: true,
        harmless: false,
        suspicious: true,
        undetected: false,
        timeout: false,
        total: 74,
        positives: 15,
        detectionRate: "15/74",
        scanDate: new Date().toISOString(),
        permalink: `https://virustotal.com/gui/${type}/${type === 'file' ? 'sample' : 'url'}/demo`,
        fileName: type === 'file' ? target : undefined,
        url: type === 'url' ? target : undefined
      },
      {
        malicious: false,
        harmless: false,
        suspicious: true,
        undetected: true,
        timeout: false,
        total: 74,
        positives: 5,
        detectionRate: "5/74",
        scanDate: new Date().toISOString(),
        permalink: `https://virustotal.com/gui/${type}/${type === 'file' ? 'sample' : 'url'}/demo`,
        fileName: type === 'file' ? target : undefined,
        url: type === 'url' ? target : undefined
      }
    ];

    // Randomly select a result for demo purposes
    const randomResult = results[Math.floor(Math.random() * results.length)];
    setScanResult(randomResult);
  };

  const handleScan = () => {
    if (activeTab === 'file' && selectedFile) {
      scanFile(selectedFile);
    } else if (activeTab === 'url' && urlInput.trim()) {
      scanUrl(urlInput);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setError(null);
    setSelectedFile(null);
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSecurityStatus = () => {
    if (!scanResult) return null;

    if (scanResult.malicious || scanResult.positives > 20) {
      return {
        status: 'Dangerous',
        icon: XCircle,
        color: 'text-red-500',
        bgColor: 'bg-red-50 border-red-200',
        description: 'This file/URL has been flagged as malicious by multiple security vendors.'
      };
    } else if (scanResult.suspicious || scanResult.positives > 5) {
      return {
        status: 'Suspicious',
        icon: AlertTriangle,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50 border-yellow-200',
        description: 'This file/URL shows some suspicious characteristics that warrant caution.'
      };
    } else {
      return {
        status: 'Safe',
        icon: CheckCircle,
        color: 'text-green-500',
        bgColor: 'bg-green-50 border-green-200',
        description: 'This file/URL appears to be safe based on the scan results.'
      };
    }
  };

  const securityStatus = getSecurityStatus();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full mx-auto bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Shield className="w-8 h-8" />
            VirusTotal Scanner
          </h2>
          <p className="text-gray-300">
            Scan files and URLs for malware and security threats
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/20 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('file')}
              className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
                activeTab === 'file'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Scan File
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
                activeTab === 'url'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              Scan URL
            </button>
          </div>
        </div>

        {/* Input Section */}
        {!scanResult && (
          <div className="mb-6">
            {activeTab === 'file' && (
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-300">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop a file'}
                  </span>
                  <span className="text-sm text-gray-400 mt-1">
                    Maximum file size: 32MB
                  </span>
                </label>
              </div>
            )}

            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="max-w-2xl mx-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter URL to scan (e.g., https://example.com)"
                    className="flex-1 px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  <Button type="submit" disabled={isLoading}>
                    <Link className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            )}

            {/* Scan Button */}
            {(selectedFile || urlInput.trim()) && (
              <div className="text-center mt-6">
                <Button
                  onClick={handleScan}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Start Scan
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Results Section */}
        {scanResult && securityStatus && (
          <div className="mb-6">
            <div className={`p-6 rounded-lg border-2 ${securityStatus.bgColor}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <securityStatus.icon className={`w-8 h-8 ${securityStatus.color}`} />
                  <div>
                    <h3 className={`text-2xl font-bold ${securityStatus.color}`}>
                      {securityStatus.status}
                    </h3>
                    <p className="text-gray-600">{securityStatus.description}</p>
                  </div>
                </div>
                <Button
                  onClick={resetScan}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Scan Another
                </Button>
              </div>

              {/* Scan Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">Detection Results</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-800">Total Engines:</span>
                      <span className="text-black">{scanResult.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800">Detections:</span>
                      <span className={`font-bold ${scanResult.positives > 0 ? 'text-red-700' : 'text-green-400'}`}>
                        {scanResult.detectionRate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800">Scan Date:</span>
                      <span className="text-black">
                        {new Date(scanResult.scanDate).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2">File/URL Details</h4>
                  <div className="space-y-2 text-sm">
                    {scanResult.fileName && (
                      <div className="flex justify-between">
                        <span className="text-gray-800">File Name:</span>
                        <span className="text-black truncate ml-2">
                          {scanResult.fileName}
                        </span>
                      </div>
                    )}
                    {scanResult.url && (
                      <div className="flex justify-between">
                        <span className="text-gray-800">URL:</span>
                        <span className="text-black truncate ml-2">
                          {scanResult.url}
                        </span>
                      </div>
                    )}
                    {scanResult.sha256 && (
                      <div className="flex justify-between">
                        <span className="text-gray-800">SHA-256:</span>
                        <span className="text-black font-mono text-xs">
                          {scanResult.sha256.substring(0, 16)}...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => window.open(scanResult.permalink, '_blank')}
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-900/20"
                >
                  View Full Report
                </Button>
                {scanResult.malicious && (
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete File
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VirusTotalScanner;