import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useExpense } from "../context/ExpenseContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const { expenses } = useExpense();  
  const [filter, setFilter] = useState("month"); // Default filter
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//   process Chart Data
const processChartData = (filter) => {
    const now = new Date()
    let filteredExpenses = []

    if(filter === "month") {
        // filter by current month
        filteredExpenses = expenses.filter((expense) => new Date(expense.date).getFullYear() === now.getFullYear() && new Date(expense.date).getMonth() === now.getMonth()
    );
    } else if (filter === "week") {
        // filter by week
        const lastWeek = new Date()
        lastWeek.setDate(now.getDate() - 7);

        filteredExpenses = expenses.filter((expense) => new Date(expense.date) >= lastWeek && new Date(expense.date) <= now)
    }

    // Group expenses by day
    const groupedData = {};
    filteredExpenses.forEach((expense) => {
      const day = new Date(expense.date).toLocaleDateString(); // Format: MM/DD/YYYY
      groupedData[day] = (groupedData[day] || 0) + expense.amount;
    });

    // Prepare labels and data for chart
    const labels = Object.keys(groupedData).sort(
        (a, b) => new Date(a) - new Date(b)
      );
      const data = labels.map((label) => groupedData[label]);

      setChartData({
        labels,
        datasets: [
          {
            label: "Expenses",
            data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
          },
        ],
      });
} 

// / Re-process data when filter or expenses change
  useEffect(() => {
    processChartData(filter);
  }, [filter, expenses]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        {/* Filter Buttons */}
        <div className="flex gap-4">
          <button
            className={`btn ${filter === "month" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter("month")}
          >
            Month
          </button>
          <button
            className={`btn ${filter === "week" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter("week")}
          >
            Week
          </button>
        </div>
      </div>
      <div className="bg-base-200 p-6 rounded-lg">
        {/* Line Chart */}
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Expenses - ${filter === "month" ? "This Month" : "Last Week"}`,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Amount",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  )
};

export default ExpenseChart;
