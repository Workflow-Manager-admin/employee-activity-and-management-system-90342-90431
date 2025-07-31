import React from "react";

/**
 * PUBLIC_INTERFACE
 * Calendar view of work logs & leaves.
 */
function CalendarView() {
  // Would show dynamic calendar; this is a static placeholder for structure.
  return (
    <div className="calendar-container">
      <div className="calendar-header">June 2024</div>
      <table className="calendar-table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {/* Example: highlight days with logs or leave */}
          <tr>
            <td></td><td>3</td><td style={{background: "var(--accent-yellow)"}}>4</td>
            <td>5</td><td>6</td><td style={{background: "var(--accent-pink)", color: "#fff"}}>7</td>
            <td>8</td>
          </tr>
          <tr><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
          <tr><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td></tr>
          <tr>
            <td style={{background: "var(--accent-yellow)"}}>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
            <td>29</td>
          </tr>
        </tbody>
      </table>
      <div style={{marginTop:"1em"}}>
        <span style={{background: "var(--accent-yellow)", padding:"0 12px", borderRadius:10}}>Work Log</span>
        <span style={{background: "var(--accent-pink)", color:"#fff",padding:"0 12px", borderRadius:10, marginLeft:"16px"}}>Leave</span>
      </div>
    </div>
  );
}
export default CalendarView;
