import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Activity } from "../types/Activity"

interface ActivityChartProps {
    activities: Activity[]
}

const ActivityChart: React.FC<ActivityChartProps> = ({ activities }) => {
    const data = activities.reduce(
        (acc, activity) => {
            const date = new Date(activity.timestamp).toLocaleDateString()
            if (!acc[date]) {
                acc[date] = { date, count: 0 }
            }
            acc[date].count++
            return acc
        },
        {} as { [key: string]: { date: string; count: number } },
    )

    const chartData = Object.values(data)

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} role="graphics-symbol">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default ActivityChart

