import React, { useRef, useEffect, useState } from 'react';
import { 
  Image as ImageIcon, 
  Download, 
  RefreshCw, 
  Check, 
  Palette, 
  Upload, 
  Sliders, 
  Sparkles,
  ShieldCheck,
  FolderOpen
} from 'lucide-react';
import { TechnicianProfile, Language } from '../types';
import { createBmpFromCanvas, blobToBase64 } from '../utils/bmpGenerator';

interface LogoStudioProps {
  profile: TechnicianProfile;
  language: Language;
  onLogoBase64Change?: (base64: string) => void;
}

type LogoPreset = 'cyber-cyan' | 'gold-obsidian' | 'clean-white' | 'matrix-green';

export const LogoStudio: React.FC<LogoStudioProps> = ({
  profile,
  language,
  onLogoBase64Change
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<LogoPreset>('cyber-cyan');
  const [showBorder, setShowBorder] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [customImage, setCustomImage] = useState<HTMLImageElement | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isBn = language === 'bn';

  // Draw the 120x120 canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 120;
    const height = 120;
    canvas.width = width;
    canvas.height = height;

    if (customImage) {
      ctx.drawImage(customImage, 0, 0, width, height);
      if (showBorder) {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, width - 2, height - 2);
      }
      return;
    }

    // Color definitions based on preset
    let bgGradient: CanvasGradient;
    let primaryColor = '#38bdf8';
    let secondaryColor = '#0284c7';
    let textColor = '#ffffff';
    let subTextColor = '#94a3b8';

    if (selectedPreset === 'cyber-cyan') {
      bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(1, '#020617');
      primaryColor = '#06b6d4';
      secondaryColor = '#0284c7';
      textColor = '#ffffff';
      subTextColor = '#38bdf8';
    } else if (selectedPreset === 'gold-obsidian') {
      bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#1c1917');
      bgGradient.addColorStop(1, '#0c0a09');
      primaryColor = '#f59e0b';
      secondaryColor = '#d97706';
      textColor = '#fef3c7';
      subTextColor = '#fbbf24';
    } else if (selectedPreset === 'clean-white') {
      bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#ffffff');
      bgGradient.addColorStop(1, '#f1f5f9');
      primaryColor = '#0284c7';
      secondaryColor = '#0369a1';
      textColor = '#0f172a';
      subTextColor = '#475569';
    } else { // matrix-green
      bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#052e16');
      bgGradient.addColorStop(1, '#021207');
      primaryColor = '#10b981';
      secondaryColor = '#059669';
      textColor = '#dcfce7';
      subTextColor = '#34d399';
    }

    // 1. Draw Background
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Tech grid accent
    ctx.strokeStyle = selectedPreset === 'clean-white' ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.07)';
    ctx.lineWidth = 1;
    for (let x = 12; x < width; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 12; y < height; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 3. Central Shield / Hexagon Motif
    const cx = width / 2;
    const cy = 46;
    const r = 26;

    ctx.save();
    ctx.beginPath();
    // Shield path
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx + r, cy - r * 0.4);
    ctx.lineTo(cx + r * 0.7, cy + r * 0.7);
    ctx.lineTo(cx, cy + r);
    ctx.lineTo(cx - r * 0.7, cy + r * 0.7);
    ctx.lineTo(cx - r, cy - r * 0.4);
    ctx.closePath();

    ctx.fillStyle = selectedPreset === 'clean-white' ? '#e2e8f0' : 'rgba(15, 23, 42, 0.9)';
    ctx.fill();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 4. Center Monogram "STC"
    ctx.fillStyle = primaryColor;
    ctx.font = 'bold 15px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('STC', cx, cy - 2);

    // 5. Tech Hand symbol / icon accent
    ctx.fillStyle = subTextColor;
    ctx.font = 'bold 8px "Segoe UI", Arial, sans-serif';
    ctx.fillText('TECH HAND', cx, cy + 12);

    // 6. Managing Director Name
    if (showTitle) {
      ctx.fillStyle = textColor;
      ctx.font = 'bold 9px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ARIFUZZAMAN', cx, 86);
      
      ctx.fillStyle = subTextColor;
      ctx.font = '7.5px "Segoe UI", Arial, sans-serif';
      ctx.fillText('(Kiron) • MD', cx, 97);
    }

    // 7. Location Badge
    if (showLocation) {
      ctx.fillStyle = primaryColor;
      ctx.font = 'bold 7px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FENI • BANGLADESH', cx, 110);
    }

    // 8. Outer Border
    if (showBorder) {
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, width - 2, height - 2);

      // Tech corner ticks
      ctx.fillStyle = primaryColor;
      const tick = 6;
      ctx.fillRect(0, 0, tick, 2);
      ctx.fillRect(0, 0, 2, tick);
      ctx.fillRect(width - tick, 0, tick, 2);
      ctx.fillRect(width - 2, 0, 2, tick);
      ctx.fillRect(0, height - 2, tick, 2);
      ctx.fillRect(0, height - tick, 2, tick);
      ctx.fillRect(width - tick, height - 2, tick, 2);
      ctx.fillRect(width - 2, height - tick, 2, tick);
    }
  };

  useEffect(() => {
    drawCanvas();
    if (canvasRef.current && onLogoBase64Change) {
      try {
        const bmpBlob = createBmpFromCanvas(canvasRef.current);
        blobToBase64(bmpBlob).then(b64 => onLogoBase64Change(b64));
      } catch (e) {
        console.error('Error generating base64 bmp:', e);
      }
    }
  }, [selectedPreset, showBorder, showLocation, showTitle, customImage, profile]);

  const handleDownloadBmp = () => {
    if (!canvasRef.current) return;
    try {
      const blob = createBmpFromCanvas(canvasRef.current);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'oemlogo.bmp';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (e) {
      console.error('Failed to create BMP:', e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setCustomImage(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resetToTemplate = () => {
    setCustomImage(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                <ImageIcon className="w-3.5 h-3.5" />
                {isBn ? 'উইন্ডোজ OEM লোগো জেনারেটর' : 'OEM Logo Generator (120x120 24-bit BMP)'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                • C:\Windows\System32\oemlogo.bmp
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
              {isBn ? 'এসটিসি টেক হ্যান্ড অফিশিয়াল ওএম ব্যাজ ও বিটম্যাপ স্টুডিও' : 'STC Tech Hand Official OEM Badge & Bitmap Studio'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              {isBn
                ? 'উইন্ডোজ সিস্টেম প্রোপার্টিজ (Classic System Properties এবং Windows 11 About) উইন্ডোতে প্রদর্শনের জন্য ১০০% প্রমিত ১২০x১২০ পিক্সেল ২৪-বিট আনকম্প্রেসড বিটম্যাপ লোগো তৈরি করুন।'
                : 'Microsoft Windows OEM standard requires an uncompressed 24-bit 120x120 BMP image saved to C:\\Windows\\System32\\oemlogo.bmp.'}
            </p>
          </div>

          <button
            onClick={handleDownloadBmp}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>{isBn ? 'ডাউনলোড সম্পন্ন!' : 'Downloaded oemlogo.bmp!'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{isBn ? 'oemlogo.bmp ডাউনলোড' : 'Download oemlogo.bmp'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Canvas Preview */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-3 left-3 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>120 x 120px • 24-bit RGB BMP</span>
          </div>

          <div className="my-6 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="text-[11px] font-mono text-slate-400 mb-2">
              Actual Size (120x120) & Magnified (240x240)
            </div>
            {/* The actual canvas element */}
            <div className="flex items-center justify-center gap-6">
              <div>
                <canvas
                  ref={canvasRef}
                  width={120}
                  height={120}
                  className="rounded border border-slate-700 shadow-md inline-block"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="text-[10px] text-slate-400 mt-1 font-mono">1x Native</div>
              </div>

              <div>
                <canvas
                  width={120}
                  height={120}
                  className="rounded border border-cyan-500/50 shadow-md inline-block w-[160px] h-[160px]"
                  style={{ imageRendering: 'pixelated' }}
                  ref={(node) => {
                    if (node && canvasRef.current) {
                      const ctx = node.getContext('2d');
                      if (ctx) {
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(canvasRef.current, 0, 0, 120, 120);
                      }
                    }
                  }}
                />
                <div className="text-[10px] text-cyan-400 mt-1 font-mono">Scaled Preview</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 max-w-sm">
            {isBn ? (
              <span>
                এই ফাইলটি স্বয়ংক্রিয়ভাবে <code className="text-cyan-300 font-mono">C:\Windows\System32\oemlogo.bmp</code> এবং <code className="text-cyan-300 font-mono">SysWOW64</code> এ স্থাপিত হবে।
              </span>
            ) : (
              <span>
                Saved automatically to <code className="text-cyan-300 font-mono">C:\Windows\System32\oemlogo.bmp</code> by the installer script.
              </span>
            )}
          </div>
        </div>

        {/* Right column: Customization Controls */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{isBn ? 'স্টাইল এবং কালার থিম' : 'Visual Theme Presets'}</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => { setSelectedPreset('cyber-cyan'); setCustomImage(null); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPreset === 'cyber-cyan' && !customImage
                    ? 'border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-700 mb-2"></div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Cyber Cyan</div>
                <div className="text-[11px] text-slate-500">Tech & Systems</div>
              </button>

              <button
                onClick={() => { setSelectedPreset('gold-obsidian'); setCustomImage(null); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPreset === 'gold-obsidian' && !customImage
                    ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-amber-700 mb-2"></div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Gold Executive</div>
                <div className="text-[11px] text-slate-500">MD Signature</div>
              </button>

              <button
                onClick={() => { setSelectedPreset('clean-white'); setCustomImage(null); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPreset === 'clean-white' && !customImage
                    ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded bg-gradient-to-br from-white to-slate-200 border border-slate-300 mb-2"></div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Minimal Light</div>
                <div className="text-[11px] text-slate-500">OEM Clean</div>
              </button>

              <button
                onClick={() => { setSelectedPreset('matrix-green'); setCustomImage(null); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPreset === 'matrix-green' && !customImage
                    ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-green-800 mb-2"></div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Matrix Green</div>
                <div className="text-[11px] text-slate-500">Bench Engineer</div>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{isBn ? 'লোগো কনটেন্ট ও ব্যাজ এলিমেন্ট' : 'Badge Display Elements'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.target.checked)}
                  className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {isBn ? 'টেক বর্ডার ও কর্নার' : 'Tech Border & Ticks'}
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTitle}
                  onChange={(e) => setShowTitle(e.target.checked)}
                  className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {isBn ? 'আরিফুজ্জামান (MD) নাম' : 'ARIFUZZAMAN (MD)'}
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLocation}
                  onChange={(e) => setShowLocation(e.target.checked)}
                  className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {isBn ? 'ফেনী, বাংলাদেশ ট্যাগ' : 'FENI • BANGLADESH'}
                </span>
              </label>
            </div>
          </div>

          {/* Custom Upload Option */}
          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 flex items-center justify-center text-cyan-700 dark:text-cyan-300 shrink-0">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {isBn ? 'আপনার নিজস্ব শপের ছবি বা লোগো আপলোড করুন' : 'Upload Custom Shop Image or Logo'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isBn 
                    ? 'যেকোনো PNG/JPG আপলোড করলে এটি অটোমেটিক ১২০x১২০ ২৪-বিট BMP-তে কনভার্ট হবে।' 
                    : 'Auto-resizes & converts any PNG/JPG into compliant 120x120 24-bit BMP.'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 rounded-lg shadow-sm cursor-pointer"
              >
                {isBn ? 'ছবি নির্বাচন করুন' : 'Browse Image'}
              </button>

              {customImage && (
                <button
                  onClick={resetToTemplate}
                  title="Reset to Template"
                  className="p-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
