import React, { useState } from "react";
import { reportingAPI } from "../services/apiService";

/**
 * PUBLIC_INTERFACE
 * Admin reporting, data export.
 */
function Reporting() {
  const [isExporting, setIsExporting] = useState(null);

  async function handleExport(format) {
    setIsExporting(format);
    
    try {
      const exportParams = {
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
          end: new Date().toISOString()
        },
        includeWorkLogs: true,
        includeLeaveRequests: true,
        includeEmployeeData: true
      };

      let blob;
      let filename;

      if (format === 'pdf') {
        blob = await reportingAPI.exportToPDF(exportParams);
        filename = `report_${new Date().toISOString().split('T')[0]}.pdf`;
      } else {
        blob = await reportingAPI.exportToExcel(exportParams);
        filename = `report_${new Date().toISOString().split('T')[0]}.xlsx`;
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert(`${format.toUpperCase()} export completed successfully!`);
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      alert(`Failed to export to ${format.toUpperCase()}. Please try again.`);
    } finally {
      setIsExporting(null);
    }
  }

  return (
    <div>
      <div className="card">
        <div className="card-title">Reports & Analytics</div>
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", alignItems: "center" }}>
          <button 
            className="button-primary"
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            {isExporting === 'pdf' ? (
              <>
                <div className="loading-spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }}></div>
                Exporting...
              </>
            ) : (
              <>📄 Export to PDF</>
            )}
          </button>
          <button 
            className="button-secondary"
            onClick={() => handleExport('excel')}
            disabled={isExporting}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            {isExporting === 'excel' ? (
              <>
                <div className="loading-spinner" style={{ width: "16px", height: "16px", borderWidth: "2px" }}></div>
                Exporting...
              </>
            ) : (
              <>📊 Export to Excel</>
            )}
          </button>
        </div>
        <p style={{marginTop: "20px", color: "var(--secondary-purple)", fontSize: "0.95rem"}}>
          📈 Export includes work logs, leave requests, and employee data from the last 30 days.
          <br />
          📊 Charts and productivity trends will be added in future updates.
        </p>
      </div>
      
      <div className="card">
        <div className="card-title">Export Information</div>
        <div style={{ color: "var(--medium-gray)", lineHeight: "1.6" }}>
          <p><strong>📄 PDF Export:</strong> Comprehensive report with formatted tables and summaries</p>
          <p><strong>📊 Excel Export:</strong> Raw data in spreadsheet format for further analysis</p>
          <p><strong>📅 Data Range:</strong> Last 30 days of activity data</p>
          <p><strong>🔒 Access:</strong> Available to Admins and Managers only</p>
        </div>
      </div>
    </div>
  );
}

export default Reporting;
